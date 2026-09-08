import { describe, expect, it } from "vitest";

import {
  createWorkInputSchema,
  parseCreateWorkForm,
  parseUpdateWorkForm,
  updateWorkInputSchema,
} from "./admin-work";

const validEditable = {
  title: "Editorial Work",
  summary: "A bounded editorial work item used to prove the owner publishing lifecycle.",
  category: "PRODUCT_DOMAIN" as const,
  collection: "WORK" as const,
  featuredRank: 1,
  currentRank: null,
  repositoryReferences: [{ label: "Repository", url: "https://github.com/example/project" }],
  sections: [{ kind: "OVERVIEW" as const, title: "Overview", markdown: "Bounded markdown." }],
  evidence: [{ claim: "The lifecycle is covered by tests.", state: "VERIFIED" as const }],
  technologies: ["TypeScript"],
  externalLinks: [{ label: "Reference", url: "https://example.com/reference" }],
};

describe("admin WorkItem input", () => {
  it("accepts the existing bounded editorial shape", () => {
    expect(createWorkInputSchema.safeParse({ slug: "editorial-work", ...validEditable }).success).toBe(true);
    expect(updateWorkInputSchema.safeParse(validEditable).success).toBe(true);
  });

  it.each([
    ["slug", { slug: "Not Valid" }],
    ["category", { category: "INVALID" }],
    ["collection", { collection: "INVALID" }],
    ["featured rank", { featuredRank: 1000 }],
    ["current rank", { currentRank: -1 }],
    ["repository URL", { repositoryReferences: [{ label: "Repository", url: "javascript:alert(1)" }] }],
    ["section kind", { sections: [{ kind: "INVALID", title: "Overview", markdown: "Text" }] }],
    ["evidence state", { evidence: [{ claim: "Claim", state: "INVALID" }] }],
    ["external URL", { externalLinks: [{ label: "Reference", url: "javascript:alert(1)" }] }],
  ])("rejects invalid %s", (_label, patch) => {
    expect(createWorkInputSchema.safeParse({ slug: "editorial-work", ...validEditable, ...patch }).success).toBe(false);
  });

  it("preserves the existing finite array limits", () => {
    expect(createWorkInputSchema.safeParse({
      slug: "editorial-work",
      ...validEditable,
      repositoryReferences: Array.from({ length: 13 }, (_, index) => ({
        label: `Repository ${index}`,
        url: `https://example.com/repos/${index}`,
      })),
    }).success).toBe(false);

    expect(createWorkInputSchema.safeParse({
      slug: "editorial-work",
      ...validEditable,
      sections: Array.from({ length: 17 }, (_, index) => ({
        kind: "OVERVIEW" as const,
        title: `Section ${index}`,
        markdown: "Text",
      })),
    }).success).toBe(false);

    expect(createWorkInputSchema.safeParse({
      slug: "editorial-work",
      ...validEditable,
      evidence: Array.from({ length: 25 }, (_, index) => ({
        claim: `Claim ${index}`,
        state: "IMPLEMENTED" as const,
      })),
    }).success).toBe(false);
  });

  it("does not allow callers to choose publication state on create", () => {
    expect(createWorkInputSchema.safeParse({
      slug: "editorial-work",
      ...validEditable,
      publicationStatus: "PUBLISHED",
    }).success).toBe(false);
    expect(createWorkInputSchema.safeParse({
      slug: "editorial-work",
      ...validEditable,
      publishedAt: new Date(),
    }).success).toBe(false);
  });

  it("normalizes native form values into the bounded WorkItem input", () => {
    const form = new FormData();
    form.set("slug", "editorial-work");
    form.set("title", validEditable.title);
    form.set("summary", validEditable.summary);
    form.set("category", validEditable.category);
    form.set("collection", validEditable.collection);
    form.set("featuredRank", "1");
    form.set("currentRank", "");
    form.set("repositoryReferences", JSON.stringify(validEditable.repositoryReferences));
    form.set("sections", JSON.stringify(validEditable.sections));
    form.set("evidence", JSON.stringify(validEditable.evidence));
    form.set("technologies", JSON.stringify(validEditable.technologies));
    form.set("externalLinks", JSON.stringify(validEditable.externalLinks));

    expect(parseCreateWorkForm(form)).toEqual({ slug: "editorial-work", ...validEditable });
    expect(parseUpdateWorkForm(form)).toEqual(validEditable);
  });

  it("normalizes evidence observation dates from native JSON form values", () => {
    const form = new FormData();
    form.set("slug", "editorial-work");
    form.set("title", validEditable.title);
    form.set("summary", validEditable.summary);
    form.set("category", validEditable.category);
    form.set("collection", validEditable.collection);
    form.set("featuredRank", "1");
    form.set("currentRank", "");
    form.set("repositoryReferences", "[]");
    form.set("sections", "[]");
    form.set("evidence", JSON.stringify([{
      claim: "Observed proof.",
      state: "VERIFIED",
      observedAt: "2026-09-08T00:00:00.000Z",
    }]));
    form.set("technologies", "[]");
    form.set("externalLinks", "[]");

    expect(parseCreateWorkForm(form).evidence[0]?.observedAt).toEqual(
      new Date("2026-09-08T00:00:00.000Z"),
    );
  });

  it("rejects malformed structured form JSON instead of guessing", () => {
    const form = new FormData();
    form.set("slug", "editorial-work");
    form.set("title", validEditable.title);
    form.set("summary", validEditable.summary);
    form.set("category", validEditable.category);
    form.set("collection", validEditable.collection);
    form.set("featuredRank", "");
    form.set("currentRank", "");
    form.set("repositoryReferences", "not-json");
    form.set("sections", "[]");
    form.set("evidence", "[]");
    form.set("technologies", "[]");
    form.set("externalLinks", "[]");

    expect(() => parseCreateWorkForm(form)).toThrow(/invalid/i);
  });

  it("does not allow slug mutation on update", () => {
    expect(updateWorkInputSchema.safeParse({ ...validEditable, slug: "renamed-work" }).success).toBe(false);
  });
});
