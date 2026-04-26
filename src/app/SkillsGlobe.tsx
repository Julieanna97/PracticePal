"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiVercel,
  SiLinux,
  SiArduino,
  SiGit,
  SiGithub,
  SiFigma,
  SiStripe,
  SiJavascript,
} from "react-icons/si";
import { FaCode, FaServer } from "react-icons/fa6";

type Skill = {
  name: string;
  color: string;
  Icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
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

const additionalSkills = [
  "HTML", "CSS", "Bootstrap", "Radix UI", "SWR", "React Hook Form", "Zod",
  "Framer Motion", "WaveSurfer.js", "MediaPipe", "TensorFlow.js", "Express.js",
  "Flask", "WebSocket APIs", "Socket.IO", "NextAuth", "Mailchimp", "FFmpeg",
  "SQL", "NoSQL", "MariaDB", "phpMyAdmin", "Docker Compose",
  "Azure Container Registry", "Gunicorn", "Linux / Ubuntu", "Jira", "VS Code",
  "WordPress", "npm", "ESLint", "Prettier", "Postman", "Jupyter Notebook",
  "Turbopack", "Recharts", "date-fns", "next-themes", "ESP32", "LoRa",
  "RTOS / Zephyr", "Yocto", "UART / SPI / I2C / CAN", "GTest", "CMake",
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
  const dotsRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const radius = 1.9;

  const skillPositions = useMemo(
    () => fibonacciSphere(skills.length, radius * 1.18),
    [],
  );

  // Surface dots — these make the sphere visually readable as a globe
  const surfaceDots = useMemo(
    () => fibonacciSphere(180, radius * 1.005),
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
    if (dotsRef.current) {
      dotsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.18, 0]}>
      {/* Wireframe sphere — the actual visible globe */}
      <mesh>
        <sphereGeometry args={[radius, 24, 18]} />
        <meshBasicMaterial
          color={theme.pink}
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Solid inner sphere for depth — slightly smaller so wireframe shows */}
      <mesh>
        <sphereGeometry args={[radius * 0.985, 48, 48]} />
        <meshBasicMaterial color={theme.burg} transparent opacity={0.85} />
      </mesh>

      {/* Outer atmospheric glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.14, 48, 48]} />
        <meshBasicMaterial
          color={theme.pink}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Surface particle dots — orbit independently for shimmer */}
      <group ref={dotsRef}>
        {surfaceDots.map((dot, i) => (
          <mesh key={`surface-${i}`} position={dot}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial
              color={i % 5 === 0 ? theme.orange : theme.pink}
              transparent
              opacity={i % 5 === 0 ? 0.7 : 0.4}
            />
          </mesh>
        ))}
      </group>

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color={theme.pink} transparent opacity={0.75} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshBasicMaterial color={theme.pink} transparent opacity={0.07} />
      </mesh>

      {/* Orbit rings */}
      <group ref={orbitRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 1.02, 0.005, 8, 190]} />
          <meshBasicMaterial color={theme.pink} transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[0.75, 0.2, 0.3]}>
          <torusGeometry args={[radius * 1.06, 0.005, 8, 190]} />
          <meshBasicMaterial color={theme.orange} transparent opacity={0.28} />
        </mesh>
        <mesh rotation={[0.25, 1.08, 0.12]}>
          <torusGeometry args={[radius * 0.94, 0.004, 8, 190]} />
          <meshBasicMaterial color={theme.cream} transparent opacity={0.14} />
        </mesh>
        <mesh rotation={[1.05, 0.55, 0.8]}>
          <torusGeometry args={[radius * 1.15, 0.0035, 8, 190]} />
          <meshBasicMaterial color={theme.pink} transparent opacity={0.18} />
        </mesh>
      </group>

      {/* Skill orbs */}
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
          min-height: 760px;
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
          width: 48px;
          height: 48px;
          border-radius: 999px;
          background:
            radial-gradient(circle, color-mix(in srgb, var(--skill-color) 17%, transparent), transparent 68%);
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

        .skill-orb svg {
          position: relative;
          z-index: 1;
        }

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

        .additional-skills-wrap {
          position: relative;
          z-index: 5;
          width: min(1280px, calc(100% - 32px));
          margin-top: 6px;
          pointer-events: none;
        }

        .additional-skills-title {
          margin-bottom: 14px;
          text-align: center;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245,160,200,0.6);
        }

        .additional-skills-marquee {
          overflow: hidden;
          border-top: 1px solid rgba(245,160,200,0.18);
          border-bottom: 1px solid rgba(245,160,200,0.18);
          padding: 16px 0;
          background: rgba(46,14,14,0.4);
        }

        .additional-skills-track {
          display: inline-flex;
          gap: 10px;
          padding: 0 12px;
          white-space: nowrap;
          animation: additionalSkillsMove 42s linear infinite;
        }

        .additional-skill-chip {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(245,160,200,0.22);
          border-radius: 999px;
          padding: 8px 14px;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(240,236,228,0.78);
          background: rgba(245,160,200,0.04);
        }

        @keyframes additionalSkillsMove {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .skills-universe { min-height: 700px; }
          .skills-canvas-wrap { width: 100%; height: 540px; }
          .skill-orb { min-width: 62px; }
          .skill-orb-label { font-size: 0.58rem; }
          .additional-skills-wrap { width: calc(100% - 24px); margin-top: 4px; }
          .additional-skill-chip { font-size: 0.72rem; padding: 7px 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .additional-skills-track { animation: none; }
        }
      `}</style>

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

            <Stars
              radius={16}
              depth={14}
              count={550}
              factor={1.8}
              saturation={0}
              fade
              speed={0.24}
            />

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

      <div className="additional-skills-wrap">
        <div className="additional-skills-title">Also familiar with</div>
        <div className="additional-skills-marquee">
          <div className="additional-skills-track">
            {[...additionalSkills, ...additionalSkills].map((skill, index) => (
              <span key={`${skill}-${index}`} className="additional-skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}