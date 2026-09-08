import Link from "next/link";
import type { ReactNode } from "react";

import { AdminSignOutAction } from "./admin-auth-actions";

const adminNavigation = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/work", label: "Work" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/media", label: "Media" },
] as const;

export function AdminShell({
  children,
  ownerLabel,
}: {
  children: ReactNode;
  ownerLabel: string;
}) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div>
          <p className="eyebrow">Owner workspace</p>
          <p className="admin-owner-label">{ownerLabel}</p>
        </div>
        <nav className="admin-nav" aria-label="Admin">
          {adminNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <AdminSignOutAction />
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
