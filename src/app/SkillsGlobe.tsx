"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiPython, SiFastapi, SiMongodb, SiMysql, SiDocker, SiVercel,
  SiLinux, SiArduino, SiGit, SiGithub, SiFigma, SiStripe, SiJavascript,
  // Icons for familiar-with marquee
  SiHtml5, SiCss, SiBootstrap, SiRadixui, SiVite, SiFramer,
  SiExpress, SiFlask, SiSocketdotio, SiFfmpeg, SiMariadb,
  SiJupyter, SiPostman, SiNpm, SiEslint, SiPrettier, SiWordpress,
  SiJira,
} from "react-icons/si";
import { FaCode, FaServer, FaMicrochip, FaDatabase, FaCloud } from "react-icons/fa6";

type Skill = {
  name: string;
  color: string;
  Icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
};

type FamiliarSkill = {
  name: string;
  Icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  color: string;
};

const theme = {
  burg: "#1a0808",
  burg2: "#2e0e0e",
  cream: "#f0ece4",
  pink: "#f5a0c8",
  orange: "#e8613a",
};

const skills: Skill[] = [
  { name: "React", color: "#61dafb", Icon: SiReact },
  { name: "Next.js", color: "#ffffff", Icon: SiNextdotjs },
  { name: "TypeScript", color: "#3178c6", Icon: SiTypescript },
  { name: "JavaScript", color: "#f7df1e", Icon: SiJavascript },
  { name: "Tailwind", color: "#38bdf8", Icon: SiTailwindcss },
  { name: "Node.js", color: "#68a063", Icon: SiNodedotjs },
  { name: "FastAPI", color: "#009688", Icon: SiFastapi },
  { name: "Python", color: "#ffd43b", Icon: SiPython },
  { name: "REST APIs", color: "#f5a0c8", Icon: FaServer },
  { name: "MongoDB", color: "#47a248", Icon: SiMongodb },
  { name: "MySQL", color: "#3e8dbb", Icon: SiMysql },
  { name: "Docker", color: "#2496ed", Icon: SiDocker },
  { name: "Azure", color: "#0078d4", Icon: FaServer },
  { name: "Vercel", color: "#ffffff", Icon: SiVercel },
  { name: "Linux", color: "#f5a0c8", Icon: SiLinux },
  { name: "Arduino", color: "#00979d", Icon: SiArduino },
  { name: "C/C++", color: "#e8613a", Icon: FaCode },
  { name: "Git", color: "#f05032", Icon: SiGit },
  { name: "GitHub", color: "#ffffff", Icon: SiGithub },
  { name: "Figma", color: "#ff6b2c", Icon: SiFigma },
  { name: "Stripe", color: "#8b5cf6", Icon: SiStripe },
];

// FAMILIAR-WITH MARQUEE — bigger, with icons, includes WordPress
const familiarSkills: FamiliarSkill[] = [
  { name: "HTML",          Icon: SiHtml5,        color: "#e34f26" },
  { name: "CSS",           Icon: SiCss,          color: "#1572b6" },
  { name: "Bootstrap",     Icon: SiBootstrap,    color: "#7952b3" },
  { name: "Radix UI",      Icon: SiRadixui,      color: "#ffffff" },
  { name: "Vite",          Icon: SiVite,         color: "#646cff" },
  { name: "Framer Motion", Icon: SiFramer,       color: "#ffffff" },
  { name: "WaveSurfer.js", Icon: FaCode,         color: "#f5a0c8" },
  { name: "MediaPipe",     Icon: FaCode,         color: "#4285f4" },
  { name: "TensorFlow.js", Icon: FaCode,         color: "#ff6f00" },
  { name: "Express.js",    Icon: SiExpress,      color: "#ffffff" },
  { name: "Flask",         Icon: SiFlask,        color: "#ffffff" },
  { name: "Socket.IO",     Icon: SiSocketdotio,  color: "#ffffff" },
  { name: "FFmpeg",        Icon: SiFfmpeg,       color: "#007808" },
  { name: "NextAuth",      Icon: FaServer,       color: "#a78bfa" },
  { name: "MariaDB",       Icon: SiMariadb,      color: "#003545" },
  { name: "WordPress",     Icon: SiWordpress,    color: "#21759b" },
  { name: "Jira",          Icon: SiJira,         color: "#0052cc" },
  { name: "Jupyter",       Icon: SiJupyter,      color: "#f37626" },
  { name: "Postman",       Icon: SiPostman,      color: "#ff6c37" },
  { name: "npm",           Icon: SiNpm,          color: "#cb3837" },
  { name: "ESLint",        Icon: SiEslint,       color: "#4b32c3" },
  { name: "Prettier",      Icon: SiPrettier,     color: "#f7b93e" },
  { name: "ESP32",         Icon: FaMicrochip,    color: "#f5a0c8" },
  { name: "LoRa",          Icon: FaMicrochip,    color: "#0066ff" },
  { name: "RTOS / Zephyr", Icon: FaMicrochip,    color: "#7cb518" },
  { name: "Yocto",         Icon: FaMicrochip,    color: "#9333ea" },
];

function fibonacciSphere(n: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < n; i += 1) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    );
  }
  return points;
}

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const radius = 1.9;

  const skillPositions = useMemo(
    () => fibonacciSphere(skills.length, radius * 1.18),
    [],
  );

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.075;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.00022) * 0.03;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y -= delta * 0.04;
      orbitRef.current.rotation.z += delta * 0.018;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.18, 0]}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial color={theme.burg2} transparent opacity={0.34} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.12, 64, 64]} />
        <meshBasicMaterial
          color={theme.pink}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[radius * 0.72, 48, 48]} />
        <meshBasicMaterial color={theme.pink} transparent opacity={0.035} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color={theme.pink} transparent opacity={0.75} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshBasicMaterial color={theme.pink} transparent opacity={0.07} />
      </mesh>

      <group ref={orbitRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 1.02, 0.005, 8, 190]} />
          <meshBasicMaterial color={theme.pink} transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[0.75, 0.2, 0.3]}>
          <torusGeometry args={[radius * 1.06, 0.005, 8, 190]} />
          <meshBasicMaterial color={theme.orange} transparent opacity={0.22} />
        </mesh>
        <mesh rotation={[0.25, 1.08, 0.12]}>
          <torusGeometry args={[radius * 0.94, 0.004, 8, 190]} />
          <meshBasicMaterial color={theme.cream} transparent opacity={0.11} />
        </mesh>
        <mesh rotation={[1.05, 0.55, 0.8]}>
          <torusGeometry args={[radius * 1.15, 0.0035, 8, 190]} />
          <meshBasicMaterial color={theme.pink} transparent opacity={0.13} />
        </mesh>
      </group>

      {skills.map((skill, index) => {
        const pos = skillPositions[index];
        const Icon = skill.Icon;
        const isHovered = hovered === skill.name;

        return (
          <Html
            key={skill.name}
            position={[pos.x, pos.y, pos.z]}
            center
            distanceFactor={7.8}
            occlude={false}
            style={{
              pointerEvents: "auto",
              userSelect: "none",
              zIndex: isHovered ? 20 : 1,
            }}
          >
            <button
              type="button"
              className={`skill-orb ${isHovered ? "skill-orb-active" : ""}`}
              style={{ "--skill-color": skill.color } as React.CSSProperties}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(skill.name)}
              onBlur={() => setHovered(null)}
              aria-label={skill.name}
            >
              <Icon size={isHovered ? 38 : 26} color={skill.color} />
              <span className="skill-orb-label">{skill.name}</span>
            </button>
          </Html>
        );
      })}
    </group>
  );
}

export default function SkillsGlobe() {
  return (
    <div className="skills-universe">
      <style>{`
        .skills-universe {
          position: relative;
          width: 100%;
          min-height: 820px;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 38%, rgba(245,160,200,0.1), transparent 34%),
            radial-gradient(circle at 55% 45%, rgba(232,97,58,0.08), transparent 28%),
            #1a0808;
          cursor: grab;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .skills-heading {
          position: relative;
          z-index: 5;
          text-align: center;
          padding-top: 8px;
          padding-bottom: 26px;
          pointer-events: none;
        }

        .skills-heading-kicker {
          font-family: "Barlow Condensed", sans-serif;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245,160,200,0.72);
          margin-bottom: 10px;
        }

        .skills-heading-title {
          font-family: "Barlow Condensed", sans-serif;
          font-size: clamp(4rem, 8vw, 7rem);
          font-weight: 900;
          line-height: 0.82;
          color: #f0ece4;
          letter-spacing: -0.045em;
          text-transform: uppercase;
        }

        .skills-heading-title span {
          color: #f5a0c8;
        }

        .skills-canvas-wrap {
          position: relative;
          z-index: 3;
          width: min(1080px, 100%);
          height: 620px;
          overflow: hidden;
        }

        .skill-orb {
          --skill-color: #f5a0c8;
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-width: 72px;
          border: 0;
          background: transparent;
          color: var(--skill-color);
          cursor: pointer;
          opacity: 0.64;
          filter: drop-shadow(0 0 10px color-mix(in srgb, var(--skill-color) 18%, transparent));
          transform: scale(1);
          transition: transform 0.2s ease, opacity 0.2s ease, filter 0.2s ease;
        }
        .skill-orb:hover,
        .skill-orb:focus-visible,
        .skill-orb-active {
          opacity: 1;
          transform: scale(1.14) translateY(-3px);
          filter:
            drop-shadow(0 0 12px color-mix(in srgb, var(--skill-color) 68%, transparent))
            drop-shadow(0 0 24px color-mix(in srgb, var(--skill-color) 28%, transparent));
          outline: none;
        }
        .skill-orb::before {
          content: "";
          position: absolute;
          width: 48px; height: 48px;
          border-radius: 999px;
          background: radial-gradient(circle, color-mix(in srgb, var(--skill-color) 17%, transparent), transparent 68%);
          border: 1px solid color-mix(in srgb, var(--skill-color) 12%, transparent);
          opacity: 0;
          transform: scale(0.65);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .skill-orb:hover::before,
        .skill-orb:focus-visible::before,
        .skill-orb-active::before {
          opacity: 1;
          transform: scale(1);
        }
        .skill-orb svg { position: relative; z-index: 1; }
        .skill-orb-label {
          position: relative;
          z-index: 1;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(240,236,228,0.62);
          transition: color 0.2s ease;
        }
        .skill-orb:hover .skill-orb-label,
        .skill-orb:focus-visible .skill-orb-label,
        .skill-orb-active .skill-orb-label {
          color: #f0ece4;
        }

        /* ── FAMILIAR-WITH MARQUEE — UPGRADED ── */
        .familiar-wrap {
          position: relative;
          z-index: 5;
          width: 100%;
          margin-top: 24px;
          padding: 32px 0 8px;
          pointer-events: none;
        }
        .familiar-title {
          margin-bottom: 22px;
          text-align: center;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245,160,200,0.7);
          display: inline-flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          justify-content: center;
        }
        .familiar-title::before,
        .familiar-title::after {
          content: "";
          height: 1px;
          width: 56px;
          background: rgba(245,160,200,0.4);
        }
        .familiar-marquee {
          overflow: hidden;
          padding: 18px 0;
          border-top: 1px solid rgba(245,160,200,0.18);
          border-bottom: 1px solid rgba(245,160,200,0.18);
          background:
            linear-gradient(90deg, rgba(26,8,8,0.8) 0%, transparent 6%, transparent 94%, rgba(26,8,8,0.8) 100%),
            rgba(46,14,14,0.4);
          position: relative;
        }
        .familiar-track {
          display: inline-flex;
          gap: 14px;
          padding: 0 14px;
          white-space: nowrap;
          animation: familiarMove 50s linear infinite;
        }
        .familiar-chip {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(245,160,200,0.25);
          border-radius: 999px;
          padding: 12px 22px;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(240,236,228,0.88);
          background: rgba(245,160,200,0.05);
          flex-shrink: 0;
          transition: all 0.3s ease;
          pointer-events: auto;
        }
        .familiar-chip:hover {
          background: rgba(245,160,200,0.12);
          border-color: var(--chip-color, #f5a0c8);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--chip-color, #f5a0c8) 50%, transparent);
        }
        .familiar-chip-icon {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes familiarMove {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .skills-universe { min-height: 760px; }
          .skills-heading { padding-bottom: 22px; }
          .skills-heading-title { font-size: clamp(3.2rem, 14vw, 5rem); }
          .skills-canvas-wrap { width: 100%; height: 540px; }
          .skill-orb { min-width: 62px; }
          .skill-orb-label { font-size: 0.58rem; }
          .familiar-title { font-size: 0.78rem; }
          .familiar-title::before, .familiar-title::after { width: 28px; }
          .familiar-chip { font-size: 0.85rem; padding: 9px 16px; gap: 9px; }
          .familiar-chip-icon svg { width: 16px; height: 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .familiar-track { animation: none; }
        }
      `}</style>

      <div className="skills-heading">
        <div className="skills-heading-kicker">Tech Stack</div>
        <div className="skills-heading-title">
          My <span>Skills</span>
        </div>
      </div>

      <div className="skills-canvas-wrap">
        <Canvas
          camera={{ position: [0, 0, 7.7], fov: 46 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.78} />
            <pointLight position={[4, 5, 5]} intensity={0.65} />
            <pointLight position={[-4, -3, 3]} intensity={0.3} color={theme.pink} />
            <Stars radius={16} depth={14} count={550} factor={1.8} saturation={0} fade speed={0.24} />
            <GlobeMesh />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.42}
              autoRotate
              autoRotateSpeed={0.28}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="familiar-wrap">
        <div className="familiar-title">Also familiar with</div>
        <div className="familiar-marquee">
          <div className="familiar-track">
            {[...familiarSkills, ...familiarSkills].map((skill, index) => {
              const Icon = skill.Icon;
              return (
                <span
                  key={`${skill.name}-${index}`}
                  className="familiar-chip"
                  style={{ "--chip-color": skill.color } as React.CSSProperties}
                  data-hover
                >
                  <span className="familiar-chip-icon">
                    <Icon size={20} color={skill.color} />
                  </span>
                  <span>{skill.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}