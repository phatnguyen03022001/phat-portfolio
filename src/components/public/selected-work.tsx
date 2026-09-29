import Link from "next/link";

import type { WorkCategory, WorkItem } from "../../content/model";
import { MediaSurface } from "./media-surface";

type SelectedWorkProps = {
  workItems: WorkItem[];
  showIntro?: boolean;
};

const categoryLabels: Record<WorkCategory, string> = {
  PRODUCT_DOMAIN: "Product / Domain Engineering",
  AGENTIC_SYSTEM: "Agentic Engineering System",
  COMMERCIAL_OPERATIONAL: "Commercial / Operational Software",
  SUPPORTING: "Supporting",
};

export function SelectedWork({ workItems, showIntro = true }: SelectedWorkProps) {
  return (
    <section className="section section--work" aria-labelledby={showIntro ? "selected-work-title" : undefined}>
      <div className="site-container">
        {showIntro ? (
          <header className="section-intro">
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title" id="selected-work-title">
              Systems with evidence behind them.
            </h2>
            <p className="section-copy">
              Curated engineering work where responsibility, constraints, decisions, and proof can be inspected.
            </p>
          </header>
        ) : null}

        <ol className="work-showcase">
          {workItems.map((work, index) => (
            <li className="work-showcase__item" key={work.slug}>
              <article className="work-showcase__article">
                <div className="work-showcase__media">
                  <MediaSurface
                    variant="work"
                    slot={`work-${work.slug}`}
                    className={index % 2 === 1 ? "placeholder-visual--alternate" : undefined}
                  />
                </div>

                <div className="work-showcase__content">
                  <div className="work-showcase__meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{categoryLabels[work.category]}</span>
                  </div>
                  <h3 className="work-showcase__title">
                    <Link href={`/work/${work.slug}`}>{work.title}</Link>
                  </h3>
                  <p className="work-showcase__summary">{work.summary}</p>
                  <p className="status-line">
                    {work.currentRank === null ? "Evidence-backed work" : "Current evidence-backed candidate"}
                  </p>
                  <Link className="text-link text-link--arrow" href={`/work/${work.slug}`}>
                    Read case study
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
