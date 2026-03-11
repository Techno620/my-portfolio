import React from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import BackgroundEffects from "./BackgroundEffects";

// Safe image imports
import recipeImg from "../assets/recipe.png";
import agriImg from "../assets/agri.png";
import govtImg from "../assets/govt.png";

const Projects = ({ darkMode }) => {
  const projects = [
    {
      title: "Recipe Generator Web App",
      desc: "A MERN stack application that recommends recipes based on available ingredients. Features secure JWT authentication and optimized API performance.",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      image: recipeImg,
      link: "https://github.com/prince093kumar/summer_training_mern/tree/main/Recipe_Generator"
    },
    {
      title: "Smart Agriculture Platform",
      desc: "An AI-powered platform for farmers to diagnose crop diseases via image upload. Includes dashboards for experts and admin with automated reporting.",
      tags: ["PHP", "MySQL", "Tailwind", "JS"],
      image: agriImg,
      link: "https://github.com/prince093kumar/TechnoGrowX"
    },
    {
      title: "Govt & Corporate Portal",
      desc: "A digitized documentation portal for government services (e-District, MSME). Streamlines workflows and ensures secure data handling.",
      tags: ["PHP", "MySQL", "HTML5", "CSS3"],
      image: govtImg,
      link: "https://github.com/prince093kumar/ismart_indfes"
    }
  ];

  return (
    <section
      id="projects"
      className={`relative py-20 px-4 transition-colors duration-300 overflow-hidden ${darkMode ? "bg-transparent text-slate-100" : "bg-slate-50 text-slate-900"
        }`}
    >
      <BackgroundEffects variant="projects" />

      <div className="relative max-w-7xl mx-auto z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`glass-card group rounded-3xl overflow-hidden relative transition-all duration-500 hover:-translate-y-2 cursor-pointer ${darkMode
                ? "bg-white/5 backdrop-blur-md border hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                : "bg-white/60 backdrop-blur-md border hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                }`}
            >
              {/* Image Container */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                  {p.title}
                </h3>
                <p className={`text-base line-clamp-3 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                  {p.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-sm px-3 py-1.5 rounded-full font-medium transition-colors ${darkMode
                        ? "bg-blue-500/10 text-cyan-300 border border-blue-500/20 group-hover:bg-blue-500/20"
                        : "bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-100"
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-semibold text-cyan-400 hover:text-cyan-300 mt-2"
                >
                  View Project <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
