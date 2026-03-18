import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Database, Layers3, Network, Server, Wrench } from "lucide-react";
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
  subtitle: string;
  accent: AccentTone;
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
    subtitle: "Responsive interfaces and modular UI engineering.",
    accent: {
      textClass: "text-cyan-300",
      borderClass: "border-cyan-400/50",
      panelClass: "from-cyan-500/12 via-cyan-500/5 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(34,211,238,0.7)]",
      orbGlowClass: "shadow-[0_0_42px_rgba(34,211,238,0.2)]",
      lineColor: "rgba(34,211,238,0.72)",
    },
    technologies: [
      { name: "HTML", icon: SiHtml5, href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", icon: SiCss, href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "Tailwind", icon: SiTailwindcss, href: "https://tailwindcss.com/docs" },
      { name: "React", icon: SiReact, href: "https://react.dev/" },
    ],
  },
  {
    id: "backend",
    title: "Backend / MERN Stack",
    subtitle: "Secure APIs, auth flows, and scalable service architecture.",
    accent: {
      textClass: "text-emerald-300",
      borderClass: "border-emerald-400/55",
      panelClass: "from-emerald-500/14 via-emerald-500/6 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(52,211,153,0.75)]",
      orbGlowClass: "shadow-[0_0_48px_rgba(52,211,153,0.26)]",
      lineColor: "rgba(52,211,153,0.74)",
    },
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
    subtitle: "Foundations for clean, stable, and maintainable systems.",
    accent: {
      textClass: "text-sky-300",
      borderClass: "border-sky-400/45",
      panelClass: "from-sky-500/14 via-indigo-500/6 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(56,189,248,0.7)]",
      orbGlowClass: "shadow-[0_0_42px_rgba(56,189,248,0.22)]",
      lineColor: "rgba(56,189,248,0.7)",
    },
    technologies: [
      { name: "Java", icon: DiJava, href: "https://docs.oracle.com/en/java/" },
      { name: "JavaScript", icon: DiJavascript1, href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "SQL", icon: Database, href: "https://www.iso.org/standard/76583.html" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    subtitle: "Relational and NoSQL modeling with query optimization.",
    accent: {
      textClass: "text-orange-300",
      borderClass: "border-orange-400/50",
      panelClass: "from-orange-500/14 via-amber-500/6 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(251,146,60,0.72)]",
      orbGlowClass: "shadow-[0_0_42px_rgba(251,146,60,0.2)]",
      lineColor: "rgba(251,146,60,0.72)",
    },
    technologies: [
      { name: "MySQL", icon: SiMysql, href: "https://dev.mysql.com/doc/" },
      { name: "MongoDB", icon: SiMongodb, href: "https://www.mongodb.com/docs/" },
      { name: "PostgreSQL", icon: SiPostgresql, href: "https://www.postgresql.org/docs/" },
    ],
  },
  {
    id: "devops",
    title: "DevOps / Tools",
    subtitle: "Delivery workflows, cloud readiness, and operations tooling.",
    accent: {
      textClass: "text-violet-300",
      borderClass: "border-violet-400/55",
      panelClass: "from-violet-500/14 via-fuchsia-500/6 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(167,139,250,0.75)]",
      orbGlowClass: "shadow-[0_0_46px_rgba(167,139,250,0.25)]",
      lineColor: "rgba(167,139,250,0.72)",
    },
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
    subtitle: "System fundamentals powering architecture decisions.",
    accent: {
      textClass: "text-fuchsia-300",
      borderClass: "border-fuchsia-400/50",
      panelClass: "from-fuchsia-500/14 via-rose-500/6 to-transparent",
      glowClass: "hover:shadow-[0_14px_34px_-18px_rgba(232,121,249,0.75)]",
      orbGlowClass: "shadow-[0_0_44px_rgba(232,121,249,0.2)]",
      lineColor: "rgba(232,121,249,0.72)",
    },
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

const NODE_POSITIONS: Record<NodeId, Position> = {
  backend: { x: 50, y: 50, depth: 0.2 },
  programming: { x: 50, y: 18, depth: 0.34 },
  frontend: { x: 20, y: 35, depth: 0.28 },
  databases: { x: 26, y: 73, depth: 0.3 },
  devops: { x: 80, y: 71, depth: 0.32 },
  core: { x: 80, y: 33, depth: 0.26 },
};

const EDGES: Array<{ from: NodeId; to: NodeId }> = [
  { from: "core", to: "backend" },
  { from: "core", to: "frontend" },
  { from: "core", to: "programming" },
  { from: "core", to: "databases" },
  { from: "core", to: "devops" },
  { from: "backend", to: "frontend" },
  { from: "backend", to: "programming" },
  { from: "backend", to: "databases" },
  { from: "backend", to: "devops" },
];

const curvePath = (start: Position, end: Position) => {
  const dx = end.x - start.x;
  const c1x = start.x + dx * 0.38;
  const c2x = end.x - dx * 0.38;
  return `M ${start.x} ${start.y} C ${c1x} ${start.y - 4}, ${c2x} ${end.y + 4}, ${end.x} ${end.y}`;
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
  const isDimmed = Boolean(hoveredId) && !isFocused;

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
    <motion.button
      type="button"
      onClick={() => onSelect(group.id)}
      onMouseEnter={() => onHoverChange(group.id)}
      onMouseLeave={() => onHoverChange(null)}
      onFocus={() => onHoverChange(group.id)}
      onBlur={() => onHoverChange(null)}
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
        isDimmed ? "opacity-40" : "opacity-100"
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) translate3d(${parallaxX + magneticX}px, ${parallaxY + magneticY}px, 0)`,
      }}
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 4.8 + index * 0.26, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`relative ${sizeClass} rounded-full border bg-slate-900/45 backdrop-blur-md transition-all duration-300 ${
          active || isFocused ? `${group.accent.borderClass} ${group.accent.orbGlowClass}` : "border-slate-200/15"
        }`}
      >
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${group.accent.panelClass}`} />
        <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.24),transparent_65%)]" />

        <div className="relative z-10 flex h-full flex-wrap items-center justify-center gap-2 p-3">
          {group.technologies.slice(0, active ? 4 : 3).map((tech) => {
            const Icon = tech.icon;
            return (
              <span
                key={`${group.id}-${tech.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
              >
                <Icon size={15} className={TECH_ICON_COLOR[tech.name] ?? "text-cyan-300"} />
              </span>
            );
          })}
        </div>
      </div>

      <p className={`mt-3 text-[10px] font-mono font-black uppercase tracking-[0.2em] ${group.accent.textClass}`}>{group.title}</p>
    </motion.button>
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

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        id: index,
        x: Math.round(4 + Math.random() * 92),
        y: Math.round(4 + Math.random() * 92),
        size: index % 3 === 0 ? 3 : 2,
        delay: index * 0.24,
        duration: 11 + (index % 7),
      })),
    []
  );

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
    <section className="section relative overflow-hidden bg-slate-950/70">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(30,41,59,0.55),transparent_42%),radial-gradient(circle_at_84%_12%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_60%_88%,rgba(167,139,250,0.08),transparent_38%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.75)_0.8px, transparent_0.8px)",
            backgroundSize: "22px 22px",
          }}
        />

        <motion.div
          className="absolute -top-20 left-8 h-80 w-80 rounded-full bg-cyan-500/12 blur-[120px]"
          animate={reduceMotion ? undefined : { x: [0, 24, 0], y: [0, -16, 0], opacity: [0.26, 0.4, 0.26] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-6 -left-14 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]"
          animate={reduceMotion ? undefined : { x: [0, -12, 0], y: [0, 18, 0], opacity: [0.22, 0.35, 0.22] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-10 top-20 h-[26rem] w-[26rem] rounded-full bg-violet-500/10 blur-[130px]"
          animate={reduceMotion ? undefined : { x: [0, -26, 0], y: [0, 20, 0], opacity: [0.2, 0.34, 0.2] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />

        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-cyan-300/75"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={reduceMotion ? undefined : { y: [0, -11, 0], opacity: [0.25, 0.85, 0.25] }}
            transition={{
              delay: particle.delay,
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mb-10 max-w-4xl"
        >
          <p className="text-[11px] font-mono font-black uppercase tracking-[0.34em] text-cyan-300/90">Skills.ControlCenter()</p>
          <h2 className="mt-4 text-4xl font-heading font-black tracking-tight text-white md:text-6xl">
            3D <span className="text-cyan-300">SKILL GALAXY</span>
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
            Live architecture map of my stack. Select a layer to inspect technologies, docs links, and skill relationships in one interactive view.
          </p>
        </motion.div>

        <div className="grid items-start gap-5 xl:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3.5 xl:col-span-5"
          >
            {SKILL_GROUPS.map((group, index) => {
              const active = selectedId === group.id;
              return (
                <motion.button
                  key={group.id}
                  type="button"
                  onClick={() => setSelectedId(group.id)}
                  initial={{ opacity: 0, x: -16, y: 6 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1, duration: 0.35, ease: "easeOut" }}
                  whileHover={{ y: -3 }}
                  className={`group relative w-full overflow-hidden rounded-2xl border bg-slate-950/65 p-5 text-left backdrop-blur-md transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
                    active ? `${group.accent.borderClass} ${group.accent.glowClass}` : "border-slate-500/35 hover:border-slate-300/35"
                  }`}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${group.accent.panelClass} opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${active ? "opacity-100" : ""}`} />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-[10px] font-mono font-black uppercase tracking-[0.28em] ${group.accent.textClass}`}>{group.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{group.subtitle}</p>
                    </div>
                    <span className="shrink-0 rounded-lg border border-white/12 bg-slate-900/70 px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest text-slate-200">
                      {group.technologies.length}
                    </span>
                  </div>
                </motion.button>
              );
            })}

            <div className={`mt-2 rounded-2xl border bg-slate-950/70 p-5 backdrop-blur-md md:hidden ${selectedGroup.accent.borderClass}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedGroup.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <p className={`text-[10px] font-mono font-black uppercase tracking-[0.28em] ${selectedGroup.accent.textClass}`}>Active Layer</p>
                  <h3 className="mt-2 text-2xl font-heading font-black text-white">{selectedGroup.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{selectedGroup.subtitle}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedGroup.technologies.map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <motion.a
                          key={tech.name}
                          href={tech.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono font-black uppercase tracking-wide text-white/90"
                        >
                          <Icon size={12} className={TECH_ICON_COLOR[tech.name] ?? "text-cyan-300"} />
                          {tech.name}
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="hidden xl:col-span-7 md:block"
          >
            <div
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
              className="relative min-h-[520px] overflow-hidden rounded-[1.75rem] border border-slate-500/30 bg-slate-950/65 p-4 backdrop-blur-md sm:p-6"
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
                  {EDGES.map((edge, index) => {
                    const from = GROUP_LOOKUP[edge.from];
                    const to = GROUP_LOOKUP[edge.to];
                    return (
                      <linearGradient
                        key={`gradient-${edge.from}-${edge.to}`}
                        id={`edge-gradient-${index}`}
                        gradientUnits="userSpaceOnUse"
                        x1={NODE_POSITIONS[edge.from].x}
                        y1={NODE_POSITIONS[edge.from].y}
                        x2={NODE_POSITIONS[edge.to].x}
                        y2={NODE_POSITIONS[edge.to].y}
                      >
                        <stop offset="0%" stopColor={from.accent.lineColor} stopOpacity="0.84" />
                        <stop offset="100%" stopColor={to.accent.lineColor} stopOpacity="0.72" />
                      </linearGradient>
                    );
                  })}
                </defs>

                {EDGES.map((edge, index) => {
                  const from = NODE_POSITIONS[edge.from];
                  const to = NODE_POSITIONS[edge.to];
                  const path = curvePath(from, to);
                  const direction = edge.from === "core" ? -1 : 1;
                  return (
                    <g key={`${edge.from}-${edge.to}`}>
                      <path d={path} fill="none" stroke="rgba(148,163,184,0.16)" strokeWidth="0.18" />
                      <motion.path
                        d={path}
                        fill="none"
                        stroke={`url(#edge-gradient-${index})`}
                        strokeWidth="0.30"
                        strokeDasharray="1.6 1.4"
                        animate={reduceMotion ? undefined : { strokeDashoffset: [0, direction * 9], opacity: [0.35, 0.95, 0.35] }}
                        transition={{ duration: 3.4 + index * 0.28, repeat: Infinity, ease: "linear" }}
                      />
                    </g>
                  );
                })}
              </svg>

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

            <div className={`mt-5 rounded-[1.6rem] border bg-slate-950/70 p-6 backdrop-blur-md md:p-7 ${selectedGroup.accent.borderClass}`}>
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
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-slate-100">
                      <Server size={12} />
                      {selectedGroup.technologies.length} technologies
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <AnimatePresence mode="popLayout">
                      {selectedGroup.technologies.map((tech, index) => {
                        const Icon = tech.icon;
                        return (
                          <motion.a
                            key={`${selectedGroup.id}-${tech.name}`}
                            href={tech.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[11px] font-mono font-black uppercase tracking-wider text-white/90 transition-all hover:border-cyan-300/45 hover:bg-white/[0.08]"
                          >
                            <Icon size={14} className={TECH_ICON_COLOR[tech.name] ?? "text-cyan-300"} />
                            {tech.name}
                            <ArrowUpRight size={12} className="text-slate-400" />
                          </motion.a>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsGalaxy;
