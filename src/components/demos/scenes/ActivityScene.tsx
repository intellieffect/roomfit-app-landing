"use client";

import { motion } from "framer-motion";
import type { SceneProps } from "./types";

// Fixed heatmap data (16 weeks x 7 days)
const HEATMAP_DATA: number[][] = [
  [0, 2, 0, 1, 0, 3, 1],
  [1, 0, 2, 0, 1, 0, 2],
  [0, 3, 1, 2, 0, 1, 0],
  [2, 0, 0, 1, 3, 0, 1],
  [0, 1, 2, 0, 0, 2, 0],
  [1, 0, 3, 1, 0, 0, 2],
  [0, 2, 0, 0, 1, 3, 0],
  [3, 0, 1, 2, 0, 1, 0],
  [0, 1, 0, 0, 2, 0, 3],
  [2, 0, 2, 1, 0, 2, 0],
  [0, 3, 0, 2, 1, 0, 1],
  [1, 0, 1, 0, 0, 3, 2],
  [2, 1, 3, 2, 1, 0, 3],
  [3, 2, 0, 3, 2, 4, 1],
  [1, 4, 3, 2, 3, 2, 4],
  [4, 3, 2, 4, 3, 4, 3],
];

const intensityColors = [
  "bg-gray-700",
  "bg-primary/30",
  "bg-primary/50",
  "bg-primary/70",
  "bg-primary/90",
];

const dayLabels = ["월", "수", "금"];

export function ActivityScene({ isActive }: SceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-gray-900 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-white">운동 기록</h4>
          <span className="text-[10px] text-gray-400">최근 16주</span>
        </div>

        <div className="flex gap-0.5">
          {/* Day labels */}
          <div className="flex flex-col gap-0.5 mr-1">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className="text-[8px] text-gray-500 h-2.5 flex items-center"
              >
                {i % 2 === 0 ? dayLabels[Math.floor(i / 2)] || "" : ""}
              </span>
            ))}
          </div>

          {/* Heatmap grid */}
          {HEATMAP_DATA.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-0.5">
              {week.map((intensity, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-2.5 h-2.5 rounded-[2px] ${intensityColors[intensity]}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{
                    delay: (weekIndex * 7 + dayIndex) * 0.005,
                    duration: 0.15,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-2 text-[9px] text-gray-500">
          <span>Less</span>
          {intensityColors.map((color, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${color}`} />
          ))}
          <span>More</span>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center">
            <div className="text-xl font-bold text-primary">47</div>
            <div className="text-[9px] text-gray-500">총 운동일</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary">7</div>
            <div className="text-[9px] text-gray-500">연속 기록</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary">42%</div>
            <div className="text-[9px] text-gray-500">이번 달</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
