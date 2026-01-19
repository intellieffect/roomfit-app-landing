import Link from "next/link";
import Image from "next/image";
import { Download, Zap, Building2 } from "lucide-react";
import { content, images, getScreenshot } from "@/data";

export default function Hero() {
  const { hero } = content;

  return (
    <section className="relative min-h-[90vh] lg:min-h-[80vh] flex items-center justify-center overflow-x-hidden pt-24 lg:pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-secondary/20 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-up flex flex-col">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 self-center lg:self-start">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {hero.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {hero.title.line1}
              <br />
              <span className="gradient-text">{hero.title.line2}</span>
              <br />
              {hero.title.line3}
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-4">
              {hero.subtitle}
            </p>

            <p className="text-gray-500 mb-8 lg:mb-8">
              {hero.description}
            </p>

            {/* Stats - 모바일에서 CTA보다 먼저 표시 */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-800 order-1 lg:order-2 lg:mt-12">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA - 모바일에서 Stats 아래로 이동 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start order-2 lg:order-1 mt-6 lg:mt-0">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:bg-primary-600 transition-all hover:scale-105 shadow-lg shadow-primary/30"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                {hero.cta.primary}
              </a>
              <Link
                href="/business"
                className="inline-flex items-center justify-center gap-2 bg-gray-800 text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:bg-gray-700 transition-all"
              >
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                {hero.cta.secondary}
              </Link>
            </div>
          </div>

          {/* Phone Mockup with Static Screenshot */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-[280px] sm:w-[320px]">
              {/* iPhone Frame */}
              <div className="relative bg-white rounded-[40px] sm:rounded-[50px] p-2.5 sm:p-3 shadow-2xl border border-gray-200">
                <div className="relative w-full rounded-[32px] sm:rounded-[40px] overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[24px] sm:h-[30px] bg-black rounded-full z-20" />
                  <Image
                    src={getScreenshot(images.sections.hero.main).src}
                    alt="Roomfit 앱 화면"
                    width={320}
                    height={650}
                    className="w-full"
                    priority
                  />
                </div>
              </div>
              {/* Decorative blur */}
              <div className="absolute -z-10 top-1/4 -right-16 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-1/4 -left-16 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
