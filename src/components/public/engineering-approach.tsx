import type { SiteProfile } from "../../content/model";

type EngineeringApproachProps = {
  principles: SiteProfile["engineeringPrinciples"];
};

export function EngineeringApproach({ principles }: EngineeringApproachProps) {
  return (
    <section className="section section--approach" aria-labelledby="engineering-approach-title">
      <div className="site-container">
        <header className="section-intro">
          <p className="eyebrow">Engineering approach</p>
          <h2 className="section-title" id="engineering-approach-title">
            Complexity earns its place.
          </h2>
          <p className="section-copy">
            Architecture serves communication, maintainability, and proof. New machinery is added only when a current requirement justifies its cost.
          </p>
        </header>

        <ol className="principle-list">
          {principles.map((principle, index) => (
            <li className="principle-list__item" key={principle.title}>
              <span className="principle-list__index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
