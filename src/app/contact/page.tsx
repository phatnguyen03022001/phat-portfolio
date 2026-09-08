import type { Metadata } from "next";

import { getSiteProfile } from "@/content/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Direct contact links for Nguyen Tien Phat.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const profile = await getSiteProfile();

  return (
    <section className="site-container page-intro" aria-labelledby="contact-page-title">
      <p className="eyebrow">Contact</p>
      <h1 className="display-title" id="contact-page-title">
        Direct contact, no form layer.
      </h1>
      <p className="lede">{profile.home.contactPrompt}</p>
      <ul className="contact-list">
        {profile.contactLinks.map((link) => (
          <li key={link.url}>
            <a className="contact-link" href={link.url}>
              <span>{link.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
