import Link from "next/link";
import { notFound } from "next/navigation";

import { WorkEditor } from "../../../../../components/admin/work-editor";
import { getAdminWorkBySlug } from "../../../../../content/admin-work";

type EditWorkPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string; saved?: string; published?: string; unpublished?: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditWorkPage({ params, searchParams }: EditWorkPageProps) {
  const [{ slug }, status] = await Promise.all([params, searchParams]);
  const work = await getAdminWorkBySlug(slug);
  if (!work) notFound();

  const notice = status.saved ? "Draft saved." : status.published ? "Published." : status.unpublished ? "Unpublished." : null;

  return (
    <section className="admin-section">
      <p className="eyebrow">Editorial</p>
      <Link href="/admin/work">← Work</Link>
      <h1>{work.title}</h1>
      {notice ? <p className="admin-work-notice">{notice}</p> : null}
      {status.error ? <p className="admin-auth-error">The requested mutation was rejected.</p> : null}
      <WorkEditor mode="edit" work={work} />
    </section>
  );
}
