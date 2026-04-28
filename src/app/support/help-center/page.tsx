import Link from "next/link";
import SimplePageShell from "@/components/SimplePageShell";

const steps = [
  {
    number: "01",
    title: "Create your account",
    text: "Sign up with email or social login and start with the free plan.",
  },
  {
    number: "02",
    title: "Set your goals",
    text: "Choose your instrument or skill and set a realistic weekly practice target.",
  },
  {
    number: "03",
    title: "Log sessions",
    text: "Add your practice time, difficulty, mood, and notes after each session.",
  },
];

const features = [
  {
    title: "Logging practice sessions",
    text: "Log the plan, duration, date, difficulty, mood, and notes so your dashboard stays accurate.",
  },
  {
    title: "Understanding streaks",
    text: "Streaks count consistent practice days. Even a short focused session helps build the habit.",
  },
  {
    title: "Tracking progress",
    text: "Your dashboard shows weekly totals, today’s minutes, average session length, recent sessions, and progress trends.",
  },
];

const tips = [
  "Start with a realistic weekly target.",
  "Practice a little often instead of cramming.",
  "Write notes so you can see patterns over time.",
  "Review your stats weekly and adjust your plan.",
];

export default function HelpCenterPage() {
  return (
    <SimplePageShell
      title="Help Center"
      subtitle="Guides, tips, and answers for getting the most out of PracticePal."
    >
      <section className="rounded-[2rem] bg-[#0d3b3a] p-8 text-[#faf6f0] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9d8c5]/80">
          Welcome
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Learn how to build a better practice routine.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#faf6f0]/70">
          PracticePal helps you plan your goals, log your sessions, and understand your progress over time.
        </p>
      </section>

      <section className="mt-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
          Getting Started
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.title}
              className="rounded-3xl border border-[#0d3b3a]/10 bg-white/60 p-6 transition hover:-translate-y-1 hover:bg-white"
            >
              <p className="text-sm font-bold text-[#f4a261]">{step.number}</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[#0d3b3a]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#1a2e2c]/65">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
          Core Features
        </p>

        <div className="space-y-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-[#0d3b3a]/10 bg-white/60 p-6 transition hover:-translate-y-1 hover:bg-white md:p-8"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-[#0d3b3a]">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#1a2e2c]/65">
                {feature.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] bg-[#f4a261] p-8 text-[#0d3b3a] md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/60">
          Best Practices
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight">
          Small sessions still count.
        </h2>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {tips.map((tip) => (
            <div
              key={tip}
              className="rounded-2xl border border-[#0d3b3a]/10 bg-[#faf6f0]/45 p-4 text-sm font-medium"
            >
              {tip}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-[#0d3b3a]/10 bg-white/60 p-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[#0d3b3a]">
          Still need help?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#1a2e2c]/65">
          Visit the FAQ or contact support if you need more help with your account, plans, sessions, or billing.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/support/faq"
            className="rounded-full border border-[#0d3b3a]/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[#0d3b3a] transition hover:bg-[#0d3b3a]/5"
          >
            View FAQ
          </Link>
          <Link
            href="/support/contact"
            className="rounded-full bg-[#0d3b3a] px-6 py-3 text-sm font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </SimplePageShell>
  );
}