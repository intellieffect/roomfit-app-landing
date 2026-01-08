"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Fixed data points for the line chart
const DATA_POINTS = [
  { x: 0, y: 75 },
  { x: 1, y: 68 },
  { x: 2, y: 72 },
  { x: 3, y: 65 },
  { x: 4, y: 58 },
  { x: 5, y: 62 },
  { x: 6, y: 55 },
  { x: 7, y: 48 },
];

const TURNING_POINT_INDEX = 3;

export function LineChartDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const width = 280;
  const height = 160;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Scale data to chart dimensions
  const maxY = Math.max(...DATA_POINTS.map((p) => p.y));
  const minY = Math.min(...DATA_POINTS.map((p) => p.y));
  const yRange = maxY - minY || 1;

  const points = DATA_POINTS.map((p, i) => ({
    x: padding + (i / (DATA_POINTS.length - 1)) * chartWidth,
    y: padding + ((maxY - p.y) / yRange) * chartHeight,
    originalY: p.y,
  }));

  // Create SVG path
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div
      ref={ref}
      className="bg-gray-800 rounded-2xl p-4 shadow-xl w-[280px]"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-400">
          속도 변화
        </span>
        <span className="text-xs text-primary font-medium">m/s</span>
      </div>

      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={i}
            x1={padding}
            y1={padding + (i * chartHeight) / 3}
            x2={width - padding}
            y2={padding + (i * chartHeight) / 3}
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.1 }}
          />
        ))}

        {/* Animated line path */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Data points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === TURNING_POINT_INDEX ? 6 : 4}
            fill={i === TURNING_POINT_INDEX ? "#ef4444" : "#fff"}
            stroke={i === TURNING_POINT_INDEX ? "#ef4444" : "#6366f1"}
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              delay: 0.3 + i * 0.12,
              type: "spring",
              stiffness: 300,
            }}
          />
        ))}

        {/* Turning point indicator */}
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <rect
            x={points[TURNING_POINT_INDEX].x - 35}
            y={points[TURNING_POINT_INDEX].y - 32}
            width={70}
            height={20}
            rx={4}
            fill="#ef4444"
          />
          <text
            x={points[TURNING_POINT_INDEX].x}
            y={points[TURNING_POINT_INDEX].y - 18}
            textAnchor="middle"
            fill="white"
            fontSize={10}
            fontWeight={500}
          >
            Turning Point
          </text>
        </motion.g>
      </svg>

      {/* Rep labels */}
      <div className="flex justify-between px-4 mt-1">
        {DATA_POINTS.map((_, i) => (
          <span key={i} className="text-[10px] text-gray-400">
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
