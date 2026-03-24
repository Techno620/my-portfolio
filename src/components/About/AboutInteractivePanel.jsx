import React, { useMemo, useRef, useState, useEffect } from "react";
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
    colorClass: "text-cyan-300",
    ringClass: "border-cyan-300/45 shadow-[0_0_18px_rgba(34,211,238,0.16)]",
    chips: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    note: "Modern web apps with clean UI + secure APIs.",
    icon: Layers,
  },
  {
    id: "db",
    title: "Databases",
    colorClass: "text-sky-300",
    ringClass: "border-sky-300/45 shadow-[0_0_18px_rgba(56,189,248,0.16)]",
    chips: ["MySQL", "PostgreSQL", "Schema Design", "Indexes"],
    note: "Relational + NoSQL experience with performance in mind.",
    icon: Database,
  },
  {
    id: "prod",
    title: "DevOps & Tools",
    colorClass: "text-indigo-300",
    ringClass: "border-indigo-300/45 shadow-[0_0_18px_rgba(129,140,248,0.16)]",
    chips: ["Docker", "AWS", "Git", "Linux"],
    note: "Builds that are deployable, observable, and scalable.",
    icon: ShieldCheck,
  },
];

const PROJECT_ITEMS = [
  {
    title: "Recipe Generator (MERN)",
    detail: "Improved ingredient search performance through optimized REST API integration.",
    tone: "from-primary/20 via-primary/5 to-transparent border-primary/20",
  },
  {
    title: "Smart Agriculture Platform",
    detail: "Diagnostic reporting system connecting farmers with experts through digital workflows.",
    tone: "from-secondary/20 via-secondary/5 to-transparent border-secondary/20",
  },
  {
    title: "Consultant Portal",
    detail: "Documentation workflows with efficient backend processing + database optimization.",
    tone: "from-purple-500/20 via-purple-500/5 to-transparent border-purple-500/20",
  },
];

const STRENGTHS = [
  "Full-stack development and API architecture",
  "Backend performance optimization",
  "Clean code practices and maintainable structure",
  "Engineering fundamentals: DSA, OOP, database design",
];

const NEXT_FOCUS = ["Cloud infrastructure", "DevOps practices", "Scalable system design"];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    // Increased rotation for a stronger 3D effect
    const ry = (px - 0.5) * 25;
    const rx = -(py - 0.5) * 25;
    setTilt({ rx, ry, glowX: px * 100, glowY: py * 100 });
  };

  const reset = () => {
    setTilt({ rx: 0, ry: 0, glowX: 50, glowY: 50 });
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      className={`relative overflow-hidden rounded-2xl border border-cyan-300/12 bg-[linear-gradient(180deg,rgba(8,15,32,0.9),rgba(6,11,26,0.96))] backdrop-blur-2xl shadow-[0_20px_80px_-38px_rgba(0,0,0,0.95)] ${className} will-change-transform`}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Animated Gradient Border Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(34,211,238,0.14), transparent 40%)`,
        }}
      />
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative z-10 h-full">
        {children}
      </div>
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
    <TiltCard className="p-6 sm:p-8 min-h-[500px] flex flex-col">
      <div style={{ transform: "translateZ(40px)" }} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 relative z-20">
        <div className="min-w-0 lg:shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-cyan-200">
              Interactive
            </span>
          </motion.div>
          <h3 className="text-white font-heading font-black text-3xl sm:text-4xl tracking-tight drop-shadow-md">
            Capabilities
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2 w-full lg:w-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative px-4 py-2.5 rounded-xl text-[11px] font-mono font-black uppercase tracking-widest transition-all flex items-center justify-center sm:justify-start gap-2 overflow-hidden ${
                  isActive
                    ? "text-white shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                    : "border border-white/5 bg-white/[0.02] text-slate-300 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTabBg" 
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-sky-400/20 to-indigo-400/30"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {isActive && (
                  <div className="absolute inset-0 border border-white/20 rounded-xl" />
                )}
                <Icon size={14} className={isActive ? "text-secondary z-10 relative" : "z-10 relative"} />
                <span className="z-10 relative">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ transform: "translateZ(20px)" }} className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {tab === "stack" && (
            <motion.div
              key="stack"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
              className="space-y-6 h-full flex flex-col justify-between"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STACK_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const selected = item.id === activeStack;
                  return (
                    <motion.button
                      variants={staggerItem}
                      key={item.id}
                      type="button"
                      onClick={() => setActiveStack(item.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${
                        selected 
                          ? `${item.ringClass} bg-white/[0.08] scale-[1.02]` 
                          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
                      }`}
                    >
                      {selected && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 blur-[50px] rounded-full" />
                      )}
                      <div className="flex items-center justify-between gap-3 relative z-10">
                        <p className={`text-[12px] font-mono font-black uppercase tracking-[0.2em] transition-colors ${selected ? item.colorClass : "text-slate-200"}`}>
                          {item.title}
                        </p>
                        <Icon size={18} className={`transition-colors ${selected ? item.colorClass : "text-slate-400 group-hover:text-slate-200"}`} />
                      </div>
                      <p className="text-[13px] text-slate-200 font-medium mt-3 leading-relaxed relative z-10">{item.note}</p>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div 
                key={active.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`mt-auto p-6 rounded-2xl border-2 bg-gradient-to-br from-white/[0.03] to-transparent ${active.ringClass.split(' ')[0]}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <active.icon size={20} className={active.colorClass} />
                  <p className={`text-xs font-mono font-black uppercase tracking-[0.3em] ${active.colorClass}`}>
                    {active.title} Ecosystem
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {active.chips.map((chip, i) => (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={chip}
                      className="text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-white/90 shadow-sm hover:bg-white/[0.1] hover:border-white/30 transition-all cursor-default"
                    >
                      {chip}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {tab === "projects" && (
            <motion.div
              key="projects"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {PROJECT_ITEMS.map((p) => (
                <motion.div 
                  variants={staggerItem}
                  key={p.title} 
                  className={`p-5 rounded-2xl border bg-gradient-to-r hover:scale-[1.01] transition-transform cursor-default ${p.tone}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-white font-heading font-black text-lg tracking-wide">{p.title}</p>
                      <p className="mt-2 text-[15px] text-slate-100 font-medium leading-relaxed">{p.detail}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                      <Rocket size={14} className="text-white/70" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === "strengths" && (
            <motion.div
              key="strengths"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10 }}
                className="h-full rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.04] p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                <Gauge size={20} className="text-cyan-300" />
                <p className="text-xs font-mono font-black uppercase tracking-[0.3em] text-cyan-200">
                  Core Engineering Strengths
                </p>
              </div>
              <ul className="space-y-4">
                {STRENGTHS.map((s, i) => (
                  <motion.li 
                    variants={staggerItem}
                    key={i} 
                    className="flex items-start gap-4 text-[16px] text-slate-100 font-medium p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-colors"
                  >
                    <div className="mt-1 relative flex items-center justify-center w-4 h-4">
                      <span className="absolute h-full w-full rounded-full bg-cyan-300/20 animate-ping" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
                    </div>
                    {s}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {tab === "next" && (
            <motion.div
              key="next"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10 }}
                className="flex h-full flex-col rounded-2xl border border-sky-300/20 bg-sky-300/[0.04] p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                <Cloud size={20} className="text-sky-300 animate-bounce-slow" />
                <p className="text-xs font-mono font-black uppercase tracking-[0.3em] text-sky-200">
                  Currently Exploring
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                {NEXT_FOCUS.map((n) => (
                  <motion.div
                    variants={staggerItem}
                    key={n}
                    className="group flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0b1224]/80 p-5 text-center shadow-lg transition-all hover:border-sky-300/30 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sky-300/10 transition-transform group-hover:scale-110">
                      <Rocket size={16} className="text-sky-300" />
                    </div>
                    <span className="text-sm font-mono font-black uppercase tracking-widest text-white leading-snug break-words">
                      {n}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TiltCard>
  );
};

export default AboutInteractivePanel;
