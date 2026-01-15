"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Puzzle, ArrowRight } from "lucide-react";

const addOnItems = [
  {
    name: "딥 바",
    description: "딥스, 레그레이즈 등",
    image: "/roomfit/product-fullset.png",
  },
];

export default function AddOns() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-8 sm:py-12 lg:py-16 bg-surface overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-3"
          >
            <Puzzle className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
            <span className="text-xs sm:text-sm font-bold text-secondary">
              확장 가능한 시스템
            </span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Add-Ons
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            컴팩트함을 유지하면서 거의 모든 운동을 가능하게
          </p>
        </motion.div>

        {/* Add-on Cards */}
        <div className="flex justify-center mb-6">
          {addOnItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-void border border-white/10">
            <span className="text-sm text-gray-400">출시 예정</span>
            <ArrowRight className="w-4 h-4 text-secondary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
