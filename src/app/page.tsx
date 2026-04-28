import Link from "next/link";
import LandingFooter from "@/components/LandingFooter";
import { PracticePalLogo } from "@/components/PracticePalLogo";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a2e2c]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <header className="sticky top-0 z-30 border-b border-[#0d3b3a]/10 bg-[#faf6f0]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <PracticePalLogo size="md" />

          <nav className="hidden items-center gap-8 font-body text-sm font-medium text-[#1a2e2c]/70 md:flex">
            <a href="#features" className="transition hover:text-[#0d3b3a]">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-[#0d3b3a]">
              How it works
            </a>
            <a href="#pricing" className="transition hover:text-[#0d3b3a]">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-full border border-[#0d3b3a]/10 bg-white/70 px-4 py-2 text-sm font-semibold text-[#0d3b3a] transition hover:bg-white"
            >
              Log in
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-[#0d3b3a] px-4 py-2 text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
            >
              Start free
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0d3b3a]/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#1a2e2c]/70 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#f4a261]" />
              Practice planning that feels calm, not busy
            </div>

            <h1 className="font-display text-5xl font-semibold tracking-tight text-[#0d3b3a] sm:text-6xl lg:text-7xl">
              Stay consistent with a practice space built for progress.
            </h1>

            <p className="mt-6 max-w-xl font-body text-lg leading-8 text-[#1a2e2c]/70 sm:text-xl">
              Plan sessions, track streaks, review stats, and keep your goals visible every time you open
              PracticePal.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-full bg-[#0d3b3a] px-6 py-3.5 font-body text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
              >
                Start free
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-[#0d3b3a]/10 bg-white/70 px-6 py-3.5 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-white"
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
                <div key={value} className="rounded-3xl border border-[#0d3b3a]/8 bg-white/70 p-5 shadow-sm">
                  <div className="font-display text-2xl font-semibold text-[#0d3b3a]">{value}</div>
                  <div className="mt-1 font-body text-sm text-[#1a2e2c]/55">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#f4a261]/20 via-white to-[#c9d8c5]/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#0d3b3a]/10 bg-white/80 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-[#0d3b3a] p-6 text-[#faf6f0]">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-[#c9d8c5]/80">
                  Today’s focus
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                  45 minutes on piano scales.
                </h2>
                <p className="mt-3 max-w-sm font-body text-sm leading-6 text-[#faf6f0]/72">
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
                      <div className="font-body text-xs uppercase tracking-[0.18em] text-[#faf6f0]/55">
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
                  <div key={title} className="rounded-2xl border border-[#0d3b3a]/8 bg-[#faf6f0] p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0d3b3a] text-sm font-semibold text-[#faf6f0]">
                      {index + 1}
                    </div>
                    <h3 className="mt-3 font-body text-sm font-semibold text-[#0d3b3a]">{title}</h3>
                    <p className="mt-1 font-body text-sm leading-6 text-[#1a2e2c]/65">{copy}</p>
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
              <article key={title} className="rounded-[2rem] border border-[#0d3b3a]/8 bg-white/75 p-7 shadow-sm">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-[#0d3b3a]">{title}</h2>
                <p className="mt-3 font-body text-sm leading-7 text-[#1a2e2c]/65">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 rounded-[2rem] border border-[#0d3b3a]/8 bg-white/75 p-8 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-[#1a2e2c]/55">
                How it works
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#0d3b3a]">
                A simple flow that keeps you moving.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["1", "Set a plan for the week."],
                ["2", "Log each practice session."],
                ["3", "Check stats and adjust."],
              ].map(([step, copy]) => (
                <div key={step} className="rounded-3xl border border-[#0d3b3a]/8 bg-[#faf6f0] p-5">
                  <div className="font-display text-3xl font-semibold text-[#0d3b3a]">{step}</div>
                  <p className="mt-3 font-body text-sm leading-6 text-[#1a2e2c]/65">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="rounded-[2rem] bg-[#0d3b3a] px-8 py-10 text-[#faf6f0] shadow-[0_30px_90px_rgba(15,23,42,0.18)] lg:px-12 lg:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-[#c9d8c5]/80">
                  Get started
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
                  Build a practice habit you can actually keep.
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center rounded-full bg-[#f4a261] px-6 py-3.5 font-body text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#f4a261]/90"
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