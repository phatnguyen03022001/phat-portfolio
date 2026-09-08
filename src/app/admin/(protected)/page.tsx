export default function AdminDashboardPage() {
  return (
    <section className="admin-section">
      <p className="eyebrow">Dashboard</p>
      <h1>Portfolio owner shell</h1>
      <p>This slice is intentionally read-only. Editorial changes and publishing are activated in a later task.</p>
      <div className="admin-status-grid">
        <article><h2>Work</h2><p>Inspect the workspace destination; editing is deferred.</p></article>
        <article><h2>Profile</h2><p>Inspect the workspace destination; editing is deferred.</p></article>
        <article><h2>Media</h2><p>Inspect the workspace destination; managed media is deferred.</p></article>
      </div>
    </section>
  );
}
