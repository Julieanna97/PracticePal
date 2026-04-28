"use client";

import Link from "next/link";
import { useCallback, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function UpgradePage() {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/stripe/checkout-session", { method: "POST" });
    const data = await res.json();

    if (!res.ok) throw new Error(data?.error ?? "Failed to start checkout");
    return data.clientSecret as string;
  }, []);

  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

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
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-[#f4a261]"
                fill="currentColor"
              >
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

          <Link
            href="/account"
            className="rounded-full border border-[#0d3b3a]/15 bg-white/60 px-4 py-2 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#0d3b3a]/5"
          >
            Account
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* HERO */}
        <section className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Link
              href="/dashboard"
              className="font-body text-sm font-semibold text-[#0d3b3a] transition hover:text-[#f4a261]"
            >
              ← Back to dashboard
            </Link>

            <p className="mt-8 font-body text-sm font-medium tracking-wide text-[#0d3b3a]/55">
              Premium Pro Access
            </p>

            <h1 className="mt-2 max-w-3xl font-display text-[2.75rem] font-medium leading-[0.95] tracking-tight text-[#0d3b3a] md:text-6xl">
              Unlock deeper practice insights.
            </h1>

            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-[#1a2e2c]/70">
              Level up your practice routine with advanced analytics, unlimited
              history, and custom planning tools designed for serious musicians.
            </p>
          </div>

          <div className="rounded-3xl bg-[#0d3b3a] p-6 text-[#faf6f0] md:p-8">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#c9d8c5]/80">
              Pro Plan
            </p>

            <div className="mt-4 flex items-end gap-2">
              <span className="font-display text-7xl font-medium leading-none tracking-tight">
                $9
              </span>
              <span className="mb-2 font-body text-sm font-medium text-[#c9d8c5]/80">
                / month
              </span>
            </div>

            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-[#faf6f0]/72">
              Everything you need to master your instrument with more clarity,
              more history, and better progress tracking.
            </p>
          </div>
        </section>

        {/* FEATURE CARDS */}
        <section className="mb-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Advanced analytics",
              text: "See detailed trends across your sessions, goals, and routines.",
            },
            {
              title: "Unlimited history",
              text: "Keep long-term practice records without losing older progress.",
            },
            {
              title: "Custom routines",
              text: "Build stronger practice structures around your personal goals.",
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6 transition hover:-translate-y-1 hover:border-[#0d3b3a]/20"
            >
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/45">
                Included
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
                {feature.title}
              </h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#1a2e2c]/65">
                {feature.text}
              </p>
            </article>
          ))}
        </section>

        {/* PLAN DETAILS + CHECKOUT */}
        <section className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
          <aside className="space-y-4">
            <div className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-6">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                What you get
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "Detailed analytics and insights",
                  "Practice breakdown by genre or skill",
                  "Unlimited practice history",
                  "Custom practice routines",
                  "Export your data",
                  "Priority support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-[#faf6f0]/70 p-3"
                  >
                    <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#f4a261] text-xs font-bold text-[#0d3b3a]">
                      ✓
                    </span>
                    <p className="font-body text-sm font-medium leading-relaxed text-[#1a2e2c]/75">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#f4a261] p-6 text-[#0d3b3a]">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/60">
                Flexible
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium tracking-tight">
                Cancel anytime.
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#0d3b3a]/75">
                Manage or cancel your subscription from your account billing
                settings whenever you need.
              </p>
            </div>
          </aside>

          <section className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-5 md:p-7">
            <div className="mb-6 border-b border-[#0d3b3a]/8 pb-6">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
                Checkout
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
                Complete your upgrade.
              </h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#1a2e2c]/60">
                Secure checkout is handled by Stripe.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#0d3b3a]/8 bg-[#faf6f0] p-2">
              <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </section>
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