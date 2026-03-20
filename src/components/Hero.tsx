import React, { useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Sparkles, Github, Linkedin, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import HeroButton from "./common/HeroButton";
import profileImg from "../assets/profile_pic.png";

type HeroProps = {
  scrollTo: (id: string) => void;
};

const container: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: any = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } },
};

const nameVariant: any = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
};

const SocialLink = ({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) => (
  <motion.a
    href={href}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
    aria-label={label}
    title={label}
    whileHover={{ y: -2, scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
    className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:text-white hover:border-white/20 transition-colors inline-flex items-center justify-center"
  >
    <Icon size={18} />
  </motion.a>
);

const Hero = ({ scrollTo }: HeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

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
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Local hero backdrop accents (pairs with global BackgroundSystem) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-[0.08]" />

        <motion.div
          className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.26), transparent 62%)" }}
          animate={reduceMotion ? undefined : { y: [0, 16, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-44 -right-44 w-[560px] h-[560px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.20), transparent 60%)" }}
          animate={reduceMotion ? undefined : { y: [0, -14, 0], x: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[20%] right-[18%] w-[420px] h-[420px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.14), transparent 62%)" }}
          animate={reduceMotion ? undefined : { y: [0, 12, 0], x: [0, 14, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* subtle scan line */}
        <motion.div
          className="absolute left-0 right-0 top-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={reduceMotion ? undefined : { opacity: [0.12, 0.35, 0.12], y: [0, 520, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center max-w-7xl mx-auto">
          {/* Left */}
          <motion.div variants={container} initial="hidden" animate="visible" className="lg:col-span-6 space-y-8">
            <motion.div variants={item} className="inline-flex">
              <span className="p-[1px] rounded-full bg-gradient-to-r from-blue-500/40 via-white/20 to-cyan-400/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl">
                  <Sparkles size={14} className="text-cyan-400" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-cyan-50/90">
                    Premium Developer Portfolio
                  </span>
                </span>
              </span>
            </motion.div>

            <motion.p variants={item} className="text-slate-100 font-mono text-lg md:text-xl font-black tracking-wide">
              Hi, I'm
            </motion.p>

            <motion.h1 variants={nameVariant} className="font-heading font-black tracking-tighter leading-[0.92]">
              <span className="block text-4xl md:text-6xl text-white">PRINCE</span>
              <span className="block text-4xl md:text-6xl bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_26px_rgba(59,130,246,0.3)]">
                KUMAR
              </span>
            </motion.h1>

            <motion.div variants={item} className="flex items-center gap-3">
              <span className="text-secondary/70 font-mono font-bold text-xl md:text-2xl">→</span>
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

            <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
              <span className="block">
                I build high-performance web apps with the MERN stack, clean REST APIs, and scalable backend systems.
              </span>
              <span className="block">
                Focused on reliability, developer experience, and polished UI/UX.
              </span>
            </motion.p>

            <motion.div variants={item} className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-start gap-2 sm:gap-4 pt-2 w-full max-w-3xl">
              <HeroButton variant="primary" onClick={() => scrollTo("projects")} className="px-4 py-2.5 sm:px-8 sm:py-3.5 text-[10px] sm:text-xs flex-1 sm:flex-none justify-center whitespace-nowrap">
                View Projects <ArrowRight className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] ml-1.5" />
              </HeroButton>
              <HeroButton variant="secondary" onClick={() => scrollTo("contact")} className="px-4 py-2.5 sm:px-8 sm:py-3.5 text-[10px] sm:text-xs flex-1 sm:flex-none justify-center whitespace-nowrap">
                Let's Connect
              </HeroButton>
              <HeroButton
                variant="tertiary"
                as="a"
                href="/resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 sm:px-8 sm:py-3.5 text-[10px] sm:text-xs flex-1 sm:flex-none justify-center whitespace-nowrap"
              >
                Download Resume
              </HeroButton>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-[11px] font-mono font-extrabold uppercase tracking-widest text-slate-200/90">
                <CheckCircle2 size={14} className="text-secondary" />
                Open to internships
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-[11px] font-mono font-extrabold uppercase tracking-widest text-slate-200/90">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_rgba(34,211,238,0.28)]" />
                Punjab, India
              </span>
            </motion.div>

            <motion.div variants={item} className="pt-3" aria-hidden="true">
              <motion.div
                className="h-px w-full max-w-xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={reduceMotion ? undefined : { opacity: [0.22, 0.55, 0.22] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as any, delay: 0.25 }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
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
  const reduceMotion = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduceMotion) return;
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
    <div className="relative w-full max-w-[640px] flex items-center justify-center">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative will-change-transform transition-transform duration-150"
        style={{
          transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        }}
      >
        {/* Larger circular profile (no outer card) */}
        <div className="relative">
          <div className="relative">
            <div className="p-[2px] rounded-full bg-gradient-to-br from-blue-500/50 via-white/10 to-cyan-400/50 shadow-[0_0_100px_rgba(59,130,246,0.25)]">
              <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border border-white/20 bg-black/30">
                <img
                  src={profileImg}
                  alt="Prince Kumar"
                  className="w-full h-full object-cover grayscale-[0.10] hover:grayscale-0 transition-all duration-700"
                  loading="eager"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
            </div>
          </div>

          {/* Social links */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <SocialLink href="https://github.com/prince093kumar" label="GitHub" Icon={Github} />
            <SocialLink href="https://linkedin.com/in/prince093kumar" label="LinkedIn" Icon={Linkedin} />
            <SocialLink href="mailto:princekumar09372@gmail.com" label="Email" Icon={Mail} />
          </motion.div>

          {/* subtle accent shapes */}
          <motion.div
            aria-hidden="true"
            className="absolute -right-6 -top-6 w-12 h-12 rounded-2xl border border-white/10 bg-white/5"
            animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -left-8 bottom-12 w-10 h-10 rounded-full border border-secondary/25 bg-secondary/10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
