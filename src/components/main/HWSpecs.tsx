"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { mainContent } from "@/data";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Dumbbell, Maximize2, Grid3X3, Check } from "lucide-react";

const specIcons = [Dumbbell, Maximize2, Grid3X3];

// 스펙별 미디어 타입
type SingleMedia = { type: "gif" | "image"; src: string };
type RotatingMedia = { type: "rotating"; sources: string[] };
type SpecMedia = SingleMedia | RotatingMedia;

// 스펙별 미디어 매핑
const specMedia: Record<string, SpecMedia> = {
  weight: {
    type: "gif",
    src: "/roomfit/exercise-squat-barbell.gif",
  },
  size: {
    type: "image",
    src: "/roomfit/compare-gym-machine.png",
  },
  exercises: {
    type: "rotating",
    sources: [
      "/roomfit/exercise-bench-press.gif",
      "/roomfit/exercise-deadlift-back.gif",
      "/roomfit/exercise-shoulder-press.gif",
      "/roomfit/exercise-barbell-row-white.gif",
      "/roomfit/exercise-belt-squat-white.gif",
      "/roomfit/exercise-concentration-curl.gif",
    ],
  },
};

export default function HWSpecs() {
  const { hwSpecs, exerciseTypes } = mainContent;
  const [activeSpec, setActiveSpec] = useState(0);
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // 146가지 운동 스펙일 때 GIF 순환
  useEffect(() => {
    const imageKey = hwSpecs.specs[activeSpec].image;
    const currentMedia = specMedia[imageKey];
    if (!currentMedia || currentMedia.type !== "rotating") return;

    const sources = currentMedia.sources;
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % sources.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSpec, hwSpecs.specs]);

  // 현재 스펙의 미디어 소스 가져오기
  const getCurrentMediaSrc = (): string => {
    const imageKey = hwSpecs.specs[activeSpec].image;
    const media = specMedia[imageKey];

    if (!media) return "/roomfit/exercise-squat-barbell.gif";

    if (media.type === "rotating") {
      return media.sources[rotatingIndex];
    }
    return media.src;
  };

  return (
    <section
      ref={sectionRef}
      id="specs"
      className="relative py-32 lg:py-40 bg-void overflow-hidden"
    >
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        {/* Large spec number watermark */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpec}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 0.03, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vw] font-black text-white select-none pointer-events-none"
          >
            {hwSpecs.specs[activeSpec].value.replace(/[^0-9]/g, "")}
          </motion.div>
        </AnimatePresence>

        {/* Gradient mesh */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, white 1px, transparent 1px),
              linear-gradient(white 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[20%] w-96 h-96 bg-primary/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary tracking-wide">
              {hwSpecs.badge}
            </span>
          </motion.div>

          <h2 className="text-display-lg">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-white"
            >
              {hwSpecs.title.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block gradient-text"
            >
              {hwSpecs.title.line2}
            </motion.span>
          </h2>
        </motion.div>

        {/* Spec Cards - Horizontal Tab Style */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 mb-16">
          {hwSpecs.specs.map((spec, index) => {
            const Icon = specIcons[index];
            const isActive = activeSpec === index;

            return (
              <motion.button
                key={spec.value}
                onClick={() => setActiveSpec(index)}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group relative text-left p-6 lg:p-8 rounded-2xl transition-all duration-500 ${
                  isActive
                    ? "bg-surface ring-2 ring-primary"
                    : "bg-surface/50 hover:bg-surface border border-white/5"
                }`}
              >
                {/* Active glow effect */}
                {isActive && (
                  <motion.div
                    layoutId="specActiveGlow"
                    className="absolute inset-0 rounded-2xl bg-primary/5"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Progress indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-t-2xl"
                />

                <div className="relative z-10">
                  {/* Icon and index */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-black shadow-[0_0_30px_-5px_rgba(82,82,255,0.5)]"
                          : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs font-mono transition-colors ${
                        isActive ? "text-primary" : "text-gray-600"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {/* Value */}
                  <div className="mb-3">
                    <span
                      className={`text-4xl sm:text-5xl font-black transition-colors ${
                        isActive ? "text-white" : "text-gray-500 group-hover:text-white"
                      }`}
                    >
                      {spec.value.replace(/[^0-9+]/g, "")}
                    </span>
                    <span
                      className={`text-xl font-bold ml-1 transition-colors ${
                        isActive
                          ? "text-secondary"
                          : "text-gray-600 group-hover:text-gray-400"
                      }`}
                    >
                      {spec.value.replace(/[0-9+]/g, "")}
                    </span>
                  </div>

                  {/* Label */}
                  <p
                    className={`text-base font-medium transition-colors ${
                      isActive ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {spec.label}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Spec Detail - Split Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpec}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Visual Area */}
            <div className="relative order-2 lg:order-1">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden"
              >
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 blur-3xl scale-110" />

                {/* Image container */}
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-surface to-muted overflow-hidden border border-white/10">
                  {/* Media */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`media-${activeSpec}-${rotatingIndex}`}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={getCurrentMediaSrc()}
                        alt={hwSpecs.specs[activeSpec].label}
                        fill
                        className={
                          hwSpecs.specs[activeSpec].image === "size"
                            ? "object-contain p-8"
                            : "object-cover"
                        }
                        unoptimized
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-void/50 via-transparent to-transparent" />

                  {/* Spec value overlay */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-6 left-6 right-6"
                  >
                    <div className="bg-void/90 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black text-white">
                          {hwSpecs.specs[activeSpec].value}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {hwSpecs.specs[activeSpec].label}
                      </p>
                    </div>
                  </motion.div>

                  {/* Live indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-void/80 backdrop-blur-sm rounded-full border border-white/10">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-gray-400">LIVE</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  {hwSpecs.specs[activeSpec].title}
                </h3>

                <p className="text-xl text-gray-400 leading-relaxed mb-6">
                  {hwSpecs.specs[activeSpec].description}
                </p>

                {hwSpecs.specs[activeSpec].note && (
                  <p className="text-sm text-gray-600 mb-8 pl-4 border-l-2 border-gray-800">
                    {hwSpecs.specs[activeSpec].note}
                  </p>
                )}

                {/* Exercise Types - Enhanced for exercises spec */}
                {hwSpecs.specs[activeSpec].image === "exercises" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8"
                  >
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold">
                      주요 운동 프로그램
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exerciseTypes.map((exercise, index) => (
                        <motion.span
                          key={exercise}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-4 py-2 bg-surface rounded-xl text-sm text-gray-300 border border-white/5 hover:border-primary/30 hover:bg-primary/5 hover:text-white transition-all duration-300 cursor-default"
                        >
                          {exercise}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Navigation dots */}
                <div className="flex items-center gap-3 mt-12">
                  {hwSpecs.specs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSpec(index)}
                      className={`transition-all duration-300 ${
                        activeSpec === index
                          ? "w-8 h-2 bg-primary rounded-full"
                          : "w-2 h-2 bg-gray-600 rounded-full hover:bg-gray-500"
                      }`}
                      aria-label={`Go to spec ${index + 1}`}
                    />
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
