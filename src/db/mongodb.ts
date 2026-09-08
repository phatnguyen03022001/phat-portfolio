import { MongoClient, type Db } from "mongodb";

type MongoGlobal = typeof globalThis & {
  __phatPortfolioMongoClientPromise?: Promise<MongoClient>;
};

const mongoGlobal = globalThis as MongoGlobal;
let mongoClientPromise: Promise<MongoClient> | undefined;

function requireMongoUri(): string {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("Server configuration error: MONGODB_URI is required.");
  }
  return uri;
}

function createMongoClientPromise(): Promise<MongoClient> {
  const client = new MongoClient(requireMongoUri());
  return client.connect();
}

export async function getMongoClient(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    mongoGlobal.__phatPortfolioMongoClientPromise ??= createMongoClientPromise();
    return mongoGlobal.__phatPortfolioMongoClientPromise;
  }

  mongoClientPromise ??= createMongoClientPromise();
  return mongoClientPromise;
}

export async function getMongoHandles(): Promise<{ client: MongoClient; db: Db }> {
  const client = await getMongoClient();
  return { client, db: client.db() };
}

export async function getDatabase(): Promise<Db> {
  return (await getMongoHandles()).db;
}

export async function closeMongoClientForTests(): Promise<void> {
  const promises = [mongoClientPromise, mongoGlobal.__phatPortfolioMongoClientPromise].filter(
    (promise): promise is Promise<MongoClient> => Boolean(promise),
  );

  await Promise.all(
    promises.map(async (promise) => {
      const client = await promise.catch(() => undefined);
      await client?.close();
    }),
  );

  mongoClientPromise = undefined;
  mongoGlobal.__phatPortfolioMongoClientPromise = undefined;
}
