import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: "GitHub", href: "https://github.com/prince093kumar", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/in/prince093kumar", icon: Linkedin },
    { label: "Email", href: "mailto:princekumar09372@gmail.com", icon: Mail },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black/15 backdrop-blur-xl">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute inset-0 bg-grid" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="space-y-2">
            <p className="text-white font-heading font-black tracking-tight text-xl">
              Prince<span className="text-primary">.dev</span>
            </p>
            <p className="text-muted-foreground text-sm font-medium max-w-md">
              Full‑stack developer building clean UI, secure APIs, and scalable systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-11 h-11 rounded-md border-2 border-white/10 bg-surface/30 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/35 hover:bg-primary/10 transition-all"
                aria-label={label}
                title={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-slate-500 text-[11px] font-mono font-bold uppercase tracking-[0.25em]">
            © {year} Prince Kumar
          </p>
          <p className="text-slate-600 text-[11px] font-mono font-bold uppercase tracking-[0.25em]">
            Built with React + Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

