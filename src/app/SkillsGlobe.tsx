"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, Suspense, useState } from "react";
import * as THREE from "three";

type Skill = {
  name: string;
  category: string;
  icon: string;
};

const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", icon: "⚛" },
  { name: "Next.js", category: "frontend", icon: "▲" },
  { name: "TypeScript", category: "frontend", icon: "TS" },
  { name: "Tailwind", category: "frontend", icon: "≈" },
  { name: "Radix UI", category: "frontend", icon: "◈" },
  { name: "SWR", category: "frontend", icon: "↻" },
  { name: "Framer Motion", category: "frontend", icon: "◆" },

  // Backend
  { name: "Node.js", category: "backend", icon: "⬢" },
  { name: "FastAPI", category: "backend", icon: "⚡" },
  { name: "Python", category: "backend", icon: "Py" },
  { name: "Express", category: "backend", icon: "Ex" },
  { name: "Socket.IO", category: "backend", icon: "◎" },
  { name: "REST APIs", category: "backend", icon: "{}" },

  // Data
  { name: "MongoDB", category: "data", icon: "◐" },
  { name: "MySQL", category: "data", icon: "SQL" },
  { name: "SQL", category: "data", icon: "DB" },

  // Cloud
  { name: "Docker", category: "cloud", icon: "▣" },
  { name: "Azure", category: "cloud", icon: "A" },
  { name: "Vercel", category: "cloud", icon: "△" },
  { name: "Linux", category: "cloud", icon: "⌘" },

  // Systems
  { name: "C/C++", category: "systems", icon: "C++" },
  { name: "Arduino", category: "systems", icon: "∞" },
  { name: "ESP32", category: "systems", icon: "µC" },
  { name: "LoRa", category: "systems", icon: "⌁" },

  // Tools
  { name: "Git", category: "tools", icon: "⑂" },
  { name: "Figma", category: "tools", icon: "✦" },
  { name: "VS Code", category: "tools", icon: "</>" },
  { name: "Stripe", category: "tools", icon: "$" },
];

const categoryColor: Record<string, string> = {
  frontend: "#f5a0c8",
  backend: "#e8613a",
  data: "#ffb7d7",
  cloud: "#ff8d6a",
  systems: "#f5a0c8",
  tools: "#e8613a",
};

const categorySoftColor: Record<string, string> = {
  frontend: "rgba(245,160,200,0.16)",
  backend: "rgba(232,97,58,0.16)",
  data: "rgba(255,183,215,0.16)",
  cloud: "rgba(255,141,106,0.16)",
  systems: "rgba(245,160,200,0.16)",
  tools: "rgba(232,97,58,0.16)",
};

// Distribute points evenly on a sphere using fibonacci spiral
function fibonacciSphere(n: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }

  return points;
}

function OrbitRing({
  radius,
  rotation,
  color,
  opacity,
}: {
  radius: number;
  rotation: [number, number, number];
  color: string;
  opacity: number;
}) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.006, 8, 160]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function GlobeWireframe() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const radius = 2.15;
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.11;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.00025) * 0.04;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.055;
      innerRef.current.rotation.z += delta * 0.025;
    }
  });

  const positions = useMemo(
    () => fibonacciSphere(skills.length, radius * 1.18),
    [],
  );

  const dotPositions = useMemo(() => fibonacciSphere(170, radius), []);

  return (
    <group ref={groupRef}>
      {/* Soft outer glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.08, 48, 48]} />
        <meshBasicMaterial
          color="#f5a0c8"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner dark body */}
      <mesh>
        <sphereGeometry args={[radius * 0.99, 48, 48]} />
        <meshBasicMaterial color="#1a0808" transparent opacity={0.72} />
      </mesh>

      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[radius, 42, 42]} />
        <meshBasicMaterial
          color="#f5a0c8"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Second orange wireframe for depth */}
      <mesh rotation={[0.2, 0.45, 0.12]}>
        <sphereGeometry args={[radius * 0.96, 28, 28]} />
        <meshBasicMaterial
          color="#e8613a"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>

      {/* Orbit rings */}
      <group ref={innerRef}>
        <OrbitRing
          radius={radius * 1.07}
          rotation={[Math.PI / 2, 0, 0]}
          color="#f5a0c8"
          opacity={0.2}
        />
        <OrbitRing
          radius={radius * 1.04}
          rotation={[0.92, 0.25, 0.6]}
          color="#e8613a"
          opacity={0.16}
        />
        <OrbitRing
          radius={radius * 1.12}
          rotation={[0.25, 1.05, 0.15]}
          color="#f5a0c8"
          opacity={0.12}
        />
      </group>

      {/* Center core */}
      <mesh>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color="#f5a0c8" transparent opacity={0.9} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshBasicMaterial color="#f5a0c8" transparent opacity={0.08} />
      </mesh>

      {/* Particle dots on the surface */}
      {dotPositions.map((p, i) => {
        const isWarm = i % 4 === 0;
        return (
          <mesh key={`dot-${i}`} position={p}>
            <sphereGeometry args={[i % 9 === 0 ? 0.027 : 0.017, 10, 10]} />
            <meshBasicMaterial
              color={isWarm ? "#e8613a" : "#f5a0c8"}
              transparent
              opacity={isWarm ? 0.55 : 0.42}
            />
          </mesh>
        );
      })}

      {/* Skill tags floating outside the sphere */}
      {skills.map((skill, i) => {
        const pos = positions[i];
        const color = categoryColor[skill.category];
        const soft = categorySoftColor[skill.category];

        return (
            <Html
            key={skill.name}
            position={[pos.x, pos.y, pos.z]}
            center
            distanceFactor={6.3}
            occlude={false}
            style={{
                pointerEvents: "auto",
                userSelect: "none",
                cursor: "pointer",
                zIndex: hoveredSkill === skill.name ? 20 : 1,
            }}
            >
            <div
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: hoveredSkill === skill.name ? "0.95rem" : "0.82rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: hoveredSkill === skill.name ? "#1a0808" : color,
                background:
                    hoveredSkill === skill.name
                    ? `linear-gradient(135deg, ${color}, #f0ece4)`
                    : "linear-gradient(135deg, rgba(26,8,8,0.92), rgba(46,14,14,0.76))",
                border: `1px solid ${hoveredSkill === skill.name ? color : `${color}55`}`,
                boxShadow:
                    hoveredSkill === skill.name
                    ? `0 0 28px ${color}88, 0 0 55px ${color}44`
                    : `0 0 18px ${color}22, inset 0 0 18px ${soft}`,
                padding:
                    hoveredSkill === skill.name
                    ? "8px 13px 8px 8px"
                    : "6px 10px 6px 7px",
                borderRadius: "999px",
                whiteSpace: "nowrap",
                backdropFilter: "blur(9px)",
                WebkitBackdropFilter: "blur(9px)",
                transform:
                    hoveredSkill === skill.name
                    ? "scale(1.16) translateY(-3px)"
                    : "scale(1)",
                transition:
                    "transform 0.18s ease, background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease, padding 0.18s ease, font-size 0.18s ease",
                }}
            >
                <span
                style={{
                    width: hoveredSkill === skill.name ? "26px" : "22px",
                    height: hoveredSkill === skill.name ? "26px" : "22px",
                    borderRadius: "999px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: hoveredSkill === skill.name ? color : "#1a0808",
                    background: hoveredSkill === skill.name ? "#1a0808" : color,
                    fontSize: skill.icon.length > 2 ? "0.58rem" : "0.7rem",
                    fontWeight: 900,
                    letterSpacing: "0",
                    boxShadow: `0 0 12px ${color}55`,
                    transition: "all 0.18s ease",
                }}
                >
                {skill.icon}
                </span>
                <span>{skill.name}</span>
            </div>
            </Html>
        );
      })}
    </group>
  );
}

export default function SkillsGlobe() {
  return (
    <div
      style={{
        width: "100%",
        height: "min(72vh, 680px)",
        minHeight: "500px",
        position: "relative",
        cursor: "grab",
      }}
    >
      {/* Decorative background glow behind the canvas */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "8% 4%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(245,160,200,0.12), transparent 55%), radial-gradient(circle at 70% 35%, rgba(232,97,58,0.08), transparent 44%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", position: "relative", zIndex: 1 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.75} />
          <pointLight position={[4, 5, 5]} intensity={0.7} />
          <pointLight position={[-4, -3, 2]} intensity={0.3} color="#f5a0c8" />
          <GlobeWireframe />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.45}
            autoRotate
            autoRotateSpeed={0.35}
          />
        </Suspense>
      </Canvas>

      {/* Small corner label */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          zIndex: 2,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "0.72rem",
          fontWeight: 800,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(245, 160, 200, 0.55)",
          pointerEvents: "none",
        }}
      >
        Interactive stack map
      </div>

      {/* Hint text */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          zIndex: 2,
          transform: "translateX(-50%)",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 800,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(245, 160, 200, 0.52)",
          background: "rgba(26,8,8,0.58)",
          border: "1px solid rgba(245,160,200,0.18)",
          padding: "8px 14px",
          borderRadius: "999px",
          backdropFilter: "blur(8px)",
          pointerEvents: "none",
        }}
      >
        Drag to rotate
      </div>
    </div>
  );
}