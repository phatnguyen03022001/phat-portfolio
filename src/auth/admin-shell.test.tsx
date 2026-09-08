import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn() }),
}));

import { AdminShell } from "../components/admin/admin-shell";

describe("admin shell", () => {
  it("exposes exactly the approved read-only admin destinations", () => {
    const html = renderToStaticMarkup(
      <AdminShell ownerLabel="Owner"><p>Content</p></AdminShell>,
    );

    expect(html).toContain('href="/admin"');
    expect(html).toContain('href="/admin/work"');
    expect(html).toContain('href="/admin/profile"');
    expect(html).toContain('href="/admin/media"');
    for (const label of ["Dashboard", "Work", "Profile", "Media"]) {
      expect(html).toContain(label);
    }
    expect(html).not.toMatch(/Settings|Users|Roles|Publish|Upload|Import/);
  });

  it("keeps the Better Auth route module lazy with no runtime configuration at import time", async () => {
    const keys = [
      "MONGODB_URI",
      "BETTER_AUTH_SECRET",
      "BETTER_AUTH_URL",
      "GITHUB_CLIENT_ID",
      "GITHUB_CLIENT_SECRET",
      "GITHUB_OWNER_ID",
    ];
    const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
    keys.forEach((key) => delete process.env[key]);

    try {
      const route = await import("../app/api/auth/[...all]/route");
      expect(route.GET).toBeTypeOf("function");
      expect(route.POST).toBeTypeOf("function");
    } finally {
      for (const key of keys) {
        const value = previous[key];
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    }
  });
});
