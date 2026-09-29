import type { Metadata } from "next";

import { SelectedWork } from "@/components/public/selected-work";
import { listWork } from "@/content/queries";

export const metadata: Metadata = {
  title: "Work",
  description: "Curated engineering work from Nguyen Tien Phat, limited to current evidence-backed candidates.",
};

export default async function WorkPage() {
  const workItems = await listWork();

  return (
    <>
      <section className="site-container page-intro page-intro--work" aria-labelledby="work-page-title">
        <p className="eyebrow">Work</p>
        <h1 className="display-title" id="work-page-title">
          Curated systems, not a repository dump.
        </h1>
        <p className="lede">
          Strong work should expose the problem, constraints, responsibility, architecture, decisions, verification, and limitations without forcing a reviewer through source code first.
        </p>
      </section>
      <SelectedWork workItems={workItems} showIntro={false} />
    </>
  );
}
