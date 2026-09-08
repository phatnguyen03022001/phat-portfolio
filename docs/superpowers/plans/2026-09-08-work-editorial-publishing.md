# Work Editorial Publishing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the authenticated owner a bounded WorkItem draft/edit/publish workflow without introducing revisioning, deletion, media, GitHub import, or a generic CMS.

**Architecture:** Keep `WorkItem` as the sole work content model and keep MongoDB as direct official-driver persistence. Add an owner-only server mutation boundary and protected admin work screens. New records are always created as `DRAFT`; content is editable only while draft; published records must be explicitly unpublished before editing; publish/unpublish flips the existing publication state and `publishedAt`. Slugs become immutable after creation to avoid accidental public URL changes.

**Tech Stack:** Existing Next.js 16.3.4 / React 19 / TypeScript / pnpm / MongoDB official driver / Zod / Better Auth 1.7.3 / Vitest / mongodb-memory-server-core. No new runtime dependency is required.

**Spec:** `docs/superpowers/specs/2026-09-08-personal-engineering-portfolio-design.md`

## Global Constraints

- `dev` remains the only implementation branch; `main` remains stable.
- Reuse the accepted TASK-0004 owner authorization boundary for every mutation; authenticated-only or cookie-only checks are insufficient.
- Keep `WorkItem` as the only project/system work model and preserve `schemaVersion: 1`.
- New work is created as `DRAFT` only. Creation must never publish implicitly.
- A `PUBLISHED` WorkItem is read-only in the editor until explicitly unpublished.
- Publishing sets `publicationStatus = PUBLISHED` and `publishedAt` to the mutation time. Unpublishing sets `publicationStatus = DRAFT` and `publishedAt = null`.
- Slug is chosen at creation and immutable afterward. Do not add redirect/history machinery in this slice.
- No deletion in this slice. Avoid irreversible content-destruction authority until a real requirement exists.
- Preserve the existing bounded Zod document model, constrained Markdown, evidence-state distinctions, URL policy, and public `PUBLISHED` query boundary.
- No SiteProfile mutation in this task; `/admin/profile` stays read-only.
- No MediaAsset/Cloudinary, uploads, GitHub import, analytics, contact backend, 3D/video, queues, Redis, microservices, separate backend, generic CMS, autosave, revision history, scheduled publishing, or collaboration.
- Public pages remain anonymous and server-rendered.
- Agent Runtime, secure tunnel, parent execution transport and shared operator infrastructure are never task-owned cleanup targets.

---

## File Structure

Create or modify only the focused ownership areas below unless an exact generated lock/type consequence is mechanically required:

```text
src/content/admin-work.ts
src/content/admin-work.test.ts
src/content/admin-work.integration.test.ts
src/app/admin/(protected)/work/page.tsx
src/app/admin/(protected)/work/new/page.tsx
src/app/admin/(protected)/work/[slug]/page.tsx
src/app/admin/(protected)/work/actions.ts
src/components/admin/work-editor.tsx
src/app/globals.css
README.md
```

Do not create an API route, generic repository/service layer, form framework, CMS block registry, background job, revision table, second work collection, or client data cache.

---

### Task 1: Define owner-editable WorkItem input

**Files:**
- Create: `src/content/admin-work.ts`
- Create: `src/content/admin-work.test.ts`

**Interfaces:**
- Produce a bounded input schema/type for create/update operations.
- Produce normalization helpers that convert admin form values into the existing `WorkItem` fields without bypassing `workItemSchema`.
- Preserve the exact existing enums, section kinds, evidence states, URL validation, and finite array limits.

- [ ] Write failing tests proving invalid slug/category/collection/ranks/URLs/section kinds/evidence states and oversized arrays are rejected.
- [ ] Write failing tests proving create input cannot choose `PUBLISHED` or `publishedAt` and update input cannot change slug.
- [ ] Implement the smallest Zod input boundary using existing model schemas/constants where practical instead of duplicating a second content ontology.
- [ ] Re-parse the final candidate document through `workItemSchema` before persistence.
- [ ] Run focused tests and typecheck.

### Task 2: Add direct-Mongo WorkItem mutation lifecycle

**Files:**
- Modify: `src/content/admin-work.ts`
- Create: `src/content/admin-work.integration.test.ts`

**Interfaces:**
- `createDraftWork(input, now)` creates one new DRAFT document with immutable slug and null `publishedAt`.
- `updateDraftWork(slug, input, now)` updates content only when the current persisted document is DRAFT.
- `publishWork(slug, now)` changes an existing validated DRAFT to PUBLISHED with `publishedAt = now`.
- `unpublishWork(slug, now)` changes an existing validated PUBLISHED item to DRAFT with `publishedAt = null`.
- All operations fail closed for missing or malformed persisted documents.

- [ ] Write real-Mongo tests proving create is always DRAFT and duplicate slug fails without overwriting an existing record.
- [ ] Prove draft update works and slug remains unchanged.
- [ ] Prove direct content update of a PUBLISHED item is rejected.
- [ ] Prove publish changes public query visibility and sets `publishedAt`.
- [ ] Prove unpublish removes public visibility and clears `publishedAt`.
- [ ] Prove missing/malformed documents fail closed.
- [ ] Implement direct official-driver operations through the existing Mongo owner; no ODM or generic service abstraction.
- [ ] Re-run the real-Mongo integration suite.

### Task 3: Bind every mutation to owner authorization

**Files:**
- Create: `src/app/admin/(protected)/work/actions.ts`
- Modify: `src/content/admin-work.test.ts` or add one focused action test beside the action when repository conventions justify it.

**Interfaces:**
- Server actions for create draft, update draft, publish, and unpublish.
- Every action calls the accepted owner authorization boundary before reading mutation payload or changing Mongo state.
- Successful mutations redirect/revalidate only the affected admin/public routes.

- [ ] Write tests/source assertions proving every exported mutation action is server-only and requires the live owner session/linked-account gate from TASK-0004.
- [ ] Implement actions using native Next.js server actions; do not add a public mutation API route or client fetch layer.
- [ ] Return/redirect with bounded generic validation errors; never echo secrets, session material, provider tokens, or raw database errors.
- [ ] Revalidate `/`, `/work`, `/work/<slug>`, and affected admin paths only after successful mutation.
- [ ] Run focused tests, lint, and typecheck.

### Task 4: Build the protected work editor

**Files:**
- Modify: `src/app/admin/(protected)/work/page.tsx`
- Create: `src/app/admin/(protected)/work/new/page.tsx`
- Create: `src/app/admin/(protected)/work/[slug]/page.tsx`
- Create: `src/components/admin/work-editor.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- `/admin/work` lists WorkItems with explicit DRAFT/PUBLISHED state and links to create/edit.
- `/admin/work/new` creates only a draft.
- `/admin/work/[slug]` renders the current persisted document. Drafts expose editable fields and a publish control; published records expose a read-only summary plus explicit unpublish control.
- The editor supports the existing core metadata plus bounded repository references, case-study sections, evidence records, technologies, and external links. Empty optional arrays remain valid.

- [ ] Implement forms with semantic labels, keyboard-operable native controls, and existing admin styling; use Client Components only if a concrete form interaction requires them.
- [ ] Do not expose auth configuration or provider credentials into form props/browser code.
- [ ] Render all existing section/evidence data without inventing scores or deployment/operation claims.
- [ ] Keep slug editable only on the create page and display it read-only thereafter.
- [ ] Make published editing impossible from the rendered UI until unpublish succeeds.
- [ ] Confirm `/admin/profile` and `/admin/media` remain read-only placeholders.

### Task 5: Prove publication and public isolation end to end

**Files:**
- No new architectural files. Fix only real defects found by acceptance proof.

Run:

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify
git diff --check
```

Use ephemeral Mongo plus synthetic TASK-0004 auth configuration to prove the server-side lifecycle without real GitHub provider credentials:

```text
anonymous public published work       -> visible
anonymous public draft work           -> absent / 404
anonymous admin mutation attempt      -> rejected / redirected before mutation
owner-authorized create               -> DRAFT only
owner-authorized draft edit           -> persisted
owner-authorized publish              -> becomes public
published content edit without unpublish -> rejected
owner-authorized unpublish            -> becomes non-public
```

Inspect source/output to prove:

- every mutation crosses the accepted owner authorization gate;
- public query code still filters `PUBLISHED` at Mongo boundary;
- no slug mutation, delete operation, revision/history subsystem, autosave or scheduled publication exists;
- no SiteProfile/media/GitHub-import/contact/analytics/3D/backend future slice was pulled forward;
- sensitive auth/session/provider/Mongo material is absent from browser/static output;
- cleanup touches only positively identified task-owned resources and never Agent Runtime/tunnel/parent/shared processes.

Finally inspect exact candidate scope and canonical Git lineage before candidate/report publication.
