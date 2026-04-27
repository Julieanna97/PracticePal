import Link from "next/link";

const fontLink = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap";

const metrics = [
  { label: "Project Type", value: "Internship" },
  { label: "Role",         value: "Fullstack Dev" },
  { label: "Team Size",    value: "Production" },
  { label: "Domain",       value: "Podcast SaaS" },
];

const wins = [
  {
    title: "Joined a real production codebase",
    text: "Onboarded into an existing Next.js 16 + FastAPI monorepo, learned the conventions, and started shipping features alongside the team.",
  },
  {
    title: "Shipped media editing surfaces",
    text: "Worked on browser-based audio and video editing — waveform interactions, track logic, preview flows, and the supporting backend processing.",
  },
  {
    title: "Worked on real-time studio flows",
    text: "Contributed to the WebRTC + Socket.IO recording experience: multi-participant sessions, separate-track recording, host/guest roles.",
  },
  {
    title: "Touched the full delivery pipeline",
    text: "From React Hook Form + Zod product surfaces, to FastAPI services and MongoDB models, to Dockerized deployment toward Azure Container Registry.",
  },
];

const features = [
  {
    eyebrow: "01",
    title: "Recording Studio",
    detail:
      "Multi-participant WebRTC sessions with WebSocket sync, separate-track recording, screen share, and live chat during sessions.",
  },
  {
    eyebrow: "02",
    title: "Episode Editing",
    detail:
      "Waveform-driven audio editing, AI enhancement, transcription, speaker diarization, video trim, and chapter identification.",
  },
  {
    eyebrow: "03",
    title: "AI Workflows",
    detail:
      "Voice isolation, multi-language transcription and translation, speaker diarization, smart cuts, and notes generation.",
  },
  {
    eyebrow: "04",
    title: "Platform Modules",
    detail:
      "Guest management, ad store, freelancer marketplace, proposal flows, and the publishing workflow that ties everything together.",
  },
];

const sections = [
  {
    number: "01",
    title: "Reading code before writing it",
    text: "First time joining a real production codebase. I learned to navigate existing patterns, follow the team’s conventions, and contribute without breaking things — a different skill from building from scratch.",
  },
  {
    number: "02",
    title: "Shipping into a moving system",
    text: "Features had to integrate with what was already there: shared types, shared services, shared deploy. I learned to think about how my changes affected other people’s work, not just my branch.",
  },
  {
    number: "03",
    title: "Real-time and media problems",
    text: "Recording studios depend on timing, sync, and async UI feedback. Working on WebRTC, Socket.IO, and waveform tooling pushed me deeper into the browser than typical CRUD work ever does.",
  },
];

const platformStats = [
  { num: "8+",         label: "Product modules touched" },
  { num: "Real-time",  label: "Recording studio flows" },
  { num: "AI-powered", label: "Editing surfaces" },
  { num: "Monorepo",   label: "Frontend + Backend" },
];

const reflections = [
  {
    label: "What was new",
    text: "Code review. Pull request feedback. Reading conventions instead of inventing them. The team experience is what separates this project from anything I’ve built solo.",
  },
  {
    label: "What I got better at",
    text: "Asking the right questions early, reading unfamiliar code without panicking, and shipping incremental changes that integrate cleanly with what’s already there.",
  },
  {
    label: "What I’m taking forward",
    text: "An intuition for how production teams actually move — small PRs, clear commits, conventions before cleverness. PodManager turned me from someone who can build, into someone who can join.",
  },
];

const stack = [
  "Next.js 16",
  "TypeScript",
  "Tailwind CSS",
  "FastAPI",
  "MongoDB",
  "Socket.IO",
  "WebRTC",
  "WaveSurfer.js",
  "FFmpeg",
  "Docker",
  "Azure Container Registry",
];

export default function PodManagerCaseStudyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f0ece4] text-[#1a0808]">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href={fontLink} />
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#1a0808]/10 bg-[#f0ece4]/90 px-6 py-5 backdrop-blur-xl md:px-12" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        <Link
          href="/"
          className="uppercase transition hover:text-[#e8613a]"
          style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.12em' }}
        >
          Julie Anne Cantillep
        </Link>

        <div className="flex items-center gap-11">
          <Link
            href="https://www.podmanager.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase transition hover:text-[#e8613a]"
            style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.12em' }}
          >
            Visit Site
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
              Internship · 2025 — 2026
            </p>

            {/* FIXED: smaller clamp so PodManager.ai fits inside the column */}
            <h1 className="max-w-4xl text-[clamp(2.5rem,7vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]">
              Pod<span className="text-[#f5a0c8]">Manager</span><span className="text-[#e8613a]">.ai</span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
              I joined the PodManager team and shipped features inside a real
              production codebase — recording studio, editing tools, AI
              workflows. This is the project where I learned to build inside
              a team, not just by myself.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://www.podmanager.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
              >
                See It Live
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

      {/* WHAT I BUILT */}
      <section className="grid gap-12 px-6 py-20 md:px-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            What I Shipped
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
            Real features. Real codebase.
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

      {/* PLATFORM SCALE */}
      <section className="border-y border-[#1a0808]/10 bg-[#f5a0c8] px-6 py-20 md:px-12">
        <p className="mb-10 text-xs font-black uppercase tracking-[0.24em] text-[#1a0808]">
          Scope of Platform
        </p>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {platformStats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-[#1a0808] pl-5">
              <p className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-none tracking-[-0.04em] text-[#1a0808]">
                {stat.num}
              </p>
              <p className="mt-3 text-xs font-black uppercase leading-tight tracking-[0.16em] text-[#1a0808]/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT CHANGED FOR ME */}
      <section className="relative overflow-hidden bg-[#1a0808] px-6 py-24 text-[#f5a0c8] md:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,160,200,0.12),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(232,97,58,0.12),transparent_35%)]" />

        <div className="relative">
          <p className="mb-10 text-xs font-black uppercase tracking-[0.24em]">
            What Changed for Me
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
                <h2 className="text-3xl font-black uppercase leading-tight md:text-4xl">
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

      {/* PRODUCT MODULES */}
      <section className="px-6 py-24 md:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
              Product Modules
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
              What ships in PodManager.
            </h2>
          </div>

          <p className="max-w-3xl self-end text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
            PodManager is a full podcast platform — recording studio, editing
            suite, AI workflows, and a marketplace. I touched modules across
            most of the surface, not just one corner.
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

      {/* REFLECTION */}
      <section className="bg-[#2e0e0e] px-6 py-24 text-[#f0ece4] md:px-12">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#f5a0c8]">
              Reflection
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[#f5a0c8]">
              From building to joining.
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#f0ece4]/60 md:text-base">
            The biggest shift wasn’t technical. It was learning how
            production teams actually work — and how my code fits inside
            other people’s.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reflections.map((item) => (
            <article
              key={item.label}
              className="rounded-[2rem] border border-[#f5a0c8]/20 bg-[#f5a0c8]/5 p-7 transition hover:bg-[#f5a0c8]/10"
            >
              <p className="mb-10 text-xs font-black uppercase tracking-[0.22em] text-[#f5a0c8]">
                {item.label}
              </p>
              <p className="text-sm font-medium leading-8 text-[#f0ece4]/75">
                {item.text}
              </p>
            </article>
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
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
              The tools I worked across.
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
              Live Product
            </p>
            <h2 className="max-w-5xl text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[#1a0808]">
              See it live.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-medium uppercase leading-7 tracking-[0.08em] text-[#1a0808]/75 md:text-base">
              PodManager.ai is in production. Visit the site to see the
              platform I worked on — recording, editing, AI tools, and
              marketplace.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <Link
              href="https://www.podmanager.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
            >
              Visit PodManager.ai
            </Link>

            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#1a0808] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
            >
              All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}