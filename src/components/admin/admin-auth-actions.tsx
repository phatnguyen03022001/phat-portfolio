"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "../../auth/client";

export function AdminSignInAction() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn() {
    setPending(true);
    setError(null);
    const result = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/admin",
    });

    if (result.error) {
      setError("GitHub sign-in failed.");
      setPending(false);
    }
  }

  return (
    <div className="admin-auth-action">
      <button className="admin-button" type="button" onClick={signIn} disabled={pending}>
        {pending ? "Opening GitHub…" : "Continue with GitHub"}
      </button>
      {error ? <p className="admin-auth-error" role="alert">{error}</p> : null}
    </div>
  );
}

export function AdminSignOutAction() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await authClient.signOut();
    router.replace("/admin/sign-in");
    router.refresh();
  }

  return (
    <button className="admin-button admin-button--quiet" type="button" onClick={signOut} disabled={pending}>
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
