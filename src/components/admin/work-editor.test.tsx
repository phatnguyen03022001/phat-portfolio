import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../app/admin/(protected)/work/actions", () => ({
  createDraftAction: vi.fn(),
  updateDraftAction: vi.fn(),
  publishWorkAction: vi.fn(),
  unpublishWorkAction: vi.fn(),
}));

import type { WorkItem } from "../../content/model";
import { WorkEditor } from "./work-editor";

const draft: WorkItem = {
  _id: "editorial-work",
  schemaVersion: 1,
  slug: "editorial-work",
  title: "Editorial Work",
  summary: "A bounded editorial work item.",
  category: "PRODUCT_DOMAIN",
  collection: "WORK",
  publicationStatus: "DRAFT",
  featuredRank: 1,
  currentRank: null,
  repositoryReferences: [],
  sections: [],
  evidence: [],
  technologies: ["TypeScript"],
  externalLinks: [],
  createdAt: new Date("2026-09-08T00:00:00.000Z"),
  updatedAt: new Date("2026-09-08T00:00:00.000Z"),
  publishedAt: null,
};

describe("WorkEditor", () => {
  it("creates drafts with a create-only slug and no publication selector", () => {
    const html = renderToStaticMarkup(<WorkEditor mode="create" />);
    expect(html).toContain('name="slug"');
    expect(html).toContain("Create draft");
    expect(html).not.toContain('name="publicationStatus"');
    expect(html).not.toContain("Delete");
  });

  it("lets drafts edit content and publish while keeping slug immutable", () => {
    const html = renderToStaticMarkup(<WorkEditor mode="edit" work={draft} />);
    expect(html).toContain("editorial-work");
    expect(html).not.toContain('name="slug" type="text"');
    expect(html).toContain('name="title"');
    expect(html).toContain("Save draft");
    expect(html).toContain("Publish");
    expect(html).not.toContain("Unpublish");
    expect(html).not.toContain("Delete");
  });

  it("renders published work read-only except explicit unpublish", () => {
    const published = {
      ...draft,
      publicationStatus: "PUBLISHED" as const,
      publishedAt: new Date("2026-09-08T01:00:00.000Z"),
    };
    const html = renderToStaticMarkup(<WorkEditor mode="edit" work={published} />);
    expect(html).toContain("PUBLISHED");
    expect(html).toContain("Unpublish");
    expect(html).not.toContain('name="title"');
    expect(html).not.toContain("Save draft");
    expect(html).not.toMatch(/>Publish</);
    expect(html).not.toContain("Delete");
  });
});
