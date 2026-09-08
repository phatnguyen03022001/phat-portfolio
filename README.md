# Phat Portfolio

Personal engineering portfolio for Nguyen Tien Phat.

Target product:

`personal brand × engineering dossier × living systems portfolio`

Production hostname: `phat.picmao.com`.

Repository policy:

- `dev` is the working/integration branch.
- `main` is the stable branch.
- GitHub is canonical for application code and repository authority.
- Editorial portfolio content will be managed outside source code through the application admin surface in a later authorized slice.

## Current V1 status

The current implementation is the public foundation only: a server-rendered Next.js portfolio shell with temporary typed fixture content. Persistence, owner authentication, managed media, GitHub import, contact forms, analytics, and 3D are intentionally outside this slice.

## Development

Requirements:

- Node.js 24.x LTS
- pnpm

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm dev
```

Run the repository verification contract with:

```bash
pnpm verify
```

This runs linting, TypeScript checking, and the production build.

Implementation must remain evidence-driven, accessible, maintainable, and intentionally simple.
