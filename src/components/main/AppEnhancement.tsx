"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Activity,
  Target,
  Brain,
  Smartphone,
  TrendingUp,
  ArrowRight,
  LucideIcon,
  Zap,
} from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Target,
  Brain,
  Smartphone,
  TrendingUp,
};

export default function AppEnhancement() {
  const { appEnhancement } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="app"
      className="relative py-32 bg-surface overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent" />

        {/* Circuit pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="circuit"
              patternUnits="userSpaceOnUse"
              width="50"
              height="50"
            >
              <path
                d="M25 0 V25 H50 M0 25 H25 M25 25 V50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-white"
              />
              <circle cx="25" cy="25" r="2" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="badge badge-electric mb-6">
            <Smartphone className="w-4 h-4" />
            {appEnhancement.badge}
          </div>
          <h2 className="text-display-lg text-white mb-4">
            {appEnhancement.title.line1}
            <br />
            <span className="gradient-text-electric">{appEnhancement.title.line2}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {appEnhancement.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {appEnhancement.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl bg-void border border-white/5 hover:border-primary/30 transition-all duration-500 h-full overflow-hidden">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Glow effect */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      {Icon && <Icon className="w-7 h-7" />}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute bottom-2 right-2 w-8 h-0.5 bg-gradient-to-r from-transparent to-primary/30 group-hover:to-primary/60 transition-colors" />
                    <div className="absolute bottom-2 right-2 w-0.5 h-8 bg-gradient-to-t from-transparent to-primary/30 group-hover:to-primary/60 transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* App Preview & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-void to-muted border border-white/5 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(82,82,255,0.3) 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Phone mockup */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-96 rounded-[2.5rem] bg-void border-4 border-gray-800 shadow-2xl overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-2xl" />

                  {/* Screen content */}
                  <div className="absolute inset-4 top-8 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center">
                    <Zap className="w-12 h-12 text-secondary mb-4" />
                    <p className="text-white font-bold text-lg">ROOMFIT</p>
                    <p className="text-gray-400 text-sm">APP</p>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-600 rounded-full" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  하드웨어의 잠재력을
                  <br />
                  <span className="text-secondary">100% 끌어내는 앱</span>
                </h3>
                <p className="text-gray-400 mb-8 max-w-lg">
                  AI 기반 운동 분석, 실시간 피드백, 개인화된 프로그램까지.
                  룸핏 앱과 함께라면 전문 트레이너 없이도 최적의 운동이 가능합니다.
                </p>

                <Link
                  href={appEnhancement.cta.href}
                  className="group inline-flex items-center gap-3 bg-secondary text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
                >
                  <span className="relative z-10">{appEnhancement.cta.text}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
