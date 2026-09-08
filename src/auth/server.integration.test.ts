import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server-core";

import { closeMongoClientForTests, getDatabase, getMongoClient, getMongoHandles } from "../db/mongodb";
import {
  buildAuthOptions,
  getAuth,
  getOwnerSessionFromApi,
  resetAuthForTests,
} from "./server";
import type { AuthConfig } from "./config";

let mongoServer: MongoMemoryServer;
let mongoUri: string;

const config: AuthConfig = {
  secret: "0123456789abcdef0123456789abcdef",
  baseURL: "http://localhost:3000",
  githubClientId: "synthetic-client-id",
  githubClientSecret: "synthetic-client-secret",
  githubOwnerId: "123456789",
};

function applyAuthEnv() {
  process.env.MONGODB_URI = mongoUri;
  process.env.BETTER_AUTH_SECRET = config.secret;
  process.env.BETTER_AUTH_URL = config.baseURL;
  process.env.GITHUB_CLIENT_ID = config.githubClientId;
  process.env.GITHUB_CLIENT_SECRET = config.githubClientSecret;
  process.env.GITHUB_OWNER_ID = config.githubOwnerId;
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: { dbName: "phat_portfolio_auth_test" },
  });
  mongoUri = mongoServer.getUri("phat_portfolio_auth_test");
}, 30_000);

beforeEach(async () => {
  await closeMongoClientForTests();
  resetAuthForTests();
  applyAuthEnv();
});

afterAll(async () => {
  await closeMongoClientForTests();
  resetAuthForTests();
  await mongoServer?.stop();
  for (const key of [
    "MONGODB_URI",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GITHUB_OWNER_ID",
  ]) {
    delete process.env[key];
  }
});

describe("Better Auth Mongo ownership", () => {
  it("reuses the existing centralized MongoClient and database owner", async () => {
    const handles = await getMongoHandles();
    expect(handles.client).toBe(await getMongoClient());
    expect(handles.db.databaseName).toBe((await getDatabase()).databaseName);
  });

  it("constructs the real Better Auth Mongo adapter and serves an anonymous session lookup", async () => {
    const auth = await getAuth();
    await expect(auth.api.getSession({ headers: new Headers() })).resolves.toBeNull();
  });
});

describe("Better Auth owner-only configuration", () => {
  it("configures GitHub only, disables account linking and routes auth errors to sign-in", async () => {
    const handles = await getMongoHandles();
    const options = buildAuthOptions(config, handles);

    expect(Object.keys(options.socialProviders)).toEqual(["github"]);
    expect("emailAndPassword" in options).toBe(false);
    expect(options.account.accountLinking.enabled).toBe(false);
    expect(options.onAPIError.errorURL).toBe("/admin/sign-in");
  });

  it("wires immutable GitHub owner admission into validateUserInfo", async () => {
    const handles = await getMongoHandles();
    const options = buildAuthOptions(config, handles);
    const validate = options.user.validateUserInfo;

    await expect(
      validate({
        user: { id: "user", name: "Mutable", email: "owner@example.com", emailVerified: true },
        source: {
          action: "sign-in",
          method: "oauth",
          oauth: { providerId: "github", profile: { id: 123456789, login: "mutable" } },
        },
      } as never),
    ).resolves.toBeUndefined();

    await expect(
      validate({
        user: { id: "user", name: "Mutable", email: "owner@example.com", emailVerified: true },
        source: {
          action: "sign-in",
          method: "oauth",
          oauth: { providerId: "github", profile: { id: 999999999, login: config.githubOwnerId } },
        },
      } as never),
    ).resolves.toMatchObject({ error: "access_denied" });
  });
});

describe("live session plus linked-account authorization", () => {
  it("rejects a valid session whose linked account is not the exact owner tuple", async () => {
    const api = {
      getSession: vi.fn().mockResolvedValue({ user: { id: "better-auth-user-1" } }),
      listUserAccounts: vi.fn().mockResolvedValue([
        { providerId: "github", accountId: "999999999", userId: "better-auth-user-1" },
      ]),
    };

    await expect(getOwnerSessionFromApi(new Headers(), api, config.githubOwnerId)).resolves.toBeNull();
    expect(api.getSession).toHaveBeenCalledTimes(1);
    expect(api.listUserAccounts).toHaveBeenCalledTimes(1);
  });

  it("accepts only a live session bound to the exact linked GitHub owner account", async () => {
    const session = { user: { id: "better-auth-user-1" } };
    const api = {
      getSession: vi.fn().mockResolvedValue(session),
      listUserAccounts: vi.fn().mockResolvedValue([
        { providerId: "github", accountId: config.githubOwnerId, userId: session.user.id },
      ]),
    };

    await expect(getOwnerSessionFromApi(new Headers(), api, config.githubOwnerId)).resolves.toBe(session);
  });

  it("does not trust accounts when no live session exists", async () => {
    const api = {
      getSession: vi.fn().mockResolvedValue(null),
      listUserAccounts: vi.fn(),
    };

    await expect(getOwnerSessionFromApi(new Headers(), api, config.githubOwnerId)).resolves.toBeNull();
    expect(api.listUserAccounts).not.toHaveBeenCalled();
  });
});
