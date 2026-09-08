import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CurrentBuilding } from "@/components/public/current-building";
import { EngineeringApproach } from "@/components/public/engineering-approach";
import { Hero } from "@/components/public/hero";
import { SelectedWork } from "@/components/public/selected-work";
import { getSiteProfile, listCurrentPublishedWork } from "@/content/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, currentWork] = await Promise.all([getSiteProfile(), listCurrentPublishedWork()]);

  return (
    <>
      <Hero identity={profile.identity} />
      <SelectedWork workItems={currentWork} />
      <EngineeringApproach principles={profile.engineeringPrinciples} />
      <CurrentBuilding currentBuilding={profile.home.currentBuilding} />

      <section className="section" aria-labelledby="evidence-title">
        <div className="site-container split-grid">
          <div>
            <p className="eyebrow">Evidence philosophy</p>
            <h2 className="section-title" id="evidence-title">
              Proof determines credibility.
            </h2>
          </div>
          <div className="info-panel">
            <h3>Claims stay smaller than the evidence.</h3>
            <p>{profile.home.evidencePhilosophy}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-summary-title">
        <div className="site-container section-heading">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="section-title" id="about-summary-title">
              Software engineering is the durable identity.
            </h2>
          </div>
          <div>
            <p className="section-copy">{profile.home.aboutSummary}</p>
            <div className="section-actions">
              <Link className="text-link" href="/about">
                Read the approach
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--compact" aria-labelledby="contact-cta-title">
        <div className="site-container section-heading">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="section-title" id="contact-cta-title">
              Start with the work and the constraints.
            </h2>
          </div>
          <div>
            <p className="section-copy">{profile.home.contactPrompt}</p>
            <div className="section-actions">
              <Button nativeButton={false} render={<Link href="/contact" />} size="lg">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
