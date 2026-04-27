import Link from "next/link";

const fontLink = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap";

const metrics = [
  { label: "Product Type", value: "SaaS" },
  { label: "Role",         value: "Solo Build" },
  { label: "Stack Size",   value: "6 Tools" },
  { label: "Focus",        value: "Musicians" },
];

const wins = [
  {
    title: "Built end-to-end product flow",
    text: "Designed and shipped the journey from sign-up to practice planning, session logging, analytics, and paid subscription access — solo.",
  },
  {
    title: "Modeled the data myself",
    text: "Created MongoDB collections for users, plans, sessions, and subscription state, then connected them through NextAuth and a typed API layer.",
  },
  {
    title: "Integrated real billing logic",
    text: "Wired Stripe checkout, customer portal, and webhook syncing so subscription state actually drives access — not just a dummy paywall.",
  },
  {
    title: "Designed every screen",
    text: "Crafted dashboard, onboarding, plan editor, and progress views in Tailwind that hold up across breakpoints without an off-the-shelf UI kit.",
  },
];

const features = [
  {
    eyebrow: "01",
    title: "Authentication",
    detail:
      "NextAuth-powered sign-up and sign-in flows, with protected routes and per-user data scoping baked into the App Router.",
  },
  {
    eyebrow: "02",
    title: "Practice Planning",
    detail:
      "Users build structured practice plans with goals and focus areas, edit them over time, and reuse them across sessions.",
  },
  {
    eyebrow: "03",
    title: "Session Logging",
    detail:
      "Sessions capture duration, notes, focus, and mood — feeding into the dashboard for streaks and weekly progress views.",
  },
  {
    eyebrow: "04",
    title: "Subscriptions",
    detail:
      "Stripe checkout, customer portal, and webhook sync keep account state in lockstep with payment events.",
  },
];

const process = [
  "Identify musician pain points",
  "Design the practice flow",
  "Build auth and data models",
  "Connect dashboard experience",
  "Add subscription logic",
];

const sections = [
  {
    number: "01",
    title: "Started with a real problem",
    text: "Built around a concrete pain point — musicians struggling to practice consistently. I focused on user flow and progression rather than scope creep, which kept the product useful instead of bloated.",
  },
  {
    number: "02",
    title: "Built across the whole stack",
    text: "Connected frontend screens to backend logic, auth, database models, and subscription handling. Owning every layer forced me to think about how data flows — not just how a component renders.",
  },
  {
    number: "03",
    title: "Wired in real business logic",
    text: "Treated Stripe billing, account state, and protected routes as core features. Shipping a paywall that actually controls access taught me how product features depend on backend consistency.",
  },
];

const reflections = [
  {
    label: "What worked",
    text: "Treating PracticePal as a real product, not a class assignment, changed how I made decisions. Every feature had to earn its place — easier to cut than to ship.",
  },
  {
    label: "What I’d do differently",
    text: "Next time I’d write the data model on paper before any code. I refactored MongoDB schemas twice mid-build because I underestimated how plans, sessions, and billing would relate.",
  },
  {
    label: "Biggest takeaway",
    text: "Owning the full SaaS loop — auth, data, billing, dashboard — gave me an intuition for product flow you can’t get from tutorials or single-feature exercises.",
  },
];

const stack = ["Next.js", "React", "MongoDB", "NextAuth", "Stripe", "Tailwind CSS"];

export default function PracticePalCaseStudyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f0ece4] text-[#1a0808]">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href={fontLink} />
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#1a0808]/10 bg-[#f0ece4]/90 px-6 py-5 backdrop-blur-xl md:px-12" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        <Link
          href="/"
          className="uppercase transition hover:text-[#e8613a]"
          style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.12em' }}
        >
          Julie Anne Cantillep
        </Link>

        <div className="flex items-center gap-11">
          <Link
            href="/auth/login?callbackUrl=%2Fdashboard"
            className="uppercase transition hover:text-[#e8613a]"
            style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.12em' }}
          >
            Demo
          </Link>
          <Link
            href="https://github.com/Julieanna97/PracticePal"
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase transition hover:text-[#e8613a]"
            style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.12em' }}
          >
            GitHub
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-6 py-16 md:px-12 md:py-24">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#f5a0c8]/30 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10rem] top-24 h-[32rem] w-[32rem] rounded-full bg-[#e8613a]/20 blur-3xl" />

        <div className="relative grid items-center gap-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <Link
              href="/"
              className="mb-12 inline-block text-xs font-black uppercase tracking-[0.18em] text-[#7a5050] transition hover:text-[#e8613a]"
            >
              ← Back to Portfolio
            </Link>

            <p className="mb-6 text-xs font-black uppercase tracking-[0.26em] text-[#e8613a]">
              Solo Product · 2025
            </p>

            {/* FIXED: smaller clamp so the title fits inside the column */}
            <h1 className="max-w-4xl text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]">
              Practice<span className="text-[#f5a0c8]">Pal</span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
              I built PracticePal solo from idea to paid subscription — auth,
              data models, dashboard, and Stripe billing. It’s the project
              where I learned how a SaaS actually fits together, not just how
              individual features render.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/auth/login?callbackUrl=%2Fdashboard"
                className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
              >
                Try the Demo
              </Link>

              <Link
                href="https://github.com/Julieanna97/PracticePal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
              >
                View on GitHub
              </Link>
            </div>
          </div>

          {/* MOCK APP PREVIEW */}
          <div className="group relative motion-safe:animate-[floatScreen_6s_ease-in-out_infinite]">
            <style>{`
              @keyframes floatScreen {
                0%, 100% { transform: translateY(0) rotate(-1deg); }
                50% { transform: translateY(-14px) rotate(1deg); }
              }
              @keyframes pulseDot {
                0%, 100% { opacity: 0.55; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.25); }
              }
              @keyframes barGrow {
                0%, 100% { transform: scaleY(0.78); opacity: 0.72; }
                50% { transform: scaleY(1); opacity: 1; }
              }
              @keyframes planGlow {
                0%, 100% { box-shadow: 0 0 0 rgba(245,160,200,0); }
                50% { box-shadow: 0 0 34px rgba(245,160,200,0.28); }
              }
              @keyframes scanProgress {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(260%); }
              }
            `}</style>

            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#f5a0c8]/30 to-[#e8613a]/20 blur-2xl transition duration-500 group-hover:from-[#f5a0c8]/45 group-hover:to-[#e8613a]/30" />

            <div className="relative rounded-[2rem] border border-[#1a0808]/15 bg-[#1a0808] p-4 shadow-2xl shadow-[#1a0808]/25 transition duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#f5a0c8] transition group-hover:scale-125" />
                <span className="h-3 w-3 rounded-full bg-[#e8613a] transition group-hover:scale-125" />
                <span className="h-3 w-3 rounded-full bg-[#f0ece4]/50 transition group-hover:scale-125" />
              </div>

              <div className="rounded-[1.45rem] bg-[#f0ece4] p-5">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e8613a]">
                      Dashboard
                    </p>
                    <h2 className="mt-2 text-3xl font-black uppercase leading-none">
                      Today’s Practice
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="rounded-full bg-[#f5a0c8] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] transition duration-300 hover:-translate-y-1 hover:bg-[#e8613a] hover:text-[#f0ece4] motion-safe:animate-[planGlow_2.4s_ease-in-out_infinite]"
                  >
                    Pro Plan
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <button
                    type="button"
                    className="group/card rounded-3xl border border-[#1a0808]/10 bg-white/50 p-5 text-left transition duration-300 hover:-translate-y-2 hover:bg-[#1a0808] hover:text-[#f0ece4]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a5050] transition group-hover/card:text-[#f5a0c8]">
                        Focus
                      </p>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#e8613a] motion-safe:animate-[pulseDot_1.6s_ease-in-out_infinite]" />
                    </div>
                    <p className="mt-10 text-3xl font-black uppercase leading-none">
                      Scales
                    </p>
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#1a0808]/10 group-hover/card:bg-[#f0ece4]/20">
                      <span className="block h-full w-2/3 rounded-full bg-[#e8613a] transition group-hover/card:w-full" />
                    </div>
                  </button>

                  <button
                    type="button"
                    className="group/card rounded-3xl border border-[#1a0808]/10 bg-[#f5a0c8] p-5 text-left transition duration-300 hover:-translate-y-3 hover:bg-[#e8613a] hover:text-[#f0ece4]"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1a0808]/60 transition group-hover/card:text-[#f0ece4]/70">
                      Streak
                    </p>
                    <p className="mt-10 text-5xl font-black uppercase leading-none transition group-hover/card:scale-110">
                      12
                    </p>
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] opacity-60">
                      Days in a row
                    </p>
                  </button>

                  <button
                    type="button"
                    className="group/card rounded-3xl border border-[#1a0808]/10 bg-white/50 p-5 text-left transition duration-300 hover:-translate-y-2 hover:bg-[#1a0808] hover:text-[#f0ece4]"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a5050] transition group-hover/card:text-[#f5a0c8]">
                      Time
                    </p>
                    <p className="mt-10 text-3xl font-black uppercase leading-none">
                      45m
                    </p>
                    <div className="mt-5 flex gap-1.5">
                      <span className="h-2 flex-1 rounded-full bg-[#f5a0c8]" />
                      <span className="h-2 flex-1 rounded-full bg-[#e8613a]" />
                      <span className="h-2 flex-1 rounded-full bg-[#1a0808]/20 group-hover/card:bg-[#f0ece4]/30" />
                    </div>
                  </button>
                </div>

                <button
                  type="button"
                  className="group/chart mt-5 w-full rounded-3xl border border-[#1a0808]/10 bg-[#1a0808] p-5 text-left text-[#f0ece4] transition duration-300 hover:-translate-y-2 hover:bg-[#2e0e0e]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f5a0c8]">
                      Weekly Progress
                    </p>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f0ece4]/45 transition group-hover/chart:text-[#e8613a]">
                      Analytics
                    </p>
                  </div>

                  <div className="relative flex h-36 items-end gap-3 overflow-hidden rounded-2xl">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f5a0c8]/18 to-transparent opacity-0 transition group-hover/chart:opacity-100 motion-safe:group-hover/chart:animate-[scanProgress_1.4s_linear_infinite]" />

                    {[38, 62, 48, 82, 58, 94, 72].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 origin-bottom rounded-t-2xl bg-gradient-to-t from-[#e8613a] to-[#f5a0c8] transition duration-300 hover:scale-y-110 motion-safe:animate-[barGrow_1.8s_ease-in-out_infinite]"
                        style={{
                          height: `${height}%`,
                          animationDelay: `${index * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#f0ece4]/45">
                    <span className="rounded-full border border-[#f0ece4]/10 py-2 transition group-hover/chart:text-[#f5a0c8]">
                      Plan
                    </span>
                    <span className="rounded-full border border-[#f0ece4]/10 py-2 transition group-hover/chart:text-[#f5a0c8]">
                      Log
                    </span>
                    <span className="rounded-full border border-[#f0ece4]/10 py-2 transition group-hover/chart:text-[#f5a0c8]">
                      Improve
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="grid grid-cols-2 border-y border-[#1a0808]/10 md:grid-cols-4">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="border-b border-r border-[#1a0808]/10 px-6 py-8 md:border-b-0 md:px-12"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7a5050]">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-black uppercase leading-none md:text-4xl">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {/* OVERVIEW */}
      <section className="grid gap-12 px-6 py-20 md:px-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            What I Built
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
            A complete SaaS, owned end-to-end.
          </h2>
        </div>

        <div className="grid gap-4">
          {wins.map((item) => (
            <article
              key={item.title}
              className="group rounded-[1.75rem] border border-[#1a0808]/10 bg-white/30 p-6 transition hover:-translate-y-1 hover:bg-[#f5a0c8]"
            >
              <h3 className="text-2xl font-black uppercase leading-none">
                {item.title}
              </h3>
              <p className="mt-4 text-sm font-medium uppercase leading-8 tracking-[0.06em] text-[#3a1818]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* BREAKDOWN */}
      <section className="relative overflow-hidden bg-[#1a0808] px-6 py-24 text-[#f5a0c8] md:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,160,200,0.12),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(232,97,58,0.12),transparent_35%)]" />

        <div className="relative">
          <p className="mb-10 text-xs font-black uppercase tracking-[0.24em]">
            How It Came Together
          </p>

          <div className="grid gap-5 lg:grid-cols-3">
            {sections.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-[#f5a0c8]/20 bg-[#f5a0c8]/5 p-7 backdrop-blur transition hover:bg-[#f5a0c8]/10"
              >
                <p className="mb-14 text-xs font-black text-[#f5a0c8]/50">
                  {item.number}
                </p>
                <h2 className="text-3xl font-black uppercase leading-tight md:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-6 text-sm font-medium leading-7 text-[#f0ece4]/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24 md:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
              Inside the Product
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
              What ships in PracticePal.
            </h2>
          </div>

          <p className="max-w-3xl self-end text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
            Four core features doing real work — not screen-deep mockups.
            Auth gates the data, plans drive the sessions, sessions feed the
            dashboard, and Stripe controls who sees what.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border border-[#1a0808]/10 bg-[#1a0808] p-7 text-[#f0ece4] transition hover:-translate-y-1 hover:bg-[#2e0e0e]"
            >
              <p className="mb-12 text-xs font-black uppercase tracking-[0.2em] text-[#f5a0c8]/55">
                {feature.eyebrow}
              </p>
              <h3 className="text-4xl font-black uppercase tracking-[-0.03em] text-[#f5a0c8]">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm font-medium leading-8 text-[#f0ece4]/65">
                {feature.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#f5a0c8] px-6 py-24 text-[#1a0808] md:px-12">
        <p className="mb-8 text-xs font-black uppercase tracking-[0.24em]">
          How I Built It
        </p>

        <div className="grid gap-4 md:grid-cols-5">
          {process.map((step, index) => (
            <article
              key={step}
              className="min-h-[230px] rounded-[1.75rem] border border-[#1a0808]/20 bg-[#f0ece4]/45 p-6 transition hover:bg-[#f0ece4]"
            >
              <p className="mb-14 text-xs font-black text-[#1a0808]/45">
                0{index + 1}
              </p>
              <h3 className="text-2xl font-black uppercase leading-none">
                {step}
              </h3>
            </article>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="grid gap-12 px-6 py-24 md:px-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            Architecture
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
            How the pieces connect.
          </h2>
          <p className="mt-8 max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818]">
            User experience depends on stable backend logic. PracticePal taught
            me how database structure, protected routes, and subscription state
            all need to agree — or the dashboard lies to the user.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#1a0808]/10 bg-white/35 p-6">
          {[
            ["User",      "Signs in with NextAuth, account scoped per user"],
            ["App",       "Creates plans, logs sessions, viewable from dashboard"],
            ["Database",  "MongoDB collections for users, plans, sessions, billing"],
            ["Stripe",    "Drives subscription state via checkout + webhooks"],
            ["Dashboard", "Surfaces streaks, weekly progress, and active plan"],
          ].map(([label, text], index) => (
            <div
              key={label}
              className="grid gap-4 border-b border-[#1a0808]/10 py-5 last:border-b-0 md:grid-cols-[120px_1fr]"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e8613a]">
                0{index + 1} · {label}
              </p>
              <p className="text-sm font-medium uppercase leading-7 tracking-[0.06em] text-[#3a1818]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* REFLECTION */}
      <section className="bg-[#2e0e0e] px-6 py-24 text-[#f0ece4] md:px-12">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#f5a0c8]">
              Reflection
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[#f5a0c8]">
              What this project taught me.
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#f0ece4]/60 md:text-base">
            A case study without reflection is just a feature list. Here’s
            what I’d carry into the next product I build.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reflections.map((item) => (
            <article
              key={item.label}
              className="rounded-[2rem] border border-[#f5a0c8]/20 bg-[#f5a0c8]/5 p-7 transition hover:bg-[#f5a0c8]/10"
            >
              <p className="mb-10 text-xs font-black uppercase tracking-[0.22em] text-[#f5a0c8]">
                {item.label}
              </p>
              <p className="text-sm font-medium leading-8 text-[#f0ece4]/75">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="bg-[#1a0808] px-6 py-20 text-[#f0ece4] md:px-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#f5a0c8]">
              Technical Stack
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
              Built like a real product.
            </h2>
          </div>

          <div className="flex max-w-3xl flex-wrap gap-3">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#f5a0c8]/30 bg-[#f5a0c8]/5 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#f5a0c8]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#e8613a] px-6 py-24 md:px-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#f5a0c8]/30 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-[#1a0808]">
              Live Demo
            </p>
            <h2 className="max-w-5xl text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[#1a0808]">
              Try the demo.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-medium uppercase leading-7 tracking-[0.08em] text-[#1a0808]/75 md:text-base">
              Sign in with the demo account and explore plans, sessions,
              dashboard, and the Stripe upgrade flow.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <Link
              href="/auth/login?callbackUrl=%2Fdashboard"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
            >
              Try the Demo
            </Link>

            <Link
              href="https://github.com/Julieanna97/PracticePal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#1a0808] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}