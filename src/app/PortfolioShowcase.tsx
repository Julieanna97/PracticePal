"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useRef, type CSSProperties } from "react";

type Mode = "dark" | "light";
type TimelineFilter = "all" | "work" | "product" | "ai" | "education";
type SkillCategory = "frontend" | "backend" | "systems" | "tooling";

type TimelineItem = {
  year: string;
  category: Exclude<TimelineFilter, "all">;
  title: string;
  subtitle: string;
  detail: string;
};

type ProjectItem = {
  name: string;
  category: string;
  summary: string;
  num: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
  bullets: string[];
  tags: string[];
};

const timelineItems: TimelineItem[] = [
  {
    year: "Sep–Oct 2023",
    category: "work",
    title: "Embedded Software Developer Intern",
    subtitle: "Sigma Industry Evolution",
    detail:
      "Built part of an autonomous radio-controlled car project using Arduino, sensors, C/C++, and Python.",
  },
  {
    year: "Jan–Apr 2024",
    category: "work",
    title: "Embedded Software Developer Intern",
    subtitle: "Nodehill AB",
    detail:
      "Implemented a LoRa communication system using ESP32 microcontrollers and LoRa modules for long-range wireless communication.",
  },
  {
    year: "Sep 2024–Jun 2025",
    category: "ai",
    title: "AI Trainer (Coder)",
    subtitle: "Outlier",
    detail:
      "Developed, reviewed, and optimized AI model outputs, improved training quality, and supported cross-functional AI workflows.",
  },
  {
    year: "Sep 2025–Apr 2026",
    category: "product",
    title: "Fullstack Developer",
    subtitle: "PodManager.ai",
    detail:
      "Built and improved browser-based audio and video editing tools with React, TypeScript, and backend APIs for clips, effects, and processing workflows.",
  },
  {
    year: "May 2026–Current",
    category: "ai",
    title: "Quality Assurance Analyst",
    subtitle: "OneForma.com",
    detail:
      "Reviewed and improved multilingual AI content while applying QA guidelines, natural language quality checks, and workflow consistency standards.",
  },
  {
    year: "Jan 2026–Current",
    category: "ai",
    title: "AI Data Specialist",
    subtitle: "Appen.com",
    detail:
      "Worked on AI training and evaluation projects involving text, audio, and multilingual data, including transcription review, data labeling, and content evaluation.",
  },
  {
    year: "2026",
    category: "education",
    title: "Fullstack Developer",
    subtitle: "The Media Institute",
    detail:
      "Graduating in 2026 after training in frontend, backend, databases, APIs, agile development, e-commerce, and LIA internships.",
  },
  {
    year: "2024",
    category: "education",
    title: "Embedded Software Development",
    subtitle: "Movant University of Applied Science",
    detail:
      "Completed studies in embedded software development and contributed to an autonomous car project during the program.",
  },
];

const projectItems: ProjectItem[] = [
  {
    name: "PracticePal",
    category: "Full Product",
    summary:
      "A practice planning and analytics product for musicians, built with auth, sessions, plans, and subscriptions.",
    num: "01",
    links: [
      { label: "Open Demo", href: "/projects/practicepal/landing" },
      { label: "GitHub", href: "https://github.com/Julieanna97/PracticePal", external: true },
    ],
    bullets: [
      "Next.js app router with MongoDB and NextAuth",
      "Stripe subscription flows and webhook syncing",
      "A product story that feels like a real SaaS launch",
    ],
    tags: ["Next.js", "MongoDB", "Stripe", "NextAuth"],
  },
  {
    name: "PodManager.ai",
    category: "Internship",
    summary:
      "Podcast editing workflows with waveform controls, track strips, and backend APIs for clips and effects.",
    num: "02",
    links: [{ label: "GitHub", href: "https://github.com/Julieanna97", external: true }],
    bullets: [
      "React + TypeScript interface work",
      "WaveSurfer-style editing and track logic",
      "FastAPI and Node.js services behind media tooling",
    ],
    tags: ["React", "TypeScript", "FastAPI", "FFmpeg"],
  },
  {
    name: "Sigma Autonomous Car",
    category: "Embedded",
    summary:
      "An Arduino-based autonomous car project focused on sensor input, control loops, and path reliability.",
    num: "03",
    links: [{ label: "GitHub", href: "https://github.com/Julieanna97", external: true }],
    bullets: [
      "Sensor calibration and data fusion",
      "C/C++ firmware with Python testing tools",
      "Constrained hardware problem solving",
    ],
    tags: ["Arduino", "C/C++", "Python", "RTOS/Zephyr"],
  },
];

const skillMap: Record<SkillCategory, Array<{ name: string; level: number; note: string }>> = {
  frontend: [
    { name: "React", level: 92, note: "interfaces that feel alive" },
    { name: "Next.js", level: 90, note: "app router and product flows" },
    { name: "TypeScript", level: 88, note: "safer UI and data logic" },
    { name: "HTML / CSS", level: 95, note: "visual polish and layout control" },
  ],
  backend: [
    { name: "Node.js / Express", level: 84, note: "API and server logic" },
    { name: "FastAPI", level: 82, note: "clean backend services" },
    { name: "MongoDB", level: 80, note: "models and persistence" },
    { name: "REST APIs", level: 90, note: "clear integration contracts" },
  ],
  systems: [
    { name: "C/C++", level: 80, note: "embedded control work" },
    { name: "Arduino / ESP32", level: 84, note: "sensor and device logic" },
    { name: "RTOS / Zephyr", level: 70, note: "low-level systems mindset" },
    { name: "Python", level: 86, note: "testing and automation" },
  ],
  tooling: [
    { name: "Git / GitHub", level: 92, note: "collaboration and reviews" },
    { name: "Docker / Azure", level: 76, note: "deployment-ready habits" },
    { name: "Figma", level: 78, note: "design communication" },
    { name: "Jira / VS Code", level: 88, note: "shipping with discipline" },
  ],
};

const timelineFilters: TimelineFilter[] = ["all", "work", "product", "ai", "education"];
const skillCategories: SkillCategory[] = ["frontend", "backend", "systems", "tooling"];

const categoryColors: Record<Exclude<TimelineFilter, "all">, string> = {
  work: "#c8a26b",
  product: "#8fb8a0",
  ai: "#b09ec2",
  education: "#c97a6a",
};

export default function PortfolioShowcase() {
  const [mode, setMode] = useState<Mode>("dark");
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>("all");
  const [activeSkillCategory, setActiveSkillCategory] = useState<SkillCategory>("frontend");
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState("");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedMode = window.localStorage.getItem("portfolio-mode-v2");
    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setMode(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-mode-v2", mode);
  }, [mode]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredTimeline = useMemo(() => {
    return timelineItems.filter((item) => timelineFilter === "all" || item.category === timelineFilter);
  }, [timelineFilter]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("kisamae1997@gmail.com");
      setToast("Email copied.");
    } catch {
      setToast("kisamae1997@gmail.com");
    }
  };

  const isDark = mode === "dark";

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink: ${isDark ? "#f0e8d8" : "#1a150d"};
      --ink2: ${isDark ? "#b8a98a" : "#4a3f2f"};
      --ink3: ${isDark ? "#7a6e5a" : "#8a7a66"};
      --bg: ${isDark ? "#0f0d0a" : "#f5f0e8"};
      --bg2: ${isDark ? "#1a1710" : "#ede8dc"};
      --bg3: ${isDark ? "#252015" : "#e3ddd0"};
      --border: ${isDark ? "rgba(240,232,216,0.1)" : "rgba(26,21,13,0.12)"};
      --border2: ${isDark ? "rgba(240,232,216,0.18)" : "rgba(26,21,13,0.2)"};
      --gold: #c8a26b;
      --gold2: #a07840;
      --sage: #8fb8a0;
      --blush: #c97a6a;
      --lavender: #b09ec2;
      --accent: ${isDark ? "#c8a26b" : "#a07840"};
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--ink);
      font-family: 'Instrument Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }

    a { color: inherit; text-decoration: none; }
    button, input { font: inherit; }

    ::selection { background: var(--gold); color: #1a150d; }

    /* ── LAYOUT ── */
    .pf-wrap {
      min-height: 100vh;
      position: relative;
    }

    /* grain overlay */
    .pf-wrap::before {
      content: "";
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: ${isDark ? 0.4 : 0.25};
    }

    .pf-inner {
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 32px 80px;
    }

    /* ── TICKER ── */
    .ticker-wrap {
      overflow: hidden;
      border-bottom: 1px solid var(--border2);
      background: var(--gold);
      padding: 10px 0;
    }

    .ticker-inner {
      display: flex;
      gap: 0;
      animation: ticker 28s linear infinite;
      white-space: nowrap;
    }

    .ticker-item {
      display: inline-flex;
      align-items: center;
      gap: 24px;
      padding: 0 32px;
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem;
      font-weight: 500;
      color: #1a150d;
      text-transform: uppercase;
      letter-spacing: 0.14em;
    }

    .ticker-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #1a150d;
      flex-shrink: 0;
      opacity: 0.5;
    }

    @keyframes ticker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* ── TOPBAR ── */
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid var(--border);
    }

    .brand-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .brand-tagline {
      font-family: 'DM Mono', monospace;
      font-size: 0.68rem;
      color: var(--ink3);
      letter-spacing: 0.1em;
      margin-top: 2px;
    }

    .topnav {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .topnav a {
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink2);
      padding: 8px 14px;
      border: 1px solid transparent;
      transition: border-color 0.2s, color 0.2s;
    }

    .topnav a:hover {
      border-color: var(--border2);
      color: var(--ink);
    }

    .mode-btn {
      margin-left: 16px;
      background: none;
      border: 1px solid var(--border2);
      color: var(--ink2);
      cursor: pointer;
      padding: 8px 16px;
      font-family: 'DM Mono', monospace;
      font-size: 0.68rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      transition: background 0.2s, color 0.2s;
    }

    .mode-btn:hover {
      background: var(--border);
      color: var(--ink);
    }

    /* ── HERO ── */
    .hero {
      padding: 60px 0 0;
      position: relative;
    }

    .hero-eyebrow {
      font-family: 'DM Mono', monospace;
      font-size: 0.68rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .hero-eyebrow::before {
      content: "";
      display: block;
      width: 32px;
      height: 1px;
      background: var(--accent);
    }

    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(4.5rem, 9vw, 11rem);
      line-height: 0.9;
      letter-spacing: -0.03em;
      font-weight: 900;
      color: var(--ink);
      max-width: 14ch;
    }

    .hero-title em {
      font-style: italic;
      color: var(--accent);
    }

    .hero-split {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 48px;
      align-items: end;
      margin-top: 48px;
      padding-bottom: 48px;
      border-bottom: 1px solid var(--border);
    }

    .hero-desc {
      font-size: 1.05rem;
      line-height: 1.85;
      color: var(--ink2);
      max-width: 56ch;
    }

    .hero-desc strong {
      color: var(--ink);
      font-weight: 600;
    }

    .hero-aside-block {
      display: grid;
      gap: 20px;
    }

    .signal-item {
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }

    .signal-item:last-child { border-bottom: none; padding-bottom: 0; }

    .signal-key {
      font-family: 'DM Mono', monospace;
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--ink3);
      margin-bottom: 4px;
    }

    .signal-val {
      font-size: 0.92rem;
      color: var(--ink);
      font-weight: 500;
    }

    .hero-cta-row {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      margin-top: 32px;
      align-items: center;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      background: var(--accent);
      color: #1a150d;
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
    }

    .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 24px;
      background: none;
      color: var(--ink2);
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem;
      font-weight: 400;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      border: 1px solid var(--border2);
      cursor: pointer;
      transition: color 0.2s, border-color 0.2s;
    }

    .btn-ghost:hover { color: var(--ink); border-color: var(--ink3); }

    /* ── SECTION HEADER ── */
    .sec-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 32px;
      padding: 56px 0 32px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 40px;
    }

    .sec-label {
      font-family: 'DM Mono', monospace;
      font-size: 0.62rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--ink3);
      margin-bottom: 12px;
    }

    .sec-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 4vw, 4rem);
      font-weight: 900;
      line-height: 1.0;
      letter-spacing: -0.03em;
      color: var(--ink);
    }

    .sec-title em {
      font-style: italic;
      color: var(--accent);
    }

    /* ── TIMELINE ── */
    .filter-tabs {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .filter-tab {
      padding: 8px 16px;
      background: none;
      border: 1px solid var(--border);
      color: var(--ink3);
      font-family: 'DM Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-tab:hover { border-color: var(--border2); color: var(--ink2); }

    .filter-tab-active {
      background: var(--accent);
      border-color: var(--accent);
      color: #1a150d;
    }

    .timeline-list {
      display: grid;
      gap: 0;
    }

    .tl-row {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 0;
      border-bottom: 1px solid var(--border);
      padding: 28px 0;
      transition: background 0.2s;
    }

    .tl-row:hover { background: var(--bg2); margin: 0 -32px; padding: 28px 32px; }

    .tl-left {
      padding-right: 24px;
    }

    .tl-year {
      font-family: 'DM Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      color: var(--ink3);
      margin-bottom: 8px;
    }

    .tl-cat-dot {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: 'DM Mono', monospace;
      font-size: 0.62rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .tl-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .tl-right {}

    .tl-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 4px;
    }

    .tl-sub {
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      color: var(--accent);
      letter-spacing: 0.08em;
      margin-bottom: 10px;
    }

    .tl-detail {
      font-size: 0.92rem;
      color: var(--ink2);
      line-height: 1.75;
      max-width: 64ch;
    }

    /* ── PROJECTS ── */
    .projects-list {
      display: grid;
      gap: 0;
    }

    .proj-row {
      display: grid;
      grid-template-columns: 80px 1fr 1fr auto;
      gap: 32px;
      align-items: start;
      border-bottom: 1px solid var(--border);
      padding: 36px 0;
      transition: background 0.25s;
      cursor: default;
    }

    .proj-row:hover {
      background: var(--bg2);
      margin: 0 -32px;
      padding: 36px 32px;
    }

    .proj-num {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      font-weight: 900;
      color: var(--border2);
      line-height: 1;
      transition: color 0.25s;
    }

    .proj-row:hover .proj-num {
      color: var(--accent);
    }

    .proj-main {}

    .proj-cat {
      font-family: 'DM Mono', monospace;
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--ink3);
      margin-bottom: 10px;
    }

    .proj-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.9rem;
      font-weight: 900;
      color: var(--ink);
      line-height: 1.05;
      margin-bottom: 12px;
    }

    .proj-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .proj-tag {
      font-family: 'DM Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ink3);
      border: 1px solid var(--border2);
      padding: 4px 10px;
    }

    .proj-detail {}

    .proj-summary {
      font-size: 0.9rem;
      color: var(--ink2);
      line-height: 1.75;
      margin-bottom: 16px;
    }

    .proj-bullets {
      list-style: none;
      display: grid;
      gap: 6px;
    }

    .proj-bullets li {
      font-size: 0.86rem;
      color: var(--ink3);
      line-height: 1.6;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .proj-bullets li::before {
      content: "→";
      color: var(--accent);
      flex-shrink: 0;
      margin-top: 1px;
    }

    .proj-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-end;
      padding-top: 4px;
    }

    .proj-link {
      font-family: 'DM Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ink2);
      border: 1px solid var(--border2);
      padding: 8px 16px;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .proj-link:hover {
      background: var(--accent);
      border-color: var(--accent);
      color: #1a150d;
    }

    /* ── SKILLS ── */
    .skills-layout {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 48px;
    }

    .skill-tabs-list {
      display: grid;
      gap: 0;
    }

    .skill-tab {
      padding: 16px 0;
      border-bottom: 1px solid var(--border);
      background: none;
      border-left: none;
      border-right: none;
      border-top: none;
      color: var(--ink3);
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: color 0.2s;
    }

    .skill-tab:hover { color: var(--ink2); }

    .skill-tab-active {
      color: var(--ink);
      font-weight: 500;
    }

    .skill-tab-active::after {
      content: "→";
      color: var(--accent);
    }

    .skills-content {}

    .skill-bar-row {
      padding: 20px 0;
      border-bottom: 1px solid var(--border);
    }

    .skill-bar-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 12px;
    }

    .skill-bar-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--ink);
    }

    .skill-bar-meta {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .skill-bar-note {
      font-family: 'DM Mono', monospace;
      font-size: 0.62rem;
      letter-spacing: 0.1em;
      color: var(--ink3);
      font-style: italic;
    }

    .skill-bar-pct {
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      color: var(--accent);
      font-weight: 500;
    }

    .skill-track {
      width: 100%;
      height: 2px;
      background: var(--border2);
      position: relative;
    }

    .skill-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: var(--accent);
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ── CONTACT ── */
    .contact-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      border: 1px solid var(--border2);
    }

    .contact-left {
      padding: 48px;
      border-right: 1px solid var(--border2);
    }

    .contact-right {
      padding: 48px;
    }

    .contact-big-name {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.5rem, 5vw, 5.5rem);
      font-weight: 900;
      line-height: 0.9;
      letter-spacing: -0.03em;
      color: var(--ink);
      margin-bottom: 32px;
    }

    .contact-big-name em {
      font-style: italic;
      color: var(--accent);
    }

    .contact-desc {
      font-size: 0.95rem;
      color: var(--ink2);
      line-height: 1.8;
      max-width: 44ch;
      margin-bottom: 36px;
    }

    .contact-links-list {
      display: grid;
      gap: 0;
    }

    .contact-link-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid var(--border);
      transition: padding-left 0.2s;
    }

    .contact-link-row:hover { padding-left: 8px; }
    .contact-link-row:last-child { border-bottom: none; }

    .contact-link-label {
      font-family: 'DM Mono', monospace;
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--ink3);
    }

    .contact-link-val {
      font-size: 0.9rem;
      color: var(--ink);
      font-weight: 500;
    }

    .contact-right-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .contact-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1px;
      background: var(--border);
      border: 1px solid var(--border);
      margin-bottom: 32px;
    }

    .contact-meta-cell {
      padding: 20px 22px;
      background: var(--bg);
    }

    .contact-meta-key {
      font-family: 'DM Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--ink3);
      margin-bottom: 6px;
    }

    .contact-meta-val {
      font-size: 0.88rem;
      color: var(--ink);
      font-weight: 500;
      line-height: 1.5;
    }

    .availability-banner {
      background: ${isDark ? "rgba(200,162,107,0.12)" : "rgba(160,120,64,0.1)"};
      border: 1px solid ${isDark ? "rgba(200,162,107,0.3)" : "rgba(160,120,64,0.25)"};
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .avail-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--sage);
      flex-shrink: 0;
      box-shadow: 0 0 0 3px ${isDark ? "rgba(143,184,160,0.2)" : "rgba(143,184,160,0.3)"};
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 3px rgba(143,184,160,0.2); }
      50% { box-shadow: 0 0 0 6px rgba(143,184,160,0.1); }
    }

    .avail-text {
      font-family: 'DM Mono', monospace;
      font-size: 0.68rem;
      letter-spacing: 0.12em;
      color: var(--ink2);
    }

    .avail-text strong {
      color: var(--sage);
    }

    /* ── FOOTER ── */
    .pf-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 0 0;
      border-top: 1px solid var(--border);
      margin-top: 64px;
    }

    .footer-left {
      font-family: 'DM Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      color: var(--ink3);
    }

    .footer-right {
      font-family: 'DM Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      color: var(--ink3);
    }

    /* ── TOAST ── */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10000;
      background: var(--accent);
      color: #1a150d;
      font-family: 'DM Mono', monospace;
      font-size: 0.68rem;
      letter-spacing: 0.12em;
      padding: 12px 20px;
    }

    /* ── ANIMATIONS ── */
    .fade-up {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }

    .mounted .fade-up { opacity: 1; transform: translateY(0); }
    .mounted .d1 { transition-delay: 0.05s; }
    .mounted .d2 { transition-delay: 0.12s; }
    .mounted .d3 { transition-delay: 0.2s; }
    .mounted .d4 { transition-delay: 0.28s; }
    .mounted .d5 { transition-delay: 0.36s; }

    /* ── RESPONSIVE ── */
    @media (max-width: 1100px) {
      .hero-split { grid-template-columns: 1fr; }
      .proj-row { grid-template-columns: 60px 1fr; grid-template-rows: auto auto auto; }
      .proj-detail { grid-column: 2; }
      .proj-links { grid-column: 2; flex-direction: row; align-items: flex-start; }
      .contact-layout { grid-template-columns: 1fr; }
      .contact-left { border-right: none; border-bottom: 1px solid var(--border2); }
      .skills-layout { grid-template-columns: 1fr; }
      .skill-tabs-list { flex-direction: row; display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
      .skill-tab { padding: 10px 16px; border: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    }

    @media (max-width: 768px) {
      .pf-inner { padding: 0 20px 60px; }
      .topnav { display: none; }
      .tl-row { grid-template-columns: 1fr; }
      .tl-left { margin-bottom: 8px; }
      .proj-row { grid-template-columns: 1fr; }
      .proj-num { display: none; }
      .contact-meta-grid { grid-template-columns: 1fr; }
    }

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `;

  const tickerContent = [
    "Fullstack Developer",
    "Embedded Systems",
    "AI Workflows",
    "Malmö, Sweden",
    "Open to SWE Roles",
    "React · Next.js · TypeScript",
    "C/C++ · Arduino · ESP32",
    "MongoDB · FastAPI · Stripe",
  ];

  return (
    <main className={`pf-wrap ${mounted ? "mounted" : ""}`}>
      <style>{css}</style>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-inner" ref={tickerRef}>
          {[...tickerContent, ...tickerContent].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      <div className="pf-inner">
        {/* Topbar */}
        <header className="topbar fade-up d1">
          <div>
            <div className="brand-name">Julie Anne Cantillep</div>
            <div className="brand-tagline">Portfolio · 2026</div>
          </div>
          <nav className="topnav">
            <a href="#timeline">Timeline</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
          <button
            type="button"
            className="mode-btn"
            onClick={() => setMode((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            {mode === "dark" ? "Light" : "Dark"}
          </button>
        </header>

        {/* Hero */}
        <section className="hero">
          <div className="hero-eyebrow fade-up d1">
            Fullstack · Embedded · AI QA
          </div>

          <h1 className="hero-title fade-up d2">
            Julie.<br /><em>Anne.</em><br />Cantillep.
          </h1>

          <div className="hero-split fade-up d3">
            <div>
              <p className="hero-desc">
                I build <strong>thoughtful interfaces</strong>, reliable backend flows, and embedded projects that connect design intuition with technical depth. From React component systems to LoRa wireless communication — I work across the full stack with a consistent eye for craft.
              </p>
              <div className="hero-cta-row">
                <a className="btn-primary" href="mailto:kisamae1997@gmail.com">
                  Get in touch ↗
                </a>
                <a className="btn-ghost" href="#projects">
                  View work →
                </a>
                <button type="button" className="btn-ghost" onClick={handleCopyEmail}>
                  Copy email
                </button>
              </div>
            </div>

            <div className="hero-aside-block">
              {[
                { k: "Status", v: "Open to SWE and product roles" },
                { k: "Location", v: "Malmö, Sweden" },
                { k: "Primary stack", v: "Next.js, React, TypeScript" },
                { k: "Reply time", v: "Within 24 hours" },
              ].map((s) => (
                <div key={s.k} className="signal-item">
                  <div className="signal-key">{s.k}</div>
                  <div className="signal-val">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline">
          <div className="sec-header fade-up d3">
            <div>
              <div className="sec-label">Career arc</div>
              <h2 className="sec-title">Work &amp;<br /><em>Education.</em></h2>
            </div>
            <div className="filter-tabs">
              {timelineFilters.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`filter-tab ${timelineFilter === f ? "filter-tab-active" : ""}`}
                  onClick={() => setTimelineFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="timeline-list fade-up d4">
            {filteredTimeline.map((item) => (
              <div key={`${item.year}-${item.title}`} className="tl-row">
                <div className="tl-left">
                  <div className="tl-year">{item.year}</div>
                  <div
                    className="tl-cat-dot"
                    style={{ color: categoryColors[item.category] }}
                  >
                    <span
                      className="tl-dot"
                      style={{ background: categoryColors[item.category] }}
                    />
                    {item.category}
                  </div>
                </div>
                <div className="tl-right">
                  <div className="tl-title">{item.title}</div>
                  <div className="tl-sub">{item.subtitle}</div>
                  <div className="tl-detail">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <div className="sec-header fade-up d3">
            <div>
              <div className="sec-label">Selected work</div>
              <h2 className="sec-title">Three<br /><em>Projects.</em></h2>
            </div>
          </div>

          <div className="projects-list fade-up d4">
            {projectItems.map((project, idx) => (
              <article
                key={project.name}
                className="proj-row"
                onMouseEnter={() => setHoveredProject(idx)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="proj-num">{project.num}</div>

                <div className="proj-main">
                  <div className="proj-cat">{project.category}</div>
                  <h3 className="proj-name">{project.name}</h3>
                  <div className="proj-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="proj-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="proj-detail">
                  <p className="proj-summary">{project.summary}</p>
                  <ul className="proj-bullets">
                    {project.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="proj-links">
                  {project.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="proj-link"
                    >
                      {link.label} ↗
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills">
          <div className="sec-header fade-up d3">
            <div>
              <div className="sec-label">Capability map</div>
              <h2 className="sec-title">Skills &amp;<br /><em>Expertise.</em></h2>
            </div>
          </div>

          <div className="skills-layout fade-up d4">
            <div className="skill-tabs-list">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`skill-tab ${activeSkillCategory === cat ? "skill-tab-active" : ""}`}
                  onClick={() => setActiveSkillCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="skills-content">
              {skillMap[activeSkillCategory].map((skill) => (
                <div key={skill.name} className="skill-bar-row">
                  <div className="skill-bar-top">
                    <div className="skill-bar-name">{skill.name}</div>
                    <div className="skill-bar-meta">
                      <span className="skill-bar-note">{skill.note}</span>
                      <span className="skill-bar-pct">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" style={{ marginTop: "64px" }}>
          <div className="sec-header fade-up d3">
            <div>
              <div className="sec-label">Get in touch</div>
              <h2 className="sec-title">Let&apos;s<br /><em>Talk.</em></h2>
            </div>
          </div>

          <div className="contact-layout fade-up d4">
            <div className="contact-left">
              <h3 className="contact-big-name">
                Julie<br /><em>Anne.</em>
              </h3>
              <p className="contact-desc">
                Built to stand out visually and fast to scan. Looking for SWE, product engineering, or frontend roles where I can bring both technical depth and design care.
              </p>

              <div className="contact-links-list">
                <a className="contact-link-row" href="mailto:kisamae1997@gmail.com">
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-val">kisamae1997@gmail.com ↗</span>
                </a>
                <a className="contact-link-row" href="tel:+46760393202">
                  <span className="contact-link-label">Phone</span>
                  <span className="contact-link-val">+46 760 393 202</span>
                </a>
                <a
                  className="contact-link-row"
                  href="https://www.linkedin.com/in/julie-anne-cantillep-4ba4ab250/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-link-label">LinkedIn</span>
                  <span className="contact-link-val">Open profile ↗</span>
                </a>
                <a
                  className="contact-link-row"
                  href="https://github.com/Julieanna97"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-link-label">GitHub</span>
                  <span className="contact-link-val">Julieanna97 ↗</span>
                </a>
              </div>
            </div>

            <div className="contact-right">
              <div className="contact-right-inner">
                <div className="contact-meta-grid">
                  {[
                    { k: "Location", v: "Malmö, Sweden" },
                    { k: "Focus", v: "Fullstack · Embedded · AI" },
                    { k: "Stack", v: "React, Next.js, TypeScript, MongoDB" },
                    { k: "Style", v: "Product-minded, design-aware" },
                  ].map((m) => (
                    <div key={m.k} className="contact-meta-cell">
                      <div className="contact-meta-key">{m.k}</div>
                      <div className="contact-meta-val">{m.v}</div>
                    </div>
                  ))}
                </div>

                <div className="availability-banner">
                  <span className="avail-dot" />
                  <span className="avail-text">
                    <strong>Open to opportunities</strong> — SWE, product engineering, and frontend roles
                  </span>
                </div>

                <div style={{ marginTop: "auto", paddingTop: "32px" }}>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <a className="btn-primary" href="mailto:kisamae1997@gmail.com">
                      Send an email ↗
                    </a>
                    <button type="button" className="btn-ghost" onClick={handleCopyEmail}>
                      Copy email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pf-footer">
          <div className="footer-left">Julie Anne Cantillep · 2026</div>
          <div className="footer-right">Malmö, Sweden · Open to work</div>
        </footer>
      </div>

      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  );
}