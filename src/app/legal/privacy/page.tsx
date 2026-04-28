import SimplePageShell from "@/components/SimplePageShell";

const sections: Array<{ title: string; bullets: string[] }> = [
  {
    title: "Information we collect",
    bullets: [
      "Account information such as name, email, and password hash.",
      "Practice data including sessions, notes, mood, difficulty, and plans.",
      "Basic usage details that help us improve reliability and usability.",
    ],
  },
  {
    title: "How we use it",
    bullets: [
      "To provide practice tracking, streaks, analytics, and account features.",
      "To send important updates about your account or billing.",
      "To improve the product and keep the service secure.",
    ],
  },
  {
    title: "Your rights",
    bullets: [
      "Access your data at any time.",
      "Request corrections or deletion.",
      "Export your practice history from your account settings.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <SimplePageShell
      title="Privacy Policy"
      subtitle="How we handle and protect your information."
    >
      <section className="rounded-[2rem] bg-[#0d3b3a] p-8 text-[#faf6f0] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d8c5]/80">Privacy first</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Your practice data is yours.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#faf6f0]/72">
          We keep the policy simple: use your information to power the app, protect it carefully, and never sell it.
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
        <h2 className="text-3xl font-semibold tracking-tight">Questions about privacy?</h2>
        <p className="mt-3 max-w-2xl leading-relaxed">
          If you want to request data deletion or ask a privacy question, contact support and we’ll help.
        </p>
      </section>
    </SimplePageShell>
  );
}
