import { describe, expect, it } from "vitest";

import { isOwnerLinkedAccount, isOwnerOAuthIdentity } from "./owner-policy";

const ownerGithubId = "123456789";

describe("owner OAuth admission", () => {
  it("accepts only the configured immutable GitHub profile id", () => {
    expect(
      isOwnerOAuthIdentity({
        providerId: "github",
        profile: { id: 123456789, login: "mutable-login", email: "owner@example.com" },
        ownerGithubId,
      }),
    ).toBe(true);
  });

  it.each([
    { providerId: "google", profile: { id: 123456789 } },
    { providerId: "github", profile: { id: 987654321 } },
    { providerId: "github", profile: {} },
    { providerId: "github", profile: { login: ownerGithubId, email: ownerGithubId } },
  ])("rejects non-owner identity %#", ({ providerId, profile }) => {
    expect(isOwnerOAuthIdentity({ providerId, profile, ownerGithubId })).toBe(false);
  });
});

describe("owner linked-account authorization", () => {
  const ownerAccount = {
    providerId: "github",
    accountId: ownerGithubId,
    userId: "better-auth-user-1",
  };

  it("accepts the exact linked GitHub owner account for the live session user", () => {
    expect(
      isOwnerLinkedAccount({
        sessionUserId: "better-auth-user-1",
        ownerGithubId,
        accounts: [ownerAccount],
      }),
    ).toBe(true);
  });

  it.each([
    { accounts: [] },
    { accounts: [{ ...ownerAccount, providerId: "google" }] },
    { accounts: [{ ...ownerAccount, accountId: "987654321" }] },
    { accounts: [{ ...ownerAccount, userId: "different-better-auth-user" }] },
  ])("rejects accounts that do not bind the exact owner tuple %#", ({ accounts }) => {
    expect(
      isOwnerLinkedAccount({
        sessionUserId: "better-auth-user-1",
        ownerGithubId,
        accounts,
      }),
    ).toBe(false);
  });
});
