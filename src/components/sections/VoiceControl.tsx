import Image from "next/image";
import { Mic } from "lucide-react";

const voiceCommands = ['"웨이트 온"', '"웨이트 오프"', '"플러스 5kg"', '"마이너스 10kg"'];

export default function VoiceControl() {
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
              {voiceCommands.map((command, index) => (
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
