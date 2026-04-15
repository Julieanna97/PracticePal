import Link from "next/link";

const demos = [
  {
    name: "Episode Pipeline Board",
    description:
      "Visualized progress from recording through publishing so teams can spot blockers earlier.",
    outcome: "Clearer status handoff across production roles.",
  },
  {
    name: "Assignment Timeline",
    description:
      "Mapped ownership by stage and date to improve coordination between operations and content contributors.",
    outcome: "Reduced confusion about who owns next action.",
  },
  {
    name: "Performance Snapshot",
    description:
      "Created a concise analytics surface for weekly trend checks and episode comparisons.",
    outcome: "Faster decisions during review meetings.",
  },
];

export default function PodManagerCaseStudyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/projects" className="text-sm font-semibold text-slate-400 hover:text-cyan-300 transition">
          ← Back to Projects
        </Link>

        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Internship Case Study</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">Pod<span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Manager.ai</span></h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
          During my internship, I built demo concepts focused on podcast workflow and team visibility. This page documents each demo with context, outcomes, and strategic impact.
        </p>

        <div className="mt-12 grid gap-6">
          {demos.map((demo, idx) => (
            <article key={demo.name} className="group rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-8 hover:border-slate-600 hover:bg-slate-800/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 group-hover:bg-clip-text transition">{demo.name}</h2>
                  <p className="mt-3 text-slate-300">{demo.description}</p>
                  <p className="mt-4 text-sm font-semibold text-cyan-300">✓ {demo.outcome}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
