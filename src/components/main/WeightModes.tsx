"use client";

import { useState } from "react";
import { Minus, TrendingUp, ArrowDown, Gauge, LucideIcon } from "lucide-react";
import { mainContent } from "@/data";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Minus,
  TrendingUp,
  ArrowDown,
  Gauge,
};

export default function WeightModes() {
  const { weightModes } = mainContent;
  const [activeMode, setActiveMode] = useState(0);

  return (
    <section id="modes" className="py-24 bg-gray-50 dark:bg-gray-900/50">
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
            {weightModes.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {weightModes.title.line1}
            <br />
            <span className="gradient-text">{weightModes.title.line2}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {weightModes.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Mode Selector */}
          <div className="space-y-4">
            {weightModes.modes.map((mode, index) => {
              const Icon = iconMap[mode.icon];
              return (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setActiveMode(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    activeMode === index
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activeMode === index
                          ? "bg-white/20"
                          : "bg-primary/10"
                      }`}
                    >
                      {Icon && (
                        <Icon
                          className={`w-6 h-6 ${
                            activeMode === index ? "text-white" : "text-primary"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{mode.title}</h3>
                      <p
                        className={`text-sm ${
                          activeMode === index
                            ? "text-white/80"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {mode.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Mode Preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="sticky top-24"
            >
              {/* GIF/Video placeholder */}
              <div className="aspect-video bg-gray-900 rounded-3xl overflow-hidden mb-6 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">
                    {(() => {
                      const Icon = iconMap[weightModes.modes[activeMode].icon];
                      return Icon && <Icon className="w-16 h-16 mx-auto" />;
                    })()}
                  </div>
                  <div className="text-2xl font-bold">
                    {weightModes.modes[activeMode].title}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {weightModes.modes[activeMode].title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {weightModes.modes[activeMode].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
