"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

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

type TimelineItem = {
  year: string;
  category: Exclude<TimelineFilter, "all">;
  title: string;
  subtitle: string;
  detail: string;
  tech?: string[];
  highlight?: string;
};

type ProjectItem = {
  name: string;
  category: string;
  summary: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
  tags: string[];
};

const timelineItems: TimelineItem[] = [
  { year: "2023", category: "work", title: "Embedded Software Developer Intern", subtitle: "Sigma Industry Evolution",
    detail: "Built part of an autonomous radio-controlled car project using Arduino, sensors, C/C++, and Python.",
    tech: ["Arduino", "C/C++", "Python", "Sensors"],
    highlight: "First professional embedded systems role — contributed to autonomous vehicle control loop." },
  { year: "2024", category: "work", title: "Embedded Software Developer Intern", subtitle: "Nodehill AB",
    detail: "Implemented a LoRa communication system using ESP32 microcontrollers and LoRa modules for long-range wireless communication.",
    tech: ["ESP32", "LoRa", "C/C++", "Arduino IDE"],
    highlight: "Designed wireless protocol stack for long-range device-to-device messaging." },
  { year: "2024–25", category: "ai", title: "AI Trainer (Coder)", subtitle: "Outlier",
    detail: "Developed, reviewed, and optimized AI model outputs, improved training quality, and supported cross-functional AI workflows.",
    tech: ["Python", "Code review", "QA"],
    highlight: "Improved AI model code-output quality across multiple programming languages." },
  { year: "2025–26", category: "product", title: "Fullstack Developer", subtitle: "PodManager.ai",
    detail: "Shipped features across a Next.js + TypeScript frontend and FastAPI backend for podcast editing, recording studio workflows, guest management, and marketplace modules.",
    tech: ["Next.js", "TypeScript", "FastAPI", "MongoDB", "Socket.IO", "WaveSurfer.js"],
    highlight: "First production codebase — shipped real-time recording studio and AI editing features." },
  { year: "2026", category: "ai", title: "Quality Assurance Analyst", subtitle: "OneForma.com",
    detail: "Reviewed and improved multilingual AI content applying QA guidelines, natural language quality checks, and workflow consistency.",
    tech: ["QA", "Multilingual", "NLP review"],
    highlight: "Applied rigorous QA workflows across multilingual AI training data." },
  { year: "2026", category: "ai", title: "AI Data Specialist", subtitle: "Appen.com",
    detail: "Worked on AI training projects involving text, audio, and multilingual data — transcription, labeling, and content evaluation.",
    tech: ["Transcription", "Labeling", "Audio QA"],
    highlight: "Cross-modal AI training data — text, audio, multilingual content." },
  { year: "2026", category: "education", title: "Fullstack Developer", subtitle: "The Media Institute",
    detail: "Recently graduated after training in frontend, backend, databases, APIs, agile development, and e-commerce.",
    tech: ["Frontend", "Backend", "Databases", "APIs", "Agile"],
    highlight: "Comprehensive fullstack training — agile workflows and e-commerce focus." },
  { year: "2024", category: "education", title: "Embedded Software Development", subtitle: "Movant University of Applied Science",
    detail: "Completed studies in embedded software and contributed to an autonomous car project.",
    tech: ["Embedded C", "RTOS", "Hardware"],
    highlight: "Foundation in embedded software and real-time systems." },
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
    tags: ["Next.js", "TypeScript", "FastAPI", "Socket.IO", "MongoDB", "WaveSurfer.js"],
  },
  {
    name: "Sigma Autonomous Car",
    category: "Embedded Systems",
    summary: "An Arduino-based autonomous car focused on sensor input, control loops, and path reliability.",
    links: [{ label: "GitHub Profile", href: "https://github.com/Julieanna97", external: true }],
    tags: ["Arduino", "C/C++", "Python", "RTOS/Zephyr"],
  },
];

const timelineFilters: TimelineFilter[] = ["all", "work", "product", "ai", "education"];
const categoryColors: Record<string, string> = {
  work: "#e8613a",
  product: "#f5a0c8",
  ai: "#c8a4f5",
  education: "#a4d8c8",
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

const heroMarqueeItems = [
  "FULLSTACK DEVELOPER",
  "MALMÖ, SE",
  "OPEN TO WORK",
  "REACT · NEXT.JS · FASTAPI",
  "EMBEDDED · IOT · AI",
  "AVAILABLE 2026",
];

const chatQA = [
  { q: "What's your stack?", a: "React, Next.js, TypeScript on the frontend. FastAPI and Node.js on the backend. MongoDB for data. Plus C/C++ and Arduino for embedded work." },
  { q: "How do you approach projects?", a: "I start by understanding the problem deeply, then build iteratively — ship early, get feedback, refine. I care about clean code and polished UI equally." },
  { q: "What are you working on?", a: "Right now I am actively maintaining and improving this portfolio while adding new projects and case studies. I am focused on making it more interactive and reflective of my latest work." },
  { q: "Are you open to work?", a: "Yes! Based in Malmö, Sweden. Open to fullstack, embedded, or product engineering roles." },
  { q: "What makes you different?", a: "I've shipped across the full spectrum: SaaS products, podcast platforms, autonomous cars, AI data pipelines. I don't just build features — I understand systems." },
  { q: "How are you?", a: "I am doing great, thanks for asking. I can help you explore Julie's projects, stack, and experience." },
  { q: "Where are you based?", a: "Julie is based in Malmö, Sweden and open to local or remote opportunities." },
  { q: "What frontend tools do you use?", a: "Mostly Next.js, React, TypeScript, App Router patterns, and component-driven UI development with a strong focus on UX polish." },
  { q: "What backend experience do you have?", a: "Backend work includes FastAPI and Node.js APIs, auth flows, data modeling, and production MongoDB integrations." },
  { q: "Can you build full products end-to-end?", a: "Yes. Julie has shipped products from idea to deployment, covering UI, APIs, database design, payments, and iteration from user feedback." },
  { q: "What's your embedded background?", a: "Julie has worked on Arduino and ESP32 projects using C/C++, including autonomous car systems and long-range communication with LoRa." },
  { q: "What did you do at PodManager.ai?", a: "Julie built features in a real production codebase including recording studio workflows, AI editing flows, and fullstack integrations." },
  { q: "What is PracticePal?", a: "PracticePal is Julie's musician SaaS product for practice planning and analytics, with auth, plans, sessions, and subscription features." },
  { q: "How quickly can you ramp up?", a: "Fast. Julie adapts quickly by understanding product context first, then shipping small reliable increments early." },
  { q: "How do I contact you directly?", a: "Use the contact section below for email, LinkedIn, GitHub, or phone." },
];

export default function PortfolioShowcase() {
  const [mounted, setMounted] = useState(false);
  const [tlFilter, setTlFilter] = useState<TimelineFilter>("all");
  const [toast, setToast] = useState("");
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedTl, setExpandedTl] = useState<number | null>(null);
  const [visibleTl, setVisibleTl] = useState<Set<number>>(new Set());

  // Chat terminal state
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "julie"; text: string }[]>([]);
  const [chatTyping, setChatTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const chatReplyTimeoutRef = useRef<number | null>(null);
  const chatReplyFailSafeRef = useRef<number | null>(null);

  // Project visibility
  const [visibleProj, setVisibleProj] = useState<Set<number>>(new Set());

  // Cursor refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorEnabled, setCursorEnabled] = useState(false);

  // Hero parallax
  const heroPhotoRef = useRef<HTMLDivElement>(null);

  // Code editor state
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  // Live time
  const [timeStr, setTimeStr] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setTimeStr(`${hh}:${mm}`);
    };
    update();
    const i = setInterval(update, 30000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => { setMounted(true); }, []);

  // Keep initial page load at the top even if the URL has a hash or browser wants to restore scroll.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prevScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, "", cleanUrl);
    }
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = prevScrollRestoration;
    };
  }, []);

  // SCROLL PROGRESS
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  // CUSTOM CURSOR
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setCursorEnabled(true);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(animateRing);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        !!target.closest("a, button, [data-hover], input, textarea, label, select");
      if (cursorRingRef.current) {
        cursorRingRef.current.classList.toggle("cursor-ring-grow", isInteractive);
      }
      if (cursorRef.current) {
        cursorRef.current.classList.toggle("cursor-dot-hide", isInteractive);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  // HERO PARALLAX — photo subtly shifts with cursor
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      if (!heroPhotoRef.current) return;
      const rect = heroPhotoRef.current.getBoundingClientRect();
      // Only apply when hero is in viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // Shift photo by up to 15px each axis based on cursor distance from center
      const dx = ((e.clientX - cx) / cx) * 15;
      const dy = ((e.clientY - cy) / cy) * 15;
      heroPhotoRef.current.style.setProperty("--parallax-x", `${dx}px`);
      heroPhotoRef.current.style.setProperty("--parallax-y", `${dy}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // CODE TYPING ANIMATION
  useEffect(() => {
    if (!mounted) return;
    if (currentLine >= codeLines.length) {
      const timeout = setTimeout(() => {
        setTypedLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, 3500);
      return () => clearTimeout(timeout);
    }
    const line = codeLines[currentLine].text;
    if (currentChar >= line.length) {
      const delay = line === "" ? 80 : 220;
      const timeout = setTimeout(() => {
        setTypedLines(prev => [...prev, line]);
        setCurrentLine(c => c + 1);
        setCurrentChar(0);
      }, delay);
      return () => clearTimeout(timeout);
    }
    const charDelay = 28 + Math.random() * 36;
    const timeout = setTimeout(() => {
      setCurrentChar(c => c + 1);
    }, charDelay);
    return () => clearTimeout(timeout);
  }, [mounted, currentLine, currentChar]);

  // INTERSECTION OBSERVER for timeline
  useEffect(() => {
    if (!mounted) return;
    const items = document.querySelectorAll("[data-tl-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.tlIndex);
            setVisibleTl(prev => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [mounted, tlFilter]);

  // INTERSECTION OBSERVER for projects
  useEffect(() => {
    if (!mounted) return;
    const items = document.querySelectorAll("[data-proj-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.projIndex);
            setTimeout(() => {
              setVisibleProj(prev => new Set(prev).add(idx));
            }, idx * 150);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [mounted]);

  // Scroll chat body to bottom (container-only, not page)
  const scrollChatToBottom = useCallback(() => {
    const el = chatBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const clearChatReplyTimeout = useCallback(() => {
    if (chatReplyTimeoutRef.current !== null) {
      window.clearTimeout(chatReplyTimeoutRef.current);
      chatReplyTimeoutRef.current = null;
    }
    if (chatReplyFailSafeRef.current !== null) {
      window.clearTimeout(chatReplyFailSafeRef.current);
      chatReplyFailSafeRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearChatReplyTimeout();
  }, [clearChatReplyTimeout]);

  const queueJulieReply = useCallback((reply: string, delay = 420) => {
    clearChatReplyTimeout();
    setChatTyping(true);

    const safeReply = reply?.trim() || "I got your message. Ask me anything about Julie and I will respond.";

    chatReplyTimeoutRef.current = window.setTimeout(() => {
      if (chatReplyFailSafeRef.current !== null) {
        window.clearTimeout(chatReplyFailSafeRef.current);
        chatReplyFailSafeRef.current = null;
      }
      setChatMessages(prev => [...prev, { role: "julie", text: safeReply }]);
      setChatTyping(false);
      chatReplyTimeoutRef.current = null;
    }, delay);

    // Fail-safe: if anything interrupts normal reply timer, recover automatically.
    chatReplyFailSafeRef.current = window.setTimeout(() => {
      if (chatReplyTimeoutRef.current !== null) {
        window.clearTimeout(chatReplyTimeoutRef.current);
        chatReplyTimeoutRef.current = null;
      }
      setChatMessages(prev => [
        ...prev,
        {
          role: "julie",
          text: "I am here. Something delayed my last response, but I can still answer anything you ask.",
        },
      ]);
      setChatTyping(false);
      chatReplyFailSafeRef.current = null;
    }, Math.max(2000, delay + 1200));
  }, [clearChatReplyTimeout]);

  // CHAT HANDLER
  const handleChatQuestion = (qa: typeof chatQA[0]) => {
    if (chatTyping) return;
    setChatMessages(prev => [...prev, { role: "user", text: qa.q }]);
    setTimeout(scrollChatToBottom, 50);
    queueJulieReply(qa.a);
  };

  // Auto-scroll chat container only (not page)
  useEffect(() => {
    scrollChatToBottom();
  }, [chatMessages, chatTyping, scrollChatToBottom]);

  const filteredTl = useMemo(
    () => timelineItems.filter(i => tlFilter === "all" || i.category === tlFilter),
    [tlFilter]
  );

  const tlCounts = useMemo(() => {
    const counts: Record<TimelineFilter, number> = {
      all: timelineItems.length,
      work: 0, product: 0, ai: 0, education: 0,
    };
    timelineItems.forEach(i => { counts[i.category] = (counts[i.category] || 0) + 1; });
    return counts;
  }, []);

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
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500&family=JetBrains+Mono:wght@400;500;600&family=Caveat:wght@500;700&display=swap');

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
      --mono: 'JetBrains Mono', ui-monospace, monospace;
      --hand: 'Caveat', cursive;
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

    /* CUSTOM CURSOR */
    .cursor-enabled, .cursor-enabled * { cursor: none !important; }
    @media (hover: none) or (pointer: coarse) {
      .cursor-enabled, .cursor-enabled * { cursor: auto !important; }
      .cursor-dot, .cursor-ring { display: none !important; }
    }
    .cursor-dot {
      position: fixed; top: 0; left: 0;
      width: 8px; height: 8px;
      margin-left: -4px; margin-top: -4px;
      background: var(--pink);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: opacity 0.2s ease, transform 0.05s linear;
    }
    .cursor-dot-hide { opacity: 0; }
    .cursor-ring {
      position: fixed; top: 0; left: 0;
      width: 36px; height: 36px;
      margin-left: -18px; margin-top: -18px;
      border: 1.5px solid var(--pink);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: width 0.25s ease, height 0.25s ease, margin 0.25s ease, background 0.25s ease, border-color 0.25s ease;
      will-change: transform;
    }
    .cursor-ring.cursor-ring-grow {
      width: 60px; height: 60px;
      margin-left: -30px; margin-top: -30px;
      background: rgba(245, 160, 200, 0.18);
      border-color: var(--pink);
    }

    .scroll-progress {
      position: fixed; top: 0; left: 0; height: 3px;
      background: linear-gradient(90deg, var(--pink) 0%, var(--orange) 100%);
      z-index: 300;
      transition: width 0.08s linear;
      pointer-events: none;
    }

    /* Right-side page scrollbar theme */
    html {
      scrollbar-width: thin;
      scrollbar-color: var(--pink) rgba(26,8,8,0.18);
    }
    html::-webkit-scrollbar {
      width: 11px;
    }
    html::-webkit-scrollbar-track {
      background: linear-gradient(180deg, rgba(26,8,8,0.08) 0%, rgba(46,14,14,0.2) 100%);
    }
    .scroll-progress {
      height: 3px;
    }
    html::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, var(--pink) 0%, var(--orange) 100%);
      border-radius: 999px;
      border: 2px solid var(--cream);
    }
    html::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #f7b3d3 0%, #ef7a57 100%);
    }

    /* NAV */
    .nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 22px 48px;
      background: var(--burg);
      position: sticky; top: 0; z-index: 200;
    }
    .nav-logo {
      font-family: var(--cond);
      font-size: 1.15rem; font-weight: 800;
      color: var(--pink);
      letter-spacing: 0.12em; text-transform: uppercase;
      transition: opacity 0.2s;
    }
    .nav-logo:hover { opacity: 0.7; }
    .nav-links { display: flex; align-items: center; gap: 44px; }
    .nav-link {
      font-family: var(--cond);
      font-size: 1.15rem; font-weight: 800;
      color: var(--pink);
      letter-spacing: 0.12em; text-transform: uppercase;
      position: relative; padding-bottom: 2px;
      transition: opacity 0.2s;
    }
    .nav-link::after {
      content: "";
      position: absolute;
      left: 0; bottom: 0;
      width: 100%; height: 2px;
      background: var(--pink);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.32s cubic-bezier(0.65, 0, 0.35, 1);
    }
    .nav-link:hover { opacity: 0.85; }
    .nav-link:hover::after { transform: scaleX(1); }
    .nav-burger { display: none; width: 32px; height: 22px; position: relative; flex-direction: column; justify-content: space-between; }
    .nav-burger span { display: block; height: 2px; width: 100%; background: var(--pink); transition: transform 0.3s, opacity 0.3s; transform-origin: center; }
    .nav-burger.open span:nth-child(1) { transform: translateY(10px) rotate(45deg); }
    .nav-burger.open span:nth-child(2) { opacity: 0; }
    .nav-burger.open span:nth-child(3) { transform: translateY(-10px) rotate(-45deg); }
    .mobile-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: min(86%, 360px); background: var(--burg); border-left: 1px solid rgba(245,160,200,0.18); z-index: 250; padding: 100px 32px 40px; display: flex; flex-direction: column; gap: 4px; transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
    .mobile-drawer.open { transform: translateX(0); }
    .mobile-drawer-link { font-family: var(--cond); font-size: 1.5rem; font-weight: 800; color: var(--pink); letter-spacing: 0.06em; text-transform: uppercase; padding: 14px 0; border-bottom: 1px solid rgba(245,160,200,0.1); text-align: left; transition: padding-left 0.2s; }
    .mobile-drawer-link:hover, .mobile-drawer-link:focus { padding-left: 8px; }
    .mobile-drawer-cta { margin-top: 24px; font-family: var(--cond); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--burg); background: var(--pink); padding: 16px 24px; border-radius: 999px; text-align: center; }
    .mobile-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 240; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
    .mobile-drawer-overlay.open { opacity: 1; pointer-events: auto; }

    /* ── HERO — FULLY OVERHAULED ── */
    .hero {
      background: var(--burg);
      padding: 36px 3vw 0;
      overflow: hidden;
      position: relative;
    }
    .hero-photo {
      position: relative;
      width: 100%;
      height: 72vh;
      min-height: 520px;
      overflow: hidden;
      --parallax-x: 0px;
      --parallax-y: 0px;
    }
    .hero-photo img {
      width: 110%;
      height: 110%;
      object-fit: cover;
      object-position: center 20%;
      display: block;
      position: absolute;
      top: -5%; left: -5%;
      transform: translate(var(--parallax-x), var(--parallax-y));
      transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    .hero-photo-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(26,8,8,0.12) 0%, rgba(26,8,8,0.32) 100%);
      z-index: 1;
      pointer-events: none;
    }

    /* Floating live status cards */
    .hero-card {
      position: absolute;
      z-index: 5;
      background: rgba(26, 8, 8, 0.78);
      border: 1px solid rgba(245, 160, 200, 0.3);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-radius: 14px;
      padding: 14px 18px;
      font-family: var(--cond);
      color: var(--cream);
      transition: transform 0.4s cubic-bezier(0.65,0,0.35,1), border-color 0.4s ease;
      animation: cardFloat 6s ease-in-out infinite;
    }
    .hero-card:hover {
      transform: translateY(-4px) scale(1.02);
      border-color: var(--pink);
    }
    .hero-card-tl {
      top: 32px;
      left: 36px;
      animation-delay: 0s;
    }
    .hero-card-tr {
      top: 32px;
      right: 36px;
      animation-delay: 1s;
    }
    .hero-card-bl {
      bottom: 36px;
      left: 36px;
      animation-delay: 2s;
    }
    @keyframes cardFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    .hc-status {
      display: flex; align-items: center; gap: 10px;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    .hc-pulse-wrap { position: relative; display: inline-flex; }
    .hc-pulse {
      width: 10px; height: 10px;
      background: #4ade80;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(74,222,128,0.6);
      position: relative;
      z-index: 2;
    }
    .hc-pulse-ring {
      position: absolute; inset: 0;
      border-radius: 50%;
      background: #4ade80;
      animation: pulseRing 2s ease-out infinite;
    }
    @keyframes pulseRing {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(2.6); opacity: 0; }
    }

    .hc-loc {
      display: flex; align-items: center; gap: 12px;
    }
    .hc-loc-flag {
      width: 26px; height: 26px;
      background: linear-gradient(135deg, #006aa7 50%, #fecc00 50%);
      border-radius: 50%;
      flex-shrink: 0;
      position: relative;
    }
    .hc-loc-flag::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.2);
    }
    .hc-loc-text { display: flex; flex-direction: column; }
    .hc-loc-place {
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
    .hc-loc-time {
      font-family: var(--mono);
      font-size: 0.7rem;
      color: rgba(245,160,200,0.7);
      letter-spacing: 0.08em;
      margin-top: 2px;
    }

    .hc-project {
      display: flex; flex-direction: column;
      max-width: 280px;
    }
    .hc-project-label {
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--pink);
      margin-bottom: 5px;
    }
    .hc-project-name {
      font-size: 0.95rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--cream);
      margin-bottom: 2px;
    }
    .hc-project-meta {
      font-family: var(--body-f);
      font-size: 0.7rem;
      font-weight: 400;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(240,236,228,0.55);
    }

    /* GIANT NAME — reveal animation */
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
      transform: translateY(110%);
      animation: nameReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
    }
    @keyframes nameReveal {
      from { transform: translateY(110%); opacity: 0.5; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* Hero Marquee — under the name */
    .hero-marquee {
      background: var(--burg);
      padding: 14px 0;
      overflow: hidden;
      white-space: nowrap;
      border-top: 1px solid rgba(245,160,200,0.12);
      border-bottom: 1px solid rgba(245,160,200,0.12);
    }
    .hero-marquee-inner {
      display: inline-flex;
      animation: marqueeMove 32s linear infinite;
    }
    .hero-marquee-item {
      font-family: var(--cond);
      font-size: 0.95rem;
      font-weight: 800;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(245,160,200,0.7);
      padding: 0 28px;
      display: inline-flex; align-items: center; gap: 28px;
    }
    .hero-marquee-item::after {
      content: "✦";
      color: var(--orange);
      font-size: 0.7rem;
      opacity: 0.7;
    }
    @keyframes marqueeMove {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }

    /* INTRO */
    .intro {
      background: var(--cream);
      padding: 72px 5vw;
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 56px;
      align-items: start;
    }
    .intro-left { display: flex; flex-direction: column; }

    /* CODE EDITOR */
    .code-editor {
      margin-top: 64px;
      width: 100%; max-width: 640px;
      border-radius: 14px;
      background: #0d0506;
      border: 1px solid rgba(245,160,200,0.2);
      box-shadow: 0 24px 60px -12px rgba(26,8,8,0.45);
      overflow: hidden;
      font-family: var(--mono);
      transition: transform 0.5s ease, box-shadow 0.5s ease;
    }
    .code-editor:hover {
      transform: translateY(-4px) rotate(-0.4deg);
      box-shadow: 0 32px 72px -8px rgba(245,160,200,0.18);
    }
    .code-bar { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: #1a0808; border-bottom: 1px solid rgba(245,160,200,0.1); }
    .code-dot { width: 11px; height: 11px; border-radius: 50%; }
    .code-bar-title { margin-left: 16px; font-family: var(--mono); font-size: 0.72rem; color: rgba(245,160,200,0.55); letter-spacing: 0.05em; }
    .code-body { padding: 22px 24px 26px; min-height: 360px; font-size: 0.85rem; line-height: 1.8; color: #e8d8d8; }
    .code-line { display: flex; gap: 14px; white-space: pre; }
    .code-line-num { flex-shrink: 0; width: 22px; text-align: right; color: rgba(245,160,200,0.3); user-select: none; }
    .code-line-text { flex: 1; min-width: 0; }
    .code-cursor { display: inline-block; width: 7px; height: 1.05em; vertical-align: text-bottom; background: var(--pink); margin-left: 1px; animation: blink 1s infinite; }
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }

    .intro-heading {
      font-family: var(--cond);
      font-size: clamp(1.6rem, 3.5vw, 2.8rem);
      font-weight: 800; color: var(--burg);
      letter-spacing: 0.02em; text-transform: uppercase;
      line-height: 1.1; margin-bottom: 28px;
    }
    .intro-body {
      font-family: var(--body-f);
      font-size: 0.82rem; font-weight: 400;
      color: var(--body);
      line-height: 1.85; letter-spacing: 0.04em; text-transform: uppercase;
      max-width: 52ch; margin-bottom: 40px;
    }
    .pill-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 100%; max-width: 480px;
      padding: 22px 40px;
      border-radius: 999px;
      border: 1.5px solid var(--ink);
      background: transparent;
      font-family: var(--cond);
      font-size: 0.88rem; font-weight: 700;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--ink);
      transition: all 0.32s cubic-bezier(0.65,0,0.35,1);
      position: relative; overflow: hidden;
    }
    .pill-btn::before {
      content: ""; position: absolute; inset: 0;
      background: var(--ink);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.42s cubic-bezier(0.65, 0, 0.35, 1);
      z-index: -1;
    }
    .pill-btn:hover { color: var(--cream); }
    .pill-btn:hover::before { transform: scaleX(1); }

    /* ── POLAROID STACK — replaces Now Playing card ── */
    .polaroid-stack {
      position: relative;
      width: 100%;
      max-width: 540px;
      margin-left: auto;
      height: 580px;
    }
    .polaroid {
      position: absolute;
      width: 320px;
      background: #faf6ec;
      padding: 14px 14px 50px;
      border-radius: 4px;
      box-shadow:
        0 1px 1px rgba(0,0,0,0.05),
        0 12px 28px -10px rgba(26,8,8,0.35),
        0 0 0 1px rgba(26,8,8,0.04);
      transition: transform 0.5s cubic-bezier(0.65,0,0.35,1),
                  z-index 0s linear 0.25s,
                  box-shadow 0.5s ease;
      cursor: pointer;
    }
    .polaroid:hover {
      transform: translate(var(--hover-x, 0), var(--hover-y, 0)) rotate(var(--hover-r, 0deg)) scale(1.04) !important;
      z-index: 30 !important;
      box-shadow:
        0 1px 1px rgba(0,0,0,0.05),
        0 24px 50px -10px rgba(245,160,200,0.35),
        0 0 0 1px rgba(245,160,200,0.4);
      transition-delay: 0s !important;
    }
    /* Stack positioning */
    .polaroid-1 {
      top: 10px;
      left: 0;
      transform: rotate(-7deg);
      z-index: 1;
      --hover-x: -8px; --hover-y: -8px; --hover-r: -5deg;
    }
    .polaroid-2 {
      top: 60px;
      right: 0;
      transform: rotate(5deg);
      z-index: 2;
      --hover-x: 6px; --hover-y: -8px; --hover-r: 7deg;
    }
    .polaroid-3 {
      bottom: 30px;
      left: 50%;
      margin-left: -160px;
      transform: rotate(-2deg);
      z-index: 3;
      --hover-x: 0; --hover-y: -12px; --hover-r: 0deg;
    }

    .polaroid-image {
      width: 100%;
      aspect-ratio: 4 / 3;
      border-radius: 2px;
      overflow: hidden;
      position: relative;
      background: var(--burg);
    }
    .polaroid-caption {
      position: absolute;
      bottom: 14px;
      left: 18px;
      right: 18px;
      font-family: var(--hand);
      font-size: 1.5rem;
      color: var(--burg);
      line-height: 1;
      text-align: center;
      transform: rotate(-1.5deg);
    }
    .polaroid-tape {
      position: absolute;
      top: -12px;
      left: 50%;
      margin-left: -36px;
      width: 72px;
      height: 22px;
      background: linear-gradient(180deg, rgba(245,160,200,0.55) 0%, rgba(245,160,200,0.35) 100%);
      border: 1px solid rgba(245,160,200,0.2);
      transform: rotate(-3deg);
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    }
    .polaroid-2 .polaroid-tape { transform: rotate(2deg); margin-left: -36px; }
    .polaroid-3 .polaroid-tape { transform: rotate(-1deg); }

    /* Mock screenshots — SVG-style illustrations inside polaroids */
    .mock-screen {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 12px;
      position: relative;
    }
    .mock-bar {
      display: flex;
      gap: 4px;
      margin-bottom: 10px;
    }
    .mock-bar-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
    }
    /* PracticePal mock — pink dashboard */
    .mock-practicepal {
      background: linear-gradient(135deg, #1a0808 0%, #2e0e0e 100%);
    }
    .mock-pp-header {
      font-family: var(--cond);
      font-size: 0.6rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: var(--pink);
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .mock-pp-title {
      font-family: var(--cond);
      font-size: 1rem;
      font-weight: 900;
      color: var(--cream);
      text-transform: uppercase;
      letter-spacing: 0.02em;
      line-height: 1;
      margin-bottom: 8px;
    }
    .mock-pp-bars {
      display: flex; align-items: flex-end; gap: 3px;
      height: 38px;
      margin-top: auto;
    }
    .mock-pp-bar {
      flex: 1;
      background: linear-gradient(to top, var(--orange), var(--pink));
      border-radius: 1.5px;
      animation: barPulse 2s ease-in-out infinite;
    }
    @keyframes barPulse {
      0%, 100% { opacity: 0.85; }
      50% { opacity: 1; }
    }
    /* PodManager mock — waveform */
    .mock-podmanager {
      background: linear-gradient(135deg, #2e0e0e 0%, #1a0808 100%);
    }
    .mock-pm-label {
      font-family: var(--mono);
      font-size: 0.55rem;
      color: rgba(245,160,200,0.7);
      margin-bottom: 6px;
      letter-spacing: 0.1em;
    }
    .mock-pm-wave {
      flex: 1;
      display: flex; align-items: center; gap: 2px;
      padding: 6px 0;
    }
    .mock-pm-bar {
      flex: 1;
      background: var(--pink);
      border-radius: 999px;
      opacity: 0.85;
      animation: wave 1.6s ease-in-out infinite;
    }
    @keyframes wave {
      0%, 100% { transform: scaleY(0.4); opacity: 0.55; }
      50% { transform: scaleY(1); opacity: 1; }
    }
    .mock-pm-bar:nth-child(2n) { animation-delay: 0.1s; }
    .mock-pm-bar:nth-child(3n) { animation-delay: 0.25s; }
    .mock-pm-bar:nth-child(5n) { animation-delay: 0.35s; }
    .mock-pm-controls {
      display: flex; align-items: center; gap: 6px;
      padding: 6px 0;
    }
    .mock-pm-play {
      width: 18px; height: 18px;
      border-radius: 50%;
      background: var(--orange);
      display: flex; align-items: center; justify-content: center;
    }
    .mock-pm-line {
      flex: 1;
      height: 2px;
      background: rgba(245,160,200,0.3);
      border-radius: 1px;
      position: relative;
    }
    .mock-pm-line::after {
      content: "";
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 35%;
      background: var(--pink);
      border-radius: 1px;
    }
    /* Sigma Car mock — telemetry */
    .mock-sigma {
      background: #0d0506;
    }
    .mock-sigma-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .mock-sigma-stat {
      background: rgba(245,160,200,0.08);
      border: 1px solid rgba(245,160,200,0.18);
      border-radius: 4px;
      padding: 5px 7px;
      display: flex; flex-direction: column; justify-content: center;
    }
    .mock-sigma-stat-label {
      font-family: var(--mono);
      font-size: 0.45rem;
      color: rgba(245,160,200,0.55);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2px;
    }
    .mock-sigma-stat-val {
      font-family: var(--cond);
      font-size: 0.8rem;
      font-weight: 900;
      color: var(--pink);
      letter-spacing: 0.02em;
    }
    .mock-sigma-stat-val .unit {
      font-size: 0.55rem;
      color: rgba(245,160,200,0.5);
      margin-left: 1px;
    }

    /* STATEMENT */
    .statement { background: var(--cream); padding: 60px 5vw 72px; }
    .statement-text {
      font-family: var(--cond);
      font-size: clamp(2.2rem, 5.5vw, 7rem);
      font-weight: 900; color: var(--burg);
      letter-spacing: 0.04em; text-transform: uppercase;
      line-height: 1.05;
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 0 40px;
    }
    .statement-text span { transition: color 0.3s ease, transform 0.3s ease; }
    .statement-text span:hover { color: var(--orange); transform: translateY(-3px); }

    /* MARQUEE */
    .marquee-wrap { background: var(--orange); padding: 16px 0; overflow: hidden; white-space: nowrap; }
    .marquee-inner { display: inline-flex; animation: marquee 22s linear infinite; }
    .marquee-item { font-family: var(--cond); font-size: 1rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--pink); padding: 0 36px; display: inline-flex; align-items: center; gap: 24px; }
    .marquee-item::after { content: "✦"; color: rgba(245,160,200,0.6); font-size: 0.7rem; }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* DARK PANEL */
    .dark-panel { background: var(--burg); display: grid; grid-template-columns: 1fr 1fr; height: 600px; }
    .dark-panel-text { padding: 72px 5vw; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
    .dark-label { font-family: var(--cond); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--pink); margin-bottom: 24px; }
    .dark-heading { font-family: var(--cond); font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: white; line-height: 1.2; margin-bottom: 28px; }
    .dark-body { font-family: var(--body-f); font-size: 0.78rem; font-weight: 300; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.55); line-height: 1.85; max-width: 52ch; }
    /* CHAT TERMINAL */
    .dark-panel-chat {
      background: var(--burg2);
      border-left: 1px solid rgba(245,160,200,0.12);
      display: flex; flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }
    .chat-bar {
      display: flex; align-items: center; gap: 8px;
      padding: 14px 20px;
      border-bottom: 1px solid rgba(245,160,200,0.1);
      flex-shrink: 0;
    }
    .chat-bar-dot { width: 9px; height: 9px; border-radius: 50%; }
    .chat-bar-title {
      margin-left: 12px; font-family: var(--mono);
      font-size: 0.68rem; color: rgba(245,160,200,0.5);
      letter-spacing: 0.05em;
    }
    .chat-body {
      flex: 1; overflow-y: auto; padding: 24px 20px;
      display: flex; flex-direction: column; gap: 14px;
      min-height: 0;
      scrollbar-width: thin;
      scrollbar-color: rgba(245,160,200,0.2) transparent;
    }
    .chat-bubble {
      max-width: 88%; padding: 12px 16px;
      font-family: var(--body-f); font-size: 0.78rem;
      line-height: 1.7; letter-spacing: 0.03em;
      border-radius: 16px;
      animation: chatPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .chat-bubble-user {
      align-self: flex-end;
      background: var(--pink); color: var(--burg);
      border-bottom-right-radius: 4px;
      font-weight: 500;
    }
    .chat-bubble-julie {
      align-self: flex-start;
      background: rgba(245,160,200,0.08);
      border: 1px solid rgba(245,160,200,0.15);
      color: rgba(255,255,255,0.8);
      border-bottom-left-radius: 4px;
    }
    .chat-bubble-julie .chat-sender {
      display: block; font-family: var(--cond);
      font-size: 0.62rem; font-weight: 700;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--pink); margin-bottom: 6px;
    }
    .chat-typing-indicator {
      align-self: flex-start;
      display: flex; gap: 5px; padding: 14px 18px;
      background: rgba(245,160,200,0.08);
      border: 1px solid rgba(245,160,200,0.15);
      border-radius: 16px; border-bottom-left-radius: 4px;
    }
    .chat-typing-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--pink); opacity: 0.4;
      animation: typingBounce 1.2s ease-in-out infinite;
    }
    .chat-typing-dot:nth-child(2) { animation-delay: 0.15s; }
    .chat-typing-dot:nth-child(3) { animation-delay: 0.3s; }
    @keyframes typingBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }
    @keyframes chatPop {
      from { opacity: 0; transform: translateY(8px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .chat-typing-text {
      align-self: flex-start; max-width: 88%; padding: 12px 16px;
      background: rgba(245,160,200,0.08);
      border: 1px solid rgba(245,160,200,0.15);
      color: rgba(255,255,255,0.8);
      border-radius: 16px; border-bottom-left-radius: 4px;
      font-family: var(--body-f); font-size: 0.78rem;
      line-height: 1.7; letter-spacing: 0.03em;
    }
    .chat-typing-text .chat-sender {
      display: block; font-family: var(--cond);
      font-size: 0.62rem; font-weight: 700;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--pink); margin-bottom: 6px;
    }
    .chat-chips {
      flex-shrink: 0; padding: 16px 20px;
      border-top: 1px solid rgba(245,160,200,0.1);
      display: flex; flex-wrap: wrap; gap: 8px;
    }
    .chat-chip {
      font-family: var(--cond); font-size: 0.68rem;
      font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--pink);
      border: 1px solid rgba(245,160,200,0.25);
      padding: 8px 14px; border-radius: 999px;
      transition: all 0.28s ease;
      background: transparent;
    }
    .chat-chip:hover {
      background: var(--pink); color: var(--burg);
      border-color: var(--pink);
      transform: translateY(-2px);
      box-shadow: 0 6px 18px -6px rgba(245,160,200,0.4);
    }
    .chat-chip:disabled { opacity: 0.35; pointer-events: none; }
    .chat-welcome {
      font-family: var(--mono); font-size: 0.72rem;
      color: rgba(245,160,200,0.45); line-height: 1.8;
      letter-spacing: 0.03em;
    }
    .chat-welcome strong { color: var(--pink); font-weight: 600; }
    .chat-cursor-blink {
      display: inline-block; width: 6px; height: 1em;
      background: var(--pink); vertical-align: text-bottom;
      margin-left: 2px;
      animation: blink 1s infinite;
    }

    /* PROJECTS */
    .projects-section { background: var(--cream); padding: 80px 5vw; }
    .sec-super { font-family: var(--cond); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
    .sec-title { font-family: var(--cond); font-size: clamp(3rem, 7vw, 8rem); font-weight: 900; letter-spacing: 0.01em; text-transform: uppercase; color: var(--burg); line-height: 0.9; margin-bottom: 56px; }
    .proj-list { display: flex; flex-direction: column; gap: 0; }
    .proj-row {
      display: grid; grid-template-columns: 60px 1fr 1fr; gap: 0;
      border-top: 1px solid rgba(26,8,8,0.12);
      padding: 40px 0; align-items: start; position: relative;
      opacity: 0; transform: translateY(30px);
      transition: opacity 0.7s cubic-bezier(0.22,0.61,0.36,1), transform 0.7s cubic-bezier(0.22,0.61,0.36,1), background 0.4s ease, padding 0.4s ease;
    }
    .proj-row-visible { opacity: 1; transform: translateY(0); }
    .proj-row::before { content: ""; position: absolute; top: -1px; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, var(--pink), var(--orange)); transition: width 0.6s cubic-bezier(0.65, 0, 0.35, 1); }
    .proj-row:hover::before { width: 100%; }
    .proj-row:last-child { border-bottom: 1px solid rgba(26,8,8,0.12); }
    .proj-row:hover { background: rgba(26,8,8,0.03); padding: 40px 20px; }
    .proj-num {
      font-family: var(--cond); font-size: 2.8rem; font-weight: 900;
      color: rgba(26,8,8,0.06); line-height: 1;
      transition: color 0.4s ease;
      user-select: none;
    }
    .proj-row:hover .proj-num { color: rgba(245,160,200,0.25); }
    .proj-cat { font-family: var(--cond); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; transition: color 0.3s ease; }
    .proj-row:hover .proj-cat { color: var(--orange); }
    .proj-name { font-family: var(--cond); font-size: clamp(1.8rem, 3.5vw, 3rem); font-weight: 900; letter-spacing: 0.02em; text-transform: uppercase; color: var(--burg); line-height: 1; margin-bottom: 16px; transition: transform 0.4s cubic-bezier(0.22,0.61,0.36,1), color 0.3s ease; }
    .proj-row:hover .proj-name { transform: translateX(6px); }
    .proj-tags-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .proj-tag { font-family: var(--body-f); font-size: 0.68rem; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); border: 1px solid rgba(26,8,8,0.2); padding: 4px 12px; border-radius: 999px; transition: all 0.25s ease; }
    .proj-tag:hover { background: var(--burg); color: var(--pink); border-color: var(--burg); transform: translateY(-2px); }
    .proj-right { padding-top: 4px; }
    .proj-summary { font-family: var(--body-f); font-size: 0.82rem; font-weight: 300; color: var(--body); line-height: 1.8; letter-spacing: 0.04em; text-transform: uppercase; max-width: 54ch; margin-bottom: 24px; }
    .proj-links-row { display: flex; gap: 16px; flex-wrap: wrap; }
    .proj-link {
      font-family: var(--cond); font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--burg); position: relative; padding: 6px 0;
      transition: color 0.25s ease;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .proj-link-arrow {
      display: inline-block; transition: transform 0.35s cubic-bezier(0.22,0.61,0.36,1), opacity 0.3s ease;
      transform: translateX(-4px); opacity: 0;
      font-size: 0.85rem;
    }
    .proj-link:hover .proj-link-arrow { transform: translateX(0); opacity: 1; }
    .proj-link::after { content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 1.5px; background: var(--burg); transform: scaleX(1); transform-origin: right; transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1), background 0.3s ease; }
    .proj-link:hover { color: var(--orange); }
    .proj-link:hover::after { background: var(--orange); transform-origin: left; }

    /* TIMELINE */
    .timeline-section { background: var(--burg2); padding: 80px 5vw; position: relative; }
    .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 64px; }
    .filter-chip { display: inline-flex; align-items: center; gap: 8px; font-family: var(--cond); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(245,160,200,0.6); border: 1px solid rgba(245,160,200,0.25); padding: 8px 18px; transition: all 0.28s ease; }
    .filter-chip:hover { border-color: var(--pink); color: var(--pink); transform: translateY(-2px); box-shadow: 0 6px 16px -8px rgba(245,160,200,0.45); }
    .filter-chip-on { background: var(--pink); color: var(--burg); border-color: var(--pink); }
    .filter-count { font-family: var(--body-f); font-size: 0.62rem; font-weight: 500; letter-spacing: 0.05em; opacity: 0.6; }

    .tl-wrapper { position: relative; display: grid; grid-template-columns: 110px 1fr; gap: 0; }
    .tl-line-rail { position: relative; width: 100%; }
    .tl-line-rail::before { content: ""; position: absolute; left: 90px; top: 16px; bottom: 16px; width: 2px; background: rgba(245,160,200,0.12); }
    .tl-line-progress { position: absolute; left: 90px; top: 16px; width: 2px; background: linear-gradient(180deg, var(--pink) 0%, var(--orange) 100%); box-shadow: 0 0 12px rgba(245,160,200,0.5); transition: height 0.5s cubic-bezier(0.65,0,0.35,1); }
    .tl-content { display: flex; flex-direction: column; gap: 0; }
    .tl-entry { position: relative; padding: 28px 0 28px 40px; border-bottom: 1px solid rgba(245,160,200,0.1); cursor: pointer; opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease, padding-left 0.3s ease; }
    .tl-entry-visible { opacity: 1; transform: translateY(0); }
    .tl-entry:first-child { border-top: 1px solid rgba(245,160,200,0.1); }
    .tl-entry:hover { padding-left: 48px; }
    .tl-entry-expanded { padding-left: 48px; }
    .tl-dot-wrap { position: absolute; left: -20px; top: 32px; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; pointer-events: none; }
    .tl-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--burg2); border: 2px solid var(--cat-color, var(--pink)); transition: all 0.3s ease; position: relative; z-index: 2; }
    .tl-entry-visible .tl-dot { background: var(--cat-color, var(--pink)); }
    .tl-entry:hover .tl-dot, .tl-entry-expanded .tl-dot { transform: scale(1.4); box-shadow: 0 0 16px var(--cat-color, var(--pink)); }
    .tl-year-cell { position: absolute; left: -110px; top: 32px; width: 80px; text-align: right; font-family: var(--cond); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(245,160,200,0.5); transition: color 0.3s ease; }
    .tl-entry:hover .tl-year-cell, .tl-entry-expanded .tl-year-cell { color: var(--pink); }
    .tl-row-flex { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }
    .tl-row-main { flex: 1; min-width: 0; }
    .tl-cat-pill { display: inline-block; font-family: var(--cond); font-size: 0.62rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; margin-bottom: 10px; color: var(--cat-color, var(--pink)); background: color-mix(in srgb, var(--cat-color, var(--pink)) 12%, transparent); border: 1px solid color-mix(in srgb, var(--cat-color, var(--pink)) 30%, transparent); }
    .tl-title { font-family: var(--cond); font-size: clamp(1.15rem, 2vw, 1.5rem); font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: white; margin-bottom: 4px; transition: color 0.3s ease, transform 0.3s ease; }
    .tl-entry:hover .tl-title, .tl-entry-expanded .tl-title { color: var(--cat-color, var(--pink)); transform: translateX(4px); }
    .tl-sub { font-family: var(--cond); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,160,200,0.7); margin-bottom: 12px; }
    .tl-detail { font-family: var(--body-f); font-size: 0.78rem; font-weight: 300; letter-spacing: 0.04em; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 60ch; }
    .tl-toggle { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; background: rgba(245,160,200,0.08); border: 1px solid rgba(245,160,200,0.2); display: flex; align-items: center; justify-content: center; color: var(--pink); font-family: var(--cond); font-size: 1.1rem; transition: all 0.3s ease; }
    .tl-entry:hover .tl-toggle { background: rgba(245,160,200,0.18); border-color: var(--pink); }
    .tl-toggle-icon { transition: transform 0.4s cubic-bezier(0.65,0,0.35,1); display: inline-block; transform-origin: center; }
    .tl-entry-expanded .tl-toggle-icon { transform: rotate(45deg); }
    .tl-expand { max-height: 0; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.65,0,0.35,1), opacity 0.4s ease, margin 0.4s ease; opacity: 0; margin-top: 0; }
    .tl-entry-expanded .tl-expand { max-height: 500px; opacity: 1; margin-top: 20px; }
    .tl-expand-inner { padding: 20px; background: rgba(245,160,200,0.04); border: 1px solid rgba(245,160,200,0.12); border-radius: 12px; border-left: 3px solid var(--cat-color, var(--pink)); }
    .tl-highlight { font-family: var(--body-f); font-size: 0.85rem; font-weight: 400; color: rgba(255,255,255,0.85); line-height: 1.7; margin-bottom: 16px; font-style: italic; }
    .tl-tech-label { font-family: var(--cond); font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(245,160,200,0.5); margin-bottom: 8px; }
    .tl-tech-list { display: flex; flex-wrap: wrap; gap: 6px; }
    .tl-tech-pill { font-family: var(--body-f); font-size: 0.7rem; font-weight: 500; letter-spacing: 0.06em; color: var(--cream); background: rgba(245,160,200,0.08); border: 1px solid rgba(245,160,200,0.18); padding: 4px 10px; border-radius: 999px; transition: all 0.25s ease; }
    .tl-tech-pill:hover { background: rgba(245,160,200,0.18); transform: translateY(-1px); }

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
    .footer-col-link:hover { color: var(--orange); opacity: 1; }
    .footer-col-text { font-family: var(--body-f); font-size: 0.72rem; font-weight: 300; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); line-height: 1.7; }
    .footer-wordmark { background: var(--cream); overflow: hidden; line-height: 0.8; padding-top: 20px; }
    .footer-word { font-family: var(--cond); font-size: clamp(10rem, 22vw, 28rem); font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; color: var(--burg); display: block; line-height: 0.82; transition: color 0.5s ease; }
    .footer-word:hover { color: var(--orange); }

    .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 9999; background: var(--pink); color: var(--burg); font-family: var(--cond); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 12px 28px; }

    .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .mounted .fade-up { opacity: 1; transform: none; }
    .mounted .d1 { transition-delay: 0.05s; }
    .mounted .d2 { transition-delay: 0.18s; }
    .mounted .d3 { transition-delay: 0.3s; }
    .mounted .d4 { transition-delay: 0.42s; }

    @media (max-width: 1024px) {
      .intro { grid-template-columns: 1fr; }
      .dark-panel { grid-template-columns: 1fr; }
      .contact-section { grid-template-columns: 1fr; }
      .statement-text { grid-template-columns: 1fr 1fr; }
      .tagline-text { grid-template-columns: 1fr 1fr; }
      .footer-links { grid-template-columns: 1fr 1fr; }
      .nav-link { font-size: 0.95rem; }
      .nav-links { gap: 28px; }
      .polaroid-stack { max-width: 100%; height: 540px; }
      .tl-wrapper { grid-template-columns: 80px 1fr; }
      .tl-line-rail::before, .tl-line-progress { left: 60px; }
      .tl-year-cell { left: -80px; width: 60px; font-size: 0.7rem; }
      .hero-card-tl, .hero-card-tr, .hero-card-bl { padding: 12px 14px; }
      .hc-status, .hc-loc-place, .hc-project-name { font-size: 0.7rem; }
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-burger { display: flex; }
      .nav { padding: 18px 24px; }
      .nav-logo { font-size: 1rem; }
      .intro { padding: 56px 24px; }
      .projects-section, .timeline-section, .skills-section { padding: 60px 24px; }
      .contact-left, .contact-right { padding: 60px 24px; }
      .footer-tagline { padding: 48px 24px 16px; }
      .proj-row { grid-template-columns: 1fr; gap: 16px; }
      .proj-row:hover { padding: 40px 24px; }
      .proj-num { display: none; }
      .statement-text { grid-template-columns: 1fr; font-size: clamp(2rem,8vw,4rem); }
      .tagline-text { grid-template-columns: 1fr; }
      .footer-links { grid-template-columns: 1fr 1fr; }
      .code-editor { margin-top: 32px; }
      .code-body { font-size: 0.72rem; padding: 18px 18px 22px; min-height: 280px; }
      .tl-wrapper { grid-template-columns: 60px 1fr; }
      .tl-line-rail::before, .tl-line-progress { left: 44px; }
      .tl-year-cell { left: -60px; width: 44px; font-size: 0.62rem; }
      .tl-entry { padding-left: 28px; }
      .tl-entry:hover, .tl-entry-expanded { padding-left: 32px; }
      .tl-dot-wrap { left: -16px; }
      .hero-card-bl { display: none; }
      .hero-card-tl, .hero-card-tr { padding: 10px 12px; }
      .hero-card-tl { top: 16px; left: 16px; }
      .hero-card-tr { top: 16px; right: 16px; }
      .polaroid-stack { height: 480px; }
      .polaroid { width: 260px; padding: 10px 10px 40px; }
      .polaroid-caption { font-size: 1.2rem; }
      .polaroid-3 { margin-left: -130px; }
    }
    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
      .code-cursor { animation: none; opacity: 1; }
      .hero-name-giant { transform: none; }
    }
  `;

  const progressHeight = filteredTl.length > 0
    ? `${(visibleTl.size / filteredTl.length) * 100}%`
    : "0%";

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

      <div
        className={`mobile-drawer-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

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

      <nav className="nav">
        <div className="nav-logo">Julie Anne Cantillep</div>
        <div className="nav-links">
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#timeline" className="nav-link">Timeline</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <button
          type="button"
          className={`nav-burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO — overhauled */}
      <section className="hero">
        <div ref={heroPhotoRef} className="hero-photo">
          <div className="hero-photo-overlay" />
          <Image
            src="/profile.jpg"
            alt="Julie Anne Cantillep"
            fill
            loading="eager"
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
          />

          {/* FLOATING CARD: AVAILABILITY (top-left) */}
          <div className="hero-card hero-card-tl" data-hover>
            <div className="hc-status">
              <span className="hc-pulse-wrap">
                <span className="hc-pulse-ring" />
                <span className="hc-pulse" />
              </span>
              Available for hire
            </div>
          </div>

          {/* FLOATING CARD: LOCATION + TIME (top-right) */}
          <div className="hero-card hero-card-tr" data-hover>
            <div className="hc-loc">
              <div className="hc-loc-flag" />
              <div className="hc-loc-text">
                <span className="hc-loc-place">Malmö, SE</span>
                <span className="hc-loc-time">{timeStr || "--:--"} · GMT+1</span>
              </div>
            </div>
          </div>

          {/* FLOATING CARD: LATEST PROJECT (bottom-left) */}
          <div className="hero-card hero-card-bl" data-hover>
            <div className="hc-project">
              <div className="hc-project-label">Latest project</div>
              <div className="hc-project-name">PodManager.ai</div>
              <div className="hc-project-meta">Fullstack · 2025–2026</div>
            </div>
          </div>
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

          <div className="code-editor" data-hover>
            <div className="code-bar">
              <span className="code-dot" style={{ background: "#e8613a" }} />
              <span className="code-dot" style={{ background: "#f5a0c8" }} />
              <span className="code-dot" style={{ background: "rgba(245,160,200,0.4)" }} />
              <span className="code-bar-title">julie-anne.ts — portfolio</span>
            </div>
            <div className="code-body">
              {typedLines.map((line, idx) => {
                const meta = codeLines[idx];
                return (
                  <div key={idx} className="code-line">
                    <span className="code-line-num">{idx + 1}</span>
                    <span className="code-line-text" style={{ color: meta?.color || "#cccccc" }}>
                      {line || "\u00A0"}
                    </span>
                  </div>
                );
              })}
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

        {/* POLAROID STACK — replaces Now Playing */}
        <div className="polaroid-stack fade-up d3">
          {/* Polaroid 1 — PracticePal */}
          <Link href="/projects/practicepal" className="polaroid polaroid-1" data-hover>
            <span className="polaroid-tape" />
            <div className="polaroid-image">
              <div className="mock-screen mock-practicepal">
                <div className="mock-bar">
                  <span className="mock-bar-dot" style={{ background: "var(--orange)" }} />
                  <span className="mock-bar-dot" style={{ background: "var(--pink)" }} />
                  <span className="mock-bar-dot" style={{ background: "rgba(245,160,200,0.4)" }} />
                </div>
                <div className="mock-pp-header">Today · 45 min</div>
                <div className="mock-pp-title">Scales</div>
                <div className="mock-pp-bars">
                  {[35, 60, 45, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="mock-pp-bar"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="polaroid-caption">PracticePal · 2025</div>
          </Link>

          {/* Polaroid 2 — PodManager */}
          <Link href="/projects/podmanager" className="polaroid polaroid-2" data-hover>
            <span className="polaroid-tape" />
            <div className="polaroid-image">
              <div className="mock-screen mock-podmanager">
                <div className="mock-bar">
                  <span className="mock-bar-dot" style={{ background: "var(--orange)" }} />
                  <span className="mock-bar-dot" style={{ background: "var(--pink)" }} />
                  <span className="mock-bar-dot" style={{ background: "rgba(245,160,200,0.4)" }} />
                </div>
                <div className="mock-pm-label">EP-014.WAV · 24:38</div>
                <div className="mock-pm-wave">
                  {[60, 30, 80, 45, 90, 50, 70, 35, 85, 55, 75, 40, 65, 50, 80].map((h, i) => (
                    <div
                      key={i}
                      className="mock-pm-bar"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.06}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="mock-pm-controls">
                  <span className="mock-pm-play">
                    <svg width="6" height="8" viewBox="0 0 6 8" fill="white">
                      <path d="M0 0L6 4L0 8V0Z" />
                    </svg>
                  </span>
                  <span className="mock-pm-line" />
                </div>
              </div>
            </div>
            <div className="polaroid-caption">PodManager · 2026</div>
          </Link>

          {/* Polaroid 3 — Sigma Car */}
          <a
            href="https://github.com/Julieanna97"
            target="_blank"
            rel="noopener noreferrer"
            className="polaroid polaroid-3"
            data-hover
          >
            <span className="polaroid-tape" />
            <div className="polaroid-image">
              <div className="mock-screen mock-sigma">
                <div className="mock-bar">
                  <span className="mock-bar-dot" style={{ background: "var(--orange)" }} />
                  <span className="mock-bar-dot" style={{ background: "var(--pink)" }} />
                  <span className="mock-bar-dot" style={{ background: "rgba(245,160,200,0.4)" }} />
                </div>
                <div className="mock-pm-label" style={{ marginBottom: 8 }}>SIGMA · TELEMETRY</div>
                <div className="mock-sigma-grid">
                  <div className="mock-sigma-stat">
                    <div className="mock-sigma-stat-label">Speed</div>
                    <div className="mock-sigma-stat-val">42<span className="unit">cm/s</span></div>
                  </div>
                  <div className="mock-sigma-stat">
                    <div className="mock-sigma-stat-label">Heading</div>
                    <div className="mock-sigma-stat-val">315<span className="unit">°</span></div>
                  </div>
                  <div className="mock-sigma-stat">
                    <div className="mock-sigma-stat-label">Sensor</div>
                    <div className="mock-sigma-stat-val">OK</div>
                  </div>
                  <div className="mock-sigma-stat">
                    <div className="mock-sigma-stat-label">Loop</div>
                    <div className="mock-sigma-stat-val">100<span className="unit">Hz</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="polaroid-caption">Sigma Car · 2023</div>
          </a>
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

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* DARK APPROACH */}
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
        <div className="dark-panel-chat fade-up d3">
          <div className="chat-bar">
            <span className="chat-bar-dot" style={{ background: "#e8613a" }} />
            <span className="chat-bar-dot" style={{ background: "#f5a0c8" }} />
            <span className="chat-bar-dot" style={{ background: "rgba(245,160,200,0.4)" }} />
            <span className="chat-bar-title">ask-julie — chat</span>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {chatMessages.length === 0 && !chatTyping && (
              <div className="chat-welcome">
                <strong>&gt; julie.init()</strong><br />
                Hi! I&apos;m Julie&apos;s portfolio bot.<br />
                Pick a question below to get started.
                <span className="chat-cursor-blink" />
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-julie"}`}>
                {msg.role === "julie" && <span className="chat-sender">Julie</span>}
                {msg.text}
              </div>
            ))}
            {chatTyping && (
              <div className="chat-typing-indicator">
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
              </div>
            )}
          </div>
          <div className="chat-chips">
            {chatQA.map((qa) => (
              <button
                key={qa.q}
                type="button"
                className="chat-chip"
                disabled={chatTyping}
                onClick={() => handleChatQuestion(qa)}
                data-hover
              >
                {qa.q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects-section" id="projects">
        <div className="fade-up d2">
          <div className="sec-super">Selected Work</div>
          <div className="sec-title">Projects</div>
        </div>
        <div className="proj-list">
          {projectItems.map((p, idx) => (
            <article
              key={p.name}
              className={`proj-row ${visibleProj.has(idx) ? "proj-row-visible" : ""}`}
              data-proj-index={idx}
            >
              <div className="proj-num">0{idx + 1}</div>
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
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="proj-link"
                    >
                      {link.label}
                      <span className="proj-link-arrow">→</span>
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
              onClick={() => { setTlFilter(f); setExpandedTl(null); setVisibleTl(new Set()); }}
            >
              <span>{f === "all" ? "All" : f}</span>
              <span className="filter-count">· {tlCounts[f]}</span>
            </button>
          ))}
        </div>

        <div className="tl-wrapper fade-up d4">
          <div className="tl-line-rail">
            <span className="tl-line-progress" style={{ height: progressHeight }} />
          </div>
          <div className="tl-content">
            {filteredTl.map((item, idx) => {
              const isExpanded = expandedTl === idx;
              const isVisible = visibleTl.has(idx);
              const catColor = categoryColors[item.category];

              return (
                <article
                  key={`${item.year}-${item.title}-${idx}`}
                  data-tl-index={idx}
                  className={`tl-entry ${isVisible ? "tl-entry-visible" : ""} ${isExpanded ? "tl-entry-expanded" : ""}`}
                  style={{
                    "--cat-color": catColor,
                    transitionDelay: `${idx * 0.06}s`,
                  } as React.CSSProperties}
                  onClick={() => setExpandedTl(isExpanded ? null : idx)}
                >
                  <div className="tl-dot-wrap">
                    <span className="tl-dot" />
                  </div>
                  <div className="tl-year-cell">{item.year}</div>

                  <div className="tl-row-flex">
                    <div className="tl-row-main">
                      <div className="tl-cat-pill">{item.category}</div>
                      <div className="tl-title">{item.title}</div>
                      <div className="tl-sub">{item.subtitle}</div>
                      <div className="tl-detail">{item.detail}</div>
                    </div>
                    <button type="button" className="tl-toggle" aria-label={isExpanded ? "Collapse" : "Expand"}>
                      <span className="tl-toggle-icon">+</span>
                    </button>
                  </div>

                  <div className="tl-expand">
                    <div className="tl-expand-inner">
                      {item.highlight && <p className="tl-highlight">"{item.highlight}"</p>}
                      {item.tech && item.tech.length > 0 && (
                        <>
                          <div className="tl-tech-label">Stack & Tools</div>
                          <div className="tl-tech-list">
                            {item.tech.map(t => (
                              <span key={t} className="tl-tech-pill">{t}</span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SKILLS */}
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