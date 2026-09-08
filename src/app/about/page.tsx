import type { Metadata } from "next";

import { engineeringPrinciples, identity } from "@/content/fixtures";

export const metadata: Metadata = {
  title: "About",
  description: "Engineering positioning and working principles for Nguyen Tien Phat.",
};

export default function AboutPage() {
  return (
    <>
      <section className="site-container page-intro" aria-labelledby="about-page-title">
        <p className="eyebrow">{identity.role}</p>
        <h1 className="display-title" id="about-page-title">
          {identity.name}
        </h1>
        <p className="hero__specialization">{identity.specialization}</p>
        <p className="lede">
          I prefer evidence-first engineering, narrow ownership boundaries, and the smallest system that satisfies the real requirement.
        </p>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Principles</p>
              <h2 className="section-title" id="principles-title">
                Reviewable decisions over architectural theatre.
              </h2>
            </div>
            <p className="section-copy">
              Capability is described through working principles and evidence, not proficiency percentages or technology icon clouds.
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
    </>
  );
}
