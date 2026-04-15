import Link from "next/link";

const features = [
  "Authentication and account flows for returning users.",
  "Practice plan creation and session logging with MongoDB.",
  "Stripe-based subscription handling and webhook sync.",
  "Responsive dashboard and analytics views.",
];

const screenshots = [
  {
    title: "Hero / onboarding screen",
    src: "/projects/practicepal/screenshots/01-hero.png",
  },
  {
    title: "Dashboard overview",
    src: "/projects/practicepal/screenshots/02-dashboard.png",
  },
  {
    title: "Session logging flow",
    src: "/projects/practicepal/screenshots/03-session-logging.png",
  },
  {
    title: "Billing and upgrade flow",
    src: "/projects/practicepal/screenshots/04-billing.png",
  },
];

export default function PracticePalLandingArchive() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/projects/practicepal" className="text-sm font-semibold text-slate-400 hover:text-cyan-300 transition">
          ← Back to PracticePal case study
        </Link>

        <section className="mt-10 grid gap-10 rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Archived Demo</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">Practice<span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Pal</span> Original</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              This is the original product landing page I built before turning the site into a portfolio. I kept it here as a demo artifact so you can review the product direction, visuals, and user flow.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-bold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition"
              >
                Open Product App
              </Link>
              <Link
                href="/projects/practicepal"
                className="rounded-lg border-2 border-slate-600 px-6 py-3 text-sm font-bold text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition"
              >
                View Case Study
              </Link>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/50 border border-slate-700/50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Key Features</p>
            <ul className="mt-5 space-y-3">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-sm text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Visual Overview</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Product <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Screens</span></h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {screenshots.map((item) => (
              <div key={item.title} className="group relative rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-hidden hover:border-slate-600 transition">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end pointer-events-none">
                  <div className="p-4 w-full">
                    <p className="text-sm font-semibold text-cyan-300">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Why This Matters</p>
            <h3 className="mt-4 text-2xl font-bold text-white">Full Product <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Showcase</span></h3>
            <p className="mt-4 text-slate-300 leading-relaxed">
              PracticePal demonstrates end-to-end product thinking: user authentication, real-time data logging, subscription management, and analytics. This archived demo lets you experience the original design and flow.
            </p>
          </article>

          <article className="rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">Tech Stack</p>
            <h3 className="mt-4 text-2xl font-bold text-white">Built With <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Next.js</span></h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• React 19 + Next.js App Router</li>
              <li>• MongoDB + Mongoose ORM</li>
              <li>• Stripe payment integration</li>
              <li>• NextAuth v4 authentication</li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
