import Link from "next/link";

export default function UpgradeReturnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl border-2 border-purple-100 bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-extrabold text-gray-900">Payment received 🎉</h1>
          <p className="mt-3 text-gray-700">
            We’re confirming your subscription. If Pro doesn’t show immediately, refresh in a few seconds.
          </p>

          <div className="mt-8 flex gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl bg-purple-600 px-5 py-3 font-bold text-white hover:bg-purple-700"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/account"
              className="rounded-xl border border-gray-200 px-5 py-3 font-bold text-gray-700 hover:bg-gray-50"
            >
              Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
