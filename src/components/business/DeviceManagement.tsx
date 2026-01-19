
import { Smartphone, CheckCircle2 } from "lucide-react";
import { businessContent } from "@/data";

export default function DeviceManagement() {
  const { deviceManagement } = businessContent;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {deviceManagement.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              {deviceManagement.title.line1}
              <br />
              <span className="gradient-text">{deviceManagement.title.line2}</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6">
              {deviceManagement.subtitle}
            </p>

            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
              {deviceManagement.description}
            </p>

            <div className="space-y-2 sm:space-y-3">
              {deviceManagement.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-800 rounded-lg sm:rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <div className="w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
                    <Smartphone className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-primary" />
                  </div>
                </div>
              </div>

              {/* Floating indicators */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gray-800 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full shadow-lg">
                <span className="text-xs sm:text-sm font-medium text-green-500">연결됨</span>
              </div>
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-gray-800 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full shadow-lg">
                <span className="text-xs sm:text-sm font-medium text-primary">배터리 85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
