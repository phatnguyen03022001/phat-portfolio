# Work Dossier Authoring Template

Use this template as an authoring aid for one public engineering dossier. Remove guidance that does not apply before publication. Omit unsupported sections instead of inventing filler.

Use concise plain English suitable for scanning.

## Identity

**Title**

State the public project/system title.

**Slug**

Use the intended stable public slug.

**One-line summary**

Describe the system and its purpose in one factual sentence.

**Category**

Use the smallest useful public category.

**Project/repository identity**

Name the canonical source project/repository and relevant ownership boundary.

**Evidence revision/date**

Record the revision, date, or evidence window used to validate this dossier when material.

## Overview

Summarize what the project/system is and why it exists.

## Problem

Describe the concrete problem or system boundary. Avoid marketing claims that evidence cannot support.

## Constraints

List material technical, product, operational, compatibility, security, cost, or delivery constraints that actually shaped the work.

## Responsibility

State what the owner personally designed, implemented, reviewed, operated, or decided. Separate personal responsibility from repository-wide or team-level outcomes when needed.

## Architecture

Explain the system shape at the level needed to understand the work. Prefer a compact diagram or structured explanation over implementation trivia.

## Key decisions

For each material decision, state:

- the decision;
- the constraint/problem it addressed;
- why the chosen approach was appropriate;
- the evidence or implementation surface that supports the statement.

## Trade-offs

Include only trade-offs that materially improve understanding. State the cost accepted and the benefit gained.

## Implementation notes

Include implementation detail only where it helps explain engineering depth, constraints, or a key decision.

## Verification

Describe how correctness/quality was established.

Where relevant, distinguish:

- `IMPLEMENTED`
- `VERIFIED`
- `ACCEPTED`
- `DEPLOYED`
- `OPERATED`

Do not infer `DEPLOYED` or `OPERATED` from source code, tests, or repository activity.

## Evidence map

For each material public claim, record the nearest practical source.

| Claim | Evidence state | Source/revision/task/test/deployment evidence | Notes |
| --- | --- | --- | --- |
| Author a factual claim | Use the most accurate state | Point to direct inspectable evidence | State limitations if needed |

## Source and repository links

List only links that materially help inspection.

## Technologies

List technologies only when they help explain architecture, responsibility, constraints, or decisions. Do not create an icon wall.

## Deployment evidence

Include only when deployment is directly proven. State the environment, evidence source, and observation date where relevant.

## Operations evidence

Include only when operation is directly proven. Source code is not operational evidence.

## Outcome

Include only outcomes supported by direct evidence. Do not invent metrics, users, revenue, adoption, or customer impact.

## Known limitations

State important unproven areas, constraints, missing capabilities, or current limitations.

## Media candidates

List media that would improve explanation or inspection, such as:

- factual screenshots;
- architecture diagrams;
- short screen recordings;
- explanatory images/video;
- generated/decorative media clearly labeled as non-evidence.

Media authoring format/provider is not product semantics.

## Claim → source audit

Before publication, confirm:

- every material claim is proportional to available evidence;
- responsibility is attributable;
- employment/client/customer claims are not inferred;
- deployment/operation/outcome claims have direct proof;
- generated/decorative media is not presented as factual evidence;
- limitations that materially affect interpretation are visible.

## Publication checklist

Before publication, confirm:

- the dossier is useful when scanned by headings;
- problem, responsibility, architecture, decisions, verification, and limitations are understandable;
- unsupported sections were omitted rather than filled;
- evidence links are close enough to the claims they support;
- concise plain English is used;
- static content remains sufficient without optional motion/video;
- responsive and accessibility requirements are respected;
- repository/content diff has been reviewed;
- relevant validation/build checks have passed under the owning implementation task.
