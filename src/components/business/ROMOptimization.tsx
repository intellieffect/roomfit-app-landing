"use client";

import {
  Ruler,
  UserCheck,
  Settings2,
  RotateCcw,
  LucideIcon,
} from "lucide-react";
import { businessContent } from "@/data";

const iconMap: Record<string, LucideIcon> = {
  UserCheck,
  Settings2,
  RotateCcw,
  Ruler,
};

export default function ROMOptimization() {
  const { romOptimization } = businessContent;

  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Ruler className="w-4 h-4" />
            {romOptimization.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {romOptimization.title.line1}
            <br />
            <span className="text-secondary">{romOptimization.title.line2}</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {romOptimization.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {romOptimization.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={index}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-secondary/50 transition-all"
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-6 h-6 text-secondary" />}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
