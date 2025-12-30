"use client";

import { motion } from "framer-motion";

interface CheckmarkDrawProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  delay?: number;
  duration?: number;
  className?: string;
  isInView?: boolean;
}

export function CheckmarkDraw({
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  delay = 0,
  duration = 0.5,
  className = "",
  isInView = true,
}: CheckmarkDrawProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <motion.path
        d="M5 13l4 4L19 7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{
          pathLength: { duration, delay, ease: "easeOut" },
          opacity: { duration: 0.1, delay },
        }}
      />
    </svg>
  );
}
