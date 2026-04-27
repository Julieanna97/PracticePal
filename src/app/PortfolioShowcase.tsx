"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

const SkillsGlobe = dynamic(() => import("@/app/SkillsGlobe"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "min(70vh, 640px)", minHeight: "480px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,160,200,0.4)" }}>
      Loading globe...
    </div>
  ),
});

type TimelineFilter = "all" | "work" | "product" | "ai" | "education";

type TimelineItem = {
  id: string;
  year: string;
  category: Exclude<TimelineFilter, "all">;
  title: string;
  subtitle: string;
  detail: string;
  longDetail: string;
  techTags: string[];
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
  { id: "sigma-2023", year: "2023", category: "work", title: "Embedded Software Developer Intern", subtitle: "Sigma Industry Evolution", detail: "Built part of an autonomous radio-controlled car project using Arduino, sensors, C/C++, and Python.", longDetail: "Worked on reliability and control behavior for a radio-controlled autonomous prototype, iterating with hardware constraints and testing loops to keep navigation stable under changing sensor input.", techTags: ["Arduino", "C/C++", "Python", "Sensors"] },
  { id: "nodehill-2024", year: "2024", category: "work", title: "Embedded Software Developer Intern", subtitle: "Nodehill AB", detail: "Implemented a LoRa communication system using ESP32 microcontrollers and LoRa modules for long-range wireless communication.", longDetail: "Designed and validated long-range communication behavior between ESP32 nodes, balancing packet reliability, power tradeoffs, and message timing across noisy environments.", techTags: ["ESP32", "LoRa", "UART", "Embedded C"] },
  { id: "outlier-2024", year: "2024-25", category: "ai", title: "AI Trainer (Coder)", subtitle: "Outlier", detail: "Developed, reviewed, and optimized AI model outputs, improved training quality, and supported cross-functional AI workflows.", longDetail: "Reviewed model-generated outputs at scale, tightened quality bar for technical correctness, and helped normalize evaluation patterns so feedback loops produced more consistent model behavior.", techTags: ["LLM QA", "Prompting", "Evaluation", "Code Review"] },
  { id: "podmanager-2025", year: "2025-26", category: "product", title: "Fullstack Developer", subtitle: "PodManager.ai", detail: "Shipped features across a Next.js + TypeScript frontend and FastAPI backend for podcast editing, recording studio workflows, guest management, and marketplace modules.", longDetail: "Contributed end-to-end product features in a moving production codebase, including real-time studio flows and media editing surfaces, while shipping incremental PRs that aligned with existing architecture.", techTags: ["Next.js", "FastAPI", "MongoDB", "Socket.IO"] },
  { id: "oneforma-2026", year: "2026", category: "ai", title: "Quality Assurance Analyst", subtitle: "OneForma.com", detail: "Reviewed and improved multilingual AI content applying QA guidelines, natural language quality checks, and workflow consistency.", longDetail: "Executed multilingual quality validation for AI content pipelines, identifying ambiguity patterns and enforcing consistent acceptance criteria across language and domain variants.", techTags: ["QA", "NLP", "Multilingual", "Guidelines"] },
  { id: "appen-2026", year: "2026", category: "ai", title: "AI Data Specialist", subtitle: "Appen.com", detail: "Worked on AI training projects involving text, audio, and multilingual data — transcription, labeling, and content evaluation.", longDetail: "Supported supervised data workflows for AI training by structuring and validating text/audio datasets, with emphasis on consistency, annotation quality, and reproducible labeling outcomes.", techTags: ["Annotation", "Transcription", "Audio Data", "Dataset QA"] },
  { id: "media-institute-2026", year: "2026", category: "education", title: "Fullstack Developer", subtitle: "The Media Institute", detail: "Recently graduated after training in frontend, backend, databases, APIs, agile development, and e-commerce.", longDetail: "Built fullstack projects across frontend/backend and commerce flows, focusing on practical delivery, clean architecture basics, and collaborative product iteration in sprint-based workflows.", techTags: ["React", "Node.js", "APIs", "Agile"] },
  { id: "movant-2024", year: "2024", category: "education", title: "Embedded Software Development", subtitle: "Movant University of Applied Science", detail: "Completed studies in embedded software and contributed to an autonomous car project.", longDetail: "Completed applied embedded systems coursework and project work centered on hardware-aware development, low-level debugging, and system behavior under constrained resources.", techTags: ["Embedded", "C/C++", "RTOS", "Hardware"] },
];

const projectItems: ProjectItem[] = [
  { name: "PracticePal", category: "Full Product", summary: "A practice planning and analytics SaaS for musicians — authentication, session tracking, plans, and subscriptions from zero to launch.", links: [{ label: "View Case Study", href: "/projects/practicepal" }, { label: "View Demo", href: "/auth/login?callbackUrl=%2Fdashboard" }, { label: "GitHub", href: "https://github.com/Julieanna97/PracticePal", external: true }], bullets: ["Next.js app router with MongoDB and NextAuth", "Stripe subscription flows and webhook syncing", "End-to-end SaaS story from concept to launch"], tags: ["Next.js", "MongoDB", "Stripe", "NextAuth"] },
  { name: "PodManager.ai", category: "Internship", summary: "Worked in a monorepo podcast platform with Next.js App Router, FastAPI, MongoDB, and Socket.IO to deliver studio, editing, publishing, and marketplace experiences.", links: [{ label: "View Case Study", href: "/projects/podmanager" }, { label: "Website", href: "https://www.podmanager.ai/", external: true }], bullets: ["Built real-time studio and editing flows with Socket.IO, WaveSurfer.js, and MediaPipe/TensorFlow tooling", "Implemented form-heavy product surfaces using React Hook Form + Zod with SWR data fetching", "Contributed to FastAPI services, MongoDB-backed modules, and Dockerized deployment workflows"], tags: ["Next.js", "TypeScript", "FastAPI", "Socket.IO", "MongoDB", "WaveSurfer.js"] },
  { name: "Sigma Autonomous Car", category: "Embedded Systems", summary: "An Arduino-based autonomous car focused on sensor input, control loops, and path reliability.", links: [{ label: "GitHub Profile", href: "https://github.com/Julieanna97", external: true }], bullets: ["Sensor calibration and data fusion", "C/C++ firmware with Python testing", "Constrained hardware problem solving"], tags: ["Arduino", "C/C++", "Python", "RTOS/Zephyr"] },
];

const timelineFilters: TimelineFilter[] = ["all", "work", "product", "ai", "education"];

const timelineCategoryColors: Record<Exclude<TimelineFilter, "all">, string> = {
  product: "#f5a0c8",
  work: "#e8613a",
  ai: "#f0ece4",
  education: "#7a5050",
};

const codeLines = [
  { text: "import { build } from 'julie-anne';", color: "#f5a0c8" },
  { text: "", color: "" },
  { text: "const stack = {", color: "#e8a4c8" },
  { text: "  frontend: 'React, Next.js, TypeScript',", color: "#cccccc" },
  { text: "  backend:  'FastAPI, Node.js, Mongo',", color: "#cccccc" },
  { text: "  systems:  'C/C++, Arduino, ESP32',", color: "#cccccc" },
  { text: "};", color: "#e8a4c8" },
  { text: "", color: "" },
  { text: "function ship(idea) {", color: "#e8613a" },
  { text: "  return build(idea, { care: true });", color: "#cccccc" },
  { text: "}", color: "#e8613a" },
  { text: "", color: "" },
  { text: "// shipping in Malmö, SE", color: "#7a8a7a" },
  { text: "// open to work · 2026", color: "#7a8a7a" },
];

const terminalLines = [
  { text: "$ git log --oneline -5", color: "#4ade80" },
  { text: "a3f21c4 feat: add stripe webhook sync", color: "#e8d8d8" },
  { text: "8b7e2d1 fix: session timezone edge case", color: "#e8d8d8" },
  { text: "c4d9f88 refactor: auth middleware chain", color: "#e8d8d8" },
  { text: "12ae5b3 feat: practice analytics view", color: "#e8d8d8" },
  { text: "9f0c3a7 style: dashboard layout polish", color: "#e8d8d8" },
  { text: "", color: "" },
  { text: "$ npm run deploy", color: "#4ade80" },
  { text: "\u2713 Build completed (2.1s)", color: "#f5a0c8" },
  { text: "\u2713 47 tests passed", color: "#f5a0c8" },
  { text: "\u2713 Deployed to production", color: "#4ade80" },
  { text: "", color: "" },
  { text: "$ echo \"shipping from malm\u00f6 \ud83d\ude80\"", color: "#4ade80" },
  { text: "shipping from malm\u00f6 \ud83d\ude80", color: "#e8613a" },
];

export default function PortfolioShowcase() {
  const [mounted, setMounted] = useState(false);
  const [tlFilter, setTlFilter] = useState<TimelineFilter>("all");
  const [toast, setToast] = useState("");
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedTimelineId, setExpandedTimelineId] = useState<string | null>(null);
  const [hoveredTimelineId, setHoveredTimelineId] = useState<string | null>(null);
  const [visibleTimelineRows, setVisibleTimelineRows] = useState<Record<string, boolean>>({});
  const [termLines, setTermLines] = useState<string[]>([]);
  const [termLine, setTermLine] = useState(0);
  const [termChar, setTermChar] = useState(0);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorEnabled, setCursorEnabled] = useState(false);

  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  const timelineRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tlLineRef = useRef<HTMLDivElement>(null);
  const tlTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setScrollPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setCursorEnabled(true);
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18; ringY += (mouseY - ringY) * 0.18;
      if (cursorRingRef.current) cursorRingRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest("a, button, [data-hover], input, textarea, label, select");
      cursorRingRef.current?.classList.toggle("cursor-ring-grow", isInteractive);
      cursorRef.current?.classList.toggle("cursor-dot-hide", isInteractive);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    requestAnimationFrame(animateRing);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver); };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (currentLine >= codeLines.length) {
      const t = setTimeout(() => { setTypedLines([]); setCurrentLine(0); setCurrentChar(0); }, 3500);
      return () => clearTimeout(t);
    }
    const line = codeLines[currentLine].text;
    if (currentChar >= line.length) {
      const t = setTimeout(() => { setTypedLines(prev => [...prev, line]); setCurrentLine(c => c + 1); setCurrentChar(0); }, line === "" ? 80 : 220);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrentChar(c => c + 1), 28 + Math.random() * 36);
    return () => clearTimeout(t);
  }, [mounted, currentLine, currentChar]);

  // Terminal typing effect
  useEffect(() => {
    if (!mounted) return;
    if (termLine >= terminalLines.length) {
      const t = setTimeout(() => { setTermLines([]); setTermLine(0); setTermChar(0); }, 4000);
      return () => clearTimeout(t);
    }
    const line = terminalLines[termLine].text;
    if (termChar >= line.length) {
      const isCmd = line.startsWith("$");
      const t = setTimeout(() => { setTermLines(prev => [...prev, line]); setTermLine(c => c + 1); setTermChar(0); }, line === "" ? 80 : isCmd ? 400 : 120);
      return () => clearTimeout(t);
    }
    const isCmd = terminalLines[termLine].text.startsWith("$");
    const t = setTimeout(() => setTermChar(c => c + 1), isCmd ? 35 + Math.random() * 45 : 8 + Math.random() * 14);
    return () => clearTimeout(t);
  }, [mounted, termLine, termChar]);

  const filteredTl = useMemo(
    () => timelineItems.filter(i => tlFilter === "all" || i.category === tlFilter),
    [tlFilter]
  );

  const timelineCounts = useMemo(() => {
    return timelineItems.reduce(
      (acc, item) => { acc[item.category] += 1; return acc; },
      { work: 0, product: 0, ai: 0, education: 0 } as Record<Exclude<TimelineFilter, "all">, number>
    );
  }, []);

  // Indexes that are visible
  const visibleIndexes = useMemo(() => {
    return filteredTl
      .map((item, idx) => visibleTimelineRows[item.id] ? idx : -1)
      .filter(i => i >= 0);
  }, [filteredTl, visibleTimelineRows]);

  const lastVisibleIndex = visibleIndexes.length > 0 ? visibleIndexes[visibleIndexes.length - 1] : -1;

  const timelineFillPct = filteredTl.length > 0
    ? Math.max(0, ((lastVisibleIndex + 1) / filteredTl.length) * 100)
    : 0;

  useEffect(() => {
    setVisibleTimelineRows({});
    setExpandedTimelineId(null);
    setHoveredTimelineId(null);
  }, [tlFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        setVisibleTimelineRows(prev => {
          const next = { ...prev };
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).dataset.timelineId;
            if (!id) continue;
            if (entry.isIntersecting) next[id] = true;
          }
          return next;
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    for (const item of filteredTl) {
      const node = timelineRefs.current[item.id];
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, [filteredTl]);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText("kisamae1997@gmail.com"); setToast("EMAIL COPIED"); }
    catch { setToast("kisamae1997@gmail.com"); }
  };

  const closeMenuAndScroll = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const marqueeItems = ["FULLSTACK DEVELOPER", "EMBEDDED SYSTEMS", "AI WORKFLOWS", "REACT & NEXT.JS", "C/C++ & ARDUINO", "OPEN TO WORK"];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500&family=JetBrains+Mono:wght@400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    :root {
      --burg: #1a0808; --burg2: #2e0e0e; --cream: #f0ece4;
      --pink: #f5a0c8; --orange: #e8613a; --ink: #1a0808;
      --body: #3a1818; --muted: #7a5050;
      --cond: 'Barlow Condensed', sans-serif;
      --body-f: 'Barlow', sans-serif;
      --mono: 'JetBrains Mono', ui-monospace, monospace;
    }

    body { background: var(--cream); color: var(--ink); font-family: var(--body-f); font-weight: 300; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
    a { color: inherit; text-decoration: none; }
    button { font: inherit; cursor: pointer; background: none; border: none; }
    ::selection { background: var(--pink); color: var(--burg); }

    .cursor-enabled, .cursor-enabled * { cursor: none !important; }
    @media (hover: none) or (pointer: coarse) {
      .cursor-enabled, .cursor-enabled * { cursor: auto !important; }
      .cursor-dot, .cursor-ring { display: none !important; }
    }
    .cursor-dot { position: fixed; top: 0; left: 0; width: 8px; height: 8px; margin-left: -4px; margin-top: -4px; background: var(--pink); border-radius: 50%; pointer-events: none; z-index: 9999; mix-blend-mode: difference; transition: opacity 0.2s ease; }
    .cursor-dot-hide { opacity: 0; }
    .cursor-ring { position: fixed; top: 0; left: 0; width: 36px; height: 36px; margin-left: -18px; margin-top: -18px; border: 1.5px solid var(--pink); border-radius: 50%; pointer-events: none; z-index: 9998; transition: width 0.25s ease, height 0.25s ease, margin 0.25s ease, background 0.25s ease; will-change: transform; }
    .cursor-ring.cursor-ring-grow { width: 60px; height: 60px; margin-left: -30px; margin-top: -30px; background: rgba(245,160,200,0.18); }

    .scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--pink) 0%, var(--orange) 100%); z-index: 300; transition: width 0.08s linear; pointer-events: none; }

    /* NAV */
    .nav { display: flex; align-items: center; justify-content: space-between; padding: 22px 48px; background: var(--burg); position: sticky; top: 0; z-index: 200; }
    .nav-logo { font-family: var(--cond); font-size: 1.15rem; font-weight: 800; color: var(--pink); letter-spacing: 0.12em; text-transform: uppercase; transition: opacity 0.2s; }
    .nav-logo:hover { opacity: 0.7; }
    .nav-links { display: flex; align-items: center; gap: 44px; }
    .nav-link { font-family: var(--cond); font-size: 1.15rem; font-weight: 800; color: var(--pink); letter-spacing: 0.12em; text-transform: uppercase; position: relative; padding-bottom: 2px; transition: opacity 0.2s; }
    .nav-link::after { content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; background: var(--pink); transform: scaleX(0); transform-origin: left; transition: transform 0.32s cubic-bezier(0.65,0,0.35,1); }
    .nav-link:hover { opacity: 0.85; }
    .nav-link:hover::after { transform: scaleX(1); }
    .nav-burger { display: none; width: 32px; height: 22px; position: relative; flex-direction: column; justify-content: space-between; }
    .nav-burger span { display: block; height: 2px; width: 100%; background: var(--pink); transition: transform 0.3s, opacity 0.3s; transform-origin: center; }
    .nav-burger.open span:nth-child(1) { transform: translateY(10px) rotate(45deg); }
    .nav-burger.open span:nth-child(2) { opacity: 0; }
    .nav-burger.open span:nth-child(3) { transform: translateY(-10px) rotate(-45deg); }
    .mobile-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: min(86%, 360px); background: var(--burg); border-left: 1px solid rgba(245,160,200,0.18); z-index: 250; padding: 100px 32px 40px; display: flex; flex-direction: column; gap: 4px; transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); }
    .mobile-drawer.open { transform: translateX(0); }
    .mobile-drawer-link { font-family: var(--cond); font-size: 1.5rem; font-weight: 800; color: var(--pink); letter-spacing: 0.06em; text-transform: uppercase; padding: 14px 0; border-bottom: 1px solid rgba(245,160,200,0.1); text-align: left; transition: padding-left 0.2s; }
    .mobile-drawer-link:hover, .mobile-drawer-link:focus { padding-left: 8px; }
    .mobile-drawer-cta { margin-top: 24px; font-family: var(--cond); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--burg); background: var(--pink); padding: 16px 24px; border-radius: 999px; text-align: center; }
    .mobile-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 240; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
    .mobile-drawer-overlay.open { opacity: 1; pointer-events: auto; }

    /* HERO */
    .hero { background: var(--burg); padding: 36px 3vw 0; overflow: hidden; }
    .hero-photo { position: relative; width: 100%; height: 72vh; min-height: 520px; overflow: hidden; }
    .hero-photo-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(26,8,8,0.08) 0%, rgba(26,8,8,0.22) 100%); z-index: 1; }
    .hero-name-wrap { padding: 18px 2vw 0; line-height: 0.8; overflow: hidden; }
    .hero-name-giant { display: block; font-family: var(--cond); font-size: clamp(7rem, 21vw, 26rem); font-weight: 900; color: var(--pink); letter-spacing: -0.03em; text-transform: uppercase; line-height: 0.82; white-space: nowrap; }

    /* INTRO */
    .intro { background: var(--cream); padding: 72px 5vw; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: start; }
    .intro-left { display: flex; flex-direction: column; }
    .intro-heading { font-family: var(--cond); font-size: clamp(1.6rem, 3.5vw, 2.8rem); font-weight: 800; color: var(--burg); letter-spacing: 0.02em; text-transform: uppercase; line-height: 1.1; margin-bottom: 28px; }
    .intro-body { font-family: var(--body-f); font-size: 0.82rem; font-weight: 400; color: var(--body); line-height: 1.85; letter-spacing: 0.04em; text-transform: uppercase; max-width: 52ch; margin-bottom: 40px; }

    /* CODE EDITOR */
    .code-editor { margin-top: 64px; width: 100%; max-width: 640px; border-radius: 14px; background: #0d0506; border: 1px solid rgba(245,160,200,0.2); box-shadow: 0 24px 60px -12px rgba(26,8,8,0.45); overflow: hidden; font-family: var(--mono); transition: transform 0.5s ease, box-shadow 0.5s ease; }
    .code-editor:hover { transform: translateY(-4px) rotate(-0.4deg); box-shadow: 0 32px 72px -8px rgba(245,160,200,0.18); }
    .code-bar { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: #1a0808; border-bottom: 1px solid rgba(245,160,200,0.1); }
    .code-dot { width: 11px; height: 11px; border-radius: 50%; }
    .code-bar-title { margin-left: 16px; font-family: var(--mono); font-size: 0.72rem; color: rgba(245,160,200,0.55); letter-spacing: 0.05em; }
    .code-body { padding: 22px 24px 26px; min-height: 320px; font-size: 0.85rem; line-height: 1.8; color: #e8d8d8; }
    .code-line { display: flex; gap: 14px; white-space: pre; }
    .code-line-num { flex-shrink: 0; width: 22px; text-align: right; color: rgba(245,160,200,0.3); user-select: none; }
    .code-line-text { flex: 1; min-width: 0; }
    .code-cursor { display: inline-block; width: 7px; height: 1.05em; vertical-align: text-bottom; background: var(--pink); margin-left: 1px; animation: blink 1s infinite; }
    @keyframes blink { 0%,49% { opacity:1; } 50%,100% { opacity:0; } }

    /* TERMINAL CARD */
    .terminal-card {
      position: relative;
      width: 100%; max-width: 520px;
      margin-left: auto;
      border-radius: 14px;
      background: #0d0506;
      border: 1px solid rgba(245,160,200,0.2);
      box-shadow: 0 32px 80px -16px rgba(26,8,8,0.7), 0 0 0 1px rgba(245,160,200,0.06);
      overflow: hidden;
      font-family: var(--mono);
      transition: transform 0.5s ease, box-shadow 0.5s ease;
    }
    .terminal-card:hover {
      transform: translateY(-4px) rotate(0.3deg);
      box-shadow: 0 48px 96px -16px rgba(245,160,200,0.2), 0 0 60px -20px rgba(245,160,200,0.15);
    }
    .terminal-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: #1a0808;
      border-bottom: 1px solid rgba(245,160,200,0.1);
    }
    .terminal-bar-title {
      margin-left: 16px;
      font-family: var(--mono);
      font-size: 0.72rem;
      color: rgba(245,160,200,0.55);
      letter-spacing: 0.05em;
    }
    .terminal-body {
      padding: 22px 24px 26px;
      min-height: 380px;
      font-size: 0.82rem;
      line-height: 1.85;
      color: #e8d8d8;
    }
    .terminal-line {
      white-space: pre;
    }
    .terminal-line-text {
      min-width: 0;
    }
    .terminal-glow {
      position: absolute;
      bottom: -40px; left: 50%;
      transform: translateX(-50%);
      width: 200px; height: 80px;
      background: radial-gradient(ellipse, rgba(74,222,128,0.2) 0%, transparent 70%);
      pointer-events: none;
      filter: blur(20px);
      animation: term-glow 3s ease-in-out infinite;
    }
    @keyframes term-glow { 0%,100%{opacity:0.5;} 50%{opacity:1;} }

    /* PROCESS FLOW CARDS */
    .process-cards-wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 48px 36px;
      justify-content: center;
      height: 100%;
    }
    .process-card {
      position: relative;
      background: rgba(245,160,200,0.04);
      border: 1px solid rgba(245,160,200,0.12);
      border-radius: 16px;
      padding: 28px 28px 24px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: all 0.4s cubic-bezier(0.65,0,0.35,1);
      overflow: hidden;
    }
    .process-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(245,160,200,0.06) 0%, transparent 60%);
      border-radius: 16px;
      pointer-events: none;
    }
    .process-card:hover {
      border-color: rgba(245,160,200,0.3);
      background: rgba(245,160,200,0.07);
      transform: translateX(6px);
      box-shadow: 0 12px 40px -12px rgba(245,160,200,0.15);
    }
    .process-card-top {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 12px;
    }
    .process-card-num {
      font-family: var(--cond);
      font-size: 2rem;
      font-weight: 900;
      line-height: 1;
      color: transparent;
      -webkit-text-stroke: 1.5px rgba(245,160,200,0.25);
      transition: -webkit-text-stroke-color 0.3s ease;
      flex-shrink: 0;
    }
    .process-card:hover .process-card-num {
      -webkit-text-stroke-color: var(--pink);
    }
    .process-card-title {
      font-family: var(--cond);
      font-size: 1.05rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: white;
      line-height: 1.15;
      transition: color 0.3s ease;
    }
    .process-card:hover .process-card-title {
      color: var(--pink);
    }
    .process-card-body {
      font-family: var(--body-f);
      font-size: 0.74rem;
      font-weight: 300;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      line-height: 1.75;
      padding-left: 0;
    }
    .process-card-connector {
      display: flex;
      justify-content: flex-start;
      padding-left: 44px;
    }
    .process-card-arrow {
      width: 1px;
      height: 20px;
      background: linear-gradient(180deg, rgba(245,160,200,0.3) 0%, rgba(245,160,200,0.08) 100%);
      position: relative;
    }
    .process-card-arrow::after {
      content: "";
      position: absolute;
      bottom: -3px;
      left: 50%;
      transform: translateX(-50%);
      width: 5px;
      height: 5px;
      border-right: 1px solid rgba(245,160,200,0.3);
      border-bottom: 1px solid rgba(245,160,200,0.3);
      transform: translateX(-50%) rotate(45deg);
    }

    /* PILL BTN */
    .pill-btn { display: inline-flex; align-items: center; justify-content: center; width: 100%; max-width: 480px; padding: 22px 40px; border-radius: 999px; border: 1.5px solid var(--ink); background: transparent; font-family: var(--cond); font-size: 0.88rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink); transition: all 0.32s cubic-bezier(0.65,0,0.35,1); position: relative; overflow: hidden; }
    .pill-btn::before { content: ""; position: absolute; inset: 0; background: var(--ink); transform: scaleX(0); transform-origin: left; transition: transform 0.42s cubic-bezier(0.65,0,0.35,1); z-index: -1; }
    .pill-btn:hover { color: var(--cream); }
    .pill-btn:hover::before { transform: scaleX(1); }

    /* STATEMENT */
    .statement { background: var(--cream); padding: 60px 5vw 72px; }
    .statement-text { font-family: var(--cond); font-size: clamp(2.2rem, 5.5vw, 7rem); font-weight: 900; color: var(--burg); letter-spacing: 0.04em; text-transform: uppercase; line-height: 1.05; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0 40px; }
    .statement-text span { transition: color 0.3s ease, transform 0.3s ease; }
    .statement-text span:hover { color: var(--orange); transform: translateY(-3px); }

    /* MARQUEE */
    .marquee-wrap { background: var(--orange); padding: 16px 0; overflow: hidden; white-space: nowrap; }
    .marquee-inner { display: inline-flex; animation: marquee 22s linear infinite; }
    .marquee-item { font-family: var(--cond); font-size: 1rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--pink); padding: 0 36px; display: inline-flex; align-items: center; gap: 24px; }
    .marquee-item::after { content: "x"; color: rgba(245,160,200,0.6); font-size: 0.7rem; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

    /* DARK PANEL */
    .dark-panel { background: var(--burg); display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
    .dark-panel-text { padding: 72px 5vw; display: flex; flex-direction: column; justify-content: center; }
    .dark-label { font-family: var(--cond); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--pink); margin-bottom: 24px; }
    .dark-heading { font-family: var(--cond); font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: white; line-height: 1.2; margin-bottom: 28px; }
    .dark-body { font-family: var(--body-f); font-size: 0.78rem; font-weight: 300; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.55); line-height: 1.85; max-width: 52ch; }
    .dark-panel-photo { position: relative; overflow: hidden; min-height: 400px; }
    .dark-panel-photo:hover img { transform: scale(1.04); filter: brightness(0.9) saturate(1); }

    /* PROJECTS */
    .projects-section { background: var(--cream); padding: 80px 5vw; }
    .sec-super { font-family: var(--cond); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
    .sec-title { font-family: var(--cond); font-size: clamp(3rem, 7vw, 8rem); font-weight: 900; letter-spacing: 0.01em; text-transform: uppercase; color: var(--burg); line-height: 0.9; margin-bottom: 56px; }
    .proj-list { display: flex; flex-direction: column; gap: 0; }
    .proj-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid rgba(26,8,8,0.12); padding: 40px 0; align-items: start; position: relative; transition: padding 0.3s ease; }
    .proj-row::before { content: ""; position: absolute; top: -1px; left: 0; width: 0; height: 2px; background: var(--pink); transition: width 0.6s cubic-bezier(0.65,0,0.35,1); }
    .proj-row:hover::before { width: 100%; }
    .proj-row:last-child { border-bottom: 1px solid rgba(26,8,8,0.12); }
    .proj-row:hover { background: rgba(26,8,8,0.03); margin: 0 -5vw; padding: 40px 5vw; }
    .proj-cat { font-family: var(--cond); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; transition: color 0.3s ease; }
    .proj-row:hover .proj-cat { color: var(--orange); }
    .proj-name { font-family: var(--cond); font-size: clamp(1.8rem, 3.5vw, 3rem); font-weight: 900; letter-spacing: 0.02em; text-transform: uppercase; color: var(--burg); line-height: 1; margin-bottom: 16px; transition: transform 0.3s ease; }
    .proj-row:hover .proj-name { transform: translateX(6px); }
    .proj-tags-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .proj-tag { font-family: var(--body-f); font-size: 0.68rem; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); border: 1px solid rgba(26,8,8,0.2); padding: 4px 12px; border-radius: 999px; transition: all 0.25s ease; }
    .proj-tag:hover { background: var(--burg); color: var(--pink); border-color: var(--burg); transform: translateY(-2px); }
    .proj-right { padding-top: 4px; }
    .proj-summary { font-family: var(--body-f); font-size: 0.82rem; font-weight: 300; color: var(--body); line-height: 1.8; letter-spacing: 0.04em; text-transform: uppercase; max-width: 54ch; margin-bottom: 24px; }
    .proj-links-row { display: flex; gap: 16px; flex-wrap: wrap; }
    .proj-link { font-family: var(--cond); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--burg); text-decoration: none; position: relative; padding: 6px 0; transition: color 0.25s ease; }
    .proj-link::after { content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 1.5px; background: var(--burg); transform: scaleX(1); transform-origin: right; transition: transform 0.4s cubic-bezier(0.65,0,0.35,1); }
    .proj-link:hover { color: var(--orange); }
    .proj-link:hover::after { background: var(--orange); transform-origin: left; }

    /* ======= TIMELINE ======= */
    .timeline-section { background: var(--burg2); padding: 80px 5vw; }
    .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 48px; }
    .filter-chip { font-family: var(--cond); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(245,160,200,0.6); border: 1px solid rgba(245,160,200,0.25); padding: 8px 14px; transition: all 0.28s ease; display: flex; align-items: center; gap: 7px; }
    .filter-chip:hover { border-color: var(--pink); color: var(--pink); transform: translateY(-2px); box-shadow: 0 6px 16px -8px rgba(245,160,200,0.45); }
    .filter-chip-on { background: var(--pink); color: var(--burg); border-color: var(--pink); }
    .filter-chip-on .chip-count { background: rgba(26,8,8,0.2); color: var(--burg); }
    .chip-count { font-family: var(--mono); font-size: 0.58rem; font-weight: 600; background: rgba(245,160,200,0.12); color: rgba(245,160,200,0.55); padding: 2px 6px; border-radius: 999px; line-height: 1; }

    /* Timeline with vertical line */
    .tl-wrapper {
      display: grid;
      grid-template-columns: 32px 1fr;
      gap: 0;
      position: relative;
    }
    .tl-line-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .tl-line-track {
      position: absolute;
      top: 0; bottom: 0;
      width: 2px;
      background: rgba(245,160,200,0.1);
      left: 50%;
      transform: translateX(-50%);
      border-radius: 999px;
      overflow: hidden;
    }
    .tl-line-fill {
      width: 100%;
      border-radius: 999px;
      background: linear-gradient(180deg, var(--pink) 0%, var(--orange) 100%);
      transition: height 0.6s cubic-bezier(0.65,0,0.35,1);
      position: relative;
    }
    .tl-line-glow {
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 8px; height: 20px;
      background: radial-gradient(ellipse, var(--pink) 0%, transparent 80%);
      filter: blur(4px);
      pointer-events: none;
    }

    .tl-dots-col {
      display: flex;
      flex-direction: column;
    }
    .tl-rows-col {
      display: flex;
      flex-direction: column;
    }

    .tl-entry {
      display: grid;
      grid-template-columns: 32px 1fr;
      align-items: start;
      gap: 0;
    }
    .tl-dot-wrap {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 28px;
      position: relative;
      z-index: 2;
    }
    .tl-dot {
      width: 13px; height: 13px;
      border-radius: 50%;
      border: 2px solid currentColor;
      background: var(--burg2);
      transition: all 0.4s ease;
      flex-shrink: 0;
      position: relative;
    }
    .tl-dot.visible {
      background: currentColor;
      box-shadow: 0 0 0 4px rgba(0,0,0,0.3), 0 0 12px currentColor;
    }
    .tl-dot.active-glow {
      box-shadow: 0 0 0 5px rgba(0,0,0,0.3), 0 0 20px 4px currentColor;
      animation: dot-pulse 2s ease-in-out infinite;
    }
    @keyframes dot-pulse {
      0%,100% { box-shadow: 0 0 0 5px rgba(0,0,0,0.3), 0 0 20px 4px currentColor; }
      50% { box-shadow: 0 0 0 8px rgba(0,0,0,0.15), 0 0 32px 8px currentColor; }
    }

    .tl-row {
      padding: 20px 0 20px 28px;
      border-bottom: 1px solid rgba(245,160,200,0.07);
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateX(-16px);
    }
    .tl-row.tl-visible {
      opacity: 1;
      transform: translateX(0);
    }
    .tl-row:hover { padding-left: 36px; background: rgba(245,160,200,0.03); }
    .tl-row.expanded { background: rgba(245,160,200,0.05); border-left: 2px solid var(--pink); padding-left: 26px; }
    .tl-row.expanded:hover { padding-left: 26px; }

    .tl-row-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
    .tl-year { font-family: var(--cond); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,160,200,0.4); padding-top: 4px; transition: color 0.3s ease; flex-shrink: 0; }
    .tl-row:hover .tl-year { color: var(--pink); }
    .tl-row.expanded .tl-year { color: var(--pink); }
    .tl-row-header { flex: 1; min-width: 0; }
    .tl-title { font-family: var(--cond); font-size: clamp(0.95rem, 1.8vw, 1.25rem); font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: white; margin-bottom: 3px; transition: color 0.3s ease; }
    .tl-row:hover .tl-title { color: var(--pink); }
    .tl-row.expanded .tl-title { color: var(--pink); }
    .tl-sub { font-family: var(--cond); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--pink); margin-bottom: 8px; opacity: 0.8; }
    .tl-detail { font-family: var(--body-f); font-size: 0.76rem; font-weight: 300; letter-spacing: 0.05em; text-transform: uppercase; color: rgba(255,255,255,0.4); line-height: 1.75; }
    .tl-expand-arrow { font-size: 0.7rem; color: rgba(245,160,200,0.3); transition: transform 0.3s ease, color 0.3s ease; flex-shrink: 0; margin-top: 4px; }
    .tl-row:hover .tl-expand-arrow { color: var(--pink); }
    .tl-row.expanded .tl-expand-arrow { transform: rotate(180deg); color: var(--pink); }

    /* Expanded panel */
    .tl-expanded-content {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.45s cubic-bezier(0.65,0,0.35,1), opacity 0.35s ease;
      opacity: 0;
    }
    .tl-expanded-content.open {
      max-height: 300px;
      opacity: 1;
    }
    .tl-long-detail {
      font-family: var(--body-f);
      font-size: 0.78rem;
      font-weight: 300;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
      line-height: 1.85;
      padding: 12px 0 4px;
      border-top: 1px solid rgba(245,160,200,0.08);
      margin-top: 12px;
    }
    .tl-tech-tags { display: flex; flex-wrap: wrap; gap: 6px; padding-top: 14px; }
    .tl-tech-tag {
      font-family: var(--mono);
      font-size: 0.62rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid;
      transition: all 0.2s ease;
    }
    .tl-tech-tag:hover { transform: translateY(-2px); opacity: 0.9; }

    /* Hover side panel */
    .tl-side-panel {
      position: fixed;
      right: 0; top: 50%;
      transform: translateY(-50%) translateX(100%);
      width: 280px;
      background: var(--burg);
      border-left: 2px solid var(--pink);
      padding: 24px 20px;
      z-index: 150;
      transition: transform 0.35s cubic-bezier(0.65,0,0.35,1);
      pointer-events: none;
      box-shadow: -16px 0 48px -8px rgba(26,8,8,0.6);
    }
    .tl-side-panel.visible {
      transform: translateY(-50%) translateX(0);
    }
    .tl-side-panel-year { font-family: var(--mono); font-size: 0.6rem; color: rgba(245,160,200,0.45); margin-bottom: 8px; letter-spacing: 0.1em; }
    .tl-side-panel-title { font-family: var(--cond); font-size: 0.95rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: white; margin-bottom: 4px; }
    .tl-side-panel-sub { font-family: var(--cond); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--pink); margin-bottom: 14px; }
    .tl-side-panel-body { font-family: var(--body-f); font-size: 0.72rem; font-weight: 300; letter-spacing: 0.05em; text-transform: uppercase; color: rgba(255,255,255,0.5); line-height: 1.8; margin-bottom: 14px; }
    .tl-side-panel-tags { display: flex; flex-wrap: wrap; gap: 5px; }
    .tl-side-tag { font-family: var(--mono); font-size: 0.58rem; padding: 3px 8px; border-radius: 3px; border: 1px solid; }

    /* SKILLS */
    .skills-section { background: var(--burg); padding: 0; position: relative; overflow: hidden; }
    .skills-section-full { min-height: 720px; }

    /* CONTACT */
    .contact-section { background: var(--burg); display: grid; grid-template-columns: 1fr 1fr; min-height: 560px; }
    .contact-left { padding: 80px 5vw; display: flex; flex-direction: column; justify-content: center; }
    .contact-label { font-family: var(--cond); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--pink); margin-bottom: 20px; }
    .contact-heading { font-family: var(--cond); font-size: clamp(2rem, 5vw, 5rem); font-weight: 900; letter-spacing: 0.02em; text-transform: uppercase; color: white; line-height: 0.95; margin-bottom: 32px; }
    .contact-sub { font-family: var(--body-f); font-size: 0.78rem; font-weight: 300; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.5); line-height: 1.85; max-width: 44ch; margin-bottom: 40px; }
    .contact-btns { display: flex; flex-direction: column; gap: 14px; max-width: 420px; }
    .contact-right { background: var(--burg2); padding: 80px 5vw; display: flex; flex-direction: column; justify-content: center; }
    .contact-link-row { display: flex; align-items: center; justify-content: space-between; padding: 22px 0; border-bottom: 1px solid rgba(245,160,200,0.12); gap: 16px; transition: padding-left 0.3s ease; }
    .contact-link-row:first-child { border-top: 1px solid rgba(245,160,200,0.12); }
    .contact-link-row:hover { padding-left: 12px; }
    .cl-label { font-family: var(--cond); font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(245,160,200,0.45); margin-bottom: 4px; }
    .cl-val { font-family: var(--cond); font-size: 1rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: white; position: relative; display: inline-block; }
    .cl-val::after { content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 1.5px; background: var(--pink); transform: scaleX(0); transform-origin: left; transition: transform 0.4s cubic-bezier(0.65,0,0.35,1); }
    .contact-link-row:hover .cl-val::after { transform: scaleX(1); }
    .cl-arrow { color: rgba(245,160,200,0.35); font-size: 1rem; transition: color 0.3s, transform 0.3s; }
    .contact-link-row:hover .cl-arrow { color: var(--pink); transform: translateX(6px); }

    /* FOOTER */
    .footer-tagline { background: var(--cream); padding: 60px 5vw 20px; }
    .tagline-text { font-family: var(--cond); font-size: clamp(1.4rem, 3.5vw, 4rem); font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; color: var(--burg); line-height: 1.1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0 32px; margin-bottom: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(26,8,8,0.12); }
    .tagline-text span { transition: color 0.3s ease; }
    .tagline-text span:hover { color: var(--orange); }
    .footer-links { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 32px; padding-bottom: 32px; }
    .footer-col-head { font-family: var(--cond); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
    .footer-col-link { display: block; font-family: var(--body-f); font-size: 0.78rem; font-weight: 300; letter-spacing: 0.08em; text-transform: uppercase; color: var(--body); margin-bottom: 8px; text-decoration: underline; text-underline-offset: 3px; transition: opacity 0.2s, color 0.2s; }
    .footer-col-link:hover { color: var(--orange); }
    .footer-col-text { font-family: var(--body-f); font-size: 0.72rem; font-weight: 300; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); line-height: 1.7; }
    .footer-wordmark { background: var(--cream); overflow: hidden; line-height: 0.8; padding-top: 20px; }
    .footer-word { font-family: var(--cond); font-size: clamp(10rem, 22vw, 28rem); font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; color: var(--burg); display: block; line-height: 0.82; transition: color 0.5s ease; }
    .footer-word:hover { color: var(--orange); }

    /* TOAST */
    .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 9999; background: var(--pink); color: var(--burg); font-family: var(--cond); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 12px 28px; }

    /* ANIMATIONS */
    .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .mounted .fade-up { opacity: 1; transform: none; }
    .mounted .d1 { transition-delay: 0.05s; }
    .mounted .d2 { transition-delay: 0.18s; }
    .mounted .d3 { transition-delay: 0.3s; }
    .mounted .d4 { transition-delay: 0.42s; }

    /* RESPONSIVE */
    @media (max-width: 1024px) {
      .intro { grid-template-columns: 1fr; }
      .dark-panel { grid-template-columns: 1fr; }
      .contact-section { grid-template-columns: 1fr; }
      .statement-text { grid-template-columns: 1fr 1fr; }
      .tagline-text { grid-template-columns: 1fr 1fr; }
      .footer-links { grid-template-columns: 1fr 1fr; }
      .nav-link { font-size: 0.95rem; }
      .nav-links { gap: 28px; }
      .terminal-card { margin-left: 0; max-width: 100%; }
      .tl-side-panel { display: none; }
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-burger { display: flex; }
      .nav { padding: 18px 24px; }
      .intro { padding: 56px 24px; }
      .projects-section, .timeline-section, .skills-section { padding: 60px 24px; }
      .contact-left, .contact-right { padding: 60px 24px; }
      .footer-tagline { padding: 48px 24px 16px; }
      .proj-row { grid-template-columns: 1fr; gap: 16px; }
      .proj-row:hover { margin: 0 -24px; padding: 40px 24px; }
      .statement-text { grid-template-columns: 1fr; font-size: clamp(2rem,8vw,4rem); }
      .tagline-text { grid-template-columns: 1fr; }
      .footer-links { grid-template-columns: 1fr 1fr; }
      .tl-side-panel { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
      .code-cursor { animation: none; opacity: 1; }
    }
  `;

  const hoveredItem = timelineItems.find(i => i.id === hoveredTimelineId);

  return (
    <div className={`${mounted ? "mounted" : ""} ${cursorEnabled ? "cursor-enabled" : ""}`}>
      <style>{css}</style>

      {cursorEnabled && (
        <>
          <div ref={cursorRef} className="cursor-dot" />
          <div ref={cursorRingRef} className="cursor-ring" />
        </>
      )}

      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      <div className={`mobile-drawer-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <button type="button" className="mobile-drawer-link" onClick={() => closeMenuAndScroll("about")}>About</button>
        <button type="button" className="mobile-drawer-link" onClick={() => closeMenuAndScroll("projects")}>Projects</button>
        <button type="button" className="mobile-drawer-link" onClick={() => closeMenuAndScroll("timeline")}>Timeline</button>
        <button type="button" className="mobile-drawer-link" onClick={() => closeMenuAndScroll("skills")}>Skills</button>
        <button type="button" className="mobile-drawer-link" onClick={() => closeMenuAndScroll("contact")}>Contact</button>
        <a href="mailto:kisamae1997@gmail.com" className="mobile-drawer-cta" onClick={() => setMenuOpen(false)}>Get in Touch</a>
      </div>

      <nav className="nav">
        <div className="nav-logo">Julie Anne Cantillep</div>
        <div className="nav-links">
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#timeline" className="nav-link">Timeline</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <button type="button" className={`nav-burger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-photo">
          <div className="hero-photo-overlay" />
          <Image src="/profile.jpg" alt="Julie Anne Cantillep" fill loading="eager" sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
        </div>
        <div className="hero-name-wrap">
          <span className="hero-name-giant">JULIE ANNE</span>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro" id="about">
        <div className="intro-left fade-up d2">
          <h1 className="intro-heading">I'm a software<br />developer.<br />Let's build.</h1>
          <p className="intro-body">
            I build modern software across frontend, backend, and embedded systems — from React and scalable APIs to intelligent IoT devices and hardware-connected products. Based in Malmö, Sweden. Open to software engineering and product development roles.
          </p>
          <button type="button" className="pill-btn" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Work with Me
          </button>

          {/* CODE EDITOR */}
          <div className="code-editor" data-hover>
            <div className="code-bar">
              <span className="code-dot" style={{ background: "#e8613a" }} />
              <span className="code-dot" style={{ background: "#f5a0c8" }} />
              <span className="code-dot" style={{ background: "rgba(245,160,200,0.4)" }} />
              <span className="code-bar-title">julie-anne.ts — portfolio</span>
            </div>
            <div className="code-body">
              {typedLines.map((line, idx) => (
                <div key={idx} className="code-line">
                  <span className="code-line-num">{idx + 1}</span>
                  <span className="code-line-text" style={{ color: codeLines[idx]?.color || "#cccccc" }}>
                    {line || "\u00A0"}
                  </span>
                </div>
              ))}
              {currentLine < codeLines.length && (
                <div className="code-line">
                  <span className="code-line-num">{typedLines.length + 1}</span>
                  <span className="code-line-text" style={{ color: codeLines[currentLine]?.color || "#cccccc" }}>
                    {codeLines[currentLine]?.text.substring(0, currentChar) || ""}
                    <span className="code-cursor" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TERMINAL CARD */}
        <div className="fade-up d3" style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
          <div className="terminal-card" data-hover>
            <div className="terminal-glow" />
            <div className="terminal-bar">
              <span className="code-dot" style={{ background: "#e8613a" }} />
              <span className="code-dot" style={{ background: "#f5a0c8" }} />
              <span className="code-dot" style={{ background: "rgba(245,160,200,0.4)" }} />
              <span className="terminal-bar-title">julie@malmö:~/projects</span>
            </div>
            <div className="terminal-body">
              {termLines.map((line, idx) => (
                <div key={idx} className="terminal-line">
                  <span className="terminal-line-text" style={{ color: terminalLines[idx]?.color || "#cccccc" }}>
                    {line || "\u00A0"}
                  </span>
                </div>
              ))}
              {termLine < terminalLines.length && (
                <div className="terminal-line">
                  <span className="terminal-line-text" style={{ color: terminalLines[termLine]?.color || "#cccccc" }}>
                    {terminalLines[termLine]?.text.substring(0, termChar) || ""}
                    <span className="code-cursor" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="statement fade-up d2">
        <div className="statement-text">
          <span>INSPIRING</span><span>CLEAN CODE</span><span>AND</span><span>THOUGHTFUL DESIGN</span>
        </div>
      </section>

      {/* MARQUEE */}
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
          <h2 className="dark-heading">Collaborative,<br />iterative,<br />design-aware.</h2>
          <p className="dark-body">I work closely with teams I join, immersing myself in the product's vision. I ship working code quickly and refine based on feedback. I care about the interface as much as the logic — clean, accessible, and polished UIs are part of my standard.</p>
        </div>
        <div className="dark-panel-photo fade-up d3">
          <div className="process-cards-wrap">
            <div className="process-card" data-hover>
              <div className="process-card-top">
                <span className="process-card-num">01</span>
                <div className="process-card-title">Understand</div>
              </div>
              <div className="process-card-body">
                Immerse in the product vision, map the problem space, and align with the team before writing a line of code.
              </div>
            </div>

            <div className="process-card-connector"><div className="process-card-arrow" /></div>

            <div className="process-card" data-hover>
              <div className="process-card-top">
                <span className="process-card-num">02</span>
                <div className="process-card-title">Build &amp; Ship</div>
              </div>
              <div className="process-card-body">
                Ship working code fast in small increments. Clean architecture, typed interfaces, tested paths — no shortcuts.
              </div>
            </div>

            <div className="process-card-connector"><div className="process-card-arrow" /></div>

            <div className="process-card" data-hover>
              <div className="process-card-top">
                <span className="process-card-num">03</span>
                <div className="process-card-title">Refine &amp; Iterate</div>
              </div>
              <div className="process-card-body">
                Gather feedback, tighten the UI, polish edge cases. Every cycle gets closer to the right product.
              </div>
            </div>
          </div>
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
                  {p.tags.map(t => <span key={t} className="proj-tag" data-hover>{t}</span>)}
                </div>
              </div>
              <div className="proj-right">
                <p className="proj-summary">{p.summary}</p>
                <div className="proj-links-row">
                  {p.links.map(link => (
                    <Link key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="proj-link">
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

        {/* FILTER CHIPS WITH COUNTS */}
        <div className="filter-row fade-up d3">
          <button
            type="button"
            className={`filter-chip ${tlFilter === "all" ? "filter-chip-on" : ""}`}
            onClick={() => setTlFilter("all")}
          >
            All
            <span className="chip-count">{timelineItems.length}</span>
          </button>
          {(["work", "product", "ai", "education"] as Exclude<TimelineFilter, "all">[]).map(f => (
            <button
              key={f}
              type="button"
              className={`filter-chip ${tlFilter === f ? "filter-chip-on" : ""}`}
              onClick={() => setTlFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="chip-count">{timelineCounts[f]}</span>
            </button>
          ))}
        </div>

        {/* TIMELINE BODY WITH VERTICAL LINE */}
        <div className="fade-up d4" style={{ position: "relative" }}>
          <div className="tl-wrapper">
            {/* VERTICAL LINE */}
            <div style={{ position: "relative", width: "32px" }}>
              <div
                ref={tlTrackRef}
                style={{
                  position: "absolute",
                  top: 0, bottom: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: "2px",
                  background: "rgba(245,160,200,0.1)",
                  borderRadius: "999px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: "2px",
                  height: `${timelineFillPct}%`,
                  background: "linear-gradient(180deg, #f5a0c8 0%, #e8613a 100%)",
                  borderRadius: "999px",
                  transition: "height 0.6s cubic-bezier(0.65,0,0.35,1)",
                }}
              >
                {timelineFillPct > 0 && timelineFillPct < 100 && (
                  <div style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "8px", height: "20px",
                    background: "radial-gradient(ellipse, #f5a0c8 0%, transparent 80%)",
                    filter: "blur(4px)",
                  }} />
                )}
              </div>
              {/* DOT POSITIONS */}
              {filteredTl.map((item, idx) => {
                const pct = filteredTl.length > 1 ? (idx / (filteredTl.length - 1)) * 100 : 50;
                const dotColor = timelineCategoryColors[item.category];
                const isVisible = visibleTimelineRows[item.id];
                const isActive = idx === lastVisibleIndex;
                return (
                  <div
                    key={item.id}
                    style={{
                      position: "absolute",
                      top: `calc(${pct}% - 6px)`,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "13px", height: "13px",
                      borderRadius: "50%",
                      border: `2px solid ${dotColor}`,
                      background: isVisible ? dotColor : "var(--burg2)",
                      boxShadow: isActive
                        ? `0 0 0 4px rgba(0,0,0,0.3), 0 0 16px 3px ${dotColor}`
                        : isVisible
                          ? `0 0 0 3px rgba(0,0,0,0.2), 0 0 8px ${dotColor}`
                          : "none",
                      transition: "all 0.4s ease",
                      zIndex: 2,
                    }}
                  />
                );
              })}
            </div>

            {/* ROWS */}
            <div style={{ flex: 1 }}>
              {filteredTl.map((item, idx) => {
                const dotColor = timelineCategoryColors[item.category];
                const isVisible = visibleTimelineRows[item.id];
                const isExpanded = expandedTimelineId === item.id;
                const delay = `${idx * 0.08}s`;

                return (
                  <div
                    key={item.id}
                    ref={el => { timelineRefs.current[item.id] = el; }}
                    data-timeline-id={item.id}
                    className={`tl-row ${isVisible ? "tl-visible" : ""} ${isExpanded ? "expanded" : ""}`}
                    style={{ transitionDelay: isVisible ? delay : "0s" }}
                    onClick={() => setExpandedTimelineId(isExpanded ? null : item.id)}
                    onMouseEnter={() => setHoveredTimelineId(item.id)}
                    onMouseLeave={() => setHoveredTimelineId(null)}
                  >
                    <div className="tl-row-top">
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", flex: 1 }}>
                        <span className="tl-year">{item.year}</span>
                        <div className="tl-row-header">
                          <div className="tl-title">{item.title}</div>
                          <div className="tl-sub" style={{ color: dotColor }}>{item.subtitle}</div>
                          <div className="tl-detail">{item.detail}</div>
                        </div>
                      </div>
                      <span className="tl-expand-arrow">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        </svg>
                      </span>
                    </div>

                    {/* EXPANDED CONTENT */}
                    <div className={`tl-expanded-content ${isExpanded ? "open" : ""}`}>
                      <div className="tl-long-detail">{item.longDetail}</div>
                      <div className="tl-tech-tags">
                        {item.techTags.map(tag => (
                          <span
                            key={tag}
                            className="tl-tech-tag"
                            style={{
                              color: dotColor,
                              borderColor: `${dotColor}40`,
                              background: `${dotColor}10`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* HOVER SIDE PANEL */}
        {hoveredItem && (
          <div className={`tl-side-panel ${hoveredTimelineId ? "visible" : ""}`}>
            <div className="tl-side-panel-year">{hoveredItem.year}</div>
            <div className="tl-side-panel-title">{hoveredItem.title}</div>
            <div className="tl-side-panel-sub" style={{ color: timelineCategoryColors[hoveredItem.category] }}>
              {hoveredItem.subtitle}
            </div>
            <div className="tl-side-panel-body">{hoveredItem.longDetail}</div>
            <div className="tl-side-panel-tags">
              {hoveredItem.techTags.map(tag => (
                <span
                  key={tag}
                  className="tl-side-tag"
                  style={{
                    color: timelineCategoryColors[hoveredItem.category],
                    borderColor: `${timelineCategoryColors[hoveredItem.category]}40`,
                    background: `${timelineCategoryColors[hoveredItem.category]}10`,
                    fontFamily: "var(--mono)",
                    fontSize: "0.58rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SKILLS GLOBE */}
      <section className="skills-section skills-section-full" id="skills">
        <SkillsGlobe />
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-left fade-up d2">
          <div className="contact-label">Get in Touch</div>
          <h2 className="contact-heading">Let's<br />work<br />together.</h2>
          <p className="contact-sub">Open to SWE, product engineering, and frontend roles. I reply within 24 hours.</p>
          <div className="contact-btns">
            <a href="mailto:kisamae1997@gmail.com" className="pill-btn" style={{ background: "var(--pink)", color: "var(--burg)", borderColor: "var(--pink)", maxWidth: "100%" }}>Send Email</a>
            <button type="button" className="pill-btn" style={{ color: "var(--pink)", borderColor: "rgba(245,160,200,0.4)", maxWidth: "100%" }} onClick={copyEmail}>Copy Address</button>
          </div>
        </div>
        <div className="contact-right fade-up d3">
          {[
            { label: "Email", val: "kisamae1997@gmail.com", href: "mailto:kisamae1997@gmail.com" },
            { label: "Phone", val: "+46 760 393 202", href: "tel:+46760393202" },
            { label: "LinkedIn", val: "julie-anne-cantillep", href: "https://www.linkedin.com/in/julie-anne-cantillep-4ba4ab250/" },
            { label: "GitHub", val: "Julieanna97", href: "https://github.com/Julieanna97" },
          ].map(item => (
            <a key={item.label} className="contact-link-row" href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              <div>
                <div className="cl-label">{item.label}</div>
                <div className="cl-val">{item.val}</div>
              </div>
              <span className="cl-arrow">&#8594;</span>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-tagline">
        <div className="tagline-text fade-up d2">
          <span>Inspiring</span><span>Clean Code</span><span>And</span><span>Bold Ideas</span>
        </div>
        <div className="footer-links fade-up d3">
          <div>
            <div className="footer-col-text">Fullstack Developer<br />Malmö, Sweden<br />Open to work · 2026</div>
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