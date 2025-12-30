"use client";

import { AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  WorkoutScene,
  VBTAnalysisScene,
  ROMCompleteScene,
  ActivityScene,
} from "./scenes";

// Scene configuration
const SCENES = [
  {
    id: "workout",
    title: "운동 분석",
    subtitle: "실시간 모니터링",
    duration: 5000,
    Component: WorkoutScene,
  },
  {
    id: "vbt",
    title: "VBT 분석",
    subtitle: "Velocity Based Training",
    duration: 4000,
    Component: VBTAnalysisScene,
  },
  {
    id: "rom",
    title: "가동범위",
    subtitle: "Range of Motion",
    duration: 3500,
    Component: ROMCompleteScene,
  },
  {
    id: "activity",
    title: "운동 기록",
    subtitle: "Activity History",
    duration: 4000,
    Component: ActivityScene,
  },
] as const;

type SceneId = (typeof SCENES)[number]["id"];

export function PhoneMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentScene = SCENES[currentSceneIndex];

  // Scene transition logic
  const goToNextScene = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSceneIndex((prev) => (prev + 1) % SCENES.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      goToNextScene();
    }, currentScene.duration);

    return () => clearTimeout(timer);
  }, [isInView, currentSceneIndex, currentScene.duration, goToNextScene]);

  return (
    <div ref={ref} className="relative">
      {/* iPhone 17 Pro Frame */}
      <div className="relative w-[320px] h-[650px] bg-white rounded-[50px] p-3 shadow-2xl border border-gray-200">
        {/* Inner bezel */}
        <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-20" />

          {/* Screen Content */}
          <div className="relative w-full h-full pt-12 px-4 pb-8 flex flex-col">
            {/* Status bar */}
            <div className="absolute top-4 left-6 right-6 flex justify-between text-[10px] text-gray-500 z-10">
              <span>9:41</span>
              <div className="flex gap-1">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* App Header */}
            <div className="mb-4 flex-shrink-0">
              <h3 className="text-lg font-bold text-gray-900">{currentScene.title}</h3>
              <p className="text-xs text-gray-500">{currentScene.subtitle}</p>
            </div>

            {/* Scene Content */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {!isTransitioning && (
                  <currentScene.Component
                    key={currentScene.id}
                    isActive={isInView && !isTransitioning}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Scene Indicators */}
            <div className="flex justify-center gap-2 mt-4 flex-shrink-0">
              {SCENES.map((scene, index) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentSceneIndex(index);
                      setIsTransitioning(false);
                    }, 300);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSceneIndex
                      ? "bg-primary w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to ${scene.title}`}
                />
              ))}
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-1 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/4 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -z-10 bottom-1/4 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
    </div>
  );
}
