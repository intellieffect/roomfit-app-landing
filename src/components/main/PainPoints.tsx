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
      className="relative py-16 sm:py-24 lg:py-40 bg-surface overflow-hidden"
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
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

        {/* Pain Points - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {painPoints.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-5 sm:p-6 lg:p-8 rounded-2xl bg-void/80 backdrop-blur-sm border border-white/5 overflow-hidden h-full"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  {/* Index number */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-4xl sm:text-5xl font-black text-red-500/10 select-none pointer-events-none">
                    0{index + 1}
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-red-500/10 text-red-400 border border-red-500/20 mb-4 sm:mb-5">
                      {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-red-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {item.description}
                    </p>

                    {/* Bottom line accent */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="mt-6 h-[2px] bg-gradient-to-r from-red-500/50 to-transparent origin-left"
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
          className="relative mt-12 sm:mt-16 lg:mt-24 text-center"
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
