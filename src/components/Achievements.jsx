import React from "react";
import { Award, Terminal, Trophy, Star, Target, Code, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Achievements = () => {
    const achievements = [
        {
            title: "University Gold Medal",
            desc: "Highest cumulative performance in the Diploma program.",
            icon: <Trophy size={20} />,
        },
        {
            title: "100+ LeetCode Solutions",
            desc: "Advanced algorithms in DP and Graphs.",
            icon: <Code size={20} />,
        },
        {
            title: "Academic Achiever Award",
            desc: "Received twice for outstanding performance.",
            icon: <Award size={20} />,
        },
        {
            title: "HackerRank Gold",
            desc: "5-Star Gold Badge in Java programming.",
            icon: <Star size={20} />,
        }
    ];

    const training = [
        {
            title: "MERN Stack Development",
            issuer: "CipherSchools",
            date: "Jun 2025 – Jul 2025",
            bullets: [
                "Constructed full-stack apps with modular backend architecture.",
                "Practiced CRUD, API testing, and database integration.",
                "Validated request-response cycles using Postman.",
                "Utilized Git for collaborative development workflows."
            ]
        }
    ];

    return (
        <section className="section relative">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20">
                    
                    {/* Left: Achievements */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-primary font-bold tracking-[0.3em] uppercase text-sm"
                            >
                                Recognition
                            </motion.div>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-heading font-black tracking-tight text-white"
                            >
                                System <span className="text-gradient">Milestones</span>
                            </motion.h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {achievements.map((ach, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 glass-card rounded-2xl border border-white/5 hover:border-primary/30 transition-all group overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-4 relative z-10">
                                        {ach.icon}
                                    </div>
                                    <h3 className="text-lg font-heading font-bold text-white mb-2 relative z-10 group-hover:text-primary transition-colors">{ach.title}</h3>
                                    <p className="text-muted-foreground text-xs leading-relaxed relative z-10">{ach.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Training */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-secondary font-bold tracking-[0.3em] uppercase text-sm"
                            >
                                Specialized Training
                            </motion.div>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-heading font-black tracking-tight text-white"
                            >
                                Hands-on <span className="text-gradient">Training</span>
                            </motion.h2>
                        </div>

                        {training.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="glass-card p-10 rounded-2xl border-white/5 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl -z-10" />
                                
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-secondary transition-colors">{item.title}</h3>
                                        <div className="text-secondary font-bold uppercase tracking-widest text-xs">{item.issuer}</div>
                                    </div>
                                    <div className="text-muted-foreground text-xs font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                        {item.date}
                                    </div>
                                </div>

                                <ul className="space-y-4">
                                    {item.bullets.map((bullet, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-sm text-muted-foreground leading-relaxed">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0 shadow-[0_0_8px_var(--color-secondary)]" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
