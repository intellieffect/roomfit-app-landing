import Image from "next/image";
import { Dumbbell } from "lucide-react";

const modes = [
  {
    title: "3가지 웨이트 모드",
    description:
      "일정한 자극의 Constant, 이완 시 저항을 높이는 Negative, 밴드 탄성을 구현한 Band 모드를 지원합니다",
  },
  {
    title: "자동 드랍세트",
    description:
      "핀을 꽂을 필요 없이, 설정한 무게나 비율(%)에 따라 자동으로 무게가 줄어드는 드랍세트를 경험하세요",
  },
  {
    title: "운동 라이브러리",
    description:
      "부위별, 운동별 필터를 통해 원하는 운동을 빠르게 찾고 이전 설정을 즉시 불러옵니다",
  },
];

const screenshots = [
  { src: "/images/screenshots/weight-type-setting.PNG", alt: "웨이트 모드 설정" },
  { src: "/images/screenshots/workout-setup.PNG", alt: "운동 설정" },
  { src: "/images/screenshots/drop-setting.PNG", alt: "드랍세트 설정" },
  { src: "/images/screenshots/remote-workout.PNG", alt: "리모컨 모드" },
];

export default function TrainingModes() {
  return (
    <section id="modes" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-gray-900 dark:text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Dumbbell className="w-4 h-4" />
              스마트 트레이닝 모드
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              터치 한 번으로 바뀌는
              <br />
              <span className="text-secondary">운동의 차원</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              무게 조절부터 드랍세트까지, 복잡한 세팅을 자동화했습니다.
            </p>

            <p className="text-gray-500 dark:text-gray-500 mb-8">
              웨이트 트레이닝의 다양한 기법을 손쉽게 적용하세요. 일반적인 무게
              운동뿐만 아니라, Roomfit만의 특화된 모드를 지원합니다.
            </p>

            <div className="space-y-4">
              {modes.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {screenshots.slice(0, 2).map((screenshot, index) => (
                <div
                  key={index}
                  className="bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden"
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={300}
                    height={600}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-8">
              {screenshots.slice(2, 4).map((screenshot, index) => (
                <div
                  key={index}
                  className="bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden"
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={300}
                    height={600}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
