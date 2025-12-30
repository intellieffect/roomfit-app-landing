"use client";

import { motion } from "framer-motion";
import { CheckmarkDraw } from "../../animations/CheckmarkDraw";
import type { SceneProps } from "./types";

export function ROMCompleteScene({ isActive }: SceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full flex items-center justify-center"
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.2 }}
        className="bg-gray-50 rounded-2xl p-6 w-full max-w-[260px] text-center"
      >
        {/* Checkmark */}
        <motion.div
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
        >
          <CheckmarkDraw
            size={32}
            strokeWidth={3}
            color="#22c55e"
            delay={0.5}
            duration={0.4}
            isInView={isActive}
          />
        </motion.div>

        <motion.h3
          className="font-bold text-lg text-gray-900 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          가동범위 측정 완료
        </motion.h3>

        <motion.div
          className="grid grid-cols-2 gap-3 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-red-50 rounded-xl p-3">
            <div className="text-[10px] text-red-500 font-medium">왼쪽</div>
            <div className="text-xl font-bold text-red-600">85.5<span className="text-xs">cm</span></div>
          </div>
          <div className="bg-blue-50 rounded-xl p-3">
            <div className="text-[10px] text-blue-500 font-medium">오른쪽</div>
            <div className="text-xl font-bold text-blue-600">87.2<span className="text-xs">cm</span></div>
          </div>
        </motion.div>

        <motion.p
          className="text-xs text-gray-500 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          좌우 차이 1.7cm (2.0%)
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
