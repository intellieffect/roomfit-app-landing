"use client";

import { useRef } from "react";
import { Home, RefreshCw, ShieldAlert, HelpCircle, LucideIcon, X } from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Home,
  RefreshCw,
  ShieldAlert,
  HelpCircle,
};

export default function PainPoints() {
  const { painPoints } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-surface overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
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
          <h2 className="text-display-lg text-white">
            {painPoints.title}
          </h2>
        </motion.div>

        {/* Pain Points Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.items.map((item, index) => {
            const Icon = iconMap[item.icon];

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
                <div className="relative p-8 rounded-2xl bg-void border border-white/5 hover:border-red-500/20 transition-all duration-500 h-full">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* X mark indicator */}
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center">
                    <X className="w-3 h-3 text-red-400" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-red-500/10 text-red-400 group-hover:bg-red-500/20 transition-colors">
                      {Icon && <Icon className="w-7 h-7" />}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Transition text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-2xl text-gray-600">
            그래서 만들었습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
