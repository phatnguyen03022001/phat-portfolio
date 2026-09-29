# Phat Portfolio

Personal engineering portfolio for Nguyen Tien Phat.

Target product:

`personal brand × engineering dossier × living systems portfolio`

Production hostname: `phat.picmao.com`.

## Architecture

This repository is intentionally a public evidence site, not a portfolio CMS.

```text
GitHub repository
  ↓
typed content-as-code
  ↓
Next.js server/static rendering
  ↓
Vercel
```

- `dev` is the working/integration branch.
- `main` is the stable production branch.
- GitHub is the source of truth for application code, portfolio content, evidence links, and revision history.
- Public content lives in `src/content/portfolio-data.ts` and is validated by the schemas in `src/content/model.ts`.
- There is no application authentication, admin workspace, editorial database, or runtime CMS.
- Adding or correcting portfolio proof is an ordinary reviewed code/content change.

## Current product surface

Public routes:

```text
/
/work
/work/[slug]
/about
/contact
```

The portfolio is server-first and evidence-first. Case studies use typed sections, constrained Markdown, repository references, explicit evidence states, and known limitations. Claims must remain proportional to inspectable evidence.

Media is optional presentation material. Source authoring format is not a domain contract; browser delivery should simply be compatible, responsive, accessible, and appropriately optimized for the page.

## Editing portfolio content

Update `src/content/portfolio-data.ts`.

A normal project/proof update is:

```text
inspect source repository/evidence
→ update typed portfolio content
→ run verification
→ review diff
→ commit/push through the normal Git workflow
```

Do not invent employment, customers, production operation, metrics, outcomes, or other credibility claims. Use direct evidence links where practical.

## Development

Requirements:

- Node.js 24.x LTS
- pnpm

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm dev
```

Verification:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify
```

`pnpm verify` runs linting, TypeScript checking, tests, and the production build.

Implementation should remain accessible, maintainable, evidence-driven, and intentionally simple.
