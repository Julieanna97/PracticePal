import Link from "next/link";

const featureAreas = [
  {
    name: "Recording Studio",
    description:
      "Real-time recording workflows with role-aware host/guest experiences, synchronization, and recording controls.",
    outcome: "Supported live collaboration flows for podcast capture and studio coordination.",
  },
  {
    name: "Episode Editing & AI Tools",
    description:
      "Audio/video editing surfaces with waveform tooling, processing jobs, and AI-powered features like transcription, enhancement, and speaker diarization.",
    outcome: "Improved speed from raw recording to publish-ready output.",
  },
  {
    name: "Marketplace & Operations",
    description:
      "Guest, freelancer, and ad-store modules with supporting management pages, forms, and workflow visibility across the product.",
    outcome: "Expanded the platform from editor tooling into end-to-end podcast operations.",
  },
];

const stackGroups = [
  {
    title: "Frontend",
    items: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "SWR",
      "React Hook Form + Zod",
      "Socket.IO Client",
      "Framer Motion",
      "WaveSurfer.js",
      "MediaPipe + TensorFlow.js",
      "Recharts",
    ],
  },
  {
    title: "Backend",
    items: [
      "FastAPI",
      "MongoDB",
      "Socket.IO (Python)",
      "REST + WebSocket architecture",
      "Repository/service-layer organization",
    ],
  },
  {
    title: "DevOps",
    items: [
      "Docker multi-stage builds",
      "Docker Compose",
      "Azure Container Registry",
      "Gunicorn production serving",
      "ESLint + TypeScript checks",
    ],
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
          During my internship, I worked in a production-scale monorepo spanning Next.js frontend surfaces and FastAPI backend services. My contributions covered recording studio workflows, editing features, AI-tooling experiences, and operational marketplace modules.
        </p>

        <div className="mt-12 grid gap-6">
          {featureAreas.map((demo, idx) => (
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

        <section className="mt-14 rounded-2xl border border-slate-700/50 bg-slate-800/30 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Tech Stack Used</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {stackGroups.map((group) => (
              <article key={group.title}>
                <h2 className="text-lg font-bold text-white">{group.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {group.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
