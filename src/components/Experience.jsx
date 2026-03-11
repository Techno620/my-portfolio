import React from "react";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import BackgroundEffects from "./BackgroundEffects";

const Experience = ({ darkMode }) => {
    const experiences = [
        {
            role: "MERN Stack Development Trainee",
            company: "CipherSchools",
            duration: "Jun '25 - Jul '25",
            desc: "Completed industry-oriented training in full-stack development. Gained practical experience in MongoDB, Express.js, React.js, Node.js, and RESTful API development. Crafted the Recipe Generator full-stack project."
        }
    ];

    return (
        <section
            id="experience"
            className={`relative py-20 px-4 transition-colors duration-300 overflow-hidden ${darkMode ? "bg-transparent text-slate-100" : "bg-white text-slate-800"
                }`}
        >
            <BackgroundEffects variant="hero" />
            <div className="relative max-w-4xl mx-auto z-10">
                <div className="flex items-center gap-3 mb-12">
                    <Briefcase className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" size={36} />
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Experience</h2>
                </div>

                <div className="space-y-8">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-8 rounded-2xl glass-card border relative transition-all duration-300 hover:-translate-y-1 ${darkMode ? "bg-white/5 backdrop-blur-md border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]" : "bg-white/60 backdrop-blur-md border-slate-200 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                                }`}
                        >
                            <div className="absolute left-0 top-10 w-1.5 h-12 bg-purple-500 rounded-r-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-3xl font-bold group-hover:text-purple-400 transition-colors">{exp.role}</h3>
                                    <p className="text-purple-400 font-semibold text-xl">{exp.company}</p>
                                </div>
                                <span className={`mt-2 md:mt-0 px-4 py-1.5 text-base font-mono rounded-full ${darkMode ? "bg-purple-900/40 text-purple-300 border border-purple-500/30 group-hover:bg-purple-500/20" : "bg-purple-100 text-purple-600 group-hover:bg-purple-200"
                                    }`}>
                                    {exp.duration}
                                </span>
                            </div>
                            <p className={`text-lg leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                                {exp.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
