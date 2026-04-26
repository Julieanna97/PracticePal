import Link from "next/link";

const heroStats = [
  { label: "Role", value: "Fullstack Developer" },
  { label: "Period", value: "2025 – 2026" },
  { label: "Type", value: "Internship" },
  { label: "Stack", value: "Next.js · FastAPI · MongoDB" },
];

const wins = [
  "Shipped features across the Next.js App Router frontend and FastAPI backend in a real production codebase.",
  "Built browser-based audio and video editing tools with WaveSurfer.js, custom track logic, and FFmpeg-backed processing.",
  "Implemented form-heavy product surfaces using React Hook Form + Zod with SWR for data fetching and caching.",
  "Worked across recording studio flows powered by Socket.IO for real-time multi-participant sessions.",
  "Contributed to MongoDB-backed services and Dockerized deployment workflows targeting Azure Container Registry.",
];

const sections = [
  {
    number: "01",
    title: "Real Production Codebase",
    text: "PodManager.ai is a comprehensive podcast management platform — recording studio, AI editing, guest management, marketplace. I joined an existing team and shipped features across a monorepo of Next.js 16, TypeScript, and a FastAPI backend, learning to navigate scale instead of starting from scratch.",
  },
  {
    number: "02",
    title: "Real-Time & Media",
    text: "I worked on flows that depend on Socket.IO synchronization, WebRTC recording, WaveSurfer.js waveforms, and TensorFlow.js / MediaPipe for media processing. These are problems where state, timing, and UI feedback all matter — much more demanding than typical CRUD work.",
  },
  {
    number: "03",
    title: "Fullstack Across the Stack",
    text: "I moved between frontend components, FastAPI routes, MongoDB repositories, and Docker / Azure deployment. The role taught me how every layer impacts the user — from API design and data shapes to loading states and animation polish.",
  },
];

const featureGroups = [
  {
    name: "Recording Studio",
    items: [
      "Multi-participant WebRTC recording with WebSocket sync",
      "Separate-track recording per participant",
      "Screen sharing and live chat during sessions",
      "Host / guest role management",
      "Pause / resume controls",
      "Automatic upload to Blob storage on completion",
    ],
  },
  {
    name: "Episode Editing",
    items: [
      "AI-powered audio enhancement and voice isolation",
      "Multi-language transcription and translation",
      "Speaker diarization for multi-host shows",
      "Audio effects and sound effects library",
      "Video trim, cut, and chapter identification",
      "Automated publishing workflow",
    ],
  },
  {
    name: "Guest & Marketplace",
    items: [
      "Guest invitation flows with email templates",
      "Guest information forms and booking",
      "Ad store with dynamic ad insertion",
      "Guest store for finding podcast guests",
      "Freelancer portal for editors and producers",
      "Proposal management system",
    ],
  },
];

const productFlow = [
  "Invite guests",
  "Record in studio",
  "Edit with AI tools",
  "Generate shorts",
  "Publish episode",
];

const stack = {
  Frontend: [
    "Next.js 16 (App Router)",
    "TypeScript 5",
    "Tailwind CSS 4",
    "Radix UI",
    "SWR",
    "React Hook Form + Zod",
    "Framer Motion",
    "WaveSurfer.js",
    "MediaPipe",
    "TensorFlow.js",
    "Recharts",
  ],
  Backend: [
    "FastAPI (Python)",
    "MongoDB",
    "Socket.IO",
    "REST + WebSocket APIs",
    "Pydantic schemas",
    "Repository pattern",
  ],
  "Real-Time & Media": [
    "Socket.IO Client",
    "WebRTC",
    "WaveSurfer.js 7",
    "FFmpeg",
    "Blob storage",
  ],
  "DevOps & Deploy": [
    "Docker (multi-stage)",
    "Docker Compose",
    "Azure Container Registry",
    "Gunicorn",
    "Turbopack",
    "Vercel Analytics",
  ],
};

const learnings = [
  {
    label: "Reading Code",
    text: "Working in a real production codebase taught me how to navigate, understand existing patterns, and contribute without breaking conventions.",
  },
  {
    label: "Real-Time Logic",
    text: "Recording studios live and die on timing. I learned to think in terms of synchronization, race conditions, and UI feedback for async events.",
  },
  {
    label: "Media Engineering",
    text: "Audio and video processing brought me deeper into the browser — MediaRecorder, WebRTC, waveform rendering, and how to keep UI smooth under load.",
  },
  {
    label: "Type Safety in Practice",
    text: "Heavy use of TypeScript and Zod showed me how strong typing scales — fewer runtime errors, faster refactors, clearer API contracts between layers.",
  },
];

export default function PodManagerCaseStudyPage() {
  return (
    <main className="min-h-screen bg-[#f0ece4] text-[#1a0808]">
      {/* TOP NAV */}
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#1a0808] px-6 py-4 md:px-10">
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5a0c8] transition hover:opacity-65"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Julie Anne Cantillep
        </Link>

        <div
          className="flex items-center gap-6 text-xs font-bold uppercase tracking-[0.18em] text-[#f5a0c8]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          <Link href="/#projects" className="hover:opacity-65">All Projects</Link>
          <Link
            href="https://github.com/Julieanna97"
            className="hover:opacity-65"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#1a0808] px-6 pb-0 pt-12 md:px-10">
        <Link
          href="/"
          className="mb-12 inline-block text-xs font-bold uppercase tracking-[0.22em] text-[#f5a0c8]/60 transition hover:text-[#f5a0c8]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          ← Back to Portfolio
        </Link>

        <p
          className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-[#e8613a]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Case Study · Internship
        </p>

        <h1
          className="text-[clamp(4rem,12vw,14rem)] font-black uppercase leading-[0.82] tracking-[-0.03em] text-[#f5a0c8]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Pod
          <span className="text-white">Manager</span>
          <span className="text-[#e8613a]">.ai</span>
        </h1>

        <p
          className="mt-10 max-w-3xl text-sm font-light uppercase leading-[1.85] tracking-[0.06em] text-white/60 md:text-base"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          A comprehensive podcast management platform with AI-powered editing, real-time recording studio,
          guest management, and marketplace features. I joined the team as a fullstack developer and
          shipped features across the Next.js frontend, FastAPI backend, and Dockerized deployment.
        </p>

        {/* Hero stats grid */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[#f5a0c8]/15 pt-10 md:grid-cols-4">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <p
                className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#f5a0c8]/45"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {stat.label}
              </p>
              <p
                className="mt-2 text-base font-bold uppercase tracking-[0.04em] text-white md:text-lg"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Giant pink wordmark bleeds off */}
        <div className="mt-20 -mx-6 overflow-hidden md:-mx-10">
          <p
            className="whitespace-nowrap text-center text-[clamp(7rem,22vw,28rem)] font-black uppercase leading-[0.82] tracking-[-0.04em] text-[#f5a0c8]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            PODMANAGER
          </p>
        </div>
      </section>

      {/* WHAT I BUILT */}
      <section className="bg-[#f0ece4] px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p
              className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#7a5050]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              My Contributions
            </p>
            <h2
              className="text-[clamp(2.8rem,6vw,6rem)] font-black uppercase leading-[0.9] tracking-[0.01em] text-[#1a0808]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              What I<br />Built.
            </h2>
          </div>

          <div className="flex flex-col">
            {wins.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[40px_1fr] items-start gap-4 border-t border-[#1a0808]/12 py-6 last:border-b"
              >
                <span
                  className="pt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#e8613a]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  0{i + 1}
                </span>
                <p
                  className="text-sm font-light uppercase leading-[1.85] tracking-[0.05em] text-[#3a1818]"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORANGE MARQUEE */}
      <div className="overflow-hidden whitespace-nowrap bg-[#e8613a] py-4">
        <div className="inline-flex animate-[marquee_22s_linear_infinite]">
          {[
            ...["REAL-TIME RECORDING", "AI EDITING", "WEBSOCKET SYNC", "FASTAPI", "MONGODB", "NEXT.JS 16"],
            ...["REAL-TIME RECORDING", "AI EDITING", "WEBSOCKET SYNC", "FASTAPI", "MONGODB", "NEXT.JS 16"],
          ].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-9 text-sm font-bold uppercase tracking-[0.14em] text-[#f5a0c8]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {item}
              <span className="text-xs text-[#f5a0c8]/60">✦</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      {/* PROJECT BREAKDOWN */}
      <section className="bg-[#1a0808] px-6 py-20 md:px-10">
        <p
          className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f5a0c8]/50"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Project Breakdown
        </p>
        <h2
          className="mb-14 text-[clamp(2.8rem,6vw,6rem)] font-black uppercase leading-[0.9] tracking-[0.01em] text-[#f5a0c8]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Where I<br />Worked.
        </h2>

        <div className="grid gap-5 lg:grid-cols-3">
          {sections.map((item) => (
            <article key={item.title} className="border border-[#f5a0c8]/22 p-7">
              <p
                className="mb-10 text-xs font-bold tracking-[0.18em] text-[#f5a0c8]/50"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {item.number}
              </p>
              <h3
                className="text-2xl font-black uppercase leading-none tracking-[0.02em] text-white md:text-3xl"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {item.title}
              </h3>
              <p
                className="mt-6 text-sm font-light uppercase leading-[1.85] tracking-[0.05em] text-white/55"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* PRODUCT MODULES */}
      <section className="bg-[#f0ece4] px-6 py-20 md:px-10">
        <p
          className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#7a5050]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Product Modules
        </p>
        <h2
          className="mb-14 text-[clamp(2.8rem,6vw,6rem)] font-black uppercase leading-[0.9] tracking-[0.01em] text-[#1a0808]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          What Ships<br />in PodManager.
        </h2>

        <div className="grid gap-12 lg:grid-cols-3">
          {featureGroups.map((group) => (
            <div key={group.name}>
              <h3
                className="mb-6 text-2xl font-black uppercase tracking-[0.02em] text-[#1a0808] md:text-3xl"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {group.name}
              </h3>
              <ul className="flex flex-col">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-[#1a0808]/12 py-3 text-xs font-light uppercase leading-[1.7] tracking-[0.06em] text-[#3a1818] last:border-b md:text-sm"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT FLOW */}
      <section className="bg-[#1a0808] px-6 py-16 md:px-10">
        <p
          className="mb-8 text-xs font-bold uppercase tracking-[0.22em] text-[#f5a0c8]/50"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Product Flow
        </p>

        <div className="grid gap-3 md:grid-cols-5">
          {productFlow.map((step, index) => (
            <div key={step} className="border border-[#f5a0c8]/22 p-5">
              <p
                className="mb-8 text-xs font-bold tracking-[0.18em] text-[#f5a0c8]/50"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                0{index + 1}
              </p>
              <h3
                className="text-lg font-black uppercase leading-tight tracking-[0.02em] text-[#f5a0c8] md:text-xl"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {step}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-[#f0ece4] px-6 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p
              className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#e8613a]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Technical Stack
            </p>
            <h2
              className="text-[clamp(2.8rem,6vw,6rem)] font-black uppercase leading-[0.9] tracking-[0.01em] text-[#1a0808]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Built<br />Like a Real<br />Product.
            </h2>
          </div>

          <div className="grid gap-10">
            {Object.entries(stack).map(([group, items]) => (
              <div key={group}>
                <p
                  className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#7a5050]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#1a0808] bg-transparent px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1a0808]"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I LEARNED */}
      <section className="bg-[#2e0e0e] px-6 py-20 md:px-10">
        <p
          className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f5a0c8]/50"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Reflection
        </p>
        <h2
          className="mb-14 text-[clamp(2.8rem,6vw,6rem)] font-black uppercase leading-[0.9] tracking-[0.01em] text-[#f5a0c8]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          What I<br />Took Away.
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {learnings.map((item) => (
            <article key={item.label} className="border border-[#f5a0c8]/22 p-7">
              <p
                className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#f5a0c8]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {item.label}
              </p>
              <p
                className="text-sm font-light uppercase leading-[1.85] tracking-[0.05em] text-white/55"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e8613a] px-6 py-20 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p
              className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-[#1a0808]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Want to talk shop?
            </p>
            <h2
              className="max-w-4xl text-[clamp(3rem,9vw,9rem)] font-black uppercase leading-[0.82] tracking-[-0.02em] text-[#1a0808]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Let's<br />work together.
            </h2>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="mailto:kisamae1997@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#f5a0c8] transition hover:bg-transparent hover:text-[#1a0808]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Send Email
            </Link>

            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a0808] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER WORDMARK */}
      <div className="overflow-hidden bg-[#f0ece4] pt-6">
        <p
          className="block text-[clamp(8rem,22vw,28rem)] font-black uppercase leading-[0.82] tracking-[-0.03em] text-[#1a0808]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          CANTILLEP
        </p>
      </div>
    </main>
  );
}