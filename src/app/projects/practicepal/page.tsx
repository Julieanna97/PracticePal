import Link from "next/link";

const wins = [
  "Built the core product flow from authentication to practice planning, session logging, and analytics.",
  "Created structured MongoDB models for users, plans, sessions, and subscription-related data.",
  "Integrated Stripe subscription and billing logic with webhook syncing.",
  "Designed responsive pages for onboarding, dashboard views, forms, and progress tracking.",
];

const stack = ["Next.js", "React", "MongoDB", "NextAuth", "Stripe", "Tailwind CSS"];

const sections = [
  {
    number: "01",
    title: "Product Thinking",
    text: "PracticePal started as a real product idea: helping musicians practice more consistently with plans, sessions, and progress visibility. I treated it as more than a school-style project and focused on user flow, structure, and long-term usefulness.",
  },
  {
    number: "02",
    title: "Fullstack Build",
    text: "The project connects frontend screens with backend logic, authentication, database models, and subscription handling. It shows that I can work across the full product stack instead of only building static interfaces.",
  },
  {
    number: "03",
    title: "Business Logic",
    text: "Stripe billing, account state, protected routes, and saved user data made the project more realistic. It helped me understand how product features depend on reliable state management and backend design.",
  },
];

export default function PracticePalCaseStudyPage() {
  return (
    <main className="min-h-screen bg-[#f0ece4] text-[#1a0808]">
      {/* Top Bar */}
      <nav className="flex items-center justify-between border-b border-[#1a0808]/10 px-6 py-5 md:px-12">
        <Link
          href="/"
          className="text-xs font-black uppercase tracking-[0.18em] text-[#1a0808] transition hover:text-[#e8613a]"
        >
          Julie Anne Cantillep
        </Link>

        <div className="flex items-center gap-5 text-xs font-black uppercase tracking-[0.18em]">
          <Link href="/projects/practicepal/landing" className="hover:text-[#e8613a]">
            Demo
          </Link>
          <Link href="/dashboard" className="hover:text-[#e8613a]">
            Product App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="grid min-h-[calc(100vh-73px)] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:py-24">
          <Link
            href="/"
            className="mb-12 text-xs font-black uppercase tracking-[0.18em] text-[#7a5050] transition hover:text-[#e8613a]"
          >
            ← Back to Portfolio
          </Link>

          <p className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            Case Study
          </p>

          <h1 className="max-w-4xl text-[clamp(4rem,10vw,10rem)] font-black uppercase leading-[0.82] tracking-[-0.04em]">
            Practice
            <span className="text-[#f5a0c8]">Pal</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
            PracticePal is a full product build for helping musicians stay
            consistent. I use it in my portfolio to show product thinking,
            fullstack execution, database design, authentication, and
            subscription logic.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects/practicepal/landing"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
            >
              View Demo Page
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
            >
              Open Product App
            </Link>
          </div>
        </div>

        <aside className="bg-[#1a0808] p-6 md:p-10">
          <div className="flex h-full min-h-[520px] flex-col justify-between bg-[#f5a0c8] p-8 text-[#1a0808]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em]">
                What I Built
              </p>

              <ul className="mt-10 space-y-6">
                {wins.map((item) => (
                  <li
                    key={item}
                    className="border-t border-[#1a0808]/25 pt-5 text-sm font-medium leading-7 text-[#3a1818]"
                  >
                    <span className="mr-3 font-black text-[#1a0808]">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-12 text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]">
              Full
              <br />
              Stack
            </p>
          </div>
        </aside>
      </section>

      {/* Sections */}
      <section className="border-y border-[#1a0808]/10 bg-[#1a0808] px-6 py-20 text-[#f5a0c8] md:px-12">
        <p className="mb-10 text-xs font-black uppercase tracking-[0.24em]">
          Project Breakdown
        </p>

        <div className="grid gap-5 lg:grid-cols-3">
          {sections.map((item) => (
            <article key={item.title} className="border border-[#f5a0c8]/25 p-6">
              <p className="mb-10 text-xs font-black text-[#f5a0c8]/50">
                {item.number}
              </p>
              <h2 className="text-3xl font-black uppercase leading-none">
                {item.title}
              </h2>
              <p className="mt-6 text-sm font-medium leading-7 text-[#f0ece4]/70">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="grid grid-cols-1 gap-10 px-6 py-20 md:px-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            Technical Stack
          </p>
          <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
            Built Like a Product.
          </h2>
        </div>

        <div>
          <p className="max-w-3xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
            The project helped me practice the real connections between product
            design and engineering: how users sign in, how data is stored, how
            subscriptions affect access, and how the interface guides users
            through repeatable practice habits.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#1a0808] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#1a0808]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e8613a] px-6 py-20 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-[#1a0808]">
              Live Demo
            </p>
            <h2 className="max-w-4xl text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[#1a0808]">
              Explore the product flow.
            </h2>
          </div>

          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <Link
              href="/projects/practicepal/landing"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
            >
              View Demo Page
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#1a0808] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
            >
              Open App
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}