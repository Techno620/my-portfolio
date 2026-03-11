import React, { useState } from "react";
import { Home, User, FileText, Code, Mail, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ darkMode, scrollTo, activeSection }) => {
  const [hoveredTab, setHoveredTab] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'techstack', label: 'Skills', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-4xl z-50 rounded-full transition-all duration-300 border-[2px] ${darkMode ? "border-purple-600 bg-slate-900 text-slate-100 shadow-md" : "border-purple-300 bg-white text-slate-800 shadow-sm"
        }`}
    >
      <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-mono font-extrabold text-lg md:text-xl tracking-wider cursor-pointer select-none text-purple-600 dark:text-purple-400"
          onClick={() => scrollTo && scrollTo("home")}
        >
          Prince Kumar
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            // Logic: Pill is on Hovered item, OR on Active item if nothing is hovered
            const isHighlighted = hoveredTab ? hoveredTab === item.id : isActive;

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo && scrollTo(item.id)}
                onHoverStart={() => setHoveredTab(item.id)}
                onHoverEnd={() => setHoveredTab(null)}
                whileTap={{ scale: 0.95 }}
                className="relative px-3 py-2 rounded-xl flex items-center gap-2 transition-colors duration-200"
              >
                {/* Visual Sliding Pill - Solid */}
                {isHighlighted && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-blue-100 dark:bg-slate-800 rounded-full border border-blue-300 dark:border-purple-600 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${isActive ? (darkMode ? "text-purple-400" : "text-purple-700") : (darkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800")
                  }`}>
                  <Icon size={18} />
                  <span className="text-sm font-medium hidden md:block">{item.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;