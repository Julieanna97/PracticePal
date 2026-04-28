import SimplePageShell from "@/components/SimplePageShell";

const faqGroups = [
  {
    title: "Getting Started",
    items: [
      ["Is PracticePal free?", "Yes. The free plan includes core practice logging, streak tracking, and a 30-day history window."],
      ["What instruments does it support?", "All of them. PracticePal works for guitar, piano, vocals, drums, violin, production, and more."],
      ["Is it for beginners or advanced musicians?", "Both. The app is designed to support anyone building a consistent practice habit."],
    ],
  },
  {
    title: "Account & Billing",
    items: [
      ["Do I need a credit card to start?", "No. You can create a free account and upgrade only when you are ready."],
      ["Can I cancel Pro anytime?", "Yes. Cancel from your account settings and access stays active until the billing period ends."],
      ["What happens if I downgrade?", "Your recent practice history stays available, and you can upgrade again later if needed."],
    ],
  },
  {
    title: "Tracking & Analytics",
    items: [
      ["How do I log a session?", "Open the session form, choose your plan, enter your duration, add notes, and save."],
      ["What do streaks mean?", "Streaks count consecutive practice days and reward consistency over intensity."],
      ["Can I track multiple plans?", "Yes. You can create multiple plans and review how each one contributes to your progress."],
    ],
  },
];

export default function FAQPage() {
  return (
    <SimplePageShell
      title="Frequently Asked Questions"
      subtitle="Quick answers to common questions about PracticePal."
    >
      <section className="rounded-[2rem] bg-[#0d3b3a] p-8 text-[#faf6f0] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d8c5]/80">Need help?</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Everything you need to know, in one place.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#faf6f0]/72">
          These answers cover the most common questions about plans, sessions, billing, and account setup.
        </p>
      </section>

      <div className="mt-12 space-y-8">
        {faqGroups.map((group) => (
          <section key={group.title} className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-[#0d3b3a]">{group.title}</h3>
            <div className="grid gap-4">
              {group.items.map(([question, answer]) => (
                <article key={question} className="soft-card rounded-3xl p-6 md:p-7">
                  <p className="text-lg font-semibold text-[#0d3b3a]">{question}</p>
                  <p className="mt-3 leading-relaxed text-[#1a2e2c]/70">{answer}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-[2rem] border border-[#0d3b3a]/10 bg-[#f4a261] p-8 text-[#0d3b3a] md:p-10">
        <h2 className="text-3xl font-semibold tracking-tight">Still have a question?</h2>
        <p className="mt-3 max-w-2xl leading-relaxed">
          Reach out through support if you need help with your account, plans, sessions, or billing.
        </p>
        <a
          href="/support/contact"
          className="mt-6 inline-flex rounded-full bg-[#0d3b3a] px-6 py-3 font-semibold text-[#faf6f0] transition hover:bg-[#0d3b3a]/90"
        >
          Contact Support
        </a>
      </section>
    </SimplePageShell>
  );
}
