"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useRef } from "react";

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
  accentColor: string;
  textColor: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
  bullets: string[];
  tags: string[];
};

const timelineItems: TimelineItem[] = [
  { year: "2023", category: "work",      title: "Embedded Software Developer Intern", subtitle: "Sigma Industry Evolution",          detail: "Built part of an autonomous radio-controlled car project using Arduino, sensors, C/C++, and Python." },
  { year: "2024", category: "work",      title: "Embedded Software Developer Intern", subtitle: "Nodehill AB",                        detail: "Implemented a LoRa communication system using ESP32 microcontrollers and LoRa modules for long-range wireless communication." },
  { year: "2024–25", category: "ai",     title: "AI Trainer — Coder",                subtitle: "Outlier",                            detail: "Developed, reviewed, and optimized AI model outputs, improved training quality, and supported cross-functional AI workflows." },
  { year: "2025–26", category: "product",title: "Fullstack Developer",               subtitle: "PodManager.ai",                      detail: "Built browser-based audio and video editing tools with React, TypeScript, and backend APIs for clips, effects, and processing workflows." },
  { year: "2026",   category: "ai",      title: "Quality Assurance Analyst",         subtitle: "OneForma.com",                       detail: "Reviewed and improved multilingual AI content applying QA guidelines, natural language quality checks, and workflow consistency." },
  { year: "2026",   category: "ai",      title: "AI Data Specialist",                subtitle: "Appen.com",                          detail: "Worked on AI training projects involving text, audio, and multilingual data — transcription, labeling, and content evaluation." },
  { year: "2026",   category: "education",title: "Fullstack Developer",              subtitle: "The Media Institute",                detail: "Graduating 2026 — frontend, backend, databases, APIs, agile development, e-commerce, and LIA internships." },
  { year: "2024",   category: "education",title: "Embedded Software Development",    subtitle: "Movant University of Applied Science",detail: "Completed studies in embedded software and contributed to an autonomous car project during the program." },
];

const projectItems: ProjectItem[] = [
  {
    name: "PracticePal",
    category: "Full Product",
    summary: "A practice planning and analytics SaaS for musicians — authentication, session tracking, subscriptions.",
    accentColor: "#c8a96e",
    textColor: "#f7f2ea",
    links: [{ label: "View Demo", href: "/projects/practicepal/landing" }, { label: "GitHub ↗", href: "https://github.com/Julieanna97/PracticePal", external: true }],
    bullets: ["Next.js app router with MongoDB and NextAuth", "Stripe subscription flows and webhook syncing", "End-to-end SaaS story from zero to launch"],
    tags: ["Next.js", "MongoDB", "Stripe", "NextAuth"],
  },
  {
    name: "PodManager.ai",
    category: "Internship",
    summary: "Podcast editing workflows — waveform controls, track strips, and backend APIs for clips and effects.",
    accentColor: "#7b9ea8",
    textColor: "#eef4f6",
    links: [{ label: "GitHub ↗", href: "https://github.com/Julieanna97", external: true }],
    bullets: ["React + TypeScript interface engineering", "WaveSurfer-style editing and track logic", "FastAPI and Node.js behind media tooling"],
    tags: ["React", "TypeScript", "FastAPI", "FFmpeg"],
  },
  {
    name: "Sigma Car",
    category: "Embedded Systems",
    summary: "Arduino-based autonomous car — sensor input, control loops, and path reliability.",
    accentColor: "#8aab8a",
    textColor: "#edf4ed",
    links: [{ label: "GitHub ↗", href: "https://github.com/Julieanna97", external: true }],
    bullets: ["Sensor calibration and data fusion", "C/C++ firmware with Python testing", "Constrained hardware problem solving"],
    tags: ["Arduino", "C/C++", "Python", "RTOS/Zephyr"],
  },
];

const skillMap: Record<SkillCategory, Array<{ name: string; level: number; note: string }>> = {
  frontend: [
    { name: "React",       level: 92, note: "Component architecture" },
    { name: "Next.js",     level: 90, note: "App router, SSR" },
    { name: "TypeScript",  level: 88, note: "Type-safe logic" },
    { name: "HTML / CSS",  level: 95, note: "Layout & polish" },
  ],
  backend: [
    { name: "Node / Express", level: 84, note: "API & server logic" },
    { name: "FastAPI",         level: 82, note: "Python services" },
    { name: "MongoDB",         level: 80, note: "Data & persistence" },
    { name: "REST APIs",       level: 90, note: "Integration contracts" },
  ],
  systems: [
    { name: "C / C++",         level: 80, note: "Firmware engineering" },
    { name: "Arduino / ESP32", level: 84, note: "Hardware interface" },
    { name: "RTOS / Zephyr",   level: 70, note: "Real-time systems" },
    { name: "Python",          level: 86, note: "Automation & testing" },
  ],
  tooling: [
    { name: "Git / GitHub",    level: 92, note: "Version control" },
    { name: "Docker / Azure",  level: 76, note: "Cloud deployment" },
    { name: "Figma",           level: 78, note: "Design systems" },
    { name: "Jira / VS Code",  level: 88, note: "Dev workflow" },
  ],
};

const timelineFilters: TimelineFilter[] = ["all", "work", "product", "ai", "education"];
const skillCategories: SkillCategory[] = ["frontend", "backend", "systems", "tooling"];

const catLabel: Record<string, string> = { work: "Work", product: "Product", ai: "AI", education: "Education" };

export default function PortfolioShowcase() {
  const [mounted, setMounted] = useState(false);
  const [tlFilter, setTlFilter] = useState<TimelineFilter>("all");
  const [activeSkill, setActiveSkill] = useState<SkillCategory>("frontend");
  const [toast, setToast] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const filteredTl = useMemo(
    () => timelineItems.filter(i => tlFilter === "all" || i.category === tlFilter),
    [tlFilter]
  );

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText("kisamae1997@gmail.com"); setToast("Copied to clipboard"); }
    catch { setToast("kisamae1997@gmail.com"); }
  };

  const navOpaque = scrollY > 60;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300&family=Barlow+Condensed:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    :root {
      --bg:      #0e0e0e;
      --bg2:     #161616;
      --bg3:     #1e1e1e;
      --line:    rgba(255,255,255,0.08);
      --line2:   rgba(255,255,255,0.15);
      --white:   #f5f5f3;
      --dim:     rgba(245,245,243,0.45);
      --dimmer:  rgba(245,245,243,0.22);
      --accent:  #d4a853;
      --display: 'Bebas Neue', sans-serif;
      --cond:    'Barlow Condensed', sans-serif;
      --body:    'Barlow', sans-serif;
    }

    body {
      background: var(--bg);
      color: var(--white);
      font-family: var(--body);
      font-weight: 300;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    a { color: inherit; text-decoration: none; }
    button { font: inherit; cursor: pointer; background: none; border: none; color: inherit; }
    ::selection { background: var(--accent); color: #0e0e0e; }

    /* ── NAV ── */
    .nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 26px 48px;
      transition: background 0.4s, backdrop-filter 0.4s, padding 0.4s, border-color 0.4s;
      border-bottom: 1px solid transparent;
    }

    .nav-opaque {
      background: rgba(14,14,14,0.92);
      backdrop-filter: blur(16px);
      border-bottom-color: var(--line);
      padding: 18px 48px;
    }

    .nav-logo {
      font-family: var(--cond);
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--white);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 36px;
    }

    .nav-link {
      font-family: var(--cond);
      font-size: 0.7rem;
      font-weight: 400;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--dim);
      transition: color 0.2s;
    }
    .nav-link:hover { color: var(--white); }

    .nav-cta {
      font-family: var(--cond);
      font-size: 0.68rem;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--bg);
      background: var(--white);
      padding: 10px 22px;
      transition: background 0.2s, color 0.2s;
    }
    .nav-cta:hover { background: var(--accent); }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0 48px 80px;
      position: relative;
      overflow: hidden;
    }

    /* Rotating rings background decoration */
    .hero-rings {
      position: absolute;
      top: 50%; left: 60%;
      transform: translate(-50%, -50%);
      width: 700px; height: 700px;
      pointer-events: none;
      opacity: 0.07;
    }

    .hero-rings circle {
      fill: none;
      stroke: white;
    }

    .hero-eyebrow {
      font-family: var(--cond);
      font-size: 0.68rem;
      font-weight: 400;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .hero-eyebrow::before {
      content: "";
      display: inline-block;
      width: 36px; height: 1px;
      background: var(--accent);
    }

    .hero-headline {
      font-family: var(--display);
      font-size: clamp(6rem, 14vw, 18rem);
      line-height: 0.85;
      letter-spacing: 0.01em;
      color: var(--white);
      position: relative;
      z-index: 2;
    }

    .hero-headline .line-2 {
      color: transparent;
      -webkit-text-stroke: 1px rgba(245,245,243,0.35);
    }

    .hero-headline .line-3 {
      color: var(--accent);
    }

    .hero-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      margin-top: 56px;
      padding-top: 48px;
      border-top: 1px solid var(--line2);
    }

    .hero-desc {
      font-family: var(--body);
      font-size: 1.05rem;
      line-height: 1.85;
      font-weight: 300;
      color: var(--dim);
      max-width: 52ch;
    }
    .hero-desc strong { color: var(--white); font-weight: 400; }

    .hero-actions {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 16px;
    }

    .hero-signals {
      display: flex;
      gap: 32px;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-end;
      margin-bottom: 20px;
    }

    .hero-signal {
      text-align: right;
    }

    .sig-label {
      font-family: var(--cond);
      font-size: 0.55rem;
      font-weight: 400;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--dimmer);
      margin-bottom: 3px;
    }

    .sig-val {
      font-family: var(--cond);
      font-size: 0.82rem;
      font-weight: 400;
      letter-spacing: 0.1em;
      color: var(--dim);
    }

    .btn-primary {
      font-family: var(--cond);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--bg);
      background: var(--white);
      padding: 15px 36px;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      transition: background 0.2s, transform 0.2s;
    }
    .btn-primary:hover { background: var(--accent); transform: translateY(-2px); }

    .btn-ghost {
      font-family: var(--cond);
      font-size: 0.7rem;
      font-weight: 400;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--dim);
      border: 1px solid var(--line2);
      padding: 14px 32px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: color 0.2s, border-color 0.2s, transform 0.2s;
    }
    .btn-ghost:hover { color: var(--white); border-color: rgba(255,255,255,0.35); transform: translateY(-2px); }

    .hero-scroll-hint {
      font-family: var(--cond);
      font-size: 0.58rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--dimmer);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .hero-scroll-hint::before { content: ""; display: block; width: 20px; height: 1px; background: currentColor; }

    /* ── MARQUEE BAND ── */
    .marquee-band {
      background: var(--accent);
      padding: 14px 0;
      overflow: hidden;
      white-space: nowrap;
    }

    .marquee-inner {
      display: inline-flex;
      gap: 0;
      animation: marquee 22s linear infinite;
    }

    .marquee-item {
      font-family: var(--display);
      font-size: 1.15rem;
      letter-spacing: 0.06em;
      color: var(--bg);
      padding: 0 28px;
      display: inline-flex;
      align-items: center;
      gap: 16px;
    }

    .marquee-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: rgba(14,14,14,0.35);
      flex-shrink: 0;
    }

    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* ── SECTION WRAPPER ── */
    .section {
      padding: 120px 48px;
    }

    .section-alt { background: var(--bg2); }

    .section-inner {
      max-width: 1280px;
      margin: 0 auto;
    }

    .sec-label {
      font-family: var(--cond);
      font-size: 0.62rem;
      font-weight: 400;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .sec-label::before { content: ""; display: inline-block; width: 24px; height: 1px; background: var(--accent); }

    .sec-title {
      font-family: var(--display);
      font-size: clamp(3.5rem, 7vw, 9rem);
      line-height: 0.88;
      letter-spacing: 0.02em;
      color: var(--white);
      margin-bottom: 0;
    }

    .sec-title-outline {
      color: transparent;
      -webkit-text-stroke: 1px rgba(245,245,243,0.25);
    }

    .sec-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 32px;
      margin-bottom: 72px;
      flex-wrap: wrap;
    }

    /* ── FILTER ROW ── */
    .filter-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .filter-btn {
      font-family: var(--cond);
      font-size: 0.62rem;
      font-weight: 400;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--dim);
      padding: 8px 16px;
      border: 1px solid var(--line);
      transition: all 0.18s;
    }
    .filter-btn:hover { border-color: var(--line2); color: var(--white); }
    .filter-btn-on { background: var(--white); color: var(--bg); border-color: var(--white); }

    /* ── TIMELINE ── */
    .tl-list { display: flex; flex-direction: column; }

    .tl-item {
      display: grid;
      grid-template-columns: 96px 1px 1fr;
      gap: 0 36px;
      padding: 44px 0;
      border-bottom: 1px solid var(--line);
      position: relative;
      transition: background 0.2s;
    }
    .tl-item:first-child { border-top: 1px solid var(--line); }
    .tl-item:hover { background: rgba(255,255,255,0.02); }

    .tl-year-col {
      padding-top: 4px;
    }

    .tl-year {
      font-family: var(--cond);
      font-size: 0.68rem;
      letter-spacing: 0.14em;
      color: var(--dimmer);
      margin-bottom: 8px;
    }

    .tl-cat {
      font-family: var(--cond);
      font-size: 0.56rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--accent);
    }

    .tl-rule {
      background: var(--line);
      width: 1px;
    }

    .tl-content { padding-left: 0; }

    .tl-title {
      font-family: var(--cond);
      font-size: clamp(1.2rem, 2.2vw, 1.8rem);
      font-weight: 500;
      letter-spacing: 0.04em;
      color: var(--white);
      line-height: 1.2;
      margin-bottom: 5px;
      text-transform: uppercase;
    }

    .tl-sub {
      font-family: var(--cond);
      font-size: 0.72rem;
      font-weight: 400;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 14px;
    }

    .tl-detail {
      font-family: var(--body);
      font-size: 0.95rem;
      line-height: 1.8;
      font-weight: 300;
      color: var(--dim);
      max-width: 62ch;
    }

    /* ── PROJECTS ── */
    .proj-list { display: flex; flex-direction: column; gap: 2px; }

    .proj-item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 520px;
      overflow: hidden;
      position: relative;
    }

    .proj-item:nth-child(even) .proj-panel { order: -1; }

    .proj-swatch {
      position: relative;
      overflow: hidden;
      min-height: 360px;
    }

    .proj-swatch-bg {
      position: absolute;
      inset: 0;
      transition: transform 0.8s cubic-bezier(0.4,0,0.2,1);
    }
    .proj-item:hover .proj-swatch-bg { transform: scale(1.06); }

    .proj-swatch-num {
      position: absolute;
      bottom: 0; left: 0;
      font-family: var(--display);
      font-size: 18vw;
      line-height: 0.75;
      color: rgba(0,0,0,0.18);
      pointer-events: none;
      user-select: none;
      padding-left: 20px;
    }

    .proj-swatch-cat {
      position: absolute;
      top: 32px; left: 32px;
      font-family: var(--cond);
      font-size: 0.6rem;
      font-weight: 500;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      padding: 6px 14px;
      background: rgba(0,0,0,0.35);
      backdrop-filter: blur(8px);
    }

    .proj-panel {
      background: var(--bg3);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 64px;
      gap: 0;
    }

    .proj-name {
      font-family: var(--display);
      font-size: clamp(2.8rem, 5vw, 5.5rem);
      line-height: 0.9;
      letter-spacing: 0.02em;
      color: var(--white);
      margin-bottom: 24px;
    }

    .proj-summary {
      font-family: var(--body);
      font-size: 1rem;
      line-height: 1.85;
      font-weight: 300;
      color: var(--dim);
      max-width: 44ch;
      margin-bottom: 28px;
    }

    .proj-bullets {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 9px;
      margin-bottom: 32px;
    }

    .proj-bullets li {
      font-family: var(--body);
      font-size: 0.88rem;
      font-weight: 300;
      color: var(--dimmer);
      line-height: 1.6;
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .proj-bullets li::before {
      content: "—";
      color: var(--accent);
      flex-shrink: 0;
      font-weight: 300;
    }

    .proj-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 36px;
    }

    .proj-tag {
      font-family: var(--cond);
      font-size: 0.58rem;
      font-weight: 400;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--dimmer);
      border: 1px solid var(--line);
      padding: 5px 12px;
    }

    .proj-links {
      display: flex;
      gap: 14px;
      align-items: center;
      flex-wrap: wrap;
    }

    .proj-link-main {
      font-family: var(--cond);
      font-size: 0.65rem;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--bg);
      background: var(--white);
      padding: 12px 26px;
      transition: background 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .proj-link-main:hover { background: var(--accent); }

    .proj-link-sec {
      font-family: var(--cond);
      font-size: 0.63rem;
      font-weight: 400;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--dim);
      transition: color 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .proj-link-sec::after { content: "↗"; }
    .proj-link-sec:hover { color: var(--white); }

    /* ── SKILLS ── */
    .skills-layout {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 80px;
      align-items: start;
    }

    .skill-tab-list {
      display: flex;
      flex-direction: column;
      gap: 0;
      border-left: 1px solid var(--line);
    }

    .skill-tab-btn {
      font-family: var(--cond);
      font-size: 0.68rem;
      font-weight: 400;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--dimmer);
      padding: 16px 0 16px 24px;
      border-left: 2px solid transparent;
      margin-left: -1px;
      text-align: left;
      transition: color 0.2s, border-color 0.2s;
    }
    .skill-tab-btn:hover { color: var(--dim); }
    .skill-tab-btn-on { color: var(--white); border-left-color: var(--accent); }

    .skill-entries { display: flex; flex-direction: column; gap: 0; }

    .skill-entry {
      padding: 26px 0;
      border-bottom: 1px solid var(--line);
      display: grid;
      grid-template-columns: 1fr 52px;
      gap: 24px;
      align-items: center;
    }
    .skill-entry:first-child { border-top: 1px solid var(--line); }

    .skill-entry-name {
      font-family: var(--cond);
      font-size: 1.3rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--white);
      margin-bottom: 8px;
    }

    .skill-entry-note {
      font-family: var(--body);
      font-size: 0.78rem;
      font-weight: 300;
      color: var(--dimmer);
      margin-bottom: 14px;
      font-style: italic;
    }

    .skill-track {
      width: 100%;
      height: 1px;
      background: var(--line2);
      position: relative;
    }

    .skill-fill {
      position: absolute;
      left: 0; top: 0;
      height: 1px;
      background: var(--accent);
      transition: width 0.9s cubic-bezier(0.4,0,0.2,1);
    }

    .skill-fill::after {
      content: "";
      position: absolute;
      right: 0; top: -3px;
      width: 7px; height: 7px;
      border-radius: 50%;
      background: var(--accent);
    }

    .skill-pct {
      font-family: var(--display);
      font-size: 1.5rem;
      color: var(--line2);
      text-align: right;
      line-height: 1;
    }

    /* ── CONTACT ── */
    .contact-hero {
      padding: 140px 48px;
      background: var(--bg);
      position: relative;
      overflow: hidden;
    }

    .contact-hero-bg-text {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--display);
      font-size: 28vw;
      line-height: 1;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255,255,255,0.04);
      pointer-events: none;
      user-select: none;
      white-space: nowrap;
    }

    .contact-inner {
      max-width: 1280px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: start;
    }

    .contact-headline {
      font-family: var(--display);
      font-size: clamp(3.5rem, 8vw, 10rem);
      line-height: 0.88;
      letter-spacing: 0.02em;
      color: var(--white);
      margin-bottom: 36px;
    }

    .contact-headline .outline {
      color: transparent;
      -webkit-text-stroke: 1px rgba(245,245,243,0.3);
    }

    .contact-sub {
      font-family: var(--body);
      font-size: 1.05rem;
      font-weight: 300;
      line-height: 1.85;
      color: var(--dim);
      max-width: 46ch;
      margin-bottom: 44px;
    }

    .contact-btns {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }

    .contact-links {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding-top: 16px;
    }

    .contact-link-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 26px 0;
      border-bottom: 1px solid var(--line);
      gap: 16px;
      transition: padding-left 0.25s;
    }
    .contact-link-row:first-child { border-top: 1px solid var(--line); }
    .contact-link-row:hover { padding-left: 10px; }

    .contact-link-left {}

    .contact-link-label {
      font-family: var(--cond);
      font-size: 0.56rem;
      font-weight: 400;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--dimmer);
      margin-bottom: 5px;
    }

    .contact-link-val {
      font-family: var(--cond);
      font-size: 1rem;
      font-weight: 400;
      letter-spacing: 0.08em;
      color: var(--white);
    }

    .contact-link-arrow {
      font-family: var(--cond);
      font-size: 1rem;
      color: var(--dimmer);
      flex-shrink: 0;
      transition: color 0.2s, transform 0.2s;
    }
    .contact-link-row:hover .contact-link-arrow { color: var(--accent); transform: translateX(5px); }

    /* ── FOOTER ── */
    .footer {
      background: var(--bg2);
      border-top: 1px solid var(--line);
      padding: 32px 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }

    .footer-logo {
      font-family: var(--cond);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--dim);
    }

    .footer-copy {
      font-family: var(--cond);
      font-size: 0.6rem;
      font-weight: 300;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--dimmer);
    }

    /* ── TOAST ── */
    .toast {
      position: fixed;
      bottom: 32px; left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      background: var(--white);
      color: var(--bg);
      font-family: var(--cond);
      font-size: 0.65rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      padding: 14px 28px;
    }

    /* ── ENTER ── */
    .fade-up {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1);
    }
    .mounted .fade-up { opacity: 1; transform: none; }
    .mounted .d1 { transition-delay: 0.05s; }
    .mounted .d2 { transition-delay: 0.18s; }
    .mounted .d3 { transition-delay: 0.32s; }
    .mounted .d4 { transition-delay: 0.46s; }
    .mounted .d5 { transition-delay: 0.58s; }

    /* ── RESPONSIVE ── */
    @media (max-width: 1024px) {
      .hero { padding: 0 32px 72px; }
      .hero-split { grid-template-columns: 1fr; gap: 32px; }
      .hero-actions { align-items: flex-start; }
      .hero-signals { justify-content: flex-start; }
      .proj-item { grid-template-columns: 1fr; }
      .proj-item:nth-child(even) .proj-panel { order: 0; }
      .proj-swatch { min-height: 280px; }
      .contact-grid { grid-template-columns: 1fr; gap: 48px; }
      .skills-layout { grid-template-columns: 1fr; }
      .skill-tab-list { flex-direction: row; border-left: none; border-bottom: 1px solid var(--line); flex-wrap: wrap; }
      .skill-tab-btn { border-left: none; border-bottom: 2px solid transparent; padding: 12px 18px; margin-left: 0; }
      .skill-tab-btn-on { border-left-color: transparent; border-bottom-color: var(--accent); }
    }

    @media (max-width: 768px) {
      .nav { padding: 20px 24px; }
      .nav-links { display: none; }
      .section { padding: 80px 24px; }
      .hero { padding: 0 24px 64px; }
      .proj-panel { padding: 40px 24px; }
      .contact-hero { padding: 100px 24px; }
      .footer { padding: 28px 24px; }
    }

    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `;

  const marqItems = ["Fullstack Developer", "Embedded Systems", "AI Workflows", "Malmö, Sweden", "Open to Work", "React · Next.js · TypeScript", "Arduino · ESP32 · C++"];

  return (
    <div className={mounted ? "mounted" : ""} style={{ background: "#0e0e0e", minHeight: "100vh" }}>
      <style>{css}</style>

      {/* NAV */}
      <nav className={`nav ${navOpaque ? "nav-opaque" : ""}`}>
        <div className="nav-logo">Julie Anne Cantillep</div>
        <div className="nav-links">
          {["Timeline", "Projects", "Skills", "Contact"].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} className="nav-link">{s}</a>
          ))}
        </div>
        <a className="nav-cta" href="mailto:kisamae1997@gmail.com">Hire Me</a>
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        {/* Decorative rings */}
        <svg className="hero-rings" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="350" cy="350" r="320" strokeWidth="1"/>
          <circle cx="350" cy="350" r="260" strokeWidth="1"/>
          <circle cx="350" cy="350" r="200" strokeWidth="1"/>
          <circle cx="350" cy="350" r="140" strokeWidth="1"/>
          <circle cx="350" cy="350" r="80"  strokeWidth="1"/>
          <line x1="350" y1="30"  x2="350" y2="670" stroke="white" strokeWidth="0.5"/>
          <line x1="30"  y1="350" x2="670" y2="350" stroke="white" strokeWidth="0.5"/>
          <line x1="124" y1="124" x2="576" y2="576" stroke="white" strokeWidth="0.5"/>
          <line x1="576" y1="124" x2="124" y2="576" stroke="white" strokeWidth="0.5"/>
        </svg>

        <div className="fade-up d1">
          <div className="hero-eyebrow">Fullstack · Embedded · AI · Malmö, Sweden</div>
        </div>

        <h1 className="hero-headline fade-up d2"
          style={{ transform: `translateY(${scrollY * 0.12}px)` }}
        >
          <span style={{ display: "block" }}>JULIE</span>
          <span className="line-2" style={{ display: "block" }}>ANNE</span>
          <span className="line-3" style={{ display: "block" }}>CANTILLEP</span>
        </h1>

        <div className="hero-split fade-up d3">
          <p className="hero-desc">
            I build <strong>thoughtful interfaces</strong>, reliable backend flows, and embedded projects that connect design intuition with technical depth — from React component systems to LoRa wireless communication, across the full stack.
          </p>
          <div className="hero-actions">
            <div className="hero-signals">
              {[
                { k: "Status", v: "Open to SWE roles" },
                { k: "Location", v: "Malmö, SE" },
                { k: "Reply", v: "< 24 hours" },
              ].map(s => (
                <div key={s.k} className="hero-signal">
                  <div className="sig-label">{s.k}</div>
                  <div className="sig-val">{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "flex-end" }}>
              <a className="btn-primary" href="mailto:kisamae1997@gmail.com">Get in Touch</a>
              <a className="btn-ghost" href="#projects">View Work</a>
              <button type="button" className="btn-ghost" onClick={copyEmail}>Copy Email</button>
            </div>
            <div className="hero-scroll-hint">Scroll to explore</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-band">
        <div className="marquee-inner">
          {[...marqItems, ...marqItems].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <section className="section section-alt" id="timeline">
        <div className="section-inner">
          <div className="sec-head fade-up d2">
            <div>
              <div className="sec-label">Career Arc</div>
              <div className="sec-title">
                WORK &amp;<br />
                <span className="sec-title-outline">EDUCATION</span>
              </div>
            </div>
            <div className="filter-row">
              {timelineFilters.map(f => (
                <button key={f} type="button"
                  className={`filter-btn ${tlFilter === f ? "filter-btn-on" : ""}`}
                  onClick={() => setTlFilter(f)}
                >
                  {f === "all" ? "All" : catLabel[f]}
                </button>
              ))}
            </div>
          </div>

          <div className="tl-list fade-up d3">
            {filteredTl.map(item => (
              <div key={`${item.year}-${item.title}`} className="tl-item">
                <div className="tl-year-col">
                  <div className="tl-year">{item.year}</div>
                  <div className="tl-cat">{catLabel[item.category]}</div>
                </div>
                <div className="tl-rule" />
                <div className="tl-content">
                  <div className="tl-title">{item.title}</div>
                  <div className="tl-sub">{item.subtitle}</div>
                  <div className="tl-detail">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects" style={{ padding: "120px 0 0", background: "#0e0e0e" }}>
        <div className="section-inner" style={{ padding: "0 48px" }}>
          <div className="sec-head fade-up d2">
            <div>
              <div className="sec-label">Selected Work</div>
              <div className="sec-title">
                THREE<br />
                <span className="sec-title-outline">PROJECTS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="proj-list fade-up d3">
          {projectItems.map((p, i) => (
            <article key={p.name} className="proj-item">
              <div className="proj-swatch">
                <div className="proj-swatch-bg" style={{ background: p.accentColor }} />
                <div className="proj-swatch-num" style={{ color: "rgba(0,0,0,0.15)" }}>0{i + 1}</div>
                <div className="proj-swatch-cat" style={{ color: p.textColor }}>{p.category}</div>
              </div>
              <div className="proj-panel">
                <h3 className="proj-name">{p.name}</h3>
                <p className="proj-summary">{p.summary}</p>
                <ul className="proj-bullets">
                  {p.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
                <div className="proj-tags">
                  {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                </div>
                <div className="proj-links">
                  {p.links.map((link, li) => (
                    <Link key={link.label} href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={li === 0 ? "proj-link-main" : "proj-link-sec"}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="section section-alt" id="skills">
        <div className="section-inner">
          <div className="sec-head fade-up d2">
            <div>
              <div className="sec-label">Capability Map</div>
              <div className="sec-title">
                SKILLS &amp;<br />
                <span className="sec-title-outline">STACK</span>
              </div>
            </div>
          </div>

          <div className="skills-layout fade-up d3">
            <div className="skill-tab-list">
              {skillCategories.map(cat => (
                <button key={cat} type="button"
                  className={`skill-tab-btn ${activeSkill === cat ? "skill-tab-btn-on" : ""}`}
                  onClick={() => setActiveSkill(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="skill-entries">
              {skillMap[activeSkill].map(skill => (
                <div key={skill.name} className="skill-entry">
                  <div>
                    <div className="skill-entry-name">{skill.name}</div>
                    <div className="skill-entry-note">{skill.note}</div>
                    <div className="skill-track">
                      <div className="skill-fill" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                  <div className="skill-pct">{skill.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-hero" id="contact">
        <div className="contact-hero-bg-text">TALK</div>
        <div className="contact-inner">
          <div className="contact-grid fade-up d2">
            <div>
              <h2 className="contact-headline">
                LET&apos;S<br />
                <span className="outline">WORK</span><br />
                TOGETHER
              </h2>
              <p className="contact-sub">
                Looking for SWE, product engineering, or frontend roles where I can bring both technical depth and design care. Fast reply guaranteed.
              </p>
              <div className="contact-btns">
                <a className="btn-primary" href="mailto:kisamae1997@gmail.com">Send Email</a>
                <button type="button" className="btn-ghost" onClick={copyEmail}>Copy Address</button>
              </div>
            </div>

            <div className="contact-links fade-up d3">
              {[
                { label: "Email",    val: "kisamae1997@gmail.com",  href: "mailto:kisamae1997@gmail.com" },
                { label: "Phone",   val: "+46 760 393 202",          href: "tel:+46760393202" },
                { label: "LinkedIn",val: "julie-anne-cantillep",     href: "https://www.linkedin.com/in/julie-anne-cantillep-4ba4ab250/" },
                { label: "GitHub",  val: "Julieanna97",              href: "https://github.com/Julieanna97" },
              ].map(item => (
                <a key={item.label} className="contact-link-row"
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <div className="contact-link-left">
                    <div className="contact-link-label">{item.label}</div>
                    <div className="contact-link-val">{item.val}</div>
                  </div>
                  <div className="contact-link-arrow">→</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Julie Anne Cantillep</div>
        <div className="footer-copy">Malmö, Sweden · Open to Work · 2026</div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}