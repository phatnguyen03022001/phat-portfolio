import { MongoServerError } from "mongodb";
import { z } from "zod";

import { getDatabase } from "../db/mongodb";
import { workItemSchema, type WorkItem } from "./model";

const WORK_ITEM_COLLECTION = "work_items";

const editableWorkFieldsSchema = workItemSchema.pick({
  title: true,
  summary: true,
  category: true,
  collection: true,
  featuredRank: true,
  currentRank: true,
  repositoryReferences: true,
  sections: true,
  evidence: true,
  technologies: true,
  externalLinks: true,
});

export const createWorkInputSchema = editableWorkFieldsSchema
  .extend({ slug: workItemSchema.shape.slug })
  .strict();
export const updateWorkInputSchema = editableWorkFieldsSchema.strict();

export type CreateWorkInput = z.infer<typeof createWorkInputSchema>;
export type UpdateWorkInput = z.infer<typeof updateWorkInputSchema>;

export type AdminWorkErrorCode =
  | "INVALID_INPUT"
  | "DUPLICATE_SLUG"
  | "NOT_FOUND"
  | "NOT_DRAFT"
  | "NOT_PUBLISHED"
  | "CONFLICT";

export class AdminWorkError extends Error {
  constructor(
    readonly code: AdminWorkErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AdminWorkError";
  }
}

function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseNullableRank(value: string): number | null {
  return value === "" ? null : Number(value);
}

function parseStructuredField(formData: FormData, key: string): unknown {
  const raw = formString(formData, key);
  if (raw === "") return [];

  try {
    return JSON.parse(raw);
  } catch {
    throw new AdminWorkError("INVALID_INPUT", `Invalid structured input for ${key}.`);
  }
}

function normalizeEvidenceFormValue(value: unknown): unknown {
  if (!Array.isArray(value)) return value;
  return value.map((record) => {
    if (!record || typeof record !== "object" || Array.isArray(record)) return record;
    const normalized = { ...record } as Record<string, unknown>;
    if (typeof normalized.observedAt === "string") {
      const parsed = new Date(normalized.observedAt);
      if (!Number.isNaN(parsed.getTime())) normalized.observedAt = parsed;
    }
    return normalized;
  });
}

function editableInputFromForm(formData: FormData) {
  return {
    title: formString(formData, "title"),
    summary: formString(formData, "summary"),
    category: formString(formData, "category"),
    collection: formString(formData, "collection"),
    featuredRank: parseNullableRank(formString(formData, "featuredRank")),
    currentRank: parseNullableRank(formString(formData, "currentRank")),
    repositoryReferences: parseStructuredField(formData, "repositoryReferences"),
    sections: parseStructuredField(formData, "sections"),
    evidence: normalizeEvidenceFormValue(parseStructuredField(formData, "evidence")),
    technologies: parseStructuredField(formData, "technologies"),
    externalLinks: parseStructuredField(formData, "externalLinks"),
  };
}

export function parseCreateWorkForm(formData: FormData): CreateWorkInput {
  return createWorkInputSchema.parse({
    slug: formString(formData, "slug"),
    ...editableInputFromForm(formData),
  });
}

export function parseUpdateWorkForm(formData: FormData): UpdateWorkInput {
  return updateWorkInputSchema.parse(editableInputFromForm(formData));
}

async function workCollection() {
  const db = await getDatabase();
  return db.collection<WorkItem>(WORK_ITEM_COLLECTION);
}

async function requireStoredWork(slug: string): Promise<WorkItem> {
  const collection = await workCollection();
  const document = await collection.findOne({ slug });
  if (!document) {
    throw new AdminWorkError("NOT_FOUND", "WorkItem is missing.");
  }
  return workItemSchema.parse(document);
}

export async function listAdminWork(): Promise<WorkItem[]> {
  const collection = await workCollection();
  const documents = await collection.find({}).sort({ updatedAt: -1, title: 1, _id: 1 }).toArray();
  return documents.map((document) => workItemSchema.parse(document));
}

export async function getAdminWorkBySlug(slug: string): Promise<WorkItem | null> {
  const collection = await workCollection();
  const document = await collection.findOne({ slug });
  return document ? workItemSchema.parse(document) : null;
}

export async function createDraftWork(input: CreateWorkInput, now: Date): Promise<WorkItem> {
  const parsedInput = createWorkInputSchema.parse(input);
  const candidate = workItemSchema.parse({
    _id: parsedInput.slug,
    schemaVersion: 1,
    ...parsedInput,
    publicationStatus: "DRAFT",
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
  });

  try {
    const collection = await workCollection();
    await collection.insertOne(candidate);
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      throw new AdminWorkError("DUPLICATE_SLUG", "WorkItem slug already exists.");
    }
    throw error;
  }

  return candidate;
}

export async function updateDraftWork(
  slug: string,
  input: UpdateWorkInput,
  now: Date,
): Promise<WorkItem> {
  const current = await requireStoredWork(slug);
  if (current.publicationStatus !== "DRAFT") {
    throw new AdminWorkError("NOT_DRAFT", "Published WorkItem must be unpublished before editing.");
  }

  const parsedInput = updateWorkInputSchema.parse(input);
  const candidate = workItemSchema.parse({
    ...current,
    ...parsedInput,
    _id: current._id,
    slug: current.slug,
    publicationStatus: "DRAFT",
    createdAt: current.createdAt,
    updatedAt: now,
    publishedAt: null,
  });

  const collection = await workCollection();
  const result = await collection.replaceOne(
    { _id: current._id, slug: current.slug, publicationStatus: "DRAFT" },
    candidate,
  );
  if (result.matchedCount !== 1) {
    throw new AdminWorkError("CONFLICT", "WorkItem state changed before the draft update completed.");
  }

  return candidate;
}

export async function publishWork(slug: string, now: Date): Promise<WorkItem> {
  const current = await requireStoredWork(slug);
  if (current.publicationStatus !== "DRAFT") {
    throw new AdminWorkError("NOT_DRAFT", "Only a draft WorkItem can be published.");
  }

  const candidate = workItemSchema.parse({
    ...current,
    publicationStatus: "PUBLISHED",
    updatedAt: now,
    publishedAt: now,
  });

  const collection = await workCollection();
  const result = await collection.replaceOne(
    { _id: current._id, slug: current.slug, publicationStatus: "DRAFT" },
    candidate,
  );
  if (result.matchedCount !== 1) {
    throw new AdminWorkError("CONFLICT", "WorkItem state changed before publish completed.");
  }

  return candidate;
}

export async function unpublishWork(slug: string, now: Date): Promise<WorkItem> {
  const current = await requireStoredWork(slug);
  if (current.publicationStatus !== "PUBLISHED") {
    throw new AdminWorkError("NOT_PUBLISHED", "Only a published WorkItem can be unpublished.");
  }

  const candidate = workItemSchema.parse({
    ...current,
    publicationStatus: "DRAFT",
    updatedAt: now,
    publishedAt: null,
  });

  const collection = await workCollection();
  const result = await collection.replaceOne(
    { _id: current._id, slug: current.slug, publicationStatus: "PUBLISHED" },
    candidate,
  );
  if (result.matchedCount !== 1) {
    throw new AdminWorkError("CONFLICT", "WorkItem state changed before unpublish completed.");
  }

  return candidate;
}
