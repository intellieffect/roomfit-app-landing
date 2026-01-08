"use client";

import {
  Users,
  TrendingUp,
  FileText,
  Bell,
  BarChart3,
  LucideIcon,
} from "lucide-react";
import { businessContent } from "@/data";

const iconMap: Record<string, LucideIcon> = {
  Users,
  TrendingUp,
  FileText,
  Bell,
};

export default function MemberManagement() {
  const { memberManagement } = businessContent;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-secondary/20 text-secondary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {memberManagement.badge}
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            {memberManagement.title.line1}
            <br />
            <span className="text-secondary">{memberManagement.title.line2}</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            {memberManagement.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {memberManagement.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={index}
                className="text-center p-4 sm:p-6 lg:p-8 bg-gray-800 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-secondary/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-secondary" />}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
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
