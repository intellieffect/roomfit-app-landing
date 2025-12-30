"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RepData {
  repNumber: number;
  velocity: number; // mm/s
  velocityLoss: number; // percentage from first rep
  isTurningPoint?: boolean;
}

// Based on Flutter showcase extreme fatigue scenario
// Velocities: [550, 520, 480, 440, 400, 360, 330, 300] mm/s
const velocities = [550, 520, 480, 440, 400, 360, 330, 300];
const baseVelocity = velocities[0];

const mockData: RepData[] = velocities.map((velocity, i) => ({
  repNumber: i + 1,
  velocity,
  velocityLoss: Math.round(((baseVelocity - velocity) / baseVelocity) * 100),
  // Turning point at ~30% velocity loss (around rep 6)
  isTurningPoint: i === 5,
}));

// Color based on velocity loss percentage
const getBarColor = (vlPercent: number): string => {
  if (vlPercent < 10) return "#22c55e"; // Good (green)
  if (vlPercent < 20) return "#84cc16"; // Light green
  if (vlPercent < 30) return "#eab308"; // Warning (yellow)
  if (vlPercent < 40) return "#f97316"; // Orange
  return "#ef4444"; // Fatigued (red)
};

// Max velocity for scaling bars
const maxVelocity = Math.max(...velocities);

interface VelocityLossChartProps {
  isInView?: boolean;
}

export function VelocityLossChart({ isInView: isInViewProp }: VelocityLossChartProps = {}) {
  const ref = useRef(null);
  const internalIsInView = useInView(ref, { once: true, margin: "-50px" });
  const isInView = isInViewProp ?? internalIsInView;

  return (
    <div
      ref={ref}
      className="bg-gray-900 rounded-2xl p-5 shadow-xl w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-white">
          Rep별 속도 변화
        </h4>
        <span className="text-[10px] text-orange-400 flex items-center gap-1">
          <span className="w-2 h-2 bg-orange-500 rounded-full" />
          Turning Point
        </span>
      </div>

      <div className="flex items-end gap-2 h-36">
        {mockData.map((rep, index) => (
          <div
            key={rep.repNumber}
            className="flex-1 flex flex-col items-center justify-end h-full"
          >
            {/* Velocity loss label */}
            <motion.span
              className="text-[9px] font-medium mb-1"
              style={{ color: getBarColor(rep.velocityLoss) }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.08 + 0.3 }}
            >
              {rep.velocityLoss > 0 ? `-${rep.velocityLoss}%` : ""}
            </motion.span>

            {/* Turning point indicator */}
            {rep.isTurningPoint && (
              <motion.div
                className="w-2 h-2 bg-orange-500 rounded-full mb-1"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView ? { scale: [0, 1.5, 1], opacity: 1 } : { scale: 0 }
                }
                transition={{ delay: index * 0.08 + 0.4, duration: 0.3 }}
              />
            )}

            {/* Velocity bar (taller = faster) */}
            <motion.div
              className="w-full rounded-t-md"
              style={{
                backgroundColor: getBarColor(rep.velocityLoss),
              }}
              initial={{ height: 0 }}
              animate={
                isInView
                  ? { height: `${(rep.velocity / maxVelocity) * 100}%` }
                  : { height: 0 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />

            {/* Rep number */}
            <motion.span
              className="text-[10px] text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.08 + 0.3 }}
            >
              {rep.repNumber}
            </motion.span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4 text-[10px] text-gray-400">
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
    </div>
  );
}
