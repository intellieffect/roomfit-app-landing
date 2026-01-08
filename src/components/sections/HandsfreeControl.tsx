"use client";

import Image from "next/image";
import { Mic, ShieldAlert, Pause, Zap } from "lucide-react";
import { content, images, getScreenshot } from "@/data";

const iconMap: { [key: string]: React.ElementType } = {
  ShieldAlert,
  Pause,
  Zap,
};

export default function HandsfreeControl() {
  const { handsfreeControl } = content;
  const sectionImages = images.sections.voiceControl;
  const mainScreenshot = getScreenshot(sectionImages.main);

  return (
    <section className="py-16 sm:py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-primary/30 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Screenshot */}
          <div className="relative flex justify-center">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={mainScreenshot.src}
                alt={mainScreenshot.alt}
                width={300}
                height={600}
                className="w-[260px] sm:w-[300px]"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {handsfreeControl.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {handsfreeControl.title.line1}
              <br />
              <span className="text-secondary">{handsfreeControl.title.line2}</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6">
              {handsfreeControl.subtitle}
            </p>

            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
              {handsfreeControl.description}
            </p>

            {/* Voice Commands */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">음성 명령</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {handsfreeControl.commands.map((command, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/20 border border-primary/30 rounded-full text-xs sm:text-sm"
                  >
                    {command}
                  </div>
                ))}
              </div>
            </div>

            {/* Gesture Controls */}
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 sm:mb-3">제스처 조작</h3>
              <div className="space-y-2 sm:space-y-3">
                {handsfreeControl.gestures.map((gesture, index) => {
                  const IconComponent = iconMap[gesture.icon] || Zap;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-white/5 rounded-lg sm:rounded-xl"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-secondary/20 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm">{gesture.title}</h4>
                        <p className="text-gray-400 text-[10px] sm:text-xs">{gesture.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
