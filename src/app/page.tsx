"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const featuredProjects = [
  {
    name: "PracticePal",
    category: "Full Product",
    role: "Founder + Full-Stack Engineer",
    duration: "6 months",
    architecture: "Next.js app-router + MongoDB + Stripe webhooks + NextAuth",
    summary:
      "A full-stack practice and analytics app for musicians with auth, plans, sessions, and Stripe subscriptions.",
    stack: ["Next.js", "MongoDB", "Stripe", "NextAuth"],
    impact: "Increased session consistency with guided planning and progress analytics.",
    score: { impact: 5, complexity: 4, ownership: 5, business: 5 },
    whyBuilt:
      "Musicians needed a focused workflow that turned intention into repeatable practice sessions with measurable outcomes.",
    highlights: [
      "Secure auth and account handling with NextAuth",
      "Session and plan lifecycle with MongoDB models",
      "Stripe subscription lifecycle and webhook syncing",
    ],
    challenges: [
      "Coordinating Stripe webhooks with account state to avoid stale subscription status.",
      "Designing plan and session data models that stayed flexible for analytics expansion.",
      "Balancing clean UX with reliable edge-case handling for auth and billing.",
    ],
    lessons: [
      "Webhook idempotency and clear event logging are essential for subscription reliability.",
      "Simple onboarding beats feature-heavy first sessions for retention.",
      "Strong domain models reduce rework when adding new reporting features.",
    ],
    nextIteration: [
      "Adaptive practice recommendations driven by prior session patterns.",
      "Collaborative coach/student review flows.",
      "Higher-fidelity progress dashboards with trend forecasting.",
    ],
  },
  {
    name: "PodManager.ai",
    category: "Internship",
    role: "Frontend + AI Features Intern",
    duration: "4 months",
    architecture: "React UI + FastAPI services + FFmpeg pipelines + OpenAI APIs",
    summary:
      "Podcast editing and AI analysis platform. Waveform UI, FFmpeg audio blending, AI transcription with Whisper and GPT.",
    stack: ["React", "FastAPI", "FFmpeg", "OpenAI"],
    impact: "Cut manual production steps by automating clipping and transcript workflows.",
    score: { impact: 4, complexity: 4, ownership: 3, business: 4 },
    whyBuilt:
      "Podcast teams needed fewer manual editing steps and faster insights from long-form audio.",
    highlights: [
      "Built waveform-first editing interactions",
      "Integrated FFmpeg pipelines for audio merging",
      "Added AI transcription and summarization tooling",
    ],
    challenges: [
      "Keeping responsive UI performance while rendering rich waveform interactions.",
      "Stitching AI transcript quality with practical editorial workflows.",
      "Reducing processing latency across Python services and media jobs.",
    ],
    lessons: [
      "Fast visual feedback is as important as algorithm quality in editing tools.",
      "Fallback paths are mandatory when external AI APIs degrade.",
      "Well-structured background jobs make media-heavy products maintainable.",
    ],
    nextIteration: [
      "Speaker diarization and chapter auto-generation.",
      "Batch editing presets for repetitive production tasks.",
      "Better observability for long-running media pipelines.",
    ],
  },
  {
    name: "Sigma Autonomous Car",
    category: "Embedded Systems",
    role: "Embedded Developer",
    duration: "3 months",
    architecture: "Arduino controller + sensor fusion + serial telemetry tooling",
    summary:
      "Arduino-based autonomous vehicle with sensor integration and C/C++ control systems.",
    stack: ["Arduino", "C/C++", "Python"],
    impact: "Delivered reliable autonomous pathing under constrained hardware resources.",
    score: { impact: 4, complexity: 5, ownership: 4, business: 3 },
    whyBuilt:
      "The goal was to prove reliable autonomous behavior under tight hardware and power constraints.",
    highlights: [
      "Sensor calibration and data fusion",
      "Embedded control loop tuning",
      "Rapid prototype testing with Python tooling",
    ],
    challenges: [
      "Managing noisy sensor inputs in changing physical conditions.",
      "Tuning control loops without overfitting to one test path.",
      "Debugging hardware and firmware interactions with limited runtime visibility.",
    ],
    lessons: [
      "Consistent telemetry logging is critical for reproducible tuning.",
      "Small mechanical variances can have outsized software impact.",
      "Incremental test protocols prevent regressions during rapid iteration.",
    ],
    nextIteration: [
      "Improve obstacle handling using richer sensor fusion.",
      "Add deterministic simulation scenarios for faster tuning cycles.",
      "Refactor control layers for easier experimentation.",
    ],
  },
];

const currentlyBuildingItems = [
  {
    title: "Portfolio Recruiter Flow",
    status: "In progress",
    target: "May 2026",
    detail: "Streamlining the 30-second recruiter scan with focused highlights and faster navigation.",
  },
  {
    title: "PracticePal Insights v2",
    status: "Planning",
    target: "Q2 2026",
    detail: "Designing clearer progress signals and habit-based recommendations for session quality.",
  },
  {
    title: "Reusable Design Components",
    status: "In progress",
    target: "Ongoing",
    detail: "Extracting repeatable UI patterns for faster feature delivery across future projects.",
  },
] as const;

const projectModalTabs = ["overview", "architecture", "challenges", "lessons", "next"] as const;

const timelineMilestones = [
  {
    year: "2023",
    category: "work",
    title: "Embedded Systems Intern",
    subtitle: "Sigma Industry Evolution / Nodehill AB",
    detail:
      "Worked with Arduino, ESP32, LoRa, and hardware integration for real-world prototypes.",
  },
  {
    year: "2024",
    category: "ai",
    title: "AI Training Contributor",
    subtitle: "Outlier",
    detail:
      "Evaluated and improved model outputs, with focus on technical quality and consistency.",
  },
  {
    year: "2025",
    category: "product",
    title: "Full Stack Product Build",
    subtitle: "PracticePal",
    detail:
      "Designed and shipped an end-to-end musician workflow with auth, analytics, and subscriptions.",
  },
  {
    year: "2026",
    category: "education",
    title: "Graduation",
    subtitle: "B.S. in Information Technology",
    detail:
      "Entering full-time software engineering roles focused on product and platform development.",
  },
];

const timelineFilters = ["all", "work", "ai", "product", "education"] as const;

const skillMap = {
  frontend: [
    { name: "React", level: 92, proof: "https://github.com/Julieanna97" },
    { name: "Next.js", level: 90, proof: "https://github.com/Julieanna97/PracticePal" },
    { name: "TypeScript", level: 86, proof: "https://github.com/Julieanna97/PracticePal" },
  ],
  backend: [
    { name: "Node.js", level: 84, proof: "https://github.com/Julieanna97/PracticePal" },
    { name: "FastAPI", level: 82, proof: "https://github.com/Julieanna97" },
    { name: "MongoDB", level: 80, proof: "https://github.com/Julieanna97/PracticePal" },
  ],
  systems: [
    { name: "C/C++", level: 78, proof: "https://github.com/Julieanna97" },
    { name: "Arduino/ESP32", level: 82, proof: "https://github.com/Julieanna97" },
    { name: "Python", level: 83, proof: "https://github.com/Julieanna97" },
  ],
  tooling: [
    { name: "Git", level: 90, proof: "https://github.com/Julieanna97" },
    { name: "Docker", level: 72, proof: "https://github.com/Julieanna97" },
    { name: "Figma", level: 74, proof: "https://www.figma.com" },
  ],
};

const testimonials = [
  {
    quote:
      "Julie brings product thinking and engineering depth together. Features ship fast and clean.",
    by: "Former Teammate",
    role: "Product Engineer",
  },
  {
    quote:
      "Strong ownership. She can jump from UX details to backend architecture without losing momentum.",
    by: "Mentor",
    role: "Senior Developer",
  },
];

const ambientTokens = [
  { label: "</>", top: "11%", left: "16%", delay: "0s", duration: "13s", driftX: "20px", driftY: "-14px", rotate: "-7deg" },
  { label: "{ }", top: "18%", left: "76%", delay: "1.3s", duration: "16s", driftX: "-24px", driftY: "12px", rotate: "8deg" },
  { label: "JS", top: "28%", left: "8%", delay: "0.8s", duration: "12s", driftX: "18px", driftY: "10px", rotate: "6deg" },
  { label: "TS", top: "35%", left: "64%", delay: "2.2s", duration: "14s", driftX: "-18px", driftY: "-10px", rotate: "-6deg" },
  { label: "UI", top: "48%", left: "84%", delay: "1.1s", duration: "15s", driftX: "-20px", driftY: "8px", rotate: "7deg" },
  { label: "DB", top: "58%", left: "14%", delay: "2.5s", duration: "13s", driftX: "24px", driftY: "-12px", rotate: "-8deg" },
  { label: "git", top: "69%", left: "72%", delay: "0.4s", duration: "16s", driftX: "-16px", driftY: "14px", rotate: "6deg" },
  { label: "npm", top: "77%", left: "22%", delay: "1.9s", duration: "15s", driftX: "20px", driftY: "-9px", rotate: "-6deg" },
  { label: "⚙", top: "84%", left: "62%", delay: "2.7s", duration: "13s", driftX: "-14px", driftY: "-12px", rotate: "10deg" },
] as const;

const ambientStars = [
  { top: "8%", left: "10%", size: "2px", delay: "0.1s", duration: "3.2s", driftX: "6px", driftY: "-8px" },
  { top: "14%", left: "28%", size: "3px", delay: "1.2s", duration: "4.1s", driftX: "-5px", driftY: "7px" },
  { top: "9%", left: "46%", size: "2px", delay: "0.7s", duration: "3.6s", driftX: "7px", driftY: "6px" },
  { top: "16%", left: "66%", size: "2px", delay: "1.7s", duration: "4.4s", driftX: "-7px", driftY: "-6px" },
  { top: "12%", left: "84%", size: "3px", delay: "0.4s", duration: "3.8s", driftX: "5px", driftY: "-7px" },
  { top: "30%", left: "18%", size: "2px", delay: "1.9s", duration: "4.2s", driftX: "-6px", driftY: "5px" },
  { top: "26%", left: "38%", size: "3px", delay: "0.8s", duration: "3.5s", driftX: "8px", driftY: "-5px" },
  { top: "34%", left: "58%", size: "2px", delay: "1.1s", duration: "4.6s", driftX: "-8px", driftY: "7px" },
  { top: "29%", left: "79%", size: "2px", delay: "0.3s", duration: "3.4s", driftX: "6px", driftY: "6px" },
  { top: "44%", left: "8%", size: "3px", delay: "1.4s", duration: "4.5s", driftX: "-7px", driftY: "-7px" },
  { top: "48%", left: "25%", size: "2px", delay: "0.5s", duration: "3.7s", driftX: "6px", driftY: "8px" },
  { top: "41%", left: "46%", size: "2px", delay: "1.6s", duration: "4s", driftX: "-6px", driftY: "-5px" },
  { top: "53%", left: "63%", size: "3px", delay: "0.9s", duration: "3.9s", driftX: "8px", driftY: "-7px" },
  { top: "47%", left: "86%", size: "2px", delay: "1.8s", duration: "4.3s", driftX: "-5px", driftY: "6px" },
  { top: "67%", left: "15%", size: "2px", delay: "0.6s", duration: "3.3s", driftX: "7px", driftY: "-6px" },
  { top: "73%", left: "34%", size: "3px", delay: "1.5s", duration: "4.8s", driftX: "-8px", driftY: "8px" },
  { top: "69%", left: "52%", size: "2px", delay: "0.2s", duration: "3.6s", driftX: "5px", driftY: "7px" },
  { top: "78%", left: "71%", size: "2px", delay: "1.3s", duration: "4.2s", driftX: "-6px", driftY: "-8px" },
  { top: "74%", left: "89%", size: "3px", delay: "0.9s", duration: "3.8s", driftX: "8px", driftY: "5px" },
  { top: "88%", left: "23%", size: "2px", delay: "1.7s", duration: "4.1s", driftX: "-7px", driftY: "-6px" },
  { top: "84%", left: "44%", size: "2px", delay: "0.4s", duration: "3.5s", driftX: "6px", driftY: "8px" },
  { top: "90%", left: "61%", size: "3px", delay: "1.1s", duration: "4.4s", driftX: "-8px", driftY: "6px" },
  { top: "86%", left: "80%", size: "2px", delay: "0.7s", duration: "3.9s", driftX: "7px", driftY: "-7px" },
] as const;

const relaxingPlaylist = [
  {
    title: "Kiss the Rain",
    artist: "ceeprolific",
    src: "/audio/ceeprolific-kiss-the-rain-274811.mp3",
  },
  {
    title: "Rain Outside the Window",
    artist: "konstantinpazuzustudio",
    src: "/audio/konstantinpazuzustudio-rain-outside-the-window-thunder-rain-and-piano-512039.mp3",
  },
  {
    title: "Wings of Freedom",
    artist: "lofi and rain",
    src: "/audio/wings_of_freedom-lofi-and-rain-432544.mp3",
  },
  {
    title: "Wings of Freedom (Rain Sounds)",
    artist: "lofi and rain",
    src: "/audio/wings_of_freedom-lofi-music-with-rain-sounds-432545.mp3",
  },
];

const themes = {
  lilac: {
    label: "Pastel Lilac",
    bg: "#fbf7ff",
    grid: "rgba(186, 167, 220, 0.22)",
    text: "#665f7a",
    muted: "rgba(102, 95, 122, 0.66)",
    accent: "#ab8fc0",
    accentSoft: "rgba(171, 143, 192, 0.09)",
    accentBorder: "rgba(171, 143, 192, 0.2)",
    border: "#e8deef",
    panel: "rgba(255, 255, 255, 0.92)",
    surface: "rgba(255, 251, 255, 0.84)",
    dotMain: "#c29ad8",
    dotShadow1: "rgba(194, 154, 216, 0.85)",
    dotShadow2: "rgba(168, 190, 230, 0.7)",
    shadow: "rgba(122, 102, 156, 0.14)",
    musicAccent: "#b9c9f0",
  },
  peach: {
    label: "Peach",
    bg: "#fff8f3",
    grid: "rgba(236, 184, 156, 0.22)",
    text: "#7f675f",
    muted: "rgba(127, 103, 95, 0.66)",
    accent: "#d79b83",
    accentSoft: "rgba(215, 155, 131, 0.1)",
    accentBorder: "rgba(215, 155, 131, 0.2)",
    border: "#f2ddd3",
    panel: "rgba(255, 255, 255, 0.94)",
    surface: "rgba(255, 252, 249, 0.88)",
    dotMain: "#efb39b",
    dotShadow1: "rgba(239, 179, 155, 0.85)",
    dotShadow2: "rgba(246, 214, 185, 0.72)",
    shadow: "rgba(165, 114, 94, 0.15)",
    musicAccent: "#f2c8b7",
  },
  mint: {
    label: "Mint",
    bg: "#f5fffb",
    grid: "rgba(156, 211, 195, 0.22)",
    text: "#567069",
    muted: "rgba(86, 112, 105, 0.66)",
    accent: "#79b8a6",
    accentSoft: "rgba(121, 184, 166, 0.1)",
    accentBorder: "rgba(121, 184, 166, 0.2)",
    border: "#d7efe7",
    panel: "rgba(255, 255, 255, 0.94)",
    surface: "rgba(249, 255, 253, 0.9)",
    dotMain: "#92d6c3",
    dotShadow1: "rgba(146, 214, 195, 0.85)",
    dotShadow2: "rgba(171, 225, 209, 0.72)",
    shadow: "rgba(88, 149, 129, 0.15)",
    musicAccent: "#9fdcc9",
  },
};

type ThemeKey = keyof typeof themes;
type TimelineFilter = (typeof timelineFilters)[number];
type SkillCategory = keyof typeof skillMap;
type ColorMode = "light" | "dark";
type ProjectModalTab = (typeof projectModalTabs)[number];
const sectionOrder = ["about", "timeline", "projects", "contact"] as const;
type SectionId = (typeof sectionOrder)[number];

export default function Home() {
  const [themeKey, setThemeKey] = useState<ThemeKey>("lilac");
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [recruiterQuickMode, setRecruiterQuickMode] = useState(false);
  const [timelineStoryMode, setTimelineStoryMode] = useState(false);
  const [liveNow, setLiveNow] = useState<Date | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [viewerCount, setViewerCount] = useState(22);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isIntroExiting, setIsIntroExiting] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [activeCommandIndex, setActiveCommandIndex] = useState(0);
  const [favoriteProjects, setFavoriteProjects] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>("all");
  const [activeSkillCategory, setActiveSkillCategory] = useState<SkillCategory>("frontend");
  const [selectedProject, setSelectedProject] = useState<
    (typeof featuredProjects)[number] | null
  >(null);
  const [visibleMilestones, setVisibleMilestones] = useState<boolean[]>(
    () => timelineMilestones.map(() => false),
  );
  const [chatForm, setChatForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [toast, setToast] = useState({
    visible: false,
    message: "",
  });
  const [typedIntro, setTypedIntro] = useState("");
  const [typingLoop, setTypingLoop] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [visibleRevealIds, setVisibleRevealIds] = useState<string[]>([]);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState<ProjectModalTab>("overview");
  const [timelineLineProgress, setTimelineLineProgress] = useState(0);

  const toastTimerRef = useRef<number | null>(null);
  const modalCloseTimerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoplayBoundRef = useRef(false);
  const autoplayPrimedRef = useRef(false);
  const timelineItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentAreaRef = useRef<HTMLDivElement | null>(null);
  const timelineSectionRef = useRef<HTMLDivElement | null>(null);

  const activeTheme = useMemo(() => {
    const baseTheme = themes[themeKey];
    if (colorMode === "light") {
      return baseTheme;
    }

    return {
      ...baseTheme,
      bg: "#101216",
      grid: "rgba(255, 255, 255, 0.06)",
      text: "#f2f4f8",
      muted: "rgba(242, 244, 248, 0.62)",
      accentSoft: `color-mix(in srgb, ${baseTheme.accent} 16%, transparent)`,
      accentBorder: `color-mix(in srgb, ${baseTheme.accent} 30%, transparent)`,
      border: "#2d3340",
      panel: "rgba(22, 26, 34, 0.92)",
      surface: "rgba(18, 22, 29, 0.92)",
      dotMain: "#7e8aa2",
      dotShadow1: "rgba(126, 138, 162, 0.92)",
      dotShadow2: "rgba(170, 183, 207, 0.82)",
      shadow: "rgba(0, 0, 0, 0.38)",
      musicAccent: `color-mix(in srgb, ${baseTheme.accent} 52%, #8bc5ff)`,
    };
  }, [colorMode, themeKey]);
  const themeOrder = Object.keys(themes) as ThemeKey[];

  const filteredMilestones = useMemo(() => {
    return timelineMilestones
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((item) => timelineFilter === "all" || item.category === timelineFilter);
  }, [timelineFilter]);

  const skillCategoryOrder = Object.keys(skillMap) as SkillCategory[];

  const displayedProjects = useMemo(() => {
    if (!showFavoritesOnly) {
      return featuredProjects;
    }

    return featuredProjects.filter((project) => favoriteProjects.includes(project.name));
  }, [favoriteProjects, showFavoritesOnly]);

  const hasPlaylist = relaxingPlaylist.length > 0;
  const activeTrack = hasPlaylist
    ? relaxingPlaylist[((currentTrack % relaxingPlaylist.length) + relaxingPlaylist.length) % relaxingPlaylist.length]
    : null;

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2600);
  }, []);

  const dismissIntro = useCallback(() => {
    if (!isIntroVisible) {
      return;
    }

    setIsIntroExiting(true);
    window.setTimeout(() => {
      setIsIntroVisible(false);
    }, reduceMotion ? 0 : 180);
  }, [isIntroVisible, reduceMotion]);

  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const closeProjectModal = useCallback(() => {
    if (!selectedProject || isModalClosing) {
      return;
    }

    setIsModalClosing(true);

    if (modalCloseTimerRef.current) {
      window.clearTimeout(modalCloseTimerRef.current);
    }

    modalCloseTimerRef.current = window.setTimeout(() => {
      setSelectedProject(null);
      setIsModalClosing(false);
    }, 180);
  }, [isModalClosing, selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      setActiveProjectTab("overview");
    }
  }, [selectedProject]);

  const attemptAutoplay = useCallback(() => {
    if (!audioRef.current) {
      return;
    }

    const audio = audioRef.current;
    audio.muted = false;

    audio
      .play()
      .then(() => {
        autoplayPrimedRef.current = true;
        setIsPlaying(true);
      })
      .catch(() => {
        audio.muted = true;
        audio
          .play()
          .then(() => {
            autoplayPrimedRef.current = false;
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      });
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setViewerCount((prev) => {
        const next = prev + (Math.random() > 0.5 ? 1 : -1);
        return Math.min(38, Math.max(14, next));
      });
    }, 9000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!hasPlaylist) {
      setCurrentTrack(0);
      setIsPlaying(false);
      return;
    }

    setCurrentTrack((prev) => {
      if (prev >= 0 && prev < relaxingPlaylist.length) {
        return prev;
      }
      return 0;
    });
  }, [hasPlaylist]);

  useEffect(() => {
    const persisted = window.localStorage.getItem("portfolio-reduce-motion");
    if (persisted === "true" || persisted === "false") {
      setReduceMotion(persisted === "true");
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const persistedMode = window.localStorage.getItem("portfolio-color-mode");
    if (persistedMode === "light" || persistedMode === "dark") {
      setColorMode(persistedMode);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setColorMode(mediaQuery.matches ? "dark" : "light");
  }, []);

  useEffect(() => {
    const persistedFavorites = window.localStorage.getItem("portfolio-favorite-projects");
    if (!persistedFavorites) {
      return;
    }

    try {
      const parsed = JSON.parse(persistedFavorites);
      if (Array.isArray(parsed)) {
        const normalized = parsed.filter((item): item is string => typeof item === "string");
        setFavoriteProjects(normalized);
      }
    } catch {
      setFavoriteProjects([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-reduce-motion", String(reduceMotion));
  }, [reduceMotion]);

  useEffect(() => {
    window.localStorage.setItem("portfolio-color-mode", colorMode);
  }, [colorMode]);

  useEffect(() => {
    window.localStorage.setItem(
      "portfolio-favorite-projects",
      JSON.stringify(favoriteProjects),
    );
  }, [favoriteProjects]);

  useEffect(() => {
    setLiveNow(new Date());
    const timer = window.setInterval(() => setLiveNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setPageReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!pageReady || !isIntroVisible) {
      return;
    }

    if (reduceMotion) {
      setIsIntroExiting(true);
      const hideTimer = window.setTimeout(() => {
        setIsIntroVisible(false);
      }, 80);

      return () => window.clearTimeout(hideTimer);
    }

    const fadeTimer = window.setTimeout(() => {
      setIsIntroExiting(true);
    }, 2500);

    const hideTimer = window.setTimeout(() => {
      setIsIntroVisible(false);
    }, 3350);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [isIntroVisible, pageReady, reduceMotion]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      showToast("Music player is on the right side. Hover the tab.");
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [showToast]);

  useEffect(() => {
    const introLine =
      "I build soft, thoughtful digital experiences with full-stack precision.";
    let pauseTimer: number | undefined;
    let index = 0;

    setTypedIntro("");

    const typingTimer = window.setInterval(() => {
      index += 1;
      setTypedIntro(introLine.slice(0, index));

      if (index >= introLine.length) {
        window.clearInterval(typingTimer);
        pauseTimer = window.setTimeout(() => {
          setTypingLoop((prev) => prev + 1);
        }, 2200);
      }
    }, 42);

    return () => {
      window.clearInterval(typingTimer);
      if (pauseTimer) {
        window.clearTimeout(pauseTimer);
      }
    };
  }, [typingLoop]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      if (event.key === "Escape") {
        setIsCommandPaletteOpen(false);
        closeProjectModal();
        return;
      }

      if (tag === "input" || tag === "textarea" || target?.isContentEditable) {
        return;
      }

      if (key === "c") {
        setIsChatOpen(true);
        showToast("Chat opened (shortcut C)");
      }

      if (key === "m") {
        showToast("Music player is on the right side");
      }

      if (key === "d") {
        setColorMode((prev) => (prev === "light" ? "dark" : "light"));
        showToast("Color mode toggled (shortcut D)");
      }

      if (key === "f") {
        setShowFavoritesOnly((prev) => {
          const next = !prev;
          showToast(next ? "Showing favorite projects only (shortcut F)" : "Showing all projects (shortcut F)");
          return next;
        });
      }

    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeProjectModal, scrollToSection, showToast]);

  useEffect(() => {
    const container = contentAreaRef.current;
    if (!container) {
      return;
    }

    const updateProgress = () => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      setScrollProgress(maxScroll > 0 ? (container.scrollTop / maxScroll) * 100 : 0);
    };

    updateProgress();
    container.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      container.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [recruiterQuickMode]);

  useEffect(() => {
    const container = contentAreaRef.current;
    const timeline = timelineSectionRef.current;

    if (!container || !timeline || recruiterQuickMode) {
      setTimelineLineProgress(0);
      return;
    }

    if (reduceMotion) {
      setTimelineLineProgress(100);
      return;
    }

    const updateTimelineProgress = () => {
      if (!timelineSectionRef.current || !contentAreaRef.current) {
        return;
      }

      const content = contentAreaRef.current;
      const timelineElement = timelineSectionRef.current;

      const triggerY = content.scrollTop + content.clientHeight * 0.72;
      const startY = timelineElement.offsetTop + 16;
      const endY = timelineElement.offsetTop + timelineElement.offsetHeight - 16;
      const total = Math.max(1, endY - startY);

      const raw = (triggerY - startY) / total;
      const next = Math.min(100, Math.max(0, raw * 100));
      setTimelineLineProgress(next);
    };

    updateTimelineProgress();
    container.addEventListener("scroll", updateTimelineProgress, { passive: true });
    window.addEventListener("resize", updateTimelineProgress);

    return () => {
      container.removeEventListener("scroll", updateTimelineProgress);
      window.removeEventListener("resize", updateTimelineProgress);
    };
  }, [reduceMotion, recruiterQuickMode, timelineStoryMode]);

  useEffect(() => {
    const root = contentAreaRef.current;
    if (!root) {
      return;
    }

    const sections = sectionOrder
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      {
        root,
        threshold: [0.25, 0.45, 0.65],
        rootMargin: "-20% 0px -45% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [recruiterQuickMode]);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleRevealIds(["utility", "about", "timeline", "projects", "contact"]);
      return;
    }

    const root = contentAreaRef.current;
    if (!root) {
      return;
    }

    const revealItems = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal-id]"),
    );

    if (!revealItems.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const revealId = (entry.target as HTMLElement).dataset.revealId;
          if (!revealId) {
            return;
          }

          setVisibleRevealIds((prev) =>
            prev.includes(revealId) ? prev : [...prev, revealId],
          );
        });
      },
      { root, threshold: 0.18 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [reduceMotion, recruiterQuickMode]);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleMilestones(timelineMilestones.map(() => true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting && !Number.isNaN(index)) {
            setVisibleMilestones((prev) => {
              if (prev[index]) {
                return prev;
              }
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.25 },
    );

    timelineItemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      if (modalCloseTimerRef.current) {
        window.clearTimeout(modalCloseTimerRef.current);
      }
    };
  }, []);

  const isRevealVisible = useCallback(
    (id: string) => pageReady && (reduceMotion || visibleRevealIds.includes(id)),
    [pageReady, reduceMotion, visibleRevealIds],
  );

  const handleChatChange = (
    field: "name" | "email" | "message",
    value: string,
  ) => {
    setChatForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleChatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio chat from ${chatForm.name || "a visitor"}`,
    );
    const body = encodeURIComponent(
      `Hi Julie,\n\nName: ${chatForm.name}\nEmail: ${chatForm.email}\n\nMessage:\n${chatForm.message}`,
    );

    showToast("Message draft opened in your email app.");
    window.location.href = `mailto:kisamae1997@gmail.com?subject=${subject}&body=${body}`;

    setIsChatOpen(false);
    setChatForm({ name: "", email: "", message: "" });
  };

  const handleProjectPointerMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (reduceMotion) {
      return;
    }

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const tiltY = ((x / rect.width) * 2 - 1) * 5;
    const tiltX = (1 - (y / rect.height) * 2) * 5;

    card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
  };

  const resetProjectTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  const togglePlay = () => {
    if (!audioRef.current || !activeTrack) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    autoplayPrimedRef.current = true;
    audioRef.current.muted = false;
    audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });
    setIsPlaying(true);
  };

  const playNextTrack = () => {
    if (!hasPlaylist) {
      return;
    }
    setCurrentTrack((prev) => (prev + 1) % relaxingPlaylist.length);
    setIsPlaying(true);
  };

  const playPreviousTrack = () => {
    if (!hasPlaylist) {
      return;
    }
    setCurrentTrack((prev) => (prev - 1 + relaxingPlaylist.length) % relaxingPlaylist.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.muted = !autoplayPrimedRef.current;
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.muted = !autoplayPrimedRef.current;
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    attemptAutoplay();
  }, [attemptAutoplay]);

  const commandActions = useMemo(
    () => [
      {
        id: "about",
        label: "Go to About",
        run: () => scrollToSection("about"),
      },
      {
        id: "timeline",
        label: "Go to Timeline",
        run: () => scrollToSection("timeline"),
      },
      {
        id: "projects",
        label: "Go to Projects",
        run: () => scrollToSection("projects"),
      },
      {
        id: "skills",
        label: "Go to Skills",
        run: () => scrollToSection("skills"),
      },
      {
        id: "contact",
        label: "Go to Contact",
        run: () => scrollToSection("contact"),
      },
      {
        id: "theme",
        label: "Cycle Theme",
        run: () => {
          setThemeKey((prev) => {
            const currentIndex = themeOrder.indexOf(prev);
            return themeOrder[(currentIndex + 1) % themeOrder.length];
          });
        },
      },
      {
        id: "mode",
        label: colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode",
        run: () => setColorMode((prev) => (prev === "light" ? "dark" : "light")),
      },
      {
        id: "motion",
        label: reduceMotion ? "Enable Motion" : "Reduce Motion",
        run: () => setReduceMotion((prev) => !prev),
      },
      {
        id: "quick-mode",
        label: recruiterQuickMode ? "Disable Recruiter Quick Mode" : "Enable Recruiter Quick Mode",
        run: () => setRecruiterQuickMode((prev) => !prev),
      },
      {
        id: "story-mode",
        label: timelineStoryMode ? "Disable Timeline Story Mode" : "Enable Timeline Story Mode",
        run: () => setTimelineStoryMode((prev) => !prev),
      },
      {
        id: "favorites-view",
        label: showFavoritesOnly ? "Show All Projects" : "Show Favorite Projects Only",
        run: () => setShowFavoritesOnly((prev) => !prev),
      },
      {
        id: "music",
        label: isPlaying ? "Pause Music" : "Play Music",
        run: () => togglePlay(),
      },
      {
        id: "github",
        label: "Open GitHub",
        run: () => window.open("https://github.com/Julieanna97", "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        run: () => window.open("https://linkedin.com/in/julieannacantillep", "_blank"),
      },
      {
        id: "email",
        label: "Compose Email",
        run: () => {
          window.location.href = "mailto:kisamae1997@gmail.com";
        },
      },
    ],
    [
      colorMode,
      isPlaying,
      recruiterQuickMode,
      reduceMotion,
      scrollToSection,
      showFavoritesOnly,
      themeOrder,
      timelineStoryMode,
    ],
  );

  const toggleProjectFavorite = useCallback((projectName: string) => {
    setFavoriteProjects((prev) =>
      prev.includes(projectName)
        ? prev.filter((name) => name !== projectName)
        : [...prev, projectName],
    );
  }, []);

  const filteredCommandActions = commandActions.filter((action) => {
    const query = commandQuery.trim().toLowerCase();
    if (!query) {
      return true;
    }
    return action.label.toLowerCase().includes(query);
  });

  const runCommandAction = (actionId: string) => {
    const action = commandActions.find((item) => item.id === actionId);
    if (!action) {
      return;
    }
    action.run();
    setIsCommandPaletteOpen(false);
    setCommandQuery("");
    setActiveCommandIndex(0);
  };

  useEffect(() => {
    if (!isCommandPaletteOpen) {
      return;
    }

    setActiveCommandIndex(0);
  }, [isCommandPaletteOpen, commandQuery]);

  useEffect(() => {
    if (activeCommandIndex < filteredCommandActions.length) {
      return;
    }
    setActiveCommandIndex(Math.max(0, filteredCommandActions.length - 1));
  }, [activeCommandIndex, filteredCommandActions.length]);

  useEffect(() => {
    if (autoplayBoundRef.current) {
      return;
    }

    autoplayBoundRef.current = true;

    const handleFirstInteraction = () => {
      if (audioRef.current) {
        autoplayPrimedRef.current = true;
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction, {
      once: true,
    });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, {
      once: true,
    });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [attemptAutoplay]);

  const rootStyle: React.CSSProperties = {
    backgroundColor: activeTheme.bg,
    backgroundImage: `linear-gradient(${activeTheme.grid} 1px, transparent 1px), linear-gradient(90deg, ${activeTheme.grid} 1px, transparent 1px)`,
    backgroundSize: "38px 38px",
    backgroundPosition: "center center",
    ["--bg-color" as string]: activeTheme.bg,
    ["--grid-color" as string]: activeTheme.grid,
    ["--text-color" as string]: activeTheme.text,
    ["--muted-color" as string]: activeTheme.muted,
    ["--accent-color" as string]: activeTheme.accent,
    ["--accent-soft" as string]: activeTheme.accentSoft,
    ["--accent-border" as string]: activeTheme.accentBorder,
    ["--border-color" as string]: activeTheme.border,
    ["--panel-bg" as string]: activeTheme.panel,
    ["--surface-bg" as string]: activeTheme.surface,
    ["--dot-main" as string]: activeTheme.dotMain,
    ["--dot-shadow-1" as string]: activeTheme.dotShadow1,
    ["--dot-shadow-2" as string]: activeTheme.dotShadow2,
    ["--shadow-color" as string]: activeTheme.shadow,
    ["--music-accent" as string]: activeTheme.musicAccent,
    ["--content-bg" as string]: colorMode === "light" ? "rgba(255, 255, 255, 0.66)" : "rgba(12, 14, 19, 0.72)",
    ["--topbar-bg" as string]: colorMode === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(20, 23, 30, 0.9)",
    ["--card-bg" as string]: colorMode === "light" ? "#ffffff" : "rgba(26, 30, 39, 0.95)",
    ["--input-bg" as string]: colorMode === "light" ? "#ffffff" : "rgba(19, 22, 30, 0.94)",
    ["--overlay-bg" as string]: colorMode === "light" ? "rgba(16, 18, 24, 0.26)" : "rgba(4, 6, 10, 0.58)",
    ["--text-inverse" as string]: colorMode === "light" ? "#ffffff" : "#eaf3ff",
    ["--profile-role-color" as string]: colorMode === "light" ? "var(--text-color)" : "#f6f8ff",
    ["--about-text-color" as string]: colorMode === "light" ? "var(--text-color)" : "#eef2ff",
  };

  const introCopy = recruiterQuickMode
    ? {
        kicker: "Recruiter View Initializing",
        tagline:
          "A fast candidate snapshot focused on outcomes, ownership, and execution quality.",
        loaderLabel: "Loading recruiter highlights: impact, stack, and delivery...",
        pills: ["Impact", "Ownership", "Results"],
      }
    : {
        kicker: "Welcome to my portfolio experience",
        tagline:
          "Full-stack builder crafting thoughtful, product-focused experiences. Explore projects, systems thinking, and product execution in one flow.",
        loaderLabel: "Preparing your interactive portfolio journey...",
        pills: ["Product", "Systems", "Craft"],
      };

  return (
    <div className={`min-h-screen ${reduceMotion ? "reduce-motion" : ""}`} style={rootStyle}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: var(--bg-color);
          background-image: linear-gradient(var(--grid-color) 1px, transparent 1px),
                            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
          background-size: 38px 38px;
          background-position: center center;
          background-attachment: fixed;
          color: var(--text-color);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 13px;
          line-height: 1.5em;
        }

        a {
          color: var(--text-color);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        a:hover {
          color: var(--accent-color);
        }

        .ambient-backdrop {
          position: fixed;
          inset: 0;
          z-index: 8;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.92;
        }

        .ambient-blob {
          position: absolute;
          border-radius: 999px;
          filter: blur(8px);
          opacity: 0.5;
          mix-blend-mode: multiply;
          animation: ambientBlobFloat 14s ease-in-out infinite;
        }

        .ambient-blob-a {
          width: 34vmax;
          height: 34vmax;
          left: -10vmax;
          top: 6vh;
          background: radial-gradient(circle at 35% 35%, color-mix(in srgb, var(--accent-color) 42%, transparent) 0%, transparent 68%);
        }

        .ambient-blob-b {
          width: 30vmax;
          height: 30vmax;
          right: -8vmax;
          top: 24vh;
          background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--music-accent) 48%, transparent) 0%, transparent 70%);
          animation-delay: 1.8s;
          animation-duration: 16s;
        }

        .ambient-blob-c {
          width: 28vmax;
          height: 28vmax;
          left: 30vw;
          bottom: -10vmax;
          background: radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--accent-color) 28%, transparent) 0%, transparent 72%);
          animation-delay: 3.2s;
          animation-duration: 18s;
        }

        .ambient-noise {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
            to bottom,
            color-mix(in srgb, var(--grid-color) 30%, transparent) 1px,
            transparent 1px
          );
          background-size: 100% 3px;
          opacity: 0.18;
          transform: translateY(0);
          animation: ambientScan 9s linear infinite;
        }

        .ambient-stars {
          position: absolute;
          inset: 0;
        }

        .ambient-star {
          position: absolute;
          width: var(--star-size, 2px);
          height: var(--star-size, 2px);
          border-radius: 999px;
          background: color-mix(in srgb, #ffffff 86%, var(--music-accent));
          box-shadow: 0 0 8px color-mix(in srgb, var(--music-accent) 40%, transparent);
          opacity: 0.2;
          animation-name: ambientStarTwinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .ambient-tokens {
          position: absolute;
          inset: 0;
        }

        .ambient-token {
          position: absolute;
          padding: 6px 9px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--accent-border) 72%, transparent);
          background: color-mix(in srgb, var(--card-bg) 90%, transparent);
          color: color-mix(in srgb, var(--text-color) 86%, white);
          font-family: "Inconsolata", "Fira Code", ui-monospace, monospace;
          font-size: 0.8rem;
          letter-spacing: 0.3px;
          box-shadow: 0 10px 22px color-mix(in srgb, var(--shadow-color) 42%, transparent);
          opacity: 0.88;
          animation-name: ambientTokenDrift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .ambient-theme-peach .ambient-token {
          transform-origin: center;
          border-color: color-mix(in srgb, var(--accent-color) 32%, white);
        }

        .ambient-theme-mint .ambient-token {
          border-style: dashed;
          opacity: 0.9;
        }

        .main-container {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 1600px;
          height: 900px;
          display: flex;
          gap: 0;
          z-index: 10;
          transition: opacity 0.35s ease, filter 0.35s ease;
        }

        .main-container-preintro {
          opacity: 0;
          filter: blur(2px);
          pointer-events: none;
        }

        .intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 480;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at 18% 14%, color-mix(in srgb, var(--accent-color) 34%, transparent) 0%, transparent 43%),
            radial-gradient(circle at 82% 84%, color-mix(in srgb, var(--music-accent) 38%, transparent) 0%, transparent 45%),
            linear-gradient(125deg, color-mix(in srgb, var(--bg-color) 88%, #ffffff) 0%, color-mix(in srgb, var(--card-bg) 75%, #ffffff) 100%);
          backdrop-filter: blur(10px) saturate(1.06);
          opacity: 1;
          transition: opacity 0.35s ease;
          overflow: hidden;
        }

        .intro-overlay::before,
        .intro-overlay::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          filter: blur(2px);
          opacity: 0.72;
        }

        .intro-overlay::before {
          width: 42vmax;
          height: 42vmax;
          left: -12vmax;
          top: -10vmax;
          background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--accent-color) 42%, transparent), transparent 62%);
          animation: introBlobDrift 8.5s ease-in-out infinite;
        }

        .intro-overlay::after {
          width: 38vmax;
          height: 38vmax;
          right: -10vmax;
          bottom: -8vmax;
          background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--music-accent) 48%, transparent), transparent 64%);
          animation: introBlobDrift 9.5s ease-in-out infinite reverse;
        }

        .intro-overlay.intro-theme-lilac .intro-orbit-1 {
          animation-duration: 5.8s;
        }

        .intro-overlay.intro-theme-lilac .intro-orbit-2 {
          animation-duration: 8.2s;
        }

        .intro-overlay.intro-theme-lilac .intro-loader span {
          animation-duration: 1.5s;
        }

        .intro-overlay.intro-theme-peach .intro-orbit-1 {
          animation-duration: 4.1s;
          border-color: color-mix(in srgb, var(--accent-color) 62%, white);
        }

        .intro-overlay.intro-theme-peach .intro-orbit-2 {
          animation-duration: 6.2s;
          opacity: 0.86;
        }

        .intro-overlay.intro-theme-peach .intro-loader span {
          animation-duration: 1.12s;
        }

        .intro-overlay.intro-theme-mint .intro-orbit-1 {
          animation-duration: 6.8s;
          border-color: color-mix(in srgb, var(--accent-color) 50%, white);
        }

        .intro-overlay.intro-theme-mint .intro-orbit-2 {
          animation-duration: 9.4s;
          opacity: 0.66;
        }

        .intro-overlay.intro-theme-mint .intro-core {
          animation-duration: 2.1s;
        }

        .intro-overlay.intro-theme-mint .intro-loader span {
          animation-duration: 1.85s;
        }

        .intro-overlay-exit {
          opacity: 0;
          pointer-events: none;
        }

        .intro-card {
          width: min(620px, 90vw);
          border: 1px solid color-mix(in srgb, var(--accent-border) 82%, white);
          border-radius: 22px;
          background: linear-gradient(160deg, color-mix(in srgb, var(--card-bg) 91%, #ffffff) 0%, color-mix(in srgb, var(--card-bg) 97%, var(--accent-soft)) 100%);
          box-shadow:
            0 28px 64px color-mix(in srgb, var(--shadow-color) 70%, transparent),
            inset 0 1px 0 color-mix(in srgb, #ffffff 68%, transparent);
          padding: 32px 34px;
          display: grid;
          gap: 14px;
          animation: introRise 0.55s ease forwards;
          position: relative;
          overflow: hidden;
        }

        .intro-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 35%, color-mix(in srgb, #ffffff 35%, transparent) 50%, transparent 65%);
          transform: translateX(-100%);
          animation: introCardSweep 2.8s ease-in-out infinite;
          pointer-events: none;
        }

        .intro-kicker {
          font-size: 0.68em;
          text-transform: uppercase;
          letter-spacing: 1.1px;
          color: color-mix(in srgb, var(--muted-color) 85%, var(--accent-color));
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--accent-border) 82%, transparent);
          background: color-mix(in srgb, var(--accent-soft) 74%, transparent);
          width: fit-content;
        }

        .intro-name {
          font-size: clamp(1.72rem, 3.35vw, 2.55rem);
          letter-spacing: 0.5px;
          line-height: 1.15;
          color: color-mix(in srgb, var(--text-color) 80%, white);
          text-wrap: balance;
        }

        .intro-tagline {
          font-size: 0.93em;
          max-width: 52ch;
          color: color-mix(in srgb, var(--muted-color) 85%, var(--text-color));
          line-height: 1.6;
          margin-bottom: 2px;
        }

        .intro-scene {
          position: relative;
          height: 76px;
          border-radius: 16px;
          border: 1px solid color-mix(in srgb, var(--accent-border) 72%, transparent);
          background:
            radial-gradient(circle at center, color-mix(in srgb, var(--accent-soft) 70%, transparent) 0%, transparent 72%),
            linear-gradient(120deg, color-mix(in srgb, var(--accent-soft) 45%, transparent) 0%, color-mix(in srgb, var(--music-accent) 24%, transparent) 100%);
          overflow: hidden;
          display: grid;
          place-items: center;
        }

        .intro-core {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: var(--accent-color);
          box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent-color) 26%, transparent);
          animation: introCorePulse 1.7s ease-out infinite;
          position: relative;
          z-index: 2;
        }

        .intro-orbit {
          position: absolute;
          border: 1px solid color-mix(in srgb, var(--accent-border) 90%, transparent);
          border-radius: 999px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .intro-orbit-1 {
          width: 54px;
          height: 54px;
          animation: introSpin 4.8s linear infinite;
        }

        .intro-orbit-2 {
          width: 82px;
          height: 82px;
          border-style: dashed;
          opacity: 0.72;
          animation: introSpin 7s linear infinite reverse;
        }

        .intro-pill-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .intro-pill {
          font-size: 0.69em;
          letter-spacing: 0.35px;
          text-transform: uppercase;
          font-weight: 700;
          color: color-mix(in srgb, var(--text-color) 82%, white);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--accent-border) 74%, transparent);
          background: color-mix(in srgb, var(--accent-soft) 62%, var(--card-bg));
        }

        .intro-loader {
          margin-top: 2px;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }

        .intro-loader span {
          display: block;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--accent-color), var(--music-accent));
          transform-origin: left center;
          animation: introLoadSegment 1.4s ease-in-out infinite;
        }

        .intro-loader span:nth-child(2) {
          animation-delay: 0.18s;
        }

        .intro-loader span:nth-child(3) {
          animation-delay: 0.36s;
        }

        .intro-loader-label {
          font-size: 0.76em;
          color: color-mix(in srgb, var(--muted-color) 88%, var(--text-color));
          letter-spacing: 0.3px;
        }

        .intro-skip {
          justify-self: start;
          border: 1px solid var(--accent-border);
          background: color-mix(in srgb, var(--accent-soft) 70%, var(--card-bg));
          color: var(--text-color);
          border-radius: 999px;
          padding: 8px 15px;
          font-size: 0.78em;
          font-weight: 700;
          cursor: pointer;
          margin-top: 4px;
          transition: transform 0.24s ease, box-shadow 0.24s ease, background 0.24s ease;
        }

        .intro-skip:hover {
          transform: translateY(-1px);
          background: color-mix(in srgb, var(--accent-soft) 86%, var(--card-bg));
          box-shadow: 0 10px 20px color-mix(in srgb, var(--shadow-color) 45%, transparent);
        }

        @keyframes introRise {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes introLoadSegment {
          0%,
          100% {
            transform: scaleX(0.28);
            opacity: 0.5;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes introSpin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes introCorePulse {
          0% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent-color) 28%, transparent);
          }
          70% {
            box-shadow: 0 0 0 12px color-mix(in srgb, var(--accent-color) 0%, transparent);
          }
          100% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent-color) 0%, transparent);
          }
        }

        @keyframes introBlobDrift {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(12px, -14px) scale(1.06);
          }
        }

        @keyframes introCardSweep {
          0%,
          62% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(130%);
          }
        }

        @keyframes ambientBlobFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(14px, -18px, 0) scale(1.06);
          }
        }

        @keyframes ambientTokenDrift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            opacity: 0.62;
          }
          50% {
            transform: translate3d(var(--drift-x, 0px), var(--drift-y, -12px), 0) rotate(var(--token-rotate, -2deg)) scale(1.04);
            opacity: 1;
          }
        }

        @keyframes ambientScan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(18px);
          }
        }

        @keyframes ambientStarTwinkle {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(0.7);
            opacity: 0.18;
          }
          50% {
            transform: translate3d(var(--star-drift-x, 0px), var(--star-drift-y, 0px), 0) scale(1.25);
            opacity: 0.95;
          }
        }

        .topbar {
          position: absolute;
          top: 0;
          left: 20px;
          right: 20px;
          height: 50px;
          background: var(--topbar-bg);
          backdrop-filter: blur(4px);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          z-index: 50;
          box-shadow: 0px 10px 24px var(--shadow-color);
        }

        .scroll-progress-track {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          z-index: 320;
          background: color-mix(in srgb, var(--border-color) 35%, transparent);
        }

        .scroll-progress-fill {
          height: 100%;
          width: 100%;
          transform-origin: left center;
          transform: scaleX(0);
          background: linear-gradient(90deg, var(--accent-color), var(--music-accent));
          box-shadow: 0 0 12px color-mix(in srgb, var(--accent-color) 45%, transparent);
          transition: transform 0.14s linear;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
          min-width: 0;
        }

        .topbar-dots {
          width: 10px;
          height: 10px;
          border-radius: 10px;
          background: var(--dot-main);
          box-shadow: 15px 0px 0px var(--dot-shadow-1), 30px 0px 0px var(--dot-shadow-2);
        }

        .topbar-icons {
          display: flex;
          gap: 8px;
        }

        .topbar-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 7px;
          transition: color 0.2s, transform 0.2s;
          font-size: 18px;
          font-weight: 700;
          color: var(--accent-color);
        }

        .topbar-icon:hover {
          background: transparent;
          transform: translateY(-1px);
        }

        .topbar-nav-btn {
          border: none;
          background: transparent;
          box-shadow: none;
        }

        .topbar-nav-btn:hover {
          background: transparent;
        }

        .topbar-nav-icon {
          width: 19px;
          height: 19px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .topbar-social-link {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: inherit;
        }

        .topbar-social-icon {
          width: 19px;
          height: 19px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .topbar-title {
          position: relative;
          flex: 1;
          width: 100%;
          height: 38px;
          padding: 0 10px;
          background: var(--card-bg);
          border: 2px solid transparent;
          border-radius: 14px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 8px;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 14px;
          color: var(--text-color);
          box-shadow: inset 0px 0px 0px 1px var(--border-color), 0px 6px 12px var(--shadow-color);
        }

        .topbar-title-leading {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding-left: 2px;
        }

        .topbar-title-trailing {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding-right: 2px;
        }

        .topbar-title-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: color-mix(in srgb, var(--accent-color) 82%, var(--text-color));
        }

        .topbar-title-icon {
          width: 15px;
          height: 15px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .topbar-title-icon-fill {
          fill: currentColor;
          stroke: none;
        }

        .topbar-title span {
          text-align: center;
          font-family: "Trebuchet MS", "Segoe UI", sans-serif;
          color: color-mix(in srgb, var(--text-color) 56%, white);
          font-weight: 580;
          font-size: 15px;
          letter-spacing: 0.35px;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .viewer-badge {
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 0.76em;
          border: 1px solid var(--accent-border);
          background: var(--accent-soft);
          color: var(--text-color);
          white-space: nowrap;
        }

        .main-content {
          position: absolute;
          top: 45px;
          left: 0;
          width: 100%;
          height: calc(100% - 43px);
          background: var(--content-bg);
          backdrop-filter: blur(1.5px);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          display: flex;
          z-index: 10;
          box-shadow: 0px 10px 24px var(--shadow-color);
        }

        .main-content.quick-mode .sidebar-left,
        .main-content.quick-mode .sidebar-right {
          display: none;
        }

        .main-content.quick-mode .content-area {
          padding: 30px 34px;
        }

        .sidebar-left {
          width: 240px;
          height: 100%;
          background: var(--surface-bg);
          backdrop-filter: blur(3px);
          border-right: 1px solid var(--border-color);
          box-shadow: inset -1px 0 0 color-mix(in srgb, var(--border-color) 75%, white);
          border-radius: 12px 0 0 12px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .profile-section {
          padding: 20px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .profile-icon {
          width: 60px;
          height: 60px;
          border-radius: 80px;
          background: url('/profile_image/profile-img.jfif');
          background-size: cover;
          background-position: center;
          border: 2px solid var(--border-color);
          box-shadow: 0px 6px 14px var(--shadow-color);
        }

        .profile-name {
          font-size: 1.2em;
          font-weight: 700;
          color: var(--text-color);
        }

        .profile-info {
          font-size: 0.9em;
          color: var(--muted-color);
        }
        .profile-role {
          font-size: 0.85em;
          color: var(--profile-role-color);
          font-weight: 600;
        }

        .about-copy {
          color: var(--about-text-color);
        }

        .status-copy {
          color: var(--about-text-color);
        }

        .sidebar-links {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 10px;
        }

        .sidebar-link {
          padding: 10px;
          border-radius: 10px;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background 0.2s, transform 0.2s, border-color 0.2s;
          font-size: 0.95em;
        }

        .sidebar-link-icon {
          width: 18px;
          height: 18px;
          min-width: 18px;
          color: var(--accent-color);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-link-icon-svg {
          width: 18px;
          height: 18px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.85;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .sidebar-link:hover {
          background: var(--accent-soft);
          border-color: var(--accent-border);
          transform: translateX(2px);
        }

        .sidebar-link-active {
          background: var(--accent-soft);
          border-color: var(--accent-border);
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent-border) 55%, transparent);
        }

        .content-area {
          flex: 1;
          padding: 50px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .utility-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .availability-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .availability-chip {
          border: 1px solid var(--accent-border);
          background: var(--card-bg);
          color: var(--text-color);
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 0.76em;
          font-weight: 700;
        }

        .availability-chip-highlight {
          background: var(--accent-soft);
          color: var(--accent-color);
        }

        .recruiter-badge {
          border: 1px solid var(--accent-border);
          background: linear-gradient(120deg, var(--accent-soft), color-mix(in srgb, var(--music-accent) 16%, transparent));
          color: var(--accent-color);
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 0.75em;
          font-weight: 800;
        }

        .utility-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .utility-btn {
          border: 1px solid var(--accent-border);
          background: var(--card-bg);
          color: var(--text-color);
          border-radius: 999px;
          padding: 7px 12px;
          font-size: 0.76em;
          font-weight: 700;
          cursor: pointer;
        }

        .utility-btn:hover {
          background: var(--accent-soft);
        }

        .kbd-pill {
          font-family: "Inconsolata", monospace;
          font-size: 0.78em;
          border: 1px solid var(--accent-border);
          border-radius: 8px;
          padding: 2px 6px;
          background: var(--input-bg);
          color: var(--text-color);
        }

        .theme-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .theme-chip {
          border: 1px solid var(--accent-border);
          background: var(--card-bg);
          color: var(--text-color);
          border-radius: 999px;
          padding: 7px 12px;
          font-size: 0.78em;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .theme-chip:hover {
          transform: translateY(-1px);
          background: var(--accent-soft);
        }

        .theme-chip-active {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: var(--text-inverse);
        }

        .section {
          background: var(--panel-bg);
          padding: 30px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          box-shadow: 0px 10px 20px var(--shadow-color);
        }

        .recruiter-summary {
          background: linear-gradient(
            130deg,
            color-mix(in srgb, var(--panel-bg) 90%, white),
            color-mix(in srgb, var(--accent-soft) 30%, white)
          );
        }

        .recruiter-summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
          margin-top: 8px;
        }

        .recruiter-summary-card {
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 12px;
          background: color-mix(in srgb, var(--panel-bg) 95%, white);
        }

        .recruiter-summary-card h3 {
          font-size: 0.86em;
          text-transform: uppercase;
          letter-spacing: 0.35px;
          color: color-mix(in srgb, var(--text-color) 88%, var(--accent-color));
          margin-bottom: 6px;
        }

        .recruiter-summary-card p {
          color: var(--text-color);
          font-size: 0.84em;
          line-height: 1.55;
        }

        .reveal-item {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .reveal-item.reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-delay-1 { transition-delay: 0.08s; }
        .reveal-delay-2 { transition-delay: 0.16s; }
        .reveal-delay-3 { transition-delay: 0.24s; }
        .reveal-delay-4 { transition-delay: 0.32s; }
        .reveal-delay-5 { transition-delay: 0.4s; }

        .section-title {
          font-size: 1.4em;
          font-weight: 700;
          color: var(--accent-color);
          margin-bottom: 15px;
          text-shadow: 0px 0px 8px color-mix(in srgb, var(--accent-color) 25%, transparent);
        }

        .section-subtitle {
          font-size: 0.9em;
          color: var(--muted-color);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        .typing-line {
          margin-bottom: 16px;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px dashed var(--accent-border);
          background: var(--accent-soft);
          color: var(--text-color);
          font-size: 0.92em;
          min-height: 40px;
        }


        .typing-caret {
          display: inline-block;
          margin-left: 2px;
          animation: blink 0.9s infinite;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        .timeline {
          position: relative;
          padding-left: 14px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 100%;
          border-radius: 2px;
          background: color-mix(in srgb, var(--accent-border) 75%, transparent);
        }

        .timeline::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: var(--timeline-progress, 0%);
          border-radius: 2px;
          background: linear-gradient(180deg, var(--accent-color), var(--music-accent));
          box-shadow: 0 0 10px color-mix(in srgb, var(--accent-color) 35%, transparent);
          transition: height 0.2s ease;
        }

        .timeline-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }

        .timeline-filter-btn {
          border: 1px solid var(--accent-border);
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 0.76em;
          font-weight: 700;
          color: var(--text-color);
          background: var(--card-bg);
          cursor: pointer;
          text-transform: capitalize;
        }

        .timeline-filter-btn-active {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: var(--text-inverse);
        }

        .timeline-item {
          position: relative;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 12px 14px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.45s ease, transform 0.45s ease, box-shadow 0.3s ease;
        }

        .timeline-item-visible {
          opacity: 1;
          transform: translateY(0px);
          box-shadow: 0px 10px 20px var(--shadow-color);
        }

        .timeline-item-visible:hover {
          border-color: var(--accent-border);
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent-border) 65%, transparent), 0px 12px 24px var(--shadow-color);
          transform: translateY(-2px);
        }

        .timeline-item::before {
          content: "";
          position: absolute;
          left: -23px;
          top: 14px;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--accent-color);
          box-shadow: 0 0 0 4px var(--accent-soft);
        }

        .timeline-story-layout {
          padding-left: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 12px;
        }

        .timeline-story-layout::before,
        .timeline-story-layout::after {
          display: none;
        }

        .timeline-story-layout .timeline-item::before {
          left: 12px;
          top: -8px;
        }

        .timeline-year {
          font-size: 0.78em;
          font-weight: 700;
          color: var(--accent-color);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .timeline-title {
          font-size: 0.95em;
          font-weight: 700;
          color: var(--text-color);
        }

        .timeline-subtitle {
          font-size: 0.82em;
          color: var(--muted-color);
          margin-top: 2px;
        }

        .timeline-detail {
          font-size: 0.85em;
          color: var(--text-color);
          margin-top: 8px;
          line-height: 1.5;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .currently-building-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }

        .currently-building-card {
          border: 1px solid var(--border-color);
          border-radius: 12px;
          background: color-mix(in srgb, var(--card-bg) 94%, white);
          padding: 12px;
          display: grid;
          gap: 8px;
          box-shadow: 0 6px 14px color-mix(in srgb, var(--shadow-color) 35%, transparent);
        }

        .currently-building-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .currently-building-status,
        .currently-building-target {
          font-size: 0.72em;
          font-weight: 700;
          border-radius: 999px;
          padding: 4px 8px;
          border: 1px solid var(--accent-border);
        }

        .currently-building-status {
          color: var(--accent-color);
          background: var(--accent-soft);
        }

        .currently-building-target {
          color: var(--text-color);
          background: color-mix(in srgb, var(--card-bg) 92%, white);
        }

        .currently-building-card h3 {
          font-size: 0.94em;
          color: var(--text-color);
        }

        .currently-building-card p {
          font-size: 0.84em;
          color: var(--muted-color);
          line-height: 1.55;
        }

        .project-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 20px;
          transform: perspective(800px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
          transition: transform 0.18s ease, box-shadow 0.2s ease;
          will-change: transform;
        }

        .project-card-favorited {
          border-color: var(--accent-border);
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent-border) 60%, transparent);
        }

        .project-card-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .project-favorite-btn {
          border: 1px solid var(--accent-border);
          background: var(--card-bg);
          color: var(--muted-color);
          border-radius: 999px;
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95em;
          cursor: pointer;
          flex-shrink: 0;
        }

        .project-favorite-btn-active {
          color: var(--accent-color);
          background: var(--accent-soft);
          border-color: var(--accent-border);
        }

        .project-card:hover {
          box-shadow: 0px 14px 26px var(--shadow-color);
        }

        .project-actions {
          margin-top: 12px;
          display: flex;
          justify-content: flex-end;
        }

        .project-btn {
          border: 1px solid var(--accent-border);
          background: var(--accent-soft);
          color: var(--accent-color);
          border-radius: 999px;
          padding: 7px 12px;
          font-weight: 700;
          font-size: 0.8em;
          cursor: pointer;
        }

        .project-title {
          font-size: 1.3em;
          font-weight: 700;
          color: var(--text-color);
          margin-bottom: 8px;
        }

        .project-category {
          font-size: 0.85em;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin-bottom: 12px;
        }

        .project-summary {
          font-size: 0.95em;
          line-height: 1.6;
          color: var(--text-color);
          margin-bottom: 15px;
        }

        .project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .stack-tag {
          font-size: 0.8em;
          padding: 4px 10px;
          background: var(--accent-soft);
          border: 1px solid var(--accent-border);
          border-radius: 15px;
          color: var(--accent-color);
        }

        .project-score-grid {
          margin-top: 10px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
        }

        .projects-empty {
          margin-top: 10px;
          border: 1px dashed var(--accent-border);
          border-radius: 10px;
          background: color-mix(in srgb, var(--accent-soft) 55%, var(--card-bg));
          padding: 12px;
          color: var(--muted-color);
          font-size: 0.86em;
        }

        .score-chip {
          border: 1px solid var(--accent-border);
          border-radius: 8px;
          background: color-mix(in srgb, var(--accent-soft) 75%, var(--card-bg));
          color: var(--text-color);
          font-size: 0.72em;
          padding: 5px 7px;
          display: flex;
          justify-content: space-between;
          gap: 6px;
        }

        .sidebar-right {
          width: 255px;
          height: 100%;
          background: var(--surface-bg);
          backdrop-filter: blur(3px);
          border-left: 1px solid var(--border-color);
          box-shadow: inset 1px 0 0 color-mix(in srgb, var(--border-color) 75%, white);
          border-radius: 0 12px 12px 0;
          display: flex;
          flex-direction: column;
          padding: 20px;
          gap: 20px;
          overflow-y: auto;
        }

        .stats-box,
        .skills-showcase {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 15px;
          box-shadow: inset 0px 0px 8px color-mix(in srgb, var(--shadow-color) 35%, transparent);
        }

        .stat-item {
          margin-bottom: 12px;
        }

        .stat-label,
        .skill-category-name {
          font-weight: 700;
          color: var(--accent-color);
          font-size: 0.9em;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .stat-label {
          font-size: 1.1em;
          font-family: "Inconsolata", monospace;
          text-transform: none;
        }

        .stat-value,
        .skill-items {
          font-size: 0.85em;
          color: var(--text-color);
          line-height: 1.5;
          margin-top: 4px;
        }

        .skills-map-tabs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        .skills-map-tab {
          border: 1px solid var(--accent-border);
          border-radius: 999px;
          padding: 4px 9px;
          font-size: 0.72em;
          font-weight: 700;
          text-transform: capitalize;
          background: var(--card-bg);
          color: var(--text-color);
          cursor: pointer;
        }

        .skills-map-tab-active {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: var(--text-inverse);
        }

        .skills-map-grid {
          display: grid;
          gap: 10px;
        }

        .skills-map-row {
          display: grid;
          gap: 4px;
        }

        .skills-map-label {
          font-size: 0.76em;
          color: var(--muted-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .skills-map-track {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--border-color) 68%, white);
          overflow: hidden;
        }

        .skills-map-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--accent-color), var(--music-accent));
          transition: width 0.35s ease;
        }

        .performance-pill {
          margin-top: 10px;
          border: 1px solid var(--accent-border);
          border-radius: 10px;
          padding: 8px 10px;
          background: var(--accent-soft);
          color: var(--text-color);
          font-size: 0.82em;
          font-weight: 700;
          text-align: center;
        }

        .proof-link {
          font-size: 0.72em;
          color: var(--accent-color);
          text-decoration: underline;
          text-decoration-color: color-mix(in srgb, var(--accent-color) 45%, transparent);
          text-underline-offset: 2px;
        }

        .live-now-box {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 12px;
        }

        .live-time {
          font-family: "Inconsolata", monospace;
          font-size: 1.05em;
          color: var(--text-color);
          margin-top: 4px;
        }

        .testimonials-strip {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 12px;
        }

        .testimonial-card {
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 12px;
          background: var(--card-bg);
        }

        .testimonial-quote {
          color: var(--text-color);
          font-size: 0.86em;
          line-height: 1.6;
        }

        .testimonial-byline {
          color: var(--muted-color);
          font-size: 0.75em;
          margin-top: 8px;
        }

        .tech-map-grid {
          margin-top: 10px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }

        .tech-map-card {
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 10px;
          background: var(--card-bg);
        }

        .tech-map-title {
          color: var(--accent-color);
          font-weight: 700;
          font-size: 0.82em;
          text-transform: capitalize;
          margin-bottom: 8px;
        }

        .tech-map-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .contact-prompt {
          margin-top: 10px;
          font-size: 0.83em;
          color: var(--muted-color);
        }

        ::-webkit-scrollbar {
          width: 6px;
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--accent-color);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-track {
          background: color-mix(in srgb, var(--border-color) 65%, transparent);
          border-radius: 3px;
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: var(--accent-color) color-mix(in srgb, var(--border-color) 65%, transparent);
        }

        ::selection {
          background: color-mix(in srgb, var(--accent-color) 35%, transparent);
          color: var(--text-color);
        }

        ::-moz-selection {
          background: color-mix(in srgb, var(--accent-color) 35%, transparent);
          color: var(--text-color);
        }

        .chat-widget {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 150;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .chat-toggle {
          width: 56px;
          height: 56px;
          border: 1px solid var(--border-color);
          border-radius: 999px;
          background: linear-gradient(145deg, color-mix(in srgb, var(--accent-color) 55%, white) 0%, var(--accent-color) 100%);
          color: #ffffff;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0 12px 24px var(--shadow-color);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .chat-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px var(--shadow-color);
        }

        .chat-panel {
          width: 320px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: 0 20px 30px var(--shadow-color);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .chat-panel-title {
          color: var(--text-color);
          font-weight: 700;
          font-size: 0.95em;
        }

        .chat-panel-subtitle {
          color: var(--muted-color);
          font-size: 0.82em;
        }

        .chat-input,
        .chat-textarea {
          width: 100%;
          border: 1px solid var(--border-color);
          background: var(--input-bg);
          color: var(--text-color);
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 0.9em;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .chat-input:focus,
        .chat-textarea:focus {
          border-color: var(--accent-color);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 20%, transparent);
        }

        .chat-textarea {
          min-height: 88px;
          resize: vertical;
        }

        .chat-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .chat-btn {
          border: 1px solid var(--accent-border);
          border-radius: 10px;
          padding: 8px 12px;
          font-weight: 600;
          font-size: 0.85em;
          cursor: pointer;
        }

        .chat-btn-cancel {
          background: color-mix(in srgb, var(--accent-soft) 80%, white);
          color: var(--text-color);
        }

        .chat-btn-send {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: var(--text-inverse);
        }

        .contact-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .contact-btn,
        .cv-btn {
          padding: 10px 20px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: transform 0.25s ease, border-radius 0.25s ease, box-shadow 0.25s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .contact-btn-primary {
          background: var(--accent-color);
          color: var(--text-inverse);
        }

        .contact-btn-secondary {
          background: var(--accent-soft);
          border: 1px solid var(--accent-color);
          color: var(--accent-color);
        }

        .cv-btn {
          border: 1px solid var(--accent-border);
          background: var(--card-bg);
          color: var(--text-color);
        }

        .cv-btn:hover {
          transform: translateY(-2px) scale(1.02);
          border-radius: 18px;
          box-shadow: 0 10px 18px var(--shadow-color);
          letter-spacing: 0.2px;
        }

        .contact-toast {
          position: fixed;
          left: 50%;
          bottom: 24px;
          transform: translateX(-50%) translateY(18px);
          opacity: 0;
          pointer-events: none;
          z-index: 210;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          padding: 10px 14px;
          border-radius: 999px;
          box-shadow: 0 10px 20px var(--shadow-color);
          transition: opacity 0.25s ease, transform 0.25s ease;
          font-size: 0.82em;
          font-weight: 600;
        }

        .contact-toast-show {
          opacity: 1;
          transform: translateX(-50%) translateY(0px);
        }

        .command-overlay,
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: var(--overlay-bg);
          backdrop-filter: blur(3px);
          z-index: 280;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
        }

        .project-modal {
          opacity: 0;
          animation: modalOverlayIn 0.2s ease forwards;
        }

        .project-modal.modal-overlay-closing {
          animation: modalOverlayOut 0.18s ease forwards;
        }

        .command-panel {
          width: min(640px, 92vw);
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: 0 22px 38px var(--shadow-color);
          overflow: hidden;
        }

        .command-input {
          width: 100%;
          border: none;
          border-bottom: 1px solid var(--border-color);
          padding: 14px;
          font-size: 0.95em;
          background: var(--input-bg);
          color: var(--text-color);
          outline: none;
        }

        .command-list {
          list-style: none;
          margin: 0;
          padding: 8px;
          max-height: 300px;
          overflow: auto;
        }

        .command-item {
          width: 100%;
          border: 1px solid transparent;
          background: transparent;
          border-radius: 10px;
          padding: 10px 12px;
          color: var(--text-color);
          text-align: left;
          cursor: pointer;
          font-weight: 600;
        }

        .command-item:hover {
          border-color: var(--accent-border);
          background: var(--accent-soft);
        }

        .command-item-active {
          border-color: var(--accent-border);
          background: var(--accent-soft);
        }

        .modal-card {
          width: min(760px, 94vw);
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: 0 22px 38px var(--shadow-color);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .project-modal .modal-card {
          opacity: 0;
          transform: translateY(10px) scale(0.98);
          animation: modalCardIn 0.22s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .project-modal.modal-overlay-closing .modal-card {
          animation: modalCardOut 0.18s ease forwards;
        }

        @keyframes modalOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalOverlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes modalCardIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes modalCardOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(8px) scale(0.985);
          }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .modal-close {
          border: 1px solid var(--border-color);
          background: var(--input-bg);
          color: var(--text-color);
          border-radius: 999px;
          padding: 5px 10px;
          font-size: 0.8em;
          cursor: pointer;
        }

        .modal-highlights {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 8px;
        }

        .modal-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 6px 0 2px;
        }

        .modal-tab {
          border: 1px solid var(--accent-border);
          background: color-mix(in srgb, var(--card-bg) 95%, white);
          color: var(--text-color);
          border-radius: 999px;
          padding: 5px 10px;
          font-size: 0.73em;
          font-weight: 700;
          text-transform: capitalize;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .modal-tab:hover {
          background: var(--accent-soft);
        }

        .modal-tab-active {
          background: var(--accent-soft);
          color: var(--accent-color);
          border-color: var(--accent-border);
        }

        .modal-tab-panel {
          margin-top: 2px;
        }

        .reduce-motion *,
        .reduce-motion *::before,
        .reduce-motion *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }

        .reduce-motion .ambient-blob {
          animation: ambientBlobFloat 20s ease-in-out infinite !important;
        }

        .reduce-motion .ambient-noise {
          animation: ambientScan 16s linear infinite !important;
        }

        .reduce-motion .ambient-token {
          animation-name: ambientTokenDrift !important;
          animation-duration: 20s !important;
          animation-timing-function: ease-in-out !important;
          animation-iteration-count: infinite !important;
        }

        .reduce-motion .ambient-star {
          animation-name: ambientStarTwinkle !important;
          animation-duration: 14s !important;
          animation-timing-function: ease-in-out !important;
          animation-iteration-count: infinite !important;
        }

        .side-player-shell {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translate(254px, -50%);
          z-index: 240;
          transition: transform 0.34s ease;
        }

        .side-player-shell:hover {
          transform: translate(0, -50%);
        }

        .side-player-panel {
          width: 300px;
          background: color-mix(in srgb, var(--panel-bg) 95%, white);
          border: 1px solid var(--accent-border);
          border-right: none;
          border-radius: 14px 0 0 14px;
          box-shadow: 0 16px 28px var(--shadow-color);
          padding: 14px;
          position: relative;
        }

        .side-player-panel::before {
          content: "♪";
          position: absolute;
          left: -46px;
          top: 16px;
          width: 46px;
          height: 46px;
          border-radius: 12px 0 0 12px;
          background: linear-gradient(150deg, var(--music-accent) 0%, var(--accent-color) 100%);
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 20px var(--shadow-color);
        }

        .side-player-title {
          color: var(--accent-color);
          font-size: 0.8em;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .side-player-controls {
          display: flex;
          gap: 8px;
        }

        .side-player-btn {
          border: 1px solid var(--border-color);
          background: var(--card-bg);
          color: var(--text-color);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 0.8em;
          font-weight: 600;
          cursor: pointer;
        }

        .side-player-btn:hover {
          background: var(--accent-soft);
        }

        .side-player-audio {
          display: none;
        }

        @media (max-width: 1200px) {
          .main-container {
            width: 96vw;
          }

          .sidebar-right {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .main-container {
            height: calc(100vh - 24px);
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
          }

          .sidebar-left {
            display: none;
          }

          .content-area {
            padding: 24px;
          }

          .chat-widget {
            right: 14px;
            bottom: 14px;
          }

          .chat-panel {
            width: min(92vw, 330px);
          }

          .side-player-shell {
            transform: translate(224px, -50%);
          }

          .side-player-panel {
            width: 270px;
          }

          .intro-card {
            padding: 22px 20px;
          }
        }

        h1,
        h2,
        h3 {
          margin: 0;
        }

        p {
          margin: 0;
          line-height: 1.6;
        }

      `}</style>

      {isIntroVisible ? (
        <div className={`intro-overlay intro-theme-${themeKey} ${isIntroExiting ? "intro-overlay-exit" : ""}`} aria-live="polite">
          <div className="intro-card">
            <p className="intro-kicker">{introCopy.kicker}</p>
            <h1 className="intro-name">Julie Anne Cantillep</h1>
            <p className="intro-tagline">{introCopy.tagline}</p>
            <div className="intro-scene" aria-hidden="true">
              <div className="intro-orbit intro-orbit-1"></div>
              <div className="intro-orbit intro-orbit-2"></div>
              <div className="intro-core"></div>
            </div>
            <div className="intro-pill-row" aria-hidden="true">
              {introCopy.pills.map((pill) => (
                <span key={pill} className="intro-pill">
                  {pill}
                </span>
              ))}
            </div>
            <div className="intro-loader" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="intro-loader-label">{introCopy.loaderLabel}</p>
            <button type="button" className="intro-skip" onClick={dismissIntro}>
              Enter Portfolio
            </button>
          </div>
        </div>
      ) : null}

      <div className="scroll-progress-track" aria-hidden="true">
        <div
          className="scroll-progress-fill"
          style={{ transform: `scaleX(${Math.min(100, Math.max(0, scrollProgress)) / 100})` }}
        ></div>
      </div>

      <div className={`ambient-backdrop ambient-theme-${themeKey}`} aria-hidden="true">
        <div className="ambient-blob ambient-blob-a"></div>
        <div className="ambient-blob ambient-blob-b"></div>
        <div className="ambient-blob ambient-blob-c"></div>
        <div className="ambient-noise"></div>
        <div className="ambient-tokens">
          {ambientTokens.map((token) => (
            <span
              key={`${token.label}-${token.top}-${token.left}`}
              className="ambient-token"
              style={{
                top: token.top,
                left: token.left,
                animationDelay: token.delay,
                animationDuration: token.duration,
                ["--drift-x" as string]: token.driftX,
                ["--drift-y" as string]: token.driftY,
                ["--token-rotate" as string]: token.rotate,
              }}
            >
              {token.label}
            </span>
          ))}
        </div>
      </div>

      <div className={`main-container ${isIntroVisible ? "main-container-preintro" : ""}`}>
        <div className="topbar">
          <div className="topbar-left">
            <div className="topbar-dots"></div>
            <div className="topbar-icons">
              <div className="topbar-icon topbar-nav-btn" title="back">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="topbar-nav-icon">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </div>
              <div className="topbar-icon topbar-nav-btn" title="forward">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="topbar-nav-icon">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </div>
              <div className="topbar-icon topbar-nav-btn" title="refresh">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="topbar-nav-icon">
                  <path d="M20 11a8 8 0 1 0-2.35 5.65" />
                  <path d="M20 4v7h-7" />
                </svg>
              </div>
            </div>
            <div className="topbar-title">
              <div className="topbar-title-leading" aria-hidden="true">
                <span className="topbar-title-badge" title="Connection secure">
                  <svg viewBox="0 0 24 24" className="topbar-title-icon">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                  </svg>
                </span>
                <span className="topbar-title-badge" title="Protection enabled">
                  <svg viewBox="0 0 24 24" className="topbar-title-icon">
                    <path d="M12 3l7 3v6c0 5-3.4 8.2-7 9c-3.6-.8-7-4-7-9V6l7-3z" />
                  </svg>
                </span>
              </div>
              <span>Julie Anne Cantillep</span>
              <div className="topbar-title-trailing" aria-hidden="true">
                <span className="topbar-title-badge" title="Bookmark">
                  <svg viewBox="0 0 24 24" className="topbar-title-icon topbar-title-icon-fill">
                    <path d="M12 2.9l2.82 5.7 6.29.92-4.56 4.44 1.08 6.27L12 17.26 6.37 20.23l1.08-6.27L2.89 9.52l6.29-.92L12 2.9z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="viewer-badge">{viewerCount} currently viewing</div>
            <div className="topbar-icon topbar-nav-btn">
              <a href="https://github.com/Julieanna97" title="GitHub" className="topbar-social-link" aria-label="GitHub profile">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="topbar-social-icon">
                  <path d="M9 19c-4.5 1.4-4.5-2.1-6.3-2.8" />
                  <path d="M14.8 21v-3.3a2.9 2.9 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-5.7a4.4 4.4 0 0 0-1.2-3.1a4.1 4.1 0 0 0-.1-3.1s-1-.3-3.2 1.2a11 11 0 0 0-5.9 0C6.9 3.3 5.9 3.6 5.9 3.6a4.1 4.1 0 0 0-.1 3.1a4.4 4.4 0 0 0-1.2 3.1c0 4.4 2.8 5.4 5.5 5.7a2.9 2.9 0 0 0-.8 2.2V21" />
                </svg>
              </a>
            </div>
            <div className="topbar-icon topbar-nav-btn">
              <a href="https://linkedin.com" title="LinkedIn" className="topbar-social-link" aria-label="LinkedIn profile">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="topbar-social-icon">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                  <path d="M8 10v6" />
                  <path d="M8 7h.01" />
                  <path d="M12 16v-3.5a2 2 0 0 1 4 0V16" />
                </svg>
              </a>
            </div>
            <div className="topbar-icon topbar-nav-btn">
              <a href="mailto:kisamae1997@gmail.com" title="Email" className="topbar-social-link" aria-label="Send email">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="topbar-social-icon">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={`main-content ${recruiterQuickMode ? "quick-mode" : ""}`}>
          <div className="sidebar-left">
            <div className="profile-section">
              <div className="profile-icon"></div>
              <div className="profile-name">Julie Anne</div>
              <div className="profile-info">@kisamae1997</div>
              <div className="profile-role">Fullstack Developer</div>
            </div>

            <div className="sidebar-links">
              <a href="#about" className={`sidebar-link ${activeSection === "about" ? "sidebar-link-active" : ""}`}>
                <span className="sidebar-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="sidebar-link-icon-svg">
                    <circle cx="12" cy="12" r="5" />
                  </svg>
                </span>
                About
              </a>
              <a href="#timeline" className={`sidebar-link ${activeSection === "timeline" ? "sidebar-link-active" : ""}`}>
                <span className="sidebar-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="sidebar-link-icon-svg">
                    <path d="M12 4v16" />
                    <path d="M7 8h10" />
                    <path d="M7 12h10" />
                    <path d="M7 16h10" />
                  </svg>
                </span>
                Timeline
              </a>
              <a href="#projects" className={`sidebar-link ${activeSection === "projects" ? "sidebar-link-active" : ""}`}>
                <span className="sidebar-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="sidebar-link-icon-svg">
                    <path d="M12 4l2.1 4.3L19 9l-3.5 3.4.8 4.8L12 15l-4.3 2.2.8-4.8L5 9l4.9-.7z" />
                  </svg>
                </span>
                Projects
              </a>
              <a href="#skills" className="sidebar-link">
                <span className="sidebar-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="sidebar-link-icon-svg">
                    <circle cx="12" cy="12" r="3.2" />
                    <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.2 1.2 0 0 1 0 1.7l-.9.9a1.2 1.2 0 0 1-1.7 0l-.1-.1a1 1 0 0 0-1.1-.2a1 1 0 0 0-.6.9V20a1.2 1.2 0 0 1-1.2 1.2h-1.3a1.2 1.2 0 0 1-1.2-1.2v-.2a1 1 0 0 0-.6-.9a1 1 0 0 0-1.1.2l-.1.1a1.2 1.2 0 0 1-1.7 0l-.9-.9a1.2 1.2 0 0 1 0-1.7l.1-.1a1 1 0 0 0 .2-1.1a1 1 0 0 0-.9-.6H4a1.2 1.2 0 0 1-1.2-1.2v-1.3A1.2 1.2 0 0 1 4 11.3h.2a1 1 0 0 0 .9-.6a1 1 0 0 0-.2-1.1l-.1-.1a1.2 1.2 0 0 1 0-1.7l.9-.9a1.2 1.2 0 0 1 1.7 0l.1.1a1 1 0 0 0 1.1.2a1 1 0 0 0 .6-.9V4A1.2 1.2 0 0 1 10.4 2.8h1.3A1.2 1.2 0 0 1 13 4v.2a1 1 0 0 0 .6.9a1 1 0 0 0 1.1-.2l.1-.1a1.2 1.2 0 0 1 1.7 0l.9.9a1.2 1.2 0 0 1 0 1.7l-.1.1a1 1 0 0 0-.2 1.1a1 1 0 0 0 .9.6h.2A1.2 1.2 0 0 1 20.4 11v1.3a1.2 1.2 0 0 1-1.2 1.2H19a1 1 0 0 0-.9.6z" />
                  </svg>
                </span>
                Skills
              </a>
              <a href="#contact" className={`sidebar-link ${activeSection === "contact" ? "sidebar-link-active" : ""}`}>
                <span className="sidebar-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="sidebar-link-icon-svg">
                    <rect x="3" y="5.5" width="18" height="13" rx="2" />
                    <path d="M4 7.5l8 6 8-6" />
                  </svg>
                </span>
                Contact
              </a>
            </div>

            <div style={{ flex: 1 }}></div>

            <div
              style={{
                padding: "20px",
                borderTop: "1px solid var(--border-color)",
                fontSize: "0.85em",
              }}
            >
              <p
                style={{
                  color: "var(--accent-color)",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                Status
              </p>
              <p className="status-copy">Graduating April 2026</p>
            </div>
          </div>

          <div className="content-area" ref={contentAreaRef}>
            <div data-reveal-id="utility" className={`utility-strip reveal-item ${isRevealVisible("utility") ? "reveal-visible" : ""}`}>
              <div className="theme-chips">
                {(Object.keys(themes) as ThemeKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`theme-chip ${themeKey === key ? "theme-chip-active" : ""}`}
                    onClick={() => setThemeKey(key)}
                  >
                    {themes[key].label}
                  </button>
                ))}
              </div>
              <div className="availability-strip">
                <span className="availability-chip availability-chip-highlight">Open to SWE roles</span>
                <span className="availability-chip">UTC+8</span>
                <span className="availability-chip">Replies within 24h</span>
                {recruiterQuickMode ? <span className="recruiter-badge">Recruiter Quick Mode</span> : null}
              </div>
              <div className="utility-actions">
                <button
                  type="button"
                  className="utility-btn"
                  onClick={() => setReduceMotion((prev) => !prev)}
                >
                  {reduceMotion ? "Enable Motion" : "Reduce Motion"}
                </button>
                <button
                  type="button"
                  className="utility-btn"
                  onClick={() => setColorMode((prev) => (prev === "light" ? "dark" : "light"))}
                >
                  {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                </button>
                <button
                  type="button"
                  className="utility-btn"
                  onClick={() => setRecruiterQuickMode((prev) => !prev)}
                >
                  {recruiterQuickMode ? "Disable Recruiter Mode" : "Recruiter Quick Mode"}
                </button>
                {!recruiterQuickMode ? (
                  <button
                    type="button"
                    className="utility-btn"
                    onClick={() => setTimelineStoryMode((prev) => !prev)}
                  >
                    {timelineStoryMode ? "Timeline: Vertical" : "Timeline: Story Mode"}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="utility-btn"
                  onClick={() => setIsCommandPaletteOpen(true)}
                >
                  Command Palette <span className="kbd-pill">Ctrl/Cmd + K</span>
                </button>
                <button
                  type="button"
                  className="utility-btn"
                  onClick={() => setShowFavoritesOnly((prev) => !prev)}
                >
                  {showFavoritesOnly ? "Show All Projects" : `Favorites Only (${favoriteProjects.length})`}
                </button>
              </div>
            </div>

            <section id="about" data-reveal-id="about" className={`section reveal-item reveal-delay-1 ${isRevealVisible("about") ? "reveal-visible" : ""}`}>
              <div className="section-subtitle">Profile</div>
              <h2 className="section-title">Full Stack Developer & Builder</h2>
              <div className="typing-line">
                {typedIntro}
                <span className="typing-caret">|</span>
              </div>
              <p className="about-copy" style={{ marginBottom: "15px" }}>
                I work across frontend, backend, and embedded systems. Started with
                embedded projects at Sigma Industry Evolution and Nodehill AB
                (Arduino, ESP32, LoRa). Then moved to fullstack web development,
                built PracticePal with Next.js and Stripe, worked on audio editing at
                PodManager.ai with React and FastAPI, and trained AI models at
                Outlier.
              </p>
              <p className="about-copy">
                I care about clear interfaces, performant code, and products that
                actually solve problems. Graduating April 2026. Looking to keep
                building things that matter.
              </p>
            </section>

            {recruiterQuickMode ? (
              <section className={`section recruiter-summary reveal-item reveal-delay-2 ${isRevealVisible("about") ? "reveal-visible" : ""}`}>
                <div className="section-subtitle">Recruiter Snapshot</div>
                <h2 className="section-title">Quick Decision View</h2>
                <div className="recruiter-summary-grid">
                  <div className="recruiter-summary-card">
                    <h3>What I Build</h3>
                    <p>Product-focused full-stack apps with reliable auth, data modeling, and subscription flows.</p>
                  </div>
                  <div className="recruiter-summary-card">
                    <h3>Best Fit Roles</h3>
                    <p>Full-Stack Engineer, Product Engineer, and Frontend-leaning SWE roles.</p>
                  </div>
                  <div className="recruiter-summary-card">
                    <h3>Hiring Signal</h3>
                    <p>Strong ownership across UX-to-backend execution and production-ready features.</p>
                  </div>
                </div>
                <div className="contact-actions" style={{ marginTop: "14px" }}>
                  <a href="mailto:kisamae1997@gmail.com" className="contact-btn contact-btn-primary">Email Julie</a>
                  <a href="https://github.com/Julieanna97" className="contact-btn contact-btn-secondary">View GitHub</a>
                </div>
              </section>
            ) : null}

            {!recruiterQuickMode ? (
            <section id="timeline" data-reveal-id="timeline" className={`section reveal-item reveal-delay-2 ${isRevealVisible("timeline") ? "reveal-visible" : ""}`}>
              <div className="section-subtitle">Milestones</div>
              <h2 className="section-title">Mini Timeline</h2>
              <div className="timeline-filters">
                {timelineFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`timeline-filter-btn ${timelineFilter === filter ? "timeline-filter-btn-active" : ""}`}
                    onClick={() => setTimelineFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div
                ref={timelineSectionRef}
                className={`timeline ${timelineStoryMode ? "timeline-story-layout" : ""}`}
                style={{ ["--timeline-progress" as string]: `${timelineLineProgress}%` }}
              >
                {filteredMilestones.map((item) => (
                  <div
                    key={`${item.year}-${item.title}`}
                    className={`timeline-item ${visibleMilestones[item.originalIndex] ? "timeline-item-visible" : ""}`}
                    data-index={item.originalIndex}
                    ref={(element) => {
                      timelineItemRefs.current[item.originalIndex] = element;
                    }}
                  >
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-subtitle">{item.subtitle}</div>
                    <div className="timeline-detail">{item.detail}</div>
                  </div>
                ))}
              </div>
            </section>
            ) : null}

            <section id="projects" data-reveal-id="projects" className={`section reveal-item reveal-delay-3 ${isRevealVisible("projects") ? "reveal-visible" : ""}`}>
              <div className="section-subtitle">Featured Work</div>
              <h2 className="section-title">Projects</h2>
              {showFavoritesOnly ? (
                <p className="project-summary" style={{ marginBottom: "14px" }}>
                  Favorites view is active. Press F to quickly toggle between favorite projects and all projects.
                </p>
              ) : null}
              <div className="project-grid">
                {displayedProjects.map((project) => (
                  <div
                    key={project.name}
                    className={`project-card ${favoriteProjects.includes(project.name) ? "project-card-favorited" : ""}`}
                    onMouseMove={handleProjectPointerMove}
                    onMouseLeave={resetProjectTilt}
                  >
                    <div className="project-card-head">
                      <div className="project-title">{project.name}</div>
                      <button
                        type="button"
                        className={`project-favorite-btn ${favoriteProjects.includes(project.name) ? "project-favorite-btn-active" : ""}`}
                        aria-label={favoriteProjects.includes(project.name) ? `Remove ${project.name} from favorites` : `Add ${project.name} to favorites`}
                        onClick={() => toggleProjectFavorite(project.name)}
                      >
                        {favoriteProjects.includes(project.name) ? "★" : "☆"}
                      </button>
                    </div>
                    <div className="project-category">{project.category}</div>
                    <div className="project-summary">{project.summary}</div>
                    <div className="project-stack">
                      {project.stack.map((tech) => (
                        <span key={tech} className="stack-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="project-score-grid">
                      <div className="score-chip"><span>Impact</span><span>{project.score.impact}/5</span></div>
                      <div className="score-chip"><span>Complexity</span><span>{project.score.complexity}/5</span></div>
                      <div className="score-chip"><span>Ownership</span><span>{project.score.ownership}/5</span></div>
                      <div className="score-chip"><span>Business</span><span>{project.score.business}/5</span></div>
                    </div>
                    <div className="project-actions">
                      <button
                        type="button"
                        className="project-btn"
                        onClick={() => {
                          setIsModalClosing(false);
                          setSelectedProject(project);
                        }}
                      >
                        View case study
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {showFavoritesOnly && displayedProjects.length === 0 ? (
                <div className="projects-empty">
                  No favorites selected yet. Tap ☆ on any project card to save favorites.
                </div>
              ) : null}
            </section>

            <section className={`section reveal-item reveal-delay-4 ${isRevealVisible("projects") ? "reveal-visible" : ""}`}>
              <div className="section-subtitle">Currently Building</div>
              <h2 className="section-title">What I Am Shipping Next</h2>
              <div className="currently-building-grid">
                {currentlyBuildingItems.map((item) => (
                  <article key={item.title} className="currently-building-card">
                    <div className="currently-building-meta">
                      <span className="currently-building-status">{item.status}</span>
                      <span className="currently-building-target">{item.target}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            {!recruiterQuickMode ? (
              <section className={`section reveal-item reveal-delay-5 ${isRevealVisible("projects") ? "reveal-visible" : ""}`}>
                <div className="section-subtitle">Social Proof</div>
                <h2 className="section-title">Testimonials</h2>
                <div className="testimonials-strip">
                  {testimonials.map((item) => (
                    <article key={item.quote} className="testimonial-card">
                      <p className="testimonial-quote">"{item.quote}"</p>
                      <p className="testimonial-byline">{item.by} • {item.role}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <section id="contact" data-reveal-id="contact" className={`section reveal-item reveal-delay-4 ${isRevealVisible("contact") ? "reveal-visible" : ""}`}>
              <div className="section-subtitle">Get In Touch</div>
              <h2 className="section-title">Let's Build</h2>
              <p style={{ marginBottom: "20px" }}>
                Open to opportunities, collaborations, and interesting projects.
                Reach out anytime.
              </p>
              <div className="contact-actions">
                <a
                  href="mailto:kisamae1997@gmail.com"
                  className="contact-btn contact-btn-primary"
                  onClick={() => showToast("Opening your email app...")}
                >
                  Email
                </a>
                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-btn contact-btn-secondary"
                >
                  Book Intro Call
                </a>
                <a
                  href="https://github.com/Julieanna97"
                  className="contact-btn contact-btn-secondary"
                >
                  GitHub
                </a>
              </div>
              <p className="contact-prompt">Best reason to contact me: product-focused SWE roles and full-stack collaborations.</p>
            </section>
          </div>

          <div className="sidebar-right">
            <div className="live-now-box">
              <div className="skill-category-name">Live Now</div>
              <div className="stat-value">Working on portfolio and case studies</div>
              <div className="live-time" suppressHydrationWarning>
                {liveNow
                  ? liveNow.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "--:--:--"}
              </div>
              <div className="stat-value">UTC+8 • Usually replies in 24h</div>
            </div>

            <div className="stats-box">
              <div className="stat-item">
                <div className="stat-label">2026</div>
                <div className="stat-value">Graduation Year</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">5+</div>
                <div className="stat-value">Projects & Internships</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Shortcuts</div>
                <div className="stat-value">Press C for chat, M for music, D for mode, F for favorites, Ctrl/Cmd+K for commands</div>
              </div>
              <div className="performance-pill">Lighthouse target: 95+ performance</div>
            </div>

            <div id="skills" className="skills-showcase">
              <div className="skills-map-tabs">
                {skillCategoryOrder.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`skills-map-tab ${activeSkillCategory === category ? "skills-map-tab-active" : ""}`}
                    onClick={() => setActiveSkillCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="skills-map-grid">
                {skillMap[activeSkillCategory].map((skill) => (
                  <div key={skill.name} className="skills-map-row">
                    <div className="skills-map-label">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="skills-map-track">
                      <div className="skills-map-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                    <a className="proof-link" href={skill.proof} target="_blank" rel="noreferrer">
                      proof link
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                fontSize: "0.85em",
                color: "var(--muted-color)",
                textAlign: "center",
                marginTop: "auto",
                paddingTop: "20px",
                borderTop: "1px solid var(--border-color)",
              }}
            >
              <p>© 2026 Julie Anne Cantillep</p>
              <p style={{ marginTop: "8px" }}>Passionate about design & building</p>
            </div>
          </div>
        </div>
      </div>

      <div className="side-player-shell" aria-label="Music player">
        <div className="side-player-panel">
          <div className="side-player-title">Media Player</div>

          <div className="side-player-controls">
            <button
              type="button"
              className="side-player-btn"
              onClick={playPreviousTrack}
              aria-label="Previous track"
              title="Previous"
            >
              ⏮
            </button>
            <button
              type="button"
              className="side-player-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              type="button"
              className="side-player-btn"
              onClick={playNextTrack}
              aria-label="Next track"
              title="Next"
            >
              ⏭
            </button>
          </div>

          <audio
            ref={audioRef}
            className="side-player-audio"
            src={activeTrack?.src ?? ""}
            muted
            playsInline
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={playNextTrack}
            onError={() => {
              if (relaxingPlaylist.length > 1) {
                playNextTrack();
                return;
              }

              setIsPlaying(false);
              showToast("Track source missing. Please update the audio file path.");
            }}
          />
        </div>
      </div>

      {isCommandPaletteOpen ? (
        <div className="command-overlay" onClick={() => setIsCommandPaletteOpen(false)}>
          <div className="command-panel" onClick={(event) => event.stopPropagation()}>
            <input
              type="text"
              autoFocus
              className="command-input"
              placeholder="Jump to section, toggle theme, or control music..."
              value={commandQuery}
              onChange={(event) => setCommandQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActiveCommandIndex((prev) =>
                    Math.min(prev + 1, Math.max(filteredCommandActions.length - 1, 0)),
                  );
                }

                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActiveCommandIndex((prev) => Math.max(prev - 1, 0));
                }

                if (event.key === "Enter") {
                  event.preventDefault();
                  const action = filteredCommandActions[activeCommandIndex];
                  if (action) {
                    runCommandAction(action.id);
                  }
                }
              }}
            />
            <ul className="command-list">
              {filteredCommandActions.map((action, index) => (
                <li key={action.id}>
                  <button
                    type="button"
                    className={`command-item ${index === activeCommandIndex ? "command-item-active" : ""}`}
                    onClick={() => runCommandAction(action.id)}
                    onMouseEnter={() => setActiveCommandIndex(index)}
                  >
                    {action.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {selectedProject ? (
        <div
          className={`modal-overlay project-modal ${isModalClosing ? "modal-overlay-closing" : "modal-overlay-open"}`}
          onClick={closeProjectModal}
        >
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="section-subtitle">Case Study</div>
                <h3 className="section-title" style={{ marginBottom: 0 }}>
                  {selectedProject.name}
                </h3>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={closeProjectModal}
              >
                Close
              </button>
            </div>
            <div className="project-category">{selectedProject.category}</div>
            <div className="modal-tabs" role="tablist" aria-label="Project deep dive tabs">
              {projectModalTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeProjectTab === tab}
                  className={`modal-tab ${activeProjectTab === tab ? "modal-tab-active" : ""}`}
                  onClick={() => setActiveProjectTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeProjectTab === "overview" ? (
              <div className="modal-tab-panel" role="tabpanel">
                <p className="project-summary">{selectedProject.summary}</p>
                <p className="project-summary" style={{ marginBottom: 0 }}>
                  <strong>Why I built this:</strong> {selectedProject.whyBuilt}
                </p>
                <p className="project-summary" style={{ marginBottom: 0 }}>
                  <strong>Role:</strong> {selectedProject.role} • <strong>Duration:</strong> {selectedProject.duration}
                </p>
                <p className="project-summary" style={{ marginBottom: 0 }}>
                  <strong>Outcome:</strong> {selectedProject.impact}
                </p>
              </div>
            ) : null}

            {activeProjectTab === "architecture" ? (
              <div className="modal-tab-panel" role="tabpanel">
                <p className="project-summary" style={{ marginBottom: 0 }}>
                  <strong>Architecture:</strong> {selectedProject.architecture}
                </p>
                <div className="project-stack" style={{ marginTop: "10px" }}>
                  {selectedProject.stack.map((tech) => (
                    <span key={tech} className="stack-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="modal-highlights" style={{ marginTop: "12px" }}>
                  {selectedProject.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {activeProjectTab === "challenges" ? (
              <ul className="modal-highlights modal-tab-panel" role="tabpanel">
                {selectedProject.challenges.map((challenge) => (
                  <li key={challenge}>{challenge}</li>
                ))}
              </ul>
            ) : null}

            {activeProjectTab === "lessons" ? (
              <ul className="modal-highlights modal-tab-panel" role="tabpanel">
                {selectedProject.lessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            ) : null}

            {activeProjectTab === "next" ? (
              <ul className="modal-highlights modal-tab-panel" role="tabpanel">
                {selectedProject.nextIteration.map((next) => (
                  <li key={next}>{next}</li>
                ))}
              </ul>
            ) : null}

            <div className="project-score-grid">
              <div className="score-chip"><span>Impact</span><span>{selectedProject.score.impact}/5</span></div>
              <div className="score-chip"><span>Complexity</span><span>{selectedProject.score.complexity}/5</span></div>
              <div className="score-chip"><span>Ownership</span><span>{selectedProject.score.ownership}/5</span></div>
              <div className="score-chip"><span>Business</span><span>{selectedProject.score.business}/5</span></div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="chat-widget">
        {isChatOpen ? (
          <form className="chat-panel" onSubmit={handleChatSubmit}>
            <div className="chat-panel-title">Quick Chat</div>
            <div className="chat-panel-subtitle">
              Send me a message and I will get back to you.
            </div>

            <input
              className="chat-input"
              type="text"
              placeholder="Your name"
              value={chatForm.name}
              onChange={(e) => handleChatChange("name", e.target.value)}
              required
            />
            <input
              className="chat-input"
              type="email"
              placeholder="Your email"
              value={chatForm.email}
              onChange={(e) => handleChatChange("email", e.target.value)}
              required
            />
            <textarea
              className="chat-textarea"
              placeholder="Your message"
              value={chatForm.message}
              onChange={(e) => handleChatChange("message", e.target.value)}
              required
            />

            <div className="chat-actions">
              <button
                type="button"
                className="chat-btn chat-btn-cancel"
                onClick={() => setIsChatOpen(false)}
              >
                Close
              </button>
              <button type="submit" className="chat-btn chat-btn-send">
                Send
              </button>
            </div>
          </form>
        ) : null}

        <button
          className="chat-toggle"
          type="button"
          onClick={() => setIsChatOpen((prev) => !prev)}
          aria-label="Open contact chat"
          title="Chat with me"
        >
          💬
        </button>
      </div>

      <div className={`contact-toast ${toast.visible ? "contact-toast-show" : ""}`}>
        {toast.message}
      </div>
    </div>
  );
}
