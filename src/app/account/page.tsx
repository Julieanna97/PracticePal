"use client";

import { useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type MeResponse = {
  role: "FREE" | "PRO";
  stripeStatus: string | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;

  // optional if you add these later in /api/me
  stripeCancelAtPeriodEnd?: boolean | null;
  stripeCurrentPeriodEnd?: string | null; // ISO string
};

export default function AccountPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [me, setMe] = useState<MeResponse | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);

  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState("");

  const [billingLoading, setBillingLoading] = useState(false);
  const [billingMsg, setBillingMsg] = useState<string | null>(null);

  const user = session?.user as any;

  // ✅ More robust isPro:
  // - trusts DB role
  // - OR trusts Stripe status (active/trialing) even if role hasn't updated yet
  const isPro = useMemo(() => {
    const status = (me?.stripeStatus ?? "").toLowerCase();
    const proByStatus = status === "active" || status === "trialing";
    return me?.role === "PRO" || proByStatus;
  }, [me]);

  async function loadMe() {
    setLoadingMe(true);
    try {
      const res = await fetch("/api/me", { cache: "no-store" });
      const data = await res.json().catch(() => null);
      if (res.ok) setMe(data);
    } finally {
      setLoadingMe(false);
    }
  }

  useEffect(() => {
    loadMe();
  }, []);

  async function onManageBilling() {
    setError(null);
    setBillingMsg(null);
    setBillingLoading(true);

    try {
      const res = await fetch("/api/stripe/customer-portal", { method: "POST" });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error ?? "Failed to open billing portal.");
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        setError("Billing portal URL missing.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBillingLoading(false);
    }
  }

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
      await signOut({ redirect: false });
      router.push("/auth/login");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const prettyStatus = useMemo(() => {
    if (!me?.stripeStatus) return null;
    return me.stripeStatus.replaceAll("_", " ");
  }, [me?.stripeStatus]);

  const cancelInfo = useMemo(() => {
    if (!me?.stripeCancelAtPeriodEnd || !me?.stripeCurrentPeriodEnd) return null;
    const date = new Date(me.stripeCurrentPeriodEnd);
    if (Number.isNaN(date.getTime())) return null;
    return `Cancellation scheduled — access ends on ${date.toLocaleDateString()}.`;
  }, [me?.stripeCancelAtPeriodEnd, me?.stripeCurrentPeriodEnd]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900">
            Account Settings
          </h1>
          <p className="mt-2 text-gray-600">Manage your profile, settings, and account actions</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            </div>

            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-100">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Name</label>
                <p className="mt-1 text-lg font-medium text-gray-900">{user?.name || "Not set"}</p>
              </div>

              <div className="pb-4 border-b border-gray-100">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                <p className="mt-1 text-lg font-medium text-gray-900">{user?.email}</p>
              </div>

              <div className="pb-4 border-b border-gray-100">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">User ID</label>
                <p className="mt-1 text-sm font-mono text-gray-600 break-all">{user?.id}</p>
              </div>

              <div className="pt-2">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Account Type</label>

                <div
                  className={`mt-2 inline-flex items-center px-4 py-2 rounded-full font-bold text-sm shadow-lg ${
                    loadingMe
                      ? "bg-gray-200 text-gray-700"
                      : isPro
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                      : "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                  }`}
                >
                  {loadingMe ? "..." : isPro ? "PRO" : "FREE"}
                </div>

                {!loadingMe && prettyStatus && (
                  <p className="mt-2 text-sm text-gray-600">
                    Subscription status: <span className="font-semibold">{prettyStatus}</span>
                  </p>
                )}

                {!loadingMe && cancelInfo && (
                  <p className="mt-2 text-sm font-semibold text-amber-700">{cancelInfo}</p>
                )}
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Subscription</h2>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                You're currently on{" "}
                <span className="font-bold text-purple-700">{loadingMe ? "..." : isPro ? "PRO" : "FREE"}</span>
              </p>
            </div>

            {/* FREE -> upgrade */}
            {!loadingMe && !isPro && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Upgrade to Pro</h3>
                <ul className="space-y-2 text-sm text-gray-700 mb-4">
                  <li className="flex items-center">✅ Advanced analytics</li>
                  <li className="flex items-center">✅ Unlimited history</li>
                  <li className="flex items-center">✅ Custom routines</li>
                </ul>
                <button
                  onClick={() => router.push("/upgrade")}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl px-4 py-3 font-bold hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Upgrade to Pro - $9/month
                </button>
              </div>
            )}

            {/* PRO -> manage in Stripe portal */}
            {!loadingMe && isPro && (
              <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
                <h3 className="font-bold text-emerald-900 mb-2">Manage membership</h3>
                <p className="text-sm text-emerald-800 mb-4">
                  Manage your billing details or cancel your subscription. If you cancel, you keep access until the end of
                  the billing period.
                </p>

                {billingMsg && (
                  <p className="text-sm font-semibold text-emerald-700 mb-3">{billingMsg}</p>
                )}

                <button
                  onClick={onManageBilling}
                  disabled={billingLoading}
                  className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {billingLoading ? "Opening billing..." : "Manage billing / Cancel membership"}
                </button>
              </div>
            )}

            {error && <div className="mt-4 text-sm text-red-700 font-semibold">{error}</div>}
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-8 hover:shadow-2xl transition-shadow lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Actions</h2>

            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="w-full flex items-center justify-center space-x-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 hover:border-purple-200 transition-all mb-6"
            >
              <span>Logout</span>
            </button>

            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
              <h3 className="font-bold text-red-800 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-700 mb-4">
                This will permanently delete your account. This action cannot be undone.
              </p>

              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder='Type "delete" to confirm'
                className="w-full rounded-xl border-2 border-red-200 bg-white px-4 py-3 text-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all mb-3"
              />

              <button
                onClick={onDeleteAccount}
                disabled={deleting}
                className="w-full rounded-xl bg-red-600 px-4 py-3 font-bold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Account Permanently"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
