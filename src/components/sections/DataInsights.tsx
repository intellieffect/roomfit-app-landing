import Image from "next/image";
import { Activity, BarChart3, Smartphone, LucideIcon } from "lucide-react";
import { content, images, getScreenshot } from "@/data";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  BarChart3,
  Smartphone,
};

export default function DataInsights() {
  const { dataInsights } = content;
  const sectionImages = images.sections.dataInsights;
  const mainScreenshot = getScreenshot(sectionImages.main);

  return (
    <section id="data" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            {dataInsights.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {dataInsights.title.line1}{" "}
            <span className="gradient-text">{dataInsights.title.line2}</span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {dataInsights.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dataInsights.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={index}
                className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {Icon && <Icon className="w-8 h-8 text-primary" />}
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

        {/* Last set screenshot */}
        <div className="mt-16 flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-4 max-w-sm">
            <Image
              src={mainScreenshot.src}
              alt={mainScreenshot.alt}
              width={350}
              height={700}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
