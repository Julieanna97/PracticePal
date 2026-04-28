import Link from "next/link";
import LandingFooter from "@/components/LandingFooter";
import { PracticePalLogo } from "@/components/PracticePalLogo";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4f7fb_0%,_#eef3f8_38%,_#e7edf4_100%)] text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <header className="sticky top-0 z-30 border-b border-slate-900/5 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <PracticePalLogo size="md" />

          <nav className="hidden items-center gap-8 font-body text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-slate-900">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-slate-900">
              How it works
            </a>
            <a href="#pricing" className="transition hover:text-slate-900">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-full border border-slate-900/10 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900/20 hover:bg-white"
            >
              Log in
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Start free
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/75 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Practice planning that feels calm, not busy
            </div>

            <h1 className="font-display text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Stay consistent with a practice space built for progress.
            </h1>

            <p className="mt-6 max-w-xl font-body text-lg leading-8 text-slate-600 sm:text-xl">
              Plan sessions, track streaks, review stats, and keep your goals visible every time you open
              PracticePal.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Start free
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white/80 px-6 py-3.5 font-body text-sm font-semibold text-slate-700 transition hover:bg-white"
              >
                View dashboard
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ["12 min", "average setup time"],
                ["1 place", "for goals and sessions"],
                ["Clear", "weekly progress tracking"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-3xl border border-slate-900/8 bg-white/70 p-5 shadow-sm">
                  <div className="font-display text-2xl font-semibold text-slate-950">{value}</div>
                  <div className="mt-1 font-body text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-sky-200/60 via-white to-emerald-100/50 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Today’s focus
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                  45 minutes on piano scales.
                </h2>
                <p className="mt-3 max-w-sm font-body text-sm leading-6 text-slate-300">
                  A simple session plan keeps your next rep obvious, your streak visible, and your goal in
                  view.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Streak", "18 days"],
                    ["Weekly target", "240 min"],
                    ["Completed", "172 min"],
                    ["Next up", "Sight reading"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="font-body text-xs uppercase tracking-[0.18em] text-slate-400">
                        {label}
                      </div>
                      <div className="mt-2 font-display text-2xl font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-3">
                {[
                  ["Plan", "Set weekly targets and session lengths."],
                  ["Log", "Capture practice in under a minute."],
                  ["Review", "See what is working and repeat it."],
                ].map(([title, copy], index) => (
                  <div key={title} className="rounded-2xl border border-slate-900/8 bg-slate-50 p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <h3 className="mt-3 font-body text-sm font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 font-body text-sm leading-6 text-slate-600">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Weekly clarity", "Keep your practice goals visible so every session starts with direction."],
              ["Fast logging", "Record what you worked on without slowing down the session itself."],
              ["Progress you can read", "Charts and summaries show momentum without clutter."],
            ].map(([title, copy]) => (
              <article key={title} className="rounded-[2rem] border border-slate-900/8 bg-white/80 p-7 shadow-sm">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
                <p className="mt-3 font-body text-sm leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 rounded-[2rem] border border-slate-900/8 bg-white/80 p-8 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                How it works
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950">
                A simple flow that keeps you moving.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["1", "Set a plan for the week."],
                ["2", "Log each practice session."],
                ["3", "Check stats and adjust."],
              ].map(([step, copy]) => (
                <div key={step} className="rounded-3xl border border-slate-900/8 bg-slate-50 p-5">
                  <div className="font-display text-3xl font-semibold text-slate-950">{step}</div>
                  <p className="mt-3 font-body text-sm leading-6 text-slate-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] lg:px-12 lg:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Get started
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
                  Build a practice habit you can actually keep.
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-body text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Create account
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}