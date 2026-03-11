import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from "lucide-react";
import { FaJava, FaReact, FaNodeJs, FaPhp } from "react-icons/fa";
import { SiMysql, SiTailwindcss, SiMongodb } from "react-icons/si";
import CodeCard from './CodeCard';
import BackgroundEffects from "./BackgroundEffects";

const Hero = ({ darkMode, scrollTo }) => {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full Stack Developer",
    "DevOps Enthusiast",
    "PHP Developer",
    "Problem Solver"
  ];

  const coreSkills = [
    { icon: <FaReact className="text-[#61DAFB]" />, name: 'React' },
    { icon: <FaNodeJs className="text-[#339933]" />, name: 'Node.js' },
    { icon: <FaJava className="text-[#EA2D2E]" />, name: 'Java' },
    { icon: <FaPhp className="text-[#777BB4]" />, name: 'PHP' },
    { icon: <SiMysql className="text-[#4479A1]" />, name: 'MySQL' },
    { icon: <SiMongodb className="text-[#47A248]" />, name: 'MongoDB' },
    { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind' },
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        setText(currentRole.substring(0, text.length - 1));
      } else {
        setText(currentRole.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };
    const timer = setTimeout(handleTyping, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [text, isDeleting, roles, roleIndex]);

  return (
    <section
      id="home"
      className={`relative pt-32 pb-20 px-4 md:px-8 overflow-hidden flex items-center min-h-screen transition-colors duration-300 ${darkMode
        ? "bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
        : "bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"
        }`}
    >
      {/* Background Effects */}
      <BackgroundEffects variant="hero" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10 w-full">

        {/* Text Content - Responsive Left Aligned */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left space-y-8 mt-8 lg:mt-0"
        >
          <div className="space-y-4">
            <h2 className={`text-xl md:text-2xl font-medium tracking-wide text-blue-400 drop-shadow-sm`}>
              Welcome to my portfolio
            </h2>
            <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-8">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                Hi, I'm{" "}
                <br className="hidden lg:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-400">
                  Prince Kumar
                </span>
              </h1>
            </div>
          </div>

          <div className="h-10 md:h-12 flex items-center justify-center lg:justify-start overflow-hidden">
            <span className={`text-2xl md:text-4xl font-bold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              {text}
              <span className="animate-pulse text-purple-600 ml-1">|</span>
            </span>
          </div>

          <p className={`text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed text-[#94A3B8]`}>
            I engineer scalable, high-performance web applications with precision, turning complex problems into elegant code.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo && scrollTo("projects")}
              className="w-full sm:w-auto group relative px-8 py-4 rounded-full font-bold text-base text-white bg-gradient-to-r from-purple-700 to-blue-500 overflow-hidden shadow-lg hover:shadow-xl transition-all border border-purple-500"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo && scrollTo("contact")}
              className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base border-2 transition-all bg-transparent border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600/20`}
            >
              Contact Me
            </motion.button>
          </div>

          {/* Top Skills / Domains */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-8 flex flex-col items-center lg:items-start gap-4"
          >
            <span className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-purple-400" : "text-purple-700"}`}>
              Core Skills
            </span>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {coreSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${darkMode
                    ? "bg-slate-900 border-purple-600 hover:border-blue-400 hover:bg-slate-800 text-slate-200"
                    : "bg-white border-purple-300 hover:border-blue-500 hover:bg-slate-50 text-slate-700"
                    } transition-all cursor-pointer shadow-sm hover:shadow-md`}
                >
                  <span className="text-xl">{skill.icon}</span>
                  <span className="font-medium text-sm">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Code Card Profile */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-[500px] mx-auto perspective-1000 z-20 group"
        >
          {/* Decorative Elements around card - No Blur, Sharp Edges */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/10 border-2 border-blue-400/20 rounded-full animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/10 border-2 border-purple-600/20 rounded-full animate-pulse delay-700" />

          {/* Clean gradient background for codecard */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-700 to-blue-500 opacity-20 group-hover:opacity-40 transition duration-500" />

          {/* Tilting container effect */}
          <div className="relative z-10 transform transition-transform duration-500 md:group-hover:-translate-y-2 md:group-hover:rotate-1">
            <CodeCard />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
