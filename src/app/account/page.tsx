"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type MeResponse = {
  role: "FREE" | "PRO";
  stripeStatus: string | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  stripeCancelAtPeriodEnd?: boolean | null;
  stripeCurrentPeriodEnd?: string | null;
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

  const user = session?.user as any;
  const firstName = (user?.name || "User").split(" ")[0];

  const isPro = useMemo(() => {
    const status = (me?.stripeStatus ?? "").toLowerCase();
    return me?.role === "PRO" || status === "active" || status === "trialing";
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

    return `Cancellation scheduled — access ends on ${date.toLocaleDateString()}`;
  }, [me?.stripeCancelAtPeriodEnd, me?.stripeCurrentPeriodEnd]);

  const showCancelBadge = !!me?.stripeCancelAtPeriodEnd;

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a2e2c]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* TOP NAV */}
      <header className="sticky top-0 z-40 border-b border-[#0d3b3a]/10 bg-[#faf6f0]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="group flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0d3b3a] transition group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#f4a261]" fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
              </svg>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-[#0d3b3a]">
              PracticePal
            </span>
          </Link>

          <nav className="hidden items-center gap-1 font-body text-sm md:flex">
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-1.5 font-medium text-[#1a2e2c]/65 transition hover:bg-[#0d3b3a]/5 hover:text-[#0d3b3a]"
            >
              Dashboard
            </Link>
            <Link
              href="/plans"
              className="rounded-md px-3 py-1.5 font-medium text-[#1a2e2c]/65 transition hover:bg-[#0d3b3a]/5 hover:text-[#0d3b3a]"
            >
              Plans
            </Link>
            <Link
              href="/sessions/new"
              className="rounded-md px-3 py-1.5 font-medium text-[#1a2e2c]/65 transition hover:bg-[#0d3b3a]/5 hover:text-[#0d3b3a]"
            >
              Log session
            </Link>
            <Link
              href="/stats"
              className="rounded-md px-3 py-1.5 font-medium text-[#1a2e2c]/65 transition hover:bg-[#0d3b3a]/5 hover:text-[#0d3b3a]"
            >
              Stats
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {!loadingMe && !isPro && (
              <Link
                href="/upgrade"
                className="hidden items-center gap-1.5 rounded-full bg-[#f4a261] px-4 py-1.5 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#f4a261]/85 sm:inline-flex"
              >
                Go Pro
              </Link>
            )}

            <Link
              href="/account"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0d3b3a] font-body text-sm font-semibold text-[#faf6f0] transition hover:scale-105"
            >
              {firstName.charAt(0).toUpperCase()}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* PAGE HERO */}
        <section className="mb-10">
          <p className="font-body text-sm font-medium tracking-wide text-[#0d3b3a]/55">
            Account settings
          </p>

          <div className="mt-2 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-[2.75rem] font-medium leading-[0.95] tracking-tight text-[#0d3b3a] md:text-6xl">
                Your account.
              </h1>
              <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-[#1a2e2c]/70">
                Manage your profile, subscription, billing, and account actions.
              </p>
            </div>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="inline-flex w-fit items-center justify-center rounded-full border border-[#0d3b3a]/15 bg-white/60 px-6 py-3 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#0d3b3a]/5"
            >
              Logout
            </button>
          </div>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-body text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-2">
          {/* PROFILE */}
          <article className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6 md:p-8">
            <div className="mb-7 flex items-start justify-between gap-4 border-b border-[#0d3b3a]/8 pb-6">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                  Profile
                </p>
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
                  Personal details
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d3b3a]/8 text-[#0d3b3a]">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-5">
              {[
                ["Name", user?.name || "Not set"],
                ["Email", user?.email || "Not set"],
                ["User ID", user?.id || "Not available"],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-[#0d3b3a]/8 pb-5 last:border-b-0 last:pb-0">
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                    {label}
                  </p>
                  <p
                    className={`mt-2 text-[#0d3b3a] ${
                      label === "User ID"
                        ? "break-all font-mono text-sm"
                        : "font-display text-2xl font-medium tracking-tight"
                    }`}
                  >
                    {value}
                  </p>
                </div>
              ))}

              <div className="pt-1">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                  Account type
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-4 py-2 font-body text-sm font-semibold ${
                      loadingMe
                        ? "bg-[#0d3b3a]/8 text-[#0d3b3a]"
                        : isPro
                          ? "bg-[#f4a261] text-[#0d3b3a]"
                          : "bg-[#0d3b3a] text-[#faf6f0]"
                    }`}
                  >
                    {loadingMe ? "Loading..." : isPro ? "PRO" : "FREE"}
                  </span>

                  {!loadingMe && showCancelBadge && (
                    <span className="inline-flex rounded-full border border-[#f4a261]/35 bg-[#f4a261]/15 px-3 py-1 font-body text-xs font-semibold text-[#8b4c16]">
                      Cancel scheduled
                    </span>
                  )}
                </div>

                {!loadingMe && prettyStatus && (
                  <p className="mt-3 font-body text-sm text-[#1a2e2c]/65">
                    Subscription status:{" "}
                    <span className="font-semibold capitalize text-[#0d3b3a]">
                      {prettyStatus}
                    </span>
                  </p>
                )}

                {!loadingMe && cancelInfo && (
                  <p className="mt-2 font-body text-sm font-semibold text-[#8b4c16]">
                    {cancelInfo}
                  </p>
                )}
              </div>
            </div>
          </article>

          {/* SUBSCRIPTION */}
          <article className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6 md:p-8">
            <div className="mb-7 flex items-start justify-between gap-4 border-b border-[#0d3b3a]/8 pb-6">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                  Subscription
                </p>
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
                  Billing plan
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4a261]/20 text-[#0d3b3a]">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <p className="font-body text-sm leading-relaxed text-[#1a2e2c]/70">
              You are currently on{" "}
              <span className="font-semibold text-[#0d3b3a]">
                {loadingMe ? "..." : isPro ? "PRO" : "FREE"}
              </span>
              .
            </p>

            {!loadingMe && cancelInfo && (
              <p className="mt-3 font-body text-sm font-semibold text-[#8b4c16]">
                {cancelInfo}
              </p>
            )}

            {!loadingMe && !isPro && (
              <div className="mt-6 rounded-3xl bg-[#0d3b3a] p-6 text-[#faf6f0]">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#c9d8c5]/80">
                  Upgrade to Pro
                </p>

                <h3 className="mt-3 font-display text-3xl font-medium tracking-tight">
                  More insight for your practice.
                </h3>

                <ul className="mt-5 space-y-3 font-body text-sm leading-relaxed text-[#faf6f0]/75">
                  <li>Advanced analytics</li>
                  <li>Unlimited history</li>
                  <li>Custom routines</li>
                </ul>

                <button
                  type="button"
                  onClick={() => router.push("/upgrade")}
                  className="mt-6 w-full rounded-full bg-[#f4a261] px-5 py-3 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#f4a261]/85"
                >
                  Upgrade to Pro — $9/month
                </button>
              </div>
            )}

            {!loadingMe && isPro && (
              <div className="mt-6 rounded-3xl border border-[#0d3b3a]/8 bg-[#faf6f0]/70 p-6">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                  Manage membership
                </p>

                <h3 className="mt-3 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
                  Pro is active.
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-[#1a2e2c]/70">
                  Manage billing details or cancel your subscription in Stripe. If you cancel,
                  you keep access until the end of the billing period.
                </p>

                <button
                  type="button"
                  onClick={onManageBilling}
                  disabled={billingLoading}
                  className="mt-6 w-full rounded-full bg-[#0d3b3a] px-5 py-3 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {billingLoading ? "Opening billing..." : "Manage billing / Cancel membership"}
                </button>
              </div>
            )}
          </article>

          {/* ACCOUNT ACTIONS */}
          <article className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6 md:p-8 lg:col-span-2">
            <div className="mb-7 border-b border-[#0d3b3a]/8 pb-6">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                Account actions
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
                Security and access
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="rounded-3xl border border-[#0d3b3a]/8 bg-[#faf6f0]/70 p-6">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                  Sign out
                </p>

                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-[#0d3b3a]">
                  End this session.
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-[#1a2e2c]/65">
                  You can sign back in any time using your account login method.
                </p>

                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  className="mt-6 w-full rounded-full border border-[#0d3b3a]/15 bg-white/70 px-5 py-3 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#0d3b3a]/5"
                >
                  Logout
                </button>
              </div>

              <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-red-700/70">
                  Danger zone
                </p>

                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-red-900">
                  Delete account permanently.
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-red-700">
                  This will permanently delete your account. This action cannot be undone.
                </p>

                <input
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder='Type "delete" to confirm'
                  className="mt-5 w-full rounded-2xl border border-red-200 bg-white px-4 py-3 font-body text-sm text-red-900 outline-none transition placeholder:text-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                />

                <button
                  type="button"
                  onClick={onDeleteAccount}
                  disabled={deleting}
                  className="mt-3 w-full rounded-full bg-red-600 px-5 py-3 font-body text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete account permanently"}
                </button>
              </div>
            </div>
          </article>
        </section>
      </main>

      <footer className="mt-12 border-t border-[#0d3b3a]/10 bg-[#faf6f0]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
          <p className="font-body text-xs text-[#1a2e2c]/50">
            PracticePal · Built by Julie Anne Cantillep · 2026
          </p>

          <div className="flex gap-5 font-body text-xs text-[#1a2e2c]/50">
            <Link href="/support/help-center" className="transition hover:text-[#0d3b3a]">
              Help
            </Link>
            <Link href="/legal/privacy" className="transition hover:text-[#0d3b3a]">
              Privacy
            </Link>
            <Link href="/legal/terms" className="transition hover:text-[#0d3b3a]">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}