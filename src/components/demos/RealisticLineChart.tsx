"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Fixed dimensions for pre-computation
const BASE_WIDTH = 270;
const BASE_HEIGHT = 160;
const PADDING = { top: 20, right: 20, bottom: 30, left: 40 };
const CHART_WIDTH = BASE_WIDTH - PADDING.left - PADDING.right;
const CHART_HEIGHT = BASE_HEIGHT - PADDING.top - PADDING.bottom;

// Scale functions with fixed dimensions
const scaleX = (t: number) => PADDING.left + (t / 8) * CHART_WIDTH;
const scaleY = (p: number) => PADDING.top + CHART_HEIGHT - (p / 100) * CHART_HEIGHT;

// Generate realistic workout position data using sin/cos
function generatePositionData(
  seed: number,
  count: number,
  baseAmplitude: number,
  frequency: number
): { time: number; position: number }[] {
  const data: { time: number; position: number }[] = [];

  for (let i = 0; i < count; i++) {
    const t = i * 0.1;
    const main = Math.sin(t * frequency + seed) * baseAmplitude;
    const secondary = Math.sin(t * frequency * 3 + seed * 2) * (baseAmplitude * 0.1);
    const fatigue = 1 - (i / count) * 0.15;

    const position = 50 + (main + secondary) * fatigue;
    data.push({ time: t, position: Math.max(10, Math.min(90, position)) });
  }

  return data;
}

// Pre-computed fixed data
const LEFT_DATA = generatePositionData(0, 80, 35, 0.8);
const RIGHT_DATA = generatePositionData(1.5, 80, 33, 0.82);

// Find turning points
function findTurningPoints(data: { time: number; position: number }[]): number[] {
  const indices: number[] = [];
  for (let i = 1; i < data.length - 1; i++) {
    const prev = data[i - 1].position;
    const curr = data[i].position;
    const next = data[i + 1].position;

    if ((curr > prev && curr > next) || (curr < prev && curr < next)) {
      indices.push(i);
    }
  }
  return indices;
}

const LEFT_TURNING_POINTS = findTurningPoints(LEFT_DATA);
const RIGHT_TURNING_POINTS = findTurningPoints(RIGHT_DATA);

// Pre-compute SVG paths at module level
function createSmoothPath(data: { time: number; position: number }[]): string {
  if (data.length < 2) return "";

  let path = `M ${scaleX(data[0].time).toFixed(2)} ${scaleY(data[0].position).toFixed(2)}`;

  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1];
    const curr = data[i];
    const midX = ((scaleX(prev.time) + scaleX(curr.time)) / 2).toFixed(2);
    const midY = ((scaleY(prev.position) + scaleY(curr.position)) / 2).toFixed(2);

    path += ` Q ${scaleX(prev.time).toFixed(2)} ${scaleY(prev.position).toFixed(2)} ${midX} ${midY}`;
  }

  const last = data[data.length - 1];
  path += ` L ${scaleX(last.time).toFixed(2)} ${scaleY(last.position).toFixed(2)}`;

  return path;
}

function createAreaPath(data: { time: number; position: number }[]): string {
  const linePath = createSmoothPath(data);
  const first = data[0];
  const last = data[data.length - 1];
  const bottomY = (PADDING.top + CHART_HEIGHT).toFixed(2);

  return `${linePath} L ${scaleX(last.time).toFixed(2)} ${bottomY} L ${scaleX(first.time).toFixed(2)} ${bottomY} Z`;
}

// Pre-computed paths (computed once at module load)
const LEFT_PATH = createSmoothPath(LEFT_DATA);
const RIGHT_PATH = createSmoothPath(RIGHT_DATA);
const LEFT_AREA_PATH = createAreaPath(LEFT_DATA);
const RIGHT_AREA_PATH = createAreaPath(RIGHT_DATA);

// Pre-computed turning point coordinates
const LEFT_POINTS = LEFT_TURNING_POINTS.slice(0, 8).map((idx) => ({
  cx: Number(scaleX(LEFT_DATA[idx].time).toFixed(2)),
  cy: Number(scaleY(LEFT_DATA[idx].position).toFixed(2)),
}));

const RIGHT_POINTS = RIGHT_TURNING_POINTS.slice(0, 8).map((idx) => ({
  cx: Number(scaleX(RIGHT_DATA[idx].time).toFixed(2)),
  cy: Number(scaleY(RIGHT_DATA[idx].position).toFixed(2)),
}));

// Pre-computed grid and label positions
const GRID_Y_VALUES = [0, 25, 50, 75, 100].map((v) => Number(scaleY(v).toFixed(2)));
const LABEL_Y_VALUES = [0, 50, 100].map((v) => ({
  value: v,
  y: Number((scaleY(v) + 4).toFixed(2)),
}));

const RANGE_TOP = Number(scaleY(75).toFixed(2));
const RANGE_BOTTOM = Number(scaleY(25).toFixed(2));

interface RealisticLineChartProps {
  width?: number;
  height?: number;
  showRangeArea?: boolean;
}

export function RealisticLineChart({
  width = BASE_WIDTH,
  height = BASE_HEIGHT,
  showRangeArea = true,
}: RealisticLineChartProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  // Scale factor if dimensions differ from base
  const scaleFactorX = width / BASE_WIDTH;
  const scaleFactorY = height / BASE_HEIGHT;
  const useTransform = scaleFactorX !== 1 || scaleFactorY !== 1;

  return (
    <div ref={ref} className="bg-white rounded-xl">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="leftAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rightAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g transform={useTransform ? `scale(${scaleFactorX}, ${scaleFactorY})` : undefined}>
          {/* Grid lines */}
          {GRID_Y_VALUES.map((y, i) => (
            <motion.line
              key={i}
              x1={PADDING.left}
              y1={y}
              x2={BASE_WIDTH - PADDING.right}
              y2={y}
              stroke="#e5e7eb"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.05 }}
            />
          ))}

          {/* Y-axis labels */}
          {LABEL_Y_VALUES.map(({ value, y }, i) => (
            <motion.text
              key={i}
              x={PADDING.left - 8}
              y={y}
              textAnchor="end"
              fontSize={10}
              fill="#9ca3af"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              {value}
            </motion.text>
          ))}

          {/* Range area */}
          {showRangeArea && (
            <>
              <motion.rect
                x={PADDING.left}
                y={RANGE_TOP}
                width={CHART_WIDTH}
                height={RANGE_BOTTOM - RANGE_TOP}
                fill="#ef4444"
                fillOpacity={0.08}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              />
              <motion.rect
                x={PADDING.left}
                y={RANGE_TOP}
                width={CHART_WIDTH}
                height={RANGE_BOTTOM - RANGE_TOP}
                fill="#3b82f6"
                fillOpacity={0.08}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.35 }}
              />
            </>
          )}

          {/* Area fills */}
          <motion.path
            d={LEFT_AREA_PATH}
            fill="url(#leftAreaGradient)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.path
            d={RIGHT_AREA_PATH}
            fill="url(#rightAreaGradient)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          />

          {/* Lines */}
          <motion.path
            d={LEFT_PATH}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d={RIGHT_PATH}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
          />

          {/* Turning points */}
          {LEFT_POINTS.map((point, i) => (
            <motion.circle
              key={`l-${i}`}
              cx={point.cx}
              cy={point.cy}
              r={4}
              fill="#ef4444"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 300 }}
            />
          ))}
          {RIGHT_POINTS.map((point, i) => (
            <motion.circle
              key={`r-${i}`}
              cx={point.cx}
              cy={point.cy}
              r={4}
              fill="#3b82f6"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.15, type: "spring", stiffness: 300 }}
            />
          ))}

          {/* Legend */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <circle cx={PADDING.left + 10} cy={BASE_HEIGHT - 10} r={4} fill="#ef4444" />
            <text x={PADDING.left + 20} y={BASE_HEIGHT - 6} fontSize={10} fill="#6b7280">Left</text>
            <circle cx={PADDING.left + 60} cy={BASE_HEIGHT - 10} r={4} fill="#3b82f6" />
            <text x={PADDING.left + 70} y={BASE_HEIGHT - 6} fontSize={10} fill="#6b7280">Right</text>
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
