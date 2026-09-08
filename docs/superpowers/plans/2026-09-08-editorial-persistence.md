# Editorial Persistence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace runtime fixture ownership with a MongoDB-backed editorial read model for `SiteProfile` and `WorkItem`, while preserving the existing public portfolio behavior and draft/published boundary.

**Architecture:** Keep one Next.js application. Add one centralized official MongoDB Node.js driver boundary under `src/db/`, typed Zod schemas and public queries under `src/content/`, and a non-canonical bootstrap seed under `scripts/`. Public routes remain Server Components and read only through the content query boundary. No owner mutations, auth, Cloudinary, GitHub import, case-study detail UX, or 3D are introduced here.

**Tech Stack:** Existing Next.js 16.x / React 19 / TypeScript / pnpm stack, official `mongodb` Node.js driver, `zod`, Vitest, and `mongodb-memory-server-core` for deterministic integration verification.

**Spec:** `docs/superpowers/specs/2026-09-08-personal-engineering-portfolio-design.md`

## Global Constraints

- `dev` is the only implementation branch; `main` remains stable.
- Use the official MongoDB Node.js driver. Do not add Mongoose or another ODM.
- First-class editorial collections in this slice are only `SiteProfile` and `WorkItem`; `MediaAsset` remains deferred to the media slice.
- Public runtime content must come from MongoDB, not `src/content/fixtures.ts` or another bundled runtime fallback.
- Bootstrap seed data is migration/bootstrap input only and is not portfolio editorial authority after persistence exists.
- Public queries expose `PUBLISHED` work only.
- Preserve current identity and exactly the two evidence-backed work candidates. Do not invent commercial outcomes or production claims.
- Keep public pages Server Components. Do not add `use client` merely for data access.
- Keep builds independent of a live MongoDB endpoint; public routes may use request-time SSR in this slice. Cross-request content caching/revalidation is deferred until owner mutations exist.
- Do not add Better Auth, Cloudinary, GitHub API integration, admin UI, contact backend, analytics, Three.js, MediaAsset persistence, Redis, queues, event buses, or a separate backend.

---

## File Structure

Create or modify only the following implementation areas unless an exact generated config/lockfile consequence requires otherwise:

```text
.env.example
README.md
package.json
pnpm-lock.yaml
scripts/bootstrap-content.ts
src/db/mongodb.ts
src/content/model.ts
src/content/queries.ts
src/content/bootstrap-data.ts
src/content/model.test.ts
src/content/queries.integration.test.ts
src/app/page.tsx
src/app/work/page.tsx
src/app/about/page.tsx
src/app/contact/page.tsx
src/components/public/* only where fixture imports must be replaced
```

`src/db/mongodb.ts` owns connection reuse only. `src/content/model.ts` owns runtime schemas/types. `src/content/queries.ts` owns public Mongo queries. Bootstrap data is explicitly non-runtime canonical input.

---

### Task 1: Add MongoDB and test dependencies

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `.env.example`

**Interfaces:**
- Produces environment contract `MONGODB_URI`.
- Produces `pnpm test` and extends `pnpm verify` to include tests.

- [ ] Add current stable compatible `mongodb` and `zod` runtime dependencies.
- [ ] Add current stable compatible `vitest` and `mongodb-memory-server-core` dev dependencies.
- [ ] Add `test: "vitest run"` and make `verify` run `lint`, `typecheck`, `test`, and `build`.
- [ ] Add `.env.example` containing only `MONGODB_URI=mongodb://127.0.0.1:27017/phat_portfolio` as a non-secret example.
- [ ] Run `pnpm install` and confirm no unrelated dependency family is introduced.

### Task 2: Define bounded editorial schemas

**Files:**
- Create: `src/content/model.ts`
- Create: `src/content/model.test.ts`

**Interfaces:**
- Produces `siteProfileSchema`, `workItemSchema`, `SiteProfile`, `WorkItem`, `PublicationStatus`, `WorkCollection`, and `WorkCategory`.

The model must encode:

```text
SiteProfile
- _id = "site"
- schemaVersion = 1
- identity: name, role, specialization, intro
- home: currentBuilding, evidencePhilosophy, aboutSummary, contactPrompt
- engineeringPrinciples[]
- contactLinks[]
- createdAt / updatedAt

WorkItem
- _id string
- schemaVersion = 1
- slug
- title
- summary
- category
- collection
- publicationStatus
- featuredRank nullable integer
- currentRank nullable integer
- repositoryReferences[]
- sections[] using the approved section-kind enum
- evidence[] using IMPLEMENTED / VERIFIED / ACCEPTED / DEPLOYED / OPERATED
- technologies[]
- externalLinks[]
- createdAt / updatedAt / publishedAt nullable
```

All embedded arrays remain bounded by application validation with conservative finite limits appropriate for a personal portfolio; do not create unbounded embedded histories or generic page-builder nodes.

Tests must prove valid bootstrap documents parse and invalid publication/category/evidence values fail.

### Task 3: Add one centralized Mongo client boundary

**Files:**
- Create: `src/db/mongodb.ts`

**Interfaces:**
- Produces `getMongoClient(): Promise<MongoClient>`.
- Produces `getDatabase(): Promise<Db>` using the database encoded in `MONGODB_URI`.
- Produces `closeMongoClientForTests(): Promise<void>` for test cleanup only.

Rules:

```text
missing MONGODB_URI
→ controlled configuration error

warm runtime
→ reuse one MongoClient promise

development hot reload
→ reuse global process-local promise
```

Do not expose MongoDB to Client Components and do not wrap the driver in a repository/service framework.

### Task 4: Define non-canonical bootstrap data and idempotent seed

**Files:**
- Create: `src/content/bootstrap-data.ts`
- Create: `scripts/bootstrap-content.ts`

**Interfaces:**
- `bootstrapSiteProfile` and `bootstrapWorkItems` must conform to the Zod schemas.
- Seed script upserts the singleton profile and the two known work items by stable `_id`/slug without deleting unrelated records.
- Seed script creates required indexes idempotently:
  - unique `slug` on `work_items`;
  - `publicationStatus, collection, featuredRank` on `work_items`;
  - `publicationStatus, currentRank` on `work_items`.

Bootstrap data must preserve:

```text
Nguyen Tien Phat
Software Engineer
AI-native Products & Agentic Systems
Knowledge-first IELTS Learning System
Governed Agentic Engineering System
```

and no other claimed flagship outcome.

Add `content:bootstrap` package script using a minimal TypeScript execution mechanism already justified by the selected test runner/tooling; do not introduce a second general CLI framework.

### Task 5: Implement public Mongo queries with strict draft isolation

**Files:**
- Create: `src/content/queries.ts`
- Create: `src/content/queries.integration.test.ts`

**Interfaces:**
- `getSiteProfile(): Promise<SiteProfile>`
- `listPublishedWork(): Promise<WorkItem[]>`
- `listCurrentPublishedWork(): Promise<WorkItem[]>`

Behavior:

```text
site profile missing
→ controlled server error; no silent bundled fallback

work query
→ publicationStatus = PUBLISHED only
→ collection = WORK for the primary public index
→ deterministic rank/title ordering
```

Integration tests must start `mongodb-memory-server-core`, point `MONGODB_URI` at the ephemeral real MongoDB process, insert schema-valid published and draft documents, and prove:

- profile round-trip succeeds through the official driver;
- published work is returned in deterministic order;
- draft work is never returned by public queries;
- malformed persisted documents fail validation rather than becoming public content.

### Task 6: Switch existing public routes from runtime fixtures to Mongo reads

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/work/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify focused files under `src/components/public/` only as needed
- Remove: `src/content/fixtures.ts` after all runtime imports are eliminated

**Interfaces:**
- Public compositions consume typed `SiteProfile` / `WorkItem` values passed from Server Components.

Use request-time Server Rendering for DB-backed public routes in this slice so `pnpm build` does not require a live Mongo endpoint. Do not add client fetching, SWR, React Query, API proxy routes, or a bundled data fallback.

Preserve the current visual hierarchy and copy semantics. The two current work candidates remain the only published work in bootstrap data.

### Task 7: Verify end to end

**Files:**
- Modify: `README.md` only to document the runtime `MONGODB_URI`, bootstrap command, and verification flow.

Run:

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify
```

Then start an ephemeral MongoDB instance using the same integration-test mechanism, seed the exact bootstrap data, start the production Next.js server with that URI, and prove HTTP 200 for:

```text
/
/work
/about
/contact
```

Inspect rendered output to prove:

- identity still matches approved positioning;
- exactly two published flagship candidates appear;
- a synthetic draft inserted for verification never appears;
- no runtime import from `src/content/fixtures.ts` remains;
- no MongoDB credentials or server modules enter browser output;
- no `use client` boundary was introduced by this slice.

Finally inspect the exact candidate diff and prove no auth/admin/media/GitHub/contact-backend/analytics/Three.js/Redis/queue/backend infrastructure was pulled forward.
