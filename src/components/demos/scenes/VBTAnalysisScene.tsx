"use client";

import { motion } from "framer-motion";
import type { SceneProps } from "./types";

// Inline VBT chart for compact display in Hero
// Based on Flutter showcase extreme fatigue scenario
const velocities = [550, 520, 480, 440, 400, 360, 330, 300];
const baseVelocity = velocities[0];
const maxVelocity = Math.max(...velocities);

const mockData = velocities.map((velocity, i) => ({
  repNumber: i + 1,
  velocity,
  velocityLoss: Math.round(((baseVelocity - velocity) / baseVelocity) * 100),
  isTurningPoint: i === 5,
}));

const getBarColor = (vlPercent: number): string => {
  if (vlPercent < 10) return "#22c55e";
  if (vlPercent < 20) return "#84cc16";
  if (vlPercent < 30) return "#eab308";
  if (vlPercent < 40) return "#f97316";
  return "#ef4444";
};

export function VBTAnalysisScene({ isActive }: SceneProps) {
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
          <h4 className="text-sm font-medium text-white">Rep별 속도 변화</h4>
          <span className="text-[9px] text-orange-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
            Turning Point
          </span>
        </div>

        <div className="flex items-end gap-1.5 h-28">
          {mockData.map((rep, index) => (
            <div
              key={rep.repNumber}
              className="flex-1 flex flex-col items-center justify-end h-full"
            >
              {/* Velocity loss label */}
              <motion.span
                className="text-[8px] font-medium mb-0.5"
                style={{ color: getBarColor(rep.velocityLoss) }}
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.08 + 0.3 }}
              >
                {rep.velocityLoss > 0 ? `-${rep.velocityLoss}%` : ""}
              </motion.span>

              {/* Turning point indicator */}
              {rep.isTurningPoint && (
                <motion.div
                  className="w-1.5 h-1.5 bg-orange-500 rounded-full mb-0.5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isActive ? { scale: [0, 1.5, 1], opacity: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.08 + 0.4, duration: 0.3 }}
                />
              )}

              {/* Velocity bar */}
              <motion.div
                className="w-full rounded-t-sm"
                style={{ backgroundColor: getBarColor(rep.velocityLoss) }}
                initial={{ height: 0 }}
                animate={isActive ? { height: `${(rep.velocity / maxVelocity) * 100}%` } : { height: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />

              {/* Rep number */}
              <motion.span
                className="text-[9px] text-gray-500 mt-1"
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.08 + 0.3 }}
              >
                {rep.repNumber}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-3 mt-3 text-[9px] text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-green-500" />
            <span>&lt;20%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-yellow-500" />
            <span>20-30%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-red-500" />
            <span>&gt;30%</span>
          </div>
        </div>

        {/* Summary */}
        <motion.div
          className="mt-3 pt-3 border-t border-gray-700 grid grid-cols-3 gap-2 text-center"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <div>
            <div className="text-lg font-bold text-yellow-500">35%</div>
            <div className="text-[9px] text-gray-500">Velocity Loss</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-500">RIR 2</div>
            <div className="text-[9px] text-gray-500">여유 반복</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">8</div>
            <div className="text-[9px] text-gray-500">총 Rep</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
