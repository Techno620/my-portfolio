import React from "react";
import { motion } from "framer-motion";

type HeroButtonVariant = "primary" | "secondary" | "tertiary";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: HeroButtonVariant;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type AnchorProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
  };

type Props = ButtonProps | AnchorProps;

const variantClasses: Record<HeroButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border border-white/20 shadow-[0_12px_40px_-12px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_50px_-12px_rgba(37,99,235,0.6)] hover:brightness-110",
  secondary:
    "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
  tertiary:
    "bg-transparent text-slate-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5",
};

const base =
  "relative inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-mono font-bold uppercase tracking-widest text-xs transition-all duration-300 will-change-transform select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50";

export default function HeroButton(props: Props) {
  const { children, className = "", variant = "primary", as = "button", ...rest } = props as Props & {
    as?: "button" | "a";
  };

  const Component = as === "a" ? motion.a : motion.button;

  return (
    <Component
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`${base} ${variantClasses[variant]} ${className}`}
      {...(rest as any)}
    >
      {children}
    </Component>
  );
}
