import React from "react";
import { BadgeCheck, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import BackgroundEffects from "./BackgroundEffects";

const Certifications = ({ darkMode }) => {
    const certifications = [
        {
            title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
            issuer: "Oracle",
            date: "Sep '25" // Note: Currently active starting Sep '25 based on fetched profile
        },
        {
            title: "Computer Communications Specialization",
            issuer: "Coursera",
            date: "Oct '24" // Best guess based on previous data since fetch didn't give date for this
        },
        {
            title: "Cloud Computing",
            issuer: "NPTEL",
            date: "Jun '25"
        }
    ];

    return (
        <section
            id="certifications"
            className={`relative py-20 px-4 transition-colors duration-300 overflow-hidden ${darkMode ? "bg-transparent text-slate-100" : "bg-white text-slate-800"
                }`}
        >
            <BackgroundEffects variant="certifications" />

            <div className="relative max-w-4xl mx-auto z-10">
                <div className="flex items-center gap-3 mb-10">
                    <BadgeCheck className="text-purple-600 drop-shadow-sm" size={36} />
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Certifications</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`p-6 rounded-2xl glass-card flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 cursor-pointer group ${darkMode
                                ? "bg-slate-900 border border-purple-600/50 hover:border-blue-400 hover:shadow-lg"
                                : "bg-white border border-purple-300 hover:border-blue-500 hover:shadow-lg"
                                }`}
                        >
                            <div className="mb-4">
                                <h3 className="font-bold text-xl leading-snug mb-2 group-hover:text-purple-400 transition-colors">{cert.title}</h3>
                                <p className={`text-base ${darkMode ? "text-slate-300" : "text-slate-500"}`}>Issued by <span className="text-purple-400 font-semibold">{cert.issuer}</span></p>
                            </div>
                            <div className="self-end">
                                <span className={`text-sm font-mono px-3 py-1.5 rounded transition-colors ${darkMode ? "bg-purple-900/30 text-purple-300 border border-purple-500/30 group-hover:bg-purple-800/50" : "bg-purple-100 text-purple-700 border border-purple-200 group-hover:bg-purple-200"}`}>
                                    {cert.date}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
