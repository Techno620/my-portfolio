import React, { useState, useEffect } from "react";
import { Home, User, Code, FileText, Mail, Menu, X, Rocket, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ scrollTo, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Rocket },
    { id: 'stats', label: 'Stats', icon: BarChart2 },
    { id: 'resume', label: 'Resume', icon: FileText },
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
          ? "py-3 bg-[#020617]/75 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_60px_-30px_rgb(0_0_0_/_0.75)]"
          : "py-5 bg-[#020617]/45 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 transition-all duration-500">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group pl-1"
          onClick={() => scrollTo('home')}
        >
          <div className="w-9 h-9 rounded-md bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Rocket size={18} fill="currentColor" />
          </div>
          <span className="text-lg font-heading font-bold tracking-tight text-white hidden sm:block">
            Prince<span className="text-gradient">.dev</span>
          </span>
        </motion.div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:block">
          <div className="p-[2px] rounded-xl bg-gradient-to-r from-primary/35 via-secondary/20 to-highlight/30 shadow-[0_0_40px_rgb(99_102_241_/_0.12)]">
            <div className="flex items-center gap-1.5 bg-[#020617]/65 backdrop-blur-xl rounded-xl p-1.5 border border-white/10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-5 py-2 text-[11px] font-mono font-bold uppercase tracking-widest transition-all relative group rounded-lg ${
                    activeSection === item.id ? "text-white" : "text-slate-300/80 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Hover underline */}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary via-highlight to-secondary group-hover:w-1/2 transition-all duration-300 rounded-full" />

                  {/* Active pill */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-lg -z-0 border border-white/10 bg-gradient-to-r from-primary/18 via-highlight/12 to-secondary/18 shadow-[0_0_25px_rgb(99_102_241_/_0.18)]"
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
            className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10 shadow-[0_0_25px_rgb(99_102_241_/_0.12)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              className="fixed inset-x-6 top-24 bg-[#0b1224]/95 border border-white/10 p-6 rounded-xl z-[100] md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollTo(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-mono font-bold uppercase tracking-[0.2em] transition-all ${
                      activeSection === item.id 
                        ? "bg-gradient-to-r from-primary/18 via-highlight/10 to-secondary/16 text-white border border-white/10 shadow-lg shadow-primary/10" 
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
