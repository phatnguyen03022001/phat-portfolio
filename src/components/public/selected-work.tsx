import Link from "next/link";

import type { WorkCategory, WorkItem } from "../../content/model";

type SelectedWorkProps = {
  workItems: WorkItem[];
};

const categoryLabels: Record<WorkCategory, string> = {
  PRODUCT_DOMAIN: "Product / Domain Engineering",
  AGENTIC_SYSTEM: "Agentic Engineering System",
  COMMERCIAL_OPERATIONAL: "Commercial / Operational Software",
  SUPPORTING: "Supporting",
};

export function SelectedWork({ workItems }: SelectedWorkProps) {
  return (
    <section className="section" aria-labelledby="selected-work-title">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title" id="selected-work-title">
              Systems with evidence behind them.
            </h2>
          </div>
          <p className="section-copy">
            This portfolio shows only published work with evidence behind the claim. It does not manufacture outcomes or production claims.
          </p>
        </div>
        <div className="work-grid">
          {workItems.map((work, index) => (
            <article className="work-card" key={work.slug}>
              <div>
                <p className="work-card__index">{String(index + 1).padStart(2, "0")}</p>
                <p className="work-card__category">{categoryLabels[work.category]}</p>
              </div>
              <div>
                <h3 className="work-card__title">
                  <Link href={`/work/${work.slug}`}>{work.title}</Link>
                </h3>
                <p className="work-card__summary">{work.summary}</p>
                <p className="status-line">
                  {work.currentRank === null ? "Published work" : "Current evidence-backed candidate"}
                </p>
                <p className="section-actions">
                  <Link className="text-link" href={`/work/${work.slug}`}>
                    Read case study
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
