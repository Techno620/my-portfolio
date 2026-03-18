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

type SkillGroup = {
  id: NodeId;
  title: string;
  subtitle: string;
  accentText: string;
  accentBg: string;
  borderClass: string;
  glow: string;
  technologies: TechItem[];
};

type Position = { x: number; y: number; depth: number };

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
    subtitle: "Responsive interfaces and modular component design.",
    accentText: "text-cyan-200",
    accentBg: "from-cyan-500/16 to-blue-500/5",
    borderClass: "border-cyan-300/30",
    glow: "hover:shadow-[0_16px_44px_-24px_rgba(34,211,238,0.55)]",
    technologies: [
      { name: "HTML", icon: SiHtml5, href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", icon: SiCss, href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "Tailwind", icon: SiTailwindcss, href: "https://tailwindcss.com/docs" },
      { name: "React", icon: SiReact, href: "https://react.dev/" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    subtitle: "Secure APIs, auth flows, and scalable service architecture.",
    accentText: "text-violet-200",
    accentBg: "from-violet-500/16 to-fuchsia-500/5",
    borderClass: "border-violet-300/35",
    glow: "hover:shadow-[0_16px_44px_-24px_rgba(168,85,247,0.55)]",
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
    subtitle: "Language fundamentals for writing clean, stable systems.",
    accentText: "text-sky-200",
    accentBg: "from-sky-500/16 to-indigo-500/5",
    borderClass: "border-sky-300/30",
    glow: "hover:shadow-[0_16px_44px_-24px_rgba(56,189,248,0.55)]",
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
    accentText: "text-emerald-200",
    accentBg: "from-emerald-500/16 to-teal-500/5",
    borderClass: "border-emerald-300/30",
    glow: "hover:shadow-[0_16px_44px_-24px_rgba(16,185,129,0.55)]",
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
    accentText: "text-amber-200",
    accentBg: "from-amber-500/16 to-orange-500/5",
    borderClass: "border-amber-300/30",
    glow: "hover:shadow-[0_16px_44px_-24px_rgba(245,158,11,0.55)]",
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
    subtitle: "Engineering fundamentals powering architecture decisions.",
    accentText: "text-pink-200",
    accentBg: "from-pink-500/16 to-rose-500/5",
    borderClass: "border-pink-300/30",
    glow: "hover:shadow-[0_16px_44px_-24px_rgba(244,114,182,0.55)]",
    technologies: [
      { name: "DSA", icon: Code2, href: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" },
      { name: "OOP", icon: Layers3, href: "https://docs.oracle.com/javase/tutorial/java/concepts/" },
      { name: "DBMS", icon: Database, href: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/" },
      { name: "API Design", icon: Network, href: "https://swagger.io/specification/" },
      { name: "Debugging", icon: Wrench, href: "https://code.visualstudio.com/docs/editor/debugging" },
    ],
  },
];

const NODE_POSITIONS: Record<NodeId, Position> = {
  backend: { x: 51, y: 50, depth: 0.2 },
  programming: { x: 51, y: 18, depth: 0.35 },
  frontend: { x: 23, y: 34, depth: 0.28 },
  databases: { x: 24, y: 72, depth: 0.3 },
  devops: { x: 78, y: 70, depth: 0.32 },
  core: { x: 79, y: 32, depth: 0.24 },
};

const EDGES: Array<{ from: NodeId; to: NodeId }> = [
  { from: "backend", to: "frontend" },
  { from: "backend", to: "programming" },
  { from: "backend", to: "databases" },
  { from: "backend", to: "devops" },
  { from: "backend", to: "core" },
  { from: "programming", to: "frontend" },
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
  onSelect,
}: {
  group: SkillGroup;
  active: boolean;
  position: Position;
  index: number;
  reduceMotion: boolean | null;
  pointer: { x: number; y: number };
  onSelect: (id: NodeId) => void;
}) => {
  const sizeClass = active ? "w-36 h-36 md:w-40 md:h-40" : "w-28 h-28 md:w-32 md:h-32";
  const iconCount = active ? 4 : 3;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(group.id)}
      className="absolute -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 rounded-full"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) translate3d(${pointer.x * position.depth * 90}px, ${pointer.y * position.depth * 90}px, 0)`,
      }}
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 4 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`relative ${sizeClass} rounded-full border bg-slate-950/45 backdrop-blur-xl transition-all duration-300 ${
          active ? `${group.borderClass} shadow-[0_0_44px_rgba(34,211,238,0.24)]` : "border-white/15"
        }`}
      >
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${group.accentBg}`} />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.24),transparent_56%)]" />
        {active && <span className="absolute -inset-1 rounded-full border border-white/15" />}

        <div className="relative z-10 flex h-full flex-wrap items-center justify-center gap-2 p-3">
          {group.technologies.slice(0, iconCount).map((tech) => {
            const Icon = tech.icon;
            return (
              <span
                key={`${group.id}-${tech.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/30 shadow-[0_0_14px_rgba(15,23,42,0.8)]"
              >
                <Icon size={15} className={TECH_ICON_COLOR[tech.name] ?? "text-cyan-300"} />
              </span>
            );
          })}
        </div>
      </div>
      <p className={`mt-3 text-[10px] font-mono font-black uppercase tracking-[0.18em] ${group.accentText}`}>{group.title}</p>
    </motion.button>
  );
};

const SkillsGalaxy = () => {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<NodeId>("backend");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const selectedGroup = useMemo(
    () => SKILL_GROUPS.find((group) => group.id === selectedId) ?? SKILL_GROUPS[1],
    [selectedId]
  );

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x, y });
  };

  return (
    <section className="section relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-[0.07]" />
        <motion.div
          animate={{ x: [0, 26, 0], y: [0, -20, 0], opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 left-16 w-72 h-72 rounded-full bg-cyan-500/14 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 26, 0], opacity: [0.24, 0.36, 0.24] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 right-10 w-80 h-80 rounded-full bg-violet-500/14 blur-[130px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-4xl mb-10"
        >
          <p className="text-[11px] font-mono font-black uppercase tracking-[0.34em] text-secondary/85">
            Skills.ControlCenter()
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl font-heading font-black text-white tracking-tight">
            IMPACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SKILLS GRID</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            A live architecture-style skills layout. Switch domains to explore the exact technologies I use in production workflows.
          </p>
        </motion.div>

        <div className="grid gap-7 xl:grid-cols-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-4 space-y-4"
          >
            {SKILL_GROUPS.map((group, index) => {
              const active = selectedId === group.id;
              return (
                <motion.button
                  key={group.id}
                  type="button"
                  onClick={() => setSelectedId(group.id)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left rounded-2xl border bg-slate-950/45 p-5 backdrop-blur-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 ${
                    active ? `${group.borderClass} ${group.glow}` : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-[10px] font-mono font-black uppercase tracking-[0.28em] ${group.accentText}`}>{group.title}</p>
                      <p className="mt-2 text-sm text-slate-300 leading-relaxed">{group.subtitle}</p>
                    </div>
                    <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest text-white/80">
                      {group.technologies.length}
                    </div>
                  </div>
                </motion.button>
              );
            })}

            <div className={`md:hidden mt-2 rounded-2xl border ${selectedGroup.borderClass} bg-slate-950/45 backdrop-blur-xl p-5`}>
              <p className={`text-[10px] font-mono font-black uppercase tracking-[0.26em] ${selectedGroup.accentText}`}>Selected</p>
              <h3 className="mt-2 text-xl font-heading font-black text-white">{selectedGroup.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{selectedGroup.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedGroup.technologies.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <a
                      key={tech.name}
                      href={tech.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-mono font-black uppercase tracking-wide text-white/90"
                    >
                      <Icon size={12} className={TECH_ICON_COLOR[tech.name] ?? "text-cyan-300"} />
                      {tech.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="xl:col-span-8 hidden md:block"
          >
            <div
              onPointerMove={onPointerMove}
              onPointerLeave={() => setPointer({ x: 0, y: 0 })}
              className="relative rounded-3xl border border-white/10 bg-slate-950/45 backdrop-blur-xl p-4 sm:p-6 min-h-[460px] md:min-h-[540px] overflow-hidden"
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {EDGES.map((edge, index) => {
                  const from = NODE_POSITIONS[edge.from];
                  const to = NODE_POSITIONS[edge.to];
                  const path = curvePath(from, to);
                  return (
                    <g key={`${edge.from}-${edge.to}`}>
                      <path d={path} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.16" />
                      <motion.path
                        d={path}
                        fill="none"
                        stroke="rgba(34,211,238,0.30)"
                        strokeWidth="0.23"
                        strokeDasharray="1.2 0.85"
                        animate={reduceMotion ? undefined : { strokeDashoffset: [0, -6] }}
                        transition={{ duration: 3 + index * 0.35, repeat: Infinity, ease: "linear" }}
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
                  onSelect={setSelectedId}
                />
              ))}
            </div>

            <div className={`mt-6 rounded-3xl border ${selectedGroup.borderClass} bg-slate-950/45 backdrop-blur-xl p-6 md:p-7`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedGroup.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className={`text-[10px] font-mono font-black uppercase tracking-[0.28em] ${selectedGroup.accentText}`}>Active Layer</p>
                      <h3 className="mt-2 text-2xl md:text-3xl font-heading font-black text-white">{selectedGroup.title}</h3>
                      <p className="mt-2 text-slate-300">{selectedGroup.subtitle}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-white/80">
                      <Server size={12} />
                      {selectedGroup.technologies.length} technologies
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {selectedGroup.technologies.map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <motion.a
                          key={tech.name}
                          href={tech.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.04 }}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[11px] font-mono font-black uppercase tracking-wider text-white/90 hover:border-secondary/35 hover:bg-white/[0.08] transition-all"
                        >
                          <Icon size={14} className={TECH_ICON_COLOR[tech.name] ?? "text-cyan-300"} />
                          {tech.name}
                          <ArrowUpRight size={12} className="text-white/60" />
                        </motion.a>
                      );
                    })}
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
