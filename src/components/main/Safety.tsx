"use client";

import { Scan, ShieldCheck, Hand, LucideIcon } from "lucide-react";
import { mainContent } from "@/data";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Scan,
  ShieldCheck,
  Hand,
};

export default function Safety() {
  const { safety } = mainContent;

  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              {safety.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {safety.title.line1}
              <br />
              <span className="text-green-500">{safety.title.line2}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {safety.description}
            </p>

            {/* Safety Features */}
            <div className="space-y-4">
              {safety.features.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex-shrink-0">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <ShieldCheck className="w-32 h-32 text-green-500 mx-auto mb-4" />
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  안전 최우선 설계
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
