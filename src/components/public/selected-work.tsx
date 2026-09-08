import { workCandidates } from "@/content/fixtures";

export function SelectedWork() {
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
            This first portfolio slice shows only the two current evidence-backed flagship candidates. It does not manufacture outcomes or production claims.
          </p>
        </div>
        <div className="work-grid">
          {workCandidates.map((work, index) => (
            <article className="work-card" key={work.slug}>
              <div>
                <p className="work-card__index">0{index + 1}</p>
                <p className="work-card__category">{work.category}</p>
              </div>
              <div>
                <h3 className="work-card__title">{work.title}</h3>
                <p className="work-card__summary">{work.summary}</p>
                <p className="status-line">{work.status}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
