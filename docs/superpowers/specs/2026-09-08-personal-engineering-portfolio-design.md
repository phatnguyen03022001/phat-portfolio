# Personal Engineering Portfolio Design

**Status:** APPROVED

**Target repository:** `phatnguyen03022001/phat-portfolio`

**Production hostname:** `phat.picmao.com`

**Working branch:** `dev`

**Stable branch:** `main`

## Authority and historical truth

This document is the current forward product/design authority for the portfolio.

Historical tasks, reports, reviews, and commits remain truthful records of prior implementation states. Architecture simplification does not retroactively rewrite that history.

> Historical implementation truth != current forward architecture authority.

The implementation may temporarily contain legacy or in-flight migration state until separately authorized work reconciles it with this target.

## Product identity

The product is a **public engineering evidence portfolio** for Nguyen Tien Phat.

Primary identity:

- Nguyen Tien Phat
- Software Engineer
- AI-native Products & Agentic Systems

Primary purpose:

`landing page + strong engineering dossiers + easy agent-assisted proof updates`

The portfolio is a hiring evidence surface, not a repository gallery, CMS, private application, or technology showcase.

Claims must remain proportional to evidence. Do not invent or inflate seniority, employment history, freelancing, customers, revenue, adoption, production usage, years of experience, performance gains, certifications, deployment, operations, or outcomes.

## Product north star

Optimize for progressive recruiter understanding:

### ~60 seconds

`identity → specialization → strongest proof`

A reviewer should quickly understand who Phat is, what kinds of engineering work he focuses on, and where the strongest inspectable evidence lives.

### ~3 minutes

`problem classes → responsibility → architecture → key decisions → verification → current engineering activity`

A reviewer should understand what was personally owned, important constraints, system shape, material decisions, and how correctness or quality was established.

### ~10 minutes

`claim → source/revision/task/test/deployment evidence → known limitations`

A reviewer should be able to inspect enough evidence to judge claims without relying on marketing prose.

Public communication should be artifact-led and plain-English first. Prefer descriptive headings, short paragraphs, bullets, architecture views, repository/revision links, task/review evidence, verification records, screenshots, images, and short video where they communicate more precisely than prose.

## Design constitution

1. Proof determines credibility.
2. Claims must remain traceable.
3. Recruiter comprehension wins over prose volume.
4. Responsibility and evidence appear before implementation trivia.
5. Complexity is compressed, never displayed for its own sake.
6. Static composition remains useful without motion.
7. Accessibility and reduced-motion behavior are first-class requirements.
8. Media must explain, prove, or make information easier to understand.
9. Architecture serves communication and maintainability, not spectacle.
10. Employment history and engineering activity remain factually distinct.
11. The smallest sufficient product architecture is preferred.

### Visual direction

Prefer:

- strong typography;
- explicit visual hierarchy;
- layer-cake scanning;
- whitespace;
- one restrained accent;
- asymmetry when it improves composition;
- technical evidence surfaces;
- meaningful imagery or short video;
- responsive composition;
- accessible static readability without motion.

Avoid:

- generic purple/blue AI-template identity;
- giant technology-icon walls;
- skill percentage bars;
- fake terminal proof;
- fake dashboards;
- fake metrics;
- invented testimonials;
- repository dumps as portfolio composition;
- generic equal-card spam;
- excessive glassmorphism;
- scroll-jacking;
- blocking cinematic intros;
- noisy decorative complexity;
- motion whose main purpose is to demonstrate technical complexity.

## Target architecture

The smallest correct target system is:

```text
Browser
  ↓
Next.js public site
  ↓
repository-owned content-as-code
  ↓
optional static/generated image/video media
  ↓
Vercel
```

Git/GitHub owns:

- durable application source;
- portfolio content;
- content and revision history;
- review;
- rollback;
- publication lineage.

There is no logical customer account, application owner/admin role, private product surface, editorial database, or runtime CMS.

A normal agent-assisted proof update is:

```text
inspect source project/repository
→ establish factual claims
→ establish evidence
→ update repository-owned portfolio content
→ validate/build
→ inspect diff
→ publish through Git
```

Git history replaces the need for an application-level editorial history subsystem.

Branch/deployment direction may remain:

```text
dev  → working / preview integration
main → stable production
```

Do not recreate database `DRAFT` / `PUBLISHED` semantics merely to duplicate Git workflow.

## Public information architecture

Keep the public product focused on:

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

No authenticated variants are required.

Do not create new public sections merely to fill navigation. Add surfaces only when real content or user value justifies them.

## Content ownership semantics

Portfolio content is repository-owned content-as-code.

The product contract is semantic, not serialization-specific. Do not permanently require TypeScript, JSON, YAML, Markdown, or another authoring format as product architecture. The implementation may choose an appropriate representation and may change it later without changing the domain model.

The content system must support these concepts without requiring separate services:

- identity and positioning;
- curated work/dossiers;
- factual engineering activity;
- claims and supporting evidence;
- repository/source references;
- architecture and decision context;
- verification;
- known limitations;
- optional media metadata.

Do not create a first-class runtime database or service merely to represent these concepts.

## Flagship dossier model

Primary public work should foreground no more than three flagship dossiers. Two complete flagships are preferable to inventing or weakening a third.

A strong dossier should support, when evidenced:

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

`Operations` and `Outcome` must remain absent when direct evidence does not support them.

A flagship is publication-ready only when factual review can support a clear problem, personal responsibility, important constraints, system shape, material decisions, verification, limitations, and direct inspection surfaces.

Repository links without that narrative are supporting evidence, not the case study itself.

## Evidence model

Evidence is first-class.

Where useful, distinguish:

- `IMPLEMENTED`
- `VERIFIED`
- `ACCEPTED`
- `DEPLOYED`
- `OPERATED`

A material claim should point to the nearest practical inspection surface:

- repository/revision;
- task/review artifact;
- test result;
- deployed surface;
- operational observation;
- another direct source.

Do not infer `DEPLOYED` or `OPERATED` from source-code existence, tests, or repository activity.

Do not collapse evidence states into percentages, synthetic readiness scores, or decorative metrics.

## Engineering activity and career narrative

The portfolio should support a factual engineering-activity chronology.

It must distinguish concepts such as:

- `EMPLOYMENT`
- `INDEPENDENT_ENGINEERING`
- `PROFESSIONAL_DEVELOPMENT`
- `EDUCATION`
- `CAREER_BREAK`

These labels describe content semantics and do not require a runtime enum.

Never turn unemployment, study, personal projects, independent engineering, or professional development into employment, freelancing, client work, or company experience without evidence.

The timeline is context, not an apology. Do not publish defensive explanations about English ability or career gaps. Reduce prose dependence through descriptive headings, concise plain English, diagrams, repository links, revisions, tests, reviews, screenshots, images, and short video where useful.

## Media policy

Media is optional visual communication.

**Authoring format is not product semantics.**

Do not require source authoring to use AVIF, WebP, PNG, JPEG, MP4, WebM, MOV, GLB, or any other specific format.

Source media may come from:

- AI image/video generation;
- screenshots;
- screen recordings;
- Figma or other design tools;
- image/video editors;
- browser conversion tools;
- other legitimate authoring workflows.

Product-level delivery requirements should remain behavioral:

- browser-compatible;
- responsive;
- accessible;
- useful dimensions/aspect metadata where applicable;
- poster/fallback where appropriate;
- lazy loading below the critical path;
- no autoplay with sound;
- reasonable payload/performance;
- optional media must not carry unique required information.

Generated or decorative media must never masquerade as factual:

- product screenshots;
- customer evidence;
- metrics;
- production usage;
- deployment proof;
- operational proof;
- engineering proof.

Do not introduce a generic media-provider abstraction or media-management backend without a measured requirement.

## Contact

Use direct contact links.

Do not add a contact-form backend unless evidence shows it materially improves the product. Avoid unnecessary email infrastructure, spam surface, rate limiting, monitoring, or privacy boundaries.

## SEO and discovery

Support:

- semantic metadata;
- canonical URLs;
- sitemap;
- robots;
- accessible indexable dossiers;
- project-specific Open Graph metadata;
- semantically valid structured data where justified.

Archive/supporting content should stay outside primary navigation unless intentionally promoted.

## Performance

Critical path:

```text
HTML / useful content
→ core interaction
→ optional media enhancement
```

Useful public content and hero identity should not depend on client JavaScript where server/static rendering is sufficient.

Use known media dimensions and responsive delivery where practical. Lazy-load below-fold optional media.

Do not invent arbitrary bundle-size targets without measurement. Remove unjustified client boundaries instead.

## Accessibility

Require:

- semantic markup;
- keyboard operation;
- visible/useful focus states;
- sufficient contrast;
- responsive layouts;
- touch-safe controls;
- useful alternative text/captions;
- reduced-motion support.

Meaningful image/video content must have understandable textual context.

## Deployment

Preferred target: Vercel.

Environment direction:

- local development → local;
- `dev` → preview/integration;
- `main` → stable production;
- `phat.picmao.com` → production hostname.

Cloudflare may own parent-domain DNS. Vercel owns application hosting, TLS, and deployment.

Do not add staging infrastructure, Docker orchestration, Kubernetes, reverse proxies, custom backend services, queues, caches, or other runtime infrastructure without a concrete requirement.

## Verification expectations

Risk-proportional verification should cover, when the corresponding capability exists:

- content validation;
- first-viewport identity and proof cues;
- factual engineering-activity labeling;
- flagship dossier completeness;
- claim-to-evidence traceability;
- constrained rich-content safety if used;
- public-route smoke tests;
- representative responsive viewports;
- keyboard/focus behavior;
- accessibility sanity checks;
- reduced-motion behavior;
- SEO metadata/sitemap/robots/canonical/OG state;
- production build;
- browser runtime errors;
- deployment smoke testing.

Do not chase arbitrary test counts.

## Explicit forward non-goals

The target architecture does not require:

- Better Auth or another application authentication system;
- GitHub OAuth authentication;
- sessions/customer accounts;
- owner authorization;
- `/admin/**`;
- admin editing forms;
- MongoDB editorial persistence;
- another runtime editorial database;
- runtime draft/publish state;
- generic CMS behavior;
- Cloudinary as required architecture;
- MediaAsset persistence as a CMS subsystem;
- runtime GitHub import/refresh;
- runtime GitHub API as a portfolio-content dependency;
- multiple authorization roles;
- microservices;
- event bus;
- Redis;
- queues;
- plugin architecture;
- generic media-provider abstraction;
- custom analytics platform;
- arbitrary page builder;
- AI chat widget;
- contact-form backend;
- Three.js;
- WebGL;
- GLB asset pipeline;
- 3D character;
- 3D fallback architecture;
- V2 3D roadmap;
- cinematic/animation infrastructure for spectacle.

Historical evidence may mention previously implemented or planned features from this list. Such mentions remain historical/non-target and do not re-establish forward authority.

## Delivery direction

Future implementation should proceed in independently reviewable slices:

1. qualify and reconcile the existing simplification candidate;
2. finalize the content-as-code ownership boundary;
3. reconcile current portfolio data against factual evidence;
4. deepen the strongest two or three flagship dossiers;
5. implement recruiter-scan composition;
6. add factual engineering activity chronology;
7. add optional media without provider/format lock-in;
8. harden SEO, accessibility, and performance;
9. activate stable production.

Each slice must keep the smallest sufficient architecture and must not pull speculative infrastructure forward.
