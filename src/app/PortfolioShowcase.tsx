"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

type Theme = "night" | "cream";
type TimelineFilter = "all" | "work" | "ai" | "education";
type SkillGroup = "frontend" | "backend" | "systems" | "workflow";

type TimelineItem = {
  period: string;
  filter: Exclude<TimelineFilter, "all">;
  title: string;
  place: string;
  description: string;
};

type ProjectItem = {
  title: string;
  type: string;
  headline: string;
  description: string;
  stack: string[];
  impact: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
};

const timelineItems: TimelineItem[] = [
  {
    period: "May 2026 — Current",
    filter: "ai",
    title: "Quality Assurance Analyst",
    place: "OneForma.com",
    description:
      "Reviewing multilingual AI content with a focus on natural language quality, guideline accuracy, and consistent evaluation decisions.",
  },
  {
    period: "Jan 2026 — Current",
    filter: "ai",
    title: "AI Data Specialist",
    place: "Appen.com",
    description:
      "Supporting AI training and evaluation projects across text, audio, transcription review, labeling, and multilingual content checks.",
  },
  {
    period: "Sep 2025 — Apr 2026",
    filter: "work",
    title: "Fullstack Developer",
    place: "PodManager.ai",
    description:
      "Built browser-based audio and video editing workflows using React, TypeScript, backend APIs, clips, effects, and media processing tools.",
  },
  {
    period: "Sep 2024 — Jun 2025",
    filter: "ai",
    title: "AI Trainer / Coder",
    place: "Outlier",
    description:
      "Developed, reviewed, and improved AI model outputs while strengthening code quality, reasoning, and training feedback loops.",
  },
  {
    period: "Jan 2024 — Apr 2024",
    filter: "work",
    title: "Embedded Software Developer Intern",
    place: "Nodehill AB",
    description:
      "Implemented a LoRa communication system with ESP32 microcontrollers and LoRa modules for long-range wireless communication.",
  },
  {
    period: "Sep 2023 — Oct 2023",
    filter: "work",
    title: "Embedded Software Developer Intern",
    place: "Sigma Industry Evolution",
    description:
      "Contributed to an autonomous radio-controlled car project using Arduino, sensors, C/C++, and Python testing support.",
  },
  {
    period: "2026",
    filter: "education",
    title: "Fullstack Developer",
    place: "The Media Institute",
    description:
      "Graduating after studies in frontend, backend, databases, APIs, agile workflows, e-commerce, and LIA internships.",
  },
  {
    period: "2024",
    filter: "education",
    title: "Embedded Software Development",
    place: "Movant University of Applied Science",
    description:
      "Completed embedded software studies with project work in autonomous vehicles, sensors, and constrained hardware logic.",
  },
];

const projects: ProjectItem[] = [
  {
    title: "PracticePal",
    type: "SaaS Product",
    headline: "A polished practice planning product for musicians.",
    description:
      "PracticePal turns practice routines into structured sessions, plans, progress tracking, and subscription-ready product flows.",
    stack: ["Next.js", "MongoDB", "NextAuth", "Stripe"],
    impact: "Built like a real product launch, not just a school project.",
    links: [
      { label: "Open demo", href: "/projects/practicepal/landing" },
      { label: "GitHub", href: "https://github.com/Julieanna97/PracticePal", external: true },
    ],
  },
  {
    title: "PodManager.ai",
    type: "Media Tools",
    headline: "Audio and video editing workflows for podcast creators.",
    description:
      "Worked on waveform interfaces, track strips, clip logic, backend APIs, and media tooling for a creator-focused AI podcast platform.",
    stack: ["React", "TypeScript", "FastAPI", "FFmpeg"],
    impact: "Shows product engineering, complex UI work, and backend integration.",
    links: [{ label: "GitHub", href: "https://github.com/Julieanna97", external: true }],
  },
  {
    title: "Autonomous Car",
    type: "Embedded System",
    headline: "A sensor-driven car project with real hardware constraints.",
    description:
      "Worked with Arduino, sensors, C/C++, and Python tooling to support control logic, calibration, and reliable movement.",
    stack: ["Arduino", "C/C++", "Python", "Sensors"],
    impact: "Adds a rare systems angle to a fullstack portfolio.",
    links: [{ label: "GitHub", href: "https://github.com/Julieanna97", external: true }],
  },
];

const skillGroups: Record<SkillGroup, Array<{ name: string; note: string }>> = {
  frontend: [
    { name: "React", note: "component systems, state, interactive UI" },
    { name: "Next.js", note: "app router, routing, product flows" },
    { name: "TypeScript", note: "safer frontend and backend logic" },
    { name: "HTML / CSS", note: "responsive layout and visual polish" },
  ],
  backend: [
    { name: "Node.js / Express", note: "APIs, routes, auth, app logic" },
    { name: "FastAPI", note: "Python services and media workflows" },
    { name: "MongoDB", note: "schemas, persistence, app data" },
    { name: "REST APIs", note: "clear contracts between client and server" },
  ],
  systems: [
    { name: "C/C++", note: "embedded development foundations" },
    { name: "Arduino / ESP32", note: "sensor and microcontroller projects" },
    { name: "Python", note: "testing, scripting, automation" },
    { name: "LoRa", note: "long-range communication project work" },
  ],
  workflow: [
    { name: "Git / GitHub", note: "branching, pull requests, collaboration" },
    { name: "Docker", note: "local services and deployment habits" },
    { name: "Figma", note: "design communication and UI planning" },
    { name: "Jira / VS Code", note: "daily development workflow" },
  ],
};

const filters: TimelineFilter[] = ["all", "work", "ai", "education"];
const skillTabs: SkillGroup[] = ["frontend", "backend", "systems", "workflow"];

const highlights = [
  "Fullstack developer graduating in 2026",
  "React, Next.js, TypeScript, MongoDB, FastAPI",
  "Extra edge in embedded systems and AI evaluation",
  "Based in Sweden and open to SWE/product roles",
];

export default function PortfolioShowcase() {
  const [theme, setTheme] = useState<Theme>("night");
  const [filter, setFilter] = useState<TimelineFilter>("all");
  const [activeSkill, setActiveSkill] = useState<SkillGroup>("frontend");
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setMounted(true);
    const savedTheme = window.localStorage.getItem("julie-portfolio-theme");
    if (savedTheme === "night" || savedTheme === "cream") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("julie-portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const visibleTimeline = useMemo(() => {
    return timelineItems.filter((item) => filter === "all" || item.filter === filter);
  }, [filter]);

  const pageStyle: CSSProperties = {
    ["--bg" as string]: theme === "night" ? "#07050f" : "#fbf3e8",
    ["--bg-2" as string]: theme === "night" ? "#111021" : "#fffaf2",
    ["--text" as string]: theme === "night" ? "#fff7ed" : "#20160f",
    ["--muted" as string]: theme === "night" ? "rgba(255,247,237,.68)" : "rgba(32,22,15,.64)",
    ["--soft" as string]: theme === "night" ? "rgba(255,255,255,.075)" : "rgba(255,255,255,.72)",
    ["--strong" as string]: theme === "night" ? "rgba(255,255,255,.13)" : "rgba(255,255,255,.9)",
    ["--border" as string]: theme === "night" ? "rgba(255,255,255,.14)" : "rgba(32,22,15,.12)",
    ["--pink" as string]: "#ff4ecd",
    ["--blue" as string]: "#43d9ff",
    ["--yellow" as string]: "#ffe66d",
    ["--orange" as string]: "#ff8a3d",
    ["--green" as string]: "#62f2a8",
    ["--shadow" as string]: theme === "night" ? "rgba(0,0,0,.45)" : "rgba(74,45,19,.18)",
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("kisamae1997@gmail.com");
      setToast("Email copied ✨");
    } catch {
      setToast("kisamae1997@gmail.com");
    }
  };

  return (
    <main className={`portfolio-root ${mounted ? "is-mounted" : ""}`} style={pageStyle}>
      <style>{`
        html { scroll-behavior: smooth; background: var(--bg); }
        body {
          margin: 0;
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-geist-sans), Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        a { color: inherit; text-decoration: none; }
        button { font: inherit; }
        ::selection { background: var(--pink); color: white; }

        .portfolio-root {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(115deg, transparent 0 47%, rgba(255,255,255,.045) 47% 48%, transparent 48% 100%),
            radial-gradient(circle at 10% 8%, color-mix(in srgb, var(--pink) 26%, transparent), transparent 30%),
            radial-gradient(circle at 88% 16%, color-mix(in srgb, var(--blue) 22%, transparent), transparent 32%),
            radial-gradient(circle at 52% 90%, color-mix(in srgb, var(--orange) 20%, transparent), transparent 34%),
            var(--bg);
        }

        .portfolio-root::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .12;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(to bottom, black, transparent 78%);
        }

        .orb {
          position: fixed;
          width: 32vmax;
          height: 32vmax;
          border-radius: 999px;
          filter: blur(38px);
          opacity: .45;
          pointer-events: none;
          animation: floatOrb 16s ease-in-out infinite;
        }
        .orb-one { left: -12vmax; top: 18vh; background: var(--pink); }
        .orb-two { right: -14vmax; bottom: 2vh; background: var(--blue); animation-delay: -7s; }

        .page-wrap {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 22px;
        }

        .topbar {
          position: sticky;
          top: 14px;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: 28px;
          background: color-mix(in srgb, var(--bg-2) 82%, transparent);
          backdrop-filter: blur(22px) saturate(150%);
          box-shadow: 0 24px 80px -52px var(--shadow);
        }

        .identity {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .logo {
          width: 46px;
          height: 46px;
          border-radius: 17px;
          display: grid;
          place-items: center;
          color: #090711;
          font-weight: 950;
          letter-spacing: -.08em;
          background: conic-gradient(from 180deg, var(--pink), var(--yellow), var(--blue), var(--pink));
          box-shadow: 0 18px 34px -22px var(--shadow);
          flex: 0 0 auto;
        }

        .identity strong { display: block; letter-spacing: -.03em; }
        .identity span { display: block; margin-top: 2px; color: var(--muted); font-size: .86rem; }

        .nav {
          display: flex;
          gap: 8px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .nav a,
        .theme-btn,
        .btn,
        .chip-btn {
          border: 1px solid var(--border);
          background: var(--soft);
          color: var(--text);
          border-radius: 999px;
          cursor: pointer;
          transition: transform .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease;
        }

        .nav a {
          padding: 10px 13px;
          color: var(--muted);
          font-size: .9rem;
          font-weight: 750;
        }
        .nav a:hover,
        .theme-btn:hover,
        .btn:hover,
        .chip-btn:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--blue) 45%, var(--border)); }

        .theme-btn { padding: 11px 14px; font-weight: 850; }

        .hero {
          min-height: calc(100vh - 110px);
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(350px, .88fr);
          gap: 18px;
          align-items: stretch;
          padding: 22px 0;
        }

        .card {
          border: 1px solid var(--border);
          background: linear-gradient(180deg, var(--strong), var(--soft));
          backdrop-filter: blur(20px) saturate(145%);
          box-shadow: 0 30px 90px -60px var(--shadow);
        }

        .hero-main {
          border-radius: 38px;
          padding: clamp(28px, 5vw, 62px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .hero-main::after {
          content: "</>";
          position: absolute;
          right: clamp(16px, 4vw, 48px);
          bottom: clamp(12px, 4vw, 42px);
          font-size: clamp(5rem, 16vw, 14rem);
          line-height: .8;
          font-weight: 950;
          color: transparent;
          -webkit-text-stroke: 1px color-mix(in srgb, var(--text) 16%, transparent);
          opacity: .62;
          pointer-events: none;
        }

        .kicker {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--soft);
          color: var(--muted);
          font-size: .76rem;
          text-transform: uppercase;
          letter-spacing: .13em;
          font-weight: 900;
        }
        .kicker::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--green);
          box-shadow: 0 0 18px var(--green);
        }

        .hero h1 {
          max-width: 11ch;
          margin: 22px 0 18px;
          font-size: clamp(3.5rem, 8vw, 8.6rem);
          line-height: .86;
          letter-spacing: -.085em;
        }
        .gradient-text {
          background: linear-gradient(110deg, var(--pink), var(--yellow), var(--blue));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero-lede {
          max-width: 67ch;
          color: var(--muted);
          font-size: clamp(1rem, 1.3vw, 1.14rem);
          line-height: 1.85;
          margin: 0;
          position: relative;
          z-index: 2;
        }

        .hero-actions,
        .section-actions,
        .project-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hero-actions { margin-top: 28px; position: relative; z-index: 2; }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 17px;
          font-weight: 900;
        }
        .btn-primary {
          border-color: transparent;
          color: #080711;
          background: linear-gradient(120deg, var(--yellow), var(--blue));
          box-shadow: 0 24px 54px -34px var(--blue);
        }

        .hero-side {
          display: grid;
          gap: 18px;
        }

        .console-card {
          border-radius: 34px;
          padding: 20px;
          overflow: hidden;
        }
        .console-top {
          display: flex;
          gap: 7px;
          margin-bottom: 18px;
        }
        .dot { width: 12px; height: 12px; border-radius: 999px; }
        .dot:nth-child(1) { background: var(--pink); }
        .dot:nth-child(2) { background: var(--yellow); }
        .dot:nth-child(3) { background: var(--green); }

        .code-line {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
          font-family: var(--font-geist-mono), "SFMono-Regular", Consolas, monospace;
          font-size: .9rem;
        }
        .code-line:last-child { border-bottom: 0; }
        .code-line span:first-child { color: var(--muted); }
        .code-line b { color: var(--blue); font-weight: 800; }
        .code-line em { color: var(--yellow); font-style: normal; }

        .mini-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .mini-card {
          border-radius: 28px;
          padding: 18px;
          min-height: 130px;
          position: relative;
          overflow: hidden;
        }
        .mini-card::after {
          content: "";
          position: absolute;
          width: 80px;
          height: 80px;
          right: -24px;
          bottom: -24px;
          border-radius: 26px;
          rotate: 18deg;
          background: linear-gradient(135deg, var(--pink), var(--blue));
          opacity: .25;
        }
        .mini-label {
          color: var(--muted);
          font-size: .74rem;
          text-transform: uppercase;
          letter-spacing: .13em;
          font-weight: 900;
          margin-bottom: 10px;
        }
        .mini-value { font-weight: 950; letter-spacing: -.035em; font-size: 1.04rem; line-height: 1.35; }

        .marquee {
          width: 100%;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--soft);
          margin: 4px 0 24px;
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 28px;
          padding: 13px 18px;
          animation: marquee 28s linear infinite;
          color: var(--muted);
          font-weight: 850;
          white-space: nowrap;
        }
        .marquee-track span::before { content: "✦"; color: var(--pink); margin-right: 28px; }

        .section {
          margin: 18px 0;
          border-radius: 36px;
          padding: clamp(22px, 4vw, 42px);
        }
        .section-header {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 20px;
        }
        .section h2 {
          margin: 14px 0 0;
          font-size: clamp(2rem, 4vw, 4.2rem);
          line-height: .95;
          letter-spacing: -.065em;
          max-width: 12ch;
        }
        .section-copy {
          color: var(--muted);
          line-height: 1.75;
          max-width: 64ch;
          margin: 12px 0 0;
        }
        .chip-row { display: flex; flex-wrap: wrap; gap: 9px; }
        .chip-btn {
          padding: 10px 14px;
          color: var(--muted);
          text-transform: capitalize;
          font-weight: 900;
        }
        .chip-active {
          color: #090711;
          border-color: transparent;
          background: linear-gradient(120deg, var(--pink), var(--yellow));
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .project-card {
          border-radius: 30px;
          padding: 20px;
          min-height: 460px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .project-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--pink) 22%, transparent), transparent 30%),
            radial-gradient(circle at 86% 18%, color-mix(in srgb, var(--blue) 18%, transparent), transparent 34%);
          opacity: .85;
          pointer-events: none;
        }
        .project-number {
          position: relative;
          z-index: 1;
          width: 52px;
          height: 52px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          background: var(--soft);
          border: 1px solid var(--border);
          font-weight: 950;
        }
        .project-type {
          position: relative;
          z-index: 1;
          margin-top: 28px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: .13em;
          font-size: .74rem;
          font-weight: 950;
        }
        .project-card h3 {
          position: relative;
          z-index: 1;
          margin: 10px 0;
          font-size: clamp(1.55rem, 2.5vw, 2.25rem);
          line-height: 1;
          letter-spacing: -.055em;
        }
        .project-card p {
          position: relative;
          z-index: 1;
          color: var(--muted);
          line-height: 1.7;
        }
        .stack-row {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 14px 0;
        }
        .stack-pill {
          padding: 7px 10px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--soft);
          color: var(--muted);
          font-weight: 800;
          font-size: .8rem;
        }
        .impact {
          position: relative;
          z-index: 1;
          margin-top: auto;
          padding: 14px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: color-mix(in srgb, var(--strong) 80%, transparent);
          font-weight: 850;
          line-height: 1.45;
        }
        .project-links { position: relative; z-index: 1; margin-top: 14px; }
        .project-links a {
          border: 1px solid var(--border);
          background: var(--soft);
          border-radius: 999px;
          padding: 10px 13px;
          font-weight: 900;
        }

        .timeline-list {
          display: grid;
          gap: 12px;
        }
        .timeline-row {
          display: grid;
          grid-template-columns: 190px 1fr;
          gap: 18px;
          padding: 18px;
          border: 1px solid var(--border);
          border-radius: 26px;
          background: var(--soft);
          transition: transform .18s ease, border-color .18s ease;
        }
        .timeline-row:hover { transform: translateX(4px); border-color: color-mix(in srgb, var(--pink) 50%, var(--border)); }
        .timeline-period {
          color: var(--yellow);
          font-weight: 950;
          line-height: 1.35;
        }
        .timeline-content h3 {
          margin: 0;
          font-size: 1.18rem;
          letter-spacing: -.025em;
        }
        .timeline-place {
          color: var(--blue);
          font-weight: 850;
          margin-top: 4px;
        }
        .timeline-content p {
          margin: 10px 0 0;
          color: var(--muted);
          line-height: 1.7;
        }

        .skills-layout {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 16px;
        }
        .skill-tabs {
          display: grid;
          gap: 10px;
          align-content: start;
        }
        .skill-tab {
          width: 100%;
          text-align: left;
          padding: 16px;
          border: 1px solid var(--border);
          border-radius: 22px;
          background: var(--soft);
          color: var(--muted);
          cursor: pointer;
          font-weight: 950;
          text-transform: capitalize;
        }
        .skill-tab-active {
          color: #090711;
          background: linear-gradient(120deg, var(--blue), var(--green));
          border-color: transparent;
        }
        .skill-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .skill-card {
          border: 1px solid var(--border);
          border-radius: 24px;
          background: var(--soft);
          padding: 18px;
        }
        .skill-card strong {
          display: block;
          font-size: 1.1rem;
          margin-bottom: 8px;
        }
        .skill-card span {
          color: var(--muted);
          line-height: 1.65;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .contact-panel {
          border: 1px solid var(--border);
          border-radius: 30px;
          background: var(--soft);
          padding: 22px;
        }
        .contact-panel h3 {
          margin: 0 0 10px;
          font-size: 1.6rem;
          letter-spacing: -.045em;
        }
        .contact-panel p {
          color: var(--muted);
          line-height: 1.75;
          margin: 0;
        }
        .contact-links {
          display: grid;
          gap: 10px;
          margin-top: 18px;
        }
        .contact-link {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 15px;
          border: 1px solid var(--border);
          border-radius: 18px;
          background: color-mix(in srgb, var(--strong) 76%, transparent);
          font-weight: 900;
        }
        .contact-link span:last-child {
          color: var(--muted);
          font-weight: 750;
          text-align: right;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          color: var(--muted);
          padding: 22px 4px 10px;
          font-size: .92rem;
        }
        .toast {
          position: fixed;
          z-index: 50;
          left: 50%;
          bottom: 20px;
          transform: translateX(-50%);
          border: 1px solid var(--border);
          background: var(--bg-2);
          color: var(--text);
          border-radius: 999px;
          padding: 12px 16px;
          box-shadow: 0 24px 70px -42px var(--shadow);
          font-weight: 850;
        }

        .reveal {
          opacity: 0;
          transform: translateY(22px) scale(.985);
          filter: blur(8px);
          transition: opacity .7s ease, transform .7s ease, filter .7s ease;
        }
        .is-mounted .reveal { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        .delay-1 { transition-delay: .08s; }
        .delay-2 { transition-delay: .15s; }
        .delay-3 { transition-delay: .22s; }

        @keyframes floatOrb {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(24px,-18px,0) scale(1.08); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 1080px) {
          .hero,
          .skills-layout,
          .contact-grid { grid-template-columns: 1fr; }
          .project-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 760px) {
          .page-wrap { padding: 14px; }
          .topbar { position: relative; top: auto; align-items: flex-start; border-radius: 24px; }
          .nav { display: none; }
          .identity span { display: none; }
          .hero { min-height: auto; padding-top: 14px; }
          .hero-main,
          .section { border-radius: 28px; }
          .mini-grid,
          .project-grid,
          .skill-grid { grid-template-columns: 1fr; }
          .section-header { align-items: flex-start; flex-direction: column; }
          .timeline-row { grid-template-columns: 1fr; }
          .contact-link { flex-direction: column; }
          .contact-link span:last-child { text-align: left; }
        }
        @media (prefers-reduced-motion: reduce) {
          .orb,
          .marquee-track { animation: none; }
          .reveal,
          .nav a,
          .theme-btn,
          .btn,
          .chip-btn,
          .timeline-row { transition: none; }
        }
      `}</style>

      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <div className="page-wrap">
        <header className="topbar reveal">
          <Link className="identity" href="#top" aria-label="Go to top">
            <div className="logo">JA</div>
            <div>
              <strong>Julie Anne Cantillep</strong>
              <span>Fullstack Developer · Embedded Systems · AI Workflows</span>
            </div>
          </Link>

          <nav className="nav" aria-label="Portfolio sections">
            <a href="#work">Work</a>
            <a href="#timeline">Timeline</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>

          <button
            type="button"
            className="theme-btn"
            onClick={() => setTheme((current) => (current === "night" ? "cream" : "night"))}
            aria-label="Toggle portfolio theme"
          >
            {theme === "night" ? "Cream mode" : "Night mode"}
          </button>
        </header>

        <section className="hero" id="top">
          <div className="hero-main card reveal delay-1">
            <div>
              <div className="kicker">Available for product-minded engineering roles</div>
              <h1>
                I build <span className="gradient-text">useful things</span> with personality.
              </h1>
              <p className="hero-lede">
                I am a fullstack developer with an unusual mix: polished web interfaces, backend APIs,
                embedded systems experience, and AI evaluation work. My sweet spot is turning messy ideas
                into clean, visual, working products.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="mailto:kisamae1997@gmail.com">Start a conversation</a>
                <a className="btn" href="#work">View projects</a>
                <button className="btn" type="button" onClick={copyEmail}>Copy email</button>
              </div>
            </div>
          </div>

          <aside className="hero-side reveal delay-2">
            <div className="console-card card">
              <div className="console-top" aria-hidden="true">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <div className="code-line"><span>01</span><div>const developer = <b>"Julie Anne"</b>;</div></div>
              <div className="code-line"><span>02</span><div>focus: <em>"fullstack + product UI"</em></div></div>
              <div className="code-line"><span>03</span><div>edge: <em>"embedded + AI QA"</em></div></div>
              <div className="code-line"><span>04</span><div>location: <b>"Sweden"</b></div></div>
              <div className="code-line"><span>05</span><div>status: <em>"open to roles"</em></div></div>
            </div>

            <div className="mini-grid">
              <div className="mini-card card">
                <div className="mini-label">Signature stack</div>
                <div className="mini-value">Next.js · React · TypeScript · MongoDB</div>
              </div>
              <div className="mini-card card">
                <div className="mini-label">Portfolio angle</div>
                <div className="mini-value">Creative frontend with real engineering depth</div>
              </div>
              <div className="mini-card card">
                <div className="mini-label">Contact</div>
                <div className="mini-value">kisamae1997@gmail.com</div>
              </div>
              <div className="mini-card card">
                <div className="mini-label">Best fit</div>
                <div className="mini-value">SWE · Product Engineer · Frontend-heavy Fullstack</div>
              </div>
            </div>
          </aside>
        </section>

        <div className="marquee reveal delay-2" aria-label="Portfolio highlights">
          <div className="marquee-track">
            {[...highlights, ...highlights].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="section card reveal delay-1" id="work">
          <div className="section-header">
            <div>
              <div className="kicker">Selected work</div>
              <h2>Proof that I can ship.</h2>
              <p className="section-copy">
                Instead of showing everything at once, this section presents three strong stories:
                a SaaS product, a media tooling internship, and an embedded systems project.
              </p>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card card" key={project.title}>
                <div className="project-number">0{index + 1}</div>
                <div className="project-type">{project.type}</div>
                <h3>{project.title}</h3>
                <p><strong>{project.headline}</strong></p>
                <p>{project.description}</p>
                <div className="stack-row">
                  {project.stack.map((tech) => (
                    <span className="stack-pill" key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="impact">{project.impact}</div>
                <div className="project-links">
                  {project.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section card reveal delay-2" id="timeline">
          <div className="section-header">
            <div>
              <div className="kicker">Experience timeline</div>
              <h2>A path with range.</h2>
              <p className="section-copy">
                Your story is not only fullstack. The embedded and AI experience makes the profile more memorable,
                so this layout makes that range easy to understand quickly.
              </p>
            </div>
            <div className="chip-row" aria-label="Timeline filters">
              {filters.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`chip-btn ${filter === item ? "chip-active" : ""}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="timeline-list">
            {visibleTimeline.map((item) => (
              <article className="timeline-row" key={`${item.period}-${item.title}`}>
                <div className="timeline-period">{item.period}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <div className="timeline-place">{item.place}</div>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section card reveal delay-2" id="skills">
          <div className="section-header">
            <div>
              <div className="kicker">Skill map</div>
              <h2>Organized by how I build.</h2>
              <p className="section-copy">
                Clean categories make the stack easier to scan and avoid the typical portfolio wall of random logos.
              </p>
            </div>
          </div>

          <div className="skills-layout">
            <div className="skill-tabs" aria-label="Skill groups">
              {skillTabs.map((tab) => (
                <button
                  type="button"
                  className={`skill-tab ${activeSkill === tab ? "skill-tab-active" : ""}`}
                  key={tab}
                  onClick={() => setActiveSkill(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="skill-grid">
              {skillGroups[activeSkill].map((skill) => (
                <div className="skill-card" key={skill.name}>
                  <strong>{skill.name}</strong>
                  <span>{skill.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section card reveal delay-3" id="contact">
          <div className="section-header">
            <div>
              <div className="kicker">Contact</div>
              <h2>Let’s make the next thing clear and useful.</h2>
              <p className="section-copy">
                This ending is direct, recruiter-friendly, and still visually consistent with the rest of the portfolio.
              </p>
            </div>
            <div className="section-actions">
              <button className="btn btn-primary" type="button" onClick={copyEmail}>Copy email</button>
              <a className="btn" href="mailto:kisamae1997@gmail.com">Send email</a>
            </div>
          </div>

          <div className="contact-grid">
            <div className="contact-panel">
              <h3>Quick links</h3>
              <p>For recruiters, collaborators, and internship contacts who want the fastest next step.</p>
              <div className="contact-links">
                <a className="contact-link" href="mailto:kisamae1997@gmail.com">
                  <span>Email</span><span>kisamae1997@gmail.com</span>
                </a>
                <a className="contact-link" href="tel:+46760393202">
                  <span>Phone</span><span>+46 760 393 202</span>
                </a>
                <a className="contact-link" href="https://www.linkedin.com/in/julie-anne-cantillep-4ba4ab250/" target="_blank" rel="noopener noreferrer">
                  <span>LinkedIn</span><span>Open profile</span>
                </a>
                <a className="contact-link" href="https://github.com/Julieanna97" target="_blank" rel="noopener noreferrer">
                  <span>GitHub</span><span>Open profile</span>
                </a>
              </div>
            </div>

            <div className="contact-panel">
              <h3>What this portfolio says</h3>
              <p>
                It presents you as a developer who can think visually, build fullstack products, understand real systems,
                and work with AI workflows. That combination is more distinctive than a standard developer portfolio.
              </p>
              <div className="contact-links">
                <div className="contact-link"><span>Style</span><span>Creative operating-system aesthetic</span></div>
                <div className="contact-link"><span>Signal</span><span>Product + frontend + systems</span></div>
                <div className="contact-link"><span>Theme</span><span>{theme === "night" ? "Night mode active" : "Cream mode active"}</span></div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>Julie Anne Cantillep · Portfolio 2026</span>
          <span>Designed to feel bold, useful, and memorable.</span>
        </footer>
      </div>

      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  );
}
