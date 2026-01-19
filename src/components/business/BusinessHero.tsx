import Image from "next/image";
import { ChevronDown, Mail, Building2 } from "lucide-react";
import { businessContent, images, getScreenshot } from "@/data";

export default function BusinessHero() {
  const { hero } = businessContent;
  const heroImages = images.sections.hero;
  const mainScreenshot = getScreenshot(heroImages.main);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-secondary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-secondary/20 text-secondary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {hero.badge}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              {hero.title.line1}
              <br />
              <span className="text-secondary">{hero.title.line2}</span>
              <br />
              {hero.title.line3}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-3 sm:mb-4">
              {hero.subtitle}
            </p>

            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">{hero.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-secondary-400 transition-all hover:scale-105 shadow-lg shadow-secondary/30"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                {hero.cta.primary}
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                {hero.cta.secondary}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl animate-float">
                <Image
                  src={mainScreenshot.src}
                  alt={mainScreenshot.alt}
                  width={280}
                  height={560}
                  className="w-[220px] sm:w-[280px]"
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
