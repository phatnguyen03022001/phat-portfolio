import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getOwnerSession } from "../../../auth/server";
import { AdminShell } from "../../../components/admin/admin-shell";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const session = await getOwnerSession(new Headers(await headers()));
  if (!session) redirect("/admin/sign-in");

  return <AdminShell ownerLabel={session.user.name ?? "Owner"}>{children}</AdminShell>;
}
