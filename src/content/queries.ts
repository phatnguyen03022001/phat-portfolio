import { getDatabase } from "../db/mongodb";
import { siteProfileSchema, workItemSchema, type SiteProfile, type WorkItem } from "./model";

const SITE_PROFILE_COLLECTION = "site_profiles";
const WORK_ITEM_COLLECTION = "work_items";

export async function getSiteProfile(): Promise<SiteProfile> {
  const db = await getDatabase();
  const document = await db.collection<SiteProfile>(SITE_PROFILE_COLLECTION).findOne({ _id: "site" });

  if (!document) {
    throw new Error("SiteProfile singleton is missing.");
  }

  return siteProfileSchema.parse(document);
}

export async function listPublishedWork(): Promise<WorkItem[]> {
  const db = await getDatabase();
  const documents = await db
    .collection<WorkItem>(WORK_ITEM_COLLECTION)
    .find({ publicationStatus: "PUBLISHED", collection: "WORK" })
    .sort({ featuredRank: 1, title: 1, _id: 1 })
    .toArray();

  return documents.map((document) => workItemSchema.parse(document));
}

export async function listCurrentPublishedWork(): Promise<WorkItem[]> {
  const db = await getDatabase();
  const documents = await db
    .collection<WorkItem>(WORK_ITEM_COLLECTION)
    .find({ publicationStatus: "PUBLISHED", currentRank: { $ne: null } })
    .sort({ currentRank: 1, title: 1, _id: 1 })
    .toArray();

  return documents.map((document) => workItemSchema.parse(document));
}


export async function getPublishedWorkBySlug(slug: string): Promise<WorkItem | null> {
  const db = await getDatabase();
  const document = await db
    .collection<WorkItem>(WORK_ITEM_COLLECTION)
    .findOne({ slug, publicationStatus: "PUBLISHED" });

  return document ? workItemSchema.parse(document) : null;
}
