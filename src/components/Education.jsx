import React from "react";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const Education = ({ darkMode }) => {
    const education = [
        {
            degree: "B.Tech - Computer Science and Engineering",
            school: "Lovely Professional University, Punjab",
            year: "Aug '24 - Aug '27",
        },
        {
            degree: "Diploma - Computer Science and Engineering",
            school: "Lovely Professional University, Punjab",
            year: "Aug '22 - Jul '24",
        },
        {
            degree: "Intermediate",
            school: "MKD Public School, Bihar",
            year: "Jun '19 - Jul '21",
        }
    ];

    return (
        <section
            id="education"
            className={`relative py-20 px-4 transition-colors duration-300 overflow-hidden ${darkMode ? "bg-transparent text-slate-100" : "bg-slate-50 text-slate-800"
                }`}
        >
            {/* Interactive Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-10 left-10 w-48 h-48 rounded-full blur-[80px] opacity-20 ${darkMode ? "bg-indigo-600" : "bg-indigo-300"}`}
                />
            </div>

            <div className="relative max-w-4xl mx-auto z-10">
                <div className="flex items-center gap-3 mb-12">
                    <GraduationCap className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" size={32} />
                    <h2 className="text-3xl font-extrabold tracking-tight">Education</h2>
                </div>

                <div className="grid gap-6">
                    {education.map((edu, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`group p-6 rounded-2xl glass-card border transition-all duration-300 hover:scale-105 cursor-pointer ${darkMode ? "bg-white/5 backdrop-blur-md border-white/10 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]" : "bg-white/60 backdrop-blur-md border-slate-200 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                                }`}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold group-hover:text-amber-400 transition-colors">{edu.degree}</h3>
                                    <p className="text-amber-500/80 font-medium">{edu.school}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${darkMode ? "bg-amber-900/30 text-amber-300 border border-amber-500/20 group-hover:bg-amber-500/20" : "bg-amber-100 text-amber-700 group-hover:bg-amber-200"
                                    }`}>
                                    {edu.year}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
