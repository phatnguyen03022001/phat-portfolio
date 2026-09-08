import Link from "next/link";

import { Button } from "@/components/ui/button";
import { identity } from "@/content/fixtures";

import { PlaceholderVisual } from "./placeholder-visual";

export function Hero() {
  return (
    <section className="site-container hero" aria-labelledby="hero-title">
      <div>
        <p className="eyebrow">{identity.role}</p>
        <h1 className="display-title" id="hero-title">
          {identity.name}
        </h1>
        <p className="hero__specialization">{identity.specialization}</p>
        <p className="lede">
          I build software around clear ownership, bounded complexity, and evidence that can survive review.
        </p>
        <div className="hero__actions">
          <Button nativeButton={false} render={<Link href="/work" />} size="lg">
            View selected work
          </Button>
          <Link className="text-link" href="/about">
            How I approach engineering
          </Link>
        </div>
      </div>
      <PlaceholderVisual />
    </section>
  );
}
