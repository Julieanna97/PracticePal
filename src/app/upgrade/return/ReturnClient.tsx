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
      setMessage("Syncing your subscriptionâ€¦");

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
        setMessage("âœ… Subscription synced! Redirecting to dashboardâ€¦");

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 relative overflow-hidden p-6">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-fuchsia-300 to-purple-300 rounded-full blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute -bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-indigo-300 to-sky-300 rounded-full blur-3xl opacity-15 animate-bounce"></div>
      </div>

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl border-2 border-purple-100 p-8 max-w-md w-full text-center">
        {/* Status Icon */}
        <div className="mb-4 flex justify-center">
          {status === "success" ? (
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ) : status === "error" ? (
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: "3s" }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {status === "success"
            ? "All set! 🎉"
            : status === "error"
            ? "Something Went Wrong"
            : "Processing..."}
        </h1>

        <p className="text-gray-700 mb-6">{message || "Preparing..."}</p>

        {status === "error" && (
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => router.push("/upgrade")}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 font-bold text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Back to Upgrade
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl border-2 border-purple-200 px-4 py-3 font-bold text-purple-700 hover:bg-purple-50 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

