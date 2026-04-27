"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CaseStudyTopNav from "@/app/components/CaseStudyTopNav";

const metrics = [
  { label: "Project Type", value: "Embedded" },
  { label: "Role",         value: "Software Dev" },
  { label: "Hardware",     value: "Arduino" },
  { label: "Domain",       value: "Autonomous" },
];

const wins = [
  {
    title: "Worked on real hardware, not a simulator",
    text: "The car had to drive through actual physical space — every bug had a physical consequence, from wheels stuttering to the chassis steering into walls.",
  },
  {
    title: "Built sensor-driven control loops",
    text: "Wrote firmware in C/C++ that read sensor input continuously, made decisions in real time, and translated those into motor commands.",
  },
  {
    title: "Tested with Python tooling",
    text: "Used Python scripts to validate sensor data, log telemetry, and iterate on calibration without re-flashing the Arduino each time.",
  },
  {
    title: "Constrained problem solving",
    text: "Limited memory, limited compute, real-world noise. Embedded development teaches you to write code that has to work, not just compile.",
  },
];

const sections = [
  {
    number: "01",
    title: "Read the world, then react",
    text: "Sensors fed continuous data into the control loop. Distance readings, orientation, wheel feedback — all of it had to be parsed and acted on within milliseconds, before the car ran into something.",
  },
  {
    number: "02",
    title: "Firmware was the brain",
    text: "Arduino C/C++ handled the decision-making: when to turn, when to brake, when to keep going. Writing for resource-constrained hardware made me think about every byte and every clock cycle.",
  },
  {
    number: "03",
    title: "Hardware bugs are different",
    text: "When software fails, you read a stack trace. When hardware fails, you check the wiring, then the power, then the sensor mount, then the code. Debugging across that boundary became second nature.",
  },
];

const reflections = [
  {
    label: "What was new",
    text: "Working in physical space. Software has no inertia — hardware does. You can't just push a fix and reload; you flash, test, watch the car drive, then iterate.",
  },
  {
    label: "What I got better at",
    text: "Reading sensor data critically. Real sensors lie sometimes — they drift, they spike, they need calibration. Learning to filter noise from signal carried over into everything I've built since.",
  },
  {
    label: "What I'm taking forward",
    text: "An intuition for systems that touch the physical world. IoT, robotics, edge devices — anything where software meets hardware feels familiar now, not foreign.",
  },
];

const stack = [
  "Arduino", "C/C++", "Python", "Sensors",
  "Servo motors", "Control loops", "Sensor fusion", "Firmware",
];

// ── CUSTOM VIDEO PLAYER ─────────────────────────────────────────────────────
function CustomVideoPlayer({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoad = () => setDuration(v.duration || 0);
    const onTime = () => {
      setCurrentTime(v.currentTime);
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    };
    const onEnd = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    v.addEventListener("loadedmetadata", onLoad);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    return () => {
      v.removeEventListener("loadedmetadata", onLoad);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Auto-hide controls during playback
  useEffect(() => {
    if (!playing || hovering) {
      setShowControls(true);
      return;
    }
    const t = setTimeout(() => setShowControls(false), 2200);
    return () => clearTimeout(t);
  }, [playing, hovering, currentTime]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const c = containerRef.current;
    if (!c) return;
    if (!document.fullscreenElement) c.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const fmt = (s: number) => {
    if (!Number.isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className="group relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#f5a0c8]/25 to-[#e8613a]/15 blur-2xl transition duration-500 group-hover:from-[#f5a0c8]/40 group-hover:to-[#e8613a]/25" />

      <div className="relative overflow-hidden rounded-[2rem] border border-[#1a0808]/15 bg-[#1a0808] p-3 shadow-2xl shadow-[#1a0808]/25 md:p-4">
        {/* Title bar */}
        <div className="mb-3 flex items-center justify-between gap-2 px-2 md:mb-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#f5a0c8]" />
            <span className="h-3 w-3 rounded-full bg-[#e8613a]" />
            <span className="h-3 w-3 rounded-full bg-[#f0ece4]/50" />
          </div>
          <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#f5a0c8]/55">
            sigma-car · drive-test
          </span>
        </div>

        {/* Video + custom overlay */}
        <div className="relative aspect-video overflow-hidden rounded-[1.45rem] bg-black">
          <video
            ref={videoRef}
            preload="metadata"
            playsInline
            muted={muted}
            poster={poster}
            className="h-full w-full"
            onClick={togglePlay}
          >
            <source src={src} type="video/mp4" />
            Your browser doesn't support the video tag.
          </video>

          {/* CENTER PLAY BUTTON — visible when paused */}
          {!playing && (
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#1a0808]/40 via-transparent to-transparent transition"
              aria-label="Play"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#f5a0c8] bg-[#1a0808]/70 backdrop-blur-md transition group-hover:scale-110 group-hover:bg-[#f5a0c8] md:h-24 md:w-24">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="ml-1 transition"
                >
                  <path
                    d="M5 3L25 14L5 25V3Z"
                    fill="#f5a0c8"
                    className="transition group-hover:fill-[#1a0808]"
                  />
                </svg>
              </span>
            </button>
          )}

          {/* CUSTOM CONTROLS BAR */}
          <div
            className={`absolute bottom-0 left-0 right-0 flex flex-col gap-2 bg-gradient-to-t from-[#1a0808]/95 via-[#1a0808]/70 to-transparent p-3 transition-opacity duration-300 md:gap-3 md:p-4 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Scrubber */}
            <div
              className="group/scrub relative h-2 cursor-pointer"
              onClick={seek}
            >
              {/* Track */}
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-[#f5a0c8]/20">
                {/* Fill */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#f5a0c8] to-[#e8613a] transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* Scrubber handle */}
              <div
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#1a0808] bg-[#f5a0c8] opacity-0 shadow-lg transition group-hover/scrub:opacity-100"
                style={{ left: `${progress}%` }}
              />
            </div>

            {/* Buttons row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 md:gap-3">
                {/* Play / Pause */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f5a0c8]/30 bg-[#f5a0c8]/10 text-[#f5a0c8] transition hover:border-[#f5a0c8] hover:bg-[#f5a0c8] hover:text-[#1a0808] md:h-10 md:w-10"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <rect x="2" y="1" width="3.5" height="12" rx="0.5" />
                      <rect x="8.5" y="1" width="3.5" height="12" rx="0.5" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="ml-0.5">
                      <path d="M2 1.5L12.5 7L2 12.5V1.5Z" />
                    </svg>
                  )}
                </button>

                {/* Mute */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f5a0c8]/30 bg-[#f5a0c8]/10 text-[#f5a0c8] transition hover:border-[#f5a0c8] hover:bg-[#f5a0c8] hover:text-[#1a0808] md:h-10 md:w-10"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3 6v4h2.5L9 12.5v-9L5.5 6H3z" />
                      <path d="M11 5l3 3M14 5l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3 6v4h2.5L9 12.5v-9L5.5 6H3z" />
                      <path d="M11.5 5.5a3.5 3.5 0 010 5M13 4a5 5 0 010 8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </button>

                {/* Time */}
                <div className="ml-1 font-mono text-[0.7rem] tracking-[0.05em] text-[#f5a0c8]/80 md:text-xs">
                  <span className="text-[#f5a0c8]">{fmt(currentTime)}</span>
                  <span className="mx-1.5 text-[#f5a0c8]/30">/</span>
                  <span>{fmt(duration)}</span>
                </div>
              </div>

              {/* Right side: Live indicator + Fullscreen */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden items-center gap-2 rounded-full border border-[#e8613a]/30 bg-[#e8613a]/10 px-3 py-1 sm:flex">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e8613a] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#e8613a]" />
                  </span>
                  <span className="text-[0.55rem] font-black uppercase tracking-[0.18em] text-[#e8613a]">
                    Demo Reel
                  </span>
                </div>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f5a0c8]/30 bg-[#f5a0c8]/10 text-[#f5a0c8] transition hover:border-[#f5a0c8] hover:bg-[#f5a0c8] hover:text-[#1a0808] md:h-10 md:w-10"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 1v4H1M9 1v4h4M5 13v-4H1M9 13v-4h4" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 5V1h4M13 5V1H9M1 9v4h4M13 9v4H9" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PROJECT IMAGE — uses object-contain on dark bg, no cropping ─────────────
function ProjectImage({
  src,
  alt,
  aspect = "aspect-[4/3]",
  contained = true,
  className = "",
}: {
  src: string;
  alt: string;
  aspect?: string;
  contained?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden ${
        contained ? "bg-[#1a0808]" : ""
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`${
          contained ? "object-contain" : "object-cover"
        } transition duration-700 group-hover:scale-[1.02]`}
      />
    </div>
  );
}

export default function SigmaCarCaseStudyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f0ece4] text-[#1a0808]">
      <CaseStudyTopNav />

      {/* HERO */}
      <section className="relative px-6 py-16 md:px-12 md:py-24">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#f5a0c8]/30 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10rem] top-24 h-[32rem] w-[32rem] rounded-full bg-[#e8613a]/20 blur-3xl" />

        <div className="relative grid items-center gap-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <Link
              href="/"
              className="mb-12 inline-block text-xs font-black uppercase tracking-[0.18em] text-[#7a5050] transition hover:text-[#e8613a]"
            >
              ← Back to Portfolio
            </Link>

            <p className="mb-6 text-xs font-black uppercase tracking-[0.26em] text-[#e8613a]">
              Embedded Systems · 2023
            </p>

            <h1 className="max-w-4xl text-[clamp(2.8rem,7.5vw,7.5rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]">
              Sigma<br />
              <span className="text-[#f5a0c8]">Autonomous</span>{" "}
              <span className="text-[#e8613a]">Car</span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
              An Arduino-based autonomous radio-controlled car built during my
              embedded software internship at Sigma. Sensors, control loops,
              and firmware that had to actually work in physical space — not
              just compile.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#in-motion"
                className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
              >
                See It Drive
              </a>

              <a
                href="#build"
                className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
              >
                The Build
              </a>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="group relative motion-safe:animate-[floatScreen_6s_ease-in-out_infinite]">
            <style>{`
              @keyframes floatScreen {
                0%, 100% { transform: translateY(0) rotate(-1.5deg); }
                50% { transform: translateY(-14px) rotate(0.5deg); }
              }
              @keyframes pulseDot {
                0%, 100% { opacity: 0.55; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.25); }
              }
            `}</style>

            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#f5a0c8]/30 to-[#e8613a]/20 blur-2xl transition duration-500 group-hover:from-[#f5a0c8]/45 group-hover:to-[#e8613a]/30" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#1a0808]/15 bg-[#1a0808] p-4 shadow-2xl shadow-[#1a0808]/25 transition duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#f5a0c8]" />
                  <span className="h-3 w-3 rounded-full bg-[#e8613a]" />
                  <span className="h-3 w-3 rounded-full bg-[#f0ece4]/50" />
                </div>
                <span className="flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#f5a0c8]/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e8613a] motion-safe:animate-[pulseDot_1.6s_ease-in-out_infinite]" />
                  Live Build
                </span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.45rem] bg-[#1a0808]">
                <Image
                  src="/projects/sigma-car/sigma-office.PNG"
                  alt="Sigma autonomous car — full view"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="grid grid-cols-2 border-y border-[#1a0808]/10 md:grid-cols-4">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="border-b border-r border-[#1a0808]/10 px-6 py-8 md:border-b-0 md:px-12"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7a5050]">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-black uppercase leading-none md:text-4xl">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {/* WHAT I BUILT */}
      <section className="grid gap-12 px-6 py-20 md:px-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
            What I Built
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
            A car that drives itself.
          </h2>
        </div>

        <div className="grid gap-4">
          {wins.map((item) => (
            <article
              key={item.title}
              className="group rounded-[1.75rem] border border-[#1a0808]/10 bg-white/30 p-6 transition hover:-translate-y-1 hover:bg-[#f5a0c8]"
            >
              <h3 className="text-2xl font-black uppercase leading-none">
                {item.title}
              </h3>
              <p className="mt-4 text-sm font-medium uppercase leading-8 tracking-[0.06em] text-[#3a1818]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* THE BUILD — Now an asymmetric layout: one big image + one tall image */}
      <section
        id="build"
        className="bg-[#1a0808] px-6 py-24 text-[#f5a0c8] md:px-12"
      >
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#f5a0c8]/70">
              The Build
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[#f5a0c8]">
              Wires, boards, and a chassis.
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#f0ece4]/60 md:text-base">
            Every wire goes somewhere on purpose. The build process was as
            much about troubleshooting connections as writing firmware.
          </p>
        </div>

        {/* Asymmetric grid: large image left, tall image right */}
        <div className="grid gap-6 md:grid-cols-12">
          <figure className="group relative overflow-hidden rounded-[1.75rem] border border-[#f5a0c8]/15 bg-[#f5a0c8]/[0.03] md:col-span-7">
            <ProjectImage
              src="/projects/sigma-car/car-7.jfif"
              alt="Internal wiring and component layout"
              aspect="aspect-[16/11]"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a0808] via-[#1a0808]/85 to-transparent px-6 py-5">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#f5a0c8]">
                Step 01 · Wiring
              </p>
              <p className="mt-1.5 text-base font-medium uppercase tracking-[0.04em] text-[#f0ece4]/90">
                Component layout & wiring.
              </p>
            </figcaption>
          </figure>

          <figure className="group relative overflow-hidden rounded-[1.75rem] border border-[#f5a0c8]/15 bg-[#f5a0c8]/[0.03] md:col-span-5">
            <ProjectImage
              src="/projects/sigma-car/car-3.jfif"
              alt="Assembly and chassis integration"
              aspect="aspect-[16/11] md:aspect-auto md:h-full"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a0808] via-[#1a0808]/85 to-transparent px-6 py-5">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#f5a0c8]">
                Step 02 · Assembly
              </p>
              <p className="mt-1.5 text-base font-medium uppercase tracking-[0.04em] text-[#f0ece4]/90">
                Into the chassis.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE — Single full-width image, contained */}
      <section className="bg-[#f5a0c8] px-6 py-24 text-[#1a0808] md:px-12">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em]">
              System Architecture
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
              How the parts talk.
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#1a0808]/70 md:text-base">
            Signal flow from sensors through the controller to the motors —
            mapped end-to-end so debugging stays grounded.
          </p>
        </div>

        <figure className="group relative overflow-hidden rounded-[2rem] border-2 border-[#1a0808]/10 bg-[#1a0808] shadow-2xl shadow-[#1a0808]/20">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src="/projects/sigma-car/car-2.jfif"
              alt="System architecture and signal flow"
              fill
              sizes="100vw"
              className="object-contain transition duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </figure>
      </section>

      {/* HOW IT CAME TOGETHER */}
      <section className="relative overflow-hidden bg-[#1a0808] px-6 py-24 text-[#f5a0c8] md:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,160,200,0.12),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(232,97,58,0.12),transparent_35%)]" />

        <div className="relative">
          <p className="mb-10 text-xs font-black uppercase tracking-[0.24em]">
            How It Came Together
          </p>

          <div className="grid gap-5 lg:grid-cols-3">
            {sections.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-[#f5a0c8]/20 bg-[#f5a0c8]/5 p-7 backdrop-blur transition hover:bg-[#f5a0c8]/10"
              >
                <p className="mb-14 text-xs font-black text-[#f5a0c8]/50">
                  {item.number}
                </p>
                <h2 className="text-3xl font-black uppercase leading-tight md:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-6 text-sm font-medium leading-7 text-[#f0ece4]/65">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DETAIL SHOTS — 3-column gallery instead of polaroid pair */}
      <section className="bg-[#f0ece4] px-6 py-24 md:px-12">
        <div className="mb-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
              Up Close
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
              The little parts that matter.
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
            Up close, you see the parts that mattered most — the sensor that
            had to be exactly right, the board that ran the whole show.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          <figure className="group overflow-hidden rounded-[1.75rem] border border-[#1a0808]/10 bg-[#1a0808]">
            <ProjectImage
              src="/projects/sigma-car/car-5.jfif"
              alt="Sensor close-up"
              aspect="aspect-[4/3]"
            />
            <figcaption className="grid grid-cols-[auto_1fr] items-center gap-5 bg-[#1a0808] px-6 py-5">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#e8613a]">
                A
              </p>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.06em] text-[#f5a0c8]">
                  Sensor detail
                </p>
                <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[#f0ece4]/55">
                  Eyes of the system
                </p>
              </div>
            </figcaption>
          </figure>

          <figure className="group overflow-hidden rounded-[1.75rem] border border-[#1a0808]/10 bg-[#1a0808]">
            <ProjectImage
              src="/projects/sigma-car/car-6.jfif"
              alt="Microcontroller and board"
              aspect="aspect-[4/3]"
            />
            <figcaption className="grid grid-cols-[auto_1fr] items-center gap-5 bg-[#1a0808] px-6 py-5">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#e8613a]">
                B
              </p>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.06em] text-[#f5a0c8]">
                  The controller
                </p>
                <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[#f0ece4]/55">
                  Where the firmware lives
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FINAL RESULT — Banner shot */}
      <section className="bg-[#2e0e0e] px-6 py-24 md:px-12">
        <div className="mb-12 max-w-4xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#f5a0c8]">
            Final Result
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[#f5a0c8]">
            And it actually drives.
          </h2>
        </div>

        <figure className="group relative overflow-hidden rounded-[2rem] border-2 border-[#f5a0c8]/20 bg-[#1a0808]">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src="/projects/sigma-car/car-1.jfif"
              alt="Completed Sigma autonomous car"
              fill
              sizes="100vw"
              className="object-contain transition duration-1000 group-hover:scale-[1.02]"
            />
          </div>
        </figure>
      </section>

      {/* SEE IT IN MOTION — VIDEO */}
      <section
        id="in-motion"
        className="bg-[#f0ece4] px-6 py-24 md:px-12"
      >
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.24em] text-[#e8613a]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e8613a] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e8613a]" />
              </span>
              See It in Motion
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
              Code, compiled. Wheels, turning.
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#3a1818] md:text-base">
            The whole point of an autonomous car case study is the moment
            it drives on its own. Here it is.
          </p>
        </div>

        <CustomVideoPlayer
          src="/projects/sigma-car/car-demo.mp4"
          poster="/projects/sigma-car/car-1.jfif"
        />
      </section>

      {/* REFLECTION */}
      <section className="bg-[#2e0e0e] px-6 py-24 text-[#f0ece4] md:px-12">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#f5a0c8]">
              Reflection
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[#f5a0c8]">
              What hardware taught me.
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-medium uppercase leading-8 tracking-[0.08em] text-[#f0ece4]/60 md:text-base">
            Hardware projects change how you think. You stop trusting your
            code at face value. You learn to test against the world.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reflections.map((item) => (
            <article
              key={item.label}
              className="rounded-[2rem] border border-[#f5a0c8]/20 bg-[#f5a0c8]/5 p-7 transition hover:bg-[#f5a0c8]/10"
            >
              <p className="mb-10 text-xs font-black uppercase tracking-[0.22em] text-[#f5a0c8]">
                {item.label}
              </p>
              <p className="text-sm font-medium leading-8 text-[#f0ece4]/75">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="bg-[#1a0808] px-6 py-20 text-[#f0ece4] md:px-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#f5a0c8]">
              Stack & Tooling
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
              What it took to ship.
            </h2>
          </div>

          <div className="flex max-w-3xl flex-wrap gap-3">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#f5a0c8]/30 bg-[#f5a0c8]/5 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#f5a0c8]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#e8613a] px-6 py-24 md:px-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#f5a0c8]/30 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-[#1a0808]">
              More Work
            </p>
            <h2 className="max-w-5xl text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[#1a0808]">
              See more projects.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-medium uppercase leading-7 tracking-[0.08em] text-[#1a0808]/75 md:text-base">
              From hardware to fullstack — a tour through what I've built.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] bg-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#f0ece4] transition hover:bg-transparent hover:text-[#1a0808]"
            >
              All Projects
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full border border-[#1a0808] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#1a0808] transition hover:bg-[#1a0808] hover:text-[#f0ece4]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}