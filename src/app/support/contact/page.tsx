import SimplePageShell from "@/components/SimplePageShell";

const contactCards = [
  {
    title: "LinkedIn",
    description: "Best for professional contact, collaboration, and portfolio feedback.",
    href: "https://www.linkedin.com/in/julie-anne-cantillep-4ba4ab250/",
    label: "Open LinkedIn",
  },
  {
    title: "GitHub Issues",
    description: "Use this to report bugs, request features, or track improvements in the repo.",
    href: "https://github.com/Julieanna97/PracticePal/issues",
    label: "Open issues",
  },
  {
    title: "FAQ",
    description: "A quick stop if you want an answer before sending a message.",
    href: "/support/faq",
    label: "Read FAQ",
  },
];

export default function ContactPage() {
  return (
    <SimplePageShell
      title="Get in touch"
      subtitle="Need help, want to share feedback, or found a bug? Start here."
    >
      <section className="rounded-[2rem] bg-[#0d3b3a] p-8 text-[#faf6f0] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9d8c5]/80">Contact options</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Choose the fastest path to the right conversation.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#faf6f0]/72">
          Use LinkedIn for direct contact or GitHub Issues for product feedback and bug reports.
        </p>
      </section>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {contactCards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="soft-card group rounded-[1.75rem] p-6 transition hover:-translate-y-1"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/55">
              Contact
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#0d3b3a]">{card.title}</h3>
            <p className="mt-3 leading-relaxed text-[#1a2e2c]/70">{card.description}</p>
            <span className="mt-6 inline-flex font-semibold text-[#0d3b3a] transition group-hover:text-[#f4a261]">
              {card.label} →
            </span>
          </a>
        ))}
      </div>

      <section className="mt-12 rounded-[2rem] border border-[#0d3b3a]/10 bg-white/70 p-8 md:p-10">
        <h2 className="text-3xl font-semibold tracking-tight text-[#0d3b3a]">What to include in a bug report</h2>
        <ul className="mt-5 grid gap-3 text-[#1a2e2c]/70 md:grid-cols-2">
          {[
            "What you were trying to do",
            "What happened instead",
            "Your device and browser",
            "Screenshots if possible",
          ].map((item) => (
            <li key={item} className="rounded-2xl border border-[#0d3b3a]/8 bg-[#faf6f0] px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </SimplePageShell>
  );
}
