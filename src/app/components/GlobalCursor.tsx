"use client";

import { useEffect, useRef, useState } from "react";

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorEnabled, setCursorEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    setCursorEnabled(true);
    document.body.classList.add("cursor-enabled");

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

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
      rafId = window.requestAnimationFrame(animateRing);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest("a, button, [data-hover], input, textarea, label, select");
      if (cursorRingRef.current) {
        cursorRingRef.current.classList.toggle("cursor-ring-grow", isInteractive);
      }
      if (cursorRef.current) {
        cursorRef.current.classList.toggle("cursor-dot-hide", isInteractive);
        cursorRef.current.classList.toggle("cursor-dot-hover", isInteractive);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    rafId = window.requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.cancelAnimationFrame(rafId);
      document.body.classList.remove("cursor-enabled");
    };
  }, []);

  if (!cursorEnabled) {
    return null;
  }

  return (
    <>
      <style>{`
        .cursor-enabled, .cursor-enabled * { cursor: none !important; }
        @media (hover: none) or (pointer: coarse) {
          .cursor-enabled, .cursor-enabled * { cursor: auto !important; }
          .cursor-dot, .cursor-ring { display: none !important; }
        }
        .cursor-dot {
          position: fixed; top: 0; left: 0;
          width: 8px; height: 8px;
          margin-left: -4px; margin-top: -4px;
          background: var(--pink, #f5a0c8);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: opacity 0.2s ease, transform 0.05s linear;
        }
        .cursor-dot-hide { opacity: 0; }
        .cursor-dot.cursor-dot-hover {
          background: #1a0808;
          box-shadow: 0 0 0 4px rgba(26, 8, 8, 0.12);
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0;
          width: 36px; height: 36px;
          margin-left: -18px; margin-top: -18px;
          border: 1.5px solid var(--pink, #f5a0c8);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transition: width 0.25s ease, height 0.25s ease, margin 0.25s ease, background 0.25s ease, border-color 0.25s ease;
          will-change: transform;
        }
        .cursor-ring.cursor-ring-grow {
          width: 60px; height: 60px;
          margin-left: -30px; margin-top: -30px;
          background: rgba(245, 160, 200, 0.36);
          border-color: var(--pink, #f5a0c8);
          box-shadow: 0 0 0 8px rgba(245, 160, 200, 0.08);
        }
      `}</style>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />
    </>
  );
}