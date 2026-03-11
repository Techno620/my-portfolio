import React from "react";
import { FileText, Download, Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import BackgroundEffects from "./BackgroundEffects";

const Resume = ({ darkMode }) => {
  const experiences = [
    {
      role: "MERN Stack Development Trainee",
      company: "CipherSchools",
      duration: "Jun '25 - Jul '25",
      desc: "Completed industry-oriented training in full-stack development. Gained practical experience in MongoDB, Express.js, React.js, Node.js, and RESTful API development. Crafted the Recipe Generator full-stack project."
    }
  ];

  const education = [
    {
      degree: "B.Tech - Computer Science and Engineering",
      school: "Lovely Professional University, Punjab",
      year: "Aug '24 - Present",
    },
    {
      degree: "Diploma - Computer Science and Engineering",
      school: "Lovely Professional University, Punjab",
      year: "Jul '22 - Jun '24",
    },
    {
      degree: "Intermediate",
      school: "MKD Public School, Bihar",
      year: "Jun '19 - Jul '21",
    }
  ];

  return (
    <section
      id="resume"
      className={`relative overflow-hidden py-24 px-6 transition-colors duration-300 ${darkMode ? "bg-transparent text-slate-100" : "bg-slate-50 text-slate-800"
        }`}
    >
      <BackgroundEffects variant="resume" />
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">

        {/* Heading */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <FileText className="text-blue-500" size={36} />
            <h2 className="text-5xl font-extrabold tracking-tight">
              Resume & Journey
            </h2>
          </motion.div>
          <p className={`max-w-2xl mx-auto text-xl ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            A professional timeline of my training and academic background.
          </p>
        </div>

        {/* Top Row: Experience & Education */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Experience / Training */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="text-purple-500" size={28} />
              <h3 className="text-3xl font-bold">Training & Experience</h3>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border glass-card relative ${darkMode ? "border-slate-700/50" : "border-slate-200"
                    }`}
                >
                  <div className="absolute left-0 top-8 w-1 h-12 bg-purple-500 rounded-r-lg" />
                  <h4 className="text-2xl font-bold">{exp.role}</h4>
                  <p className="text-purple-500 font-medium text-lg mb-1">{exp.company}</p>
                  <span className={`text-sm px-3 py-1 rounded-full ${darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"}`}>
                    {exp.duration}
                  </span>
                  <p className={`mt-3 text-base leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {exp.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="text-blue-500" size={28} />
              <h3 className="text-3xl font-bold">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border glass-card relative ${darkMode ? "border-slate-700/50" : "border-slate-200"
                    }`}
                >
                  <div className="absolute left-0 top-8 w-1 h-12 bg-blue-500 rounded-r-lg" />
                  <h4 className="text-2xl font-bold">{edu.degree}</h4>
                  <p className="text-blue-500 font-medium text-lg mb-1">{edu.school}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className={`px-3 py-1 rounded-full ${darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"}`}>
                      {edu.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center pt-8">
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download="Prince_Kumar_Resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all"
          >
            <Download size={20} />
            Download Full Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
