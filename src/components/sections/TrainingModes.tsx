import Image from "next/image";
import { Dumbbell } from "lucide-react";
import { content, images, getScreenshot } from "@/data";

export default function TrainingModes() {
  const { trainingModes } = content;
  const gridKeys = images.sections.trainingModes.grid;

  return (
    <section id="modes" className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-secondary/20 text-gray-900 dark:text-secondary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Dumbbell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {trainingModes.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {trainingModes.title.line1}
              <br />
              <span className="text-secondary">{trainingModes.title.line2}</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              {trainingModes.subtitle}
            </p>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 mb-6 sm:mb-8">
              {trainingModes.description}
            </p>

            <div className="space-y-3 sm:space-y-4">
              {trainingModes.modes.map((item, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl"
                >
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {gridKeys.slice(0, 2).map((key, index) => {
                const screenshot = getScreenshot(key);
                return (
                  <div
                    key={index}
                    className="bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={300}
                      height={600}
                      className="w-full"
                    />
                  </div>
                );
              })}
            </div>
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 pt-6 sm:pt-8">
              {gridKeys.slice(2, 4).map((key, index) => {
                const screenshot = getScreenshot(key);
                return (
                  <div
                    key={index}
                    className="bg-gray-200 dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={300}
                      height={600}
                      className="w-full"
                    />
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
