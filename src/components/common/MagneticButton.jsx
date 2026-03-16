import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, onClick, className, variant = "primary", as: Component = "button", ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  const MotionComponent = motion[Component] || motion.button;

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onPointerDown={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const ripple = {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          size: Math.max(rect.width, rect.height) * 1.2,
        };
        setRipples((prev) => [...prev.slice(-2), ripple]);
      }}
      onClick={onClick}
      className={`btn-magnetic px-8 py-4 rounded-xl font-mono font-bold uppercase tracking-wider text-sm transition-all relative overflow-hidden group inline-flex items-center justify-center gap-2 ${
        variant === "primary" 
          ? "bg-primary text-white shadow-[0_0_20px_rgb(99_102_241_/_0.3)] hover:shadow-[0_0_30px_rgb(99_102_241_/_0.5)]" 
          : "bg-transparent border border-secondary text-secondary hover:bg-secondary/10"
      } ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full bg-white/20 pointer-events-none"
          style={{
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
          }}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          onAnimationComplete={() => setRipples((prev) => prev.filter((x) => x.id !== r.id))}
        />
      ))}
      <span className="relative flex items-center gap-2 z-10">{children}</span>
    </MotionComponent>
  );
};

export default MagneticButton;
