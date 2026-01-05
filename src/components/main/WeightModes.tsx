"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Minus, TrendingUp, ArrowDown, Gauge, LucideIcon, Play } from "lucide-react";
import { mainContent } from "@/data";
import { motion, AnimatePresence, useInView } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Minus,
  TrendingUp,
  ArrowDown,
  Gauge,
};

// 각 모드 시연용 운동 GIF
const modeGifs: Record<string, string> = {
  constant: "/roomfit/exercise-deadlift-back.gif",
  variable: "/roomfit/exercise-squat-barbell.gif",
  negative: "/roomfit/exercise-concentration-curl.gif",
  isokinetic: "/roomfit/exercise-barbell-curl.gif",
};

// Visual representations for each mode
const modeVisuals: Record<string, { gradient: string; pattern: string }> = {
  constant: {
    gradient: "from-blue-500/20 to-blue-600/20",
    pattern: "horizontal",
  },
  variable: {
    gradient: "from-secondary/20 to-primary/20",
    pattern: "curve",
  },
  negative: {
    gradient: "from-orange-500/20 to-red-500/20",
    pattern: "diagonal",
  },
  isokinetic: {
    gradient: "from-primary/20 to-cyan-500/20",
    pattern: "wave",
  },
};

export default function WeightModes() {
  const { weightModes } = mainContent;
  const [activeMode, setActiveMode] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const currentMode = weightModes.modes[activeMode];
  const visual = modeVisuals[currentMode.id];

  return (
    <section
      ref={sectionRef}
      id="modes"
      className="relative py-32 bg-surface overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${visual.gradient}`}
          />
        </AnimatePresence>

        {/* Dynamic pattern lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-white"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="badge badge-electric mb-6">
            {weightModes.badge}
          </div>
          <h2 className="text-display-lg text-white mb-4">
            {weightModes.title.line1}
            <br />
            <span className="gradient-text-electric">{weightModes.title.line2}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {weightModes.subtitle}
          </p>
        </motion.div>

        {/* Mode Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mode Visualization - 실제 roomfit GIF */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-3xl bg-void overflow-hidden border border-white/10">
              {/* 실제 GIF 이미지 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={modeGifs[currentMode.id]}
                    alt={currentMode.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* 그라디언트 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* 모드 정보 오버레이 */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <motion.div
                  key={`mode-info-${activeMode}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-void/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {iconMap[currentMode.icon] && (
                      <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                        {(() => {
                          const Icon = iconMap[currentMode.icon];
                          return <Icon className="w-4 h-4 text-secondary" />;
                        })()}
                      </div>
                    )}
                    <span className="text-lg font-bold text-white">
                      {currentMode.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {currentMode.subtitle}
                  </p>
                </motion.div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-void/60 backdrop-blur-sm rounded-full">
                  <Play className="w-3 h-3 text-secondary" />
                  <span className="text-xs text-gray-400">LIVE</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mode Selector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 space-y-4"
          >
            {weightModes.modes.map((mode, index) => {
              const Icon = iconMap[mode.icon];
              const isActive = activeMode === index;

              return (
                <motion.button
                  key={mode.id}
                  onClick={() => setActiveMode(index)}
                  whileHover={{ x: 8 }}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-void border-l-4 border-secondary"
                      : "bg-void/50 border-l-4 border-transparent hover:bg-void"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive
                          ? "bg-secondary/20 text-secondary"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3
                          className={`text-lg font-bold transition-colors ${
                            isActive ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {mode.title}
                        </h3>
                        {isActive && (
                          <motion.span
                            layoutId="modeIndicator"
                            className="px-2 py-0.5 bg-secondary/20 text-secondary text-xs font-medium rounded-full"
                          >
                            활성
                          </motion.span>
                        )}
                      </div>
                      <p
                        className={`text-sm transition-colors ${
                          isActive ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {mode.subtitle}
                      </p>

                      {/* Expanded description */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-gray-500 mt-3 leading-relaxed"
                          >
                            {mode.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Mode Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex justify-center gap-4"
        >
          {weightModes.modes.map((mode, index) => {
            const Icon = iconMap[mode.icon];
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(index)}
                className={`group p-3 rounded-xl transition-all ${
                  activeMode === index
                    ? "bg-secondary text-black"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
