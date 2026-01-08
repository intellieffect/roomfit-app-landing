"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Minus, TrendingUp, ArrowDown, Gauge, LucideIcon, Zap } from "lucide-react";
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

// 모드별 시각적 스타일
const modeStyles: Record<string, { color: string; gradient: string }> = {
  constant: {
    color: "#3B82F6",
    gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
  },
  variable: {
    color: "#BAFC27",
    gradient: "from-secondary/20 via-primary/10 to-transparent",
  },
  negative: {
    color: "#F97316",
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
  },
  isokinetic: {
    color: "#5252FF",
    gradient: "from-primary/20 via-cyan-500/10 to-transparent",
  },
};

const AUTO_ADVANCE_INTERVAL = 5000; // 5초마다 자동 전환
const RESUME_DELAY = 4000; // 유저 개입 후 4초 뒤 재개

export default function WeightModes() {
  const { weightModes } = mainContent;
  const [activeMode, setActiveMode] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const resumeRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // 자동 전환
  useEffect(() => {
    if (isPaused || !isInView) return;

    autoAdvanceRef.current = setTimeout(() => {
      setActiveMode((prev) => (prev + 1) % weightModes.modes.length);
    }, AUTO_ADVANCE_INTERVAL);

    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, [activeMode, isPaused, isInView, weightModes.modes.length]);

  // 유저 개입 처리
  const handleUserSelect = (index: number) => {
    setActiveMode(index);
    setIsPaused(true);

    if (resumeRef.current) clearTimeout(resumeRef.current);

    resumeRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  };

  // 클린업
  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, []);

  const currentMode = weightModes.modes[activeMode];
  const currentStyle = modeStyles[currentMode.id];

  return (
    <section
      ref={sectionRef}
      id="modes"
      className="relative py-16 sm:py-24 lg:py-40 bg-surface overflow-hidden"
    >
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        {/* Animated gradient based on active mode */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-br ${currentStyle.gradient}`}
          />
        </AnimatePresence>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, white 1px, transparent 1px),
              linear-gradient(white 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -3, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-[15%] w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8"
          >
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-bold text-primary">{weightModes.badge}</span>
          </motion.div>

          <h2 className="text-display-lg">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-white"
            >
              {weightModes.title.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block gradient-text"
            >
              {weightModes.title.line2}
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto mt-4 sm:mt-6"
          >
            {weightModes.subtitle}
          </motion.p>
        </motion.div>

        {/* Mode Cards - Horizontal Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-10 sm:mb-16"
        >
          {weightModes.modes.map((mode, index) => {
            const Icon = iconMap[mode.icon];
            const isActive = activeMode === index;
            const style = modeStyles[mode.id];

            return (
              <motion.button
                key={mode.id}
                onClick={() => handleUserSelect(index)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl overflow-hidden text-left transition-all duration-500 ${
                  isActive
                    ? "bg-void ring-2"
                    : "bg-void/50 hover:bg-void border border-white/5"
                }`}
                style={
                  isActive
                    ? ({ "--tw-ring-color": style.color } as React.CSSProperties)
                    : undefined
                }
              >
                {/* Progress indicator */}
                <motion.div
                  key={`progress-${index}-${isActive}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isActive && !isPaused ? "100%" : "0%" }}
                  transition={{
                    duration: isActive && !isPaused ? AUTO_ADVANCE_INTERVAL / 1000 : 0.3,
                    ease: "linear",
                  }}
                  className="absolute top-0 left-0 h-1"
                  style={{ backgroundColor: style.color }}
                />

                {/* Icon */}
                <motion.div
                  animate={{
                    backgroundColor: isActive ? `${style.color}20` : "rgba(255,255,255,0.05)",
                  }}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-colors"
                >
                  {Icon && (
                    <Icon
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-colors"
                      style={{ color: isActive ? style.color : "#9CA3AF" }}
                    />
                  )}
                </motion.div>

                {/* Title */}
                <h3
                  className={`text-sm lg:text-base font-bold mb-1 transition-colors ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {mode.title}
                </h3>

                {/* Index */}
                <span className="text-xs font-mono text-gray-600">0{index + 1}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Mode Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Visualization Area */}
            <div className="relative order-2 lg:order-1">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 blur-3xl opacity-30 scale-110 rounded-3xl"
                  style={{ backgroundColor: currentStyle.color }}
                />

                {/* Main Image */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-void">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMode}
                      initial={{ opacity: 0, scale: 1.1 }}
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
                    </motion.div>
                  </AnimatePresence>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />

                  {/* Mode indicator */}
                  <div className="absolute top-4 left-4">
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border"
                      style={{
                        backgroundColor: `${currentStyle.color}20`,
                        borderColor: `${currentStyle.color}40`,
                      }}
                    >
                      {iconMap[currentMode.icon] && (
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          {(() => {
                            const Icon = iconMap[currentMode.icon];
                            return <Icon className="w-3 h-3" style={{ color: currentStyle.color }} />;
                          })()}
                        </motion.div>
                      )}
                      <span className="text-xs font-medium" style={{ color: currentStyle.color }}>
                        MODE {String(activeMode + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Area */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Mode number */}
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <span
                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black opacity-20"
                    style={{ color: currentStyle.color }}
                  >
                    {String(activeMode + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4">
                  {currentMode.title}
                </h3>

                {/* Subtitle */}
                <p
                  className="text-base sm:text-lg lg:text-xl font-medium mb-4 sm:mb-6"
                  style={{ color: currentStyle.color }}
                >
                  {currentMode.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed mb-6 sm:mb-8 whitespace-pre-line">
                  {currentMode.description}
                </p>

                {/* Use case tags */}
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 rounded-lg sm:rounded-xl text-xs sm:text-sm text-gray-300 border border-white/5">
                    근력 강화
                  </span>
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 rounded-lg sm:rounded-xl text-xs sm:text-sm text-gray-300 border border-white/5">
                    맞춤형 훈련
                  </span>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                  {weightModes.modes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleUserSelect(index)}
                      className="group relative"
                    >
                      <motion.div
                        initial={{ width: 32 }}
                        animate={{
                          width: activeMode === index ? 48 : 32,
                          backgroundColor: activeMode === index ? currentStyle.color : "#4B5563",
                        }}
                        className="h-1.5 rounded-full transition-all"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
