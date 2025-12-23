"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Activity,
  Mic,
  BarChart3,
  Wifi,
  Dumbbell,
  ChevronDown,
  Zap,
  Target,
  TrendingUp,
  Smartphone,
  Download,
  Menu,
  X,
} from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0f]">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/images/app_icon.png"
                alt="Roomfit Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Roomfit
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                기능
              </a>
              <a
                href="#vbt"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                VBT 분석
              </a>
              <a
                href="#modes"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                트레이닝 모드
              </a>
              <a
                href="#data"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                데이터
              </a>
              <a
                href="#download"
                className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors"
              >
                다운로드
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0a0a0f] border-t border-gray-100 dark:border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block text-gray-600 dark:text-gray-300 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                기능
              </a>
              <a
                href="#vbt"
                className="block text-gray-600 dark:text-gray-300 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                VBT 분석
              </a>
              <a
                href="#modes"
                className="block text-gray-600 dark:text-gray-300 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                트레이닝 모드
              </a>
              <a
                href="#data"
                className="block text-gray-600 dark:text-gray-300 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                데이터
              </a>
              <a
                href="#download"
                className="block bg-primary text-white px-5 py-3 rounded-full font-medium text-center hover:bg-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                다운로드
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
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
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    0.01초
                  </div>
                  <div className="text-sm text-gray-500">실시간 측정</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    3가지
                  </div>
                  <div className="text-sm text-gray-500">웨이트 모드</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    무제한
                  </div>
                  <div className="text-sm text-gray-500">데이터 기록</div>
                </div>
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

      {/* Features Overview */}
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
            {[
              {
                icon: Activity,
                title: "실시간 VBT 분석",
                description: "속도와 파워를 실시간으로 측정하고 시각화합니다",
                color: "primary",
              },
              {
                icon: Dumbbell,
                title: "스마트 모드",
                description:
                  "Constant, Negative, Band 등 다양한 저항 모드를 지원합니다",
                color: "secondary",
              },
              {
                icon: Mic,
                title: "음성 제어",
                description:
                  '"웨이트 온" 한 마디로 손을 놓지 않고 무게를 조절합니다',
                color: "primary",
              },
              {
                icon: BarChart3,
                title: "데이터 인사이트",
                description:
                  "모든 세션을 자동 기록하고 성장 추이를 분석합니다",
                color: "secondary",
              },
            ].map((feature, index) => (
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

      {/* VBT Analysis Section */}
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
                {[
                  {
                    icon: Target,
                    title: "자동 렙 카운팅",
                    description:
                      "가동범위 기반으로 정확한 횟수와 터닝 포인트를 감지합니다",
                  },
                  {
                    icon: Activity,
                    title: "동작 품질 평가",
                    description:
                      "구심성/편심성 구간을 분석하여 흐트러짐 없는 자세를 유도합니다",
                  },
                  {
                    icon: TrendingUp,
                    title: "피로도 감지",
                    description:
                      "속도 저하를 감지하여 부상 없이 최적의 한계까지 밀어붙일 수 있게 돕습니다",
                  },
                ].map((item, index) => (
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

      {/* Training Modes Section */}
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
                {[
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
                ].map((item, index) => (
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
                <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/screenshots/weight-type-setting.PNG"
                    alt="웨이트 모드 설정"
                    width={300}
                    height={600}
                    className="w-full"
                  />
                </div>
                <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/screenshots/workout-setup.PNG"
                    alt="운동 설정"
                    width={300}
                    height={600}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/screenshots/drop-setting.PNG"
                    alt="드랍세트 설정"
                    width={300}
                    height={600}
                    className="w-full"
                  />
                </div>
                <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/screenshots/remote-workout.PNG"
                    alt="리모컨 모드"
                    width={300}
                    height={600}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Control Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Screenshot */}
            <div className="relative flex justify-center">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/screenshots/voice-weight-on.PNG"
                  alt="음성 인식 화면"
                  width={300}
                  height={600}
                  className="w-[300px]"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Mic className="w-4 h-4" />
                핸즈프리 음성 제어
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                흐름을 깨지 않는
                <br />
                <span className="text-secondary">보이스 컨트롤</span>
              </h2>

              <p className="text-xl text-gray-300 mb-6">
                "웨이트 온" 한 마디면 충분합니다.
              </p>

              <p className="text-gray-400 mb-8">
                운동 중 스마트폰을 터치하느라 집중력을 잃지 마세요. 양손이
                자유로워야 하는 고중량 운동 중에도 음성 명령만으로 무게를 켜고
                끌 수 있습니다. 당신은 오직 근육의 움직임에만 집중하세요.
              </p>

              <div className="flex flex-wrap gap-3">
                {['"웨이트 온"', '"웨이트 오프"', '"플러스 5kg"', '"마이너스 10kg"'].map(
                  (command, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-white/10 rounded-full text-sm"
                    >
                      {command}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data & Insights Section */}
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
            {[
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
            ].map((item, index) => (
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

      {/* Connectivity Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-gray-900 dark:text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Wifi className="w-4 h-4" />
                연결성 & 지속적인 업데이트
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                끊김 없는 연결,
                <br />
                <span className="text-secondary">진화하는 기능</span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                켜는 순간 연결되고, 쓸수록 똑똑해집니다.
              </p>

              <p className="text-gray-500 dark:text-gray-500 mb-8">
                앱을 켜는 순간 주변의 Roomfit 기기를 자동으로 찾아 연결합니다.
                또한, 지속적인 OTA 펌웨어 업데이트를 통해 앱뿐만 아니라
                하드웨어의 성능과 기능도 계속해서 업그레이드됩니다.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gray-600 dark:text-gray-400">
                  Bluetooth 자동 연결
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/images/RoomfitDevice.png"
                alt="Roomfit 기기"
                width={400}
                height={400}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section
        id="download"
        className="py-24 bg-gradient-to-br from-primary to-primary-700 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            지금 바로 시작하세요
          </h2>

          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Roomfit과 함께 데이터 기반의 스마트한 트레이닝을 경험해보세요.
            당신의 모든 움직임이 기록되고 분석됩니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition-all hover:scale-105"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition-all hover:scale-105"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">GET IT ON</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/app_icon.png"
                alt="Roomfit Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-bold text-xl">Roomfit</span>
            </div>

            <div className="flex items-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                이용약관
              </a>
              <a href="#" className="hover:text-white transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="hover:text-white transition-colors">
                고객센터
              </a>
            </div>

            <div className="text-gray-500 text-sm">
              &copy; 2024 Roomfit. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
