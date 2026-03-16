import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, ArrowRight } from "lucide-react";
import { useMedia } from "react-use";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiBootstrap,
  SiDocker,
  SiGithub,
  SiGit,
  SiPostman,
  SiLaravel,
  SiPhp,
} from "react-icons/si";
import { DiJavascript1, DiJava } from "react-icons/di";

const COLOR_PRESETS = {
  frontend: {
    glow: "shadow-[0_0_40px_rgb(56_189_248_/_0.16)]",
    border: "border-cyan-400/25",
    from: "from-cyan-400/25",
    to: "to-cyan-400/5",
    text: "text-cyan-300",
  },
  backend: {
    glow: "shadow-[0_0_40px_rgb(168_85_247_/_0.16)]",
    border: "border-fuchsia-400/25",
    from: "from-fuchsia-500/25",
    to: "to-fuchsia-500/5",
    text: "text-fuchsia-300",
  },
  databases: {
    glow: "shadow-[0_0_40px_rgb(34_197_94_/_0.16)]",
    border: "border-emerald-400/25",
    from: "from-emerald-400/25",
    to: "to-emerald-400/5",
    text: "text-emerald-300",
  },
  tools: {
    glow: "shadow-[0_0_40px_rgb(249_115_22_/_0.16)]",
    border: "border-orange-400/25",
    from: "from-orange-400/25",
    to: "to-orange-400/5",
    text: "text-orange-300",
  },
  programming: {
    glow: "shadow-[0_0_40px_rgb(34_211_238_/_0.14)]",
    border: "border-cyan-300/20",
    from: "from-cyan-300/25",
    to: "to-cyan-300/5",
    text: "text-cyan-200",
  },
  core: {
    glow: "shadow-[0_0_40px_rgb(236_72_153_/_0.16)]",
    border: "border-pink-400/25",
    from: "from-pink-400/25",
    to: "to-pink-400/5",
    text: "text-pink-300",
  },
};

const ICONS = {
  Java: DiJava,
  JavaScript: DiJavascript1,
  SQL: Layers,
  "HTML5": Layers,
  "CSS3": Layers,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  "React.js": SiReact,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  PHP: SiPhp,
  Laravel: SiLaravel,
  "RESTful APIs": Layers,
  "Middleware Integration": Layers,
  "JWT Authentication": Layers,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  "VS Code": Layers,
  Docker: SiDocker,
  "Data Structures & Algorithms": Layers,
  "Object-Oriented Programming": Layers,
  DBMS: Layers,
  "API Design": Layers,
  Debugging: Layers,
};

const DOCS = {
  Java: "https://docs.oracle.com/en/java/",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  SQL: "https://www.iso.org/standard/76583.html",
  HTML5: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  CSS3: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  "Tailwind CSS": "https://tailwindcss.com/docs",
  Bootstrap: "https://getbootstrap.com/docs/",
  "React.js": "https://react.dev/",
  "Node.js": "https://nodejs.org/en/docs",
  "Express.js": "https://expressjs.com/",
  PHP: "https://www.php.net/docs.php",
  Laravel: "https://laravel.com/docs",
  "RESTful APIs": "https://developer.mozilla.org/en-US/docs/Glossary/REST",
  "Middleware Integration": "https://expressjs.com/en/guide/using-middleware.html",
  "JWT Authentication": "https://datatracker.ietf.org/doc/html/rfc7519",
  MySQL: "https://dev.mysql.com/doc/",
  MongoDB: "https://www.mongodb.com/docs/",
  PostgreSQL: "https://www.postgresql.org/docs/",
  Git: "https://git-scm.com/doc",
  GitHub: "https://docs.github.com/",
  Postman: "https://learning.postman.com/docs/",
  "VS Code": "https://code.visualstudio.com/docs",
  Docker: "https://docs.docker.com/",
  "Data Structures & Algorithms": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
  "Object-Oriented Programming": "https://docs.oracle.com/javase/tutorial/java/concepts/",
  DBMS: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
  "API Design": "https://swagger.io/specification/",
  Debugging: "https://code.visualstudio.com/docs/editor/debugging",
};

const SPHERE_BG = {
  frontend:
    "radial-gradient(120px circle at 30% 25%, rgba(255,255,255,0.20), transparent 55%), radial-gradient(140px circle at 70% 80%, rgba(56,189,248,0.18), transparent 60%), linear-gradient(145deg, rgba(56,189,248,0.20), rgba(15,23,42,0.30))",
  backend:
    "radial-gradient(120px circle at 30% 25%, rgba(255,255,255,0.20), transparent 55%), radial-gradient(140px circle at 70% 80%, rgba(168,85,247,0.18), transparent 60%), linear-gradient(145deg, rgba(168,85,247,0.20), rgba(15,23,42,0.30))",
  databases:
    "radial-gradient(120px circle at 30% 25%, rgba(255,255,255,0.20), transparent 55%), radial-gradient(140px circle at 70% 80%, rgba(34,197,94,0.18), transparent 60%), linear-gradient(145deg, rgba(34,197,94,0.18), rgba(15,23,42,0.30))",
  tools:
    "radial-gradient(120px circle at 30% 25%, rgba(255,255,255,0.20), transparent 55%), radial-gradient(140px circle at 70% 80%, rgba(249,115,22,0.18), transparent 60%), linear-gradient(145deg, rgba(249,115,22,0.18), rgba(15,23,42,0.30))",
  programming:
    "radial-gradient(120px circle at 30% 25%, rgba(255,255,255,0.20), transparent 55%), radial-gradient(140px circle at 70% 80%, rgba(34,211,238,0.16), transparent 60%), linear-gradient(145deg, rgba(34,211,238,0.18), rgba(15,23,42,0.30))",
  core:
    "radial-gradient(120px circle at 30% 25%, rgba(255,255,255,0.20), transparent 55%), radial-gradient(140px circle at 70% 80%, rgba(236,72,153,0.18), transparent 60%), linear-gradient(145deg, rgba(236,72,153,0.18), rgba(15,23,42,0.30))",
};

const BASE_NODES = [
  {
    id: "programming",
    title: "Programming Languages",
    tone: "programming",
    items: ["Java", "JavaScript", "SQL"],
    pos: { x: 50, y: 14 },
  },
  {
    id: "frontend",
    title: "Frontend Development",
    tone: "frontend",
    items: ["HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "React.js"],
    pos: { x: 22, y: 42 },
  },
  {
    id: "backend",
    title: "Backend Development",
    tone: "backend",
    items: [
      "Node.js",
      "Express.js",
      "PHP",
      "Laravel",
      "RESTful APIs",
      "Middleware Integration",
      "JWT Authentication",
    ],
    pos: { x: 58, y: 44 },
  },
  {
    id: "databases",
    title: "Databases",
    tone: "databases",
    items: ["MySQL", "MongoDB", "PostgreSQL"],
    pos: { x: 40, y: 74 },
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    tone: "tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Docker"],
    pos: { x: 78, y: 66 },
  },
  {
    id: "core",
    title: "Core Concepts",
    tone: "core",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "API Design", "Debugging"],
    pos: { x: 78, y: 28 },
  },
];

const EDGES = [
  { id: "p-fe", from: "programming", to: "frontend" },
  { id: "p-be", from: "programming", to: "backend" },
  { id: "fe-be", from: "frontend", to: "backend" },
  { id: "be-db", from: "backend", to: "databases" },
  { id: "be-tools", from: "backend", to: "tools" },
  { id: "be-core", from: "backend", to: "core" },
];

const curvePath = (a, b) => {
  const dx = b.x - a.x;
  const cx1 = a.x + dx * 0.35;
  const cy1 = a.y;
  const cx2 = b.x - dx * 0.35;
  const cy2 = b.y;
  return `M ${a.x} ${a.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${b.x} ${b.y}`;
};

const FloatingDot = ({ i }) => {
  const left = useMemo(() => 8 + ((i * 37) % 84), [i]);
  const top = useMemo(() => 12 + ((i * 53) % 76), [i]);
  const size = useMemo(() => 1.5 + ((i * 7) % 5), [i]);
  const duration = useMemo(() => 8 + ((i * 3) % 10), [i]);
  const delay = useMemo(() => (i % 8) * 0.6, [i]);
  const opacity = useMemo(() => 0.12 + ((i % 5) * 0.03), [i]);

  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, opacity }}
      animate={{ y: [0, -18, 0], opacity: [opacity, opacity + 0.08, opacity] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

const Badge = ({ label }) => {
  const Icon = ICONS[label] ?? Layers;
  const href = DOCS[label];
  return (
    <motion.a
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono font-black uppercase tracking-widest text-white/80 hover:border-white/20 hover:bg-white/10 transition-colors"
      title={`Open official docs: ${label}`}
    >
      <Icon size={14} className="text-white/70" />
      {label}
    </motion.a>
  );
};

const MobileCards = ({ nodes }) => {
  const [open, setOpen] = useState(nodes[0]?.id);

  return (
    <div className="space-y-4">
      {nodes.map((node) => {
        const preset = COLOR_PRESETS[node.tone];
        const expanded = open === node.id;
        return (
          <div key={node.id} className="tech-card bg-surface/25 backdrop-blur-xl border-white/10">
            <button
              onClick={() => setOpen(expanded ? null : node.id)}
              className="w-full p-6 flex items-center justify-between gap-4"
            >
              <div className="text-left">
                <p className={`text-[10px] font-mono font-black uppercase tracking-[0.35em] ${preset.text}`}>
                  {node.title}
                </p>
                <p className="text-white font-heading font-black text-lg mt-2">Tap to explore</p>
              </div>
              <ArrowRight className={`transition-transform ${expanded ? "rotate-90" : ""}`} />
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="px-6 pb-6"
                >
                  <div className="flex flex-wrap gap-2">
                    {node.items.map((t) => (
                      <Badge key={t} label={t} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const SkillsSystemArchitecture = () => {
  const isMobile = useMedia("(max-width: 640px)");
  const isTablet = useMedia("(max-width: 1024px)");
  const [selected, setSelected] = useState(BASE_NODES[2]?.id); // backend default

  const nodes = useMemo(() => {
    if (!isTablet) return BASE_NODES;
    return BASE_NODES.map((n) => ({
      ...n,
      pos: {
        x: n.pos.x * 0.96 + 2,
        y: n.pos.y * 0.96 + 2,
      },
    }));
  }, [isTablet]);

  const nodeById = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const selectedNode = nodeById[selected] ?? nodes[0];

  const panelPreset = COLOR_PRESETS[selectedNode.tone];

  return (
    <section className="section relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(700px circle at 20% 20%, rgba(99,102,241,0.12), transparent 55%), radial-gradient(700px circle at 80% 70%, rgba(236,72,153,0.10), transparent 55%), radial-gradient(900px circle at 55% 95%, rgba(34,197,94,0.08), transparent 60%)",
          }}
        />
        {Array.from({ length: 26 }).map((_, i) => (
          <FloatingDot key={i} i={i} />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-10">
          <div className="flex items-center gap-4 text-primary mb-6">
            <span className="w-12 h-px bg-primary/50" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.4em]">
              Skills.Map()
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter leading-tight">
            SYSTEM <span className="text-gradient">ARCHITECTURE</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground font-medium leading-relaxed">
            Explore the technologies that power my full-stack development workflow.
          </p>
        </div>

        {isMobile ? (
          <MobileCards nodes={nodes} />
        ) : (
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="relative h-[620px] rounded-2xl border-2 border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(99,102,241,0.55)" />
                      <stop offset="50%" stopColor="rgba(236,72,153,0.35)" />
                      <stop offset="100%" stopColor="rgba(34,197,94,0.35)" />
                    </linearGradient>
                  </defs>

                  {EDGES.map((e) => {
                    const a = nodeById[e.from]?.pos;
                    const b = nodeById[e.to]?.pos;
                    if (!a || !b) return null;
                    const d = curvePath(a, b);
                    return (
                      <path
                        key={e.id}
                        d={d}
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        className="arch-line"
                        opacity="0.55"
                      />
                    );
                  })}
                </svg>

                {nodes.map((node, idx) => {
                  const preset = COLOR_PRESETS[node.tone];
                  const isActive = selected === node.id;
                  const floatDelay = (idx % 6) * 0.35;
                  const floatDuration = 6.5 + (idx % 5) * 0.6;

                  return (
                    <div
                      key={node.id}
                      className="absolute"
                      style={{
                        left: `${node.pos.x}%`,
                        top: `${node.pos.y}%`,
                      }}
                    >
                      <div className="-translate-x-1/2 -translate-y-1/2">
                        <div
                          className="arch-float"
                          style={{
                            animationDuration: `${floatDuration}s`,
                            animationDelay: `${floatDelay}s`,
                          }}
                        >
                          <motion.button
                            type="button"
                            onClick={() => setSelected(node.id)}
                            className={`relative w-36 h-36 md:w-40 md:h-40 rounded-full border-2 backdrop-blur-xl cursor-pointer will-change-transform transition-all flex flex-col items-center justify-center text-center px-4 shadow-[inset_0_-18px_40px_rgba(0,0,0,0.35)] ${
                              isActive ? `${preset.border} ${preset.glow}` : "border-white/10 hover:border-white/20"
                            }`}
                            style={{ background: SPHERE_BG[node.tone] }}
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.25 }}
                            whileHover={{ scale: 1.04 }}
                          >
                            <span className="absolute inset-0 rounded-full pointer-events-none">
                              <span className="absolute inset-0 rounded-full opacity-70 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22),transparent_58%)]" />
                              <span className="absolute inset-0 rounded-full opacity-70 bg-[radial-gradient(circle_at_65%_80%,rgba(0,0,0,0.35),transparent_55%)]" />
                            </span>

                            <p className={`text-[10px] font-mono font-black uppercase tracking-[0.32em] ${preset.text}`}>
                              {node.title}
                            </p>
                            <p className="text-white font-heading font-black text-base mt-2">
                              {node.items.length} Tech
                            </p>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                  <div className="absolute inset-0 bg-grid" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className={`tech-card p-8 bg-surface/20 backdrop-blur-xl border-2 ${panelPreset.border}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`text-[10px] font-mono font-black uppercase tracking-[0.35em] ${panelPreset.text}`}>
                      Selected
                    </p>
                    <h3 className="text-2xl font-heading font-black text-white mt-2">
                      {selectedNode.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="w-10 h-10 rounded-md border-2 border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/20 transition-all flex items-center justify-center"
                    aria-label="Clear selection"
                    title="Clear selection"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <AnimatePresence mode="popLayout">
                    {selectedNode.items.map((t) => (
                      <Badge key={t} label={t} />
                    ))}
                  </AnimatePresence>
                </div>

                <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/5">
                  <p className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-slate-400">
                    Hint
                  </p>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed mt-3">
                    Click a node to explore its technologies. Hover nodes to amplify glow. The connections represent how I
                    design and ship full-stack systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          .arch-line {
            stroke-dasharray: 6 8;
            animation: archFlow 3.2s linear infinite;
            will-change: stroke-dashoffset;
          }
          .arch-float {
            animation-name: nodeFloat;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            will-change: transform;
          }
          @keyframes archFlow {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -28; }
          }
          @keyframes nodeFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </section>
  );
};

export default SkillsSystemArchitecture;
