import type { Metadata } from "next";

import { EngineeringApproach } from "@/components/public/engineering-approach";
import { MediaSurface } from "@/components/public/media-surface";
import { getSiteProfile } from "@/content/queries";

export const metadata: Metadata = {
  title: "About",
  description: "Engineering positioning and working principles for Nguyen Tien Phat.",
};

export default async function AboutPage() {
  const profile = await getSiteProfile();

  return (
    <>
      <section className="site-container page-intro page-intro--with-media" aria-labelledby="about-page-title">
        <div className="page-intro__copy">
          <p className="eyebrow">{profile.identity.role}</p>
          <h1 className="display-title" id="about-page-title">
            {profile.identity.name}
          </h1>
          <p className="hero__specialization">{profile.identity.specialization}</p>
          <p className="lede">{profile.home.aboutSummary}</p>
        </div>
        <MediaSurface
          variant="identity"
          slot="about-identity"
        />
      </section>

      <EngineeringApproach principles={profile.engineeringPrinciples} />
    </>
  );
}
