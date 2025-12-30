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
    <section id="vbt" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Demo animations area */}
          <div ref={ref} className="relative order-2 lg:order-1 flex justify-center">
            <IPhoneFrame>
              <VelocityLossChart isInView={isInView} />
            </IPhoneFrame>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              {vbtAnalysis.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {vbtAnalysis.title.line1}
              <br />
              <span className="gradient-text">{vbtAnalysis.title.line2}</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {vbtAnalysis.subtitle}
            </p>

            <p className="text-gray-500 dark:text-gray-500 mb-8">
              {vbtAnalysis.description}
            </p>

            <div className="space-y-4">
              {vbtAnalysis.features.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
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
