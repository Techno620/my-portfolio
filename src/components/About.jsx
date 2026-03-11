import React from "react";
import { Terminal, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import profileImage from "../assets/profile_img.png";
import BackgroundEffects from "./BackgroundEffects";

const About = ({ darkMode }) => {
  return (
    <section
      id="about"
      className={`py-20 px-4 transition-colors duration-300 overflow-hidden ${darkMode
        ? "bg-transparent bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
        : "bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"
        }`}
    >
      <BackgroundEffects variant="about" />
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center z-10 relative">

        {/* Text Content */}
        <div className="space-y-8 lg:order-2 order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 text-purple-400 border border-purple-600/20 text-sm font-medium mb-2">
            <Terminal size={14} />
            <span>Developer Profile</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            Architecting <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-400">Scalable</span> <br /> Digital Solutions.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <p className={`text-xl leading-relaxed text-[#94A3B8]`}>
              I am a Computer Science student with a strong foundation in <span className="font-semibold text-purple-400">Java</span>, full-stack web development, and database systems. I build scalable web applications using the <span className="font-semibold text-blue-400">MERN stack</span> along with <span className="text-blue-500 font-semibold">SQL</span> and <span className="text-purple-500 font-semibold">PHP</span>-based backend systems. My experience includes developing <span className="text-purple-400 font-semibold">RESTful APIs</span>, implementing role-based authentication, and designing responsive interfaces with <span className="text-blue-400 font-semibold">React</span> and <span className="text-blue-400 font-semibold">Tailwind CSS</span>. I focus on writing clean, maintainable code and solving real-world problems through efficient system design.
            </p>
          </motion.div>

          <div className="pt-4 flex gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold transition-all hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-lg border border-purple-500/50">
              Let's Collaborate <ArrowRight size={20} />
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500/50 text-purple-400 bg-transparent hover:bg-purple-500/10 font-semibold transition-all hover:-translate-y-1 glass">
              View Projects
            </a>
          </div>
        </div>

        {/* Profile Picture replacing Orbit Tech Stack */}
        <div className="relative flex items-center justify-center lg:order-1 order-1 w-full max-w-md mx-auto aspect-square">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative w-full h-full rounded-3xl overflow-hidden border border-purple-500/20 shadow-lg group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <img
              src={profileImage}
              alt="Prince Kumar Profile"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            {/* Decorative elements around image - Crisp, no blur */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-purple-600/10 border border-purple-600/30 rounded-full z-0" />
            <div className="absolute -top-4 -left-4 w-36 h-36 bg-blue-500/10 border border-blue-500/30 rounded-full z-0" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
export default About;
