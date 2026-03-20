import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";
import AboutInteractivePanel from "./About/AboutInteractivePanel";
import AboutIntroTyping from "./About/AboutIntroTyping";

const About = () => {
  return (
    <section className="section relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,32,0.28),rgba(3,7,18,0.08)_26%,rgba(3,7,18,0.12)_70%,rgba(8,15,32,0.26))]" />
        <div className="absolute -top-36 -left-28 h-[520px] w-[520px] rounded-full bg-cyan-400/12 blur-[180px]" />
        <div className="absolute top-20 right-[12%] h-[300px] w-[300px] rounded-full bg-sky-500/10 blur-[150px]" />
        <div className="absolute -bottom-36 -right-24 h-[520px] w-[520px] rounded-full bg-indigo-500/12 blur-[180px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.045]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-[linear-gradient(90deg,rgba(34,211,238,0.14),rgba(14,116,144,0.08))] px-4 py-2 backdrop-blur-xl text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.08)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.8)]" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.38em]">
              about.me
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-tight"
          >
            Beyond the <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">codebase</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed"
          >
            A systems‑oriented full stack developer who enjoys turning complex requirements into
            clean architecture, reliable APIs, and polished user experiences.
          </motion.p>
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full"
          >
            <AboutIntroTyping />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="w-full relative z-10"
          >
            <AboutInteractivePanel />
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default About;
