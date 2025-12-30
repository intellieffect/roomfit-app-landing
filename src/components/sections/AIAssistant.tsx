"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Bot, Sparkles, Send } from "lucide-react";
import { TypewriterText } from "@/components/animations";
import { IPhoneFrame } from "@/components/demos";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  delay: number;
}

const chatScript: Message[] = [
  { id: 1, type: "user", content: "오늘 스쿼트 세트 분석해줘", delay: 0 },
  {
    id: 2,
    type: "ai",
    content: "3세트 분석 결과를 알려드릴게요.",
    delay: 1200,
  },
  {
    id: 3,
    type: "ai",
    content:
      "⚠️ Velocity Loss가 62%에 도달했어요. 근비대 목표(20-30%)를 초과했으니 세트를 종료하세요.",
    delay: 2800,
  },
  {
    id: 4,
    type: "ai",
    content: "📊 좌우 불균형 12% 감지. 덤벨 운동으로 왼쪽을 보강하세요.",
    delay: 5000,
  },
  { id: 5, type: "user", content: "다음 세트 중량은?", delay: 7000 },
  {
    id: 6,
    type: "ai",
    content: "💪 RIR 2 기준, 다음 세트에서 2.5kg 증량을 권장합니다!",
    delay: 8200,
  },
];

function ChatMessage({
  message,
  isVisible,
}: {
  message: Message;
  isVisible: boolean;
}) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleTypingComplete = useCallback(() => {
    // Typing complete
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
          message.type === "user"
            ? "bg-primary text-white rounded-br-sm"
            : "bg-gray-100 text-gray-900 rounded-bl-sm"
        }`}
      >
        {message.type === "ai" && showContent ? (
          <TypewriterText
            text={message.content}
            speed={25}
            onComplete={handleTypingComplete}
          />
        ) : (
          message.content
        )}
      </div>
    </motion.div>
  );
}

export default function AIAssistant() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    if (!isInView) return;

    chatScript.forEach((msg) => {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg.id]);
      }, msg.delay);

      return () => clearTimeout(timer);
    });
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4" />
            AI 코칭
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            당신만을 위한{" "}
            <span className="gradient-text">AI 트레이닝 파트너</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            운동 데이터를 분석하고 맞춤형 목표와 피드백을 제공합니다
          </motion.p>
        </div>

        {/* Chat Interface Demo in iPhone Frame */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <IPhoneFrame align="start">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100 w-full">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">
                  ROOMFIT AI
                </div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  온라인
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-3 flex-1 overflow-y-auto w-full">
              <AnimatePresence>
                {chatScript
                  .filter((msg) => visibleMessages.includes(msg.id))
                  .map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      isVisible={visibleMessages.includes(msg.id)}
                    />
                  ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="mt-auto pt-3 border-t border-gray-100 w-full">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                <input
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 bg-transparent outline-none text-gray-900 text-xs placeholder:text-gray-400"
                  disabled
                />
                <button className="w-7 h-7 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </IPhoneFrame>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-center p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              맞춤형 목표 설정
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              과거 데이터를 분석해 현실적인 목표를 제안합니다
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              진행 상황 분석
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              매 세션 후 발전 상황을 알기 쉽게 설명합니다
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl mb-3">💪</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              동기부여 코칭
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              꾸준한 운동을 위한 격려와 피드백을 제공합니다
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
