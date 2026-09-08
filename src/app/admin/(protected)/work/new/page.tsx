import Link from "next/link";

import { WorkEditor } from "../../../../../components/admin/work-editor";

type NewWorkPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewWorkPage({ searchParams }: NewWorkPageProps) {
  const { error } = await searchParams;
  return (
    <section className="admin-section">
      <p className="eyebrow">Editorial</p>
      <Link href="/admin/work">← Work</Link>
      <h1>New draft</h1>
      <p>Creation always persists a DRAFT with no published timestamp.</p>
      {error ? <p className="admin-auth-error">{error === "duplicate-slug" ? "That slug already exists." : "The draft input is invalid."}</p> : null}
      <WorkEditor mode="create" />
    </section>
  );
}
