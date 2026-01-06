"use client";

import { useRef, useState } from "react";
import { Home, RefreshCw, ShieldAlert, HelpCircle, LucideIcon, X, ArrowDown } from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView, AnimatePresence } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Home,
  RefreshCw,
  ShieldAlert,
  HelpCircle,
};

export default function PainPoints() {
  const { painPoints } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-surface overflow-hidden"
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
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-64 h-64 bg-red-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-[15%] w-48 h-48 bg-red-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with glitch effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Warning badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-red-400">공감하시나요?</span>
          </motion.div>

          <h2 className="text-display-lg">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-white"
            >
              {painPoints.title}
            </motion.span>
          </h2>
        </motion.div>

        {/* Pain Points - Staggered Asymmetric Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {painPoints.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            const isHovered = hoveredIndex === index;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative ${isEven ? "lg:mt-0" : "lg:mt-12"}`}
              >
                {/* Card */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-8 lg:p-10 rounded-3xl bg-void/80 backdrop-blur-sm border border-white/5 overflow-hidden h-full"
                >
                  {/* Animated border on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, transparent 50%, rgba(239, 68, 68, 0.1) 100%)`,
                    }}
                  />

                  {/* Danger gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Index number */}
                  <div className="absolute top-6 right-6 text-6xl font-black text-red-500/10 select-none pointer-events-none">
                    0{index + 1}
                  </div>

                  {/* X mark - animated */}
                  <motion.div
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{
                      rotate: isHovered ? 90 : 0,
                      scale: isHovered ? 1.2 : 1
                    }}
                    className="absolute top-6 left-6 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </motion.div>

                  <div className="relative z-10 pt-8">
                    {/* Icon with glow */}
                    <div className="relative mb-6">
                      <motion.div
                        animate={{
                          boxShadow: isHovered
                            ? "0 0 30px rgba(239, 68, 68, 0.3)"
                            : "0 0 0px rgba(239, 68, 68, 0)"
                        }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-500/20 to-red-600/10 text-red-400 border border-red-500/20 transition-all duration-300"
                      >
                        {Icon && <Icon className="w-8 h-8" />}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors">
                      {item.description}
                    </p>

                    {/* Bottom line accent */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      className="mt-8 h-[2px] bg-gradient-to-r from-red-500/50 via-red-400/30 to-transparent origin-left"
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Dramatic Transition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative mt-24 text-center"
        >
          {/* Connecting line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: 60 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="w-px bg-gradient-to-b from-red-500/50 to-secondary/50 mx-auto mb-8"
          />

          {/* Arrow indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 mb-8"
          >
            <ArrowDown className="w-5 h-5 text-secondary" />
          </motion.div>

          {/* Transition text with gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <p className="text-3xl sm:text-4xl font-bold">
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
