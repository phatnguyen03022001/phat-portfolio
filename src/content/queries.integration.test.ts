import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server-core";

import { bootstrapSiteProfile, bootstrapWorkItems } from "./bootstrap-data";
import { siteProfileSchema, workItemSchema, type SiteProfile, type WorkItem } from "./model";
import {
  getSiteProfile,
  listCurrentPublishedWork,
  listPublishedWork,
} from "./queries";
import { closeMongoClientForTests, getDatabase } from "../db/mongodb";
import { bootstrapContent } from "../../scripts/bootstrap-content";

let mongoServer: MongoMemoryServer;
let mongoUri: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: { dbName: "phat_portfolio_test" },
  });
  mongoUri = mongoServer.getUri("phat_portfolio_test");
  process.env.MONGODB_URI = mongoUri;
}, 30_000);

beforeEach(async () => {
  process.env.MONGODB_URI = mongoUri;
  await closeMongoClientForTests();
  const db = await getDatabase();
  await Promise.all([
    db.collection<SiteProfile>("site_profiles").deleteMany({}),
    db.collection<WorkItem>("work_items").deleteMany({}),
  ]);
});

afterAll(async () => {
  await closeMongoClientForTests();
  if (mongoServer) await mongoServer.stop();
  delete process.env.MONGODB_URI;
});

describe("content bootstrap", () => {
  it("is idempotent, preserves unrelated work, and creates only the justified work indexes", async () => {
    await bootstrapContent();

    const db = await getDatabase();
    const works = db.collection<WorkItem>("work_items");
    const unrelated = {
      ...workItemSchema.parse(bootstrapWorkItems[0]),
      _id: "unrelated-published-work",
      slug: "unrelated-published-work",
      title: "Unrelated Published Work",
      featuredRank: 99,
      currentRank: null,
    };
    await works.insertOne(unrelated);

    await bootstrapContent();

    expect(await db.collection<SiteProfile>("site_profiles").countDocuments()).toBe(1);
    expect(await works.countDocuments()).toBe(3);
    await expect(works.findOne({ _id: unrelated._id })).resolves.not.toBeNull();

    const indexes = await works.listIndexes().toArray();
    expect(indexes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: { slug: 1 }, unique: true }),
        expect.objectContaining({
          key: { publicationStatus: 1, collection: 1, featuredRank: 1 },
        }),
        expect.objectContaining({ key: { publicationStatus: 1, currentRank: 1 } }),
      ]),
    );
  });
});

describe("Mongo editorial boundary", () => {
  it("fails closed with a controlled configuration error when MONGODB_URI is missing", async () => {
    await closeMongoClientForTests();
    delete process.env.MONGODB_URI;

    await expect(getDatabase()).rejects.toThrow(/MONGODB_URI/);

    process.env.MONGODB_URI = mongoUri;
  });

  it("round-trips the validated SiteProfile and fails when the singleton is missing", async () => {
    const db = await getDatabase();
    const profile = siteProfileSchema.parse(bootstrapSiteProfile);
    await db.collection<SiteProfile>("site_profiles").insertOne(profile);

    await expect(getSiteProfile()).resolves.toEqual(profile);

    await db.collection<SiteProfile>("site_profiles").deleteMany({});
    await expect(getSiteProfile()).rejects.toThrow(/SiteProfile/);
  });

  it("returns published WORK items in deterministic featured order and excludes DRAFT", async () => {
    const db = await getDatabase();
    const first = workItemSchema.parse(bootstrapWorkItems[0]);
    const second = workItemSchema.parse(bootstrapWorkItems[1]);
    const draft = {
      ...first,
      _id: "synthetic-draft",
      slug: "synthetic-draft",
      title: "Synthetic Draft",
      publicationStatus: "DRAFT" as const,
      featuredRank: 0,
      currentRank: 0,
      publishedAt: null,
    };

    await db.collection<WorkItem>("work_items").insertMany([second, draft, first]);

    const published = await listPublishedWork();
    expect(published.map((work) => work.slug)).toEqual([first.slug, second.slug]);
    expect(published.some((work) => work.slug === draft.slug)).toBe(false);
  });

  it("returns only current published work in deterministic current-rank order", async () => {
    const db = await getDatabase();
    const first = workItemSchema.parse(bootstrapWorkItems[0]);
    const second = workItemSchema.parse(bootstrapWorkItems[1]);
    const notCurrent = {
      ...first,
      _id: "published-not-current",
      slug: "published-not-current",
      title: "Published Not Current",
      featuredRank: 3,
      currentRank: null,
    };
    const draft = {
      ...first,
      _id: "current-draft",
      slug: "current-draft",
      title: "Current Draft",
      publicationStatus: "DRAFT" as const,
      currentRank: 0,
      publishedAt: null,
    };

    await db.collection<WorkItem>("work_items").insertMany([second, notCurrent, draft, first]);

    const current = await listCurrentPublishedWork();
    expect(current.map((work) => work.slug)).toEqual([first.slug, second.slug]);
  });

  it("rejects malformed persisted documents instead of rendering them", async () => {
    const db = await getDatabase();
    const malformed = {
      ...workItemSchema.parse(bootstrapWorkItems[0]),
      _id: "malformed-work",
      slug: "malformed-work",
      title: "Malformed Work",
      category: "INVALID_CATEGORY",
      featuredRank: 0,
    };

    await db.collection<{ _id: string; [key: string]: unknown }>("work_items").insertOne(malformed);

    await expect(listPublishedWork()).rejects.toThrow();
  });
});
