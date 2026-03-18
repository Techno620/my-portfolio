import React, { useState } from "react";
import { Github, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "../utils/animations";

// Project Images
import recipeImg from "../assets/recipe.png";
import agriImg from "../assets/agri.png";
import govtImg from "../assets/govt.png";

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: "Recipe Generator",
      subtitle: "Full-stack MERN Application",
      description: "A comprehensive MERN-based platform that accelerates ingredient search through a custom RESTful API and secure JWT authentication. This system significantly reduces search latency while providing a high-performance frontend driven by efficient global state management.",
      image: recipeImg,
      tags: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS"],
      github: "https://github.com/prince093kumar/summer_training_mern/tree/main/Recipe_Generator",
      size: "large"
    },
    {
      title: "Smart Agriculture Platform",
      subtitle: "Farmer-Expert Diagnostic Portal",
      description: "An advanced diagnostic portal built with PHP and MySQL to streamline expert-to-farmer communication. It features real-time analytics dashboards.",
      image: agriImg,
      tags: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
      github: "https://github.com/prince093kumar/TechnoGrowX",
      size: "small"
    },
    {
      title: "Consultant Web Service",
      subtitle: "Digital Documentation System",
      description: "A centralized documentation portal designed for secure large-scale digital submissions. Implementing real-time input validation.",
      image: govtImg,
      tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/prince093kumar/ismart_indfes",
      size: "medium"
    }
  ];

  return (
    <section className="section relative bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-4 text-primary mb-6"
          >
            <span className="w-12 h-px bg-primary/50" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.4em]">Development.output()</span>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter mb-8"
          >
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">PROJECTS</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
            Engineering scalable digital ecosystems with a focus on performant architecture and intuitive user interfaces.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group h-full"
            >
              <div className={`relative h-full flex flex-col rounded-2xl glass-card overflow-hidden group transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(6_182_212_/_0.10)] border-white/10 bg-white/5 backdrop-blur-xl ${
                hoveredIndex === idx ? "shadow-[0_0_50px_rgb(34_211_238_/_0.12)] border-secondary/30" : ""
              }`}>
                
                {/* Image Section */}
                <div className="relative h-64 md:h-72 overflow-hidden border-b border-white/10 rounded-t-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-transparent opacity-90" />
                </div>

                {/* Content Section */}
                <div className="p-7 flex-1 flex flex-col relative">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-heading font-black text-white group-hover:text-secondary transition-colors mb-1 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-secondary text-[11px] font-mono font-black uppercase tracking-widest opacity-90">
                      {project.subtitle}
                    </p>

                    <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-4 font-medium">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/20 text-xs font-mono font-black text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 text-white/95 group/link hover:text-primary transition-all font-black text-sm tracking-widest"
                      >
                        <Github size={18} />
                        GITHUB
                        <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
