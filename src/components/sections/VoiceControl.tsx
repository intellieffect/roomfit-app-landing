import Image from "next/image";
import { Mic } from "lucide-react";
import { content, images, getScreenshot } from "@/data";

export default function VoiceControl() {
  const { voiceControl } = content;
  const sectionImages = images.sections.voiceControl;
  const mainScreenshot = getScreenshot(sectionImages.main);

  return (
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
                src={mainScreenshot.src}
                alt={mainScreenshot.alt}
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
              {voiceControl.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {voiceControl.title.line1}
              <br />
              <span className="text-secondary">{voiceControl.title.line2}</span>
            </h2>

            <p className="text-xl text-gray-300 mb-6">
              {voiceControl.subtitle}
            </p>

            <p className="text-gray-400 mb-8">
              {voiceControl.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {voiceControl.commands.map((command, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm"
                >
                  {command}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
