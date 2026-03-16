import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, Database, Cloud, Zap } from 'lucide-react';

const ArchitectureNode = ({ icon: Icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center gap-2 group"
  >
    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 shadow-xl group-hover:shadow-primary/20 relative">
        <Icon size={24} />
        {/* Connection Line Pulsing */}
        <div className="absolute -bottom-8 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
      {label}
    </span>
  </motion.div>
);

const ConnectionLine = ({ delay }) => (
  <div className="flex-1 h-px bg-white/5 relative mx-2">
    <motion.div
      initial={{ width: "0%" }}
      whileInView={{ width: "100%" }}
      transition={{ delay, duration: 1 }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
    />
  </div>
);

const SystemArchitecture = () => {
  return (
    <div className="glass-card p-10 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <Zap size={18} className="text-primary animate-pulse" />
          <h4 className="text-sm font-mono font-black uppercase tracking-[0.3em] text-white">System Architecture</h4>
        </div>

        <div className="flex items-center justify-between gap-1">
          <ArchitectureNode icon={Monitor} label="Frontend" delay={0.2} />
          <ConnectionLine delay={0.4} />
          <ArchitectureNode icon={Zap} label="API" delay={0.6} />
          <ConnectionLine delay={0.8} />
          <ArchitectureNode icon={Cpu} label="Logic" delay={1.0} />
          <ConnectionLine delay={1.2} />
          <ArchitectureNode icon={Database} label="Data" delay={1.4} />
          <ConnectionLine delay={1.6} />
          <ArchitectureNode icon={Cloud} label="Cloud" delay={1.8} />
        </div>

        <div className="mt-12 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center leading-relaxed">
                Distributed MERN Stack with <span className="text-primary">Docker</span> & <span className="text-primary">AWS</span> Integration
            </p>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
