import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.2,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
};

const AboutIntroTyping = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative space-y-6 text-[16px] leading-relaxed md:text-[17px]"
    >
      <motion.p variants={lineVariants} className="text-lg font-medium text-slate-50 md:text-xl">
        I am a{" "}
        <span className="rounded-md border border-cyan-300/20 bg-cyan-400/10 px-2 py-0.5 font-black text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
          Full Stack Web Developer
        </span>{" "}
        passionate about building scalable web applications and solving real-world
        problems through technology.
      </motion.p>

      <motion.p variants={lineVariants} className="font-medium text-muted-foreground">
        I specialize in the{" "}
        <span className="cursor-default font-black text-white transition-colors hover:text-cyan-300">
          MERN stack
        </span>{" "}
        and enjoy designing{" "}
        <span className="cursor-default font-black text-white transition-colors hover:text-sky-300">
          efficient backend systems
        </span>
        ,{" "}
        <span className="cursor-default font-black text-white transition-colors hover:text-sky-300">
          responsive user interfaces
        </span>
        , and{" "}
        <span className="cursor-default font-black text-white transition-colors hover:text-indigo-300">
          reliable full-stack architectures
        </span>{" "}
        that feel fast and intuitive.
      </motion.p>

      <motion.p variants={lineVariants} className="font-medium text-muted-foreground">
        My work focuses on building modern applications with{" "}
        <span className="cursor-default font-black text-white drop-shadow-sm transition-colors hover:text-cyan-300">
          React.js
        </span>
        ,{" "}
        <span className="cursor-default font-black text-white drop-shadow-sm transition-colors hover:text-cyan-300">
          Node.js
        </span>
        ,{" "}
        <span className="cursor-default font-black text-white drop-shadow-sm transition-colors hover:text-cyan-300">
          Express.js
        </span>
        , and{" "}
        <span className="cursor-default font-black text-white drop-shadow-sm transition-colors hover:text-cyan-300">
          MongoDB
        </span>
        , while also working with relational databases like{" "}
        <span className="cursor-default font-black text-white transition-colors hover:text-sky-300">
          MySQL
        </span>{" "}
        and{" "}
        <span className="cursor-default font-black text-white transition-colors hover:text-sky-300">
          PostgreSQL
        </span>
        . I build secure REST APIs with authentication using{" "}
        <span className="font-black text-white transition-colors hover:text-indigo-300">
          JWT
        </span>{" "}
        and lean on{" "}
        <span className="font-black text-white transition-colors hover:text-cyan-300">
          Docker
        </span>
        ,{" "}
        <span className="font-black text-white transition-colors hover:text-cyan-300">
          Git
        </span>
        , and{" "}
        <span className="font-black text-white transition-colors hover:text-cyan-300">
          Linux
        </span>{" "}
        to ship production-ready systems.
      </motion.p>

      <motion.p variants={lineVariants} className="font-medium text-muted-foreground">
        Through projects like a{" "}
        <span className="cursor-default font-black text-white transition-colors hover:text-cyan-300">
          Recipe Generator
        </span>{" "}
        platform, a{" "}
        <span className="cursor-default font-black text-white transition-colors hover:text-sky-300">
          Smart Agriculture
        </span>{" "}
        diagnostic system, and a{" "}
        <span className="cursor-default font-black text-white transition-colors hover:text-indigo-300">
          consultant documentation
        </span>{" "}
        portal, I've gained hands-on experience in backend engineering, API
        architecture, and database optimization.
      </motion.p>

      <motion.p
        variants={lineVariants}
        className="mt-4 rounded-r-lg border-l-2 border-cyan-300/40 bg-cyan-300/5 py-1 pl-4 font-medium italic text-slate-300"
      >
        I'm currently focused on{" "}
        <span className="font-black not-italic text-white">scalable system design</span>,{" "}
        <span className="font-black not-italic text-white transition-colors hover:text-cyan-300">
          cloud-native architectures
        </span>
        , and shipping products that feel as good to maintain as they are to use.
      </motion.p>
    </motion.div>
  );
};

export default AboutIntroTyping;
