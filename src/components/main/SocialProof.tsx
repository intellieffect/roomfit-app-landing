"use client";

import { useRef, useEffect, useState } from "react";
import { Star, Quote, TrendingUp, Users, Award, BadgeCheck, Shield, Truck, RotateCcw, Wrench } from "lucide-react";
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
const trustBadges = [
  { icon: Shield, label: "품질 보증" },
  { icon: Truck, label: "무료 배송" },
  { icon: RotateCcw, label: "30일 환불" },
  { icon: Wrench, label: "A/S 1년" },
];

export default function SocialProof() {
  const { socialProof } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);

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
      className="relative py-32 lg:py-40 bg-surface overflow-hidden"
    >
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        {/* Radial gradient mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />

        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-80 h-80 bg-yellow-500/10 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-[15%] w-72 h-72 bg-secondary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[30%] w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, white 1px, transparent 1px),
              linear-gradient(white 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-20 left-[5%] w-40 h-40 border border-yellow-500/10 rounded-full" />
        <div className="absolute bottom-32 right-[10%] w-24 h-24 border border-secondary/10 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(234,179,8,0.4)",
                  "0 0 0 10px rgba(234,179,8,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/30"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold text-yellow-400 tracking-wide">
                {socialProof.badge}
              </span>
            </motion.div>
          </motion.div>

          <h2 className="text-display-lg">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-white"
            >
              {socialProof.title.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block gradient-text"
            >
              {socialProof.title.line2}
            </motion.span>
          </h2>
        </motion.div>

        {/* Achievements - Big Numbers with Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20"
        >
          {socialProof.achievements.map((achievement, index) => {
            const Icon = achievementIcons[index];
            const numericValue = parseInt(achievement.value.replace(/[^0-9]/g, ""));
            const suffix = achievement.value.replace(/[0-9]/g, "");
            const displayValue = index === 0 ? counter1.count : index === 1 ? counter2.count : numericValue;
            const isHovered = hoveredAchievement === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                onMouseEnter={() => setHoveredAchievement(index)}
                onMouseLeave={() => setHoveredAchievement(null)}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative p-6 lg:p-8 rounded-2xl bg-void/80 backdrop-blur-sm border border-white/5 hover:border-yellow-500/30 transition-all duration-500 text-center overflow-hidden h-full"
                >
                  {/* Hover gradient effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-primary/5"
                  />

                  {/* Glow effect */}
                  <motion.div
                    animate={{
                      opacity: isHovered ? 0.5 : 0,
                      scale: isHovered ? 1 : 0.8,
                    }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl"
                  />

                  {/* Index number watermark */}
                  <div className="absolute top-4 right-4 text-4xl font-black text-yellow-500/5 select-none pointer-events-none">
                    0{index + 1}
                  </div>

                  <div className="relative z-10">
                    {/* Icon with glow */}
                    <motion.div
                      animate={{
                        boxShadow: isHovered
                          ? "0 0 30px rgba(234,179,8,0.3)"
                          : "0 0 0 rgba(234,179,8,0)",
                      }}
                      className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-yellow-500/20 transition-all duration-300"
                    >
                      <Icon className="w-7 h-7 text-yellow-400" />
                    </motion.div>

                    {/* Value */}
                    <div className="mb-3">
                      <motion.span
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-white"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {displayValue.toLocaleString()}
                      </motion.span>
                      <span className="text-xl sm:text-2xl font-bold text-secondary ml-1">
                        {suffix}
                      </span>
                    </div>

                    {/* Label */}
                    <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">
                      {achievement.label}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 via-secondary to-primary origin-left"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials - Magazine Style with Enhanced Design */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {socialProof.testimonials.map((testimonial, index) => {
            const isHovered = hoveredTestimonial === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredTestimonial(index)}
                onMouseLeave={() => setHoveredTestimonial(null)}
                className={`group relative ${index === 1 ? "md:mt-8" : ""}`}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative p-7 lg:p-8 rounded-3xl bg-void/80 backdrop-blur-sm border border-white/5 hover:border-secondary/30 transition-all duration-500 h-full overflow-hidden"
                >
                  {/* Quote icon - Enhanced */}
                  <motion.div
                    animate={{
                      rotate: isHovered ? 10 : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    className="absolute top-6 right-6"
                  >
                    <Quote className="w-12 h-12 text-secondary/10 group-hover:text-secondary/20 transition-colors" />
                  </motion.div>

                  {/* Hover gradient */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5"
                  />

                  {/* Glow effect */}
                  <motion.div
                    animate={{
                      opacity: isHovered ? 0.4 : 0,
                    }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full h-32 bg-secondary/20 rounded-full blur-3xl"
                  />

                  <div className="relative z-10">
                    {/* Stars - Enhanced */}
                    <div className="flex gap-1.5 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.7 + index * 0.15 + i * 0.05 }}
                        >
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-lg text-white font-medium leading-relaxed mb-8 group-hover:text-white/90 transition-colors">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Source - Enhanced */}
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary via-primary to-secondary flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-secondary/20">
                          {testimonial.source.charAt(0)}
                        </div>
                        {/* Verified badge */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <BadgeCheck className="w-3 h-3 text-white" />
                        </div>
                      </motion.div>
                      <div>
                        <p className="text-base text-white font-semibold">
                          {testimonial.source}
                        </p>
                        <p className="text-sm text-green-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          Verified Buyer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary via-primary to-secondary origin-center"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust badges - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-20 pt-10 border-t border-white/5"
        >
          <p className="text-center text-xs font-bold text-gray-600 uppercase tracking-widest mb-8">
            신뢰할 수 있는 약속
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-void/50 border border-white/5 hover:border-secondary/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                    {badge.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
