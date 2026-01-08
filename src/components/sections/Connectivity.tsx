import Image from "next/image";
import { Wifi } from "lucide-react";
import { content, images } from "@/data";

export default function Connectivity() {
  const { connectivity } = content;

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-secondary/20 text-gray-900 dark:text-secondary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {connectivity.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {connectivity.title.line1}
              <br />
              <span className="text-secondary">{connectivity.title.line2}</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              {connectivity.subtitle}
            </p>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 mb-6 sm:mb-8">
              {connectivity.description}
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {connectivity.status}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src={images.device}
              alt="Roomfit 기기"
              width={400}
              height={400}
              className="w-[280px] sm:w-[340px] lg:w-[400px] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
