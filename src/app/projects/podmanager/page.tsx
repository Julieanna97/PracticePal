import Link from "next/link";

const metrics = [
  { label: "Product Type", value: "Podcast SaaS" },
  { label: "Role", value: "Fullstack" },
  { label: "Core Stack", value: "Next.js" },
  { label: "Focus", value: "Media AI" },
];

const wins = [
  {
    title: "Real product codebase",
    text: "Worked inside a larger podcast platform with existing architecture, product requirements, Git workflows, and team feedback.",
  },
  {
    title: "Media editing workflows",
    text: "Contributed to browser-based audio and video editing experiences, including media controls, preview flows, and episode tooling.",
  },
  {
    title: "AI-powered podcast tools",
    text: "Worked around AI features such as transcription, audio enhancement, voice isolation, translation, speaker workflows, and smart editing logic.",
  },
  {
    title: "Fullstack product delivery",
    text: "Built and improved product-facing features across Next.js, TypeScript, FastAPI, MongoDB, Socket.IO, and deployment-related workflows.",
  },
];

const features = [
  {
    eyebrow: "01",
    title: "Editing Tools",
    detail:
      "Podcast editing surfaces for media workflows, waveform-style interactions, previews, and episode processing logic.",
  },
  {
    eyebrow: "02",
    title: "Recording Studio",
    detail:
      "Product areas connected to real-time recording, participants, controls, studio sessions, and media handling.",
  },
  {
    eyebrow: "03",
    title: "AI Workflows",
    detail:
      "AI-supported podcast tooling such as transcription, translation, enhancement, speaker logic, and smart content processing.",
  },
  {
    eyebrow: "04",
    title: "Platform Modules",
    detail:
      "Broader product areas for episodes, guests, marketplace, publishing workflows, billing, and team collaboration.",
  },
];

const process = [
  "Create podcast",
  "Record episode",
  "Edit media",
  "Apply AI tools",
  "Publish workflow",
];

const sections = [
  {
    number: "01",
    title: "Real Product Work",
    text: "PodManager.ai gave me experience working inside a larger production-style platform, not just a small isolated project. I contributed to features across podcast creation, editing, recording, and publishing workflows.",
  },
  {
    number: "02",
    title: "Media Engineering",
    text: "The work involved audio and video interfaces, media previews, waveform-style controls, and backend processing logic. It helped me grow in frontend detail work while understanding how media features depend on stable backend flows.",
  },
  {
    number: "03",
    title: "Team Delivery",
    text: "I worked with an existing codebase, product requirements, Git workflows, debugging, and implementation feedback. This strengthened my ability to contribute in a real software team environment.",
  },
];

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "FastAPI",
  "MongoDB",
  "Socket.IO",
  "WaveSurfer.js",
  "FFmpeg",
  "Docker",
  "Azure",
];

export default function PodManagerCaseStudyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f0ece4] text-[#1a0808]">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#1a0808]/10 bg-[#f0ece4]/90 px-6 py-5 backdrop-blur-xl md:px-12">
        <Link
          href="/"
          className="text-xs font-black uppercase tracking-[0.2em] transition hover:text-[#e8613a]"
        >
          Julie Anne Cantillep
        </Link>

        <div className="flex items-center gap-5 text-xs font-black uppercase tracking-[0.18em]">
          <Link href="/#projects" className="hover:text-[#e8613a]">
            Projects
          </Link>
          <Link
            href="https://www.podmanager.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e8613a]"
          >
            Website
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-6 py-16 md:px-12 md:py-24">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#f5a0c8]/30 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10rem] top-24 h-[32rem] w-[32rem] rounded-full bg-[#e8613a]/20 blur-3xl" />

        <div className="relative grid items-center gap-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <Link
              href="/"
              className="mb-12 inline-block text-xs font-black uppercase tracking-[0.18em] text-[#7a5050] transition hover:text-[#e8613a]"
            >
              ← Back to Portfolio
            </Link>

            <p className="mb-6 text-xs font-black uppercase tracking-[0.26em] text-[#e8613a]">
              Internship Case Study
            </p>

            <h1 className="max-w-4xl font-black uppercase leading-[0.78] tracking-[-0.06em]">
              <span className="block text-[clamp(4rem,9vw,9rem)]">
                PodManager
              </span>
              <span className="block text-[clamp(4rem,9vw,9rem)] text-[#f5a0c8]">
                .ai
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
              A podcast management platform with AI-powered editing, real-time
              recording studio features, guest management, marketplace modules,
              and publishing workflows. I contributed as a fullstack developer
              intern across media and platform features.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://www.podmanager.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
              >
                Visit Website
              </Link>

              <Link
                href="/#projects"
                className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
              >
                Back to Projects
              </Link>
            </div>
          </div>

          {/* MOCK PLATFORM PREVIEW */}
          <div className="group relative motion-safe:animate-[floatScreen_6s_ease-in-out_infinite]">
            <style>{`
              @keyframes floatScreen {
                0%, 100% { transform: translateY(0) rotate(-1deg); }
                50% { transform: translateY(-14px) rotate(1deg); }
              }

              @keyframes pulseDot {
                0%, 100% { opacity: 0.55; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.25); }
              }

              @keyframes waveMove {
                0%, 100% { transform: scaleY(0.72); opacity: 0.65; }
                50% { transform: scaleY(1); opacity: 1; }
              }

              @keyframes processingGlow {
                0%, 100% { box-shadow: 0 0 0 rgba(245,160,200,0); }
                50% { box-shadow: 0 0 34px rgba(245,160,200,0.26); }
              }

              @keyframes slideProgress {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(260%); }
              }
            `}</style>

            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#f5a0c8]/30 to-[#e8613a]/20 blur-2xl transition duration-500 group-hover:from-[#f5a0c8]/45 group-hover:to-[#e8613a]/30" />

            <div className="relative rounded-[2rem] border border-[#1a0808]/15 bg-[#1a0808] p-4 shadow-2xl shadow-[#1a0808]/25 transition duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#f5a0c8] transition group-hover:scale-125" />
                <span className="h-3 w-3 rounded-full bg-[#e8613a] transition group-hover:scale-125" />
                <span className="h-3 w-3 rounded-full bg-[#f0ece4]/50 transition group-hover:scale-125" />
              </div>

              <div className="rounded-[1.45rem] bg-[#f0ece4] p-5">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e8613a]">
                      Studio Dashboard
                    </p>
                    <h2 className="mt-2 text-3xl font-black uppercase leading-none">
                      Episode Workflow
                    </h2>
                  </div>

                  <button
                    type="button"
                    className="rounded-full bg-[#f5a0c8] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] transition duration-300 hover:-translate-y-1 hover:bg-[#e8613a] hover:text-[#f0ece4] motion-safe:animate-[processingGlow_2.4s_ease-in-out_infinite]"
                  >
                    AI Tools
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <button
                    type="button"
                    className="group/card rounded-3xl border border-[#1a0808]/10 bg-white/50 p-5 text-left transition duration-300 hover:-translate-y-2 hover:bg-[#1a0808] hover:text-[#f0ece4]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a5050] transition group-hover/card:text-[#f5a0c8]">
                        Studio
                      </p>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#e8613a] motion-safe:animate-[pulseDot_1.6s_ease-in-out_infinite]" />
                    </div>
                    <p className="mt-10 text-3xl font-black uppercase leading-none">
                      Live
                    </p>
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#1a0808]/10 group-hover/card:bg-[#f0ece4]/20">
                      <span className="block h-full w-2/3 rounded-full bg-[#e8613a] transition group-hover/card:w-full" />
                    </div>
                  </button>

                  <button
                    type="button"
                    className="group/card rounded-3xl border border-[#1a0808]/10 bg-[#f5a0c8] p-5 text-left transition duration-300 hover:-translate-y-3 hover:bg-[#e8613a] hover:text-[#f0ece4]"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1a0808]/60 transition group-hover/card:text-[#f0ece4]/70">
                      Speakers
                    </p>
                    <p className="mt-10 text-5xl font-black uppercase leading-none transition group-hover/card:scale-110">
                      04
                    </p>
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] opacity-60">
                      Separate tracks
                    </p>
                  </button>

                  <button
                    type="button"
                    className="group/card rounded-3xl border border-[#1a0808]/10 bg-white/50 p-5 text-left transition duration-300 hover:-translate-y-2 hover:bg-[#1a0808] hover:text-[#f0ece4]"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a5050] transition group-hover/card:text-[#f5a0c8]">
                      Status
                    </p>
                    <p className="mt-10 text-3xl font-black uppercase leading-none">
                      Edit
                    </p>
                    <div className="mt-5 flex gap-1.5">
                      <span className="h-2 flex-1 rounded-full bg-[#f5a0c8]" />
                      <span className="h-2 flex-1 rounded-full bg-[#e8613a]" />
                      <span className="h-2 flex-1 rounded-full bg-[#1a0808]/20 group-hover/card:bg-[#f0ece4]/30" />
                    </div>
                  </button>
                </div>

                <button
                  type="button"
                  className="group/timeline mt-5 w-full rounded-3xl border border-[#1a0808]/10 bg-[#1a0808] p-5 text-left text-[#f0ece4] transition duration-300 hover:-translate-y-2 hover:bg-[#2e0e0e]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f5a0c8]">
                      Audio Timeline
                    </p>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f0ece4]/45 transition group-hover/timeline:text-[#e8613a]">
                      Processing
                    </p>
                  </div>

                  <div className="relative flex h-36 items-center gap-2 overflow-hidden rounded-2xl">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f5a0c8]/18 to-transparent opacity-0 transition group-hover/timeline:opacity-100 motion-safe:group-hover/timeline:animate-[slideProgress_1.4s_linear_infinite]" />

                    {[42, 68, 54, 88, 62, 96, 74, 52, 83, 65, 91, 58].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 origin-center rounded-full bg-gradient-to-t from-[#e8613a] to-[#f5a0c8] transition duration-300 hover:scale-y-110 motion-safe:animate-[waveMove_1.5s_ease-in-out_infinite]"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${index * 0.08}s`,
                          }}
                        />
                      ),
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#f0ece4]/45">
                    <span className="rounded-full border border-[#f0ece4]/10 py-2 transition group-hover/timeline:text-[#f5a0c8]">
                      Enhance
                    </span>
                    <span className="rounded-full border border-[#f0ece4]/10 py-2 transition group-hover/timeline:text-[#f5a0c8]">
                      Transcribe
                    </span>
                    <span className="rounded-full border border-[#f0ece4]/10 py-2 transition group-hover/timeline:text-[#f5a0c8]">
                      Publish
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="grid grid-cols-2 border-y border-[#1a0808]/10 md:grid-cols-4">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="border-b border-r border-[#1a0808]/10 px-6 py-8 md:border-b-0 md:px-12"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7a5050]">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-black uppercase leading-none md:text-4xl">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {/* OVERVIEW */}
      <section className="grid gap-12 px-6 py-20 md:px-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            Overview
          </p>
          <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
            Built inside a real product team.
          </h2>
        </div>

        <div className="grid gap-4">
          {wins.map((item) => (
            <article
              key={item.title}
              className="group rounded-[1.75rem] border border-[#1a0808]/10 bg-white/30 p-6 transition hover:-translate-y-1 hover:bg-[#f5a0c8]"
            >
              <h3 className="text-2xl font-black uppercase leading-none">
                {item.title}
              </h3>
              <p className="mt-4 text-sm font-medium uppercase leading-8 tracking-[0.06em] text-[#3a1818]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* BREAKDOWN */}
      <section className="relative overflow-hidden bg-[#1a0808] px-6 py-24 text-[#f5a0c8] md:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,160,200,0.12),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(232,97,58,0.12),transparent_35%)]" />

        <div className="relative">
          <p className="mb-10 text-xs font-black uppercase tracking-[0.24em]">
            Project Breakdown
          </p>

          <div className="grid gap-5 lg:grid-cols-3">
            {sections.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-[#f5a0c8]/20 bg-[#f5a0c8]/5 p-7 backdrop-blur transition hover:bg-[#f5a0c8]/10"
              >
                <p className="mb-14 text-xs font-black text-[#f5a0c8]/50">
                  {item.number}
                </p>
                <h2 className="text-4xl font-black uppercase leading-none">
                  {item.title}
                </h2>
                <p className="mt-6 text-sm font-medium leading-7 text-[#f0ece4]/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24 md:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
              Product Areas
            </p>
            <h2 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]">
              What I worked around.
            </h2>
          </div>

          <p className="max-w-3xl self-end text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
            The platform combines media editing, AI tooling, recording studio
            workflows, guest management, marketplace features, and publishing in
            one product ecosystem.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border border-[#1a0808]/10 bg-[#1a0808] p-7 text-[#f0ece4] transition hover:-translate-y-1 hover:bg-[#2e0e0e]"
            >
              <p className="mb-12 text-xs font-black uppercase tracking-[0.2em] text-[#f5a0c8]/55">
                {feature.eyebrow}
              </p>
              <h3 className="text-4xl font-black uppercase tracking-[-0.03em] text-[#f5a0c8]">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm font-medium leading-8 text-[#f0ece4]/65">
                {feature.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#f5a0c8] px-6 py-24 text-[#1a0808] md:px-12">
        <p className="mb-8 text-xs font-black uppercase tracking-[0.24em]">
          Product Flow
        </p>

        <div className="grid gap-4 md:grid-cols-5">
          {process.map((step, index) => (
            <article
              key={step}
              className="min-h-[230px] rounded-[1.75rem] border border-[#1a0808]/20 bg-[#f0ece4]/45 p-6 transition hover:bg-[#f0ece4]"
            >
              <p className="mb-14 text-xs font-black text-[#1a0808]/45">
                0{index + 1}
              </p>
              <h3 className="text-2xl font-black uppercase leading-none">
                {step}
              </h3>
            </article>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="grid gap-12 px-6 py-24 md:px-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            Architecture
          </p>
          <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
            Media platform logic.
          </h2>
          <p className="mt-8 max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818]">
            PodManager.ai helped me understand how product features connect
            across frontend screens, backend APIs, real-time updates, database
            models, media processing, and cloud workflows.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#1a0808]/10 bg-white/35 p-6">
          {[
            ["User", "Creates podcasts, episodes, guests, and recording sessions"],
            ["Studio", "Handles recording, participants, controls, and live flows"],
            ["Editor", "Supports media editing, previews, waveform views, and tools"],
            ["Backend", "Connects FastAPI services, MongoDB data, and processing jobs"],
            ["Publishing", "Moves edited episodes through final publishing workflows"],
          ].map(([label, text], index) => (
            <div
              key={label}
              className="grid gap-4 border-b border-[#1a0808]/10 py-5 last:border-b-0 md:grid-cols-[120px_1fr]"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#e8613a]">
                0{index + 1} · {label}
              </p>
              <p className="text-sm font-medium uppercase leading-7 tracking-[0.06em] text-[#3a1818]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="bg-[#1a0808] px-6 py-20 text-[#f0ece4] md:px-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#f5a0c8]">
              Technical Stack
            </p>
            <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.05em]">
              Built in a modern monorepo.
            </h2>
          </div>

          <div className="flex max-w-3xl flex-wrap gap-3">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#f5a0c8]/30 bg-[#f5a0c8]/5 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#f5a0c8]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#e8613a] px-6 py-24 md:px-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#f5a0c8]/30 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-[#1a0808]">
              Internship Work
            </p>
            <h2 className="max-w-5xl text-[clamp(3.5rem,9vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.06em] text-[#1a0808]">
              Product work across media, AI, and publishing.
            </h2>
          </div>

          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <Link
              href="https://www.podmanager.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
            >
              Visit Website
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#1a0808] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}