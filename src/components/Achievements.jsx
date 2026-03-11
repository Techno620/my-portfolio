import React from "react";
import { Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import BackgroundEffects from "./BackgroundEffects";

const Achievements = ({ darkMode }) => {
    const achievements = [
        {
            title: "University Gold Medal",
            desc: "Received for consistent academic excellence and highest cumulative performance in the Diploma program.",
            icon: "🏅"
        },
        {
            title: "100+ LeetCode Problems",
            desc: "Completed problems covering arrays, strings, recursion, dynamic programming, and graph algorithms.",
            icon: "🧠"
        },
        {
            title: "Academic Achiever Award",
            desc: "Received Academic Achiever Award twice during Diploma for outstanding academic performance.",
            icon: "🏆"
        },
        {
            title: "HackerRank 5-Star Gold Badge",
            desc: "Achieved 5-Star Gold Badge in Java programming on HackerRank.",
            icon: "⭐"
        },
        {
            title: "HackerRank 4-Star Badge",
            desc: "Achieved 4-Star Badge in JavaScript programming on HackerRank.",
            icon: "🌟"
        }
    ];

    return (
        <section
            id="achievements"
            className={`relative overflow-hidden py-20 px-4 transition-colors duration-300 ${darkMode ? "bg-transparent text-slate-100" : "bg-slate-50 text-slate-800"
                }`}
        >
            <BackgroundEffects variant="achievements" />
            <div className="relative max-w-4xl mx-auto z-10">
                <div className="flex items-center gap-3 mb-10">
                    <Award className="text-yellow-500" size={36} />
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Achievements</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {achievements.map((ach, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`p-6 rounded-2xl glass-card border flex gap-4 items-start hover:shadow-xl hover:border-yellow-500/30 transition-all cursor-pointer ${darkMode ? "border-slate-700/50 bg-slate-800/40" : "border-slate-200 bg-white/60"
                                }`}
                        >
                            <div className="text-4xl shrink-0 p-3 bg-white/10 rounded-xl dark:bg-slate-800">
                                {ach.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl leading-snug mb-2">{ach.title}</h3>
                                <p className={`text-base leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}>{ach.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
