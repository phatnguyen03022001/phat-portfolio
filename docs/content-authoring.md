# Content Authoring

Use this guide to add or update public portfolio content after product requirements are established.

Canonical references:

- Product truth: [`specs/portfolio.md`](../specs/portfolio.md)
- Evidence rules: [`rules/evidence.md`](../rules/evidence.md)
- Dossier skeleton: [`templates/work-dossier.md`](../templates/work-dossier.md)

## Workflow

1. **Research the source project first.** Identify the canonical repository/system and the revision or evidence window relevant to the update.
2. **Establish factual claims.** Write down only what the source directly supports. Separate personal responsibility from repository-wide or third-party outcomes.
3. **Establish evidence.** Map each material claim to the nearest practical source: revision, task/review, test result, deployed surface, operational observation, or another direct artifact.
4. **Choose the correct evidence state.** Distinguish `IMPLEMENTED`, `VERIFIED`, `ACCEPTED`, `DEPLOYED`, and `OPERATED` where useful.
5. **Draft from the canonical template.** For a project dossier, start from [`templates/work-dossier.md`](../templates/work-dossier.md) and remove unsupported sections rather than filling them with speculation.
6. **Keep English concise.** Prefer descriptive headings, short paragraphs, direct statements, and inspectable links.
7. **Validate claim → source relationships.** Narrow or remove any claim whose evidence is weaker than its wording.
8. **Update repository-owned content through Git.** Do not introduce a parallel database/CMS/editorial source merely for authoring convenience.
9. **Verify before publication.** Run the focused content/application checks required by the owning change and inspect the exact diff.

## Non-negotiable claim checks

Before publication, confirm that the content does not invent or imply unsupported:

- employment, freelancing, or client relationships;
- customers, revenue, adoption, or business outcomes;
- deployment or operation;
- performance gains or metrics;
- seniority or years of experience.

Generated/decorative media must never be presented as factual engineering evidence.

This guide explains authoring workflow only. It does not define competing product requirements; [`specs/portfolio.md`](../specs/portfolio.md) remains authoritative.
