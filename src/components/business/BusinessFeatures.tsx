"use client";

import {
  Activity,
  Users,
  Hand,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { businessContent } from "@/data";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Users,
  Hand,
  TrendingUp,
};

export default function BusinessFeatures() {
  const { features } = businessContent;

  return (
    <section id="features" className="py-16 sm:py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            <span className="text-secondary">{features.title}</span>
            {features.titleSuffix}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            {features.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                className="group p-4 sm:p-6 bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 ${
                    feature.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/20 text-secondary"
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
