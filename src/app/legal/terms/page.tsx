import SimplePageShell from "@/components/SimplePageShell";

const sections: Array<{ title: string; bullets: string[] }> = [
  {
    title: "Acceptance of terms",
    bullets: [
      "By using PracticePal, you agree to these terms and our privacy policy.",
      "If you do not agree, you should not use the service.",
    ],
  },
  {
    title: "Use of the service",
    bullets: [
      "Use the app responsibly and lawfully.",
      "Keep your account information accurate and secure.",
      "Do not try to disrupt, abuse, or hack the service.",
    ],
  },
  {
    title: "Subscriptions and payments",
    bullets: [
      "Free access includes the core practice tracking experience.",
      "Pro is billed monthly and can be canceled at any time.",
      "Refunds and pricing changes are handled with notice and care.",
    ],
  },
];

export default function TermsPage() {
  return (
    <SimplePageShell
      title="Terms of Service"
      subtitle="The rules and guidelines for using PracticePal."
    >
      <section className="rounded-[2rem] bg-[#0d3b3a] p-8 text-[#faf6f0] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d8c5]/80">Use responsibly</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Clear terms, no noise.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#faf6f0]/72">
          PracticePal is built to help you stay consistent. These terms protect both you and the service.
        </p>
      </section>

      <div className="mt-12 space-y-6">
        {sections.map((section) => (
          <section key={section.title} className="soft-card rounded-[1.75rem] p-6 md:p-8">
            <h3 className="text-2xl font-semibold tracking-tight text-[#0d3b3a]">{section.title}</h3>
            <ul className="mt-4 space-y-3 text-[#1a2e2c]/70">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#f4a261]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-[2rem] border border-[#0d3b3a]/10 bg-[#f4a261] p-8 text-[#0d3b3a] md:p-10">
        <h2 className="text-3xl font-semibold tracking-tight">Questions about these terms?</h2>
        <p className="mt-3 max-w-2xl leading-relaxed">
          Contact support if anything is unclear or if you need help with your account or subscription.
        </p>
      </section>
    </SimplePageShell>
  );
}
