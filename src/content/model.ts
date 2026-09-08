import { z } from "zod";

const shortText = z.string().trim().min(1).max(200);
const paragraph = z.string().trim().min(1).max(2_000);
const markdown = z.string().max(12_000);
const url = z.url().max(2_048);
const rank = z.number().int().min(0).max(999).nullable();

export const workCollectionSchema = z.enum(["WORK", "LAB", "ARCHIVE"]);
export const workCategorySchema = z.enum([
  "PRODUCT_DOMAIN",
  "AGENTIC_SYSTEM",
  "COMMERCIAL_OPERATIONAL",
  "SUPPORTING",
]);
export const publicationStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);
export const caseStudySectionKindSchema = z.enum([
  "OVERVIEW",
  "PROBLEM",
  "CONSTRAINTS",
  "RESPONSIBILITY",
  "ARCHITECTURE",
  "KEY_DECISIONS",
  "TRADE_OFFS",
  "IMPLEMENTATION",
  "VERIFICATION",
  "OPERATIONS",
  "OUTCOME",
  "KNOWN_LIMITATIONS",
]);
export const evidenceStateSchema = z.enum([
  "IMPLEMENTED",
  "VERIFIED",
  "ACCEPTED",
  "DEPLOYED",
  "OPERATED",
]);

const engineeringPrincipleSchema = z
  .object({
    title: shortText,
    description: paragraph,
  })
  .strict();

const linkSchema = z
  .object({
    label: shortText,
    url,
  })
  .strict();

const repositoryReferenceSchema = z
  .object({
    label: shortText,
    url,
  })
  .strict();

const caseStudySectionSchema = z
  .object({
    kind: caseStudySectionKindSchema,
    title: shortText,
    markdown,
  })
  .strict();

const evidenceRecordSchema = z
  .object({
    claim: paragraph,
    state: evidenceStateSchema,
    method: paragraph.optional(),
    result: paragraph.optional(),
    sourceKind: shortText.optional(),
    sourceLabel: shortText.optional(),
    sourceUrl: url.optional(),
    revision: shortText.optional(),
    observedAt: z.date().optional(),
  })
  .strict();

export const siteProfileSchema = z
  .object({
    _id: z.literal("site"),
    schemaVersion: z.literal(1),
    identity: z
      .object({
        name: shortText,
        role: shortText,
        specialization: shortText,
        intro: paragraph,
      })
      .strict(),
    home: z
      .object({
        currentBuilding: paragraph,
        evidencePhilosophy: paragraph,
        aboutSummary: paragraph,
        contactPrompt: paragraph,
      })
      .strict(),
    engineeringPrinciples: z.array(engineeringPrincipleSchema).max(12),
    contactLinks: z.array(linkSchema).max(12),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

export const workItemSchema = z
  .object({
    _id: shortText,
    schemaVersion: z.literal(1),
    slug: z
      .string()
      .trim()
      .min(1)
      .max(160)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: shortText,
    summary: paragraph,
    category: workCategorySchema,
    collection: workCollectionSchema,
    publicationStatus: publicationStatusSchema,
    featuredRank: rank,
    currentRank: rank,
    repositoryReferences: z.array(repositoryReferenceSchema).max(12),
    sections: z.array(caseStudySectionSchema).max(16),
    evidence: z.array(evidenceRecordSchema).max(24),
    technologies: z.array(shortText).max(24),
    externalLinks: z.array(linkSchema).max(12),
    createdAt: z.date(),
    updatedAt: z.date(),
    publishedAt: z.date().nullable(),
  })
  .strict();

export type SiteProfile = z.infer<typeof siteProfileSchema>;
export type WorkItem = z.infer<typeof workItemSchema>;
export type PublicationStatus = z.infer<typeof publicationStatusSchema>;
export type WorkCollection = z.infer<typeof workCollectionSchema>;
export type WorkCategory = z.infer<typeof workCategorySchema>;
