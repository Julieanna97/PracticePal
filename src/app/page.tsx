"use client";

import Link from "next/link";

const featuredProjects = [
  {
    name: "PracticePal",
    category: "Full Product",
    summary:
      "A full-stack practice and analytics app for musicians with auth, plans, sessions, and Stripe subscriptions.",
    stack: ["Next.js", "MongoDB", "Stripe", "NextAuth"],
    demoHref: "/projects/practicepal/landing",
    caseHref: "/projects/practicepal",
  },
  {
    name: "PodManager.ai",
    category: "Internship Project",
    summary:
      "Built podcast editing & AI analysis platform. Waveform UI with wavesurfer.js, FastAPI backend with FFmpeg audio blending, and AI transcription/smart cuts using Whisper and GPT.",
    stack: ["React", "FastAPI", "FFmpeg", "OpenAI", "Whisper", "Azure"],
    demoHref: "/projects/podmanager",
    caseHref: "/projects/podmanager",
  },
  {
    name: "Theme Lab",
    category: "Design Exploration",
    summary:
      "A collection of portfolio concepts built to explore layout, branding, and interaction styles.",
    stack: ["Tailwind", "Motion", "UI Systems", "Layout Studies"],
    demoHref: "#theme-lab",
    caseHref: "/projects",
  },
];

const themeDemos = [
  {
    title: "Aurora SaaS",
    note: "Clean dashboard IA and onboarding.",
  },
  {
    title: "Desert Studio",
    note: "Editorial typography and warm spacing.",
  },
  {
    title: "Neon Commerce",
    note: "Bold contrast and product-led conversion blocks.",
  },
];

const skills = {
  "Web Dev": ["React", "Next.js", "TypeScript", "Node.js", "Express", "Tailwind CSS"],
  "Backend": ["Python", "FastAPI", "Flask", "MongoDB", "PostgreSQL"],
  "Embedded": ["C/C++", "Arduino", "ESP32", "RTOS", "Zephyr", "LoRa"],
  "Protocols": ["UART", "SPI", "I2C", "CAN", "Yocto"],
  "Audio/AI": ["FFmpeg", "OpenAI", "Whisper", "faster-whisper", "pydub", "librosa"],
  "Tools": ["Git", "Docker", "Figma", "Jira", "CMake", "GTest", "VSCode", "Linux"],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #000;
          color: #fff;
          font-family: var(--font-geist-sans), Arial, sans-serif;
        }

        .hatfield-shell {
          background:
            radial-gradient(circle at top, rgba(255, 255, 255, 0.08), transparent 40%),
            linear-gradient(180deg, #080808 0%, #111 55%, #0a0a0a 100%);
        }

        .noise {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .curved-panel {
          border-radius: 26px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
        }

        .soft-panel {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
        }

        .page-title {
          font-family: var(--font-geist-sans), Arial, sans-serif;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .post-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 18px;
        }

        .post-card {
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }

        .post-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
        }

        .topbar-link {
          position: relative;
          transition: color 180ms ease;
        }

        .topbar-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 1px;
          background: currentColor;
          opacity: 0;
          transform: scaleX(0.65);
          transition: opacity 180ms ease, transform 180ms ease;
        }

        .topbar-link:hover::after {
          opacity: 1;
          transform: scaleX(1);
        }

        .banner-button {
          transition: transform 180ms ease, background 180ms ease, color 180ms ease;
        }

        .banner-button:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <div className="hatfield-shell noise min-h-screen">
        <header className="fixed left-0 top-0 z-50 w-full px-5 py-4 md:px-8">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md md:px-6">
            <Link href="/" className="page-title text-[10px] font-semibold text-white/90">
              Julie Anne Cantillep
            </Link>
            <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-white/70 md:flex">
              <a href="#about" className="topbar-link hover:text-white">About</a>
              <a href="#projects" className="topbar-link hover:text-white">Projects</a>
              <a href="#skills" className="topbar-link hover:text-white">Skills</a>
              <a href="#contact" className="topbar-link hover:text-white">Contact</a>
            </nav>
          </div>
        </header>

        <main className="px-4 pb-8 pt-24 md:px-6 md:pt-28">
          <section className="curved-panel relative min-h-[88vh] overflow-hidden bg-[#141414]">
            <div className="absolute inset-0 bg-[url('/profile_image/profile-img.jfif')] bg-cover bg-[center_35%] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70" />

            <div className="relative z-10 flex min-h-[88vh] flex-col justify-between p-6 md:p-10 lg:p-12">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="page-title text-[11px] text-white/65">Developer, Designer, Builder</p>
                  <h1 className="mt-5 max-w-4xl text-5xl font-normal leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
                    I build products across the full stack, from embedded systems to polished web interfaces.
                  </h1>
                </div>

                <div className="soft-panel w-full max-w-xs rounded-[24px] p-5 text-sm text-white/80 md:p-6">
                  <p className="page-title text-[10px] text-white/55">About</p>
                  <p className="mt-3 leading-7 text-white/80">
                    Full-stack developer passionate about design. I build web apps, embedded systems, and AI tools. Graduating April 2026.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                <div className="max-w-2xl text-base leading-8 text-white/78 md:text-lg">
                  Embedded projects (Arduino, ESP32). Fullstack web apps (React, Node.js, Python). Audio engineering and AI. I care about code quality, user experience, and shipping things that work.
                </div>

                <div className="flex flex-wrap gap-3 md:justify-end">
                  <a href="#projects" className="banner-button rounded-full bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black">
                    View Work
                  </a>
                  <a href="#contact" className="banner-button rounded-full border border-white/30 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="mx-auto mt-6 max-w-7xl rounded-[26px] border border-white/10 bg-white px-6 py-10 text-[#141414] md:px-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="page-title text-[10px] text-black/45">Profile</p>
                <h2 className="mt-3 text-3xl font-normal leading-tight md:text-4xl">Fullstack developer passionate about design since childhood.</h2>
              </div>
              <div className="grid gap-5 text-sm leading-7 text-black/70 md:text-base md:leading-8">
                <p>
                  I work across frontend, backend, and embedded systems. Started with embedded projects at Sigma Industry Evolution and Nodehill AB (Arduino, ESP32, LoRa). Then moved to fullstack web development—built PracticePal with Next.js and Stripe, worked on audio editing at PodManager.ai with React and FastAPI, and trained AI models at Outlier. I care about clear interfaces, performant code, and products that actually solve problems.
                </p>
                <p>
                  Graduating April 2026 from The Media Institute. Experienced with React, Node.js, Python, C/C++, embedded systems (RTOS, Zephyr, communication protocols), and design tools. I'm looking to keep building things that matter.
                </p>
              </div>
            </div>
          </section>

          <section id="projects" className="mx-auto mt-6 max-w-7xl rounded-[26px] border border-white/10 bg-[#0f0f0f] px-6 py-10 md:px-10 md:py-12">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="page-title text-[10px] text-white/45">Featured Posts</p>
                <h2 className="mt-3 text-3xl font-normal md:text-4xl">Selected work</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-white/60 md:text-base">
                A grid of projects presented like editorial posts, with compact summaries and strong hierarchy.
              </p>
            </div>

            <div className="post-grid">
              {featuredProjects.map((project, index) => (
                <article key={project.name} className="post-card">
                  <div className="flex h-36 items-end bg-gradient-to-br from-white/10 to-white/0 p-5">
                    <div>
                      <p className="page-title text-[10px] text-white/50">0{index + 1}</p>
                      <h3 className="mt-2 text-2xl font-normal text-white">{project.name}</h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/45">{project.category}</p>
                    </div>
                  </div>
                  <div className="space-y-5 p-5 text-sm leading-7 text-white/72">
                    <p>{project.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={`${project.name}-${item}`} className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/60">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Link href={project.demoHref} className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black">
                        Demo
                      </Link>
                      <Link href={project.caseHref} className="rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                        Case Study
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="theme-lab" className="mx-auto mt-6 max-w-7xl rounded-[26px] border border-white/10 bg-white px-6 py-10 text-[#141414] md:px-10 md:py-12">
            <div className="mb-8">
              <p className="page-title text-[10px] text-black/45">Theme Lab</p>
              <h2 className="mt-3 text-3xl font-normal md:text-4xl">Concept studies</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {themeDemos.map((demo) => (
                <article key={demo.title} className="rounded-[20px] border border-black/10 bg-black/[0.03] p-5 transition hover:-translate-y-1 hover:shadow-lg">
                  <p className="page-title text-[10px] text-black/45">Studio Note</p>
                  <h3 className="mt-3 text-2xl font-normal">{demo.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-black/70">{demo.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" className="mx-auto mt-6 max-w-7xl rounded-[26px] border border-white/10 bg-[#0f0f0f] px-6 py-10 md:px-10 md:py-12">
            <div className="mb-8">
              <p className="page-title text-[10px] text-white/45">Technical Archive</p>
              <h2 className="mt-3 text-3xl font-normal md:text-4xl">Skills</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {Object.entries(skills).map(([group, items]) => (
                <article key={group} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="page-title text-[10px] text-white/45">{group}</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-white/70">
                    {items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="mx-auto mt-6 max-w-7xl rounded-[26px] border border-white/10 bg-white px-6 py-10 text-[#141414] md:px-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="page-title text-[10px] text-black/45">Get In Touch</p>
                <h2 className="mt-3 text-3xl font-normal md:text-4xl">Let’s build something clean and useful.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-black/70 md:text-base">
                  If you want a portfolio, product page, or dashboard with a sharper visual identity, I can help shape it.
                </p>
              </div>
              <a href="mailto:hello@example.com" className="rounded-full bg-black px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                Email Me
              </a>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-black px-6 py-10 text-white/60 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="page-title text-[10px] text-white/45">© 2026 Julie Anne Cantillep</p>
            <div className="flex flex-wrap gap-5 text-[11px] uppercase tracking-[0.18em]">
              <a href="https://github.com/Julieanna97" className="topbar-link hover:text-white">GitHub</a>
              <a href="https://www.linkedin.com" className="topbar-link hover:text-white">LinkedIn</a>
              <a href="mailto:hello@example.com" className="topbar-link hover:text-white">Email</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
