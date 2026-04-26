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
   <div className="app-canvas flex min-h-screen items-center justify-center">
      <div className="soft-card w-full max-w-md rounded-3xl p-8 text-center">
      <h1 className="mb-2 text-2xl font-bold text-[#0d3b3a]">Finishing up...</h1>
      <p className="text-[#1a2e2c]/70">Syncing your subscription. Please wait.</p>
      </div>
    </div>
  );
}

