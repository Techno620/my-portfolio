import React from "react";
import { Award, Trophy } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const AchievementCard = ({ item, delay = 0 }) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 240, damping: 20, mass: 0.35 });
  const springRotateY = useSpring(rotateY, { stiffness: 240, damping: 20, mass: 0.35 });

  const glare = useMotionTemplate`radial-gradient(260px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), rgba(255,255,255,0.02) 34%, rgba(255,255,255,0) 65%)`;

  const handleMouseMove = (event) => {
    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    const posX = (clientX - rect.left) / rect.width;
    const posY = (clientY - rect.top) / rect.height;

    rotateY.set((posX - 0.5) * 14);
    rotateX.set((0.5 - posY) * 12);
    glareX.set(posX * 100);
    glareY.set(posY * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      className="h-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
        className={`relative h-full min-h-[330px] overflow-hidden rounded-2xl border bg-slate-950/45 backdrop-blur-xl ${item.borderClass} ${item.shadowClass}`}
      >
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.glowClass}`} />
        <motion.div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: glare }} />

        {item.badge && (
          <div className="absolute right-4 top-4 rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest text-cyan-200">
            {item.badge}
          </div>
        )}

        <div className="relative z-10 flex h-full flex-col p-7 md:p-8">
          <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full border ${item.iconShellClass}`}>
            <item.Icon size={28} strokeWidth={2.6} className={item.iconClass} />
          </div>
          <h3 className={`text-2xl font-heading font-black tracking-tight ${item.titleClass}`}>{item.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">{item.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Achievements = () => {
  const achievements = [
    {
      title: "University Gold Medal",
      desc: "Represents the highest cumulative performance in my Diploma journey and reflects my dedication to mastering core technical concepts from the ground up—fundamentals that now power how I build reliable, scalable MERN applications.",
      Icon: Trophy,
      badge: null,
      borderClass: "border-amber-300/25",
      iconShellClass: "border-amber-300/35 bg-amber-400/10",
      iconClass: "text-amber-300",
      glowClass: "from-amber-400/20 via-amber-300/8 to-transparent",
      shadowClass: "hover:shadow-[0_20px_60px_-30px_rgba(251,191,36,0.55)]",
      titleClass: "text-amber-100",
    },
    {
      title: "Academic Achiever Award",
      desc: "Awarded twice for sustained academic excellence, demonstrating long-term consistency, discipline, and execution—not just one-time performance. That same consistency drives my engineering approach in current B.Tech full-stack projects.",
      Icon: Award,
      badge: "2x Recipient",
      borderClass: "border-cyan-300/25",
      iconShellClass: "border-cyan-300/35 bg-cyan-400/10",
      iconClass: "text-cyan-300",
      glowClass: "from-cyan-400/20 via-blue-400/8 to-transparent",
      shadowClass: "hover:shadow-[0_20px_60px_-30px_rgba(34,211,238,0.55)]",
      titleClass: "text-cyan-100",
    },
  ];

  return (
    <section className="section relative">
      <div className="container mx-auto px-6">
        <div className="space-y-10">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-sm"
            >
              Recognition
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-black tracking-tight text-white"
            >
              System <span className="text-gradient">Milestones</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.48 }}
              viewport={{ once: true }}
              className="max-w-4xl text-base md:text-lg leading-relaxed text-slate-300"
            >
              Earning the University Gold Medal in my Diploma phase was not only about marks—it was about building a deep foundation in computer science fundamentals. That same discipline now directly shapes how I architect dependable full-stack systems and production-ready MERN workflows throughout my B.Tech journey.
            </motion.p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 items-stretch">
            {achievements.map((item, index) => (
              <AchievementCard key={item.title} item={item} delay={0.35 + index * 0.16} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
