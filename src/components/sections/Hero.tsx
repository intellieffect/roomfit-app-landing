"use client";

import Link from "next/link";
import { ChevronDown, Download, Zap, Building2 } from "lucide-react";
import { content } from "@/data";
import { PhoneMockup } from "@/components/demos";

export default function Hero() {
  const { hero } = content;

  return (
    <section className="relative h-[60vh] max-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-secondary/20 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
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

            <p className="text-gray-500 mb-8">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Mockup with Demo Animations */}
          <div className="relative flex justify-center items-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <PhoneMockup />
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
