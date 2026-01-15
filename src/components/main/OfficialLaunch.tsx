"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function OfficialLaunch() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-8 lg:py-12 bg-white overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <p className="text-lg sm:text-xl font-bold text-gray-800">
            올해는 반드시!!
          </p>
          <p className="text-base sm:text-lg text-gray-700">
            꾸준한 운동을 응원합니다.
          </p>
        </motion.div>

        {/* Main title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary mb-4"
        >
          신년맞이 특별 쿠폰
        </motion.h2>

        {/* Coupon box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block mb-4"
        >
          <div className="border-2 border-primary rounded-lg px-6 py-4 bg-gray-50">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mb-2">
              300,000원
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              회원 전용, ~1/30
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              재고 소진시 마감
            </p>
          </div>
        </motion.div>

        {/* Coupon notice */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base text-gray-500 mb-4"
        >
          상품페이지에서 쿠폰 발급
        </motion.p>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
            활기찬 2026년을 위해,
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
            고민은 배송만 늦출 뿐!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
