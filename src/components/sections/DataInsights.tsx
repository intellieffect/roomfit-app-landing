import Image from "next/image";
import { Activity, BarChart3, Smartphone } from "lucide-react";

const insights = [
  {
    icon: Activity,
    title: "활동 히트맵",
    description:
      "6개월간의 운동 강도와 빈도를 색상으로 시각화하여 동기를 부여합니다",
  },
  {
    icon: BarChart3,
    title: "상세 분석 리포트",
    description:
      "세트별 휴식 시간부터 렙당 속도까지, 전문적인 데이터를 CSV로 내보내거나 그래프로 확인하세요",
  },
  {
    icon: Smartphone,
    title: "소셜 공유",
    description:
      "오늘 달성한 운동 기록과 스트릭(Streak)을 멋진 브랜딩 이미지로 생성해 SNS에 공유할 수 있습니다",
  },
];

export default function DataInsights() {
  return (
    <section id="data" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            데이터 기록 & 인사이트
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            쌓이는 기록,{" "}
            <span className="gradient-text">성장하는 나</span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            운동한 날이 색으로 채워지는 캘린더로 꾸준함을 확인하세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((item, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Last set screenshot */}
        <div className="mt-16 flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-4 max-w-sm">
            <Image
              src="/images/screenshots/last-set.PNG"
              alt="세트 완료 화면"
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
