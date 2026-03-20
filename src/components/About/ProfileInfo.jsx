import React from "react";
import { motion } from "framer-motion";
import { User, MapPin, GraduationCap, Code2, Sparkles, Mail, Github, Linkedin } from "lucide-react";

const ProfileInfo = () => {
  return (
    <div className="relative w-full rounded-2xl bg-[#0a0f1c]/80 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-secondary/10 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 p-8 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Profile Image/Avatar Avatar Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="relative shrink-0"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-primary via-secondary to-purple-500">
            <div className="w-full h-full rounded-full bg-[#0a0f1c] flex items-center justify-center border-4 border-[#0a0f1c] overflow-hidden relative">
              <User size={64} className="text-slate-400 opacity-50" />
              {/* Optional: If the user provides an image, they can place an <img /> here. */}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">
            <Sparkles size={16} className="text-secondary animate-pulse" />
          </div>
        </motion.div>

        {/* Profile Details */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight">
              Prince Kumar
            </h4>
            <p className="text-primary font-mono font-bold uppercase tracking-widest text-sm mt-2">
              Full Stack Developer
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="flex items-center gap-3 text-slate-300">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <GraduationCap size={14} className="text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Education</p>
                <p className="text-sm font-medium">B.Tech 5th Sem (DevOps)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <Code2 size={14} className="text-primary" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Core Focus</p>
                <p className="text-sm font-medium">MERN stack & Scalability</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <MapPin size={14} className="text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Location</p>
                <p className="text-sm font-medium">India</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-300">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <Mail size={14} className="text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Contact</p>
                <p className="text-sm font-medium">prince.dev@portfolio</p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex items-center justify-center md:justify-start gap-4"
          >
            <a href="#contact" className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
              Get in Touch
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-[#0a66c2] hover:bg-white/10 transition-colors">
              <Linkedin size={18} />
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
