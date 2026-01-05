"use client";

import { useState } from "react";
import Image from "next/image";
import { mainContent } from "@/data";
import { motion, AnimatePresence } from "framer-motion";

export default function HWSpecs() {
  const { hwSpecs, exerciseTypes } = mainContent;
  const [activeSpec, setActiveSpec] = useState(0);

  // Map spec image keys to actual image paths
  const imageMap: Record<string, string> = {
    weight: "/images/hw/weight.webp",
    size: "/images/hw/size.webp",
    exercises: "/images/hw/exercises.webp",
  };

  return (
    <section id="specs" className="py-24 bg-white dark:bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            {hwSpecs.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {hwSpecs.title.line1}
            <br />
            <span className="gradient-text">{hwSpecs.title.line2}</span>
          </h2>
        </motion.div>

        {/* Spec Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {hwSpecs.specs.map((spec, index) => (
            <button
              key={index}
              onClick={() => setActiveSpec(index)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeSpec === index
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-lg font-bold">{spec.value}</span>
              <span className="ml-2 text-sm opacity-80">{spec.label}</span>
            </button>
          ))}
        </div>

        {/* Spec Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpec}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                {/* Placeholder for actual image */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">
                    {hwSpecs.specs[activeSpec].value}
                  </div>
                  <div className="text-xl">
                    {hwSpecs.specs[activeSpec].label}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {hwSpecs.specs[activeSpec].title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {hwSpecs.specs[activeSpec].description}
              </p>
              {hwSpecs.specs[activeSpec].note && (
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {hwSpecs.specs[activeSpec].note}
                </p>
              )}

              {/* Exercise Types (show only for exercises spec) */}
              {hwSpecs.specs[activeSpec].image === "exercises" && (
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    {exerciseTypes.map((exercise, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400"
                      >
                        {exercise}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
