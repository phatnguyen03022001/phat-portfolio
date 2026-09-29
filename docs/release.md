# Repository Release Flow

This guide describes repository-specific publication hygiene. Product/release requirements come from the active spec and task authority.

Canonical repository rules: [`rules/repository.md`](../rules/repository.md).

## Publication flow

```text
clean canonical tree
→ authorized change
→ focused verification
→ inspect diff
→ explicit staging
→ commit
→ non-force publish
→ prove expected remote/local state
→ clean closure
```

## Required behavior

1. Work only in `/Users/tienphat/Developer/phat-portfolio`.
2. Prove repository identity, current branch, HEAD, worktree count, upstream, and pre-existing dirty state before mutation.
3. Preserve unrelated/foreign changes exactly.
4. Run verification proportional to the authorized change.
5. Inspect the complete task-owned changed-path set.
6. Stage explicit files only; never use `git add .` or `git add -A`.
7. Commit only the intended coherent change.
8. Publish non-force to the existing upstream.
9. Prove the expected local/remote lineage after publication.
10. Finish without task-created garbage or unexplained untracked files.

## Branch policy

- `dev`: working / preview integration.
- `main`: stable.
- Do not create additional branches.

Do not invent CI/CD, staging infrastructure, deployment services, or release automation that the repository has not explicitly authorized.
