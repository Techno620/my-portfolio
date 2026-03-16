import React from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Terminal, 
  Cpu, 
  Database, 
  Cloud, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Layers,
  Sparkles
} from 'lucide-react';
import TechOrbit from './TechOrbit';
import { fadeInUp, staggerContainer } from '../utils/animations';

const PipelineNode = ({ icon: Icon, title, tech, delay, isLast }) => (
  <div className="relative flex flex-col items-center flex-1">
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: 'spring', damping: 12 }}
      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group hover:border-primary/50 transition-all duration-500 relative z-10 shadow-lg"
    >
      <div className="absolute inset-0 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
      <Icon size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
    </motion.div>
    
    <div className="mt-4 text-center">
      <p className="text-[10px] font-mono font-black text-white uppercase tracking-widest mb-1">{title}</p>
      <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-tight">{tech}</p>
    </div>

    {!isLast && (
      <div className="absolute top-7 md:top-8 left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] h-px bg-gradient-to-r from-primary/30 via-primary to-primary/30 opacity-20 hidden md:block" />
    )}
  </div>
);

const TechnologyEcosystem = () => {
  return (
    <section className="section relative overflow-hidden bg-transparent py-24 md:py-32">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 text-primary">
                <span className="w-12 h-px bg-primary/50" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.4em]">TECH.ECOSYSTEM()</span>
              </motion.div>
              
              <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter leading-[0.95]">
                ENGINEERING <br />
                <span className="text-gradient">STACK</span>
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground font-medium leading-relaxed max-w-lg">
                My development workflow combines modern frontend frameworks, scalable backend services, and cloud-ready infrastructure to build reliable full-stack systems.
              </motion.p>

              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck size={18} />
                    <span className="text-2xl font-black font-heading text-white">40+</span>
                  </div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">Core Concepts Applied</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Layers size={18} />
                    <span className="text-2xl font-black font-heading text-white">100%</span>
                  </div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">Scalable Architecture</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right 3D Visualization */}
          <div className="lg:col-span-7 relative h-[500px] md:h-[700px] lg:h-[800px] w-full rounded-[3rem] overflow-hidden glass-card border-white/5">
            <div className="absolute top-8 left-8 z-20">
              <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-black text-white uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Live 3D Visualization
              </div>
            </div>
            
            <TechOrbit />
          </div>

        </div>

        {/* Architecture Pipeline */}
        <div className="mt-32 space-y-20">
          <div className="max-w-4xl mx-auto text-center space-y-4">
             <div className="flex items-center justify-center gap-4 text-primary">
                <span className="w-8 h-px bg-primary/30" />
                <h3 className="text-sm font-mono font-black uppercase tracking-[0.4em] text-white">Architecture Pipeline</h3>
                <span className="w-8 h-px bg-primary/30" />
             </div>
             <p className="text-slate-500 text-xs font-mono font-bold uppercase tracking-widest">End-to-end full stack execution flow</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-4 relative px-4">
            <PipelineNode icon={Monitor} title="Frontend" tech="React / Next.js" delay={0.1} />
            <PipelineNode icon={Terminal} title="API Layer" tech="Node / Express" delay={0.2} />
            <PipelineNode icon={Cpu} title="Logic" tech="JS / Java / PHP" delay={0.3} />
            <PipelineNode icon={Database} title="Storage" tech="NoSQL / SQL" delay={0.4} />
            <PipelineNode icon={Layers} title="Infra" tech="Docker" delay={0.5} />
            <PipelineNode icon={Cloud} title="Cloud" tech="AWS / CI/CD" delay={0.6} isLast />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyEcosystem;
