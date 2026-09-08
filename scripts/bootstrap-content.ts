import { pathToFileURL } from "node:url";

const DB_MODULE = "../src/db/mongodb.ts";
const MODEL_MODULE = "../src/content/model.ts";
const BOOTSTRAP_DATA_MODULE = "../src/content/bootstrap-data.ts";

export async function bootstrapContent(): Promise<void> {
  const [{ getDatabase }, { siteProfileSchema, workItemSchema }, bootstrapData] = await Promise.all([
    import(DB_MODULE),
    import(MODEL_MODULE),
    import(BOOTSTRAP_DATA_MODULE),
  ]);

  const db = await getDatabase();
  const profiles = db.collection("site_profiles");
  const works = db.collection("work_items");

  const profile = siteProfileSchema.parse(bootstrapData.bootstrapSiteProfile);
  const { _id: profileId, ...profileData } = profile;
  await profiles.updateOne(
    { _id: profileId },
    { $set: profileData, $setOnInsert: { _id: profileId } },
    { upsert: true },
  );

  for (const input of bootstrapData.bootstrapWorkItems) {
    const work = workItemSchema.parse(input);
    const { _id, ...workData } = work;
    await works.updateOne(
      { _id },
      { $set: workData, $setOnInsert: { _id } },
      { upsert: true },
    );
  }

  await works.createIndex({ slug: 1 }, { name: "work_slug_unique", unique: true });
  await works.createIndex(
    { publicationStatus: 1, collection: 1, featuredRank: 1 },
    { name: "work_publication_collection_featured" },
  );
  await works.createIndex(
    { publicationStatus: 1, currentRank: 1 },
    { name: "work_publication_current" },
  );
}

async function runBootstrapCli(): Promise<void> {
  try {
    await bootstrapContent();
    console.log("Editorial content bootstrap complete.");
  } finally {
    const { getMongoClient } = await import(DB_MODULE);
    const client = await getMongoClient().catch(() => undefined);
    await client?.close();
  }
}

const entrypoint = process.argv[1];
if (entrypoint && import.meta.url === pathToFileURL(entrypoint).href) {
  runBootstrapCli().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
}
