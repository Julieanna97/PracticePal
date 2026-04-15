"use client";

import Link from "next/link";

const featuredProjects = [
  {
    name: "PracticePal",
    category: "Full Product",
    summary:
      "A full-stack habit and analytics app for musicians with auth, plans, sessions, and Stripe subscriptions.",
    stack: ["Next.js", "MongoDB", "Stripe", "NextAuth"],
    demoHref: "/projects/practicepal/landing",
    caseHref: "/projects/practicepal",
    label: "Flagship Project",
  },
  {
    name: "PodManager.ai Intern Demo",
    category: "Internship Project",
    summary:
      "Operations dashboard prototype focused on podcast workflow visibility, scheduling, and productivity insights.",
    stack: ["React", "TypeScript", "API Integration", "Data Viz"],
    demoHref: "/projects/podmanager",
    caseHref: "/projects/podmanager",
    label: "Internship Work",
  },
  {
    name: "Theme Lab Series",
    category: "Design System Demos",
    summary:
      "A set of website concept demos across visual themes to show range in branding, layout, and interactions.",
    stack: ["Tailwind", "Motion", "UI Systems", "Component Patterns"],
    demoHref: "#theme-lab",
    caseHref: "/projects",
    label: "Demo Collection",
  },
];

const themeDemos = [
  {
    title: "Aurora SaaS",
    vibe: "Clean and technical",
    focus: "Dashboard IA, onboarding flow, pricing narrative",
    status: "Add your live link",
  },
  {
    title: "Desert Studio",
    vibe: "Editorial and warm",
    focus: "Typography-forward storytelling and portfolio rhythm",
    status: "Add your live link",
  },
  {
    title: "Neon Commerce",
    vibe: "Bold and high-contrast",
    focus: "Landing conversion blocks and animated product moments",
    status: "Add your live link",
  },
];

const podManagerDemos = [
  {
    title: "Episode Pipeline Board",
    impact: "Reduced status confusion by centralizing draft to publish checkpoints.",
  },
  {
    title: "Team Assignment Timeline",
    impact: "Improved ownership visibility for editors, hosts, and social media handoff.",
  },
  {
    title: "Performance Snapshot Panel",
    impact: "Surfaced trend signals and top episodes for faster weekly decision-making.",
  },
];

const skills = {
  "Programming Languages": ["JavaScript", "TypeScript", "Python", "C/C++", "HTML", "CSS"],
  "Frontend": ["React", "Next.js", "Tailwind CSS", "Bootstrap"],
  "Backend & APIs": ["Node.js", "Express", "FastAPI", "Python Flask"],
  "Databases": ["MongoDB", "SQL", "noSQL", "phpMyAdmin"],
  "Design": ["Figma", "Web/Graphic Design", "UI Design"],
  "DevOps & Tools": ["Git", "Jira", "VSCode", "Docker", "Linux/Ubuntu"],
  "Soft Skills": ["Problem Solving", "Team Communication"],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <header className="sticky top-0 z-40 border-b border-slate-700/30 bg-slate-900/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-sm font-bold tracking-[0.2em] bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">JULIE ANNE</p>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="#about" className="hover:text-cyan-300 text-slate-300 transition">About</Link>
            <Link href="#skills" className="hover:text-cyan-300 text-slate-300 transition">Skills</Link>
            <Link href="#projects" className="hover:text-cyan-300 text-slate-300 transition">Projects</Link>
            <a href="#contact" className="hover:text-cyan-300 text-slate-300 transition">Contact</a>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        {/* Hero Section */}
        <section id="about" className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
          <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div>
              <p className="mb-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 shadow-sm">
                ✨ Full-Stack Developer & Designer
              </p>
              <h1 className="mt-6 text-5xl md:text-6xl font-black leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">Build Beautiful</span>
                <br />
                <span className="text-white">Digital Experiences</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300">
                I create full-stack web applications with elegant design, from React frontends to Python backends. Specializing in turning complex problems into intuitive user experiences.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-cyan-500/50 transition hover:-translate-y-1"
                >
                  View My Work →
                </a>
                <a
                  href="#skills"
                  className="rounded-lg border-2 border-slate-600 px-8 py-3.5 text-sm font-bold text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition"
                >
                  Explore Skills
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 blur-2xl opacity-30 group-hover:opacity-50 transition"></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl"></div>
                <img
                  src="/profile_image/profile-img.jfif"
                  alt="Julieanna - Full-Stack Developer"
                  className="relative h-96 w-96 rounded-3xl object-cover shadow-2xl ring-2 ring-cyan-400/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Expertise</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-white">My <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Technical Stack</span></h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">A comprehensive toolkit built through hands-on experience in full-stack development, design, and DevOps.</p>
          </div>

          {/* Enhanced Skills Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, items]) => {
              const categoryColors: { [key: string]: { bg: string; border: string; title: string; item: string } } = {
                "Programming Languages": { bg: "from-orange-900/30 to-amber-900/30", border: "border-orange-500/50", title: "text-orange-300", item: "bg-orange-900/40 text-orange-200 border-orange-600/50" },
                "Frontend": { bg: "from-blue-900/30 to-cyan-900/30", border: "border-blue-500/50", title: "text-blue-300", item: "bg-blue-900/40 text-blue-200 border-blue-600/50" },
                "Backend & APIs": { bg: "from-emerald-900/30 to-teal-900/30", border: "border-emerald-500/50", title: "text-emerald-300", item: "bg-emerald-900/40 text-emerald-200 border-emerald-600/50" },
                "Databases": { bg: "from-violet-900/30 to-purple-900/30", border: "border-violet-500/50", title: "text-violet-300", item: "bg-violet-900/40 text-violet-200 border-violet-600/50" },
                "Design": { bg: "from-pink-900/30 to-rose-900/30", border: "border-pink-500/50", title: "text-pink-300", item: "bg-pink-900/40 text-pink-200 border-pink-600/50" },
                "DevOps & Tools": { bg: "from-slate-700/30 to-gray-700/30", border: "border-slate-500/50", title: "text-slate-300", item: "bg-slate-700/40 text-slate-200 border-slate-600/50" },
                "Soft Skills": { bg: "from-indigo-900/30 to-blue-900/30", border: "border-indigo-500/50", title: "text-indigo-300", item: "bg-indigo-900/40 text-indigo-200 border-indigo-600/50" },
              };
              
              const colors = categoryColors[category] || { bg: "from-slate-700/30 to-slate-800/30", border: "border-slate-500/50", title: "text-slate-300", item: "bg-slate-700/40 text-slate-200 border-slate-600/50" };

              return (
                <div
                  key={category}
                  className={`rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} p-6 shadow-lg hover:shadow-xl transition-all hover:border-opacity-100 group`}
                >
                  <h3 className={`text-sm font-bold uppercase tracking-[0.15em] ${colors.title}`}>{category}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className={`inline-flex rounded-lg px-3 py-2 text-xs font-semibold transition-all hover:scale-105 cursor-default border ${colors.item}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="mb-16 flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Selected Work</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Featured <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="max-w-2xl text-lg text-slate-300">A collection of my best work spanning full-stack development, product design, and technical innovation.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredProjects.map((project, idx) => {
              const colors = [
                { border: "border-blue-500/50", accent: "from-blue-600 to-blue-400", label: "bg-blue-500/20 text-blue-300" },
                { border: "border-purple-500/50", accent: "from-purple-600 to-purple-400", label: "bg-purple-500/20 text-purple-300" },
                { border: "border-pink-500/50", accent: "from-pink-600 to-pink-400", label: "bg-pink-500/20 text-pink-300" },
              ][idx % 3];

              return (
                <article
                  key={project.name}
                  className={`group relative rounded-2xl border ${colors.border} bg-slate-800/50 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden`}
                >
                  {/* Gradient accent */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${colors.accent} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity pointer-events-none`}></div>

                  <div className="relative z-10">
                    <p className={`text-xs font-bold uppercase tracking-[0.15em] ${colors.label} px-3 py-1 w-fit rounded-full`}>{project.label}</p>
                    <h3 className="mt-5 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 group-hover:bg-clip-text transition">{project.name}</h3>
                    <p className="mt-2 text-sm font-semibold text-slate-400">{project.category}</p>
                    <p className="mt-4 text-base leading-relaxed text-slate-300">{project.summary}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={`${project.name}-${item}`}
                          className="rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-1.5 text-xs font-medium text-slate-200 group-hover:border-slate-500 transition"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex gap-3 pt-4 border-t border-slate-700/50">
                      <Link
                        href={project.demoHref}
                        className="flex-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition text-center"
                      >
                        View Demo
                      </Link>
                      <Link
                        href={project.caseHref}
                        className="flex-1 rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-bold text-slate-200 hover:border-slate-500 hover:bg-slate-700/50 transition text-center"
                      >
                        Case Study
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="theme-lab" className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400\">Design Explorations</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-white">Theme <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Lab Series</span></h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              A set of website concept demos across visual themes, showcasing my range in branding, layout, and interactive design.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {themeDemos.map((demo) => (
              <article key={demo.title} className="rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-6 hover:border-slate-600 hover:bg-slate-800/50 transition">
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">{demo.title}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-400">{demo.vibe}</p>
                <p className="mt-4 text-sm text-slate-300">{demo.focus}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-400">{demo.status}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="podmanager-demos" className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400\">PodManager.ai Internship</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-white">
              Product <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent\">Thinking In Action</span>
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              Key deliverables from my internship, showcasing applied product design and technical implementation in a real team environment.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {podManagerDemos.map((item) => (
                <article key={item.title} className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-6 hover:border-slate-600 hover:bg-slate-800/70 transition\">
                  <h3 className="text-lg font-bold text-cyan-300\">🎯 {item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300\">{item.impact}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-slate-700/50 bg-slate-950/50 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 text-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-1">Julie Anne Cantillep</p>
            <p className="text-slate-400">Full-Stack Developer & Designer. Always shipping.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="mailto:hello@example.com" className="font-semibold text-slate-300 hover:text-cyan-300 transition\">Email</a>
            <a href="https://github.com/Julieanna97" className="font-semibold text-slate-300 hover:text-cyan-300 transition\">GitHub</a>
            <a href="https://www.linkedin.com" className="font-semibold text-slate-300 hover:text-cyan-300 transition\">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
