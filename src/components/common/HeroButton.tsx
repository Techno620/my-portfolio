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
    "bg-blue-500 text-white hover:bg-blue-600 shadow-[0_10px_30px_-18px_rgba(59,130,246,0.55)] hover:shadow-[0_18px_45px_-22px_rgba(59,130,246,0.75)]",
  secondary:
    "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-[0_18px_45px_-24px_rgba(59,130,246,0.60)]",
  tertiary:
    "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:shadow-[0_18px_45px_-30px_rgba(255,255,255,0.12)]",
};

const base =
  "relative inline-flex items-center justify-center px-6 py-3 rounded-lg font-mono font-black uppercase tracking-wider text-sm transition-all duration-200 will-change-transform select-none";

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

