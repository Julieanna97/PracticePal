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
      setMessage("Syncing your subscription...");

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
        setMessage("Subscription synced! Redirecting to dashboard...");

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
    <div className="app-canvas relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-[#f4a261]/18 blur-3xl"></div>
        <div className="absolute -bottom-20 right-20 h-96 w-96 rounded-full bg-[#c9d8c5]/28 blur-3xl"></div>
      </div>

      <div className="soft-card relative z-10 w-full max-w-md rounded-[2rem] p-8 text-center">
        {/* Status Icon */}
        <div className="mb-4 flex justify-center">
          {status === "success" ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ) : status === "error" ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#0d3b3a]/20 border-t-[#0d3b3a] animate-spin" style={{ animationDuration: "1s" }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}
        </div>

        <h1 className="mb-2 text-3xl font-bold text-[#0d3b3a]">
          {status === "success"
            ? "All set!"
            : status === "error"
            ? "Something Went Wrong"
            : "Processing..."}
        </h1>

          <p className="mb-6 text-[#1a2e2c]/75">{message || "Preparing..."}</p>

        {status === "error" && (
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => router.push("/upgrade")}
              className="rounded-full bg-[#0d3b3a] px-4 py-3 font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
            >
              Back to Upgrade
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-full border border-[#0d3b3a]/20 px-4 py-3 font-semibold text-[#0d3b3a] transition hover:bg-[#0d3b3a]/5"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

