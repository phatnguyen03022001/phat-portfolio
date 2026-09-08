import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import type { Db, MongoClient } from "mongodb";

import { getMongoHandles } from "../db/mongodb";
import { readAuthConfig, type AuthConfig } from "./config";
import { isOwnerLinkedAccount, isOwnerOAuthIdentity, type LinkedAccountIdentity } from "./owner-policy";

type MongoHandles = {
  client: MongoClient;
  db: Db;
};

type SessionIdentity = {
  user: {
    id: string;
  };
};

type OwnerSessionApi<Session extends SessionIdentity> = {
  getSession(input: { headers: Headers }): Promise<Session | null>;
  listUserAccounts(input: { headers: Headers }): Promise<readonly LinkedAccountIdentity[]>;
};

export function buildAuthOptions(config: AuthConfig, handles: MongoHandles) {
  return {
    database: mongodbAdapter(handles.db, { client: handles.client }),
    baseURL: config.baseURL,
    secret: config.secret,
    socialProviders: {
      github: {
        clientId: config.githubClientId,
        clientSecret: config.githubClientSecret,
      },
    },
    account: {
      accountLinking: {
        enabled: false,
      },
    },
    user: {
      validateUserInfo: async ({ source }) => {
        if (
          isOwnerOAuthIdentity({
            providerId: source.oauth?.providerId,
            profile: source.oauth?.profile as Record<string, unknown> | undefined,
            ownerGithubId: config.githubOwnerId,
          })
        ) {
          return;
        }

        return {
          error: "access_denied",
          errorDescription: "Owner access is required.",
        };
      },
    },
    onAPIError: {
      errorURL: "/admin/sign-in",
    },
  } satisfies BetterAuthOptions;
}

async function createAuth() {
  const config = readAuthConfig();
  const handles = await getMongoHandles();
  return betterAuth(buildAuthOptions(config, handles));
}

type AuthInstance = Awaited<ReturnType<typeof createAuth>>;
let authPromise: Promise<AuthInstance> | undefined;

export function getAuth(): Promise<AuthInstance> {
  authPromise ??= createAuth();
  return authPromise;
}

export function resetAuthForTests(): void {
  authPromise = undefined;
}

export async function getOwnerSessionFromApi<Session extends SessionIdentity>(
  headers: Headers,
  api: OwnerSessionApi<Session>,
  ownerGithubId: string,
): Promise<Session | null> {
  const session = await api.getSession({ headers });
  if (!session) return null;

  const accounts = await api.listUserAccounts({ headers });
  return isOwnerLinkedAccount({
    sessionUserId: session.user.id,
    accounts,
    ownerGithubId,
  })
    ? session
    : null;
}

export async function getOwnerSession(headers: Headers) {
  const [auth, config] = await Promise.all([getAuth(), Promise.resolve(readAuthConfig())]);

  return getOwnerSessionFromApi(
    headers,
    {
      getSession: ({ headers: requestHeaders }) => auth.api.getSession({ headers: requestHeaders }),
      listUserAccounts: ({ headers: requestHeaders }) =>
        auth.api.listUserAccounts({ headers: requestHeaders }),
    },
    config.githubOwnerId,
  );
}

export async function requireOwnerSession(headers: Headers) {
  const session = await getOwnerSession(headers);
  if (!session) {
    throw new Error("Owner authorization required.");
  }
  return session;
}
