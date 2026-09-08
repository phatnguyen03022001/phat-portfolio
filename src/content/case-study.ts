import type { WorkItem } from "./model";

type CaseStudySectionKind = WorkItem["sections"][number]["kind"];

const CASE_STUDY_SECTION_ORDER: CaseStudySectionKind[] = [
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
];

const sectionOrder = Object.fromEntries(
  CASE_STUDY_SECTION_ORDER.map((kind, index) => [kind, index]),
) as Record<CaseStudySectionKind, number>;

const absoluteScheme = /^[A-Za-z][A-Za-z\d+.-]*:/;
const allowedAbsoluteProtocols = new Set(["http:", "https:", "mailto:"]);
const relativeUrlBase = new URL("https://portfolio.invalid/");

export function orderCaseStudySections(sections: WorkItem["sections"]): WorkItem["sections"] {
  return [...sections].sort((left, right) => sectionOrder[left.kind] - sectionOrder[right.kind]);
}

export function safeMarkdownUrl(url: string): string {
  const value = url.trim();

  if (!value || value.startsWith("//") || /[\u0000-\u001F\u007F]/.test(value)) {
    return "";
  }

  if (!absoluteScheme.test(value)) {
    try {
      return new URL(value, relativeUrlBase).origin === relativeUrlBase.origin ? value : "";
    } catch {
      return "";
    }
  }

  try {
    return allowedAbsoluteProtocols.has(new URL(value).protocol) ? value : "";
  } catch {
    return "";
  }
}
