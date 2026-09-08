import { engineeringPrinciples } from "@/content/fixtures";

export function EngineeringApproach() {
  return (
    <section className="section" aria-labelledby="engineering-approach-title">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Engineering approach</p>
            <h2 className="section-title" id="engineering-approach-title">
              Complexity earns its place.
            </h2>
          </div>
          <p className="section-copy">
            Architecture serves communication, maintainability, and proof. New machinery is added only when a current requirement justifies its cost.
          </p>
        </div>
        <div className="approach-grid">
          {engineeringPrinciples.map((principle) => (
            <article className="approach-card" key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
