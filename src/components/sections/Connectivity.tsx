import Image from "next/image";
import { Wifi } from "lucide-react";
import { content, images } from "@/data";

export default function Connectivity() {
  const { connectivity } = content;

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-gray-900 dark:text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Wifi className="w-4 h-4" />
              {connectivity.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {connectivity.title.line1}
              <br />
              <span className="text-secondary">{connectivity.title.line2}</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {connectivity.subtitle}
            </p>

            <p className="text-gray-500 dark:text-gray-500 mb-8">
              {connectivity.description}
            </p>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600 dark:text-gray-400">
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
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
