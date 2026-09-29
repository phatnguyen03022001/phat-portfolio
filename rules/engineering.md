# Engineering Rules

These rules govern implementation choices for the portfolio.

## Architecture

- Prefer KISS and the smallest architecture that satisfies the approved product specification.
- Fix proven root causes; do not hide defects behind compensating complexity.
- Keep public content server/static-first when practical.
- Repository-owned content-as-code is the default durable content model.
- Do not introduce speculative services, workers, queues, caches, orchestration, or infrastructure.
- Do not add generic provider, repository, service, or dependency abstractions without a demonstrated requirement.

## Product boundaries

Do not reintroduce any of the following without new approved product/spec authority:

- authentication or customer accounts;
- owner/admin application surfaces;
- editorial databases;
- runtime CMS behavior;
- application-level draft/publish persistence;
- required media-provider infrastructure.

Implementation details may change without changing product semantics when the observable contract remains intact.

## Change discipline

- Make the smallest correct change within the authorized ownership boundary.
- Preserve existing naming, APIs, error handling, and repository conventions unless the task proves they are defective.
- Avoid unrelated refactors and dependency churn.
- New dependencies require a concrete capability gap that cannot be met reasonably by the existing stack or platform.

## Verification

- Verification must be proportional to the changed risk.
- Prefer focused checks first, then broader checks only when the owning task requires them.
- Do not claim correctness from code inspection alone when executable proof is required.
- Do not invent test counts, deployment state, runtime behavior, or operational evidence.
