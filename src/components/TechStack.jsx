import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Server, Settings, Palette, Cloud, Code } from "lucide-react";
import { FaJava, FaJs, FaHtml5, FaCss3, FaNodeJs, FaReact, FaGitAlt, FaGithub, FaPhp, FaDocker, FaLinux, FaLaravel, FaCode } from "react-icons/fa";
import BackgroundEffects from "./BackgroundEffects";
import { SiMysql, SiMongodb, SiPostgresql, SiExpress, SiTailwindcss, SiBootstrap, SiPostman, SiRedux } from "react-icons/si";

const TechStack = ({ darkMode }) => {
    const domains = [
        {
            title: "Programming Languages",
            icon: <Code size={20} />,
            color: "border-yellow-500 dark:border-yellow-400",
            skills: [
                { name: "Java", icon: FaJava, iconColor: "text-orange-500" },
                { name: "JavaScript", icon: FaJs, iconColor: "text-yellow-400" },
                { name: "SQL", icon: SiMysql, iconColor: "text-blue-500" },
                { name: "C", icon: FaCode, iconColor: "text-blue-400" }
            ]
        },
        {
            title: "Frontend Engineering",
            icon: <Palette size={20} />,
            color: "border-pink-500 dark:border-pink-400",
            skills: [
                { name: "React", icon: FaReact, iconColor: "text-cyan-400" },
                { name: "Redux", icon: SiRedux, iconColor: "text-purple-600" },
                { name: "Tailwind", icon: SiTailwindcss, iconColor: "text-cyan-400" },
                { name: "Bootstrap", icon: SiBootstrap, iconColor: "text-purple-500" },
                { name: "HTML5", icon: FaHtml5, iconColor: "text-orange-500" },
                { name: "CSS3", icon: FaCss3, iconColor: "text-blue-500" }
            ]
        },
        {
            title: "Backend Development",
            icon: <Server size={20} />,
            color: "border-blue-500 dark:border-blue-400",
            skills: [
                { name: "Node.js", icon: FaNodeJs, iconColor: "text-green-500" },
                { name: "Express", icon: SiExpress, iconColor: "text-gray-600 dark:text-gray-300" },
                { name: "PHP", icon: FaPhp, iconColor: "text-indigo-400" },
                { name: "Laravel", icon: FaLaravel, iconColor: "text-red-600" }
            ]
        },
        {
            title: "Database Architecture",
            icon: <Database size={20} />,
            color: "border-emerald-500 dark:border-emerald-400",
            skills: [
                { name: "MySQL", icon: SiMysql, iconColor: "text-blue-500" },
                { name: "MongoDB", icon: SiMongodb, iconColor: "text-green-500" },
                { name: "PostgreSQL", icon: SiPostgresql, iconColor: "text-blue-400" }
            ]
        },
        {
            title: "Platforms / Tools",
            icon: <Settings size={20} />,
            color: "border-orange-500 dark:border-orange-400",
            skills: [
                { name: "Git", icon: FaGitAlt, iconColor: "text-red-500" },
                { name: "GitHub", icon: FaGithub, iconColor: "text-slate-800 dark:text-slate-200" },
                { name: "Docker", icon: FaDocker, iconColor: "text-blue-500" },
                { name: "Linux", icon: FaLinux, iconColor: "text-yellow-500" },
                { name: "Postman", icon: SiPostman, iconColor: "text-orange-500" }
            ]
        }
    ];

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 640;

    return (
        <section id="techstack" className={`py-20 px-4 min-h-[200vh] flex flex-col justify-start overflow-hidden transition-colors duration-300 relative ${darkMode ? "bg-transparent" : "bg-slate-50"}`}>
            <BackgroundEffects variant="techstack" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Header */}
                <div className="text-center space-y-4 mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-base font-medium shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    >
                        <Cloud size={16} />
                        <span>Connected Neural Graph</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold tracking-tight text-gradient neon-text"
                    >
                        Skill Ecosystem
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto"
                    >
                        A mapped visualization of my technical proficiencies and their relationships.
                    </motion.p>
                </div>

                {/* Network Graph Container */}
                <div className="relative w-full max-w-5xl mx-auto" style={{ height: domains.length * (isMobile ? 180 : 280) + "px" }}>

                    {/* SVG Connections between Domains */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {domains.map((_, i) => {
                            if (i === domains.length - 1) return null;
                            const currentY = i * (isMobile ? 180 : 280) + (isMobile ? 90 : 140);
                            const nextY = (i + 1) * (isMobile ? 180 : 280) + (isMobile ? 90 : 140);
                            const textLeftOffset = isMobile ? 30 : 25; // in %
                            const textRightOffset = isMobile ? 70 : 75; // in %

                            const currentX = i % 2 === 0 ? textLeftOffset : textRightOffset;
                            const nextX = (i + 1) % 2 === 0 ? textLeftOffset : textRightOffset;

                            return (
                                <motion.line
                                    key={`line-${i}`}
                                    x1={`${currentX}%`}
                                    y1={currentY}
                                    x2={`${nextX}%`}
                                    y2={nextY}
                                    stroke="currentColor"
                                    strokeWidth={isMobile ? "2" : "3"}
                                    className="text-cyan-500/40"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            );
                        })}
                    </svg>

                    {/* Domain Nodes */}
                    {domains.map((domain, domainIdx) => {
                        const isEven = domainIdx % 2 === 0;
                        const yPos = domainIdx * (isMobile ? 180 : 280) + (isMobile ? 90 : 140);
                        const xOffset = isMobile ? 30 : 25; // Base offset in %
                        const xPos = isEven ? xOffset : 100 - xOffset;

                        return (
                            <div
                                key={domainIdx}
                                className="absolute"
                                style={{
                                    left: `${xPos}%`,
                                    top: `${yPos}px`,
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 10
                                }}
                            >
                                {/* Domain Center Node */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                                    className={`relative z-20 ${isMobile ? 'w-20 h-20' : 'w-28 h-28'} rounded-full flex items-center justify-center backdrop-blur-md bg-slate-900/90 shadow-[0_0_30px_rgba(34,211,238,0.3)] border-2 border-cyan-500 cursor-pointer group hover:scale-110 transition-transform`}
                                >
                                    {React.cloneElement(domain.icon, { className: `${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-cyan-400 drop-shadow-[0_0_8px_currentColor]` })}
                                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-cyan-500/20 backdrop-blur-md text-cyan-300 text-base font-bold px-4 py-1.5 rounded-full border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                        {domain.title}
                                    </div>
                                </motion.div>

                                {/* SVG Connections from Domain Center to Skills */}
                                <svg className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 overflow-visible" viewBox="-250 -250 500 500">
                                    {domain.skills.map((skill, skillIdx) => {
                                        const numSkills = domain.skills.length;
                                        let baseAngle = (skillIdx / numSkills) * Math.PI * 2;
                                        if (numSkills > 0) baseAngle += isEven ? Math.PI : 0;
                                        const sRadius = isMobile ? 85 : 130;
                                        const sX = Math.cos(baseAngle) * sRadius;
                                        const sY = Math.sin(baseAngle) * sRadius;

                                        return (
                                            <motion.line
                                                key={`line-${skillIdx}`}
                                                x1="0"
                                                y1="0"
                                                x2={sX}
                                                y2={sY}
                                                stroke="currentColor"
                                                strokeWidth={isMobile ? "1.5" : "2"}
                                                strokeDasharray="4,4"
                                                className="text-cyan-500/50"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                whileInView={{ pathLength: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: skillIdx * 0.1 }}
                                            />
                                        );
                                    })}
                                </svg>

                                {/* Skills Constellation */}
                                {domain.skills.map((skill, skillIdx) => {
                                    const numSkills = domain.skills.length;
                                    // Calculate angle so skills spread around the node. 
                                    // If even (left side), spread more to the left/outer bounds. If odd, spread to the right.
                                    let baseAngle = (skillIdx / numSkills) * Math.PI * 2;

                                    // Adjust layout strategically to avoid crossing the center line too much
                                    if (numSkills > 0) {
                                        // Spread skills in a full circle, but rotated based on position
                                        baseAngle += isEven ? Math.PI : 0;
                                    }

                                    const sRadius = isMobile ? 85 : 130;
                                    const sX = Math.cos(baseAngle) * sRadius;
                                    const sY = Math.sin(baseAngle) * sRadius;

                                    const Icon = skill.icon;

                                    return (
                                        <motion.div
                                            key={skillIdx}
                                            initial={{ opacity: 0, x: 0, y: 0 }}
                                            whileInView={{ opacity: 1, x: sX, y: sY }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ type: "spring", stiffness: 100, damping: 12, delay: skillIdx * 0.1 }}
                                            className="absolute left-1/2 top-1/2 z-10"
                                            style={{
                                                marginLeft: "-24px", // half of width
                                                marginTop: "-24px" // half of height
                                            }}
                                        >
                                            {/* Skill Node */}
                                            <div className="w-12 h-12 bg-slate-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-[2px] border-slate-600 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:scale-[1.2] hover:z-50 transition-all duration-300 cursor-pointer group/skill">
                                                <Icon className={`text-2xl ${skill.iconColor} group-hover/skill:drop-shadow-[0_0_8px_currentColor]`} />
                                                <div className="absolute -bottom-8 opacity-0 group-hover/skill:opacity-100 transition-opacity bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 text-cyan-50 text-sm font-black px-3 py-1.5 rounded-md whitespace-nowrap shadow-[0_0_15px_rgba(34,211,238,0.3)] pointer-events-none">
                                                    {skill.name}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
