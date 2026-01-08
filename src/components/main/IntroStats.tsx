"use client";

import { useRef, useEffect, useState } from "react";
import { mainContent } from "@/data";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    return display.on("change", (v) => setDisplayValue(v));
  }, [display]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function IntroStats() {
  const { hero } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Parse stat values for animation
  const parseValue = (val: string) => {
    const num = parseInt(val.replace(/[^0-9]/g, ""));
    const suffix = val.replace(/[0-9]/g, "");
    return { num, suffix };
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-void overflow-hidden"
    >
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        {/* Radial gradient spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60" />

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, white 1px, transparent 1px),
                linear-gradient(white 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] w-64 h-64 bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-[10%] w-48 h-48 bg-secondary/20 rounded-full blur-[80px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge with pulse effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <motion.div
            className="relative group cursor-default"
            whileHover={{ scale: 1.02 }}
          >
            {/* Glow ring */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(186, 252, 39, 0.4)",
                  "0 0 0 8px rgba(186, 252, 39, 0)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />
            <div className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-secondary/10 border border-secondary/30 backdrop-blur-sm">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
              <span className="text-xs sm:text-sm font-bold text-secondary tracking-wide">
                {hero.badge}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Title with stagger reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-display-lg">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="block text-white"
            >
              {hero.title.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="block"
            >
              <span className="relative inline-block">
                <span
                  className="relative text-primary"
                  style={{
                    textShadow: "0 0 30px rgba(82,82,255,0.3)"
                  }}
                >
                  {hero.title.highlight}
                </span>
                {/* Underline accent */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary origin-left rounded-full"
                />
              </span>
            </motion.span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-center text-base sm:text-xl md:text-2xl text-gray-400 mb-12 sm:mb-20 max-w-2xl mx-auto"
        >
          {hero.subtitle}
        </motion.p>

        {/* Stats Grid - Equal Height Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 max-w-5xl mx-auto mb-12 sm:mb-20">
          {hero.stats.map((stat, index) => {
            const { num, suffix } = parseValue(stat.value);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full min-h-[180px] sm:min-h-[220px] p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-surface/80 backdrop-blur-sm border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-primary/30 flex flex-col justify-between">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[60px]" />

                  {/* Index number */}
                  <div className="text-xs font-mono text-gray-600 mb-auto">
                    0{index + 1}
                  </div>

                  <div className="relative z-10">
                    {/* Stat Value with Counter Animation */}
                    <div className="mb-3">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white group-hover:text-glow transition-all duration-300 whitespace-nowrap">
                        <AnimatedCounter value={num} suffix={suffix} />
                      </span>
                    </div>

                    {/* Label */}
                    <p className="text-base text-gray-400 font-medium group-hover:text-gray-300 transition-colors">
                      {stat.label}
                    </p>

                    {/* Decorative line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="mt-5 h-[2px] bg-gradient-to-r from-primary/50 to-transparent origin-left"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Primary CTA */}
          <motion.a
            href="#purchase"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-lg font-bold text-black bg-secondary rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(186,252,39,0.5)]"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">{hero.cta.primary}</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 relative group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="https://roomfit.notion.site/23f478cb1fa581e288cae8dfee2f90d6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-lg font-bold text-white rounded-lg sm:rounded-xl border border-white/20 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
          >
            <span>{hero.cta.secondary}</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </section>
  );
}
