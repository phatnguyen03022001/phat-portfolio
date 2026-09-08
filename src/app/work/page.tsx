import type { Metadata } from "next";

import { SelectedWork } from "@/components/public/selected-work";
import { listPublishedWork } from "@/content/queries";

export const metadata: Metadata = {
  title: "Work",
  description: "Curated engineering work from Nguyen Tien Phat, limited to current evidence-backed candidates.",
};

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const workItems = await listPublishedWork();

  return (
    <>
      <section className="site-container page-intro" aria-labelledby="work-page-title">
        <p className="eyebrow">Work</p>
        <h1 className="display-title" id="work-page-title">
          Curated systems, not a repository dump.
        </h1>
        <p className="lede">
          Work appears here only when the underlying engineering evidence is strong enough to support the claim being made.
        </p>
      </section>
      <SelectedWork workItems={workItems} />
    </>
  );
}
