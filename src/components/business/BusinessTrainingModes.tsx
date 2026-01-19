
import Image from "next/image";
import { Dumbbell } from "lucide-react";
import { businessContent, images, getScreenshot } from "@/data";

export default function BusinessTrainingModes() {
  const { trainingModes } = businessContent;
  const gridImages = images.sections.trainingModes.grid;

  return (
    <section className="py-16 sm:py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-secondary/20 text-secondary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Dumbbell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {trainingModes.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              {trainingModes.title.line1}
              <br />
              <span className="text-secondary">{trainingModes.title.line2}</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6">
              {trainingModes.subtitle}
            </p>

            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
              {trainingModes.description}
            </p>

            <div className="space-y-3 sm:space-y-4">
              {trainingModes.modes.map((mode, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-gray-800 rounded-lg sm:rounded-xl border border-gray-700"
                >
                  <h4 className="font-semibold text-white text-sm sm:text-base mb-0.5 sm:mb-1">
                    {mode.title}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {mode.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {gridImages.slice(0, 4).map((imageKey, index) => {
              const screenshot = getScreenshot(imageKey);
              return (
                <div
                  key={index}
                  className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
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
