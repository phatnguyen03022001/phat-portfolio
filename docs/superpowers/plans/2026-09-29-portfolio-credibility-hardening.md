# Portfolio Simplification and Credibility Hardening Plan

> **Status:** Forward implementation plan only. This documentation task does not authorize application-code execution.

**Goal:** Reconcile the existing simplification candidate with the approved public engineering evidence portfolio architecture, then strengthen factual evidence, recruiter scanning, accessibility, performance, and production readiness without reintroducing CMS or spectacle-driven complexity.

**Canonical spec:** `docs/superpowers/specs/2026-09-08-personal-engineering-portfolio-design.md`

## Governing constraints

- Preserve the product as a public-only engineering evidence portfolio.
- Git/GitHub remains the durable source for application source, portfolio content, review, rollback, and publication lineage.
- Content remains repository-owned content-as-code; do not permanently freeze one authoring serialization unless implementation evidence later justifies it.
- Keep the public product server/static-first where possible.
- Keep at most three flagship dossiers; two strong dossiers are preferable to a weak third.
- Claims must remain proportional and traceable to evidence.
- Never invent employment, freelancing, client work, customers, revenue, adoption, production usage, deployment, operations, outcomes, or metrics.
- Do not infer deployment or operation from source code, tests, or repository activity.
- Preserve historical TASK-0001 through TASK-0005 evidence as historical truth.
- Do not reintroduce authentication, admin UI, editorial DB, runtime CMS, runtime draft/publish state, Cloudinary as required architecture, runtime GitHub import, or 3D/WebGL systems without new architecture authority.
- Media authoring format/provider is not product semantics.
- Prefer KISS and the smallest sufficient system.

## Slice 1 — Qualify and reconcile the existing simplification candidate

**Purpose:** Determine whether the already-existing foreign application candidate correctly implements the approved architectural removal of auth/admin/database/CMS behavior.

Future execution should:

- bind the exact candidate revision/worktree state;
- review removal of authentication and private admin surfaces;
- review removal of MongoDB/editorial persistence and runtime publication state;
- review repository-owned content replacement;
- review dependency/config changes;
- run focused and canonical verification appropriate to the application;
- fix only proven defects under separately authorized implementation scope;
- publish the simplification through the repository's normal branch workflow when accepted.

This docs task does not perform or approve that code qualification.

## Slice 2 — Finalize the content-as-code ownership boundary

**Purpose:** Make repository ownership clear without turning the current serialization into permanent architecture.

Future execution should establish:

- one obvious repository-owned source for public portfolio content;
- validation sufficient to catch malformed committed content;
- no application-level editorial history subsystem;
- no duplicated truth between content files and runtime persistence;
- agent-friendly update flow: inspect evidence → edit content → validate → review diff → Git publish.

Do not create a service, database, generic repository abstraction, or content framework without a demonstrated need.

## Slice 3 — Reconcile current portfolio data

**Purpose:** Make existing public claims factual before expanding presentation.

For every public identity, work, activity, deployment, operation, and outcome claim:

- establish the source project/repository;
- bind the relevant revision/date when material;
- identify direct supporting evidence;
- remove or narrow unsupported claims;
- preserve known limitations;
- distinguish implementation, verification, acceptance, deployment, and operation where relevant.

Prefer omission over speculative filler.

## Slice 4 — Deepen the strongest flagship dossiers

**Purpose:** Turn the strongest two or three projects into inspectable engineering dossiers rather than repository cards.

Each flagship should support, when evidenced:

- Overview
- Problem
- Constraints
- Responsibility
- Architecture
- Key decisions
- Trade-offs
- Implementation
- Verification
- Operations
- Outcome
- Known limitations
- Inspection/proof links

Acceptance gate:

- responsibility is personally attributable;
- architecture and decisions are understandable without reading the repository;
- material claims have nearby evidence;
- `OPERATED` and outcome claims appear only with direct proof;
- limitations remain visible;
- no third flagship is added only to fill space.

## Slice 5 — Recruiter-scan UX

**Purpose:** Optimize the public composition for progressive scanning.

Target comprehension:

```text
~60 seconds
identity → specialization → strongest proof

~3 minutes
problem classes → responsibility → architecture → decisions
→ verification → current engineering activity

~10 minutes
claim → evidence → known limitations
```

Future implementation should prioritize:

- strong first-viewport identity;
- obvious strongest-work navigation;
- descriptive headings;
- concise problem/responsibility/proof summaries;
- evidence links near claims;
- layer-cake reading;
- strong typography and whitespace;
- restrained accent;
- accessibility and responsive behavior;
- static usefulness without motion.

Avoid generic AI-template styling, icon walls, skill percentages, fake terminal/dashboard proof, equal-card spam, scroll-jacking, blocking intros, and ornamental motion.

## Slice 6 — Factual engineering activity chronology

**Purpose:** Make non-linear engineering history understandable without implying unsupported employment.

Support factual concepts such as:

- `EMPLOYMENT`
- `INDEPENDENT_ENGINEERING`
- `PROFESSIONAL_DEVELOPMENT`
- `EDUCATION`
- `CAREER_BREAK`

Every entry should have:

- a defensible date range;
- a factual activity kind/label;
- a concise summary;
- links to material work/evidence where relevant;
- wording that does not convert study, unemployment, career breaks, or personal engineering into employment/client work.

Do not create a public apology or English-proficiency explanation.

## Slice 7 — Optional media support

**Purpose:** Improve explanation and memorability without provider or format lock-in.

Media may include screenshots, diagrams, AI-generated visual material, screen recordings, images, or short video.

Product requirements should remain behavioral:

- browser-compatible;
- responsive;
- accessible;
- useful dimension/aspect metadata where relevant;
- poster/fallback for video where appropriate;
- lazy loading below the critical path;
- no autoplay with sound;
- reasonable delivery weight;
- optional motion/media must not carry unique required information.

Generated/decorative media must never masquerade as factual screenshots, metrics, customers, deployment proof, operational proof, or engineering evidence.

Do not add a generic media provider or media-management backend without measured need.

## Slice 8 — SEO, accessibility, and performance hardening

Future execution should verify and improve only evidenced gaps in:

- semantic metadata;
- canonical URLs;
- sitemap/robots;
- Open Graph state;
- structured data where justified;
- semantic markup;
- keyboard/focus behavior;
- contrast;
- touch targets;
- reduced motion;
- image/video alternatives;
- responsive layouts;
- critical rendering path;
- unnecessary client boundaries;
- media delivery weight;
- browser runtime errors.

Use measurements where available instead of arbitrary thresholds.

## Slice 9 — Production activation

Before stable production:

- run the repository's canonical verification;
- smoke all public routes and flagship dossier paths;
- verify current public claims against evidence;
- verify no auth/admin/database/CMS dependency has re-entered the target architecture;
- verify useful content works without optional motion/media;
- verify the intended `dev` preview/integration and `main` stable-production lineage;
- verify the production hostname and deployment surface;
- record limitations that remain.

## Explicitly deferred

Unless new product evidence establishes a requirement, defer:

- authentication/account systems;
- admin/editorial UI;
- runtime editorial database;
- runtime draft/publish workflow;
- GitHub runtime import/refresh;
- analytics/recruiter tracking;
- contact-form backend;
- resume/PDF generation infrastructure;
- media-management backend;
- 3D/Three.js/WebGL;
- cinematic presentation infrastructure;
- speculative services, queues, caches, workers, or orchestration.

## Completion principle for future implementation

Each slice should be independently reviewable and should stop when its acceptance evidence is sufficient. Do not use this plan as authority to pull later slices or unrelated infrastructure into an earlier task.
