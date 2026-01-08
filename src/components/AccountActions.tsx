"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AccountActions() {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState("");

  async function onDeleteAccount() {
    setError(null);

    if (confirmText.trim().toLowerCase() !== "delete") {
      setError('Type "delete" to confirm.');
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Failed to delete account.");
        return;
      }

      // End session then go home/login
      await signOut({ redirect: false });
      router.push("/auth/login");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
      >
        Logout
      </button>

      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-semibold text-red-700">Danger zone</p>
        <p className="mt-1 text-sm text-red-700/90">
          This will permanently delete your account, plans, and practice sessions.
        </p>

        <div className="mt-3 space-y-2">
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder='Type "delete" to confirm'
            className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-200"
          />

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            onClick={onDeleteAccount}
            disabled={deleting}
            className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete account"}
          </button>
        </div>
      </div>
    </div>
  );
}
