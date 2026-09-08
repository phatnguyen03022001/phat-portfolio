import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MarkdownContent } from "../components/public/markdown-content";
import { WorkCaseStudy } from "../components/public/work-case-study";
import { bootstrapWorkItems } from "./bootstrap-data";
import { workItemSchema, type WorkItem } from "./model";
import { orderCaseStudySections, safeMarkdownUrl } from "./case-study";

describe("MarkdownContent", () => {
  it("server-renders the approved CommonMark surfaces", () => {
    const markdown = [
      "# Architecture note",
      "",
      "- first constraint",
      "- second *constraint*",
      "",
      "> Evidence stays proportional to the claim.",
      "",
      "[Repository](https://example.com/repository)",
      "",
      "Use `pnpm verify`.",
      "",
      "```ts",
      "const verified = true;",
      "```",
    ].join("\n");

    const html = renderToStaticMarkup(createElement(MarkdownContent, { markdown }));

    expect(html).toContain("<h1>Architecture note</h1>");
    expect(html).toContain("<ul>");
    expect(html).toContain("<em>constraint</em>");
    expect(html).toContain("<blockquote>");
    expect(html).toContain('href="https://example.com/repository"');
    expect(html).toContain("<code>pnpm verify</code>");
    expect(html).toContain("const verified = true;");
  });

  it("does not execute raw HTML or unsafe Markdown link schemes", () => {
    const markdown = [
      "<script>plain text only</script>",
      "",
      '<iframe src="https://example.invalid"></iframe>',
      "",
      "[javascript](javascript:blocked)",
      "",
      "[data](data:text/plain,blocked)",
    ].join("\n");

    const html = renderToStaticMarkup(createElement(MarkdownContent, { markdown }));

    expect(html).not.toContain("<script");
    expect(html).not.toContain("<iframe");
    expect(html).not.toContain('href="javascript:');
    expect(html).not.toContain('href="data:');
    expect(html).toContain("<a>javascript</a>");
    expect(html).toContain("<a>data</a>");
  });
});

describe("case-study presentation policy", () => {
  it("orders persisted sections by the canonical system order without inventing sections", () => {
    const sections: WorkItem["sections"] = [
      { kind: "OUTCOME", title: "Outcome", markdown: "Outcome body" },
      { kind: "KNOWN_LIMITATIONS", title: "Known limitations", markdown: "Limits body" },
      { kind: "OVERVIEW", title: "Overview", markdown: "Overview body" },
      { kind: "ARCHITECTURE", title: "Architecture", markdown: "Architecture body" },
    ];

    const ordered = orderCaseStudySections(sections);

    expect(ordered.map((section) => section.kind)).toEqual([
      "OVERVIEW",
      "ARCHITECTURE",
      "OUTCOME",
      "KNOWN_LIMITATIONS",
    ]);
    expect(ordered).toHaveLength(sections.length);
    expect(sections[0]?.kind).toBe("OUTCOME");
  });

  it("allows only approved Markdown URL forms", () => {
    expect(safeMarkdownUrl("#evidence")).toBe("#evidence");
    expect(safeMarkdownUrl("/work/example")).toBe("/work/example");
    expect(safeMarkdownUrl("../about")).toBe("../about");
    expect(safeMarkdownUrl("relative/path")).toBe("relative/path");
    expect(safeMarkdownUrl("https://example.com/path")).toBe("https://example.com/path");
    expect(safeMarkdownUrl("http://example.com/path")).toBe("http://example.com/path");
    expect(safeMarkdownUrl("mailto:hello@example.com")).toBe("mailto:hello@example.com");

    expect(safeMarkdownUrl("javascript:blocked")).toBe("");
    expect(safeMarkdownUrl("data:text/plain,blocked")).toBe("");
    expect(safeMarkdownUrl("file:///tmp/example")).toBe("");
    expect(safeMarkdownUrl("//example.com/network-path")).toBe("");
    expect(safeMarkdownUrl("\\\\example.com/backslash-network-path")).toBe("");
  });
});


describe("WorkCaseStudy", () => {
  it("server-renders ordered sections, repositories, evidence states, technologies, and external links", () => {
    const source = bootstrapWorkItems[0];
    const work = workItemSchema.parse({
      ...source,
      sections: [...source.sections].reverse(),
      evidence: [
        {
          claim: "The dossier verification suite is recorded for this case study.",
          state: "VERIFIED",
          method: "Repository-native verification",
          result: "Verification evidence is attached without upgrading deployment claims.",
        },
      ],
      technologies: ["TypeScript", "MongoDB"],
      externalLinks: [{ label: "Reference", url: "https://example.com/reference" }],
    });

    const html = renderToStaticMarkup(createElement(WorkCaseStudy, { work }));

    expect(html).toContain(work.title);
    expect(html).toContain('href="https://github.com/phatnguyen03022001/ilets"');
    expect(html.indexOf("Overview")).toBeLessThan(html.indexOf("Known limitations"));
    expect(html).toContain("VERIFIED");
    expect(html).toContain("TypeScript");
    expect(html).toContain('href="https://example.com/reference"');
    expect(html).not.toMatch(/\b\d{1,3}%\b/);
  });

  it("renders an honest empty evidence state without a synthetic score", () => {
    const work = workItemSchema.parse(bootstrapWorkItems[1]);
    const html = renderToStaticMarkup(createElement(WorkCaseStudy, { work }));

    expect(html).toContain("No published evidence records are attached to this case study yet.");
    expect(html).not.toMatch(/\b\d{1,3}%\b/);
  });
});
