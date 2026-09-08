import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getOwnerSession } from "../../../auth/server";
import { AdminSignInAction } from "../../../components/admin/admin-auth-actions";

export default async function AdminSignInPage() {
  const session = await getOwnerSession(new Headers(await headers()));
  if (session) redirect("/admin");

  return (
    <main className="admin-sign-in">
      <section className="admin-sign-in__panel" aria-labelledby="admin-sign-in-title">
        <p className="eyebrow">Owner access</p>
        <h1 id="admin-sign-in-title">Portfolio administration</h1>
        <p>Sign in with the configured GitHub owner account to open the read-only admin workspace.</p>
        <AdminSignInAction />
      </section>
    </main>
  );
}
