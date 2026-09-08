export type OwnerOAuthIdentityInput = {
  providerId: string | undefined;
  profile: Record<string, unknown> | undefined;
  ownerGithubId: string;
};

export type LinkedAccountIdentity = {
  providerId: string;
  accountId: string;
  userId: string;
};

export function normalizeProviderAccountId(value: unknown): string | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const normalized = String(value).trim();
  return normalized.length > 0 ? normalized : null;
}

export function isOwnerOAuthIdentity({
  providerId,
  profile,
  ownerGithubId,
}: OwnerOAuthIdentityInput): boolean {
  if (providerId !== "github") return false;
  return normalizeProviderAccountId(profile?.id) === ownerGithubId;
}

export function isOwnerLinkedAccount({
  sessionUserId,
  accounts,
  ownerGithubId,
}: {
  sessionUserId: string;
  accounts: readonly LinkedAccountIdentity[];
  ownerGithubId: string;
}): boolean {
  return accounts.some(
    (account) =>
      account.providerId === "github" &&
      account.accountId === ownerGithubId &&
      account.userId === sessionUserId,
  );
}
