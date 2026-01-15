"use client";

import { useRef } from "react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";

const reviews = [
  "기다릴 가치가 있었으며, 펀딩 가격 기준으로는 행운이라 느껴질 정도 ",
  "정가에 구매하더라도 아깝지 않을 하드웨어 품질",
  "감탄이 나올 정도로 정교하고 우수한 퀄리티의 머신👍👍",
];

export default function OfficialLaunch() {
  const { hero } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            직접 써보니 더 만족 하는 그 머신!
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            드디어 정식 출시 🎉
          </p>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <span className="text-lg sm:text-xl text-gray-600">
            🔥 1차~6차 펀딩, 성황리에 마감 🔥
          </span>
        </motion.div>

        {/* Highlight Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <span className="text-xl sm:text-2xl font-bold text-[#5252ff]">
            정규 출시 완료 !!
          </span>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 mb-12"
        >
          {reviews.map((review, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-base sm:text-lg text-gray-600 italic"
            >
              &ldquo;{review}&rdquo;
            </motion.p>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Primary CTA - 구매하기 */}
          <motion.a
            href="https://roomfit.kr/funding/?idx=11"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-[#5252ff] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <span className="relative">{hero.cta.primary}</span>
            <ChevronRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Secondary CTA - 직접 체험하기 */}
          <motion.a
            href="https://roomfit.notion.site/23f478cb1fa581e288cae8dfee2f90d6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-[#7cb305] rounded-xl border-2 border-[#7cb305] overflow-hidden transition-all duration-300 hover:bg-[#7cb305]/5"
          >
            <span>{hero.cta.secondary}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
