import Image from "next/image";
import { Wifi } from "lucide-react";

export default function Connectivity() {
  return (
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
  );
}
