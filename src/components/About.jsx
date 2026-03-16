import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";
import AboutInteractivePanel from "./About/AboutInteractivePanel";
import AboutIntroTyping from "./About/AboutIntroTyping";

const About = () => {
  return (
    <section className="section relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-secondary/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 space-y-7"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 text-primary">
              <span className="w-12 h-px bg-primary/50" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.4em]">about.me</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter leading-tight"
            >
              About <span className="text-gradient">Me</span>
            </motion.h2>

            <motion.div variants={fadeInUp} className="max-w-[72ch]">
              <AboutIntroTyping />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 w-full"
          >
            <AboutInteractivePanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
