"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { AnimatedCounter } from "../animations/AnimatedCounter";
import { CheckmarkDraw } from "../animations/CheckmarkDraw";

export function ROMCompleteDialog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowDialog(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center min-h-[280px]"
    >
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gray-800 rounded-2xl p-6 shadow-2xl max-w-sm w-full"
          >
            <div className="flex justify-center mb-4">
              <motion.div
                className="w-14 h-14 bg-green-900/30 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
              >
                <CheckmarkDraw
                  size={28}
                  strokeWidth={3}
                  color="#22c55e"
                  delay={0.3}
                  duration={0.4}
                  isInView={showDialog}
                />
              </motion.div>
            </div>

            <motion.h3
              className="text-center font-bold text-lg text-white mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              가동범위 측정 완료
            </motion.h3>

            <div className="grid grid-cols-2 gap-3">
              <motion.div
                className="bg-blue-900/20 p-4 rounded-xl text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <span className="text-xs text-blue-400 font-medium">
                  왼쪽
                </span>
                <div className="text-2xl font-bold text-blue-400 mt-1">
                  <AnimatedCounter
                    to={85.5}
                    duration={1}
                    delay={0.5}
                    decimals={1}
                    isInView={showDialog}
                  />
                  <span className="text-sm ml-0.5">cm</span>
                </div>
              </motion.div>

              <motion.div
                className="bg-red-900/20 p-4 rounded-xl text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-xs text-red-400 font-medium">
                  오른쪽
                </span>
                <div className="text-2xl font-bold text-red-400 mt-1">
                  <AnimatedCounter
                    to={87.2}
                    duration={1}
                    delay={0.6}
                    decimals={1}
                    isInView={showDialog}
                  />
                  <span className="text-sm ml-0.5">cm</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-5 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button className="flex-1 py-2.5 px-4 bg-gray-700 text-gray-300 rounded-xl text-sm font-medium">
                다시 측정
              </button>
              <button className="flex-1 py-2.5 px-4 bg-primary text-white rounded-xl text-sm font-medium">
                확인
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
