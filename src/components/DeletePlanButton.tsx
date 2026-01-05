"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePlanButton({ planId }: { planId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    const ok = confirm("Delete this plan? This cannot be undone.");
    if (!ok) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/plans/${planId}`, { method: "DELETE" });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.error ?? "Failed to delete plan.");
        return;
      }

      router.refresh(); // re-fetch server component list
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onDelete}
      disabled={loading}
      className="rounded px-3 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
