import { Activity, Mic, BarChart3, Dumbbell } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "실시간 VBT 분석",
    description: "속도와 파워를 실시간으로 측정하고 시각화합니다",
    color: "primary" as const,
  },
  {
    icon: Dumbbell,
    title: "스마트 모드",
    description: "Constant, Negative, Band 등 다양한 저항 모드를 지원합니다",
    color: "secondary" as const,
  },
  {
    icon: Mic,
    title: "음성 제어",
    description: '"웨이트 온" 한 마디로 손을 놓지 않고 무게를 조절합니다',
    color: "primary" as const,
  },
  {
    icon: BarChart3,
    title: "데이터 인사이트",
    description: "모든 세션을 자동 기록하고 성장 추이를 분석합니다",
    color: "secondary" as const,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="gradient-text">룸핏</span>을 더 스마트하게
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            최첨단 기술로 당신의 트레이닝을 한 차원 높여드립니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
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
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
