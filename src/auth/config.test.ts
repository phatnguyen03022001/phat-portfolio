import { describe, expect, it } from "vitest";

import { readAuthConfig } from "./config";

const validEnv = {
  BETTER_AUTH_SECRET: "0123456789abcdef0123456789abcdef",
  BETTER_AUTH_URL: "http://localhost:3000",
  GITHUB_CLIENT_ID: "synthetic-client-id",
  GITHUB_CLIENT_SECRET: "synthetic-client-secret",
  GITHUB_OWNER_ID: "123456789",
};

describe("readAuthConfig", () => {
  it("returns validated server-only auth configuration", () => {
    expect(readAuthConfig(validEnv)).toEqual({
      secret: validEnv.BETTER_AUTH_SECRET,
      baseURL: validEnv.BETTER_AUTH_URL,
      githubClientId: validEnv.GITHUB_CLIENT_ID,
      githubClientSecret: validEnv.GITHUB_CLIENT_SECRET,
      githubOwnerId: validEnv.GITHUB_OWNER_ID,
    });
  });

  it.each([
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GITHUB_OWNER_ID",
  ] as const)("fails closed when %s is missing", (key) => {
    const env = { ...validEnv, [key]: undefined };
    expect(() => readAuthConfig(env)).toThrow(/Server configuration error/);
  });

  it("rejects a Better Auth secret shorter than 32 characters", () => {
    expect(() => readAuthConfig({ ...validEnv, BETTER_AUTH_SECRET: "too-short" })).toThrow(
      /Server configuration error/,
    );
  });

  it("rejects a non-HTTP(S) Better Auth URL", () => {
    expect(() => readAuthConfig({ ...validEnv, BETTER_AUTH_URL: "ftp://localhost:3000" })).toThrow(
      /Server configuration error/,
    );
  });

  it("rejects a blank or non-numeric immutable GitHub owner id", () => {
    expect(() => readAuthConfig({ ...validEnv, GITHUB_OWNER_ID: "  " })).toThrow(
      /Server configuration error/,
    );
    expect(() => readAuthConfig({ ...validEnv, GITHUB_OWNER_ID: "owner-login" })).toThrow(
      /Server configuration error/,
    );
  });
});
