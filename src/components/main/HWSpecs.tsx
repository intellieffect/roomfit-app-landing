"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { mainContent } from "@/data";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Dumbbell, Maximize2, ShieldCheck, Check } from "lucide-react";

const specIcons = [Dumbbell, Maximize2, ShieldCheck];

// 스펙별 미디어 타입
type SingleMedia = { type: "gif" | "image"; src: string };
type ComparisonMedia = { type: "comparison"; before: string; after: string; beforeLabel: string; afterLabel: string };
type SpecMedia = SingleMedia | ComparisonMedia;

// 스펙별 미디어 매핑
const specMedia: Record<string, SpecMedia> = {
  weight: {
    type: "gif",
    src: "/roomfit/exercise-squat-barbell.gif",
  },
  size: {
    type: "comparison",
    before: "/roomfit/compare-gym-machine.png",
    after: "/roomfit/product-base-black-exploded.png",
    beforeLabel: "일반 홈짐",
    afterLabel: "룸핏",
  },
  safety: {
    type: "gif",
    src: "/roomfit/tech-motor-assembly.gif",
  },
};

const AUTO_ADVANCE_INTERVAL = 5000; // 5초마다 자동 전환
const RESUME_DELAY = 4000; // 유저 개입 후 4초 뒤 재개

export default function HWSpecs() {
  const { hwSpecs } = mainContent;
  const [activeSpec, setActiveSpec] = useState(0);
  const [comparisonPhase, setComparisonPhase] = useState<"product" | "compare">("product");
  const [isPaused, setIsPaused] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const resumeRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // 자동 전환
  useEffect(() => {
    if (isPaused || !isInView) return;

    autoAdvanceRef.current = setTimeout(() => {
      setActiveSpec((prev) => (prev + 1) % hwSpecs.specs.length);
    }, AUTO_ADVANCE_INTERVAL);

    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, [activeSpec, isPaused, isInView, hwSpecs.specs.length]);

  // 유저 개입 처리
  const handleUserSelect = (index: number) => {
    setActiveSpec(index);
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

  // 비교 애니메이션 시퀀스 (size 스펙일 때)
  useEffect(() => {
    const imageKey = hwSpecs.specs[activeSpec].image;
    if (imageKey !== "size") {
      setComparisonPhase("product");
      return;
    }

    // 스펙 선택 시 product 단계로 리셋
    setComparisonPhase("product");

    // 2.5초 후 compare 단계로 전환
    const timer = setTimeout(() => {
      setComparisonPhase("compare");
    }, 2500);

    return () => clearTimeout(timer);
  }, [activeSpec, hwSpecs.specs]);


  // 현재 스펙의 미디어 소스 가져오기
  const getCurrentMediaSrc = (): string => {
    const imageKey = hwSpecs.specs[activeSpec].image;
    const media = specMedia[imageKey];

    if (!media) return "/roomfit/exercise-squat-barbell.gif";

    if (media.type === "comparison") {
      return media.after; // comparison 타입일 경우 after 이미지 반환 (폴백용)
    }
    return media.src;
  };

  return (
    <section
      ref={sectionRef}
      id="specs"
      className="relative py-8 sm:py-12 lg:py-16 bg-void overflow-hidden"
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
            {hwSpecs.specs[activeSpec].value.replace(/[^0-9]/g, "") || "+"}
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
          className="max-w-2xl mb-6 sm:mb-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4"
          >
            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-bold text-primary tracking-wide">
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
        <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-4 mb-6 sm:mb-8">
          {hwSpecs.specs.map((spec, index) => {
            const Icon = specIcons[index];
            const isActive = activeSpec === index;

            return (
              <motion.button
                key={spec.value}
                onClick={() => handleUserSelect(index)}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group relative text-center p-1.5 xs:p-2 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ${
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
                  key={`progress-${index}-${isActive}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isActive && !isPaused ? "100%" : "0%" }}
                  transition={{
                    duration: isActive && !isPaused ? AUTO_ADVANCE_INTERVAL / 1000 : 0.3,
                    ease: "linear",
                  }}
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 rounded-md xs:rounded-lg flex items-center justify-center transition-all duration-300 mb-1.5 xs:mb-2 mx-auto ${
                      isActive
                        ? "bg-primary text-black shadow-[0_0_30px_-5px_rgba(82,82,255,0.5)]"
                        : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Value */}
                  <span
                    className={`block text-sm xs:text-base sm:text-xl font-black transition-colors leading-tight ${
                      isActive ? "text-white" : "text-gray-500 group-hover:text-white"
                    }`}
                  >
                    {spec.value}
                  </span>

                  {/* Label */}
                  <p
                    className={`text-[9px] xs:text-[10px] sm:text-sm font-medium transition-colors leading-tight ${
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

        {/* Spec Detail - Split Layout (고정 높이 컨테이너) */}
        <div className="relative h-[650px] sm:h-[500px] lg:h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpec}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 grid lg:grid-cols-2 gap-6 lg:gap-12 items-start"
            >
            {/* Visual Area - 고정 높이로 레이아웃 시프트 방지 */}
            <div className="relative order-2 lg:order-1 h-[400px] sm:h-[450px] lg:h-[500px]">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-full"
              >
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 blur-3xl scale-110" />

                {/* Comparison Layout for size spec - 2단계 시퀀스 애니메이션 */}
                {specMedia[hwSpecs.specs[activeSpec].image]?.type === "comparison" ? (
                  <div className="relative h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {comparisonPhase === "product" ? (
                        /* Phase 1: 룸핏 제품 크게 보여주기 */
                        <motion.div
                          key="product-phase"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8, x: 100 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="relative"
                        >
                          {/* 제품 카드 */}
                          <div className="relative w-[320px] h-[320px] rounded-3xl bg-gradient-to-br from-surface to-surface/50 border border-primary/30 overflow-hidden ring-2 ring-primary/20 shadow-[0_0_60px_-15px_rgba(82,82,255,0.3)]">
                            <Image
                              src={(specMedia[hwSpecs.specs[activeSpec].image] as ComparisonMedia).after}
                              alt="룸핏"
                              fill
                              className="object-contain p-6"
                            />
                            {/* 그라데이션 오버레이 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />

                            {/* 제품 정보 */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                              >
                                <span className="text-2xl font-black text-white">룸핏</span>
                                <p className="text-sm text-gray-400 mt-1">스마트 웨이트 머신</p>
                              </motion.div>
                            </div>
                          </div>

                          {/* 로딩 인디케이터 */}
                          <motion.div
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 bg-primary/50 rounded-full"
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">크기 비교 중...</span>
                          </motion.div>
                        </motion.div>
                      ) : (
                        /* Phase 2: 비교 뷰 */
                        <motion.div
                          key="compare-phase"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="relative flex items-end justify-center gap-6"
                        >
                          {/* 일반 홈짐 (크게) */}
                          <motion.div
                            initial={{ opacity: 0, x: -50, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-[260px] h-[260px] rounded-2xl bg-surface/60 border border-white/10 overflow-hidden"
                          >
                            <Image
                              src={(specMedia[hwSpecs.specs[activeSpec].image] as ComparisonMedia).before}
                              alt="일반 홈짐"
                              fill
                              className="object-contain p-4 opacity-80"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-void/90 to-transparent p-4">
                              <span className="text-sm font-bold text-gray-400">일반 홈짐</span>
                              <p className="text-xs text-red-400/80 mt-1">2500 × 2500mm</p>
                            </div>
                          </motion.div>

                          {/* VS + 화살표 */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="flex flex-col items-center gap-2 mb-12"
                          >
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-primary text-xl"
                            >
                              →
                            </motion.div>
                            <div className="w-10 h-10 rounded-full bg-void border-2 border-primary/50 flex items-center justify-center">
                              <span className="text-xs font-black text-primary">VS</span>
                            </div>
                          </motion.div>

                          {/* 룸핏 (작게) */}
                          <motion.div
                            initial={{ opacity: 0, scale: 1.5, x: -100 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex flex-col items-center"
                          >
                            <div className="relative w-[130px] h-[130px] rounded-xl bg-surface/80 border border-primary/40 overflow-hidden ring-2 ring-primary/30 shadow-[0_0_40px_-10px_rgba(82,82,255,0.4)]">
                              <Image
                                src={(specMedia[hwSpecs.specs[activeSpec].image] as ComparisonMedia).after}
                                alt="룸핏"
                                fill
                                className="object-contain p-3"
                              />
                            </div>
                            {/* 라벨 */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                              className="mt-3 text-center"
                            >
                              <span className="text-sm font-bold text-primary">룸핏</span>
                              <p className="text-xs text-secondary">1평 (1800mm)</p>
                            </motion.div>
                          </motion.div>

                          {/* 하단 메시지 */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center"
                          >
                            <p className="text-sm text-gray-400">
                              <span className="text-secondary font-bold">이 모든 것이</span> 단 1평에
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Default single image layout */
                  <div className="relative h-full rounded-3xl overflow-hidden">
                    <div className="relative h-full rounded-3xl bg-gradient-to-br from-surface to-muted overflow-hidden border border-white/10">
                      {/* Media */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`media-${activeSpec}`}
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
                            className="object-cover"
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
                  </div>
                )}
              </motion.div>
            </div>

            {/* Content - 고정 높이로 레이아웃 시프트 방지 */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-[200px] sm:h-[220px] lg:h-[240px] overflow-hidden"
              >
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                  {hwSpecs.specs[activeSpec].title}
                </h3>

                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 whitespace-pre-line">
                  {hwSpecs.specs[activeSpec].description}
                </p>

                {hwSpecs.specs[activeSpec].note && (
                  <p className="text-xs text-gray-600 mb-4 pl-3 border-l-2 border-gray-800">
                    {hwSpecs.specs[activeSpec].note}
                  </p>
                )}

                {/* Navigation dots */}
                <div className="flex items-center gap-2 mt-4 sm:mt-6">
                  {hwSpecs.specs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleUserSelect(index)}
                      className={`transition-all duration-300 ${
                        activeSpec === index
                          ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-primary rounded-full"
                          : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-600 rounded-full hover:bg-gray-500"
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
      </div>
    </section>
  );
}
