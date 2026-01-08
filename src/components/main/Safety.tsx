"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Scan, ShieldCheck, Hand, LucideIcon, Check, Shield } from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Scan,
  ShieldCheck,
  Hand,
};

// 안전 시스템 시연용 운동 GIF
const safetyGif = "/roomfit/exercise-belt-squat-white.gif";

export default function Safety() {
  const { safety } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-40 bg-void overflow-hidden"
    >
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        {/* Green safety gradients */}
        <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-green-500/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-green-500/5 to-transparent" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #22C55E 1px, transparent 1px),
              linear-gradient(#22C55E 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating safety orb */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[20%] w-96 h-96 bg-green-500/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge with pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6 sm:mb-8"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(34,197,94,0.4)",
                    "0 0 0 12px rgba(34,197,94,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/30"
              >
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">{safety.badge}</span>
              </motion.div>
            </motion.div>

            <h2 className="text-display-lg mb-4 sm:mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-white"
              >
                {safety.title.line1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block text-green-400"
              >
                {safety.title.line2}
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed mb-8 sm:mb-12 whitespace-pre-line"
            >
              {safety.description}
            </motion.p>

            {/* Safety Features - Enhanced Cards */}
            <div className="space-y-3 sm:space-y-4">
              {safety.features.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                const isHovered = hoveredFeature === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.1,
                    }}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className="group relative"
                  >
                    <motion.div
                      whileHover={{ x: 8 }}
                      className={`flex items-start gap-3 sm:gap-5 p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                        isHovered
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-surface border-white/5"
                      } border`}
                    >
                      {/* Icon with glow */}
                      <motion.div
                        animate={{
                          boxShadow: isHovered
                            ? "0 0 30px rgba(34,197,94,0.3)"
                            : "0 0 0 rgba(34,197,94,0)",
                        }}
                        className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-green-500/10 text-green-400 flex-shrink-0 transition-all duration-300"
                      >
                        {Icon && <Icon className="w-5 h-5 sm:w-7 sm:h-7" />}
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-green-100 transition-colors">
                            {feature.title}
                          </h3>
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: isHovered ? 1 : 0,
                              opacity: isHovered ? 1 : 0,
                            }}
                            className="w-2 h-2 rounded-full bg-green-400"
                          />
                        </div>
                        <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                          {feature.description}
                        </p>
                      </div>

                      {/* Check indicator - hidden on mobile */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isHovered ? 1 : 0 }}
                        className="hidden sm:flex w-8 h-8 rounded-full bg-green-500/20 items-center justify-center flex-shrink-0"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-green-500/20 blur-3xl scale-90 rounded-full" />

            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              {/* Main image container */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface to-muted rounded-3xl border border-green-500/20">
                <Image
                  src={safetyGif}
                  alt="룸핏 안전 시스템"
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Gradient overlays - 강화된 가독성 */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-void/30 via-transparent to-void/30" />
              </div>

              {/* Safety shield badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(34,197,94,0.4)",
                      "0 0 0 15px rgba(34,197,94,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-black/80 backdrop-blur-xl rounded-full border border-green-500/50 shadow-lg"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  </motion.div>
                  <span className="text-xs sm:text-sm text-green-400 font-bold">안전 모드 활성</span>
                </motion.div>
              </div>

              {/* Safety layer visualization */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                {[1, 2, 3].map((layer) => (
                  <motion.div
                    key={layer}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: layer * 0.5,
                    }}
                    className="absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-400/30"
                    style={{
                      width: `${80 + layer * 40}px`,
                      height: `${80 + layer * 40}px`,
                    }}
                  />
                ))}
              </div>

              {/* Bottom safety checklist */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                  className="bg-black/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-green-500/30 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="text-[10px] sm:text-xs font-bold text-green-400 uppercase tracking-wider">
                      안전 체크리스트
                    </span>
                    <span className="text-[10px] sm:text-xs text-green-400/80 font-medium">3/3 완료</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                    {["가동범위 제한", "깔림방지", "자동 OFF"].map((label, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-green-500/20 rounded-lg sm:rounded-xl border border-green-500/20"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0"
                        >
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
                        </motion.div>
                        <span className="text-[9px] sm:text-xs text-green-100 font-medium truncate">{label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
