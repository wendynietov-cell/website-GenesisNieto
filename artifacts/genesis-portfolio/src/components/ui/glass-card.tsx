import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function GlassCard({ children, className, dark = false, ...props }: GlassCardProps) {
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = shimmerRef.current;
    if (!el) return;

    const shimmerColor = dark
      ? "linear-gradient(105deg, transparent 25%, rgba(255,220,150,0.12) 48%, rgba(195,162,122,0.08) 54%, transparent 72%)"
      : "linear-gradient(105deg, transparent 25%, rgba(255,252,248,0.28) 48%, rgba(200,168,137,0.14) 54%, transparent 72%)";

    el.style.background = shimmerColor;

    const KEYFRAMES: Keyframe[] = [
      { transform: "translateX(-160%) skewX(-15deg)", opacity: 0 },
      { transform: "translateX(-80%) skewX(-15deg)", opacity: 1, offset: 0.1 },
      { transform: "translateX(80%) skewX(-15deg)", opacity: 1, offset: 0.9 },
      { transform: "translateX(260%) skewX(-15deg)", opacity: 0 },
    ];
    const OPTIONS: KeyframeAnimationOptions = {
      duration: 1400,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
    };

    let anim: Animation | null = null;
    const trigger = () => {
      if (anim) { anim.cancel(); anim = null; }
      anim = el.animate(KEYFRAMES, OPTIONS);
    };

    const initialDelay = Math.random() * 3500;
    const t = setTimeout(() => {
      trigger();
      const iv = setInterval(trigger, 5000);
      (el as any).__shimmerInterval = iv;
    }, initialDelay);

    return () => {
      clearTimeout(t);
      const iv = (el as any).__shimmerInterval;
      if (iv) clearInterval(iv);
      if (anim) anim.cancel();
    };
  }, [dark]);

  return (
    <motion.div
      className={cn(
        "rounded-3xl p-8 overflow-hidden relative transition-all duration-300",
        dark ? "glass-dark" : "glass",
        dark
          ? "hover:shadow-[0_20px_60px_0_rgba(0,0,0,0.35)]"
          : "hover:shadow-[0_16px_48px_0_rgba(92,60,44,0.10)]",
        className
      )}
      {...props}
    >
      {/* Inner highlight ring */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          boxShadow: dark
            ? "inset 0 1px 0 rgba(195,162,122,0.3), inset 0 -1px 0 rgba(195,162,122,0.08)"
            : "inset 0 1px 0 rgba(200,168,137,0.55), inset 0 -1px 0 rgba(200,168,137,0.15)",
        }}
      />

      {/* Shimmer stripe */}
      <div
        ref={shimmerRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          transform: "translateX(-160%) skewX(-15deg)",
          opacity: 0,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
