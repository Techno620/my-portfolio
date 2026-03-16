import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Sparkles } from "lucide-react";
import HeroButton from "./common/HeroButton";
import profileImg from "../assets/profile_img.png";

type HeroProps = {
  scrollTo: (id: string) => void;
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const nameVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = ({ scrollTo }: HeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const roleSequence = useMemo(() => {
    const roles = [
      "Full Stack Developer",
      1400,
      "MERN Stack Engineer",
      1400,
      "Backend Developer",
      1400,
      "API & System Builder",
      1400,
      "PHP Developer",
      1400,
    ];
    return roles as unknown as (string | number)[];
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-14 items-center max-w-7xl mx-auto">
          {/* Left */}
          <motion.div variants={container} initial="hidden" animate="visible" className="lg:col-span-6 space-y-8">
            <motion.div variants={item} className="inline-flex">
              <span className="p-[1px] rounded-full bg-gradient-to-r from-primary/40 via-secondary/20 to-highlight/30 shadow-[0_0_30px_rgb(99_102_241_/_0.12)]">
                <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                  <Sparkles size={14} className="text-primary" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-slate-200">
                    Premium Developer Portfolio
                  </span>
                </span>
              </span>
            </motion.div>

            <motion.p variants={item} className="text-slate-100 font-mono text-lg md:text-xl font-black tracking-wide">
              Hi, I'm
            </motion.p>

            <motion.h1 variants={nameVariant} className="font-heading font-black tracking-tighter leading-[0.9]">
              <span className="block text-4xl md:text-6xl text-white">PRINCE</span>
              <span className="block text-4xl md:text-6xl text-gradient">KUMAR</span>
            </motion.h1>

            <motion.div variants={item} className="flex items-center gap-3">
              <span className="text-primary/70 font-mono font-bold text-xl md:text-2xl">→</span>
              <p className="text-xl md:text-2xl font-mono font-black text-white">
                <TypeAnimation
                  sequence={roleSequence}
                  speed={55}
                  deletionSpeed={65}
                  repeat={Infinity}
                  cursor={true}
                  wrapper="span"
                />
              </p>
            </motion.div>

            <motion.p variants={item} className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
              <span className="block">
                A Full Stack Developer specializing in the MERN stack, REST APIs, and scalable backend systems.
              </span>
              <span className="block">
                I build modern web applications that solve real-world problems with clean architecture and efficient design.
              </span>
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-2 w-full max-w-xl">
              <HeroButton
                variant="primary"
                onClick={() => scrollTo("projects")}
                className="w-full sm:w-auto"
              >
                View Projects
              </HeroButton>
              <HeroButton
                variant="secondary"
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto"
              >
                Let's Connect
              </HeroButton>
              <HeroButton
                variant="tertiary"
                as="a"
                href="/resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Download Resume
              </HeroButton>
            </motion.div>

            {/* Subtle animated accent line */}
            <motion.div
              variants={item}
              className="pt-2"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-px w-full max-w-xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Ambient shapes */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/10 opacity-40"
                animate={{ rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-primary/20 opacity-35"
                animate={{ rotate: -360 }}
                transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 blur-[90px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-highlight/10 blur-[90px] rounded-full" />
            </motion.div>

            <TiltProfileCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TiltProfileCard = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = -py * 8;
    const ry = px * 10;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <div className="relative w-full max-w-[460px]">
      <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 via-highlight/10 to-secondary/15 blur-[70px] rounded-2xl pointer-events-none" />

      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_30px_80px_-50px_rgb(0_0_0_/_0.8)] will-change-transform transition-transform duration-150"
        style={{
          background:
            "radial-gradient(520px circle at var(--gx) var(--gy), rgba(99,102,241,0.12), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(800px circle at 20% 10%, rgba(99,102,241,0.18), transparent 55%), radial-gradient(700px circle at 90% 30%, rgba(236,72,153,0.14), transparent 55%), radial-gradient(700px circle at 40% 90%, rgba(34,197,94,0.12), transparent 55%)",
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.10]">
          <div className="absolute -inset-x-10 -top-20 h-16 bg-white/10 blur-2xl animate-[heroScan_5.5s_ease-in-out_infinite]" />
        </div>
        <div className="p-6 md:p-7">
          <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20">
            <img
              src={profileImg}
              alt="Prince Kumar"
              className="w-full h-[340px] md:h-[420px] object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-white font-heading font-black text-lg tracking-tight">PRINCE KUMAR</p>
              <p className="text-slate-400 font-mono text-[10px] font-black uppercase tracking-[0.35em] mt-1">
                Full Stack Developer
              </p>
            </div>
            <div className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 font-mono text-[10px] font-black uppercase tracking-[0.35em]">
              Available
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <div className="absolute inset-0 bg-grid" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
