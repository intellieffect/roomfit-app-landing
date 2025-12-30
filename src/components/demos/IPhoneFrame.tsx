"use client";

import { ReactNode } from "react";

interface IPhoneFrameProps {
  children: ReactNode;
  className?: string;
  align?: "center" | "start";
}

export function IPhoneFrame({ children, className = "", align = "center" }: IPhoneFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone 17 Pro Frame */}
      <div className="relative w-[320px] h-[650px] bg-white rounded-[50px] p-3 shadow-2xl border border-gray-200">
        {/* Inner bezel */}
        <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-20" />

          {/* Status bar */}
          <div className="absolute top-4 left-6 right-6 flex justify-between text-[10px] text-gray-500 z-10">
            <span>9:41</span>
            <div className="flex gap-1">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* Screen Content */}
          <div className={`relative w-full h-full pt-12 px-4 pb-8 overflow-hidden flex flex-col ${
            align === "center" ? "items-center justify-center" : "items-stretch justify-start"
          }`}>
            {children}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
