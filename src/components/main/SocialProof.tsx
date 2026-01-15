"use client";

import { useRef, useState, useEffect } from "react";
import { Star, Quote, BadgeCheck, Shield, Truck, Wrench, Eye, Heart } from "lucide-react";
import { mainContent, testimonials } from "@/data";
import { motion, useInView, PanInfo } from "framer-motion";

const SCROLL_SPEED = 0.3; // pixels per frame (slower for testimonials)
const RESUME_DELAY = 3000; // 3초 후 재개

const trustBadges = [
  { icon: Shield, label: "품질 보증" },
  { icon: Truck, label: "무료 배송" },
  { icon: Wrench, label: "A/S 1년" },
];

export default function SocialProof() {
  const { socialProof } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [isPaused, setIsPaused] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);

  // 무한 슬라이드를 위해 아이템 복제
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // 컨테이너 너비 측정
  useEffect(() => {
    const measureWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth / 2);
      }
    };

    // 초기 측정 + 뷰포트 진입 시 재측정
    measureWidth();

    // DOM 렌더링 완료 후 재측정
    const timer = setTimeout(measureWidth, 100);
    return () => clearTimeout(timer);
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
      className="relative py-8 sm:py-12 lg:py-16 bg-surface overflow-hidden"
    >
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        {/* Radial gradient mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />

        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-80 h-80 bg-yellow-500/10 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-[15%] w-72 h-72 bg-secondary/10 rounded-full blur-[120px]"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, white 1px, transparent 1px),
              linear-gradient(white 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-20 left-[5%] w-40 h-40 border border-yellow-500/10 rounded-full" />
        <div className="absolute bottom-32 right-[10%] w-24 h-24 border border-secondary/10 rounded-full" />
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6 sm:mb-8"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(234,179,8,0.4)",
                    "0 0 0 10px rgba(234,179,8,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/30"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs sm:text-sm font-bold text-yellow-400 tracking-wide">
                  {socialProof.badge}
                </span>
              </motion.div>
            </motion.div>

            <h2 className="text-display-lg mb-6 sm:mb-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-white"
              >
                {socialProof.title.line1}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block gradient-text"
              >
                {socialProof.title.line2}
              </motion.span>
            </h2>
          </motion.div>
        </div>

        {/* Infinite Sliding Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative overflow-hidden"
        >
          {/* Gradient Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

          {/* Infinite Scroll Container */}
          <motion.div
            ref={containerRef}
            drag="x"
            dragConstraints={{ left: -containerWidth, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="flex gap-5 py-4 cursor-grab active:cursor-grabbing"
            style={{
              width: "max-content",
              x: scrollX,
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="group relative flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[350px]"
              >
                <div className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-void/80 backdrop-blur-sm border border-white/5 hover:border-secondary/30 transition-all duration-500 h-full overflow-hidden">
                  {/* Quote icon */}
                  <div className="absolute top-5 right-5">
                    <Quote className="w-10 h-10 text-secondary/10 group-hover:text-secondary/20 transition-colors" />
                  </div>

                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    {/* Header: Stars + Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                        {testimonial.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white mb-3 line-clamp-1 group-hover:text-secondary transition-colors">
                      {testimonial.title}
                    </h3>

                    {/* Quote */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-6 line-clamp-3">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Footer: Author + Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary via-primary to-secondary flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-secondary/20">
                            {testimonial.author.charAt(0)}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <BadgeCheck className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">
                            {testimonial.author}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(testimonial.date).toLocaleDateString("ko-KR", {
                              year: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {testimonial.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" />
                          {testimonial.likes}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary via-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 sm:mt-20 pt-6 sm:pt-10 border-t border-white/5"
          >
            <p className="text-center text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-widest mb-6 sm:mb-8">
              신뢰할 수 있는 약속
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="group flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-void/50 border border-white/5 hover:border-secondary/20 transition-all duration-300"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                      {badge.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
