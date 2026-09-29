import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CurrentBuilding } from "@/components/public/current-building";
import { EngineeringApproach } from "@/components/public/engineering-approach";
import { Hero } from "@/components/public/hero";
import { SelectedWork } from "@/components/public/selected-work";
import { getSiteProfile, listCurrentWork } from "@/content/queries";

export default async function Home() {
  const [profile, currentWork] = await Promise.all([getSiteProfile(), listCurrentWork()]);

  return (
    <>
      <Hero identity={profile.identity} />
      <SelectedWork workItems={currentWork} />
      <EngineeringApproach principles={profile.engineeringPrinciples} />
      <CurrentBuilding currentBuilding={profile.home.currentBuilding} />

      <section className="section statement-section" aria-labelledby="evidence-title">
        <div className="site-container statement-section__inner">
          <p className="eyebrow">Evidence philosophy</p>
          <h2 className="section-title section-title--wide" id="evidence-title">
            Proof determines credibility.
          </h2>
          <p className="statement-section__copy">{profile.home.evidencePhilosophy}</p>
        </div>
      </section>

      <section className="section home-about" aria-labelledby="about-summary-title">
        <div className="site-container home-about__inner">
          <p className="eyebrow">About</p>
          <h2 className="section-title section-title--wide" id="about-summary-title">
            Software engineering is the durable identity.
          </h2>
          <p className="home-about__copy">{profile.home.aboutSummary}</p>
          <Link className="text-link text-link--arrow" href="/about">
            Read the approach
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="section section--contact-cta" aria-labelledby="contact-cta-title">
        <div className="site-container contact-cta">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="section-title section-title--wide" id="contact-cta-title">
              Start with the work and the constraints.
            </h2>
          </div>
          <div className="contact-cta__action">
            <p>{profile.home.contactPrompt}</p>
            <Button
              className="contact-cta__button"
              nativeButton={false}
              render={<Link href="/contact" />}
              size="lg"
            >
              Contact
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
