import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Code,
  FileText,
  Mail,
  Menu,
  X,
  BarChart2,
  Award,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ scrollTo, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'stats', label: 'Stats', icon: BarChart2 },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'certifications', label: 'Certificates', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-[#020617]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_18px_55px_-32px_rgb(0_0_0_/_0.75)]"
          : "py-4 bg-[#020617]/40 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 transition-all duration-500">
        
        {/* Logo */}
        <motion.button
          type="button"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group pl-1 select-none"
          onClick={() => scrollTo('home')}
          aria-label="Go to home section"
        >
          <span className="relative hidden sm:inline-flex items-center">
            <span className="text-lg font-heading font-extrabold tracking-tight text-white">
              Prince<span className="text-gradient">.dev</span>
            </span>
            <span
              aria-hidden="true"
              className="ml-3 h-2 w-2 rounded-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_18px_rgb(34_211_238_/_0.28)]"
            />
          </span>
          <span className="sm:hidden text-white font-heading font-extrabold tracking-tight">
            Prince<span className="text-gradient">.dev</span>
          </span>
        </motion.button>

        {/* Center: Desktop Nav */}
        <div className="hidden md:block">
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/25 shadow-[0_0_40px_rgb(34_211_238_/_0.08)]">
            <div className="flex items-center gap-1 bg-[#020617]/70 backdrop-blur-xl rounded-2xl p-1 border border-white/10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-2.5 text-[11px] font-mono font-extrabold uppercase tracking-[0.22em] transition-all relative group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] ${
                    activeSection === item.id ? "text-white" : "text-slate-300/75 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Hover underline */}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary group-hover:w-2/3 transition-all duration-300 rounded-full" />

                  {/* Active pill */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-xl -z-0 border border-white/10 bg-gradient-to-r from-primary/18 to-secondary/14 shadow-[0_0_26px_rgb(34_211_238_/_0.12)]"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10 shadow-[0_0_25px_rgb(34_211_238_/_0.10)] outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[90] md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed inset-x-6 top-24 bg-[#0b1224]/95 border border-white/10 p-5 rounded-2xl z-[100] md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollTo(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-mono font-extrabold uppercase tracking-[0.2em] transition-all outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 ${
                      activeSection === item.id 
                        ? "bg-gradient-to-r from-primary/18 to-secondary/14 text-white border border-white/10 shadow-lg shadow-secondary/10" 
                        : "text-slate-300/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
