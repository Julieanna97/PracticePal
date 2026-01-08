"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReturnClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = useMemo(() => searchParams.get("session_id"), [searchParams]);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setMessage("Missing session_id in return URL.");
      return;
    }

    let cancelled = false;

    async function sync() {
      setStatus("loading");
      setMessage("Syncing your subscription…");

      try {
        const res = await fetch("/api/stripe/sync-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.error ?? "Failed to sync subscription.");
        }

        if (cancelled) return;

        setStatus("success");
        setMessage("✅ Subscription synced! Redirecting to dashboard…");

        // Refresh + redirect
        router.refresh();
        setTimeout(() => router.push("/dashboard"), 700);
      } catch (e: any) {
        if (cancelled) return;
        setStatus("error");
        setMessage(e?.message ?? "Something went wrong.");
      }
    }

    sync();

    return () => {
      cancelled = true;
    };
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {status === "success"
            ? "All set!"
            : status === "error"
            ? "Oops"
            : "Just a moment…"}
        </h1>

        <p className="text-gray-700">{message || "Preparing..."}</p>

        {status === "error" && (
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => router.push("/upgrade")}
              className="rounded-xl bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700"
            >
              Back to Upgrade
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl border-2 border-purple-200 px-4 py-2 font-bold text-purple-700 hover:bg-purple-50"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
