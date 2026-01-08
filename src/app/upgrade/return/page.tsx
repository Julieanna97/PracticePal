"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UpgradeReturnPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");
  const [msg, setMsg] = useState("Finishing your upgrade...");

  useEffect(() => {
    if (!sessionId) {
      setMsg("Missing session id. Please contact support.");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/stripe/sync-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          setMsg(data?.error ?? "Failed to sync your subscription.");
          return;
        }

        setMsg("✅ You're Pro now! Redirecting...");
        // Refresh and go to dashboard/account
        router.refresh();
        router.push("/dashboard");
      } catch {
        setMsg("Network error while syncing subscription.");
      }
    })();
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 text-center">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">Processing</h1>
        <p className="text-gray-600">{msg}</p>
      </div>
    </div>
  );
}
