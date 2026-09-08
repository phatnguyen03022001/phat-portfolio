# Personal Engineering Portfolio Design

**Status:** APPROVED
**Target repository:** `phatnguyen03022001/phat-portfolio`
**Production hostname:** `phat.picmao.com`
**Working branch:** `dev`
**Stable branch:** `main`

## Product identity

Build a production-quality personal engineering portfolio for Nguyen Tien Phat.

The product is:

`personal brand × engineering dossier × living systems portfolio`

Primary identity:

- Nguyen Tien Phat
- Software Engineer
- AI-native Products & Agentic Systems

The product must not position the owner primarily as an AI Engineer, prompt engineer, Three.js developer, frontend developer, full-stack web developer, generic freelancer, or "10x engineer".

Claims must remain proportional to available evidence. Do not invent seniority, employment history, customers, revenue, adoption, production usage, certifications, years of experience, performance gains, or other credibility signals.

## Product north star

Optimize for:

- ~60 seconds: understand who Phat is.
- ~3 minutes: understand what classes of software problems he can own.
- ~10 minutes: find enough verifiable evidence to trust the claims.

## Design constitution

1. Proof determines credibility.
2. 3D determines memory.
3. Content remains usable without WebGL.
4. Every media asset must explain, prove, or make memorable.
5. Complexity must be compressed, never displayed for its own sake.
6. Claims must never exceed evidence.
7. Content wins over decorative presentation.
8. Static composition must remain strong without motion.
9. Accessibility and reduced-motion behavior are first-class requirements.
10. Architecture exists to serve communication and maintainability, not spectacle.

Visual direction:

- clean editorial product UI;
- strong typography;
- generous hierarchy;
- restrained gradients;
- restrained motion;
- distinctive 3D identity later;
- technical evidence surfaces.

Avoid generic purple-blue AI-template styling, skill percentage bars, giant technology-icon clouds, fake terminal aesthetics everywhere, excessive glassmorphism, scroll-jacking, forced cinematic transitions, noisy particle backgrounds, game-like navigation, blocking loading screens, and decorative 3D without informational value.

## V1 visual implementation rule

V1 launches without custom Three.js character assets.

Use temporary, replaceable media where needed. Temporary media must not imply factual evidence that does not exist and must be visually subordinate to the content.

Frontend implementation uses:

- Next.js App Router;
- React;
- TypeScript;
- shadcn/ui primitives where they materially reduce implementation risk;
- project-owned global CSS and design tokens for the site's visual identity.

Do not let shadcn defaults define the brand. Use it primarily for accessible interaction primitives and low-level UI behavior. The product's typography, spacing, composition, surfaces, motion, and responsive behavior remain project-owned through global styles/tokens and focused components.

## Approved V2 character direction

Style:

- stylized anime-inspired 3D;
- semi-realistic face;
- clean cel shading;
- minimal techwear;
- professional with a light futuristic influence;
- not chibi;
- not visually noisy cyberpunk.

Outfit:

- dark technical jacket;
- plain inner shirt;
- slim dark pants;
- minimal sneakers;
- one Picmao accent color.

Environment:

- neutral studio / abstract tech space;
- soft light;
- clean background;
- very limited holographic UI.

Owner-provided source assets later:

1. current face photo;
2. three-quarter face photo;
3. side profile;
4. full-body front;
5. full-body side/back if available;
6. outfit reference;
7. color palette;
8. hair reference;
9. four poses: idle / engineering / project / contact;
10. static character poster fallback.

Expected later deliverables:

- `character.blend`;
- `character.glb`;
- `textures/`;
- `character-poster.avif`;
- `character-poster-mobile.avif`.

These assets are owner-created and are not generated during V1 implementation.

## Public information architecture

```text
/
├── Hero / identity
├── Selected Work
├── Engineering Approach
├── Current / Building
├── Evidence Philosophy
├── About summary
└── Contact CTA

/work
└── curated work index

/work/[slug]
└── engineering case study

/about
└── positioning, background, experience, capabilities, principles, links

/contact
└── direct contact channels
```

Do not create `/lab` until real content justifies it.

## Owner/admin information architecture

```text
/admin
├── dashboard
├── work
├── profile
└── media
```

Do not create separate admin nouns for systems, skills, experience, external links, or settings unless a real independent lifecycle earns them.

## Canonical editorial model

Use only three first-class application content collections in V1:

1. `SiteProfile`
2. `WorkItem`
3. `MediaAsset`

Better Auth owns its own persistence records.

`Project` and `System` are one `WorkItem` model with categorization.

Embedded profile values include experience, capability groups, external links, and contact links.

Embedded work values include repository references, case-study sections, evidence, technologies, and external links.

### Work classification

`collection`:

- `WORK`
- `LAB`
- `ARCHIVE`

Initial `category` values:

- `PRODUCT_DOMAIN`
- `AGENTIC_SYSTEM`
- `COMMERCIAL_OPERATIONAL`
- `SUPPORTING`

Do not turn these into a large ontology.

### Publication

At minimum:

- `DRAFT`
- `PUBLISHED`

Public queries return published content only.

Drafts are absent from public routes, sitemap, OG generation, search/discovery surfaces, and anonymous data paths. Protected owner preview may render drafts.

## Case-study model

Supported section kinds:

- `OVERVIEW`
- `PROBLEM`
- `CONSTRAINTS`
- `RESPONSIBILITY`
- `ARCHITECTURE`
- `KEY_DECISIONS`
- `TRADE_OFFS`
- `IMPLEMENTATION`
- `VERIFICATION`
- `OPERATIONS`
- `OUTCOME`
- `KNOWN_LIMITATIONS`

All sections are optional. System-owned ordering is preferred over a generic page builder.

## Rich content

Use constrained Markdown inside typed case-study sections.

Allow basic prose, headings, lists, emphasis, links, code, fenced code blocks, and blockquotes where useful.

Disallow raw HTML, scripts, iframes, arbitrary component execution, MDX imports, and inline event handlers.

Media references remain structured data rather than arbitrary executable Markdown extensions.

## Evidence model

Evidence is first-class but embedded in its `WorkItem`.

Distinguish states:

- `IMPLEMENTED`
- `VERIFIED`
- `ACCEPTED`
- `DEPLOYED`
- `OPERATED`

An evidence record may contain claim, state, method, result, source kind/label/url, revision, and observation date.

Never collapse these states into a synthetic percentage or production-readiness score.

## Initial portfolio narrative

Three flagship categories:

1. Product / Domain Engineering — current candidate: `ilets`.
2. Agentic Engineering System — `architect-profile`, `agent-skills`, `agent-documents`, `agent-standards`, and `agent-runtime` presented as one system.
3. Commercial / Operational Software — reserved until real evidence exists.

Older repositories may become supporting or archive content after factual review. Do not automatically publish GitHub repositories.

## Runtime architecture

One deployable Next.js application.

```text
Browser
  ↓
Next.js App Router
  ├── public Server Components
  ├── owner admin
  ├── auth boundary
  ├── content query/mutation boundary
  ├── GitHub import boundary
  └── Cloudinary media boundary
       ↓
MongoDB + Better Auth persistence
```

No independent backend API, API gateway, Redis, queue, event bus, microservices, generic CMS, or provider framework in V1.

Server Components are the default. Client Components exist only where browser interaction requires them.

Public pages must not call GitHub APIs or Cloudinary management APIs during normal rendering.

## Persistence

Select MongoDB as the V1 editorial persistence store.

Use the official MongoDB Node.js driver initially. Do not use Mongoose or another ODM unless later evidence shows concrete value exceeding complexity.

Centralize connection management. Validate writes at the application boundary. Use bounded documents. Do not embed unbounded collections. Define indexes from actual query patterns.

Initial material indexes:

- unique work slug;
- publication status + collection + featured rank;
- publication status + current rank where used;
- unique Cloudinary asset identity.

Use additive schema evolution first. Store a `schemaVersion` on first-class documents. Introduce one-off migration scripts only when an actual schema change requires them.

## Authentication

Use Better Auth with GitHub OAuth and its MongoDB adapter unless implementation-time verification finds a material incompatibility.

Exactly one logical application role exists: owner/admin.

Authorization is not "authenticated = admin". Every privileged server action must additionally verify the configured immutable GitHub owner identity.

No RBAC, organizations, memberships, password database, self-service registration, or custom recovery flow.

## Media

Activate Cloudinary in V1 for owner-managed editorial images.

Cloudinary owns media bytes, transformations, and delivery.

MongoDB owns portfolio media identity, provider references, metadata, and editorial relations.

Use authenticated server-generated signed uploads. The API secret remains server-side.

V1 supports images only. Video is later when a real requirement exists.

Stable brand assets may remain under `public/brand/`.

3D runtime assets are a separate V2 ownership class and must not become ordinary editorial CMS assets by default.

## GitHub integration

V1 import/refresh is explicit owner action only.

Flow:

```text
Admin
→ enter owner/repository
→ fetch selected metadata
→ create/attach repository snapshot
→ owner curates narrative
→ publish manually
```

Imported metadata may include repository name, URL, description, topics, languages, stars, default branch, and pushed time where useful.

GitHub never owns portfolio positioning, case-study prose, evidence summary, featured state, media, limitations, or ordering.

Refresh updates imported repository metadata only.

Do not build continuous synchronization.

## Contact

V1 uses direct contact links only.

Do not implement a contact form until there is evidence it materially improves the product. This avoids an otherwise unnecessary email provider, spam surface, rate limiter, delivery monitoring, and privacy boundary.

## SEO/discovery

V1 must support semantic metadata, canonical URLs, sitemap, robots, accessible indexable public case studies, project-specific Open Graph metadata, and semantically valid structured data only where justified.

Draft content must never enter public discovery surfaces.

Archive content should remain outside primary navigation and normally be `noindex` unless intentionally promoted.

## Performance

Critical path:

```text
HTML / useful content
→ core interaction
→ optional enhancement
```

V1 ships no Three.js.

Hero LCP content must not depend on JavaScript. Images use known dimensions and responsive delivery. Below-fold media may lazy-load.

Do not set arbitrary bundle-size targets without measurement; remove unjustified client boundaries instead.

## Accessibility

Require semantic markup, keyboard operation, useful focus states, sufficient contrast, responsive layouts, touch-safe controls, useful alternative text, and reduced-motion support.

3D must never be the sole carrier of information.

## V2 Three.js boundary

The server-rendered portfolio remains complete before Three.js initializes.

```text
static poster
  ↓
optional lazy client island
  ↓
GLB character
```

Fallback to static poster for reduced motion, unsupported WebGL, load failure, or environments where measured cost is not justified.

Initial behaviors are bounded to idle, engineering, project, and contact.

Draco, Meshopt, KTX2/Basis, advanced shaders, or richer environments are introduced only after measured evidence justifies them.

## Deployment

Preferred target: Vercel.

Environment mapping:

- local development → local;
- `dev` → preview/integration deployment;
- `main` → stable production deployment;
- `phat.picmao.com` → production hostname.

Cloudflare owns parent-domain DNS. Vercel owns application hosting/TLS/deployment.

Do not add staging, Docker orchestration, Kubernetes, reverse proxies, or custom infrastructure without a concrete requirement.

## Verification

Risk-proportional verification must cover:

- runtime schema/content logic;
- Mongo data integration;
- owner authentication and authorization;
- draft/published isolation;
- GitHub import mapping and failure behavior;
- Cloudinary signing/registration when enabled;
- public route smoke tests;
- representative responsive viewports;
- keyboard/focus behavior;
- accessibility automation plus manual sanity checks;
- reduced-motion behavior;
- SEO metadata, sitemap, robots, canonical URLs, OG state;
- production build;
- browser runtime errors;
- deployment smoke testing.

Do not chase arbitrary test counts.

## Explicit non-goals

V1 does not include:

- multi-tenant CMS;
- generic CMS platform;
- multiple authorization roles;
- microservices;
- event bus;
- Redis;
- queues;
- plugin architecture;
- generic media-provider abstraction;
- design-system package;
- custom analytics platform;
- blog engine without content strategy;
- auto-publishing GitHub repositories;
- arbitrary page builder;
- AI chat widget;
- fake operating-system UI;
- 3D on every page;
- custom Three.js character assets;
- contact form;
- video media pipeline;
- V3 cinematic effects.

## Repository structure direction

Keep source shallow and ownership-oriented.

Expected direction:

```text
src/
├── app/
├── auth/
├── content/
├── db/
├── github/
├── media/
└── components/
    ├── public/
    ├── admin/
    └── ui/
```

Do not create directories for future features before real code exists.

## Delivery slices

1. repository/public foundation;
2. Mongo-backed editorial model and public reads;
3. dossier/case-study UX;
4. owner auth/admin shell;
5. editorial mutations and publish workflow;
6. editorial media;
7. GitHub import/refresh;
8. launch hardening;
9. production activation;
10. V2 3D only after V1 acceptance.

Each slice must be independently reviewable and should not pull future-slice infrastructure forward without a material reason.
