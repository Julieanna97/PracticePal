import Link from "next/link";

const wins = [
  "Built end-to-end product flow: auth, planning, logging, and analytics.",
  "Integrated subscriptions and account billing with Stripe APIs.",
  "Structured user data in MongoDB models for plans and sessions.",
  "Shipped responsive UX across dashboard, forms, and progress views.",
];

export default function PracticePalCaseStudyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/projects" className="text-sm font-semibold text-slate-400 hover:text-cyan-300 transition">
          ← Back to Projects
        </Link>

        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Case Study</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">Practice<span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Pal</span></h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
          PracticePal started as my full product build for helping musicians stay consistent. I am now featuring it inside my wider portfolio to showcase both product thinking and full-stack execution.
        </p>

        <section className="mt-12 rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">What I Built</h2>
          <ul className="mt-6 space-y-3 text-slate-300">
            {wins.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Live Demos</h2>
          <p className="mt-3 text-slate-300">
            I kept the original product marketing landing page as an archived demo route so it can still be reviewed.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/projects/practicepal/landing" className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-bold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition">
              View Original Landing
            </Link>
            <Link href="/dashboard" className="rounded-lg border-2 border-slate-600 px-6 py-3 text-sm font-bold text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition">
              View Product App
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
