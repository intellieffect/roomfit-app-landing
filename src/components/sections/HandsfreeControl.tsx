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
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Screenshot */}
          <div className="relative flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
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
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Mic className="w-4 h-4" />
              {handsfreeControl.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {handsfreeControl.title.line1}
              <br />
              <span className="text-secondary">{handsfreeControl.title.line2}</span>
            </h2>

            <p className="text-xl text-gray-300 mb-6">
              {handsfreeControl.subtitle}
            </p>

            <p className="text-gray-400 mb-8">
              {handsfreeControl.description}
            </p>

            {/* Voice Commands */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-400 mb-3">음성 명령</h3>
              <div className="flex flex-wrap gap-3">
                {handsfreeControl.commands.map((command, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-sm"
                  >
                    {command}
                  </div>
                ))}
              </div>
            </div>

            {/* Gesture Controls */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3">제스처 조작</h3>
              <div className="space-y-3">
                {handsfreeControl.gestures.map((gesture, index) => {
                  const IconComponent = iconMap[gesture.icon] || Zap;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-white/5 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{gesture.title}</h4>
                        <p className="text-gray-400 text-xs">{gesture.description}</p>
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
