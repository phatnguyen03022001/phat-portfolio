import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Direct contact links for Nguyen Tien Phat.",
};

export default function ContactPage() {
  return (
    <section className="site-container page-intro" aria-labelledby="contact-page-title">
      <p className="eyebrow">Contact</p>
      <h1 className="display-title" id="contact-page-title">
        Direct contact, no form layer.
      </h1>
      <p className="lede">
        For engineering and project conversations, use the public GitHub profile below. Additional contact channels can be added only when they are explicitly owned and verified.
      </p>
      <ul className="contact-list">
        <li>
          <a className="contact-link" href="https://github.com/phatnguyen03022001">
            <span>GitHub</span>
            <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
