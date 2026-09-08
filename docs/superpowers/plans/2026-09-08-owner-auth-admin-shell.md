# Owner Auth and Admin Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one owner-only Better Auth + GitHub OAuth security boundary and the protected `/admin` information architecture without pulling editorial mutations, media, GitHub import, or launch/deployment work forward.

**Architecture:** Keep one Next.js application and the accepted MongoDB connection owner. Better Auth owns its own persistence records through the official MongoDB adapter. Authentication admits only the configured immutable GitHub owner account ID, and authorization re-validates both the live Better Auth session and the linked GitHub provider account before rendering any protected admin route. `/admin` is a read-only shell in this slice; editing begins in the next delivery slice.

**Tech Stack:** Existing Next.js 16.3.4 / React 19 / TypeScript / pnpm / official MongoDB driver / Zod / Vitest / mongodb-memory-server-core stack plus exact compatible `better-auth` and `@better-auth/mongo-adapter` 1.7.3.

**Spec:** `docs/superpowers/specs/2026-09-08-personal-engineering-portfolio-design.md`

## Global Constraints

- `dev` is the only implementation branch; `main` remains stable.
- Exactly one logical application role exists: owner/admin.
- GitHub OAuth is the only sign-in method in V1. No email/password, password recovery, magic-link, organization, membership, RBAC, multi-role, or self-service registration surface.
- Authorization is not `authenticated = admin`. Every protected admin request must prove the configured immutable GitHub owner account identity in addition to a valid session.
- Authorization identity is the provider-side immutable GitHub account ID. GitHub login, name, avatar, email, and mutable profile fields are display data only and never authorization keys.
- Better Auth owns its own auth persistence records. Do not add auth records to `SiteProfile`, `WorkItem`, or another application collection.
- Reuse the existing MongoDB client/database ownership. Do not create a second Mongo connection subsystem, ODM, auth database abstraction, Redis/session store, or separate backend.
- Keep account linking disabled. Do not expose generic account-management/settings UI.
- Keep Better Auth CSRF/origin protections enabled. Do not enable `disableCSRFCheck`, `disableOriginCheck`, broad trusted-origin wildcards, cross-subdomain cookies, or proxy/header trust without a concrete deployment requirement.
- Use an explicit `BETTER_AUTH_URL` per environment in this slice. Dynamic preview-host auth routing is launch/deployment work and is not introduced here.
- Public portfolio routes remain unchanged and anonymous.
- `/admin`, `/admin/work`, `/admin/profile`, and `/admin/media` exist as the owner shell. `work`, `profile`, and `media` are shell destinations only; no mutation form, upload, publish action, GitHub import, or media provider is activated here.
- Public/site editorial content remains Mongo-backed exactly as accepted through TASK-0003.
- The production build must not require a live MongoDB endpoint, real GitHub OAuth credentials, or a real Better Auth secret at build time. Runtime auth requests fail closed with controlled configuration errors when required runtime configuration is absent.
- Secrets remain external. Do not commit a real Better Auth secret, GitHub client secret, GitHub owner ID, OAuth token, session token, or Mongo credential.
- Preserve `engines.node=24.x` and record the actual verification runtime truthfully.
- No Cloudinary/MediaAsset implementation, GitHub repository API import, contact backend, analytics, Three.js/3D/video, Redis, queue, event bus, microservice, separate backend, theme subsystem, or unrelated refactor.
- Agent Runtime, secure tunnel, parent execution transport, and shared operator infrastructure are not task-owned processes. Cleanup may terminate only processes/resources positively proven to be owned by the current task run.

---

## File Structure

Create or modify only these ownership areas unless an exact lockfile/generated Next.js consequence requires otherwise:

```text
.env.example
README.md
package.json
pnpm-lock.yaml
src/db/mongodb.ts
src/auth/config.ts
src/auth/config.test.ts
src/auth/owner-policy.ts
src/auth/owner-policy.test.ts
src/auth/server.ts
src/auth/server.integration.test.ts
src/auth/client.ts
src/app/api/auth/[...all]/route.ts
src/app/admin/sign-in/page.tsx
src/app/admin/(protected)/layout.tsx
src/app/admin/(protected)/page.tsx
src/app/admin/(protected)/work/page.tsx
src/app/admin/(protected)/profile/page.tsx
src/app/admin/(protected)/media/page.tsx
src/components/admin/admin-shell.tsx
src/components/admin/admin-auth-actions.tsx
src/app/globals.css
```

`src/auth/config.ts` owns runtime auth environment parsing only. `src/auth/owner-policy.ts` owns provider/account identity policy only. `src/auth/server.ts` owns one cached Better Auth server instance and owner-session guard. `src/auth/client.ts` owns the browser auth client. `src/components/admin/*` owns admin-shell presentation and sign-in/sign-out interaction. Do not create a generic permission framework, auth service layer, role registry, middleware framework, or admin CMS abstraction.

---

### Task 1: Add Better Auth dependencies and runtime configuration contract

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `.env.example`
- Modify: `README.md`
- Create: `src/auth/config.ts`
- Create: `src/auth/config.test.ts`

**Interfaces:**
- Produces `readAuthConfig()` returning validated server-only values for `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, and `GITHUB_OWNER_ID`.
- No `NEXT_PUBLIC_*` auth secrets or owner identity values are introduced.

- [ ] Add exact current-compatible `better-auth@1.7.3` and `@better-auth/mongo-adapter@1.7.3` as the only new runtime dependency family for this slice.
- [ ] Add `.env.example` placeholders for the five auth variables above while preserving `MONGODB_URI`; use synthetic placeholders, never the operator's real GitHub account ID or secrets.
- [ ] Write failing config tests proving missing values fail with a controlled server configuration error, `BETTER_AUTH_SECRET` shorter than 32 characters fails, `BETTER_AUTH_URL` must be an absolute HTTP(S) URL, and `GITHUB_OWNER_ID` must be a non-empty immutable provider ID representation.
- [ ] Implement the smallest Zod-backed server-only config reader. Do not export secrets through client modules.
- [ ] Update README only with the exact local OAuth callback `/api/auth/callback/github`, required runtime variables, and the fact that the GitHub OAuth/App email permission must support Better Auth's GitHub flow. Do not duplicate the architecture spec.
- [ ] Run focused tests, typecheck, and dependency inspection.

### Task 2: Adapt the existing Mongo owner for Better Auth without a second connection system

**Files:**
- Modify: `src/db/mongodb.ts`
- Modify existing Mongo integration tests only if necessary to preserve current behavior

**Interfaces:**
- Existing `getMongoClient()`, `getDatabase()`, and `closeMongoClientForTests()` remain behaviorally compatible.
- Produces the smallest additional stable access needed for Better Auth's Mongo adapter to receive the same process-owned `MongoClient` and `Db` handles.

- [ ] Write/adjust a failing test that proves the Better Auth adapter path and existing portfolio queries use the same centralized Mongo client ownership rather than constructing an independent auth client.
- [ ] Refactor only as required to let Better Auth receive a `Db` plus the same `MongoClient` while retaining development hot-reload reuse and controlled missing-URI failure.
- [ ] Preserve existing TASK-0002/TASK-0003 Mongo integration tests.
- [ ] Do not add a provider/repository abstraction, second URI, second Mongo database, or ODM.

### Task 3: Lock owner identity policy before wiring OAuth

**Files:**
- Create: `src/auth/owner-policy.ts`
- Create: `src/auth/owner-policy.test.ts`

**Interfaces:**
- Produces a pure admission predicate for Better Auth `user.validateUserInfo` that accepts only OAuth provider `github` whose raw GitHub profile immutable `id`, string-normalized, equals configured `GITHUB_OWNER_ID`.
- Produces a pure authorization predicate over `{ sessionUserId, accounts, ownerGithubId }` that requires a linked account with `providerId === "github"`, `accountId === ownerGithubId`, and `userId === sessionUserId`.

- [ ] Write failing tests for the exact owner GitHub ID success path.
- [ ] Prove wrong GitHub ID, wrong provider, absent profile ID, mutable login/email-only matches, wrong Better Auth user ID, and empty account sets all reject.
- [ ] Implement only the pure policy functions. Do not introduce role tables, RBAC, permission arrays, or mutable login/email authorization.
- [ ] Keep errors generic; rejection output must not disclose the configured owner ID.

### Task 4: Configure Better Auth with defense-in-depth owner gating

**Files:**
- Create: `src/auth/server.ts`
- Create: `src/auth/server.integration.test.ts`
- Create: `src/auth/client.ts`

**Interfaces:**
- Produces one cached `getAuth()` Better Auth server instance.
- Produces `getOwnerSession(headers)` and `requireOwnerSession(headers)` (or equivalent narrow names with the same semantics).
- Browser `authClient` exposes only the normal Better Auth client needed for GitHub sign-in/sign-out interaction.

- [ ] Write failing tests proving the configured auth instance has GitHub as the only social provider, email/password is not enabled, account linking is disabled, and the owner admission predicate is wired into `user.validateUserInfo`.
- [ ] Configure Better Auth with the official MongoDB adapter using the existing centralized `Db`/`MongoClient` ownership.
- [ ] Configure GitHub OAuth only. Use the provider's normal email scope/permission required by current Better Auth GitHub documentation; do not request repository/admin scopes.
- [ ] Set explicit base URL/secret from validated runtime config and route OAuth errors to the admin sign-in surface without exposing sensitive identity details.
- [ ] Disable account linking. Do not add Better Auth Admin, Organization, password, magic-link, 2FA, passkey, or other plugins.
- [ ] Wire `user.validateUserInfo` to fail closed unless the raw GitHub OAuth profile ID matches `GITHUB_OWNER_ID`.
- [ ] Implement owner-session authorization by calling Better Auth's live session API and its linked-account API, then apply the pure policy predicate. A valid session without the exact GitHub provider account remains unauthorized.
- [ ] Ensure auth instance creation is lazy/runtime-safe so `pnpm build` remains independent of real secrets and a live Mongo endpoint.
- [ ] Run focused integration tests against `mongodb-memory-server-core` with synthetic auth configuration. Do not attempt a live GitHub OAuth callback in deterministic tests.

### Task 5: Mount the auth route and owner sign-in interaction

**Files:**
- Create: `src/app/api/auth/[...all]/route.ts`
- Create: `src/app/admin/sign-in/page.tsx`
- Create: `src/components/admin/admin-auth-actions.tsx`

**Interfaces:**
- `/api/auth/[...all]` delegates GET/POST to the cached Better Auth instance through the current Next.js integration contract.
- `/admin/sign-in` is anonymous-accessible and presents one GitHub sign-in action.
- Sign-in uses `provider: "github"` and callback `/admin`; sign-out returns to `/admin/sign-in`.

- [ ] Mount Better Auth without adding a second API/backend layer.
- [ ] Implement the smallest Client Component required for GitHub sign-in/sign-out. No client session authorization or client-only route protection.
- [ ] Keep the sign-in page a Server Component except the browser interaction island.
- [ ] If an already-authorized owner reaches `/admin/sign-in`, redirect to `/admin` server-side.
- [ ] Do not expose generic sign-up, account-linking, password, recovery, profile editing, or provider-selection UI.

### Task 6: Add the protected read-only admin shell

**Files:**
- Create: `src/app/admin/(protected)/layout.tsx`
- Create: `src/app/admin/(protected)/page.tsx`
- Create: `src/app/admin/(protected)/work/page.tsx`
- Create: `src/app/admin/(protected)/profile/page.tsx`
- Create: `src/app/admin/(protected)/media/page.tsx`
- Create: `src/components/admin/admin-shell.tsx`
- Modify: `src/app/globals.css` only for focused shell styles actually used

**Interfaces:**
- The protected route-group layout calls the server-side owner guard on every admin-shell request and redirects unauthorized sessions to `/admin/sign-in`.
- Admin navigation is exactly Dashboard / Work / Profile / Media.

- [ ] Write focused server/policy evidence showing a merely authenticated-but-nonowner auth state cannot satisfy the protected layout guard.
- [ ] Implement the protected layout using a real Better Auth session/database check, not a cookie-presence shortcut.
- [ ] Add `/admin` dashboard with truthful read-only shell/status content only.
- [ ] Add `/admin/work`, `/admin/profile`, and `/admin/media` as truthful shell destinations that explicitly defer editing/upload behavior to later slices.
- [ ] Do not add draft editing, save/publish actions, forms that mutate editorial data, Cloudinary widgets, GitHub import, media records, generic settings, or extra admin nouns.
- [ ] Keep public site routes and current public navigation behavior unchanged.

### Task 7: Verify the owner boundary end to end

**Files:**
- No new architecture files. Modify authorized source/tests only if a failing acceptance proof identifies a real defect.

Run:

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify
git diff --check
```

Then start an ephemeral MongoDB and the production Next.js server with synthetic, non-secret auth configuration and prove:

```text
/admin/sign-in          → 200 anonymous
/admin                  → redirect to /admin/sign-in when anonymous
/admin/work             → redirect to /admin/sign-in when anonymous
/admin/profile          → redirect to /admin/sign-in when anonymous
/admin/media            → redirect to /admin/sign-in when anonymous
/api/auth/*             → mounted Better Auth handler
```

Also prove deterministically:

- GitHub is the only configured social provider;
- owner admission accepts only the configured raw GitHub profile `id` and rejects a different GitHub ID;
- post-session authorization requires the exact linked `(providerId=github, accountId=GITHUB_OWNER_ID, userId=session.user.id)` identity;
- account linking is disabled;
- email/password and generic signup UI are absent;
- build/client output does not contain synthetic `BETTER_AUTH_SECRET`, `GITHUB_CLIENT_SECRET`, or `GITHUB_OWNER_ID` sentinel values;
- no public route gained an auth requirement;
- no owner/admin route trusts cookie presence alone for security;
- no Cloudinary/media persistence, GitHub import, editorial mutation, analytics, 3D, Redis/queue/backend infrastructure, role framework, organization plugin, or unrelated service was introduced;
- no task cleanup terminates Agent Runtime, secure tunnel, parent transport, or unrelated operator processes.

A real GitHub OAuth callback cannot be truthfully claimed without real provider credentials and an authorized callback environment. Record that as environment/deployment evidence for later activation rather than faking a live OAuth success. The deterministic slice is acceptable only if all local security predicates above pass and no task authority explicitly requires a live provider callback.
