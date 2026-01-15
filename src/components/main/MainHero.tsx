"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MainHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[33vh] flex items-center justify-center overflow-hidden bg-black mt-24 lg:mt-16"
    >
      {/* Background - YouTube 영상 배경 */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y }}
          className="absolute inset-0 overflow-hidden"
        >
          <iframe
            src="https://www.youtube.com/embed/DdI_poNdub8?autoplay=1&mute=1&loop=1&playlist=DdI_poNdub8&controls=0&showinfo=0&modestbranding=1&rel=0&enablejsapi=1&playsinline=1"
            title="룸핏 소개 영상"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            tabIndex={-1}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100vw,177.78vh)] h-[max(100vh,56.25vw)] pointer-events-none"
            style={{ border: "none" }}
          />
        </motion.div>

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center"
      >
        {/* ROOMFIT 로고 이미지 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-2 flex justify-center"
        >
          <Image
            src="/roomfit/logo.svg"
            alt="ROOMFIT"
            width={200}
            height={40}
            className="h-5 sm:h-6 md:h-7 lg:h-8 w-auto"
            priority
          />
        </motion.div>

        {/* 태그라인 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-sm sm:text-base md:text-lg text-white/90 font-medium"
        >
          컴팩트. 초강력. 스마트.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
