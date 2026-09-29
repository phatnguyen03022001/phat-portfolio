import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { SiteProfile } from "@/content/model";

import { MediaSurface } from "./media-surface";

type HeroProps = {
  identity: SiteProfile["identity"];
};

export function Hero({ identity }: HeroProps) {
  return (
    <section className="hero-shell" aria-labelledby="hero-title">
      <div className="site-container hero">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">{identity.role}</p>
          <h1 className="display-title hero__title" id="hero-title">
            {identity.name}
          </h1>
          <p className="hero__specialization">{identity.specialization}</p>
          <p className="lede hero__lede">{identity.intro}</p>
          <div className="hero__actions">
            <Button
              className="hero__primary-action"
              nativeButton={false}
              render={<Link href="/work" />}
              size="lg"
            >
              View selected work
            </Button>
            <Link className="text-link text-link--arrow" href="/about">
              How I approach engineering
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="hero__media">
          <MediaSurface variant="hero" slot="home-hero" />
        </div>
      </div>
    </section>
  );
}
