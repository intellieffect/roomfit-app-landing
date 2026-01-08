"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Activity, Target, TrendingUp, Zap, LucideIcon } from "lucide-react";
import { content } from "@/data";
import { VelocityLossChart, IPhoneFrame } from "@/components/demos";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Target,
  TrendingUp,
  Zap,
};

export default function VBTAnalysis() {
  const { vbtAnalysis } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vbt" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Demo animations area */}
          <div ref={ref} className="relative order-2 lg:order-1 flex justify-center">
            <IPhoneFrame>
              <VelocityLossChart isInView={isInView} />
            </IPhoneFrame>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {vbtAnalysis.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {vbtAnalysis.title.line1}
              <br />
              <span className="gradient-text">{vbtAnalysis.title.line2}</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              {vbtAnalysis.subtitle}
            </p>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 mb-6 sm:mb-8">
              {vbtAnalysis.description}
            </p>

            <div className="space-y-3 sm:space-y-4">
              {vbtAnalysis.features.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={index} className="flex gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
