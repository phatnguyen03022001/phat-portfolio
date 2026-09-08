import type { Metadata } from "next";

import { getSiteProfile } from "@/content/queries";

export const metadata: Metadata = {
  title: "About",
  description: "Engineering positioning and working principles for Nguyen Tien Phat.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const profile = await getSiteProfile();

  return (
    <>
      <section className="site-container page-intro" aria-labelledby="about-page-title">
        <p className="eyebrow">{profile.identity.role}</p>
        <h1 className="display-title" id="about-page-title">
          {profile.identity.name}
        </h1>
        <p className="hero__specialization">{profile.identity.specialization}</p>
        <p className="lede">{profile.home.aboutSummary}</p>
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
            {profile.engineeringPrinciples.map((principle) => (
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
