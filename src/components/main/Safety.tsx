"use client";

import { useRef } from "react";
import Image from "next/image";
import { Scan, ShieldCheck, Hand, LucideIcon, Check } from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Scan,
  ShieldCheck,
  Hand,
};

// 안전 시스템 시연용 운동 GIF
const safetyGif = "/roomfit/exercise-belt-squat-white.gif";

export default function Safety() {
  const { safety } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-void overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-500/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-green-500/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-green-500/10 text-green-400 border border-green-500/20 mb-8">
              <ShieldCheck className="w-4 h-4" />
              {safety.badge}
            </div>

            <h2 className="text-display-lg text-white mb-6">
              {safety.title.line1}
              <br />
              <span className="text-green-400">{safety.title.line2}</span>
            </h2>

            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              {safety.description}
            </p>

            {/* Safety Features */}
            <div className="space-y-6">
              {safety.features.map((feature, index) => {
                const Icon = iconMap[feature.icon];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.1,
                    }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-white/5 hover:border-green-500/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/10 text-green-400 flex-shrink-0">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Visual - 실제 roomfit 안전 시스템 GIF */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-surface to-muted overflow-hidden border border-green-500/20">
              {/* 실제 GIF 이미지 */}
              <div className="absolute inset-0">
                <Image
                  src={safetyGif}
                  alt="룸핏 안전 시스템"
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* 그라디언트 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
              </div>

              {/* Safety badge */}
              <div className="absolute top-4 right-4 z-10">
                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 rgba(34,197,94,0.4)", "0 0 0 10px rgba(34,197,94,0)", "0 0 0 0 rgba(34,197,94,0.4)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30"
                >
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">안전 시스템</span>
                </motion.div>
              </div>

              {/* Safety indicators */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="bg-void/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="flex gap-3">
                    {["가동범위 제한", "깔림방지", "자동 OFF"].map((label, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex-1 flex items-center gap-2"
                      >
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-xs text-gray-300">{label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
