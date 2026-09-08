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
- Owner authentication and bounded WorkItem draft/edit/publish tooling are part of the current V1 slice. SiteProfile and media administration remain read-only; managed media, GitHub import, contact forms, analytics, and 3D remain later authorized slices.

## Current V1 status

The current implementation is a server-rendered Next.js portfolio with MongoDB-backed editorial reads for `SiteProfile` and published `WorkItem` content. The owner-only `/admin/work` surface can create drafts, edit drafts, publish, and unpublish through the accepted Better Auth owner gate. Published WorkItems are read-only until explicitly unpublished; slug mutation and deletion are intentionally absent. Bootstrap data seeds the approved identity and the two current evidence-backed work candidates only; it is migration input, not a runtime fallback.

## Runtime environment

Create a local environment file outside version control with:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/phat_portfolio
BETTER_AUTH_SECRET=<at-least-32-character-secret>
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=<github-oauth-client-id>
GITHUB_CLIENT_SECRET=<github-oauth-client-secret>
GITHUB_OWNER_ID=<immutable-github-account-id>
```

`MONGODB_URI` is required at request time for public editorial pages, auth persistence, and the bootstrap command. Better Auth also requires the five auth variables above at auth request time. Configure the GitHub OAuth callback as `/api/auth/callback/github`; the GitHub OAuth/App must allow the `user:email` permission used by Better Auth's GitHub flow. Secrets and the real owner account ID must stay outside committed files.

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

`pnpm verify` runs linting, TypeScript checking, integration tests, and the production build. `pnpm build` must remain independent of a live MongoDB endpoint or real auth/provider runtime configuration; runtime requests require the relevant environment values.

Implementation must remain evidence-driven, accessible, maintainable, and intentionally simple.
