"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Activity,
  TrendingUp,
  Flame,
  Share2,
  BarChart3,
  LucideIcon,
} from "lucide-react";
import { content } from "@/data";
import { ActivityHeatmap, IPhoneFrame } from "@/components/demos";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  TrendingUp,
  Flame,
  Share2,
  BarChart3,
};

export default function DataInsights() {
  const { dataInsights } = content;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="data" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            {dataInsights.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {dataInsights.title.line1}{" "}
            <span className="gradient-text">{dataInsights.title.line2}</span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {dataInsights.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataInsights.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={index}
                className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {Icon && <Icon className="w-8 h-8 text-primary" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Heatmap Demo in iPhone Frame */}
        <div ref={ref} className="mt-16 flex justify-center">
          <IPhoneFrame>
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">운동 기록</h3>
                <p className="text-xs text-gray-500">Activity Heatmap</p>
              </div>
              <ActivityHeatmap isInView={isInView} />
            </div>
          </IPhoneFrame>
        </div>
      </div>
    </section>
  );
}
