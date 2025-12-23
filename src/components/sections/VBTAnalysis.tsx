import Image from "next/image";
import { Activity, Target, TrendingUp, Zap } from "lucide-react";

const analysisFeatures = [
  {
    icon: Target,
    title: "자동 렙 카운팅",
    description: "가동범위 기반으로 정확한 횟수와 터닝 포인트를 감지합니다",
  },
  {
    icon: Activity,
    title: "동작 품질 평가",
    description: "구심성/편심성 구간을 분석하여 흐트러짐 없는 자세를 유도합니다",
  },
  {
    icon: TrendingUp,
    title: "피로도 감지",
    description: "속도 저하를 감지하여 부상 없이 최적의 한계까지 밀어붙일 수 있게 돕습니다",
  },
];

export default function VBTAnalysis() {
  return (
    <section id="vbt" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Screenshot with chart */}
          <div className="relative order-2 lg:order-1 flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/screenshots/workout-progress.PNG"
                alt="VBT 분석 화면"
                width={300}
                height={600}
                className="w-[300px]"
              />
            </div>

            {/* Floating cards */}
            <div className="absolute -right-4 top-1/4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">속도</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    0.85 m/s
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-1/3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">파워</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    523.4 W
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              AI 기반 VBT & 동작 분석
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              보이는 운동,
              <br />
              <span className="gradient-text">증명되는 퍼포먼스</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              실시간 속도와 파워 측정으로 운동의 질을 높이세요.
            </p>

            <p className="text-gray-500 dark:text-gray-500 mb-8">
              단순히 횟수만 세는 것이 아닙니다. Roomfit의 AI는 당신의 움직임을
              실시간으로 추적하여 속도(m/s)와 파워(W)를 시각화합니다.
            </p>

            <div className="space-y-4">
              {analysisFeatures.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
