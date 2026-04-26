import Link from "next/link";

const features = [
  {
    title: "Authentication",
    detail: "Secure account flows for returning users, protected pages, and user-specific practice data.",
  },
  {
    title: "Practice Planning",
    detail: "Users can create practice plans, organize goals, and track structured sessions over time.",
  },
  {
    title: "Session Logging",
    detail: "Practice sessions can be saved with duration, notes, focus areas, and progress context.",
  },
  {
    title: "Subscriptions",
    detail: "Stripe-powered subscription flows with webhook syncing for account and billing state.",
  },
];

const stack = ["Next.js", "React", "MongoDB", "NextAuth", "Stripe", "Tailwind CSS"];

const productFlow = [
  "Create an account",
  "Build a practice plan",
  "Log focused sessions",
  "Review progress",
  "Upgrade with Stripe",
];

export default function PracticePalLandingArchive() {
  return (
    <main className="min-h-screen bg-[#f0ece4] text-[#1a0808]">
      {/* Top Bar */}
      <nav className="flex items-center justify-between border-b border-[#1a0808]/10 px-6 py-5 md:px-12">
        <Link
          href="/"
          className="font-black uppercase tracking-[0.18em] text-[#1a0808] transition hover:text-[#e8613a]"
        >
          Julie Anne Cantillep
        </Link>

        <div className="flex items-center gap-5 text-xs font-black uppercase tracking-[0.18em]">
          <Link href="/projects/practicepal" className="hover:text-[#e8613a]">
            Case Study
          </Link>
          <Link href="/dashboard" className="hover:text-[#e8613a]">
            Open App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="grid min-h-[calc(100vh-73px)] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:py-24">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            Archived Product Demo
          </p>

          <h1 className="max-w-4xl text-[clamp(4rem,10vw,10rem)] font-black uppercase leading-[0.82] tracking-[-0.04em]">
            Practice
            <span className="text-[#f5a0c8]">Pal</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
            A full-stack practice planning and analytics product for musicians.
            I built the original app with authentication, session tracking,
            practice plans, dashboards, and subscription flows.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
            >
              Open Product App
            </Link>

            <Link
              href="/projects/practicepal"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
            >
              View Case Study
            </Link>
          </div>
        </div>

        <div className="bg-[#1a0808] p-6 md:p-10">
          <div className="flex h-full min-h-[520px] flex-col justify-between bg-[#f5a0c8] p-8 text-[#1a0808]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em]">
                Product Snapshot
              </p>

              <div className="mt-10 grid gap-5">
                {features.map((feature) => (
                  <article
                    key={feature.title}
                    className="border-t border-[#1a0808]/25 pt-5"
                  >
                    <h2 className="text-2xl font-black uppercase tracking-[-0.02em]">
                      {feature.title}
                    </h2>
                    <p className="mt-2 text-sm font-medium leading-7 text-[#3a1818]">
                      {feature.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <p className="mt-12 text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]">
              SaaS
              <br />
              Build
            </p>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="border-y border-[#1a0808]/10 bg-[#1a0808] px-6 py-16 text-[#f5a0c8] md:px-12">
        <p className="mb-8 text-xs font-black uppercase tracking-[0.24em]">
          Product Flow
        </p>

        <div className="grid gap-4 md:grid-cols-5">
          {productFlow.map((step, index) => (
            <div key={step} className="border border-[#f5a0c8]/25 p-5">
              <p className="mb-8 text-xs font-black text-[#f5a0c8]/50">
                0{index + 1}
              </p>
              <h3 className="text-xl font-black uppercase leading-none">
                {step}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="grid grid-cols-1 gap-10 px-6 py-20 md:px-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            Why This Matters
          </p>
          <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
            Full Product Showcase
          </h2>
        </div>

        <div className="space-y-8">
          <p className="max-w-3xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
            PracticePal shows my ability to build beyond a simple landing page.
            It combines product thinking, user flows, database models,
            authentication, subscription logic, and dashboard experiences into
            one complete app.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="border border-[#1a0808]/15 p-6">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#7a5050]">
                Ownership
              </p>
              <p className="text-sm font-medium leading-7 text-[#3a1818]">
                Designed and developed the product flow from concept to working
                implementation.
              </p>
            </article>

            <article className="border border-[#1a0808]/15 p-6">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#7a5050]">
                Engineering
              </p>
              <p className="text-sm font-medium leading-7 text-[#3a1818]">
                Connected frontend, backend, database, authentication, and
                billing into one cohesive experience.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="bg-[#e8613a] px-6 py-14 md:px-12">
        <p className="mb-8 text-xs font-black uppercase tracking-[0.24em] text-[#1a0808]">
          Built With
        </p>

        <div className="flex flex-wrap gap-3">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#1a0808] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#1a0808]"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-20 md:px-12">
        <div className="border-t border-[#1a0808]/15 pt-12">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            Continue Exploring
          </p>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
              See the full case study.
            </h2>

            <Link
              href="/projects/practicepal"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
            >
              Open Case Study
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}