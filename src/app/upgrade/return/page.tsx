import { Suspense } from "react";
import ReturnClient from "./ReturnClient";

export const dynamic = "force-dynamic";

export default function UpgradeReturnPage() {
  return (
    <Suspense fallback={<ReturnLoading />}>
      <ReturnClient />
    </Suspense>
  );
}

function ReturnLoading() {
  return (
    <div className="app-canvas flex min-h-screen items-center justify-center px-6">
      <div className="soft-card w-full max-w-md rounded-[2rem] p-8 text-center">
        <div className="mx-auto mb-5 h-12 w-12 animate-pulse rounded-full bg-[#0d3b3a]/20" />
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-[#0d3b3a]">Finishing up...</h1>
        <p className="text-[#1a2e2c]/70">Syncing your subscription. Please wait.</p>
      </div>
    </div>
  );
}

