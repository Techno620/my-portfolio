import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";
import AboutInteractivePanel from "./About/AboutInteractivePanel";
import AboutIntroTyping from "./About/AboutIntroTyping";

const About = () => {
  return (
    <section className="section relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[460px] h-[460px] bg-primary/14 rounded-full blur-[160px]" />
        <div className="absolute -bottom-32 -right-32 w-[460px] h-[460px] bg-secondary/14 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
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
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl text-secondary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_16px_rgba(45,212,191,0.75)]" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.38em]">
              about.me
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="mt-5 text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-tight"
          >
            Beyond the <span className="text-gradient">codebase</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed"
          >
            A systems‑oriented full stack developer who enjoys turning complex requirements into
            clean architecture, reliable APIs, and polished user experiences.
          </motion.p>
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-10 gap-8 lg:gap-10 items-start">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6"
          >
            <AboutIntroTyping />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 w-full"
          >
            <AboutInteractivePanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
