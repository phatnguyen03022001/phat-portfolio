import type { WorkCategory, WorkItem } from "../../content/model";
import { orderCaseStudySections } from "../../content/case-study";
import { MarkdownContent } from "./markdown-content";

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
      <header className="site-container page-intro case-study__header">
        <p className="eyebrow">{categoryLabels[work.category]}</p>
        <h1 className="display-title">{work.title}</h1>
        <p className="lede">{work.summary}</p>
      </header>

      <div className="site-container case-study__body">
        <section className="case-study__section" aria-labelledby="case-study-repositories">
          <p className="eyebrow">Inspection surfaces</p>
          <h2 id="case-study-repositories">Repositories</h2>
          <ul className="case-study__link-list">
            {work.repositoryReferences.map((repository) => (
              <li key={`${repository.label}:${repository.url}`}>
                <a className="text-link" href={repository.url}>
                  {repository.label}
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

        <section className="case-study__section" aria-labelledby="case-study-evidence">
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
                  <p>{evidence.claim}</p>
                  {evidence.method ? (
                    <p>
                      <strong>Method:</strong> {evidence.method}
                    </p>
                  ) : null}
                  {evidence.result ? (
                    <p>
                      <strong>Result:</strong> {evidence.result}
                    </p>
                  ) : null}
                  {evidence.sourceLabel ? (
                    <p>
                      <strong>Source:</strong>{" "}
                      {evidence.sourceUrl ? (
                        <a className="text-link" href={evidence.sourceUrl}>
                          {evidence.sourceLabel}
                        </a>
                      ) : (
                        evidence.sourceLabel
                      )}
                    </p>
                  ) : null}
                  {evidence.sourceKind ? (
                    <p>
                      <strong>Source kind:</strong> {evidence.sourceKind}
                    </p>
                  ) : null}
                  {evidence.revision ? (
                    <p>
                      <strong>Revision:</strong> {evidence.revision}
                    </p>
                  ) : null}
                  {evidence.observedAt ? (
                    <p>
                      <strong>Observed:</strong>{" "}
                      <time dateTime={evidence.observedAt.toISOString()}>
                        {evidence.observedAt.toISOString().slice(0, 10)}
                      </time>
                    </p>
                  ) : null}
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
                  <a className="text-link" href={link.url}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
