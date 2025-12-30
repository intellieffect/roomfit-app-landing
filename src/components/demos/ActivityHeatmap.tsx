"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Fixed heatmap data to avoid hydration mismatch (no Math.random)
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
  "bg-gray-100 dark:bg-gray-700",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/60",
  "bg-primary/80",
];

const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

interface ActivityHeatmapProps {
  isInView?: boolean;
}

export function ActivityHeatmap({ isInView: isInViewProp }: ActivityHeatmapProps = {}) {
  const ref = useRef(null);
  const internalIsInView = useInView(ref, { once: true, margin: "-50px" });
  const isInView = isInViewProp ?? internalIsInView;

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
          운동 기록
        </h4>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          최근 16주
        </span>
      </div>

      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-2">
          {dayLabels.map((day, i) => (
            <span
              key={i}
              className="text-[10px] text-gray-400 h-3 flex items-center"
            >
              {i % 2 === 1 ? day : ""}
            </span>
          ))}
        </div>

        {/* Heatmap grid */}
        {HEATMAP_DATA.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((intensity, dayIndex) => (
              <motion.div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-3 h-3 rounded-sm ${intensityColors[intensity]}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  delay: (weekIndex * 7 + dayIndex) * 0.008,
                  duration: 0.2,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        {intensityColors.map((color, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
        ))}
        <span>More</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="text-2xl font-bold text-primary">47</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            총 운동일
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <div className="text-2xl font-bold text-primary">7</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            연속 기록
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <div className="text-2xl font-bold text-primary">42%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            이번 달
          </div>
        </motion.div>
      </div>
    </div>
  );
}
