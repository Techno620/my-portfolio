import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Code,
  Briefcase,
  FileText,
  Mail,
  Menu,
  X,
  BarChart2,
  Award,
  Trophy,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ scrollTo, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'stats', label: 'Stats', icon: BarChart2 },
    { id: 'resume', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certificates', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${isScrolled
        ? "py-3 bg-[#020617]/95 backdrop-blur-3xl border-cyan-500/30 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.2)]"
        : "py-4 bg-[#080d1f]/90 backdrop-blur-2xl border-cyan-500/40 shadow-[0_5px_30px_-10px_rgba(0,0,0,0.8)]"
        }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06),transparent_80%)]" />

      <nav className="relative mx-auto max-w-6xl flex items-center justify-between gap-4 xl:gap-6 px-4 sm:px-6 transition-all duration-500">

        {/* Logo */}
        <button
          type="button"
          className="group relative z-50 flex items-center select-none outline-none transition-transform hover:scale-[1.02]"
          onClick={() => scrollTo('home')}
          aria-label="Go to home section"
        >
          <span className="font-heading text-xl md:text-2xl font-black tracking-tighter text-white transition-colors group-hover:text-cyan-50">
            <span className="text-cyan-400 font-mono tracking-tight mr-1 opacity-80">&lt;</span>
            Prince<span className="text-cyan-400">.dev</span>
            <span className="text-cyan-400 font-mono tracking-tight ml-1.5 opacity-80">/&gt;</span>
          </span>
        </button>

        {/* Center/Right: Desktop Nav */}
        <div className="hidden lg:block z-50 pl-3 xl:pl-5">
          <div className="relative overflow-hidden rounded-[1.7rem] p-[1px] bg-[linear-gradient(120deg,rgba(34,211,238,0.45),rgba(59,130,246,0.18),rgba(99,102,241,0.38))] shadow-[0_0_50px_rgba(34,211,238,0.12)]">
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-1 left-[-20%] w-24 rounded-full bg-white/15 blur-2xl"
              animate={{ x: ["0%", "360%"] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative flex items-center gap-0.5 rounded-[1.65rem] border border-white/10 bg-[linear-gradient(135deg,rgba(2,6,23,0.88),rgba(15,23,42,0.72))] p-1 backdrop-blur-2xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-2.5 xl:px-3.5 py-2 text-[9px] xl:text-[10px] font-mono font-extrabold uppercase tracking-[0.1em] xl:tracking-[0.15em] transition-all relative group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] ${activeSection === item.id
                    ? "text-white"
                    : "text-slate-300/78 hover:text-white hover:-translate-y-0.5"
                    }`}
                >
                  <span className="relative z-10 inline-flex items-center gap-1.5 xl:gap-2">
                    <item.icon size={14} className={activeSection === item.id ? "text-cyan-200" : "text-slate-400 transition-colors group-hover:text-cyan-200"} />
                    {item.label}
                  </span>

                  {/* Hover underline */}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 group-hover:w-2/3 transition-all duration-300 rounded-full" />

                  {/* Active pill */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 -z-0 rounded-2xl border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(59,130,246,0.08),rgba(129,140,248,0.16))] shadow-[0_0_32px_rgba(34,211,238,0.14)]"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            className="relative w-11 h-11 flex items-center justify-center text-white rounded-2xl border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(14,23,43,0.92),rgba(8,15,32,0.96))] shadow-[0_0_28px_rgba(34,211,238,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:shadow-[0_0_36px_rgba(34,211,238,0.18)] outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
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
              className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),rgba(2,6,23,0.94)_45%)] backdrop-blur-lg z-[90] lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              id="mobile-navigation"
              className="fixed inset-x-5 top-24 overflow-hidden rounded-[1.8rem] border border-cyan-300/18 bg-[linear-gradient(180deg,rgba(9,16,34,0.96),rgba(7,12,27,0.98))] p-5 z-[100] lg:hidden shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)]"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <div className="pointer-events-none absolute -top-16 right-0 h-36 w-36 rounded-full bg-cyan-300/12 blur-3xl" />

              <div className="relative mb-4 flex items-center justify-between border-b border-white/8 pb-4">
                <div>
                  <p className="font-heading text-lg font-black tracking-tight text-white">
                    Prince<span className="text-gradient">.dev</span>
                  </p>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200/70">
                    &lt;/&gt; Navigate Portfolio
                  </p>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100">
                  Menu
                </span>
              </div>

              <div className="relative flex flex-col gap-3">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      scrollTo(item.id);
                      setIsMenuOpen(false);
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`group flex items-center justify-between gap-4 px-5 py-4 rounded-2xl text-sm font-mono font-extrabold uppercase tracking-[0.2em] transition-all outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 ${activeSection === item.id
                      ? "border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(59,130,246,0.08),rgba(129,140,248,0.12))] text-white shadow-lg shadow-cyan-500/10"
                      : "border border-white/6 text-slate-300/80 hover:border-cyan-300/15 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${activeSection === item.id
                        ? "border-cyan-200/20 bg-cyan-300/10 text-cyan-100"
                        : "border-white/8 bg-white/4 text-slate-300 group-hover:text-cyan-100"
                        }`}>
                        <item.icon size={18} />
                      </span>
                      {item.label}
                    </span>
                    <ChevronRight size={16} className={activeSection === item.id ? "text-cyan-100" : "text-slate-500 group-hover:text-cyan-200"} />
                  </motion.button>
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
