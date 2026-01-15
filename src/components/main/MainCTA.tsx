"use client";

import { useRef } from "react";
import { ShoppingCart, Calendar, Sparkles, ArrowRight, Zap, Check, Shield, Truck, RotateCcw } from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";

const trustItems = [
  { icon: Truck, text: "무료 배송" },
  { icon: Shield, text: "1년 무상 A/S" },
];

export default function MainCTA() {
  const { cta } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="purchase"
      className="relative py-8 sm:py-12 lg:py-16 overflow-hidden"
    >
      {/* Background - Electric gradient enhanced */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-indigo-700">
        {/* Animated mesh gradient - Enhanced */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(186,252,39,0.2) 0%, transparent 40%)",
              "radial-gradient(circle at 80% 70%, rgba(186,252,39,0.2) 0%, transparent 40%)",
              "radial-gradient(circle at 50% 50%, rgba(186,252,39,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(186,252,39,0.2) 0%, transparent 40%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary glow animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 30%)",
              "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 30%)",
              "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 30%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Grid overlay - Enhanced */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, white 1px, transparent 1px),
              linear-gradient(white 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating orbs - Enhanced */}
        <motion.div
          className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full bg-secondary/25 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-[20%] w-96 h-96 rounded-full bg-white/10 blur-[140px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -20, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-400/10 blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-secondary/40 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Icon - Enhanced with pulsing ring */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="relative inline-block mb-6 sm:mb-10"
          >
            {/* Pulsing rings */}
            {[1, 2].map((ring) => (
              <motion.div
                key={ring}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: ring * 0.5,
                }}
                className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-secondary/30"
              />
            ))}

            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl shadow-black/20">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-secondary drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title - Enhanced with staggered animation */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl sm:text-4xl lg:text-5xl xl:text-7xl font-black text-white leading-tight"
            >
              {cta.title}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-lg lg:text-xl xl:text-2xl text-white/80 mb-8 sm:mb-10 lg:mb-14 max-w-2xl mx-auto leading-relaxed"
          >
            {cta.subtitle}
          </motion.p>

          {/* CTA Buttons - Enhanced with dramatic effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center mb-8 sm:mb-10 lg:mb-14"
          >
            {/* Primary CTA - Enhanced */}
            <motion.a
              href={cta.buttons.primary.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-secondary text-black px-6 py-3 sm:px-10 sm:py-5 lg:px-12 lg:py-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg overflow-hidden transition-all shadow-2xl shadow-secondary/40"
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary via-lime-300 to-secondary"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 100%" }}
              />

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              />

              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              <span className="relative z-10">{cta.buttons.primary.text}</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            </motion.a>

            {/* Secondary CTA - Enhanced */}
            <motion.a
              href={cta.buttons.secondary.href}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-3 sm:px-10 sm:py-5 lg:px-12 lg:py-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all border-2 border-white/30 hover:border-white/60 hover:bg-white/20"
            >
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
              <span>{cta.buttons.secondary.text}</span>
            </motion.a>
          </motion.div>

          {/* Trust indicators - Enhanced with icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-6 lg:gap-10"
          >
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 sm:gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">{item.text}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Decorative elements - Enhanced */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, type: "spring" }}
          className="absolute top-12 left-12 hidden lg:block"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 rounded-2xl border border-secondary/30 flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-secondary/60" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.1, type: "spring" }}
          className="absolute bottom-12 right-12 hidden lg:block"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-white/40" />
            </div>
          </motion.div>
        </motion.div>

        {/* Additional corner decorations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ delay: 1.2 }}
          className="absolute top-20 right-20 hidden lg:block"
        >
          <div className="w-32 h-32 border border-dashed border-white/20 rounded-full" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ delay: 1.3 }}
          className="absolute bottom-24 left-24 hidden lg:block"
        >
          <div className="w-20 h-20 border border-dashed border-secondary/30 rounded-full" />
        </motion.div>
      </div>

      {/* Bottom gradient fade - Enhanced */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-void via-void/50 to-transparent" />
    </section>
  );
}
