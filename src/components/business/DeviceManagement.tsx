"use client";

import { Smartphone, CheckCircle2 } from "lucide-react";
import { businessContent } from "@/data";

export default function DeviceManagement() {
  const { deviceManagement } = businessContent;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4" />
              {deviceManagement.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {deviceManagement.title.line1}
              <br />
              <span className="gradient-text">{deviceManagement.title.line2}</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {deviceManagement.subtitle}
            </p>

            <p className="text-gray-500 dark:text-gray-500 mb-8">
              {deviceManagement.description}
            </p>

            <div className="space-y-3">
              {deviceManagement.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                    <Smartphone className="w-20 h-20 text-primary" />
                  </div>
                </div>
              </div>

              {/* Floating indicators */}
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-lg">
                <span className="text-sm font-medium text-green-500">연결됨</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-lg">
                <span className="text-sm font-medium text-primary">배터리 85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
