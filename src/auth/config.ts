import { z } from "zod";

const httpUrlSchema = z.string().url().refine((value) => {
  const protocol = new URL(value).protocol;
  return protocol === "http:" || protocol === "https:";
});

const authEnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: httpUrlSchema,
  GITHUB_CLIENT_ID: z.string().trim().min(1),
  GITHUB_CLIENT_SECRET: z.string().trim().min(1),
  GITHUB_OWNER_ID: z.string().trim().regex(/^[1-9]\d*$/),
});

export type AuthConfig = {
  secret: string;
  baseURL: string;
  githubClientId: string;
  githubClientSecret: string;
  githubOwnerId: string;
};

export function readAuthConfig(env: Record<string, string | undefined> = process.env): AuthConfig {
  const parsed = authEnvSchema.safeParse(env);
  if (!parsed.success) {
    throw new Error("Server configuration error: invalid authentication configuration.");
  }

  return {
    secret: parsed.data.BETTER_AUTH_SECRET,
    baseURL: parsed.data.BETTER_AUTH_URL,
    githubClientId: parsed.data.GITHUB_CLIENT_ID,
    githubClientSecret: parsed.data.GITHUB_CLIENT_SECRET,
    githubOwnerId: parsed.data.GITHUB_OWNER_ID,
  };
}
