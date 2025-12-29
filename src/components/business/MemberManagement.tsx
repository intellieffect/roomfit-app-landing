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
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            {memberManagement.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {memberManagement.title.line1}
            <br />
            <span className="text-secondary">{memberManagement.title.line2}</span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {memberManagement.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {memberManagement.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={index}
                className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {Icon && <Icon className="w-8 h-8 text-secondary" />}
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
      </div>
    </section>
  );
}
