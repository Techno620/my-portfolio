import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiJavascript, SiMysql, SiReact, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiPhp, SiPostgresql, SiMongodb, SiGit, SiGithub, 
  SiPostman, SiBootstrap, SiJsonwebtokens, SiCplusplus, SiTypescript, SiDocker
} from 'react-icons/si';
import { FaJava, FaCode, FaServer, FaDatabase, FaTools, FaBrain, FaShieldAlt } from 'react-icons/fa';
import { fadeInUp, staggerContainer } from "../utils/animations";

const SkillBadge = ({ icon: Icon, name, color, level }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-300"
  >
    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors">
      <Icon size={24} style={{ color }} className="group-hover:scale-110 transition-transform" />
    </div>
    <div>
      <h4 className="text-sm font-bold text-white/90 group-hover:text-white transition-colors uppercase tracking-wider">{name}</h4>
      <div className="flex gap-1 mt-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`h-1 w-4 rounded-full ${i <= level ? 'bg-primary' : 'bg-white/10'}`} />
        ))}
      </div>
    </div>
  </motion.div>
);

const SkillsArchitecture = () => {
  const categories = [
    {
      title: "Core Engineering",
      icon: FaCode,
      skills: [
        { name: "C++", icon: SiCplusplus, color: "#00599C", level: 3 },
        { name: "Java", icon: FaJava, color: "#007396", level: 2 },
        { name: "DSA", icon: FaBrain, color: "#fbbf24", level: 3 },
      ]
    },
    {
      title: "Frontend Stack",
      icon: SiReact,
      skills: [
        { name: "React.js", icon: SiReact, color: "#61DAFB", level: 3 },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 2 },
        { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", level: 3 },
      ]
    },
    {
      title: "Backend & Cloud",
      icon: FaServer,
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 3 },
        { name: "Express", icon: SiExpress, color: "#ffffff", level: 3 },
        { name: "Docker", icon: SiDocker, color: "#2496ED", level: 2 },
      ]
    },
    {
      title: "Database Systems",
      icon: FaDatabase,
      skills: [
        { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 3 },
        { name: "MySQL", icon: SiMysql, color: "#4479A1", level: 3 },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 2 },
      ]
    }
  ];

  return (
    <section className="section relative bg-transparent py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Branding */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 text-primary mb-6">
              <span className="w-12 h-px bg-primary/50" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.4em]">Tech.stack()</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-heading font-black text-white tracking-tighter mb-8">
              TECHNICAL <span className="text-primary">DNA</span>
            </h2>
            
            <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-10">
              A meticulously curated stack focused on building resilient, high-performance web architectures.
            </p>

            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-4">
                <FaShieldAlt className="text-primary" size={24} />
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">Design Philosophy</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                "Clean code is not just written; it's architected. I prioritize scalability, type safety, and efficient data flow in every system I build."
              </p>
            </div>
          </motion.div>

          {/* Right: Skill Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <cat.icon className="text-primary opacity-50" size={18} />
                  <h3 className="text-xs font-mono font-bold text-white/40 uppercase tracking-[0.3em]">{cat.title}</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {cat.skills.map((skill, sIdx) => (
                    <SkillBadge key={sIdx} {...skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SkillsArchitecture;
