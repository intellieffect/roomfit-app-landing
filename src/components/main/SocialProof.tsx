"use client";

import { useRef, useEffect, useState } from "react";
import { Star, Quote, TrendingUp, Users, Award } from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, isAnimating]);

  return { count, startAnimation: () => setIsAnimating(true) };
}

const achievementIcons = [Users, TrendingUp, Award, Star];

export default function SocialProof() {
  const { socialProof } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Parse numbers from achievement values
  const counter1 = useAnimatedCounter(2400, 2000);
  const counter2 = useAnimatedCounter(98, 1800);

  useEffect(() => {
    if (isInView) {
      counter1.startAnimation();
      counter2.startAnimation();
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-surface overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 mb-8">
            <Star className="w-4 h-4 fill-current" />
            {socialProof.badge}
          </div>
          <h2 className="text-display-lg text-white mb-4">
            {socialProof.title.line1}
            <br />
            <span className="gradient-text">{socialProof.title.line2}</span>
          </h2>
        </motion.div>

        {/* Achievements - Big Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {socialProof.achievements.map((achievement, index) => {
            const Icon = achievementIcons[index];
            // Parse the numeric value
            const numericValue = parseInt(achievement.value.replace(/[^0-9]/g, ""));
            const suffix = achievement.value.replace(/[0-9]/g, "");
            const displayValue = index === 0 ? counter1.count : index === 1 ? counter2.count : numericValue;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-void border border-white/5 hover:border-primary/20 transition-all text-center overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {displayValue.toLocaleString()}
                    </span>
                    <span className="text-2xl font-bold text-secondary ml-1">
                      {suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <p className="text-gray-500 font-medium">{achievement.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials - Magazine Style */}
        <div className="grid md:grid-cols-3 gap-6">
          {socialProof.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.5 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-void border border-white/5 hover:border-secondary/20 transition-all duration-500 h-full overflow-hidden">
                {/* Quote icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="w-10 h-10 text-secondary/10 group-hover:text-secondary/20 transition-colors" />
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg text-white font-medium leading-relaxed mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Source */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black font-bold">
                      {testimonial.source.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">
                        {testimonial.source}
                      </p>
                      <p className="text-xs text-gray-500">Verified Buyer</p>
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {["품질 보증", "무료 배송", "30일 환불", "A/S 1년"].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 text-gray-500"
            >
              <div className="w-2 h-2 rounded-full bg-secondary/50" />
              <span className="text-sm font-medium">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
