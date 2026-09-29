import { portfolioSiteProfile, portfolioWorkItems } from "./portfolio-data";
import { siteProfileSchema, workItemSchema, type SiteProfile, type WorkItem } from "./model";

const siteProfile = siteProfileSchema.parse(portfolioSiteProfile);
const workItems = portfolioWorkItems.map((work) => workItemSchema.parse(work));

function compareRank(
  left: number | null,
  right: number | null,
  fallbackLeft: string,
  fallbackRight: string,
): number {
  const leftRank = left ?? Number.MAX_SAFE_INTEGER;
  const rightRank = right ?? Number.MAX_SAFE_INTEGER;
  return leftRank - rightRank || fallbackLeft.localeCompare(fallbackRight);
}

export async function getSiteProfile(): Promise<SiteProfile> {
  return siteProfile;
}

export async function listWork(): Promise<WorkItem[]> {
  return workItems
    .filter((work) => work.collection === "WORK")
    .sort(
      (left, right) =>
        compareRank(left.featuredRank, right.featuredRank, left.title, right.title) ||
        left._id.localeCompare(right._id),
    );
}

export async function listCurrentWork(): Promise<WorkItem[]> {
  return workItems
    .filter((work) => work.currentRank !== null)
    .sort(
      (left, right) =>
        compareRank(left.currentRank, right.currentRank, left.title, right.title) ||
        left._id.localeCompare(right._id),
    );
}

export async function getWorkBySlug(slug: string): Promise<WorkItem | null> {
  return workItems.find((work) => work.slug === slug) ?? null;
}
