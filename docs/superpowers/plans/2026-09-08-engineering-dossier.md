# Engineering Dossier Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Mongo-backed work index into evidence-oriented engineering case-study pages without pulling owner/admin, media, GitHub import, launch hardening, or 3D work forward.

**Architecture:** Keep all public rendering server-first. Add one published-by-slug query at the existing Mongo content boundary, one constrained Markdown renderer with an explicit URL policy and no raw-HTML execution, and focused case-study presentation components with system-owned section ordering. Existing `WorkItem` remains the sole work model; no new collection or page-builder abstraction is introduced.

**Tech Stack:** Existing Next.js 16.3.4 / React 19 / TypeScript / pnpm / MongoDB official driver / Zod / Vitest stack plus current stable compatible `react-markdown` for CommonMark rendering. Do not add `rehype-raw`, MDX, a CMS/page-builder framework, client-side fetching, or a second Markdown system.

**Spec:** `docs/superpowers/specs/2026-09-08-personal-engineering-portfolio-design.md`

## Global Constraints

- `dev` is the only implementation branch; `main` remains stable.
- Preserve the accepted TASK-0002 MongoDB persistence and public-read boundary.
- Public case studies expose only `PUBLISHED` work; a draft slug must resolve as not found.
- Keep `WorkItem` as the only work/project/system model. Do not introduce separate Project/System collections or a generic content-node model.
- Supported section kinds remain exactly `OVERVIEW`, `PROBLEM`, `CONSTRAINTS`, `RESPONSIBILITY`, `ARCHITECTURE`, `KEY_DECISIONS`, `TRADE_OFFS`, `IMPLEMENTATION`, `VERIFICATION`, `OPERATIONS`, `OUTCOME`, and `KNOWN_LIMITATIONS`.
- Evidence states remain exactly `IMPLEMENTED`, `VERIFIED`, `ACCEPTED`, `DEPLOYED`, and `OPERATED`; never collapse them into a score or readiness percentage.
- Rich content is constrained Markdown. Raw HTML, scripts, iframes, arbitrary component execution, MDX imports, and inline event handlers are forbidden.
- Links must use an explicit safe protocol policy; unsafe schemes such as `javascript:` and `data:` must never become active links.
- Repository references remain structured data and are not embedded as arbitrary executable Markdown.
- Public pages remain Server Components. Do not add `use client`, SWR, React Query, or API proxy routes.
- Bootstrap content may be enriched only with claims already supported by target authority. Do not invent responsibility, outcomes, users, revenue, customers, deployment, production operation, or performance gains.
- No Better Auth/admin, Cloudinary/MediaAsset, GitHub API integration, contact backend, analytics, Three.js/3D, Redis, queues, event buses, microservices, or separate backend in this slice.

---

## File Structure

Create or modify only the following implementation areas unless an exact generated lockfile consequence requires otherwise:

```text
package.json
pnpm-lock.yaml
src/content/model.ts
src/content/model.test.ts
src/content/queries.ts
src/content/queries.integration.test.ts
src/content/bootstrap-data.ts
src/content/case-study.ts
src/content/case-study.test.ts
src/components/public/markdown-content.tsx
src/components/public/work-case-study.tsx
src/components/public/selected-work.tsx
src/app/work/page.tsx
src/app/work/[slug]/page.tsx
```

`src/content/case-study.ts` owns system ordering/presentation policy only. `src/components/public/markdown-content.tsx` owns constrained Markdown rendering only. `src/components/public/work-case-study.tsx` owns case-study composition only. Do not create a generic renderer registry, CMS block system, or reusable content framework.

---

### Task 1: Add the narrow Markdown renderer

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `src/components/public/markdown-content.tsx`
- Create: `src/content/case-study.test.ts`

**Interfaces:**
- Produces `MarkdownContent({ markdown }: { markdown: string })`.
- Produces `safeMarkdownUrl(url: string): string` from `src/content/case-study.ts` in Task 2.

- [ ] Add current stable compatible `react-markdown` as the only new runtime dependency.
- [ ] Write a failing server-render test proving normal CommonMark headings, lists, emphasis, blockquotes, links, inline code, and fenced code can render without Client Components.
- [ ] Write a failing safety test proving raw `<script>`/`iframe` markup never becomes executable HTML and `javascript:` / `data:` link targets never become active href values.
- [ ] Implement `MarkdownContent` with `react-markdown`; do not add `rehype-raw`, MDX, arbitrary component injection, or a second Markdown parser.
- [ ] Re-run the focused tests and typecheck.

### Task 2: Lock case-study ordering and URL policy

**Files:**
- Create: `src/content/case-study.ts`
- Modify: `src/content/case-study.test.ts`
- Modify: `src/content/model.ts`
- Modify: `src/content/model.test.ts`

**Interfaces:**
- Produces `orderCaseStudySections(sections)` using the exact approved section order.
- Produces `safeMarkdownUrl(url: string): string` allowing relative/hash links plus `http:`, `https:`, and `mailto:` only.
- Tightens structured URL validation so repository references allow only HTTP(S), while ordinary external/contact links allow HTTP(S)/mailto where appropriate.

- [ ] Write failing tests proving an arbitrary persisted section array is returned in canonical system order without inventing missing sections.
- [ ] Write failing tests proving unsafe URL schemes are rejected/neutralized while approved schemes remain usable.
- [ ] Implement the smallest ordering map/function; no registry, plugin system, or configurable admin ordering.
- [ ] Tighten Zod URL schemas with protocol-aware refinements while preserving current bootstrap content.
- [ ] Re-run model and case-study tests.

### Task 3: Add the published work-detail query

**Files:**
- Modify: `src/content/queries.ts`
- Modify: `src/content/queries.integration.test.ts`

**Interfaces:**
- Produces `getPublishedWorkBySlug(slug: string): Promise<WorkItem | null>`.

Behavior:

```text
published matching slug
→ validate persisted document
→ return WorkItem

draft matching slug
→ return null

missing slug
→ return null

malformed published matching slug
→ fail closed via schema validation
```

- [ ] Write failing real-Mongo integration tests for published, draft, missing, and malformed-slug cases.
- [ ] Implement one direct Mongo query whose predicate includes both `slug` and `publicationStatus: "PUBLISHED"`.
- [ ] Parse the returned document through `workItemSchema` before returning it.
- [ ] Re-run the focused integration suite.

### Task 4: Enrich only the two approved bootstrap cases

**Files:**
- Modify: `src/content/bootstrap-data.ts`
- Modify: `src/content/model.test.ts`

**Interfaces:**
- Existing two bootstrap `WorkItem` records gain bounded case-study sections only.

Allowed content is intentionally narrow:

```text
Knowledge-first IELTS Learning System
- OVERVIEW: current product/domain engineering candidate centered on a knowledge-first IELTS learning system.
- KNOWN_LIMITATIONS: the portfolio does not yet publish outcome/operation claims that are not independently evidenced.

Governed Agentic Engineering System
- OVERVIEW: current agentic engineering system candidate spanning architect-profile, agent-skills, agent-documents, agent-standards, and agent-runtime.
- KNOWN_LIMITATIONS: the portfolio does not collapse repository/task evidence into a synthetic maturity or production-readiness score.
```

Repository references remain the structured inspection surfaces already present. Do not add `RESPONSIBILITY`, `OUTCOME`, `OPERATIONS`, metrics, customers, production usage, or other claims without independent exact authority.

- [ ] Write/adjust tests proving both bootstrap work items parse with the bounded sections above and no unsupported evidence states/outcomes are introduced.
- [ ] Add only those approved section records.
- [ ] Confirm bootstrap remains idempotent through the existing integration test.

### Task 5: Build the public case-study route and composition

**Files:**
- Create: `src/components/public/work-case-study.tsx`
- Create: `src/app/work/[slug]/page.tsx`
- Modify: `src/components/public/selected-work.tsx`
- Modify: `src/app/work/page.tsx`

**Interfaces:**
- `WorkCaseStudy({ work }: { work: WorkItem })` renders identity/category/summary, structured repository references, canonical ordered sections through `MarkdownContent`, structured evidence records when present, technologies/external links when present, and an explicit honest empty evidence state when `evidence.length === 0`.
- `/work/[slug]` calls `getPublishedWorkBySlug`; `null` routes through `notFound()`.

- [ ] Write a failing server-render test or focused component test proving ordered sections, repository links, evidence-state labels, and honest empty-evidence behavior without any score/percentage UI.
- [ ] Implement `WorkCaseStudy` with semantic headings/landmarks and existing global CSS patterns; add only focused CSS if truly required in the existing stylesheet.
- [ ] Implement `/work/[slug]` as an async Server Component with `dynamic = "force-dynamic"`; do not add client data fetching.
- [ ] Add truthful route metadata from the published work title/summary without claiming deployment/operation state.
- [ ] Make `/work` and selected-work cards link to `/work/<slug>` using normal Next.js links.
- [ ] Confirm a draft slug is inaccessible through the public route.

### Task 6: Verify the dossier slice end to end

**Files:**
- No new architecture files. Modify existing test/source files only if a failing acceptance proof identifies a real defect.

Run:

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify
```

Then use the existing ephemeral Mongo/bootstrap mechanism to run the production server and prove:

```text
/work                                      → 200
/work/knowledge-first-ielts-learning-system → 200
/work/governed-agentic-engineering-system   → 200
/work/<synthetic-draft-slug>                 → 404
/work/<missing-slug>                         → 404
```

Inspect rendered output to prove:

- the two approved case-study routes contain only the bounded approved narrative above plus structured repository references;
- section order is system-owned;
- evidence states render distinctly when records exist and no readiness score is generated;
- unsafe Markdown links/raw HTML are not active execution surfaces;
- draft content never becomes public;
- no `use client` boundary or client-fetching dependency was introduced;
- no auth/admin/media/GitHub API/contact-backend/analytics/Three.js/Redis/queue/backend infrastructure was pulled forward.

Finally inspect the exact candidate diff and run `git diff --check` before canonical candidate/report publication.
