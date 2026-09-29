import Link from "next/link";

import type { WorkCategory, WorkItem } from "../../content/model";

type CaseStudySectionKind = WorkItem["sections"][number]["kind"];
import { orderCaseStudySections } from "../../content/case-study";
import { MarkdownContent } from "./markdown-content";
import { MediaSurface } from "./media-surface";

type WorkCaseStudyProps = {
  work: WorkItem;
};

const categoryLabels: Record<WorkCategory, string> = {
  PRODUCT_DOMAIN: "Product / Domain Engineering",
  AGENTIC_SYSTEM: "Agentic Engineering System",
  COMMERCIAL_OPERATIONAL: "Commercial / Operational Software",
  SUPPORTING: "Supporting",
};

const sectionEyebrows: Record<CaseStudySectionKind, string> = {
  OVERVIEW: "Executive Overview",
  PROBLEM: "Problem Definition",
  CONSTRAINTS: "System Constraints",
  RESPONSIBILITY: "Personal Responsibility",
  ARCHITECTURE: "System Architecture",
  KEY_DECISIONS: "Key Decisions",
  TRADE_OFFS: "Trade-offs & Alternatives",
  IMPLEMENTATION: "Technical Implementation",
  VERIFICATION: "Verification & Quality",
  OPERATIONS: "Operational Reality",
  OUTCOME: "Observed Outcomes",
  KNOWN_LIMITATIONS: "Known Limitations & Boundaries",
};


export function WorkCaseStudy({ work }: WorkCaseStudyProps) {
  const sections = orderCaseStudySections(work.sections);

  return (
    <article className="case-study">
      <header className="site-container case-hero">
        <div className="case-hero__copy">
          <div className="case-hero__eyebrow-row">
            <p className="eyebrow">{categoryLabels[work.category]}</p>
            <span className="case-hero__status-badge">
              {work.currentRank === null ? "Evidence-backed" : "Flagship Candidate"}
            </span>
          </div>
          <h1 className="display-title case-hero__title">{work.title}</h1>
          <p className="lede case-hero__lede">{work.summary}</p>

          <div className="case-hero__meta-strip">
            <div className="case-hero__meta-item">
              <span className="case-hero__meta-label">Collection</span>
              <span className="case-hero__meta-val">{work.collection}</span>
            </div>
            <div className="case-hero__meta-item">
              <span className="case-hero__meta-label">Surfaces</span>
              <span className="case-hero__meta-val">
                {work.repositoryReferences.length} {work.repositoryReferences.length === 1 ? "Repo" : "Repos"}
              </span>
            </div>
            <div className="case-hero__meta-item">
              <span className="case-hero__meta-label">Evidence</span>
              <span className="case-hero__meta-val">
                {work.evidence.length} {work.evidence.length === 1 ? "Record" : "Records"}
              </span>
            </div>
          </div>
        </div>

        <div className="case-hero__media">
          <MediaSurface
            variant="detail"
            slot={`case-study-${work.slug}`}
          />
        </div>
      </header>

      <div className="site-container case-layout">
        <aside className="case-index" aria-label="Case study sections">
          <div className="case-index__header">
            <p className="case-index__label">Dossier Index</p>
            <Link href="/work" className="case-index__back-link">
              ← Work
            </Link>
          </div>
          <ol className="case-index__nav">
            {sections.map((section, index) => {
              const headingId = `case-study-${section.kind.toLowerCase().replaceAll("_", "-")}`;
              return (
                <li key={section.kind}>
                  <a href={`#${headingId}`}>
                    <span className="case-index__number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="case-index__text">{section.title}</span>
                  </a>
                </li>
              );
            })}
            {work.repositoryReferences.length > 0 ? (
              <li>
                <a href="#case-study-repositories">
                  <span className="case-index__number">
                    {String(sections.length + 1).padStart(2, "0")}
                  </span>
                  <span className="case-index__text">Repositories</span>
                </a>
              </li>
            ) : null}
            <li>
              <a href="#case-study-evidence">
                <span className="case-index__number">
                  {String(sections.length + (work.repositoryReferences.length > 0 ? 2 : 1)).padStart(2, "0")}
                </span>
                <span className="case-index__text">Evidence Ledger</span>
              </a>
            </li>
            {work.technologies.length > 0 ? (
              <li>
                <a href="#case-study-technologies">
                  <span className="case-index__number">
                    {String(sections.length + (work.repositoryReferences.length > 0 ? 3 : 2)).padStart(2, "0")}
                  </span>
                  <span className="case-index__text">Technologies</span>
                </a>
              </li>
            ) : null}
            {work.externalLinks.length > 0 ? (
              <li>
                <a href="#case-study-links">
                  <span className="case-index__number">
                    {String(sections.length + (work.repositoryReferences.length > 0 ? 4 : 3)).padStart(2, "0")}
                  </span>
                  <span className="case-index__text">External Links</span>
                </a>
              </li>
            ) : null}
          </ol>
        </aside>

        <div className="case-study__body">
          {sections.map((section) => {
            const headingId = `case-study-${section.kind.toLowerCase().replaceAll("_", "-")}`;
            const eyebrow = sectionEyebrows[section.kind] ?? "Section";

            // Layout Family 1: OVERVIEW -> Full-width statement section
            if (section.kind === "OVERVIEW") {
              return (
                <section
                  className="case-section case-section--overview"
                  aria-labelledby={headingId}
                  key={section.kind}
                >
                  <p className="eyebrow">{eyebrow}</p>
                  <h2 className="case-section__title case-section__title--statement" id={headingId}>
                    {section.title}
                  </h2>
                  <div className="case-statement__body">
                    <MarkdownContent markdown={section.markdown} />
                  </div>
                </section>
              );
            }

            // Layout Family 2: PROBLEM -> Narrow editorial prose
            if (section.kind === "PROBLEM") {
              return (
                <section
                  className="case-section case-section--problem"
                  aria-labelledby={headingId}
                  key={section.kind}
                >
                  <p className="eyebrow">{eyebrow}</p>
                  <h2 className="case-section__title" id={headingId}>
                    {section.title}
                  </h2>
                  <div className="case-prose case-prose--focused">
                    <MarkdownContent markdown={section.markdown} />
                  </div>
                </section>
              );
            }

            // Layout Family 3: CONSTRAINTS -> Structured constraints panel
            if (section.kind === "CONSTRAINTS") {
              return (
                <section
                  className="case-section case-section--constraints"
                  aria-labelledby={headingId}
                  key={section.kind}
                >
                  <p className="eyebrow">{eyebrow}</p>
                  <h2 className="case-section__title" id={headingId}>
                    {section.title}
                  </h2>
                  <div className="case-callout case-callout--constraints">
                    <MarkdownContent markdown={section.markdown} />
                  </div>
                </section>
              );
            }

            // Layout Family 4: RESPONSIBILITY -> Personal ownership card
            if (section.kind === "RESPONSIBILITY") {
              return (
                <section
                  className="case-section case-section--responsibility"
                  aria-labelledby={headingId}
                  key={section.kind}
                >
                  <p className="eyebrow">{eyebrow}</p>
                  <h2 className="case-section__title" id={headingId}>
                    {section.title}
                  </h2>
                  <div className="case-callout case-callout--responsibility">
                    <div className="case-callout__header">
                      <span className="case-callout__tag">Author Ownership</span>
                    </div>
                    <MarkdownContent markdown={section.markdown} />
                  </div>
                </section>
              );
            }

            // Layout Family 5: ARCHITECTURE -> Architecture/media split with clean presentation seam
            if (section.kind === "ARCHITECTURE") {
              return (
                <section
                  className="case-section case-section--architecture"
                  aria-labelledby={headingId}
                  key={section.kind}
                >
                  <p className="eyebrow">{eyebrow}</p>
                  <h2 className="case-section__title" id={headingId}>
                    {section.title}
                  </h2>
                  <div className="case-architecture">
                    <div className="case-architecture__prose">
                      <MarkdownContent markdown={section.markdown} />
                    </div>
                    <div className="case-architecture__media">
                      <MediaSurface
                        variant="wide"
                        slot={`arch-${work.slug}`}
                        isEvidence={false}
                        caption="Architectural boundary structure"
                      />
                    </div>
                  </div>
                </section>
              );
            }

            // Layout Family 6: KEY_DECISIONS / TRADE_OFFS -> Numbered decision sequence
            if (section.kind === "KEY_DECISIONS" || section.kind === "TRADE_OFFS") {
              return (
                <section
                  className="case-section case-section--decisions"
                  aria-labelledby={headingId}
                  key={section.kind}
                >
                  <p className="eyebrow">{eyebrow}</p>
                  <h2 className="case-section__title" id={headingId}>
                    {section.title}
                  </h2>
                  <div className="case-decisions">
                    <MarkdownContent markdown={section.markdown} />
                  </div>
                </section>
              );
            }

            // Layout Family 7: VERIFICATION -> Verification matrix/list
            if (section.kind === "VERIFICATION") {
              return (
                <section
                  className="case-section case-section--verification"
                  aria-labelledby={headingId}
                  key={section.kind}
                >
                  <p className="eyebrow">{eyebrow}</p>
                  <h2 className="case-section__title" id={headingId}>
                    {section.title}
                  </h2>
                  <div className="case-callout case-callout--verification">
                    <MarkdownContent markdown={section.markdown} />
                  </div>
                </section>
              );
            }

            // Layout Family 8: KNOWN_LIMITATIONS -> Limitation callout
            if (section.kind === "KNOWN_LIMITATIONS") {
              return (
                <section
                  className="case-section case-section--limitations"
                  aria-labelledby={headingId}
                  key={section.kind}
                >
                  <p className="eyebrow">{eyebrow}</p>
                  <h2 className="case-section__title" id={headingId}>
                    {section.title}
                  </h2>
                  <div className="case-callout case-callout--limitations">
                    <div className="case-callout__icon" aria-hidden="true">
                      !
                    </div>
                    <div className="case-callout__body">
                      <MarkdownContent markdown={section.markdown} />
                    </div>
                  </div>
                </section>
              );
            }

            // Layout Family 9: Default narrow editorial prose
            return (
              <section
                className="case-section case-section--prose"
                aria-labelledby={headingId}
                key={section.kind}
              >
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="case-section__title" id={headingId}>
                  {section.title}
                </h2>
                <div className="case-prose">
                  <MarkdownContent markdown={section.markdown} />
                </div>
              </section>
            );
          })}

          {/* Inspection Surfaces / Repositories */}
          {work.repositoryReferences.length > 0 ? (
            <section
              className="case-section case-section--inspection"
              aria-labelledby="case-study-repositories"
            >
              <p className="eyebrow">Inspection Surfaces</p>
              <h2 className="case-section__title" id="case-study-repositories">
                Repositories
              </h2>
              <p className="case-section__lead">
                Verified source code and revision history are inspectable directly through the canonical repository repositories.
              </p>
              <ul className="case-repo-list">
                {work.repositoryReferences.map((repository) => (
                  <li key={`${repository.label}:${repository.url}`} className="case-repo-item">
                    <a className="case-repo-link" href={repository.url}>
                      <div className="case-repo-link__info">
                        <span className="case-repo-link__label">{repository.label}</span>
                        <span className="case-repo-link__url">{repository.url}</span>
                      </div>
                      <span className="case-repo-link__arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Evidence Ledger Section */}
          <section
            className="case-section case-section--evidence"
            aria-labelledby="case-study-evidence"
          >
            <p className="eyebrow">Empirical Verification</p>
            <h2 className="case-section__title" id="case-study-evidence">
              Evidence Ledger
            </h2>

            {work.evidence.length === 0 ? (
              <div className="evidence-ledger__empty">
                <p className="evidence-ledger__empty-title">
                  No published evidence records are attached to this case study yet.
                </p>
                <p className="evidence-ledger__empty-desc">
                  In accordance with repository evidence rules, claims stay proportional to inspectable evidence. Claims requiring direct deployment or operational proof remain omitted until verifiable artifacts exist.
                </p>
              </div>
            ) : (
              <ol className="evidence-ledger__list">
                {work.evidence.map((evidence, index) => (
                  <li key={`${evidence.state}:${evidence.claim}:${index}`} className="evidence-card">
                    <div className="evidence-card__header">
                      <span className={`evidence-badge evidence-badge--${evidence.state.toLowerCase()}`}>
                        {evidence.state}
                      </span>
                      {evidence.revision ? (
                        <code className="evidence-card__revision">rev: {evidence.revision}</code>
                      ) : null}
                      {evidence.observedAt ? (
                        <time
                          className="evidence-card__date"
                          dateTime={evidence.observedAt.toISOString()}
                        >
                          {evidence.observedAt.toISOString().slice(0, 10)}
                        </time>
                      ) : null}
                    </div>

                    <h3 className="evidence-card__claim">{evidence.claim}</h3>

                    <dl className="evidence-card__meta">
                      {evidence.method ? (
                        <div className="evidence-card__meta-field">
                          <dt>Method</dt>
                          <dd>{evidence.method}</dd>
                        </div>
                      ) : null}
                      {evidence.result ? (
                        <div className="evidence-card__meta-field">
                          <dt>Result</dt>
                          <dd>{evidence.result}</dd>
                        </div>
                      ) : null}
                      {evidence.sourceLabel ? (
                        <div className="evidence-card__meta-field">
                          <dt>Source</dt>
                          <dd>
                            {evidence.sourceUrl ? (
                              <a
                                className="text-link text-link--arrow"
                                href={evidence.sourceUrl}
                              >
                                {evidence.sourceLabel}
                                <span aria-hidden="true">↗</span>
                              </a>
                            ) : (
                              evidence.sourceLabel
                            )}
                          </dd>
                        </div>
                      ) : null}
                      {evidence.sourceKind ? (
                        <div className="evidence-card__meta-field">
                          <dt>Source kind</dt>
                          <dd>
                            <span className="evidence-card__kind-tag">{evidence.sourceKind}</span>
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {/* Technologies */}
          {work.technologies.length > 0 ? (
            <section
              className="case-section case-section--technologies"
              aria-labelledby="case-study-technologies"
            >
              <p className="eyebrow">Tooling & Environment</p>
              <h2 className="case-section__title" id="case-study-technologies">
                Technologies
              </h2>
              <ul className="case-tag-list">
                {work.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* External Links */}
          {work.externalLinks.length > 0 ? (
            <section
              className="case-section case-section--links"
              aria-labelledby="case-study-links"
            >
              <p className="eyebrow">References</p>
              <h2 className="case-section__title" id="case-study-links">
                External Links
              </h2>
              <ul className="case-link-list">
                {work.externalLinks.map((link) => (
                  <li key={`${link.label}:${link.url}`}>
                    <a className="text-link text-link--arrow" href={link.url}>
                      {link.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
