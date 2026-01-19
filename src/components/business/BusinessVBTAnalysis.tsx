
import Image from "next/image";
import {
  Activity,
  Target,
  Gauge,
  AlertTriangle,
  TrendingUp,
  Zap,
  LucideIcon,
} from "lucide-react";
import { businessContent, images, getScreenshot } from "@/data";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Target,
  Gauge,
  AlertTriangle,
};

export default function BusinessVBTAnalysis() {
  const { vbtAnalysis } = businessContent;
  const sectionImages = images.sections.vbtAnalysis;
  const mainScreenshot = getScreenshot(sectionImages.main);

  return (
    <section id="vbt" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Screenshot with chart */}
          <div className="relative order-2 lg:order-1 flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={mainScreenshot.src}
                alt={mainScreenshot.alt}
                width={300}
                height={600}
                className="w-[240px] sm:w-[280px] lg:w-[300px]"
              />
            </div>

            {/* Floating cards */}
            <div className="absolute -right-2 sm:-right-4 top-1/4 bg-gray-800 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-xl z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/10 rounded-md sm:rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-gray-500">
                    {vbtAnalysis.floatingCards.speed.label}
                  </div>
                  <div className="font-bold text-white text-sm sm:text-base">
                    {vbtAnalysis.floatingCards.speed.value}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-2 sm:-left-4 bottom-1/3 bg-gray-800 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-xl z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/10 rounded-md sm:rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-gray-500">
                    {vbtAnalysis.floatingCards.power.label}
                  </div>
                  <div className="font-bold text-white text-sm sm:text-base">
                    {vbtAnalysis.floatingCards.power.value}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-secondary/20 text-secondary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {vbtAnalysis.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              {vbtAnalysis.title.line1}
              <br />
              <span className="text-secondary">{vbtAnalysis.title.line2}</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6">
              {vbtAnalysis.subtitle}
            </p>

            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
              {vbtAnalysis.description}
            </p>

            <div className="space-y-3 sm:space-y-4">
              {vbtAnalysis.features.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={index} className="flex gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm sm:text-base mb-0.5 sm:mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm">
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
