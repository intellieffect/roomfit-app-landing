"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { mainContent } from "@/data";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Maximize2, Grid3X3 } from "lucide-react";

const specIcons = [Dumbbell, Maximize2, Grid3X3];

// 스펙별 미디어 타입
type SingleMedia = { type: "gif" | "image"; src: string };
type RotatingMedia = { type: "rotating"; sources: string[] };
type SpecMedia = SingleMedia | RotatingMedia;

// 스펙별 미디어 매핑
const specMedia: Record<string, SpecMedia> = {
  // 120kg+ 최대 무게: 고중량 스쿼트로 무게감 표현
  weight: {
    type: "gif",
    src: "/roomfit/exercise-squat-barbell.gif",
  },
  // 1평 설치 공간: 일반 헬스장 기구와 크기 비교
  size: {
    type: "image",
    src: "/roomfit/compare-gym-machine.png",
  },
  // 146가지 운동: 다양한 운동 GIF 순환
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
    <section id="specs" className="relative py-32 bg-void overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Large spec number watermark */}
        <motion.div
          key={activeSpec}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white select-none pointer-events-none"
        >
          {hwSpecs.specs[activeSpec].value.replace(/[^0-9]/g, "")}
        </motion.div>

        {/* Gradient accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-20"
        >
          <div className="badge badge-primary mb-6">
            {hwSpecs.badge}
          </div>
          <h2 className="text-display-lg text-white mb-4">
            {hwSpecs.title.line1}
            <br />
            <span className="gradient-text">{hwSpecs.title.line2}</span>
          </h2>
        </motion.div>

        {/* Spec Cards - Horizontal Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {hwSpecs.specs.map((spec, index) => {
            const Icon = specIcons[index];
            const isActive = activeSpec === index;

            return (
              <motion.button
                key={spec.value}
                onClick={() => setActiveSpec(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative text-left p-8 rounded-2xl transition-all duration-500 ${
                  isActive
                    ? "bg-surface ring-2 ring-primary/50"
                    : "bg-surface/50 hover:bg-surface"
                }`}
              >
                {/* Glow effect when active */}
                {isActive && (
                  <motion.div
                    layoutId="specGlow"
                    className="absolute inset-0 rounded-2xl bg-primary/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-white/5 text-gray-400 group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Value */}
                  <div className="mb-4">
                    <span
                      className={`text-5xl sm:text-6xl font-black transition-colors ${
                        isActive ? "text-white" : "text-gray-500 group-hover:text-white"
                      }`}
                    >
                      {spec.value.replace(/[^0-9+]/g, "")}
                    </span>
                    <span
                      className={`text-2xl font-bold ml-1 transition-colors ${
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
                    className={`text-lg font-medium transition-colors ${
                      isActive ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {spec.label}
                  </p>
                </div>

                {/* Active indicator */}
                <motion.div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-secondary rounded-full transition-all duration-300 ${
                    isActive ? "w-20 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Spec Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpec}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Visual Area - 실제 roomfit GIF */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-surface to-muted overflow-hidden border border-white/10">
                {/* 스펙별 미디어 (GIF/이미지) */}
                <motion.div
                  key={`media-${activeSpec}-${rotatingIndex}`}
                  initial={{ opacity: 0, scale: 1.05 }}
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
                        ? "object-contain p-8" // 공간 비교 이미지는 전체 보이도록
                        : "object-cover"
                    }
                    unoptimized
                  />
                  {/* 그라디언트 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                </motion.div>

                {/* 스펙 값 오버레이 */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <motion.div
                    key={`value-${activeSpec}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-void/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white">
                        {hwSpecs.specs[activeSpec].value}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {hwSpecs.specs[activeSpec].label}
                    </p>
                  </motion.div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {hwSpecs.specs[activeSpec].title}
              </h3>

              <p className="text-xl text-gray-400 leading-relaxed mb-6">
                {hwSpecs.specs[activeSpec].description}
              </p>

              {hwSpecs.specs[activeSpec].note && (
                <p className="text-sm text-gray-600 mb-8">
                  {hwSpecs.specs[activeSpec].note}
                </p>
              )}

              {/* Exercise Types - only for exercises spec */}
              {hwSpecs.specs[activeSpec].image === "exercises" && (
                <div className="mt-8">
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                    주요 운동
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exerciseTypes.map((exercise, index) => (
                      <motion.span
                        key={exercise}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 bg-surface rounded-full text-sm text-gray-300 border border-white/5 hover:border-primary/30 hover:text-white transition-colors cursor-default"
                      >
                        {exercise}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
