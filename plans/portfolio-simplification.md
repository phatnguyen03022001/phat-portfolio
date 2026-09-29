# Portfolio Simplification Implementation Plan

**Status:** FORWARD PLAN — NOT EXECUTED BY THIS DOCUMENTATION CHANGE

**Revision:** 1

**Target Spec:** [`specs/portfolio.md`](../specs/portfolio.md)

**Execution Preconditions:** Bind the exact repository/candidate state, preserve unrelated work, obtain implementation authority, and verify task-specific effect budgets before application mutation.

## Goal

Reconcile the implementation with the approved public engineering evidence portfolio specification, then strengthen factual content, recruiter scanning, accessibility, performance, and production readiness without reintroducing superseded CMS or spectacle-driven architecture.

## Current State

The repository contains historical evidence for earlier implementation slices and a separately owned portfolio simplification candidate. This plan does not declare that application candidate accepted, verified, deployed, or production-ready.

Historical TASK-0001 through TASK-0005 artifacts remain immutable evidence of what was true when those tasks ran.

## Target State

The implementation matches [`specs/portfolio.md`](../specs/portfolio.md):

- public-only engineering evidence portfolio;
- repository-owned content-as-code;
- server/static-first public content where practical;
- curated flagship engineering dossiers;
- factual engineering activity;
- traceable claim-to-evidence relationships;
- optional provider/format-agnostic media;
- no product dependency on auth/admin/editorial DB/runtime CMS/runtime draft-publish/runtime GitHub import/3D infrastructure.

## In Scope

Future authorized implementation work may:

- qualify the existing simplification candidate;
- reconcile repository-owned content and current public claims;
- deepen flagship dossiers;
- improve recruiter-scan composition;
- add factual engineering activity;
- add optional explanatory/factual media;
- harden SEO, accessibility, and performance;
- activate and prove stable production.

## Out of Scope

This documentation change does not execute application code work.

Future slices must not pull in, without new spec authority:

- authentication/account systems;
- owner/admin editorial UI;
- runtime editorial databases or CMS behavior;
- application-level draft/publish persistence;
- runtime GitHub content import;
- required media-management providers/backends;
- analytics/recruiter tracking;
- contact-form backend;
- Three.js/WebGL/3D/cinematic infrastructure;
- speculative services, queues, caches, workers, or orchestration.

## Constraints

- Consume [`specs/portfolio.md`](../specs/portfolio.md); do not redefine it.
- Follow [`rules/repository.md`](../rules/repository.md), [`rules/engineering.md`](../rules/engineering.md), [`rules/evidence.md`](../rules/evidence.md), and [`rules/design.md`](../rules/design.md).
- Preserve historical task evidence unchanged.
- Keep claims proportional to direct proof.
- Prefer the smallest sufficient architecture and implementation slice.
- Each task must be independently reviewable and must stop when its own acceptance evidence is sufficient.

## Risks

- Treating the existing simplification candidate as accepted before qualification.
- Reintroducing removed product architecture through historical plans or implementation leftovers.
- Expanding portfolio claims faster than evidence can support them.
- Over-investing in motion/media before core evidence and recruiter scanning are strong.
- Adding provider/framework abstractions that outlive their actual requirement.
- Conflating build/test success with deployment or operation.

## Tasks

### 1. Qualify the Existing Simplification Candidate

Bind the exact candidate state and review it against the target spec.

Verify, as applicable:

- removal of authentication/private admin behavior;
- removal of editorial database/CMS/runtime draft-publish behavior;
- repository-owned content replacement;
- dependency/config consequences;
- public route behavior;
- focused and canonical application verification required by the owning task.

Fix only proven defects under explicit implementation authority.

Completion gate: the candidate has an explicit accepted/rejected outcome backed by reproducible evidence. Do not infer acceptance from its presence in Git history.

### 2. Reconcile Content-as-Code Ownership

Establish one obvious repository-owned canonical source for public portfolio content.

Require:

- bounded validation for committed content;
- no duplicated runtime editorial truth;
- no application-level editorial history subsystem;
- agent-friendly update flow: inspect evidence → edit content → validate → review diff → Git publish.

Do not add a service/database/generic content abstraction without a demonstrated requirement.

### 3. Remove Remaining Obsolete Runtime Assumptions

Search the accepted implementation for assumptions tied to superseded product architecture.

Remove or narrow only proven leftovers such as:

- auth/admin-only routing or configuration;
- editorial DB/CMS state;
- runtime draft/publish assumptions;
- runtime GitHub content import;
- required provider-specific media behavior;
- 3D/WebGL pipeline assumptions.

Completion gate: no runtime dependency remains solely because an historical plan once required it.

### 4. Reconcile Current Content

For each public identity, work, activity, deployment, operation, and outcome claim:

- establish source project/repository;
- bind revision/date where material;
- identify direct supporting evidence;
- remove or narrow unsupported wording;
- preserve known limitations;
- distinguish `IMPLEMENTED`, `VERIFIED`, `ACCEPTED`, `DEPLOYED`, and `OPERATED` where useful.

Prefer omission over speculative filler.

### 5. Deepen Flagship Dossiers

Select the strongest two or three evidence-backed projects.

Use [`templates/work-dossier.md`](../templates/work-dossier.md) as an authoring skeleton, not a runtime schema.

Each flagship should make problem, constraints, attributable responsibility, architecture, material decisions, verification, evidence, and limitations understandable without reading the source repository first.

Do not add a third flagship merely to fill space.

### 6. Recruiter-Scan UX

Optimize progressive comprehension:

```text
~60 seconds  identity → specialization → strongest proof
~3 minutes   problem classes → responsibility → architecture → decisions → verification → activity
~10 minutes  claim → evidence → known limitations
```

Prioritize hierarchy, descriptive headings, concise English, evidence proximity, typography, whitespace, static usefulness, responsive behavior, and restrained motion.

### 7. Engineering Activity Chronology

Create a factual chronology using [`templates/engineering-activity.md`](../templates/engineering-activity.md).

Ensure each entry has:

- defensible date range;
- factual activity kind and label;
- concise evidence-backed summary;
- material proof links where useful;
- no unsupported employment/client/company implication.

### 8. Optional Media

Add media only where it improves explanation or inspection.

Require behavioral outcomes from the target spec: accessibility, responsive delivery, appropriate fallback, no autoplay sound, reasonable payload, and no unique meaning locked inside optional media.

Generated/decorative media must remain visibly non-evidentiary.

### 9. SEO, Accessibility, and Performance

Measure and fix evidenced gaps in:

- metadata/canonical/sitemap/robots/Open Graph;
- semantic structure;
- keyboard/focus behavior;
- contrast/touch targets;
- reduced motion;
- responsive layouts;
- media alternatives;
- critical rendering path;
- unnecessary client boundaries;
- browser runtime errors;
- media delivery weight.

Do not invent arbitrary thresholds.

### 10. Production Activation

Before claiming stable production:

- run the repository's canonical verification required by the owning implementation/release task;
- smoke public routes and flagship paths;
- audit current public claims against evidence;
- confirm superseded auth/admin/DB/CMS/runtime-import/3D dependencies have not re-entered;
- confirm useful content works without optional motion/media;
- prove expected `dev` preview/integration and `main` stable-production lineage;
- prove the production hostname/deployment surface;
- record remaining limitations.

## Verification

Each future task must define verification proportional to its changed risk. At minimum, inspect its exact changed-path set and run focused checks that directly prove the acceptance conditions it claims.

Application build/test/verify belongs to the relevant implementation task, not to this documentation normalization task.

## Completion Gate

This plan is complete only when all ten tasks have explicit evidence-backed outcomes and the implementation satisfies the observable acceptance criteria in [`specs/portfolio.md`](../specs/portfolio.md).

No task may claim `DEPLOYED` or `OPERATED` solely from repository, build, test, or acceptance evidence.
