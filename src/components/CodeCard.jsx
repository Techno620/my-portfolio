import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CodeCard = () => {
    const [text, setText] = useState("");
    const fullText = `class SoftwareEngineer {
  constructor() {
    this.name = "Prince Kumar";
    this.role = "Full Stack Developer";
    this.specialties = [
      "System Architecture",
      "REST API Engineering",
      "Frontend Engineering"
    ];
    this.philosophy = "Build systems that scale.";
  }
}`;

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(timer);
        }, 15);
        return () => clearInterval(timer);
    }, [fullText]);

    const highlightCode = (code) => {
        return code.split('\n').map((line, i) => {
            // Very basic syntax highlighting for the demo
            let formattedLine = line
                .replace(/class|constructor|this|new/g, '<span class="text-secondary">$&</span>')
                .replace(/Prince Kumar|Full Stack Developer|System Architecture|REST API Engineering|Frontend Engineering|Build systems that scale./g, '<span class="text-secondary">"$&"</span>')
                .replace(/name|role|specialties|philosophy/g, '<span class="text-secondary">$&</span>');
            
            return (
                <div key={i} className="min-h-[1.5em] flex gap-4">
                    <span className="text-white/10 w-4 text-right select-none">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
                </div>
            );
        });
    };

    return (
        <div className="w-full glass-card border-white/5 bg-black/60 backdrop-blur-3xl overflow-hidden font-mono text-[13px] leading-relaxed group transition-all duration-500 hover:shadow-[0_0_50px_rgb(34_211_238_/_0.10)]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary/70" />
                    <div className="w-3 h-3 rounded-full bg-secondary/70" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">
                    SoftwareEngineer.js
                </div>
            </div>

            {/* Content */}
            <div className="p-8 text-slate-300">
                {highlightCode(text)}
                <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-primary ml-1"
                />
            </div>
        </div>
    );
};

export default CodeCard;
