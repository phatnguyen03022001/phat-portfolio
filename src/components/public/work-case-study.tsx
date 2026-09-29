import type { WorkCategory, WorkItem } from "../../content/model";
import { orderCaseStudySections } from "../../content/case-study";
import { MarkdownContent } from "./markdown-content";
import { PlaceholderVisual } from "./placeholder-visual";

type WorkCaseStudyProps = {
  work: WorkItem;
};

const categoryLabels: Record<WorkCategory, string> = {
  PRODUCT_DOMAIN: "Product / Domain Engineering",
  AGENTIC_SYSTEM: "Agentic Engineering System",
  COMMERCIAL_OPERATIONAL: "Commercial / Operational Software",
  SUPPORTING: "Supporting",
};

export function WorkCaseStudy({ work }: WorkCaseStudyProps) {
  const sections = orderCaseStudySections(work.sections);

  return (
    <article className="case-study">
      <header className="site-container case-hero">
        <div className="case-hero__copy">
          <p className="eyebrow">{categoryLabels[work.category]}</p>
          <h1 className="display-title">{work.title}</h1>
          <p className="lede">{work.summary}</p>
        </div>
        <PlaceholderVisual variant="detail" slot={`case-study-${work.slug}`} />
      </header>

      <div className="site-container case-layout">
        <aside className="case-index" aria-label="Case study sections">
          <p className="case-index__label">Case study</p>
          <ol>
            {sections.map((section, index) => {
              const headingId = `case-study-${section.kind.toLowerCase().replaceAll("_", "-")}`;
              return (
                <li key={section.kind}>
                  <a href={`#${headingId}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                </li>
              );
            })}
            <li>
              <a href="#case-study-evidence">
                <span>{String(sections.length + 1).padStart(2, "0")}</span>
                Evidence
              </a>
            </li>
          </ol>
        </aside>

        <div className="case-study__body">
          <section className="case-study__section case-study__inspection" aria-labelledby="case-study-repositories">
            <p className="eyebrow">Inspection surfaces</p>
            <h2 id="case-study-repositories">Repositories</h2>
            <ul className="case-study__link-list">
              {work.repositoryReferences.map((repository) => (
                <li key={`${repository.label}:${repository.url}`}>
                  <a className="text-link text-link--arrow" href={repository.url}>
                    {repository.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {sections.map((section) => {
            const headingId = `case-study-${section.kind.toLowerCase().replaceAll("_", "-")}`;

            return (
              <section className="case-study__section" aria-labelledby={headingId} key={section.kind}>
                <h2 id={headingId}>{section.title}</h2>
                <MarkdownContent markdown={section.markdown} />
              </section>
            );
          })}

          <section className="case-study__section case-study__evidence" aria-labelledby="case-study-evidence">
            <p className="eyebrow">Proof</p>
            <h2 id="case-study-evidence">Evidence</h2>
            {work.evidence.length === 0 ? (
              <p className="case-study__empty-state">
                No published evidence records are attached to this case study yet.
              </p>
            ) : (
              <ol className="case-study__evidence-list">
                {work.evidence.map((evidence, index) => (
                  <li key={`${evidence.state}:${evidence.claim}:${index}`}>
                    <p className="status-line">{evidence.state}</p>
                    <p className="case-study__evidence-claim">{evidence.claim}</p>
                    <dl className="case-study__evidence-meta">
                      {evidence.method ? (
                        <div>
                          <dt>Method</dt>
                          <dd>{evidence.method}</dd>
                        </div>
                      ) : null}
                      {evidence.result ? (
                        <div>
                          <dt>Result</dt>
                          <dd>{evidence.result}</dd>
                        </div>
                      ) : null}
                      {evidence.sourceLabel ? (
                        <div>
                          <dt>Source</dt>
                          <dd>
                            {evidence.sourceUrl ? (
                              <a className="text-link" href={evidence.sourceUrl}>
                                {evidence.sourceLabel}
                              </a>
                            ) : (
                              evidence.sourceLabel
                            )}
                          </dd>
                        </div>
                      ) : null}
                      {evidence.sourceKind ? (
                        <div>
                          <dt>Source kind</dt>
                          <dd>{evidence.sourceKind}</dd>
                        </div>
                      ) : null}
                      {evidence.revision ? (
                        <div>
                          <dt>Revision</dt>
                          <dd>{evidence.revision}</dd>
                        </div>
                      ) : null}
                      {evidence.observedAt ? (
                        <div>
                          <dt>Observed</dt>
                          <dd>
                            <time dateTime={evidence.observedAt.toISOString()}>
                              {evidence.observedAt.toISOString().slice(0, 10)}
                            </time>
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {work.technologies.length > 0 ? (
            <section className="case-study__section" aria-labelledby="case-study-technologies">
              <h2 id="case-study-technologies">Technologies</h2>
              <ul className="case-study__tag-list">
                {work.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {work.externalLinks.length > 0 ? (
            <section className="case-study__section" aria-labelledby="case-study-links">
              <h2 id="case-study-links">External links</h2>
              <ul className="case-study__link-list">
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
