# Public Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the first deployable public Next.js portfolio shell on `dev` with project-owned editorial styling, shadcn/ui primitives, honest temporary content/media, and no persistence/auth/media-provider/3D scope.

**Architecture:** One Next.js App Router application. Public pages are Server Components by default and use bounded typed fixture data only until the later MongoDB slice. shadcn/ui supplies low-level accessible primitives; `src/app/globals.css` owns the actual portfolio visual language and tokens.

**Tech Stack:** Node.js 24.x LTS, pnpm, Next.js 16.x Active LTS at or above 16.3.3, React version supported by that Next.js release, TypeScript, Tailwind CSS, current shadcn/ui CLI/primitives.

**Spec:** `docs/superpowers/specs/2026-09-08-personal-engineering-portfolio-design.md`

## Global Constraints

- Work only on `dev`; do not mutate `main`.
- Preserve `README.md`, `docs/**`, `.git/**`, and any Architect task artifacts.
- Use Node.js 24.x LTS. Do not use Node.js 26 Current for production tooling.
- Use Next.js 16.x Active LTS and never a version below `16.3.3` because the August 2026 security release identifies `16.3.3` as the patched Active LTS baseline.
- Use App Router, TypeScript, `src/`, Tailwind CSS, and `@/*` imports.
- Initialize current shadcn/ui from its official CLI. Keep generated accessible primitives narrow; do not let default shadcn styling become the brand.
- `globals.css` owns typography, spacing, color tokens, surfaces, responsive composition, focus style, and reduced-motion behavior.
- V1 contains no MongoDB, Better Auth, Cloudinary, GitHub API integration, contact form, analytics, Three.js, GLB, video pipeline, or custom 3D asset.
- Temporary visuals must be clearly decorative/placeholder treatment and must not imply fake project evidence.
- Public case-study claims must remain bounded to facts already present in the approved spec. Do not invent outcomes, production usage, revenue, clients, seniority, metrics, or experience.
- Prefer Server Components. Do not add a Client Component merely for hover/reveal effects that CSS can handle.

---

### Task 1: Scaffold the secure Next.js application foundation

**Files:**
- Create/merge scaffold files at repository root: `package.json`, `pnpm-lock.yaml`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Preserve: `README.md`, `docs/**`

**Interfaces:**
- Consumes: approved design spec only.
- Produces: a root Next.js App Router application using `src/`, TypeScript and pnpm.

- [ ] **Step 1: Prove the working copy is the exact target and branch**

Run repository identity, branch, HEAD, upstream/ref, and clean-tree checks before mutation. Stop if the checkout is not `phatnguyen03022001/phat-portfolio` on the exact task base and `dev`.

- [ ] **Step 2: Resolve the implementation-time stable toolchain**

Confirm Node is 24.x LTS and resolve the latest patched Next.js 16.x Active LTS release, with `16.3.3` as a hard minimum. Record exact installed versions in `package.json`/lockfile; do not pin the architecture document to those patch versions.

- [ ] **Step 3: Generate the Next.js scaffold without overwriting repository authority**

Use the official `create-next-app` flow with TypeScript, Tailwind CSS, ESLint, App Router, `src/`, pnpm, and `@/*`. Because the repository already contains durable files, scaffold in a temporary directory if necessary and copy only application/tooling files into the target. Never replace `README.md`, `docs/**`, `.agent/**`, or `.git/**` from generated output.

- [ ] **Step 4: Normalize scripts and runtime contract**

`package.json` must expose at least:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "verify": "pnpm lint && pnpm typecheck && pnpm build"
  },
  "engines": {
    "node": "24.x"
  }
}
```

Keep any generated scripts only when they have a current use.

- [ ] **Step 5: Run the clean scaffold verification**

Run:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Expected: all commands exit 0 before product composition work begins.

### Task 2: Initialize shadcn/ui as a primitive layer

**Files:**
- Create/modify: `components.json`
- Create/modify generated shadcn support under `src/components/ui/`
- Create/modify generated utility boundary if current shadcn CLI requires it, normally `src/lib/utils.ts`

**Interfaces:**
- Consumes: Task 1 Next.js/Tailwind setup.
- Produces: current official shadcn configuration plus only the primitives actually used by the public shell.

- [ ] **Step 1: Initialize shadcn using the current official CLI**

Run the current supported shadcn init flow against the existing Next.js project. Keep `src/` and `@/*` aliases aligned with the generated project.

- [ ] **Step 2: Add only one immediately used primitive**

Add `button` through the shadcn CLI. Do not pre-install card/dialog/sheet/tabs/accordion/form or other primitives for future admin work.

- [ ] **Step 3: Verify generated imports against the current shadcn release**

Current September 2026 shadcn uses the `cn` package in newly generated components. Accept the current official generated convention rather than restoring older `clsx`/`tailwind-merge` boilerplate without reason.

- [ ] **Step 4: Re-run `pnpm verify`**

Expected: exit 0.

### Task 3: Establish the global editorial design foundation

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/components/public/site-header.tsx`
- Create: `src/components/public/site-footer.tsx`
- Create: `src/components/public/placeholder-visual.tsx`

**Interfaces:**
- Consumes: shadcn primitive layer.
- Produces: shared public shell and project-owned visual tokens.

- [ ] **Step 1: Define global CSS tokens**

Create a restrained neutral system for background, foreground, muted text, borders/surfaces, one Picmao accent token, container width, spacing rhythm, radii, and focus ring. Use CSS custom properties in `globals.css`; avoid a page-local pile of arbitrary values.

- [ ] **Step 2: Add automatic dark treatment without a theme subsystem**

Use CSS `prefers-color-scheme: dark` for the initial dark palette. Do not introduce theme persistence, a theme provider, cookies, or a client-side theme toggle in this task.

- [ ] **Step 3: Define global accessibility behavior**

Provide visible `:focus-visible` treatment, readable selection state, safe text wrapping, responsive media defaults, and a `prefers-reduced-motion: reduce` rule that removes non-essential transition/animation duration.

- [ ] **Step 4: Build a server-rendered header and footer**

Header navigation is exactly the current public route set: Home, Work, About, Contact. Keep it semantic and usable without a mobile drawer; four links do not justify a client-side menu yet.

- [ ] **Step 5: Build the temporary visual primitive**

`PlaceholderVisual` must be an `aria-hidden` presentational block using CSS composition only. It may suggest an editorial/technical visual surface but must contain no fake screenshots, fake terminal output, fake metrics, or external stock image dependency.

- [ ] **Step 6: Re-run `pnpm verify`**

Expected: exit 0.

### Task 4: Build the public route shell from honest fixture content

**Files:**
- Create: `src/content/fixtures.ts`
- Create: `src/components/public/hero.tsx`
- Create: `src/components/public/selected-work.tsx`
- Create: `src/components/public/engineering-approach.tsx`
- Create: `src/components/public/current-building.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/work/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: approved positioning and public IA from the design spec.
- Produces: the complete V1 public shell routes using temporary typed fixtures.

- [ ] **Step 1: Create bounded fixture types/data**

Fixture content may contain only the approved identity and two evidence-backed current flagship candidates:

```text
Nguyen Tien Phat
Software Engineer
AI-native Products & Agentic Systems

Knowledge-first IELTS Learning System
Governed Agentic Engineering System
```

The commercial/operational flagship must not be rendered as completed work before evidence exists. Mark fixture ownership clearly as temporary until the MongoDB editorial slice replaces it.

- [ ] **Step 2: Implement the homepage information hierarchy**

Render, in order:

```text
Hero / identity
Selected Work
Engineering Approach
Current / Building
Evidence Philosophy
About summary
Contact CTA
```

The primary hero copy must communicate engineering ownership, not AI novelty. Use temporary `PlaceholderVisual` treatment where a future project cover or V2 character would live.

- [ ] **Step 3: Implement `/work`**

Show only curated evidence-backed work candidates. Do not create a GitHub repository dump or technology icon wall.

- [ ] **Step 4: Implement `/about`**

Keep it concise: durable identity, current specialization, evidence-first/KISS working principles, and a capability grouping placeholder that does not use percentage/proficiency bars.

- [ ] **Step 5: Implement `/contact`**

Use direct contact-link presentation only. Do not build a form, API endpoint, mail provider, spam mitigation, or rate limiter.

- [ ] **Step 6: Use shadcn Button only where an actual action exists**

Use the generated current Button primitive for a real CTA without forcing all navigation links through button styling.

- [ ] **Step 7: Verify server/client boundaries**

No new file should contain `"use client"` unless a real browser-only requirement arose. If one is necessary, document the concrete reason in the Executor report; CSS-only motion is not sufficient reason.

### Task 5: Add baseline metadata and final verification

**Files:**
- Modify: `src/app/layout.tsx`
- Modify route page metadata only where useful
- Modify: `README.md` only to document current development/verification commands and V1 status; preserve repository/product identity.

**Interfaces:**
- Consumes: public route shell.
- Produces: a reviewable first implementation candidate.

- [ ] **Step 1: Set truthful baseline metadata**

Use the approved identity and `phat.picmao.com` as the intended production hostname. Do not claim deployment is live if it is not. Full sitemap/robots/dynamic OG work belongs to launch-hardening unless trivially correct at this stage.

- [ ] **Step 2: Run repository verification**

Run:

```bash
pnpm verify
```

Expected: exit 0.

- [ ] **Step 3: Run local route smoke checks**

Start the production build and confirm HTTP 200 plus readable server-rendered HTML for:

```text
/
/work
/about
/contact
```

Also inspect at representative narrow and wide viewport widths for horizontal overflow and obvious focus/contrast failures.

- [ ] **Step 4: Inspect the final diff**

Confirm there is no MongoDB, Better Auth, Cloudinary, GitHub API, contact endpoint, analytics, Three.js, generated 3D asset, video pipeline, broad component library installation, or `main` mutation.

- [ ] **Step 5: Commit and publish the candidate**

Commit the coherent implementation candidate on `dev`, push non-force, then create/update the canonical Executor report required by the governing task and stop for Architect review.
