"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Zap, LucideIcon } from "lucide-react";

interface LiveMetricCardProps {
  label: string;
  baseValue: number;
  unit: string;
  variance?: number;
  color: "red" | "blue";
  icon: "speed" | "power";
  updateInterval?: number;
  decimals?: number;
}

const iconMap: Record<string, LucideIcon> = {
  speed: TrendingUp,
  power: Zap,
};

const colorClasses = {
  red: {
    bg: "bg-red-500/10",
    text: "text-red-500",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
  },
};

export function LiveMetricCard({
  label,
  baseValue,
  unit,
  variance = 0.05,
  color,
  icon,
  updateInterval = 2000,
  decimals = 2,
}: LiveMetricCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [value, setValue] = useState(baseValue);
  const [isPulsing, setIsPulsing] = useState(false);

  const Icon = iconMap[icon];
  const colors = colorClasses[color];

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      const newValue = baseValue + (Math.random() - 0.5) * baseValue * variance * 2;
      setValue(Number(newValue.toFixed(decimals)));
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 300);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [isInView, baseValue, variance, updateInterval, decimals]);

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl"
      animate={isPulsing ? { scale: [1, 1.03, 1] } : {}}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg}`}
        >
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
          <motion.div
            className="font-bold text-gray-900 dark:text-white"
            key={value}
            initial={{ opacity: 0.5, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            {value} {unit}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
