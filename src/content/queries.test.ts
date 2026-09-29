import { describe, expect, it } from "vitest";

import { portfolioSiteProfile, portfolioWorkItems } from "./portfolio-data";
import { getSiteProfile, getWorkBySlug, listCurrentWork, listWork } from "./queries";

describe("static portfolio content boundary", () => {
  it("serves the validated profile without runtime environment or database state", async () => {
    await expect(getSiteProfile()).resolves.toEqual(portfolioSiteProfile);
  });

  it("returns WORK items in deterministic featured order", async () => {
    const work = await listWork();

    expect(work.map((item) => item.slug)).toEqual(
      [...portfolioWorkItems]
        .filter((item) => item.collection === "WORK")
        .sort(
          (left, right) =>
            (left.featuredRank ?? Number.MAX_SAFE_INTEGER) -
              (right.featuredRank ?? Number.MAX_SAFE_INTEGER) ||
            left.title.localeCompare(right.title) ||
            left._id.localeCompare(right._id),
        )
        .map((item) => item.slug),
    );
  });

  it("returns current work in deterministic current-rank order", async () => {
    const current = await listCurrentWork();

    expect(current.every((work) => work.currentRank !== null)).toBe(true);
    expect(current.map((work) => work.currentRank)).toEqual(
      [...current].map((work) => work.currentRank).sort((left, right) => (left ?? 0) - (right ?? 0)),
    );
  });

  it("returns work by slug and null for a missing slug", async () => {
    const work = portfolioWorkItems[0];

    await expect(getWorkBySlug(work.slug)).resolves.toEqual(work);
    await expect(getWorkBySlug("missing-work-detail")).resolves.toBeNull();
  });
});
