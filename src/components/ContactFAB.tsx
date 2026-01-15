"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Channel: {
        chat: (options: { channelPublicId: string }) => void;
      };
    };
  }
}

export default function ContactFAB() {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    // 이미 로드되어 있으면 스킵
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("023670d4f258fae12b34694b2eaa8153");
      }
      setSdkReady(true);
      return;
    }

    // SDK 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.async = true;

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init("023670d4f258fae12b34694b2eaa8153");
      }
      setSdkReady(true);
    };

    document.head.appendChild(script);

    return () => {
      // cleanup 시 스크립트 제거하지 않음 (다른 컴포넌트에서 사용할 수 있음)
    };
  }, []);

  const handleKakaoChat = () => {
    if (!sdkReady || !window.Kakao) {
      alert("잠시 후 다시 시도해주세요.");
      return;
    }

    window.Kakao.Channel.chat({
      channelPublicId: "_xfkxeJG",
    });
  };

  return (
    <button
      onClick={handleKakaoChat}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span>문의</span>
    </button>
  );
}
