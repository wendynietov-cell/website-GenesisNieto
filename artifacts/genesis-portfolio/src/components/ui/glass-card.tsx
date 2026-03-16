import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function GlassCard({ children, className, dark = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-3xl p-8 overflow-hidden relative transition-all duration-300",
        dark ? "glass-dark" : "glass",
        "hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.07)]",
        className
      )}
      {...props}
    >
      {/* Subtle inner highlight */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
