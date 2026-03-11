import React from 'react';
const Footer = ({ darkMode }) => {
  return (
    <footer className={`relative py-8 text-center mt-20 border-t ${darkMode ? "bg-slate-900 border-white/5 text-slate-400" : "bg-white border-slate-200 text-slate-600"}`}>
      {/* Vibrant Multi-Color Top Border */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-pink-500 via-emerald-500 to-orange-500 opacity-80" />
      <p>
        © {new Date().getFullYear()} Prince Kumar. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;