# Phat Portfolio

Personal engineering portfolio for Nguyen Tien Phat.

Target product:

`personal brand × engineering dossier × living systems portfolio`

Production hostname: `phat.picmao.com`.

Repository policy:

- `dev` is the working/integration branch.
- `main` is the stable branch.
- GitHub is canonical for application code and repository authority.
- MongoDB is the runtime editorial source for the current public portfolio slice.
- Owner authentication, admin editing, managed media, GitHub import, contact forms, analytics, and 3D remain later authorized slices.

## Current V1 status

The current implementation is a server-rendered Next.js portfolio with MongoDB-backed editorial reads for `SiteProfile` and published `WorkItem` content. Bootstrap data seeds the approved identity and the two current evidence-backed work candidates only; it is migration input, not a runtime fallback.

## Runtime environment

Create a local environment file outside version control with:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/phat_portfolio
```

`MONGODB_URI` is required at request time for public editorial pages and for the bootstrap command. Secrets must stay outside committed files.

## Development

Requirements:

- Node.js 24.x LTS
- pnpm

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm dev
```

Seed the current approved editorial documents and indexes with:

```bash
pnpm content:bootstrap
```

Run the repository verification contract with:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify
```

`pnpm verify` runs linting, TypeScript checking, integration tests, and the production build. `pnpm build` must remain independent of a live MongoDB endpoint; runtime requests require `MONGODB_URI`.

Implementation must remain evidence-driven, accessible, maintainable, and intentionally simple.
