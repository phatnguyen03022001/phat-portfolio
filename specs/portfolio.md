# Personal Engineering Portfolio Specification

**Status:** APPROVED

**Revision:** 1

**Authority:** Canonical forward product/system truth for `phatnguyen03022001/phat-portfolio`

## Goal

Provide a public engineering evidence portfolio for Nguyen Tien Phat that lets a reviewer understand engineering focus, responsibility, system decisions, verification, and inspectable proof quickly and without inflated claims.

## Product Outcomes

The product should enable a reviewer to:

- identify Nguyen Tien Phat as a Software Engineer focused on AI-native products and agentic systems;
- find the strongest engineering work without browsing a repository dump;
- understand problem, constraints, responsibility, architecture, decisions, verification, and limitations for flagship work;
- trace material claims to practical evidence;
- distinguish factual engineering activity from employment claims;
- use the site effectively without animation, private application state, or editorial infrastructure.

## Scope

### In Scope

- a public landing page;
- a curated work index;
- engineering dossiers/case studies;
- a concise about surface;
- direct contact links;
- factual engineering activity chronology;
- repository-owned content-as-code;
- evidence/revision/source links;
- optional factual or explanatory media;
- SEO, accessibility, responsive behavior, and performance appropriate to a public portfolio;
- deployment through the repository's approved release lineage.

### Out of Scope

Unless a future approved product specification adds a demonstrated requirement, the product does not require:

- authentication, sessions, customer accounts, or owner roles;
- private admin/editorial application surfaces;
- MongoDB or another editorial database;
- runtime CMS behavior;
- application-level draft/publish persistence;
- required Cloudinary or another media-provider service;
- runtime GitHub import/refresh;
- contact-form backend infrastructure;
- analytics/recruiter tracking platforms;
- microservices, queues, caches, workers, or orchestration;
- Three.js, WebGL, GLB, 3D character/pipeline, or a 3D roadmap;
- spectacle-driven cinematic infrastructure.

## Product Identity

Primary identity:

- **Name:** Nguyen Tien Phat
- **Role:** Software Engineer
- **Focus:** AI-native Products & Agentic Systems

The portfolio is a hiring evidence surface, not a repository gallery, CMS, private application, or technology showcase.

Claims must remain proportional to evidence. Employment, freelancing, customer, revenue, adoption, deployment, operational, and outcome claims require direct support.

## Information Architecture

The canonical public information architecture is:

```text
/
├── identity / strongest proof
├── selected flagship work
├── engineering approach
├── current engineering activity
├── evidence philosophy
├── about summary
└── contact CTA

/work
└── curated work index

/work/[slug]
└── engineering dossier / case study

/about
└── positioning, factual engineering activity, principles, links

/contact
└── direct contact channels
```

Do not add public sections only to fill navigation.

## Recruiter Scan Contract

The composition must support progressive understanding:

### Approximately 60 seconds

A reviewer can identify:

- who Phat is;
- engineering specialization;
- strongest proof surfaces.

### Approximately 3 minutes

A reviewer can understand:

- problem classes;
- personal responsibility;
- system architecture;
- material engineering decisions;
- verification approach;
- current engineering activity.

### Approximately 10 minutes

A reviewer can inspect:

- material claim;
- supporting source/revision/task/test/deployment evidence;
- known limitations.

Use descriptive headings, short paragraphs, bullets, diagrams, source links, and evidence surfaces before long prose.

## Engineering Dossier Contract

Primary navigation should foreground no more than three flagship dossiers. Two strong dossiers are preferable to a weak third.

A dossier should support, when evidence exists:

- Overview
- Problem
- Constraints
- Responsibility
- Architecture
- Key Decisions
- Trade-offs
- Implementation
- Verification
- Operations
- Outcome
- Known Limitations
- Inspection / Proof Links

Omit `Operations` or `Outcome` when direct evidence does not support them.

A dossier is publishable only when a reviewer can understand the problem, attributable responsibility, important constraints, system shape, material decisions, verification, limitations, and direct inspection surfaces.

## Evidence Contract

Evidence is first-class.

When useful, distinguish:

- `IMPLEMENTED`
- `VERIFIED`
- `ACCEPTED`
- `DEPLOYED`
- `OPERATED`

A material claim should point to the nearest practical source, such as:

- repository/revision;
- task/review artifact;
- test result;
- deployed surface;
- operational observation;
- another direct source.

Do not infer `DEPLOYED` or `OPERATED` from source code, tests, or repository activity.

Generated/decorative media is never factual evidence.

## Engineering Activity Contract

The portfolio must support a factual engineering-activity chronology without converting non-employment activity into employment.

Useful concepts include:

- `EMPLOYMENT`
- `INDEPENDENT_ENGINEERING`
- `PROFESSIONAL_DEVELOPMENT`
- `EDUCATION`
- `CAREER_BREAK`

Each entry must use a defensible date range and factual label. Wording must not imply an employer, client, company, or commercial relationship without evidence.

The chronology is context, not an apology. Do not publish defensive explanations about career gaps or English proficiency.

## Media Contract

Media is optional communication support.

Allowed sources include factual screenshots, screen recordings, architecture diagrams, images, short video, and clearly non-evidentiary generated/decorative material.

Product-level requirements are behavioral:

- browser-compatible delivery;
- responsive rendering;
- accessible textual context;
- useful dimensions/aspect metadata when relevant;
- poster/fallback for video when appropriate;
- lazy loading below the critical path;
- no autoplay with sound;
- reasonable payload weight;
- no unique required information available only through optional media.

Do not make an authoring format or provider part of product semantics without a demonstrated requirement.

## UX / Accessibility

The product must:

- remain useful with static content only;
- use semantic markup and descriptive headings;
- support keyboard operation;
- provide visible/useful focus states;
- maintain sufficient contrast;
- work at representative narrow and wide viewports;
- use touch-safe controls;
- provide useful alternative text/captions for meaningful media;
- respect reduced-motion preferences.

Avoid skill bars, technology icon walls, fake terminals/dashboards/metrics, generic equal-card spam, scroll-jacking, blocking intros, and ornamental motion.

## SEO / Performance

The public site should support:

- semantic metadata;
- canonical URLs;
- sitemap;
- robots;
- indexable dossier routes;
- project-specific Open Graph metadata where useful;
- semantically valid structured data where justified.

Critical content should be server/static-first where practical.

The critical path should prioritize:

```text
HTML / useful content
→ core interaction
→ optional media enhancement
```

Avoid arbitrary performance thresholds without measurement. Remove unjustified client boundaries before adding infrastructure.

## Deployment

Preferred application hosting target: Vercel.

Intended branch direction:

- `dev` → working / preview integration;
- `main` → stable production.

Intended production hostname: `phat.picmao.com`.

A deployment target is not deployment evidence. Public claims that the site or a project is deployed/operated require direct current proof.

## Risks

- Public claims may drift beyond their supporting evidence.
- Historical implementation architecture may be mistaken for current forward authority.
- Portfolio presentation may optimize for novelty instead of recruiter comprehension.
- Optional media may add payload or accessibility cost without improving understanding.
- Content may become stale if claim/source relationships are not maintained.
- Client-side or infrastructure complexity may re-enter without a product requirement.

Migration note: implementation may temporarily differ from this target while separately authorized work reconciles it. Historical execution evidence remains immutable.

## Acceptance Criteria

The product target is accepted when all applicable conditions are directly observable:

1. Public navigation exposes the intended public information architecture without requiring authentication.
2. The first viewport communicates identity, specialization, and a direct path to strongest proof.
3. `/work` is curated rather than a repository dump and foregrounds no more than three flagship dossiers.
4. Each published flagship dossier exposes attributable responsibility, architecture/decisions, verification, limitations, and inspectable proof appropriate to its claims.
5. Material claims are traceable and do not imply `DEPLOYED` or `OPERATED` without direct evidence.
6. Engineering-activity entries do not misrepresent study, career breaks, or independent engineering as employment/client work.
7. Public portfolio content has one repository-owned canonical source and does not require runtime editorial database/CMS state.
8. Required information remains complete without animation or optional media.
9. Representative keyboard, focus, reduced-motion, responsive, and semantic accessibility checks pass.
10. Canonical metadata, sitemap, robots, and dossier indexing behavior are correct for the deployed public surface.
11. No active product requirement depends on authentication/admin/CMS/editorial DB/runtime GitHub import/required media provider/Three.js/WebGL/3D infrastructure.
12. Stable production activation, when claimed, is supported by direct deployment evidence and the expected `dev` → `main` lineage.

## Verification

Implementation tasks must choose risk-proportional verification for the slice they change. Relevant proof may include:

- content validation;
- first-viewport and recruiter-scan inspection;
- claim-to-evidence audit;
- dossier completeness review;
- engineering-activity truth review;
- public-route smoke tests;
- representative responsive viewport checks;
- keyboard/focus/accessibility sanity checks;
- reduced-motion behavior;
- SEO metadata/sitemap/robots/canonical/OG checks;
- production build and runtime-error inspection when code changes require them;
- deployment smoke testing when deployment is in scope.

Do not use arbitrary test counts as a product requirement.
