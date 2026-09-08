import Link from "next/link";

import { listAdminWork } from "../../../../content/admin-work";

export const dynamic = "force-dynamic";

export default async function AdminWorkPage() {
  const works = await listAdminWork();

  return (
    <section className="admin-section">
      <p className="eyebrow">Editorial</p>
      <div className="admin-section-heading">
        <div>
          <h1>Work</h1>
          <p>Create drafts, edit drafts, and explicitly publish or unpublish WorkItems.</p>
        </div>
        <Link className="admin-button admin-button-link" href="/admin/work/new">New draft</Link>
      </div>
      <div className="admin-work-list">
        {works.length === 0 ? <p>No WorkItems yet.</p> : works.map((work) => (
          <article key={work._id}>
            <div>
              <p className="admin-work-list__status">{work.publicationStatus}</p>
              <h2>{work.title}</h2>
              <p>{work.slug}</p>
            </div>
            <Link href={`/admin/work/${work.slug}`}>{work.publicationStatus === "DRAFT" ? "Edit" : "View"}</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
