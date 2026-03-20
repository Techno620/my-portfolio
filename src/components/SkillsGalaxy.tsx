import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Database, Layers3, Network, Server, Wrench, Layout, Cloud, Lightbulb, MonitorSmartphone } from "lucide-react";
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiHtml5,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import { DiJava, DiJavascript1 } from "react-icons/di";
import { FaAws } from "react-icons/fa";

type IconLike = React.ComponentType<{ size?: number | string; className?: string }>;

type NodeId = "frontend" | "backend" | "programming" | "databases" | "devops" | "core";

type TechItem = {
  name: string;
  icon: IconLike;
  href: string;
  level?: string;
  description?: string;
};

type AccentTone = {
  textClass: string;
  borderClass: string;
  panelClass: string;
  glowClass: string;
  orbGlowClass: string;
  lineColor: string;
};

type SkillGroup = {
  id: NodeId;
  title: string;
  shortName: string;
  subtitle: string;
  accent: AccentTone;
  groupIcon: IconLike;
  technologies: TechItem[];
};

type Position = { x: number; y: number; depth: number };

type PointerPoint = { x: number; y: number };

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const TECH_ICON_COLOR: Record<string, string> = {
  HTML: "text-[#E34F26]",
  CSS: "text-[#1572B6]",
  Tailwind: "text-[#38BDF8]",
  React: "text-[#61DAFB]",
  "Node.js": "text-[#68A063]",
  "Express.js": "text-[#E5E7EB]",
  PHP: "text-[#777BB4]",
  Laravel: "text-[#FF2D20]",
  JWT: "text-[#F59E0B]",
  "REST API": "text-[#22D3EE]",
  Java: "text-[#EA580C]",
  JavaScript: "text-[#F7DF1E]",
  SQL: "text-[#60A5FA]",
  MySQL: "text-[#00758F]",
  MongoDB: "text-[#10B981]",
  PostgreSQL: "text-[#336791]",
  Docker: "text-[#2496ED]",
  Git: "text-[#F05032]",
  AWS: "text-[#FF9900]",
  Linux: "text-[#FACC15]",
  DSA: "text-[#60A5FA]",
  OOP: "text-[#A78BFA]",
  DBMS: "text-[#22D3EE]",
  "API Design": "text-[#34D399]",
  Debugging: "text-[#FB7185]",
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    shortName: "FRONTEND",
    subtitle: "Responsive interfaces and modular UI engineering.",
    accent: {
      textClass: "text-[#00f0ff]",
      borderClass: "border-[#00f0ff]/80",
      panelClass: "from-[#00f0ff]/50 via-[#00f0ff]/20 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(0,240,255,0.7)]",
      orbGlowClass: "shadow-[0_0_50px_rgba(0,240,255,0.4)]",
      lineColor: "rgba(0,240,255,0.9)",
    },
    groupIcon: MonitorSmartphone,
    technologies: [
      { name: "HTML", icon: SiHtml5, href: "https://developer.mozilla.org/en-US/docs/Web/HTML", level: "Expert", description: "Semantic DOM architecture" },
      { name: "CSS", icon: SiCss, href: "https://developer.mozilla.org/en-US/docs/Web/CSS", level: "Expert", description: "Advanced layouts & specs" },
      { name: "Tailwind", icon: SiTailwindcss, href: "https://tailwindcss.com/docs", level: "Advanced", description: "Utility-first design engines" },
      { name: "React", icon: SiReact, href: "https://react.dev/", level: "Advanced", description: "Component-driven UIs" },
    ],
  },
  {
    id: "backend",
    title: "Backend / MERN Stack",
    shortName: "BACKEND",
    subtitle: "Secure APIs, auth flows, and scalable service architecture.",
    accent: {
      textClass: "text-[#00f0ff]",
      borderClass: "border-[#00f0ff]/80",
      panelClass: "from-[#00f0ff]/50 via-[#00f0ff]/20 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(0,240,255,0.7)]",
      orbGlowClass: "shadow-[0_0_50px_rgba(0,240,255,0.4)]",
      lineColor: "rgba(0,240,255,0.9)",
    },
    groupIcon: Server,
    technologies: [
      { name: "Node.js", icon: SiNodedotjs, href: "https://nodejs.org/en/docs" },
      { name: "Express.js", icon: SiExpress, href: "https://expressjs.com/" },
      { name: "PHP", icon: SiPhp, href: "https://www.php.net/docs.php" },
      { name: "Laravel", icon: SiLaravel, href: "https://laravel.com/docs" },
      { name: "JWT", icon: Network, href: "https://datatracker.ietf.org/doc/html/rfc7519" },
      { name: "REST API", icon: Server, href: "https://developer.mozilla.org/en-US/docs/Glossary/REST" },
    ],
  },
  {
    id: "programming",
    title: "Programming Languages",
    shortName: "LANGUAGES",
    subtitle: "Foundations for clean, stable, and maintainable systems.",
    accent: {
      textClass: "text-[#00f0ff]",
      borderClass: "border-[#00f0ff]/80",
      panelClass: "from-[#00f0ff]/50 via-[#00f0ff]/20 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(0,240,255,0.7)]",
      orbGlowClass: "shadow-[0_0_50px_rgba(0,240,255,0.4)]",
      lineColor: "rgba(0,240,255,0.9)",
    },
    groupIcon: Code2,
    technologies: [
      { name: "Java", icon: DiJava, href: "https://docs.oracle.com/en/java/" },
      { name: "JavaScript", icon: DiJavascript1, href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "SQL", icon: Database, href: "https://www.iso.org/standard/76583.html" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    shortName: "DATABASE",
    subtitle: "Relational and NoSQL modeling with query optimization.",
    accent: {
      textClass: "text-[#00f0ff]",
      borderClass: "border-[#00f0ff]/80",
      panelClass: "from-[#00f0ff]/50 via-[#00f0ff]/20 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(0,240,255,0.7)]",
      orbGlowClass: "shadow-[0_0_50px_rgba(0,240,255,0.4)]",
      lineColor: "rgba(0,240,255,0.9)",
    },
    groupIcon: Database,
    technologies: [
      { name: "MySQL", icon: SiMysql, href: "https://dev.mysql.com/doc/" },
      { name: "MongoDB", icon: SiMongodb, href: "https://www.mongodb.com/docs/" },
      { name: "PostgreSQL", icon: SiPostgresql, href: "https://www.postgresql.org/docs/" },
    ],
  },
  {
    id: "devops",
    title: "DevOps / Tools",
    shortName: "DEVOPS",
    subtitle: "Delivery workflows, cloud readiness, and operations tooling.",
    accent: {
      textClass: "text-[#00f0ff]",
      borderClass: "border-[#00f0ff]/80",
      panelClass: "from-[#00f0ff]/50 via-[#00f0ff]/20 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(0,240,255,0.7)]",
      orbGlowClass: "shadow-[0_0_50px_rgba(0,240,255,0.4)]",
      lineColor: "rgba(0,240,255,0.9)",
    },
    groupIcon: Cloud,
    technologies: [
      { name: "Docker", icon: SiDocker, href: "https://docs.docker.com/" },
      { name: "Git", icon: SiGit, href: "https://git-scm.com/doc" },
      { name: "AWS", icon: FaAws, href: "https://docs.aws.amazon.com/" },
      { name: "Linux", icon: SiLinux, href: "https://www.kernel.org/doc/" },
    ],
  },
  {
    id: "core",
    title: "Core Concepts",
    shortName: "CONCEPTS",
    subtitle: "System fundamentals powering architecture decisions.",
    accent: {
      textClass: "text-[#00f0ff]",
      borderClass: "border-[#00f0ff]/80",
      panelClass: "from-[#00f0ff]/50 via-[#00f0ff]/20 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(0,240,255,0.7)]",
      orbGlowClass: "shadow-[0_0_50px_rgba(0,240,255,0.4)]",
      lineColor: "rgba(0,240,255,0.9)",
    },
    groupIcon: Lightbulb,
    technologies: [
      { name: "DSA", icon: Code2, href: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" },
      { name: "OOP", icon: Layers3, href: "https://docs.oracle.com/javase/tutorial/java/concepts/" },
      { name: "DBMS", icon: Database, href: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/" },
      { name: "API Design", icon: Network, href: "https://swagger.io/specification/" },
      { name: "Debugging", icon: Wrench, href: "https://code.visualstudio.com/docs/editor/debugging" },
    ],
  },
];

const GROUP_LOOKUP = SKILL_GROUPS.reduce(
  (map, group) => {
    map[group.id] = group;
    return map;
  },
  {} as Record<NodeId, SkillGroup>
);

const NODE_POSITIONS: Record<NodeId | "center", Position> = {
  frontend: { x: 15, y: 50, depth: 0.28 },
  programming: { x: 30, y: 20, depth: 0.34 },
  core: { x: 70, y: 20, depth: 0.26 },
  devops: { x: 85, y: 50, depth: 0.32 },
  databases: { x: 70, y: 80, depth: 0.3 },
  backend: { x: 30, y: 80, depth: 0.2 },
  center: { x: 50, y: 50, depth: 0.1 },
};

const curvePath = (start: Position, end: Position) => {
  const dx = end.x - start.x;
  const c1x = start.x + dx * 0.5;
  const c2x = end.x - dx * 0.5;
  return `M ${start.x} ${start.y} C ${c1x} ${start.y}, ${c2x} ${end.y}, ${end.x} ${end.y}`;
};

const NodeOrb = ({
  group,
  active,
  position,
  index,
  reduceMotion,
  pointer,
  hoveredId,
  onSelect,
  onHoverChange,
}: {
  group: SkillGroup;
  active: boolean;
  position: Position;
  index: number;
  reduceMotion: boolean | null;
  pointer: PointerPoint;
  hoveredId: NodeId | null;
  onSelect: (id: NodeId) => void;
  onHoverChange: (id: NodeId | null) => void;
}) => {
  const isFocused = hoveredId === group.id;
  const isDimmed = false;

  const dx = pointer.x - position.x;
  const dy = pointer.y - position.y;
  const distance = Math.hypot(dx, dy);
  const proximity = clamp(1 - distance / 18, 0, 1);

  const parallaxX = reduceMotion ? 0 : (pointer.x - 50) * position.depth * 0.15;
  const parallaxY = reduceMotion ? 0 : (pointer.y - 50) * position.depth * 0.15;
  const magneticX = reduceMotion || !isFocused ? 0 : dx * proximity * 0.28;
  const magneticY = reduceMotion || !isFocused ? 0 : dy * proximity * 0.28;
  const sizeClass = active ? "h-40 w-40 md:h-44 md:w-44" : "h-32 w-32 md:h-36 md:w-36";

  return (
    <div
      className={`absolute z-20 ${isDimmed ? "opacity-30" : "opacity-100"} transition-opacity duration-500 pointer-events-none`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) translate3d(${parallaxX + magneticX}px, ${parallaxY + magneticY}px, 0)`,
        perspective: "1000px"
      }}
    >
      <motion.button
        type="button"
        onClick={() => onSelect(group.id)}
        onMouseEnter={() => onHoverChange(group.id)}
        onMouseLeave={() => onHoverChange(null)}
        onFocus={() => onHoverChange(group.id)}
        onBlur={() => onHoverChange(null)}
        className="relative outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 pointer-events-auto rounded-full flex flex-col items-center justify-center"
        initial={{ scale: 0.8, filter: "blur(10px)", opacity: 0 }}
        animate={reduceMotion ? { opacity: 1 } : { scale: 1, filter: "blur(0px)", opacity: 1, y: [0, -12, 0] }}
        transition={{ duration: 0.8, y: { duration: 4.8 + index * 0.26, repeat: Infinity, ease: "easeInOut" } }}
        whileHover={{ scale: 1.1, rotateX: 10, rotateY: -10 }}
        whileTap={{ scale: 0.98 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={`relative ${sizeClass} rounded-full transition-all duration-500 border backdrop-blur-3xl flex items-center justify-center bg-[#050b14]/70 ${
            active || isFocused 
              ? "border-[#00f0ff]/40 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.3),inset_-2px_-4px_10px_rgba(0,0,0,0.9),inset_0_0_12px_rgba(0,240,255,0.3),0_8px_20px_-8px_rgba(0,240,255,0.4)]" 
              : "border-white/10 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.15),inset_-2px_-4px_10px_rgba(0,0,0,0.9),0_8px_20px_-8px_rgba(0,0,0,0.8)]"
          }`}
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Subtle curved edge rim highlight */}
          <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          
          {/* Sharp top-left specular highlight */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12)_0%,transparent_35%)] pointer-events-none" />
          
          {/* Deep bottom-right shadow core */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_75%_75%,rgba(0,0,0,0.6)_0%,transparent_60%)] pointer-events-none" />
          
          {/* Internal Cyan Energy glow (only when active) */}
          <div className={`absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_60%)] transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`} />

          <div className="relative z-10 flex h-full items-center justify-center p-4">
            <span style={{ filter: (active || isFocused) ? "drop-shadow(0 0 10px rgba(0,240,255,0.6))" : "none" }}>
              <group.groupIcon 
                size={active ? 46 : 36} 
                className={`transition-colors duration-500 ${active || isFocused ? "text-[#00f0ff]" : "text-slate-400"}`} 
              />
            </span>
          </div>
        </div>

        <p 
          className={`absolute -bottom-8 whitespace-nowrap text-[14px] font-heading font-black tracking-[0.2em] transition-colors duration-500 ${active || isFocused ? "text-[#00f0ff]" : "text-slate-400"}`} 
          style={{ filter: isFocused || active ? "drop-shadow(0 0 4px rgba(0,240,255,0.6))" : "none" }}
        >
          {group.shortName}
        </p>
      </motion.button>
    </div>
  );
};

const SkillsGalaxy = () => {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<NodeId>("backend");
  const [pointer, setPointer] = useState<PointerPoint>({ x: 50, y: 50 });
  const [hoveredId, setHoveredId] = useState<NodeId | null>(null);

  const selectedGroup = useMemo(
    () => SKILL_GROUPS.find((group) => group.id === selectedId) ?? SKILL_GROUPS[1],
    [selectedId]
  );

  const dynamicEdges = useMemo(() => {
    return SKILL_GROUPS.map(g => ({ from: "center" as const, to: g.id as NodeId }));
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y });

    if (reduceMotion) return;

    let nearest: NodeId | null = null;
    let nearestDistance = Infinity;

    SKILL_GROUPS.forEach((group) => {
      const pos = NODE_POSITIONS[group.id];
      const distance = Math.hypot(x - pos.x, y - pos.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = group.id;
      }
    });

    setHoveredId(nearestDistance <= 16 ? nearest : null);
  };

  const resetPointer = () => {
    setPointer({ x: 50, y: 50 });
    setHoveredId(null);
  };

  return (
    <section className="section relative overflow-hidden bg-transparent">

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mb-10 max-w-4xl"
        >
          <p className="text-[11px] font-mono font-black uppercase tracking-[0.34em] text-cyan-300/90">Skills.ControlCenter()</p>
          <h2 className="mt-4 text-4xl font-heading font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            Interactive System <span className="text-cyan-300">Architecture</span>
          </h2>
          <p className="mt-4 max-w-3xl text-base tracking-wide leading-relaxed text-slate-300 md:text-lg">
            Explore my full-stack engineering stack. Select a layer to inspect technologies, data flow, and system relationships.
          </p>
        </motion.div>

        <div className="grid items-start gap-5 lg:gap-8 xl:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full xl:col-span-12"
          >
            <div
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
              className="relative min-h-[520px] overflow-visible w-full h-full"
            >
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: hoveredId ? 0.9 : 0.5,
                  background: `radial-gradient(250px circle at ${pointer.x}% ${pointer.y}%, rgba(34,211,238,0.16), transparent 62%)`,
                }}
              />

              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  {dynamicEdges.map((edge, index) => (
                    <linearGradient
                      key={`gradient-active-${index}`}
                      id={`edge-gradient-active-${index}`}
                      gradientUnits="userSpaceOnUse"
                      x1={NODE_POSITIONS[edge.from].x}
                      y1={NODE_POSITIONS[edge.from].y}
                      x2={NODE_POSITIONS[edge.to].x}
                      y2={NODE_POSITIONS[edge.to].y}
                    >
                      <stop offset="0%" stopColor="rgba(0,240,255,0)" />
                      <stop offset="50%" stopColor="rgba(0,240,255,0.8)" />
                      <stop offset="100%" stopColor="rgba(0,240,255,0)" />
                    </linearGradient>
                  ))}
                  {/* Subtle inactive gradient */}
                  {dynamicEdges.map((edge, index) => (
                    <linearGradient
                      key={`gradient-inactive-${index}`}
                      id={`edge-gradient-inactive-${index}`}
                      gradientUnits="userSpaceOnUse"
                      x1={NODE_POSITIONS[edge.from].x}
                      y1={NODE_POSITIONS[edge.from].y}
                      x2={NODE_POSITIONS[edge.to].x}
                      y2={NODE_POSITIONS[edge.to].y}
                    >
                      <stop offset="0%" stopColor="rgba(148,163,184,0)" />
                      <stop offset="50%" stopColor="rgba(148,163,184,0.2)" />
                      <stop offset="100%" stopColor="rgba(148,163,184,0)" />
                    </linearGradient>
                  ))}
                </defs>

                {dynamicEdges.map((edge, index) => {
                  const from = NODE_POSITIONS[edge.from];
                  const to = NODE_POSITIONS[edge.to];
                  const path = curvePath(from, to);
                  const isActiveEdge = true;
                  return (
                    <g key={`${edge.from}-${edge.to}`}>
                      {/* Core sharp line */}
                      <motion.path 
                        d={path} 
                        fill="none" 
                        stroke={isActiveEdge ? `url(#edge-gradient-active-${index})` : `url(#edge-gradient-inactive-${index})`} 
                        strokeWidth="1.5" 
                        className="transition-all duration-700" 
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{ filter: isActiveEdge ? "drop-shadow(0 0 4px rgba(0,240,255,0.5))" : "none" }}
                      />
                      {/* Soft glow layer */}
                      {isActiveEdge && (
                        <motion.path 
                          d={path} 
                          fill="none" 
                          stroke={`url(#edge-gradient-active-${index})`} 
                          strokeWidth="6" 
                          className="blur-[6px] transition-all duration-700"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.5 }}
                          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        />
                      )}
                      {/* Animated Data Packets / Particles */}
                      {isActiveEdge && (
                        <motion.path
                          d={path}
                          fill="none"
                          stroke="#00f0ff"
                          strokeWidth="2.5"
                          strokeDasharray="2 40" // Small dots separated by 40px
                          strokeLinecap="round"
                          animate={reduceMotion ? undefined : { strokeDashoffset: [42, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                          style={{ filter: "drop-shadow(0 0 6px rgba(0,240,255,1))" }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Central Core UI */}
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                  <div className="absolute inset-0 rounded-full animate-ping bg-cyan-400/20" style={{ animationDuration: '3s' }} />
                  <div className="h-10 w-10 rounded-full bg-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.8)] flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
                <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] font-heading font-black tracking-[0.2em] text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                  SYSTEM CORE
                </p>
              </div>

              {SKILL_GROUPS.map((group, index) => (
                <NodeOrb
                  key={group.id}
                  group={group}
                  active={group.id === selectedId}
                  position={NODE_POSITIONS[group.id]}
                  index={index}
                  reduceMotion={reduceMotion}
                  pointer={pointer}
                  hoveredId={hoveredId}
                  onSelect={setSelectedId}
                  onHoverChange={setHoveredId}
                />
              ))}
            </div>

          </motion.div>
        </div>

        {/* Global Active Layer Details spanning full width at bottom */}
        <div className={`mt-8 rounded-[1.6rem] border bg-slate-950/70 p-6 backdrop-blur-md md:p-8 xl:col-span-12 ${selectedGroup.accent.borderClass}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedGroup.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className={`text-[10px] font-mono font-black uppercase tracking-[0.3em] ${selectedGroup.accent.textClass}`}>Active Layer</p>
                  <h3 className="mt-2 text-2xl font-heading font-black text-white md:text-3xl">{selectedGroup.title}</h3>
                  <p className="mt-2 max-w-xl text-slate-300">{selectedGroup.subtitle}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[11px] font-mono font-black uppercase tracking-widest text-slate-100">
                  <Server size={14} />
                  {selectedGroup.technologies.length} technologies
                </span>
              </div>

              {/* Display all active technologies wrapped perfectly inside the full-width grid container */}
              <div className="mt-10 flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 w-full">
                <AnimatePresence mode="popLayout">
                  {selectedGroup.technologies.map((tech, index) => {
                    const Icon = tech.icon;
                    return (
                      <motion.a
                        key={`${selectedGroup.id}-${tech.name}`}
                        href={tech.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={tech.description || `Explore ${tech.name} framework documentation`}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        whileHover={{ scale: 1.05, rotateX: 8, rotateY: -8 }}
                        transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                        className="group relative w-[140px] sm:w-[170px] flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#0a0f1c]/80 p-6 backdrop-blur-xl transition-all hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] overflow-hidden cursor-pointer"
                        style={{ transformStyle: "preserve-3d", perspective: "800px" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div style={{ transform: "translateZ(20px)" }} className="flex flex-col items-center gap-3 w-full">
                          <Icon size={46} className={`${TECH_ICON_COLOR[tech.name] ?? "text-cyan-300"} drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-300`} />
                          <span className="text-[12px] font-mono font-black uppercase tracking-widest text-white/90 group-hover:text-white mt-1 text-center">
                            {tech.name}
                          </span>
                          {tech.level && (
                            <span className="mt-1 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-400/30 transition-colors">
                              {tech.level}
                            </span>
                          )}
                        </div>
                        <ArrowUpRight size={14} style={{ transform: "translateZ(30px)" }} className="absolute top-3 right-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkillsGalaxy;
