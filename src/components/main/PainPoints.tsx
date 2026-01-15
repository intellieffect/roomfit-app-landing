"use client";

import { useRef, useState, useEffect } from "react";
import {
  Home,
  ShieldAlert,
  Clock,
  TrendingUp,
  Gauge,
  Wallet,
  Users,
  ArrowDown,
  LucideIcon,
} from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView, AnimatePresence } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Home,
  ShieldAlert,
  Clock,
  TrendingUp,
  Gauge,
  Wallet,
  Users,
};

const AUTO_ADVANCE_INTERVAL = 5000;
const RESUME_DELAY = 4000;

type TabId = "general" | "trainer";

export default function PainPoints() {
  const { painPoints } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [isPaused, setIsPaused] = useState(false);
  const lastInteraction = useRef(Date.now());
  const progressRef = useRef<HTMLDivElement>(null);

  // 자동 전환 로직
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteraction.current;
      if (timeSinceInteraction >= RESUME_DELAY && !isPaused) {
        setActiveTab((prev) => (prev === "general" ? "trainer" : "general"));
      }
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(interval);
  }, [isInView, isPaused]);

  const handleTabSelect = (tabId: TabId) => {
    lastInteraction.current = Date.now();
    setActiveTab(tabId);
  };

  const currentItems = painPoints[activeTab]?.items || [];
  const gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      ref={sectionRef}
      className="relative py-8 sm:py-12 lg:py-16 bg-surface overflow-hidden"
    >
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        {/* Diagonal lines pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              white 40px,
              white 41px
            )`,
          }}
        />

        {/* Red warning gradient at edges */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-red-900/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-void to-transparent" />

        {/* Floating danger indicators */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-64 h-64 bg-red-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-40 right-[15%] w-48 h-48 bg-red-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-display-lg">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block text-white"
            >
              {painPoints.title.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-white"
            >
              {painPoints.title.line2}
            </motion.span>
          </h2>
        </motion.div>

        {/* Pill Segment Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div
            className="relative inline-flex p-1 rounded-full bg-void/80 backdrop-blur-sm border border-white/10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {painPoints.tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id as TabId)}
                  className={`relative px-5 py-2.5 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>

                  {/* Progress indicator */}
                  {isActive && !isPaused && (
                    <motion.div
                      ref={progressRef}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-red-500/50 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{
                        duration: AUTO_ADVANCE_INTERVAL / 1000,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                      key={activeTab}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Pain Points Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`grid ${gridCols} gap-3 sm:gap-5 lg:gap-6 max-w-6xl mx-auto`}
          >
            {currentItems.map((item, index) => {
              const Icon = iconMap[item.icon];

              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative"
                >
                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="relative p-4 sm:p-5 rounded-2xl bg-void/80 backdrop-blur-sm border border-white/5 overflow-hidden h-full"
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    {/* Index number */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-4xl sm:text-5xl font-black text-red-500/10 select-none pointer-events-none">
                      0{index + 1}
                    </div>

                    <div className="relative z-10">
                      {/* Icon + Title Row */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex-shrink-0 flex items-center justify-center bg-red-500/10 text-red-400 border border-red-500/20">
                          {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-100 transition-colors">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="text-xs text-red-400/80">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {item.description}
                      </p>

                      {/* Bottom line accent */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                        className="mt-4 h-[2px] bg-gradient-to-r from-red-500/50 to-transparent origin-left"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Dramatic Transition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative mt-8 sm:mt-10 text-center"
        >
          {/* Connecting line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: 60 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="w-px bg-gradient-to-b from-red-500/50 to-secondary/50 mx-auto mb-6 sm:mb-8"
          />

          {/* Arrow indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/10 border border-secondary/30 mb-6 sm:mb-8"
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
          </motion.div>

          {/* Transition text with gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="text-gray-500">그래서</span>
              <br />
              <span className="gradient-text">만들었습니다</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
