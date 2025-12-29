"use client";

import Image from "next/image";
import { Dumbbell } from "lucide-react";
import { businessContent, images, getScreenshot } from "@/data";

export default function BusinessTrainingModes() {
  const { trainingModes } = businessContent;
  const gridImages = images.sections.trainingModes.grid;

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Dumbbell className="w-4 h-4" />
              {trainingModes.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {trainingModes.title.line1}
              <br />
              <span className="text-secondary">{trainingModes.title.line2}</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {trainingModes.subtitle}
            </p>

            <p className="text-gray-500 dark:text-gray-500 mb-8">
              {trainingModes.description}
            </p>

            <div className="space-y-4">
              {trainingModes.modes.map((mode, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {mode.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {mode.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot Grid */}
          <div className="grid grid-cols-2 gap-4">
            {gridImages.slice(0, 4).map((imageKey, index) => {
              const screenshot = getScreenshot(imageKey);
              return (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={200}
                    height={400}
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
