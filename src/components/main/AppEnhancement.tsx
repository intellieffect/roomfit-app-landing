"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Target,
  Brain,
  Smartphone,
  TrendingUp,
  ArrowRight,
  LucideIcon,
  Zap,
  Play,
} from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Target,
  Brain,
  Smartphone,
  TrendingUp,
};

export default function AppEnhancement() {
  const { appEnhancement } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="app"
      className="relative py-8 sm:py-12 lg:py-16 bg-surface overflow-hidden"
    >
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/5 via-primary/2 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-2/3 bg-gradient-to-tr from-secondary/5 to-transparent" />

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

        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[20%] w-80 h-80 bg-primary/10 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-[15%] w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"
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
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8"
          >
            <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-bold text-primary tracking-wide">
              {appEnhancement.badge}
            </span>
          </motion.div>

          <h2 className="text-display-lg">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-white"
            >
              {appEnhancement.title.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block gradient-text"
            >
              {appEnhancement.title.line2}
            </motion.span>
          </h2>

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-secondary/20 text-secondary mt-3 sm:mt-4"
          >
            상반기 출시예정
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto mt-4 sm:mt-6"
          >
            {appEnhancement.subtitle}
          </motion.p>
        </motion.div>

        {/* Features Grid - Bento Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-16 lg:mb-20">
          {appEnhancement.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            const isHovered = hoveredFeature === index;
            const isLarge = index === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`group relative ${isLarge ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative p-5 sm:p-6 lg:p-8 xl:p-10 rounded-2xl sm:rounded-3xl bg-void/80 backdrop-blur-sm border border-white/5 hover:border-primary/30 transition-all duration-500 h-full overflow-hidden"
                >
                  {/* Hover gradient effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5"
                  />

                  {/* Glow effect */}
                  <motion.div
                    animate={{
                      opacity: isHovered ? 0.6 : 0,
                      scale: isHovered ? 1 : 0.8,
                    }}
                    className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl"
                  />

                  {/* Index */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-4xl sm:text-5xl font-black text-primary/10 select-none pointer-events-none">
                    0{index + 1}
                  </div>

                  <div className="relative z-10">
                    {/* Icon with animation */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        boxShadow: isHovered
                          ? "0 0 40px rgba(82,82,255,0.3)"
                          : "0 0 0 rgba(82,82,255,0)",
                      }}
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 bg-gradient-to-br from-primary/20 to-primary/10 text-primary border border-primary/20 transition-all duration-300"
                    >
                      {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />}
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors whitespace-pre-line">
                      {feature.description}
                    </p>

                    {/* Bottom accent line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      className="mt-4 sm:mt-6 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* App Preview & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 blur-3xl scale-95 rounded-3xl" />

          <div className="relative p-6 sm:p-10 lg:p-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-void via-surface to-void border border-white/10 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(82,82,255,0.5) 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Animated corner accents */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-40 h-40 border border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-16 -left-16 w-32 h-32 border border-secondary/20 rounded-full"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
              {/* App Logo */}
              <div className="flex-shrink-0 relative">
                {/* Glow behind logo */}
                <div className="absolute inset-0 bg-primary/30 blur-3xl scale-75" />

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <img
                    src="/images/app-icon-large.png"
                    alt="Roomfit App"
                    className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl sm:rounded-3xl shadow-2xl shadow-primary/30"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                    <span className="gradient-text">룸핏 앱 살펴보기</span>
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-400 mb-6 sm:mb-8 lg:mb-10 max-w-lg leading-relaxed">
                    AI 기반 운동 분석, 실시간 피드백, 개인화된 프로그램까지.
                    룸핏 앱과 함께라면 전문 트레이너 없이도 최적의 운동이 가능합니다.
                  </p>

                  <Link
                    href={appEnhancement.cta.href}
                    className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                  >
                    {/* Button gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary to-primary" />
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    <span className="relative z-10 text-black">{appEnhancement.cta.text}</span>
                    <ArrowRight className="w-5 h-5 relative z-10 text-black transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
