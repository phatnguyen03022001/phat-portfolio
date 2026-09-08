import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server-core";

import { closeMongoClientForTests, getDatabase } from "../db/mongodb";
import { getPublishedWorkBySlug } from "./queries";
import { workItemSchema, type WorkItem } from "./model";
import {
  createDraftWork,
  publishWork,
  unpublishWork,
  updateDraftWork,
} from "./admin-work";

let mongoServer: MongoMemoryServer;
let mongoUri: string;

const validInput = {
  slug: "editorial-work",
  title: "Editorial Work",
  summary: "A bounded editorial work item used to prove the owner publishing lifecycle.",
  category: "PRODUCT_DOMAIN" as const,
  collection: "WORK" as const,
  featuredRank: 1,
  currentRank: null,
  repositoryReferences: [{ label: "Repository", url: "https://github.com/example/project" }],
  sections: [{ kind: "OVERVIEW" as const, title: "Overview", markdown: "Initial markdown." }],
  evidence: [],
  technologies: ["TypeScript"],
  externalLinks: [],
};
const validUpdate = {
  title: validInput.title,
  summary: validInput.summary,
  category: validInput.category,
  collection: validInput.collection,
  featuredRank: validInput.featuredRank,
  currentRank: validInput.currentRank,
  repositoryReferences: validInput.repositoryReferences,
  sections: validInput.sections,
  evidence: validInput.evidence,
  technologies: validInput.technologies,
  externalLinks: validInput.externalLinks,
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({ instance: { dbName: "phat_portfolio_admin_work_test" } });
  mongoUri = mongoServer.getUri("phat_portfolio_admin_work_test");
  process.env.MONGODB_URI = mongoUri;
}, 30_000);

beforeEach(async () => {
  process.env.MONGODB_URI = mongoUri;
  await closeMongoClientForTests();
  const db = await getDatabase();
  const works = db.collection<WorkItem>("work_items");
  await works.deleteMany({});
  await works.createIndex({ slug: 1 }, { unique: true });
});

afterAll(async () => {
  await closeMongoClientForTests();
  if (mongoServer) await mongoServer.stop();
  delete process.env.MONGODB_URI;
});

describe("admin WorkItem lifecycle", () => {
  it("creates DRAFT only and rejects duplicate slug without overwriting", async () => {
    const createdAt = new Date("2026-09-08T10:00:00.000Z");
    const created = await createDraftWork(validInput, createdAt);

    expect(created.publicationStatus).toBe("DRAFT");
    expect(created.publishedAt).toBeNull();
    expect(created.createdAt).toEqual(createdAt);
    expect(created.updatedAt).toEqual(createdAt);

    await expect(createDraftWork({ ...validInput, title: "Overwrite attempt" }, new Date("2026-09-08T10:01:00.000Z"))).rejects.toThrow(/slug/i);

    const db = await getDatabase();
    await expect(db.collection<WorkItem>("work_items").findOne({ slug: validInput.slug })).resolves.toMatchObject({
      title: validInput.title,
      publicationStatus: "DRAFT",
    });
  });

  it("edits only DRAFT content while preserving slug and creation identity", async () => {
    const created = await createDraftWork(validInput, new Date("2026-09-08T10:00:00.000Z"));
    const updatedAt = new Date("2026-09-08T10:05:00.000Z");
    const updated = await updateDraftWork(validInput.slug, {
      ...validUpdate,
      title: "Edited Editorial Work",
      summary: "Edited bounded summary.",
      sections: [{ kind: "OVERVIEW" as const, title: "Overview", markdown: "Edited markdown." }],
    }, updatedAt);

    expect(updated.slug).toBe(validInput.slug);
    expect(updated._id).toBe(created._id);
    expect(updated.createdAt).toEqual(created.createdAt);
    expect(updated.updatedAt).toEqual(updatedAt);
    expect(updated.title).toBe("Edited Editorial Work");
  });

  it("publishes and unpublishes through the same public Mongo visibility boundary", async () => {
    await createDraftWork(validInput, new Date("2026-09-08T10:00:00.000Z"));
    await expect(getPublishedWorkBySlug(validInput.slug)).resolves.toBeNull();

    const publishedAt = new Date("2026-09-08T10:10:00.000Z");
    const published = await publishWork(validInput.slug, publishedAt);
    expect(published.publicationStatus).toBe("PUBLISHED");
    expect(published.publishedAt).toEqual(publishedAt);
    await expect(getPublishedWorkBySlug(validInput.slug)).resolves.toMatchObject({ slug: validInput.slug });

    await expect(updateDraftWork(validInput.slug, { ...validUpdate, title: "Forbidden edit" }, new Date("2026-09-08T10:11:00.000Z"))).rejects.toThrow(/published|draft/i);

    const unpublished = await unpublishWork(validInput.slug, new Date("2026-09-08T10:12:00.000Z"));
    expect(unpublished.publicationStatus).toBe("DRAFT");
    expect(unpublished.publishedAt).toBeNull();
    await expect(getPublishedWorkBySlug(validInput.slug)).resolves.toBeNull();
  });

  it("fails closed for missing or malformed persisted documents", async () => {
    await expect(publishWork("missing-work", new Date())).rejects.toThrow(/missing/i);
    await expect(unpublishWork("missing-work", new Date())).rejects.toThrow(/missing/i);
    await expect(updateDraftWork("missing-work", validUpdate, new Date())).rejects.toThrow(/missing/i);

    const db = await getDatabase();
    const malformed = {
      ...workItemSchema.parse({
        _id: "malformed-work",
        schemaVersion: 1,
        ...validInput,
        slug: "malformed-work",
        publicationStatus: "DRAFT",
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: null,
      }),
      category: "INVALID_CATEGORY",
    };
    await db.collection<{ _id: string; [key: string]: unknown }>("work_items").insertOne(malformed);

    await expect(publishWork("malformed-work", new Date())).rejects.toThrow();
    await expect(updateDraftWork("malformed-work", validUpdate, new Date())).rejects.toThrow();
  });
});
