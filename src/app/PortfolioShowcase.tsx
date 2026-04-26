"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

// 3D globe loaded only on client (Three.js requires DOM)
const SkillsGlobe = dynamic(() => import("@/app/SkillsGlobe"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "min(70vh, 640px)",
        minHeight: "480px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "0.8rem",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(245,160,200,0.4)",
      }}
    >
      Loading globe…
    </div>
  ),
});

type TimelineFilter = "all" | "work" | "product" | "ai" | "education";
type SkillCategory = "frontend" | "backend" | "databases" | "cloud" | "tools" | "systems";

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
  links: Array<{ label: string; href: string; external?: boolean }>;
  bullets: string[];
  tags: string[];
};

const timelineItems: TimelineItem[] = [
  { year: "2023", category: "work", title: "Embedded Software Developer Intern", subtitle: "Sigma Industry Evolution", detail: "Built part of an autonomous radio-controlled car project using Arduino, sensors, C/C++, and Python." },
  { year: "2024", category: "work", title: "Embedded Software Developer Intern", subtitle: "Nodehill AB", detail: "Implemented a LoRa communication system using ESP32 microcontrollers and LoRa modules for long-range wireless communication." },
  { year: "2024–25", category: "ai", title: "AI Trainer (Coder)", subtitle: "Outlier", detail: "Developed, reviewed, and optimized AI model outputs, improved training quality, and supported cross-functional AI workflows." },
  { year: "2025–26", category: "product", title: "Fullstack Developer", subtitle: "PodManager.ai", detail: "Shipped features across a Next.js + TypeScript frontend and FastAPI backend for podcast editing, recording studio workflows, guest management, and marketplace modules." },
  { year: "2026", category: "ai", title: "Quality Assurance Analyst", subtitle: "OneForma.com", detail: "Reviewed and improved multilingual AI content applying QA guidelines, natural language quality checks, and workflow consistency." },
  { year: "2026", category: "ai", title: "AI Data Specialist", subtitle: "Appen.com", detail: "Worked on AI training projects involving text, audio, and multilingual data — transcription, labeling, and content evaluation." },
  { year: "2026", category: "education", title: "Fullstack Developer", subtitle: "The Media Institute", detail: "Graduating 2026 after training in frontend, backend, databases, APIs, agile development, and e-commerce." },
  { year: "2024", category: "education", title: "Embedded Software Development", subtitle: "Movant University of Applied Science", detail: "Completed studies in embedded software and contributed to an autonomous car project." },
];

const projectItems: ProjectItem[] = [
  {
    name: "PracticePal",
    category: "Full Product",
    summary: "A practice planning and analytics SaaS for musicians — authentication, session tracking, plans, and subscriptions from zero to launch.",
    links: [
      { label: "View Case Study", href: "/projects/practicepal" },
      { label: "View Demo", href: "/auth/login?callbackUrl=%2Fdashboard" },
      { label: "GitHub", href: "https://github.com/Julieanna97/PracticePal", external: true },
    ],
    bullets: ["Next.js app router with MongoDB and NextAuth", "Stripe subscription flows and webhook syncing", "End-to-end SaaS story from concept to launch"],
    tags: ["Next.js", "MongoDB", "Stripe", "NextAuth"],
  },
  {
    name: "PodManager.ai",
    category: "Internship",
    summary: "Worked in a monorepo podcast platform with Next.js App Router, FastAPI, MongoDB, and Socket.IO to deliver studio, editing, publishing, and marketplace experiences.",
    links: [
      { label: "View Case Study", href: "/projects/podmanager" },
      { label: "Website", href: "https://www.podmanager.ai/", external: true },
    ],
    bullets: ["Built real-time studio and editing flows with Socket.IO, WaveSurfer.js, and MediaPipe/TensorFlow tooling", "Implemented form-heavy product surfaces using React Hook Form + Zod with SWR data fetching", "Contributed to FastAPI services, MongoDB-backed modules, and Dockerized deployment workflows"],
    tags: ["Next.js", "TypeScript", "FastAPI", "Socket.IO", "MongoDB", "WaveSurfer.js"],
  },
  {
    name: "Sigma Autonomous Car",
    category: "Embedded Systems",
    summary: "An Arduino-based autonomous car focused on sensor input, control loops, and path reliability.",
    links: [{ label: "GitHub Profile", href: "https://github.com/Julieanna97", external: true }],
    bullets: ["Sensor calibration and data fusion", "C/C++ firmware with Python testing", "Constrained hardware problem solving"],
    tags: ["Arduino", "C/C++", "Python", "RTOS/Zephyr"],
  },
];

const skillMap: Record<SkillCategory, { label: string; description: string; skills: string[] }> = {
  frontend: {
    label: "Frontend",
    description: "UI frameworks, styling, and browser-focused tooling",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Radix UI", "Vite", "SWR", "React Hook Form", "Zod", "Framer Motion", "WaveSurfer.js", "MediaPipe", "TensorFlow.js"],
  },
  backend: {
    label: "Backend",
    description: "Server-side runtime, frameworks, and languages",
    skills: ["Node.js", "Express.js", "FastAPI", "Flask", "Python", "REST APIs", "WebSocket APIs", "Socket.IO", "NextAuth", "Stripe", "Mailchimp", "FFmpeg"],
  },
  databases: {
    label: "Databases & Data",
    description: "Data persistence, queries, and cloud storage",
    skills: ["SQL", "NoSQL", "MongoDB", "MySQL", "MariaDB", "phpMyAdmin"],
  },
  cloud: {
    label: "Cloud & DevOps",
    description: "Infrastructure, containers, and deployment",
    skills: ["Microsoft Azure", "Docker", "Docker Compose", "Azure Container Registry", "Gunicorn", "Vercel", "Linux / Ubuntu"],
  },
  tools: {
    label: "Development Tools",
    description: "IDE, version control, testing, and design",
    skills: ["Git", "GitHub", "Jira", "VS Code", "Figma", "WordPress", "npm", "ESLint", "Prettier", "Postman", "Jupyter Notebook", "Turbopack", "Recharts", "date-fns", "next-themes"],
  },
  systems: {
    label: "Embedded & Systems",
    description: "Low-level programming, hardware, and real-time workflows",
    skills: ["C/C++", "Arduino", "ESP32", "LoRa", "RTOS / Zephyr", "Yocto", "UART / SPI / I2C / CAN", "GTest", "CMake"],
  },
};

const timelineFilters: TimelineFilter[] = ["all", "work", "product", "ai", "education"];
const skillCategories: SkillCategory[] = ["frontend", "backend", "databases", "cloud", "tools", "systems"];

export default function PortfolioShowcase() {
  const [mounted, setMounted] = useState(false);
  const [tlFilter, setTlFilter] = useState<TimelineFilter>("all");
  const [activeSkill, setActiveSkill] = useState<SkillCategory>("frontend");
  const [toast, setToast] = useState("");
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Scroll progress indicator
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
      setScrollPct(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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
    try { await navigator.clipboard.writeText("kisamae1997@gmail.com"); setToast("EMAIL COPIED"); }
    catch { setToast("kisamae1997@gmail.com"); }
  };

  const closeMenuAndScroll = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const marqueeItems = ["FULLSTACK DEVELOPER", "EMBEDDED SYSTEMS", "AI WORKFLOWS", "REACT & NEXT.JS", "C/C++ & ARDUINO", "OPEN TO WORK"];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    :root {
      --burg:    #1a0808;
      --burg2:   #2e0e0e;
      --cream:   #f0ece4;
      --pink:    #f5a0c8;
      --orange:  #e8613a;
      --ink:     #1a0808;
      --body:    #3a1818;
      --muted:   #7a5050;
      --cond: 'Barlow Condensed', sans-serif;
      --body-f: 'Barlow', sans-serif;
    }

    body {
      background: var(--cream);
      color: var(--ink);
      font-family: var(--body-f);
      font-weight: 300;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    a { color: inherit; text-decoration: none; }
    button { font: inherit; cursor: pointer; background: none; border: none; }
    ::selection { background: var(--pink); color: var(--burg); }

    /* ── SCROLL PROGRESS BAR ── */
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--pink) 0%, var(--orange) 100%);
      z-index: 300;
      transition: width 0.08s linear;
      pointer-events: none;
    }

    /* ── NAV ── */
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 40px;
      background: var(--burg);
      position: sticky;
      top: 0;
      z-index: 200;
    }
    .nav-logo {
      font-family: var(--cond);
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--pink);
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 36px;
    }
    .nav-link {
      font-family: var(--cond);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--pink);
      letter-spacing: 0.14em;
      text-transform: uppercase;
      transition: opacity 0.2s;
    }
    .nav-link:hover { opacity: 0.65; }

    /* Hamburger button */
    .nav-burger {
      display: none;
      width: 32px;
      height: 22px;
      position: relative;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
    }
    .nav-burger span {
      display: block;
      height: 2px;
      width: 100%;
      background: var(--pink);
      transition: transform 0.3s, opacity 0.3s;
      transform-origin: center;
    }
    .nav-burger.open span:nth-child(1) {
      transform: translateY(10px) rotate(45deg);
    }
    .nav-burger.open span:nth-child(2) {
      opacity: 0;
    }
    .nav-burger.open span:nth-child(3) {
      transform: translateY(-10px) rotate(-45deg);
    }

    /* Mobile drawer */
    .mobile-drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(86%, 360px);
      background: var(--burg);
      border-left: 1px solid rgba(245,160,200,0.18);
      z-index: 250;
      padding: 100px 32px 40px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .mobile-drawer.open { transform: translateX(0); }
    .mobile-drawer-link {
      font-family: var(--cond);
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--pink);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 14px 0;
      border-bottom: 1px solid rgba(245,160,200,0.1);
      text-align: left;
      transition: padding-left 0.2s;
    }
    .mobile-drawer-link:hover, .mobile-drawer-link:focus { padding-left: 8px; }
    .mobile-drawer-cta {
      margin-top: 24px;
      font-family: var(--cond);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--burg);
      background: var(--pink);
      padding: 16px 24px;
      border-radius: 999px;
      text-align: center;
    }
    .mobile-drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 240;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }
    .mobile-drawer-overlay.open { opacity: 1; pointer-events: auto; }

    /* ── HERO ── */
    .hero {
      background: var(--burg);
      padding: 36px 3vw 0;
      overflow: hidden;
    }
    .hero-photo {
      position: relative;
      width: 100%;
      height: 72vh;
      min-height: 520px;
      overflow: hidden;
    }
    .hero-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      display: block;
    }
    .hero-photo-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(26,8,8,0.08) 0%, rgba(26,8,8,0.22) 100%);
      z-index: 1;
    }
    .hero-name-wrap {
      padding: 18px 2vw 0;
      line-height: 0.8;
      overflow: hidden;
    }
    .hero-name-giant {
      display: block;
      font-family: var(--cond);
      font-size: clamp(7rem, 21vw, 26rem);
      font-weight: 900;
      color: var(--pink);
      letter-spacing: -0.03em;
      text-transform: uppercase;
      line-height: 0.82;
      white-space: nowrap;
    }

    /* ── INTRO ── */
    .intro {
      background: var(--cream);
      padding: 72px 5vw;
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 56px;
      align-items: start;
    }
    .intro-left { display: flex; flex-direction: column; }
    .intro-bottom-photo {
      margin-top: 64px;
      position: relative;
      width: 100%;
      max-width: 640px;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: #ddd;
    }
    .intro-bottom-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .intro-photo-box {
      position: relative;
      width: 100%;
      max-width: 560px;
      margin-left: auto;
      aspect-ratio: 4 / 5;
      overflow: hidden;
      background: var(--burg2);
    }
    .intro-photo-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
    }
    .intro-heading {
      font-family: var(--cond);
      font-size: clamp(1.6rem, 3.5vw, 2.8rem);
      font-weight: 800;
      color: var(--burg);
      letter-spacing: 0.02em;
      text-transform: uppercase;
      line-height: 1.1;
      margin-bottom: 28px;
    }
    .intro-body {
      font-family: var(--body-f);
      font-size: 0.82rem;
      font-weight: 400;
      color: var(--body);
      line-height: 1.85;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      max-width: 52ch;
      margin-bottom: 40px;
    }
    .pill-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 480px;
      padding: 22px 40px;
      border-radius: 999px;
      border: 1.5px solid var(--ink);
      background: transparent;
      font-family: var(--cond);
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--ink);
      transition: all 0.22s;
    }
    .pill-btn:hover { background: var(--ink); color: var(--cream); }

    /* ── STATEMENT ── */
    .statement {
      background: var(--cream);
      padding: 60px 5vw 72px;
    }
    .statement-text {
      font-family: var(--cond);
      font-size: clamp(2.2rem, 5.5vw, 7rem);
      font-weight: 900;
      color: var(--burg);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      line-height: 1.05;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0 40px;
    }

    /* ── ORANGE MARQUEE ── */
    .marquee-wrap {
      background: var(--orange);
      padding: 16px 0;
      overflow: hidden;
      white-space: nowrap;
    }
    .marquee-inner {
      display: inline-flex;
      animation: marquee 22s linear infinite;
    }
    .marquee-item {
      font-family: var(--cond);
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--pink);
      padding: 0 36px;
      display: inline-flex;
      align-items: center;
      gap: 24px;
    }
    .marquee-item::after {
      content: "✦";
      color: rgba(245,160,200,0.6);
      font-size: 0.7rem;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* ── DARK PANEL ── */
    .dark-panel {
      background: var(--burg);
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 600px;
    }
    .dark-panel-text {
      padding: 72px 5vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .dark-label {
      font-family: var(--cond);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--pink);
      margin-bottom: 24px;
    }
    .dark-heading {
      font-family: var(--cond);
      font-size: clamp(1.4rem, 3vw, 2.2rem);
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: white;
      line-height: 1.2;
      margin-bottom: 28px;
    }
    .dark-body {
      font-family: var(--body-f);
      font-size: 0.78rem;
      font-weight: 300;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
      line-height: 1.85;
      max-width: 52ch;
    }
    .dark-panel-photo {
      position: relative;
      overflow: hidden;
      min-height: 400px;
    }
    .dark-panel-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
      filter: brightness(0.75) saturate(0.8);
    }

    /* ── PROJECTS ── */
    .projects-section {
      background: var(--cream);
      padding: 80px 5vw;
    }
    .sec-super {
      font-family: var(--cond);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 8px;
    }
    .sec-title {
      font-family: var(--cond);
      font-size: clamp(3rem, 7vw, 8rem);
      font-weight: 900;
      letter-spacing: 0.01em;
      text-transform: uppercase;
      color: var(--burg);
      line-height: 0.9;
      margin-bottom: 56px;
    }
    .proj-list { display: flex; flex-direction: column; gap: 0; }
    .proj-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      border-top: 1px solid rgba(26,8,8,0.12);
      padding: 40px 0;
      align-items: start;
      transition: background 0.2s;
    }
    .proj-row:last-child { border-bottom: 1px solid rgba(26,8,8,0.12); }
    .proj-row:hover { background: rgba(26,8,8,0.03); margin: 0 -5vw; padding: 40px 5vw; }
    .proj-cat {
      font-family: var(--cond);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 10px;
    }
    .proj-name {
      font-family: var(--cond);
      font-size: clamp(1.8rem, 3.5vw, 3rem);
      font-weight: 900;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: var(--burg);
      line-height: 1;
      margin-bottom: 16px;
    }
    .proj-tags-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .proj-tag {
      font-family: var(--body-f);
      font-size: 0.68rem;
      font-weight: 400;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
      border: 1px solid rgba(26,8,8,0.2);
      padding: 4px 12px;
      border-radius: 999px;
    }
    .proj-right { padding-top: 4px; }
    .proj-summary {
      font-family: var(--body-f);
      font-size: 0.82rem;
      font-weight: 300;
      color: var(--body);
      line-height: 1.8;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      max-width: 54ch;
      margin-bottom: 24px;
    }
    .proj-links-row { display: flex; gap: 16px; flex-wrap: wrap; }
    .proj-link {
      font-family: var(--cond);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--burg);
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: opacity 0.2s;
    }
    .proj-link:hover { opacity: 0.6; }

    /* ── TIMELINE ── */
    .timeline-section {
      background: var(--burg2);
      padding: 80px 5vw;
    }
    .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 48px; }
    .filter-chip {
      font-family: var(--cond);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(245,160,200,0.6);
      border: 1px solid rgba(245,160,200,0.25);
      padding: 8px 18px;
      transition: all 0.18s;
    }
    .filter-chip:hover { border-color: var(--pink); color: var(--pink); }
    .filter-chip-on { background: var(--pink); color: var(--burg); border-color: var(--pink); }
    .tl-list { display: flex; flex-direction: column; }
    .tl-row {
      display: grid;
      grid-template-columns: 90px 1fr;
      gap: 32px;
      padding: 28px 0;
      border-bottom: 1px solid rgba(245,160,200,0.12);
      align-items: start;
    }
    .tl-row:first-child { border-top: 1px solid rgba(245,160,200,0.12); }
    .tl-year {
      font-family: var(--cond);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(245,160,200,0.45);
      padding-top: 3px;
    }
    .tl-title {
      font-family: var(--cond);
      font-size: clamp(1rem, 1.8vw, 1.35rem);
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: white;
      margin-bottom: 4px;
    }
    .tl-sub {
      font-family: var(--cond);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--pink);
      margin-bottom: 10px;
    }
    .tl-detail {
      font-family: var(--body-f);
      font-size: 0.78rem;
      font-weight: 300;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.45);
      line-height: 1.75;
    }

    /* ── SKILLS — now with 3D globe ── */
    .skills-section {
      background: var(--burg);
      padding: 0;
      position: relative;
      overflow: hidden;
    }

    .skills-section-full {
      min-height: 720px;
    }
      
    .skills-section::before {
      display: none;
    }
      
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 56px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .skills-text-side .sec-super { color: rgba(245,160,200,0.5); }
    .skills-text-side .sec-title { color: var(--pink); margin-bottom: 32px; }
    .skills-tabs-vert {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .skill-tab-vert {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 18px 0;
      border-top: 1px solid rgba(245,160,200,0.12);
      font-family: var(--cond);
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(245,160,200,0.55);
      transition: all 0.2s;
      text-align: left;
      width: 100%;
    }
    .skill-tab-vert:last-child { border-bottom: 1px solid rgba(245,160,200,0.12); }
    .skill-tab-vert:hover { color: var(--pink); padding-left: 8px; }
    .skill-tab-vert-on { color: var(--pink); padding-left: 8px; }
    .skill-tab-vert-on .stv-arrow { color: var(--pink); transform: translateX(4px); }
    .stv-arrow {
      font-size: 1rem;
      color: rgba(245,160,200,0.3);
      transition: color 0.2s, transform 0.2s;
    }
    .stv-count {
      font-family: var(--body-f);
      font-size: 0.7rem;
      font-weight: 400;
      letter-spacing: 0.08em;
      color: rgba(245,160,200,0.4);
    }
    .skills-active-desc {
      font-family: var(--body-f);
      font-size: 0.78rem;
      font-weight: 300;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
      line-height: 1.85;
      margin-top: 24px;
      max-width: 50ch;
    }
    .skills-globe-side {
      width: 100%;
      position: relative;
    }

    /* ── CONTACT ── */
    .contact-section {
      background: var(--burg);
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 560px;
    }
    .contact-left {
      padding: 80px 5vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .contact-label {
      font-family: var(--cond);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--pink);
      margin-bottom: 20px;
    }
    .contact-heading {
      font-family: var(--cond);
      font-size: clamp(2rem, 5vw, 5rem);
      font-weight: 900;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: white;
      line-height: 0.95;
      margin-bottom: 32px;
    }
    .contact-sub {
      font-family: var(--body-f);
      font-size: 0.78rem;
      font-weight: 300;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.5);
      line-height: 1.85;
      max-width: 44ch;
      margin-bottom: 40px;
    }
    .contact-btns { display: flex; flex-direction: column; gap: 14px; max-width: 420px; }
    .contact-right {
      background: var(--burg2);
      padding: 80px 5vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .contact-link-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 0;
      border-bottom: 1px solid rgba(245,160,200,0.12);
      gap: 16px;
      transition: padding-left 0.22s;
    }
    .contact-link-row:first-child { border-top: 1px solid rgba(245,160,200,0.12); }
    .contact-link-row:hover { padding-left: 8px; }
    .cl-label {
      font-family: var(--cond);
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(245,160,200,0.45);
      margin-bottom: 4px;
    }
    .cl-val {
      font-family: var(--cond);
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: white;
    }
    .cl-arrow {
      color: rgba(245,160,200,0.35);
      font-size: 1rem;
      transition: color 0.2s, transform 0.2s;
    }
    .contact-link-row:hover .cl-arrow { color: var(--pink); transform: translateX(4px); }

    /* ── FOOTER ── */
    .footer-tagline { background: var(--cream); padding: 60px 5vw 20px; }
    .tagline-text {
      font-family: var(--cond);
      font-size: clamp(1.4rem, 3.5vw, 4rem);
      font-weight: 900;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--burg);
      line-height: 1.1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0 32px;
      margin-bottom: 48px;
      padding-bottom: 48px;
      border-bottom: 1px solid rgba(26,8,8,0.12);
    }
    .footer-links {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 32px;
      padding-bottom: 32px;
    }
    .footer-col-head {
      font-family: var(--cond);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 14px;
    }
    .footer-col-link {
      display: block;
      font-family: var(--body-f);
      font-size: 0.78rem;
      font-weight: 300;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--body);
      margin-bottom: 8px;
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: opacity 0.2s;
    }
    .footer-col-link:hover { opacity: 0.6; }
    .footer-col-text {
      font-family: var(--body-f);
      font-size: 0.72rem;
      font-weight: 300;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
      line-height: 1.7;
    }
    .footer-wordmark {
      background: var(--cream);
      overflow: hidden;
      line-height: 0.8;
      padding-top: 20px;
    }
    .footer-word {
      font-family: var(--cond);
      font-size: clamp(10rem, 22vw, 28rem);
      font-weight: 900;
      letter-spacing: -0.02em;
      text-transform: uppercase;
      color: var(--burg);
      display: block;
      line-height: 0.82;
    }

    /* ── TOAST ── */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      background: var(--pink);
      color: var(--burg);
      font-family: var(--cond);
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 12px 28px;
    }

    /* ── ENTER ANIMATIONS ── */
    .fade-up {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .mounted .fade-up { opacity: 1; transform: none; }
    .mounted .d1 { transition-delay: 0.05s; }
    .mounted .d2 { transition-delay: 0.18s; }
    .mounted .d3 { transition-delay: 0.3s; }
    .mounted .d4 { transition-delay: 0.42s; }

    /* ── RESPONSIVE ── */
    @media (max-width: 1024px) {
      .intro { grid-template-columns: 1fr; }
      .dark-panel { grid-template-columns: 1fr; }
      .contact-section { grid-template-columns: 1fr; }
      .skills-grid { grid-template-columns: 1fr; gap: 40px; }
      .statement-text { grid-template-columns: 1fr 1fr; }
      .tagline-text { grid-template-columns: 1fr 1fr; }
      .footer-links { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-burger { display: flex; }
      .nav { padding: 16px 24px; }
      .intro { padding: 56px 24px; }
      .projects-section, .timeline-section, .skills-section { padding: 60px 24px; }
      .contact-left, .contact-right { padding: 60px 24px; }
      .footer-tagline { padding: 48px 24px 16px; }
      .proj-row { grid-template-columns: 1fr; gap: 16px; }
      .proj-row:hover { margin: 0 -24px; padding: 40px 24px; }
      .statement-text { grid-template-columns: 1fr; font-size: clamp(2rem,8vw,4rem); }
      .tagline-text { grid-template-columns: 1fr; }
      .footer-links { grid-template-columns: 1fr 1fr; }
    }
    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
    }
  `;

  return (
    <div className={mounted ? "mounted" : ""}>
      <style>{css}</style>

      {/* SCROLL PROGRESS BAR */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* MOBILE DRAWER OVERLAY */}
      <div
        className={`mobile-drawer-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <button type="button" className="mobile-drawer-link" onClick={() => closeMenuAndScroll("about")}>About</button>
        <button type="button" className="mobile-drawer-link" onClick={() => closeMenuAndScroll("projects")}>Projects</button>
        <button type="button" className="mobile-drawer-link" onClick={() => closeMenuAndScroll("timeline")}>Timeline</button>
        <button type="button" className="mobile-drawer-link" onClick={() => closeMenuAndScroll("skills")}>Skills</button>
        <button type="button" className="mobile-drawer-link" onClick={() => closeMenuAndScroll("contact")}>Contact</button>
        <a href="mailto:kisamae1997@gmail.com" className="mobile-drawer-cta" onClick={() => setMenuOpen(false)}>
          Get in Touch
        </a>
      </div>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Julie Anne Cantillep</div>
        <div className="nav-links">
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#timeline" className="nav-link">Timeline</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <a href="mailto:kisamae1997@gmail.com" className="nav-link" style={{ display: "none" }}>Get in Touch</a>
        {/* Hamburger (mobile only) */}
        <button
          type="button"
          className={`nav-burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-photo">
          <div className="hero-photo-overlay" />
          <Image
            src="/profile.jpg"
            alt="Julie Anne Cantillep"
            fill
            loading="eager"
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
          />
        </div>
        <div className="hero-name-wrap">
          <span className="hero-name-giant">JULIE ANNE</span>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro" id="about">
        <div className="intro-left fade-up d2">
          <h1 className="intro-heading">
            I'm a software<br />developer.<br />Let's build.
          </h1>
          <p className="intro-body">
            I build modern software across frontend, backend, and embedded systems — from React and scalable APIs to intelligent IoT devices and hardware-connected products. Based in Malmö, Sweden. Open to software engineering and product development roles.
          </p>
          <button
            type="button"
            className="pill-btn"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Work with Me
          </button>
          <div className="intro-bottom-photo">
            <Image
              src="/intro-img-1.png"
              alt="Julie Anne Cantillep"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
        <div className="intro-photo-box fade-up d3">
          <Image
            src="/intro-img.png"
            alt="Julie Anne Cantillep"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </section>

      {/* STATEMENT */}
      <section className="statement fade-up d2">
        <div className="statement-text">
          <span>INSPIRING</span>
          <span>CLEAN CODE</span>
          <span>AND</span>
          <span>THOUGHTFUL DESIGN</span>
        </div>
      </section>

      {/* ORANGE MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* DARK APPROACH PANEL */}
      <section className="dark-panel">
        <div className="dark-panel-text fade-up d2">
          <div className="dark-label">My Approach</div>
          <h2 className="dark-heading">
            Collaborative,<br />iterative,<br />design-aware.
          </h2>
          <p className="dark-body">
            I work closely with teams I join, immersing myself in the product's vision. I ship working code quickly and refine based on feedback. I care about the interface as much as the logic — clean, accessible, and polished UIs are part of my standard.
          </p>
        </div>
        <div className="dark-panel-photo fade-up d3">
          <Image
            src="/profile.jpg"
            alt="Julie Anne Cantillep"
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center top", filter: "brightness(0.6) saturate(0.7)" }}
          />
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects-section" id="projects">
        <div className="fade-up d2">
          <div className="sec-super">Selected Work</div>
          <div className="sec-title">Projects</div>
        </div>
        <div className="proj-list fade-up d3">
          {projectItems.map(p => (
            <article key={p.name} className="proj-row">
              <div>
                <div className="proj-cat">{p.category}</div>
                <h3 className="proj-name">{p.name}</h3>
                <div className="proj-tags-row">
                  {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                </div>
              </div>
              <div className="proj-right">
                <p className="proj-summary">{p.summary}</p>
                <div className="proj-links-row">
                  {p.links.map(link => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="proj-link"
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

      {/* TIMELINE */}
      <section className="timeline-section" id="timeline">
        <div className="fade-up d2">
          <div className="sec-super" style={{ color: "rgba(245,160,200,0.5)" }}>Career Arc</div>
          <div className="sec-title" style={{ color: "var(--pink)" }}>Timeline</div>
        </div>
        <div className="filter-row fade-up d3">
          {timelineFilters.map(f => (
            <button key={f} type="button"
              className={`filter-chip ${tlFilter === f ? "filter-chip-on" : ""}`}
              onClick={() => setTlFilter(f)}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
        <div className="tl-list fade-up d4">
          {filteredTl.map(item => (
            <div key={`${item.year}-${item.title}`} className="tl-row">
              <div className="tl-year">{item.year}</div>
              <div>
                <div className="tl-title">{item.title}</div>
                <div className="tl-sub">{item.subtitle}</div>
                <div className="tl-detail">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS — 3D GLOBE */}
      <section className="skills-section skills-section-full" id="skills">
        <SkillsGlobe />
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-left fade-up d2">
          <div className="contact-label">Get in Touch</div>
          <h2 className="contact-heading">
            Let's<br />work<br />together.
          </h2>
          <p className="contact-sub">
            Open to SWE, product engineering, and frontend roles. I reply within 24 hours.
          </p>
          <div className="contact-btns">
            <a
              href="mailto:kisamae1997@gmail.com"
              className="pill-btn"
              style={{ background: "var(--pink)", color: "var(--burg)", borderColor: "var(--pink)", maxWidth: "100%" }}
            >
              Send Email
            </a>
            <button
              type="button"
              className="pill-btn"
              style={{ color: "var(--pink)", borderColor: "rgba(245,160,200,0.4)", maxWidth: "100%" }}
              onClick={copyEmail}
            >
              Copy Address
            </button>
          </div>
        </div>
        <div className="contact-right fade-up d3">
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
              <div>
                <div className="cl-label">{item.label}</div>
                <div className="cl-val">{item.val}</div>
              </div>
              <span className="cl-arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-tagline">
        <div className="tagline-text fade-up d2">
          <span>Inspiring</span>
          <span>Clean Code</span>
          <span>And</span>
          <span>Bold Ideas</span>
        </div>
        <div className="footer-links fade-up d3">
          <div>
            <div className="footer-col-text">
              Fullstack Developer<br />
              Malmö, Sweden<br />
              Open to work · 2026
            </div>
          </div>
          <div>
            <div className="footer-col-head">Navigate</div>
            <a href="#projects" className="footer-col-link">Projects</a>
            <a href="#timeline" className="footer-col-link">Timeline</a>
            <a href="#skills" className="footer-col-link">Skills</a>
          </div>
          <div>
            <div className="footer-col-head">Stack</div>
            <span className="footer-col-link" style={{ textDecoration: "none" }}>Next.js · React</span>
            <span className="footer-col-link" style={{ textDecoration: "none" }}>TypeScript · Python</span>
            <span className="footer-col-link" style={{ textDecoration: "none" }}>FastAPI · MongoDB</span>
          </div>
          <div>
            <div className="footer-col-head">Contact</div>
            <a href="mailto:kisamae1997@gmail.com" className="footer-col-link">Email</a>
            <a href="https://www.linkedin.com/in/julie-anne-cantillep-4ba4ab250/" className="footer-col-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/Julieanna97" className="footer-col-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>

      <div className="footer-wordmark">
        <span className="footer-word">CANTILLEP</span>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}