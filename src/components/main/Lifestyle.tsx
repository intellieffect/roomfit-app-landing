"use client";

import { useRef, useState } from "react";
import { Moon, Clock, Home, Volume2, Star, Sparkles } from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";

const highlightIcons = [Moon, Clock, Home];

// 고정된 별 위치 (hydration 오류 방지) - 더 많은 별과 다양한 크기
const starPositions = [
  { left: 5, top: 8, duration: 2.5, delay: 0.3, size: 1 },
  { left: 12, top: 25, duration: 3.2, delay: 1.1, size: 1.5 },
  { left: 23, top: 12, duration: 2.8, delay: 0.7, size: 1 },
  { left: 35, top: 45, duration: 3.5, delay: 1.5, size: 2 },
  { left: 42, top: 18, duration: 2.3, delay: 0.2, size: 1 },
  { left: 55, top: 72, duration: 3.1, delay: 1.8, size: 1.5 },
  { left: 63, top: 35, duration: 2.9, delay: 0.9, size: 1 },
  { left: 72, top: 58, duration: 3.4, delay: 1.3, size: 2 },
  { left: 78, top: 15, duration: 2.6, delay: 0.5, size: 1 },
  { left: 85, top: 42, duration: 3.0, delay: 1.0, size: 1.5 },
  { left: 92, top: 68, duration: 2.7, delay: 1.6, size: 1 },
  { left: 18, top: 78, duration: 3.3, delay: 0.4, size: 1 },
  { left: 28, top: 55, duration: 2.4, delay: 1.2, size: 2 },
  { left: 48, top: 85, duration: 3.6, delay: 0.8, size: 1.5 },
  { left: 68, top: 22, duration: 2.2, delay: 1.4, size: 1 },
  { left: 8, top: 48, duration: 3.0, delay: 0.6, size: 1 },
  { left: 38, top: 32, duration: 2.8, delay: 1.7, size: 1.5 },
  { left: 58, top: 8, duration: 3.2, delay: 0.1, size: 2 },
  { left: 88, top: 88, duration: 2.5, delay: 1.9, size: 1 },
  { left: 95, top: 28, duration: 3.4, delay: 0.0, size: 1 },
  { left: 3, top: 62, duration: 2.9, delay: 0.8, size: 1.5 },
  { left: 75, top: 82, duration: 3.1, delay: 1.0, size: 1 },
  { left: 52, top: 28, duration: 2.7, delay: 0.4, size: 2 },
  { left: 15, top: 42, duration: 3.3, delay: 1.5, size: 1 },
];

export default function Lifestyle() {
  const { lifestyle } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredHighlight, setHoveredHighlight] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-void overflow-hidden"
    >
      {/* Dramatic Night Background */}
      <div className="absolute inset-0">
        {/* Deep night gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-void to-void" />

        {/* Stars effect with varying sizes */}
        {starPositions.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}

        {/* Shooting star effect */}
        <motion.div
          animate={{
            x: ["-100%", "200%"],
            y: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeOut",
          }}
          className="absolute top-[15%] left-0 w-20 h-0.5 bg-gradient-to-r from-white to-transparent rotate-45"
        />

        {/* Moon glow - enhanced */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[15%] w-80 h-80 rounded-full bg-gradient-to-br from-yellow-300/20 via-orange-200/10 to-transparent blur-[100px]"
        />

        {/* Ambient indigo orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-[10%] w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-[5%] w-56 h-56 bg-purple-500/10 rounded-full blur-[100px]"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, white 1px, transparent 1px),
              linear-gradient(white 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual - Enhanced Night Scene */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Glow behind visual */}
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl scale-90 rounded-full" />

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              {/* Main container with window effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-surface to-void rounded-3xl border border-indigo-500/20">
                {/* Night scene visualization */}
                <div className="absolute inset-0">
                  {/* Window frame effect - Enhanced */}
                  <div className="absolute inset-6 lg:inset-8 border-2 border-white/10 rounded-2xl overflow-hidden">
                    {/* Window inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-indigo-500/5" />

                    {/* Curtain effect */}
                    <motion.div
                      animate={{ x: [-2, 2, -2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-indigo-900/30 to-transparent"
                    />
                    <motion.div
                      animate={{ x: [2, -2, 2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-indigo-900/30 to-transparent"
                    />

                    {/* Window crossbar */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
                  </div>

                  {/* Moon - Enhanced with crater details */}
                  <motion.div
                    className="absolute top-10 right-12 lg:right-16"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="relative">
                      {/* Moon glow rings */}
                      {[1, 2].map((ring) => (
                        <motion.div
                          key={ring}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.1, 0.3],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: ring * 0.5,
                          }}
                          className="absolute inset-0 rounded-full bg-yellow-200/20 blur-xl"
                          style={{
                            transform: `scale(${1 + ring * 0.3})`,
                          }}
                        />
                      ))}

                      {/* Moon body */}
                      <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-yellow-50 via-yellow-100 to-orange-100 shadow-[0_0_60px_rgba(253,224,71,0.3)]">
                        {/* Crater details */}
                        <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-yellow-200/50" />
                        <div className="absolute bottom-4 right-3 w-3 h-3 rounded-full bg-yellow-200/40" />
                        <div className="absolute top-6 right-5 w-1.5 h-1.5 rounded-full bg-yellow-200/30" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Silence indicator - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="absolute bottom-1/3 left-1/2 -translate-x-1/2"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(186,252,39,0.4)",
                          "0 0 0 12px rgba(186,252,39,0)",
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="flex items-center gap-3 px-6 py-3 rounded-full bg-void/90 backdrop-blur-md border border-secondary/30"
                    >
                      <Volume2 className="w-5 h-5 text-secondary" />
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-secondary rounded-full"
                            animate={{
                              height: [4, i <= 2 ? 12 : 4, 4],
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-secondary">무소음</span>
                    </motion.div>
                  </motion.div>

                  {/* Time display - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="absolute top-10 left-10"
                  >
                    <div className="bg-void/60 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                      <motion.div
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-4xl lg:text-5xl font-light text-white font-mono tracking-wider"
                      >
                        23:47
                      </motion.div>
                      <p className="text-sm text-indigo-300 mt-1">밤 늦은 시간도 OK</p>
                    </div>
                  </motion.div>

                  {/* Small stars inside window */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        top: `${20 + i * 12}%`,
                        left: `${30 + i * 8}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-void to-transparent" />

                {/* Corner accent */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-secondary"
                  />
                  <span className="text-xs text-secondary/70 font-mono">SILENT MODE</span>
                </div>
              </div>
            </div>

            {/* Floating tag - Enhanced */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute -top-4 -right-4 sm:right-8"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(186,252,39,0.2)",
                    "0 0 40px rgba(186,252,39,0.3)",
                    "0 0 20px rgba(186,252,39,0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/20 backdrop-blur-md border border-secondary/40"
              >
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-secondary font-bold">층간소음 ZERO</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            {/* Badge with pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mb-8"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(99,102,241,0.4)",
                    "0 0 0 10px rgba(99,102,241,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30"
              >
                <Star className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold text-indigo-400 tracking-wide">
                  새벽 운동러를 위한
                </span>
              </motion.div>
            </motion.div>

            <h2 className="text-display-lg mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block text-white"
              >
                {lifestyle.title.line1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="block text-secondary"
              >
                {lifestyle.title.line2}
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-300 mb-4 leading-relaxed"
            >
              {lifestyle.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-gray-500 mb-10 leading-relaxed whitespace-pre-line"
            >
              {lifestyle.description}
            </motion.p>

            {/* Highlights - Enhanced with hover effects */}
            <div className="flex flex-wrap gap-3">
              {lifestyle.highlights.map((highlight, index) => {
                const Icon = highlightIcons[index];
                const isHovered = hoveredHighlight === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    onMouseEnter={() => setHoveredHighlight(index)}
                    onMouseLeave={() => setHoveredHighlight(null)}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
                        isHovered
                          ? "bg-secondary/10 border-secondary/40"
                          : "bg-surface border-white/5"
                      } border`}
                    >
                      <motion.div
                        animate={{
                          backgroundColor: isHovered
                            ? "rgba(186,252,39,0.2)"
                            : "rgba(186,252,39,0.1)",
                          boxShadow: isHovered
                            ? "0 0 20px rgba(186,252,39,0.3)"
                            : "0 0 0 rgba(186,252,39,0)",
                        }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      >
                        <Icon className="w-5 h-5 text-secondary" />
                      </motion.div>
                      <span className={`font-medium transition-colors ${
                        isHovered ? "text-secondary" : "text-white"
                      }`}>
                        {highlight}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Night usage stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex items-center gap-8 mt-10 pt-8 border-t border-white/5"
            >
              <div>
                <div className="text-3xl font-black text-indigo-400">40dB</div>
                <div className="text-sm text-gray-500">최대 소음</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">24시간</div>
                <div className="text-sm text-gray-500">운동 가능</div>
              </div>
              <div>
                <div className="text-3xl font-black text-secondary">0건</div>
                <div className="text-sm text-gray-500">민원 사례</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
