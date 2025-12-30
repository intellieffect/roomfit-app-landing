"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  className?: string;
  isInView?: boolean;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 1,
  delay = 0,
  decimals = 0,
  className = "",
  isInView = true,
}: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (val) => val.toFixed(decimals));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const controls = animate(count, to, {
        duration,
        delay,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [count, to, duration, delay, isInView]);

  return <motion.span className={className}>{rounded}</motion.span>;
}
