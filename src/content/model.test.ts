import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CurrentBuilding } from "../components/public/current-building";
import { EngineeringApproach } from "../components/public/engineering-approach";
import { SelectedWork } from "../components/public/selected-work";

import { bootstrapSiteProfile, bootstrapWorkItems } from "./bootstrap-data";
import { siteProfileSchema, workItemSchema } from "./model";

const now = new Date("2026-09-08T00:00:00.000Z");

const validSiteProfile = {
  _id: "site",
  schemaVersion: 1,
  identity: {
    name: "Nguyen Tien Phat",
    role: "Software Engineer",
    specialization: "AI-native Products & Agentic Systems",
    intro: "Evidence-first engineering with bounded complexity.",
  },
  home: {
    currentBuilding: "Editorial persistence for the public portfolio.",
    evidencePhilosophy: "Claims stay smaller than the evidence.",
    aboutSummary: "Software engineering is the durable identity.",
    contactPrompt: "Start with the work and the constraints.",
  },
  engineeringPrinciples: [
    {
      title: "Proof before claims",
      description: "Credibility follows verifiable evidence.",
    },
  ],
  contactLinks: [{ label: "GitHub", url: "https://github.com/phatnguyen03022001" }],
  createdAt: now,
  updatedAt: now,
};

const validWorkItem = {
  _id: "knowledge-first-ielts-learning-system",
  schemaVersion: 1,
  slug: "knowledge-first-ielts-learning-system",
  title: "Knowledge-first IELTS Learning System",
  summary: "A current product and domain engineering candidate centered on an IELTS learning system.",
  category: "PRODUCT_DOMAIN",
  collection: "WORK",
  publicationStatus: "PUBLISHED",
  featuredRank: 1,
  currentRank: 1,
  repositoryReferences: [
    {
      label: "ilets",
      url: "https://github.com/phatnguyen03022001/ilets",
    },
  ],
  sections: [
    {
      kind: "OVERVIEW",
      title: "Overview",
      markdown: "Evidence-backed candidate only.",
    },
  ],
  evidence: [
    {
      claim: "Implementation exists in the linked repository.",
      state: "IMPLEMENTED",
      method: "Repository inspection",
      result: "Source repository exists and is linked.",
    },
  ],
  technologies: ["TypeScript"],
  externalLinks: [],
  createdAt: now,
  updatedAt: now,
  publishedAt: now,
};

describe("editorial schemas", () => {
  it("accepts bounded SiteProfile and WorkItem documents", () => {
    expect(siteProfileSchema.parse(validSiteProfile)._id).toBe("site");
    expect(workItemSchema.parse(validWorkItem).slug).toBe(validWorkItem.slug);
  });

  it("rejects unapproved publication, category, and evidence states", () => {
    expect(
      workItemSchema.safeParse({ ...validWorkItem, publicationStatus: "PRIVATE" }).success,
    ).toBe(false);
    expect(workItemSchema.safeParse({ ...validWorkItem, category: "AI_PROJECT" }).success).toBe(
      false,
    );
    expect(
      workItemSchema.safeParse({
        ...validWorkItem,
        evidence: [{ ...validWorkItem.evidence[0], state: "DONE" }],
      }).success,
    ).toBe(false);
  });

  it("rejects oversized embedded arrays", () => {
    expect(
      workItemSchema.safeParse({
        ...validWorkItem,
        repositoryReferences: Array.from({ length: 13 }, (_, index) => ({
          label: `repo-${index}`,
          url: `https://github.com/example/repo-${index}`,
        })),
      }).success,
    ).toBe(false);
  });
});


describe("bootstrap editorial data", () => {
  it("contains only the approved identity and two evidence-backed published work candidates", () => {
    expect(siteProfileSchema.parse(bootstrapSiteProfile).identity).toMatchObject({
      name: "Nguyen Tien Phat",
      role: "Software Engineer",
      specialization: "AI-native Products & Agentic Systems",
    });

    const works = bootstrapWorkItems.map((work) => workItemSchema.parse(work));
    expect(works).toHaveLength(2);
    expect(works.map((work) => work.title)).toEqual([
      "Knowledge-first IELTS Learning System",
      "Governed Agentic Engineering System",
    ]);
    expect(works.every((work) => work.collection === "WORK")).toBe(true);
    expect(works.every((work) => work.publicationStatus === "PUBLISHED")).toBe(true);
    expect(works.some((work) => work.category === "COMMERCIAL_OPERATIONAL")).toBe(false);
    expect(works.map((work) => work.sections)).toEqual([
      [
        {
          kind: "OVERVIEW",
          title: "Overview",
          markdown:
            "current product/domain engineering candidate centered on a knowledge-first IELTS learning system.",
        },
        {
          kind: "KNOWN_LIMITATIONS",
          title: "Known limitations",
          markdown:
            "the portfolio does not yet publish outcome/operation claims that are not independently evidenced.",
        },
      ],
      [
        {
          kind: "OVERVIEW",
          title: "Overview",
          markdown:
            "current agentic engineering system candidate spanning architect-profile, agent-skills, agent-documents, agent-standards, and agent-runtime.",
        },
        {
          kind: "KNOWN_LIMITATIONS",
          title: "Known limitations",
          markdown:
            "the portfolio does not collapse repository/task evidence into a synthetic maturity or production-readiness score.",
        },
      ],
    ]);
    expect(works.every((work) => work.evidence.length === 0)).toBe(true);
  });
});


describe("public component data ownership", () => {
  it("renders passed editorial values instead of bundled fixture ownership", () => {
    const profile = siteProfileSchema.parse({
      ...bootstrapSiteProfile,
      identity: { ...bootstrapSiteProfile.identity, name: "Injected Profile Name" },
      home: { ...bootstrapSiteProfile.home, currentBuilding: "Injected current building" },
      engineeringPrinciples: [
        { title: "Injected Principle", description: "Injected principle description." },
      ],
    });
    const work = workItemSchema.parse({
      ...bootstrapWorkItems[0],
      _id: "injected-work",
      slug: "injected-work",
      title: "Injected Work Title",
    });

    expect(
      renderToStaticMarkup(createElement(EngineeringApproach, { principles: profile.engineeringPrinciples })),
    ).toContain("Injected Principle");
    const selectedWorkHtml = renderToStaticMarkup(createElement(SelectedWork, { workItems: [work] }));
    expect(selectedWorkHtml).toContain("Injected Work Title");
    expect(selectedWorkHtml).toContain('href="/work/injected-work"');
    expect(
      renderToStaticMarkup(createElement(CurrentBuilding, { currentBuilding: profile.home.currentBuilding })),
    ).toContain("Injected current building");
  });
});


describe("structured URL policy", () => {
  it("keeps repository references HTTP(S) while allowing mailto for contact and external links", () => {
    expect(
      workItemSchema.safeParse({
        ...validWorkItem,
        repositoryReferences: [{ label: "Repository", url: "mailto:repo@example.com" }],
      }).success,
    ).toBe(false);
    expect(
      workItemSchema.safeParse({
        ...validWorkItem,
        repositoryReferences: [{ label: "Repository", url: "ftp://example.com/repo" }],
      }).success,
    ).toBe(false);
    expect(
      siteProfileSchema.safeParse({
        ...validSiteProfile,
        contactLinks: [{ label: "Email", url: "mailto:hello@example.com" }],
      }).success,
    ).toBe(true);
    expect(
      workItemSchema.safeParse({
        ...validWorkItem,
        externalLinks: [{ label: "Email", url: "mailto:hello@example.com" }],
      }).success,
    ).toBe(true);
  });

  it("rejects non-approved schemes for structured links", () => {
    expect(
      siteProfileSchema.safeParse({
        ...validSiteProfile,
        contactLinks: [{ label: "Blocked", url: "javascript:blocked" }],
      }).success,
    ).toBe(false);
    expect(
      workItemSchema.safeParse({
        ...validWorkItem,
        externalLinks: [{ label: "Blocked", url: "data:text/plain,blocked" }],
      }).success,
    ).toBe(false);
  });
});
