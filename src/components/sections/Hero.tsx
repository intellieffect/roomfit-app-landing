import Image from "next/image";
import { ChevronDown, Download, Zap } from "lucide-react";

export default function Hero() {
  const stats = [
    { value: "0.01초", label: "실시간 측정" },
    { value: "3가지", label: "웨이트 모드" },
    { value: "무제한", label: "데이터 기록" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              AI 기반 스마트 트레이닝
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              데이터로 완성하는
              <br />
              <span className="gradient-text">나만의 AI</span>
              <br />
              퍼스널 트레이너
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-4">
              실시간 VBT(속도 기반 트레이닝) 분석부터 음성 제어까지.
              <br className="hidden sm:block" />
              Roomfit 앱으로 당신의 모든 움직임을 스마트하게 관리하세요.
            </p>

            <p className="text-gray-500 dark:text-gray-500 mb-8">
              더 이상 감에 의존하지 마세요. Roomfit은 운동 속도, 파워,
              가동범위를 정밀하게 분석하여 당신이 수행하는 모든 렙(Rep)의
              품질을 증명하고 기록합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 transition-all hover:scale-105 shadow-lg shadow-primary/30"
              >
                <Download className="w-5 h-5" />
                앱 다운로드
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                기능 살펴보기
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              {/* Main screenshot */}
              <div className="rounded-3xl overflow-hidden shadow-2xl animate-float">
                <Image
                  src="/images/screenshots/workout-progress.PNG"
                  alt="Roomfit 앱 화면"
                  width={280}
                  height={560}
                  className="w-[280px]"
                />
              </div>

              {/* Secondary screenshot */}
              <div
                className="absolute -right-16 top-16 rounded-3xl overflow-hidden shadow-2xl scale-75 opacity-90"
                style={{ animationDelay: "1s" }}
              >
                <Image
                  src="/images/screenshots/drop-chart.PNG"
                  alt="Roomfit 차트 화면"
                  width={280}
                  height={560}
                  className="w-[280px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </div>
    </section>
  );
}
