import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: "GitHub", href: "https://github.com/prince093kumar", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/in/prince093kumar", icon: Linkedin },
    { label: "Email", href: "mailto:princekumar09372@gmail.com", icon: Mail },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#020617] border-t border-cyan-500/20 overflow-hidden">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.05),transparent_50%)]" />
      <div className="pointer-events-none absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          
          {/* Brand & Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <button 
              onClick={scrollToTop}
              className="group relative flex items-center gap-2 select-none outline-none transition-transform hover:scale-[1.02]"
              title="Back to top"
            >
              <span className="font-heading text-2xl font-black tracking-tighter text-white transition-colors group-hover:text-cyan-50">
                <span className="text-cyan-400 font-mono tracking-tight mr-1 opacity-80">&lt;</span>
                Prince<span className="text-cyan-400">.dev</span>
                <span className="text-cyan-400 font-mono tracking-tight ml-1.5 opacity-80">/&gt;</span>
              </span>
            </button>
            <p className="text-slate-400 text-sm font-medium max-w-xs leading-relaxed">
              Architecting secure APIs, scalable systems, and pixel-perfect UIs with premium cyber aesthetics.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {links.map(({ label, href, icon: Icon }) => (
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-[#0B1221]/80 text-cyan-100/70 shadow-[0_0_20px_rgba(34,211,238,0.05)] backdrop-blur-xl transition-colors hover:border-cyan-400/40 hover:text-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] group overflow-hidden"
                aria-label={label}
                title={label}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Icon size={20} className="relative z-10" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Separator & Footer Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-cyan-500/10 pt-6 md:flex-row">
          <p className="text-slate-500 text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em]">
            © {year} Prince Kumar. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500/70 transition-colors hover:text-cyan-400 focus:outline-none"
          >
            <span>Back To Top</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/5 transition-all group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10 group-hover:-translate-y-1">
              <ArrowUp size={12} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
