import Link from "next/link";

const metrics = [
  { label: "Product Type", value: "SaaS" },
  { label: "Role", value: "Fullstack" },
  { label: "Core Stack", value: "Next.js" },
  { label: "Focus", value: "Musicians" },
];

const wins = [
  {
    title: "End-to-end product flow",
    text: "Built the journey from authentication to planning, session logging, analytics, and subscription access.",
  },
  {
    title: "Structured database design",
    text: "Created MongoDB models for users, practice plans, sessions, and subscription-related state.",
  },
  {
    title: "Stripe subscription logic",
    text: "Integrated billing flows and webhook syncing to keep user access and account state reliable.",
  },
  {
    title: "Responsive product UI",
    text: "Designed dashboard, onboarding, forms, and progress views that work across screen sizes.",
  },
];

const features = [
  {
    eyebrow: "01",
    title: "Authentication",
    detail:
      "Secure account flows for returning users, protected pages, and user-specific practice data.",
  },
  {
    eyebrow: "02",
    title: "Practice Planning",
    detail:
      "Users can create structured practice plans, organize goals, and prepare focused sessions.",
  },
  {
    eyebrow: "03",
    title: "Session Logging",
    detail:
      "Practice sessions can be saved with duration, notes, focus areas, and progress context.",
  },
  {
    eyebrow: "04",
    title: "Subscriptions",
    detail:
      "Stripe-powered subscription flows with webhook syncing for account and billing state.",
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
    title: "Product Thinking",
    text: "PracticePal started as a real product idea: helping musicians practice more consistently with plans, sessions, and progress visibility. I focused on user flow, structure, and long-term usefulness.",
  },
  {
    number: "02",
    title: "Fullstack Build",
    text: "The project connects frontend screens with backend logic, authentication, database models, and subscription handling. It shows that I can work across the full product stack.",
  },
  {
    number: "03",
    title: "Business Logic",
    text: "Stripe billing, account state, protected routes, and saved user data made the project more realistic and taught me how product features depend on reliable backend design.",
  },
];

const stack = ["Next.js", "React", "MongoDB", "NextAuth", "Stripe", "Tailwind CSS"];

export default function PracticePalCaseStudyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f0ece4] text-[#1a0808]">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#1a0808]/10 bg-[#f0ece4]/90 px-6 py-5 backdrop-blur-xl md:px-12">
        <Link
          href="/"
          className="text-xs font-black uppercase tracking-[0.2em] transition hover:text-[#e8613a]"
        >
          Julie Anne Cantillep
        </Link>

        <div className="flex items-center gap-5 text-xs font-black uppercase tracking-[0.18em]">
          <Link
            href="/auth/login?callbackUrl=%2Fdashboard"
            className="hover:text-[#e8613a]"
          >
            Demo
          </Link>
          <Link
            href="https://github.com/Julieanna97/PracticePal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e8613a]"
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
              Full Product Case Study
            </p>

            <h1 className="max-w-4xl font-black uppercase leading-[0.78] tracking-[-0.06em]">
              <span className="block text-[clamp(4.5rem,10vw,10rem)]">
                Practice
              </span>
              <span className="block text-[clamp(4.5rem,10vw,10rem)] text-[#f5a0c8]">
                Pal
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
              A fullstack practice planning and analytics app for musicians. I
              built it to show product thinking, frontend execution, backend
              structure, authentication, database design, and subscription logic
              in one complete software product.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/auth/login?callbackUrl=%2Fdashboard"
                className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
              >
                View Demo
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
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#f5a0c8]/30 to-[#e8613a]/20 blur-2xl" />

            <div className="relative rounded-[2rem] border border-[#1a0808]/15 bg-[#1a0808] p-4 shadow-2xl shadow-[#1a0808]/25">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#f5a0c8]" />
                <span className="h-3 w-3 rounded-full bg-[#e8613a]" />
                <span className="h-3 w-3 rounded-full bg-[#f0ece4]/50" />
              </div>

              <div className="rounded-[1.45rem] bg-[#f0ece4] p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e8613a]">
                      Dashboard
                    </p>
                    <h2 className="mt-2 text-3xl font-black uppercase leading-none">
                      Today&apos;s Practice
                    </h2>
                  </div>

                  <div className="rounded-full bg-[#f5a0c8] px-4 py-2 text-xs font-black uppercase tracking-[0.14em]">
                    Pro Plan
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-[#1a0808]/10 bg-white/50 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a5050]">
                      Focus
                    </p>
                    <p className="mt-10 text-3xl font-black uppercase leading-none">
                      Scales
                    </p>
                  </div>

                  <div className="rounded-3xl border border-[#1a0808]/10 bg-[#f5a0c8] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1a0808]/60">
                      Streak
                    </p>
                    <p className="mt-10 text-5xl font-black uppercase leading-none">
                      12
                    </p>
                  </div>

                  <div className="rounded-3xl border border-[#1a0808]/10 bg-white/50 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a5050]">
                      Time
                    </p>
                    <p className="mt-10 text-3xl font-black uppercase leading-none">
                      45m
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-3xl border border-[#1a0808]/10 bg-[#1a0808] p-5 text-[#f0ece4]">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f5a0c8]">
                      Weekly Progress
                    </p>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f0ece4]/45">
                      Analytics
                    </p>
                  </div>

                  <div className="flex h-36 items-end gap-3">
                    {[38, 62, 48, 82, 58, 94, 72].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-2xl bg-gradient-to-t from-[#e8613a] to-[#f5a0c8]"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
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
            Overview
          </p>
          <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
            Built beyond a simple landing page.
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
            Project Breakdown
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
                <h2 className="text-4xl font-black uppercase leading-none">
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
              Product Features
            </p>
            <h2 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]">
              What ships inside PracticePal.
            </h2>
          </div>

          <p className="max-w-3xl self-end text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
            The case study now combines the previous demo page and the technical
            breakdown in one stronger product story.
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
          Product Flow
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
          <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
            Connected product logic.
          </h2>
          <p className="mt-8 max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818]">
            PracticePal helped me understand how user experience depends on
            stable backend logic, database structure, protected routes, and
            subscription-aware account state.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#1a0808]/10 bg-white/35 p-6">
          {[
            ["User", "Signs in with OAuth / account flow"],
            ["App", "Creates plans and logs practice sessions"],
            ["Database", "Stores user data, plans, sessions, and progress"],
            ["Stripe", "Handles subscription and billing state"],
            ["Dashboard", "Shows practice progress and product value"],
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

      {/* STACK */}
      <section className="bg-[#1a0808] px-6 py-20 text-[#f0ece4] md:px-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#f5a0c8]">
              Technical Stack
            </p>
            <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
              Built like a product.
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
            <h2 className="max-w-5xl text-[clamp(3.5rem,9vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.06em] text-[#1a0808]">
              Explore the product flow.
            </h2>
          </div>

          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <Link
              href="/auth/login?callbackUrl=%2Fdashboard"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
            >
              View Demo
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