import React from "react";
import { Download, Briefcase, GraduationCap, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "./common/MagneticButton";

const revealContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const revealItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const timelineLine = {
  hidden: { scaleY: 0, opacity: 0.55 },
  visible: { scaleY: 1, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const SpotlightCard = ({ accent, shadow, children, className = "" }) => {
  const ref = React.useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--sx", `${x}%`);
    el.style.setProperty("--sy", `${y}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--sx", `50%`);
    el.style.setProperty("--sy", `50%`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tech-card p-6 md:p-8 border border-white/10 backdrop-blur-2xl shadow-[0_12px_40px_-28px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:border-white/15 ${shadow} ${className}`}
      style={{
        background:
          "radial-gradient(520px circle at var(--sx, 50%) var(--sy, 50%), rgba(255,255,255,0.06), transparent 56%), linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))",
      }}
    >
      <div className={`absolute inset-0 pointer-events-none opacity-100 ${accent}`} />
      <div className="relative">{children}</div>
    </div>
  );
};

const Resume = () => {
  const experiences = [
    {
      role: "MERN Stack Development Trainee",
      company: "CipherSchools",
      duration: "Jun 2025 - Jul 2025",
      desc: "Constructed full-stack web applications with modular backend architecture. Practiced CRUD operations and API testing aligned with SDLC. Validated endpoints using Postman and managed workflows via Git.",
      skills: ["React.js", "Node.js", "MongoDB", "Express.js"]
    }
  ];

  const education = [
    {
      degree: "B.Tech - Computer Science and Engineering",
      school: "Lovely Professional University, Punjab",
      year: "Aug 2024 - Present",
      grade: "Pursuing"
    },
    {
      degree: "Diploma - Computer Science and Engineering",
      school: "Lovely Professional University, Punjab",
      year: "Jul 2022 - Jun 2024",
      grade: "Completed"
    },
    {
      degree: "Intermediate",
      school: "MKD Public School, Bihar",
      year: "Jun 2019 - Jul 2021",
      grade: "Completed"
    }
  ];

  return (
    <section className="section relative overflow-hidden bg-transparent">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={revealContainer}
            className="text-center max-w-3xl mx-auto mb-20 space-y-4"
          >
              <motion.div
                variants={revealItem}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-secondary text-xs font-mono font-bold uppercase tracking-widest"
              >
                <Award size={14} /> Technical Dossier
              </motion.div>
            <motion.h2
              variants={revealItem}
              className="text-4xl md:text-5xl font-heading font-bold text-foreground"
            >
              Evolution of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Expertise
              </span>
            </motion.h2>
            <motion.div
              variants={revealItem}
              className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience Column */}
          <motion.div variants={revealItem} className="space-y-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Briefcase size={20} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Experience</h3>
            </div>

            <motion.div variants={revealContainer} className="relative space-y-8 pl-10">
              {/* Timeline line */}
              <motion.div
                aria-hidden="true"
                variants={timelineLine}
                className="absolute left-3 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-secondary/0 via-secondary/35 to-secondary/0"
              />
              {experiences.map((exp, i) => (
                <motion.div key={i} variants={revealItem} className="relative">
                  {/* Timeline Dot */}
                <div className="absolute left-3 top-7 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020617] border-2 border-primary/60 shadow-[0_0_12px_rgba(34,211,238,0.35)] z-10" />
                  
                  <SpotlightCard
                    accent="bg-gradient-to-br from-primary/10 via-transparent to-transparent"
                    shadow="hover:shadow-[0_22px_55px_-40px_rgba(34,211,238,0.28)] hover:border-secondary/35"
                    className="group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="space-y-1">
                        <h4 className="text-xl font-heading font-bold text-foreground group-hover:text-secondary transition-colors">
                          {exp.role}
                        </h4>
                        <p className="text-secondary/85 font-mono text-sm font-bold uppercase tracking-wider">
                          {exp.company}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-200/70 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                        <Calendar size={12} className="text-secondary" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    <p className="text-slate-200/80 text-sm leading-relaxed mb-6">
                      {exp.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, si) => (
                        <span key={si} className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 text-white/90 border border-white/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Education Column */}
          <motion.div variants={revealItem} className="space-y-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Education</h3>
            </div>

            <motion.div variants={revealContainer} className="relative space-y-8 pl-10">
              {/* Timeline line */}
              <motion.div
                aria-hidden="true"
                variants={timelineLine}
                className="absolute left-3 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-secondary/0 via-secondary/35 to-secondary/0"
              />
              {education.map((edu, i) => (
                <motion.div key={i} variants={revealItem} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-3 top-7 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020617] border-2 border-secondary/70 shadow-[0_0_12px_rgba(34,211,238,0.32)] z-10" />
                  
                  <SpotlightCard
                    accent="bg-gradient-to-br from-secondary/10 via-transparent to-transparent"
                    shadow="hover:shadow-[0_22px_55px_-40px_rgba(34,211,238,0.26)] hover:border-secondary/35"
                    className="group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="text-xl font-heading font-bold text-foreground group-hover:text-secondary transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-secondary/85 font-mono text-xs font-bold uppercase tracking-widest">
                          {edu.school}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-slate-200/70 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                        <Calendar size={12} className="text-secondary" />
                        <span>{edu.year}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${
                        edu.grade === "Pursuing" 
                        ? "bg-secondary/10 text-secondary border-secondary/20" 
                        : "bg-white/5 text-slate-200/70 border-white/10"
                      }`}>
                        {edu.grade}
                      </span>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          </div>
        </motion.div>

        {/* Action Button */}
        <div className="text-center mt-20">
          <MagneticButton
            as="a"
            href="/resume.pdf"
            download
            className="px-10 py-4"
          >
            <Download size={20} />
            Download Resume
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Resume;
