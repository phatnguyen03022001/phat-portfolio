export default function AdminWorkPage() {
  return <AdminPlaceholder title="Work" detail="Work editing and publishing are deferred to the editorial mutation slice." />;
}

function AdminPlaceholder({ title, detail }: { title: string; detail: string }) {
  return <section className="admin-section"><p className="eyebrow">Read-only</p><h1>{title}</h1><p>{detail}</p></section>;
}
