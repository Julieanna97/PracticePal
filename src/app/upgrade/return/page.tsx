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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Finishing up…</h1>
        <p className="text-gray-600">Syncing your subscription. Please wait.</p>
      </div>
    </div>
  );
}
