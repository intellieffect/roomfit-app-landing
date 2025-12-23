import { Activity, Mic, BarChart3, Dumbbell, LucideIcon } from "lucide-react";
import { content } from "@/data";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Mic,
  BarChart3,
  Dumbbell,
};

export default function Features() {
  const { features } = content;

  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="gradient-text">{features.title}</span>
            {features.titleSuffix}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {features.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    feature.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/20 text-gray-900 dark:text-secondary"
                  }`}
                >
                  {Icon && <Icon className="w-7 h-7" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
