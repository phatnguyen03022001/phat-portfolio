# Repository Rules

These rules define repository invariants that must remain true unless explicit operator or current-task authority changes them.

## Identity and source of truth

- Canonical repository: `phatnguyen03022001/phat-portfolio`.
- Canonical local path: `/Users/tienphat/Developer/phat-portfolio`.
- GitHub `origin` is the remote source of truth.

## Branches and worktrees

- Only `dev` and `main` are allowed branches.
- `dev` is the working/integration branch; `main` is stable.
- Do not create another branch.
- Use the one canonical existing worktree only.
- Do not create alternate clones, sibling copies, nested repositories, alternate checkouts, or additional Git worktrees.
- Do not use `git worktree add`.

## Working-tree ownership

- Prove repository, branch, HEAD, worktree count, and current status before mutation.
- Preserve unrelated or foreign dirty state byte-for-byte.
- Never reset, clean, stash, restore, or otherwise adopt foreign dirt to make a task easier.
- Task-owned changes must be explicit and bounded.
- Finish with no task-created garbage or unexplained untracked files.

## Staging and publication

- Never use `git add .` or `git add -A`.
- Stage only explicit task-owned paths.
- Inspect the complete intended diff before commit.
- Use non-force publication.
- After publication, prove expected local/remote lineage and working-tree state.
- Do not claim publication or remote state without direct proof.

## Filesystem hygiene

- Do not create `tmp/`, `temp/`, `scratch/`, `backup/`, `misc/`, `old/`, `new/`, duplicate documentation roots, or hidden agent/tool installation directories.
- Do not create `.claude/**`, `.codex/**`, ECC installation state, or Superpowers installation state inside the repository.
- A new directory requires a distinct responsibility and lifecycle not already owned by an existing canonical directory.
