"use client";

import { Star, Quote } from "lucide-react";
import { mainContent } from "@/data";
import { motion } from "framer-motion";

export default function SocialProof() {
  const { socialProof } = mainContent;

  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            {socialProof.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {socialProof.title.line1}
            <br />
            <span className="gradient-text">{socialProof.title.line2}</span>
          </h2>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-6 max-w-xl mx-auto mb-16"
        >
          {socialProof.achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
            >
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {achievement.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {achievement.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {socialProof.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <p className="text-gray-900 dark:text-white font-medium mb-4 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                - {testimonial.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
