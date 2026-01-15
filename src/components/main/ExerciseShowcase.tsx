"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Dumbbell } from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView, PanInfo } from "framer-motion";

const SCROLL_SPEED = 0.5; // pixels per frame
const RESUME_DELAY = 3000; // 3초 후 재개

export default function ExerciseShowcase() {
  const { exerciseShowcase } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [isPaused, setIsPaused] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);

  // 무한 슬라이드를 위해 아이템 복제
  const duplicatedExercises = [
    ...exerciseShowcase.exercises,
    ...exerciseShowcase.exercises,
  ];

  // 컨테이너 너비 측정 (ResizeObserver로 안정적 측정)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measureWidth = () => {
      const width = container.scrollWidth / 2;
      if (width > 0) {
        setContainerWidth(width);
      }
    };

    // ResizeObserver로 컨테이너 크기 변화 감지
    const resizeObserver = new ResizeObserver(() => {
      measureWidth();
    });
    resizeObserver.observe(container);

    // 초기 측정 + 이미지 로딩 대기 후 재측정
    measureWidth();
    const timers = [
      setTimeout(measureWidth, 100),
      setTimeout(measureWidth, 500),
      setTimeout(measureWidth, 1000),
    ];

    return () => {
      resizeObserver.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [isInView]);

  // 자동 스크롤 애니메이션
  useEffect(() => {
    if (isPaused || !isInView || containerWidth === 0) return;

    const animate = () => {
      setScrollX((prev) => {
        const next = prev - SCROLL_SPEED;
        // 절반 지점에서 리셋 (무한 루프)
        if (Math.abs(next) >= containerWidth) {
          return 0;
        }
        return next;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isInView, containerWidth]);

  // 드래그 핸들러
  const handleDragStart = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setScrollX((prev) => {
      let next = prev + info.delta.x;
      // 무한 루프 경계 처리
      if (next > 0) next = -containerWidth + next;
      if (Math.abs(next) >= containerWidth) next = next + containerWidth;
      return next;
    });
  };

  const handleDragEnd = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  };

  // 클린업
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-8 sm:py-12 lg:py-16 bg-void overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-void to-surface" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[130px]"
        />

        {/* Horizontal lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6 sm:mb-8"
            >
              <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
              <span className="text-xs sm:text-sm font-bold text-secondary">{exerciseShowcase.badge}</span>
            </motion.div>

            {/* Title */}
            <h2 className="text-display-lg">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-white"
              >
                {exerciseShowcase.title.line1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block gradient-text"
              >
                {exerciseShowcase.title.line2}
              </motion.span>
            </h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto mt-4 sm:mt-6"
            >
              {exerciseShowcase.subtitle}
            </motion.p>
          </motion.div>
        </div>

        {/* Infinite Sliding Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative overflow-hidden"
        >
          {/* Gradient Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

          {/* Infinite Scroll Container */}
          <motion.div
            ref={containerRef}
            drag="x"
            dragConstraints={{ left: -containerWidth, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="flex gap-3 py-4 cursor-grab active:cursor-grabbing"
            style={{
              width: "max-content",
              x: scrollX,
            }}
          >
            {duplicatedExercises.map((exercise, index) => (
              <div
                key={`${exercise.name}-${index}`}
                className="group relative flex-shrink-0"
              >
                {/* Card - 9:16 Aspect Ratio */}
                <div className="relative w-[200px] sm:w-[240px] lg:w-[280px] aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-surface border border-white/5 transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/20 via-transparent to-secondary/10" />

                  {/* Exercise GIF - Lazy loaded */}
                  <Image
                    src={exercise.gif}
                    alt={exercise.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAwEPwAB//9k="
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-transparent to-transparent" />

                  {/* Exercise Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-secondary transition-colors">
                        {exercise.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-secondary to-primary rounded-full" />
                        <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Exercise</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-secondary/30 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text">146</span>
              <span className="text-xs sm:text-sm text-gray-400">가지 운동</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
