"use client";

import { motion } from "framer-motion";
import { RealisticLineChart } from "../RealisticLineChart";
import { AnimatedCounter } from "../../animations/AnimatedCounter";
import type { SceneProps } from "./types";

export function WorkoutScene({ isActive }: SceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-3 w-full"
    >
      {/* Line Chart */}
      <div className="bg-gray-50 rounded-2xl p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-700">Position</span>
          <div className="flex gap-3 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Left
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Right
            </span>
          </div>
        </div>
        <RealisticLineChart width={270} height={140} showRangeArea={false} />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-2">
        <motion.div
          className="bg-red-50 rounded-xl p-2.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] text-red-600">속도</span>
          <div className="text-lg font-bold text-red-600">
            <AnimatedCounter to={0.85} duration={1} delay={1.8} decimals={2} isInView={isActive} />
            <span className="text-[10px] ml-1">m/s</span>
          </div>
        </motion.div>
        <motion.div
          className="bg-blue-50 rounded-xl p-2.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7 }}
        >
          <span className="text-[10px] text-blue-600">파워</span>
          <div className="text-lg font-bold text-blue-600">
            <AnimatedCounter to={523} duration={1} delay={2} decimals={0} isInView={isActive} />
            <span className="text-[10px] ml-1">W</span>
          </div>
        </motion.div>
      </div>

      {/* Rep Counter */}
      <motion.div
        className="bg-primary/10 rounded-xl p-3 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        <span className="text-[10px] text-primary">현재 Rep</span>
        <div className="text-3xl font-bold text-primary">
          <AnimatedCounter to={8} duration={2} delay={2.5} decimals={0} isInView={isActive} />
        </div>
      </motion.div>
    </motion.div>
  );
}
