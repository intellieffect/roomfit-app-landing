"use client";

import { useRef } from "react";
import { ShoppingCart, Calendar, Sparkles, ArrowRight, Zap } from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";

export default function MainCTA() {
  const { cta } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="purchase"
      className="relative py-32 overflow-hidden"
    >
      {/* Background - Electric gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-indigo-700">
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(186,252,39,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(186,252,39,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(186,252,39,0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-secondary/20 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white/10 blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-10 h-10 text-secondary" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
          >
            {cta.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-white/80 mb-12 max-w-2xl mx-auto"
          >
            {cta.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA */}
            <a
              href={cta.buttons.primary.href}
              className="group relative inline-flex items-center justify-center gap-3 bg-secondary text-black px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-2xl shadow-secondary/30"
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                animate={{ translateX: ["−100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <ShoppingCart className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{cta.buttons.primary.text}</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Secondary CTA */}
            <a
              href={cta.buttons.secondary.href}
              className="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-lg transition-all hover:bg-white/20 border border-white/30 hover:border-white/50"
            >
              <Calendar className="w-5 h-5" />
              <span>{cta.buttons.secondary.text}</span>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: "✓", text: "무료 배송" },
              { icon: "✓", text: "30일 환불 보장" },
              { icon: "✓", text: "1년 무상 A/S" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-white/70"
              >
                <span className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center text-xs text-secondary">
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-8 left-8 hidden lg:block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-secondary/50" />
          </motion.div>
        </div>
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-white/30" />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
