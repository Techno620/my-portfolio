import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

const SectionDivider = () => {
  return (
    <motion.div 
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative w-full max-w-4xl mx-auto py-6 flex items-center justify-center opacity-80"
    >
      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute w-[200px] h-full bg-primary/20 blur-[30px] rounded-full pointer-events-none" />
      <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#38bdf8]" />
    </motion.div>
  );
};

export default SectionDivider;
