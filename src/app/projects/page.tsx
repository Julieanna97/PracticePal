import Link from "next/link";

const projects = [
  {
    name: "PracticePal",
    slug: "practicepal",
    type: "Full Product",
    summary:
      "Musician practice tracking app with authentication, plan creation, session logging, analytics, and subscriptions.",
    highlights: ["Next.js App Router", "MongoDB + Mongoose", "Stripe subscriptions"],
  },
  {
    name: "PodManager.ai Demos",
    slug: "podmanager",
    type: "Internship",
    summary:
      "Internship demo concepts focused on podcast operations, visibility, and workflow acceleration.",
    highlights: ["Workflow UX", "Dashboard prototypes", "Stakeholder-focused demos"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Portfolio</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-white">Project <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Case Studies</span></h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          A focused view of my product work, internship demos, and implementation decisions.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="group relative rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-8 hover:border-slate-600 hover:bg-slate-800/50 transition-all">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-400">{project.type}</p>
              <h2 className="mt-4 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 group-hover:bg-clip-text transition">{project.name}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">{project.summary}</p>

              <ul className="mt-5 space-y-2 text-sm text-slate-400">
                {project.highlights.map((h) => (
                  <li key={h}>✓ {h}</li>
                ))}
              </ul>

              <Link
                href={`/projects/${project.slug}`}
                className="mt-8 inline-flex rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-bold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition"
              >
                Open Case Study →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
