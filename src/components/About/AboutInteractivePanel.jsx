import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Rocket, Gauge, Cloud, Database, ShieldCheck } from "lucide-react";

const TABS = [
  { id: "stack", label: "Stack", icon: Layers },
  { id: "projects", label: "Projects", icon: Rocket },
  { id: "strengths", label: "Strengths", icon: Gauge },
  { id: "next", label: "Next", icon: Cloud },
];

const STACK_ITEMS = [
  {
    id: "mern",
    title: "MERN Stack",
    colorClass: "text-secondary",
    ringClass: "border-secondary/30",
    chips: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    note: "Modern web apps with clean UI + secure APIs.",
    icon: Layers,
  },
  {
    id: "db",
    title: "Databases",
    colorClass: "text-secondary",
    ringClass: "border-secondary/30",
    chips: ["MySQL", "PostgreSQL", "Schema Design", "Indexes"],
    note: "Relational + NoSQL experience with performance in mind.",
    icon: Database,
  },
  {
    id: "prod",
    title: "Production Tools",
    colorClass: "text-secondary",
    ringClass: "border-secondary/30",
    chips: ["Docker", "AWS", "Git", "Linux"],
    note: "Builds that are deployable, observable, and scalable.",
    icon: ShieldCheck,
  },
];

const PROJECT_ITEMS = [
  {
    title: "Recipe Generator (MERN)",
    detail: "Improved ingredient search performance through optimized REST API integration.",
    tone: "from-primary/10 to-secondary/5",
  },
  {
    title: "Smart Agriculture Platform",
    detail: "Diagnostic reporting system connecting farmers with experts through digital workflows.",
    tone: "from-primary/10 to-secondary/5",
  },
  {
    title: "Consultant-Based Web Service",
    detail: "Documentation workflows with efficient backend processing + database optimization.",
    tone: "from-primary/10 to-secondary/5",
  },
];

const STRENGTHS = [
  "Full-stack development and API architecture",
  "Backend performance optimization",
  "Clean code practices and maintainable structure",
  "Engineering fundamentals: DSA, OOP, database design",
];

const NEXT_FOCUS = ["Cloud infrastructure", "DevOps practices", "Scalable system design"];

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glowX: 50, glowY: 50 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 10;
    const rx = -(py - 0.5) * 8;
    setTilt({ rx, ry, glowX: px * 100, glowY: py * 100 });
  };

  const reset = () => setTilt({ rx: 0, ry: 0, glowX: 50, glowY: 50 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`relative rounded-2xl border-2 border-white/10 bg-[#0b1224]/55 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-60px_rgba(0,0,0,0.75)] ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 120ms ease",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(420px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(34,211,238,0.16), transparent 55%)`,
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div className="absolute inset-0 bg-grid" />
      </div>
      {children}
    </div>
  );
};

const AboutInteractivePanel = () => {
  const [tab, setTab] = useState("stack");
  const [activeStack, setActiveStack] = useState(STACK_ITEMS[0].id);

  const active = useMemo(
    () => STACK_ITEMS.find((s) => s.id === activeStack) ?? STACK_ITEMS[0],
    [activeStack]
  );

  return (
    <TiltCard className="p-7 sm:p-8 md:p-9">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 min-w-0">
        <div className="min-w-0">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-secondary/80">
            Interactive
          </p>
          <p className="text-white font-heading font-black text-4xl md:text-[44px] tracking-tight leading-none">
            Explore
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 justify-start md:justify-end">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setTab(t.id)}
                  className={`px-3.5 py-2 rounded-md border-2 text-[10px] font-mono font-black uppercase tracking-widest transition-all flex items-center justify-center sm:justify-start gap-2 whitespace-nowrap ${
                    isActive
                      ? "border-secondary/30 bg-secondary/10 text-secondary"
                      : "border-white/10 bg-white/[0.04] text-slate-300/80 hover:text-white hover:border-white/20"
                  }`}
                >
                <Icon size={14} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === "stack" && (
          <motion.div
            key="stack"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {STACK_ITEMS.map((item) => {
                const Icon = item.icon;
                const selected = item.id === activeStack;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveStack(item.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all min-h-[120px] ${
                      selected ? `${item.ringClass} bg-white/[0.06]` : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className={`text-[11px] font-mono font-black uppercase tracking-[0.25em] ${item.colorClass}`}>
                        {item.title}
                      </p>
                      <Icon size={16} className={item.colorClass} />
                    </div>
                    <p className="text-[13px] text-muted-foreground font-semibold mt-3 leading-relaxed">{item.note}</p>
                  </button>
                );
              })}
            </div>

            <div className="p-6 rounded-xl border-2 border-white/10 bg-white/[0.04]">
              <p className={`text-[10px] font-mono font-black uppercase tracking-[0.35em] ${active.colorClass}`}>
                {active.title}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {active.chips.map((chip) => (
                  <span
                    key={chip}
                    className="text-[11px] font-mono font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.06] text-white/90"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === "projects" && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {PROJECT_ITEMS.map((p) => (
              <div key={p.title} className={`p-6 rounded-xl border-2 border-white/10 bg-gradient-to-r ${p.tone}`}>
                <p className="text-white font-heading font-black text-lg">{p.title}</p>
                <p className="mt-2 text-sm text-muted-foreground font-semibold leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </motion.div>
        )}

        {tab === "strengths" && (
          <motion.div
            key="strengths"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-xl border-2 border-white/10 bg-surface/15"
          >
            <p className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-secondary/80">
              Core Strengths
            </p>
            <ul className="mt-5 space-y-3">
              {STRENGTHS.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-muted-foreground font-semibold">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {tab === "next" && (
          <motion.div
            key="next"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-xl border-2 border-white/10 bg-surface/15"
          >
            <p className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-secondary/85">
              Exploring Next
            </p>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {NEXT_FOCUS.map((n) => (
                <li
                  key={n}
                  className="p-4 rounded-lg border border-white/10 bg-white/5 text-[11px] sm:text-xs font-mono font-black uppercase tracking-[0.22em] text-white/80 text-center leading-snug break-words hyphens-auto overflow-hidden"
                >
                  {n}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </TiltCard>
  );
};

export default AboutInteractivePanel;
