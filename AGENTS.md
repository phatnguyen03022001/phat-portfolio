# phat-portfolio Agent Instructions

Scope: this repository. Load the workspace-level `/Users/tienphat/Developer/AGENTS.md` first, then this file.

## Repository identity

- Repository: `phatnguyen03022001/phat-portfolio`
- Canonical local path: `/Users/tienphat/Developer/phat-portfolio`
- GitHub `origin` is the remote source of truth.
- Existing branch policy: `dev` is the working/integration branch; `main` is stable. Do not create additional branches.
- Use the single canonical existing worktree only. Do not create alternate clones, checkouts, nested repositories, sibling copies, or Git worktrees.

## Knowledge routing and authority

Use this precedence:

```text
operator/current task authority
↓
specs/        product/system truth
↓
rules/        repository invariants
↓
plans/        authorized change design
↓
docs/         operational/reference guidance
↓
templates/    authoring skeletons
↓
.agent/tasks/ historical execution evidence
```

Within `rules/`, the more specific applicable rule overrides a generic rule.

Route by responsibility:

- Product truth and observable correctness → `specs/`
- Change execution design → `plans/`
- Always-on repository constraints → `rules/`
- Authoring/how-to/reference guidance → `docs/`
- New canonical artifact skeletons → `templates/`
- Historical execution evidence → `.agent/tasks/`

`specs/portfolio.md` is the single canonical forward product specification. `plans/portfolio-simplification.md` is the current forward simplification plan.

The dated 2026-09-08 files under `docs/superpowers/plans/` are historical provenance pinned by TASK-0001 through TASK-0005. They are not forward authority and must not be used to reintroduce superseded product architecture.

## Hard execution gates

- Start from the canonical repository and prove branch/worktree state before mutation.
- Preserve unrelated or foreign dirty state exactly; never adopt it into the current task.
- Keep clean-in/clean-out semantics around task-owned changes and report any pre-existing dirt separately.
- Do not use broad staging (`git add .` or `git add -A`).
- Do not use routine stash/reset/clean/restore as a shortcut around ownership.
- Do not create generated garbage, scratch trees, tool-installation state, or new top-level taxonomy without a proven independent lifecycle.
- Publish only explicit intended paths, by non-force Git operations, after focused verification and diff inspection.

## Loading rules

Load only the minimum necessary context:

- Product or UX behavior: `specs/portfolio.md` plus the relevant rule files.
- Repository/Git operation: `rules/repository.md`.
- Engineering implementation: `rules/engineering.md` and the target spec/plan.
- Claims, dossiers, activity, or public evidence: `rules/evidence.md`.
- Presentation work: `rules/design.md`.
- Content authoring: `docs/content-authoring.md` and the relevant template.
- Release/publication work: `docs/release.md`.
- A plan may not silently redefine its target spec.
- A doc may not introduce product requirements absent from the spec.
- A template may not invent fields or claims forbidden by rules or the spec.

## Historical integrity

Treat `.agent/tasks/TASK-0001/**` through `.agent/tasks/TASK-0005/**` as immutable historical execution evidence. Historical evidence may truthfully reference older paths and architecture; it never overrides newer approved forward authority.
