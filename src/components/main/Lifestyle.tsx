"use client";

import { useRef } from "react";
import { Moon, Clock, Home, Volume2 } from "lucide-react";
import { mainContent } from "@/data";
import { motion, useInView } from "framer-motion";

const highlightIcons = [Moon, Clock, Home];

export default function Lifestyle() {
  const { lifestyle } = mainContent;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-void overflow-hidden"
    >
      {/* Background - Night atmosphere */}
      <div className="absolute inset-0">
        {/* Stars effect */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Moon glow */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-yellow-500/10 to-transparent blur-3xl" />

        {/* Ambient gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-indigo-950/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-indigo-950/50 to-void overflow-hidden border border-white/5">
              {/* Night scene visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Window frame effect */}
                <div className="absolute inset-8 border border-white/10 rounded-2xl">
                  {/* Window glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                </div>

                {/* Moon */}
                <motion.div
                  className="absolute top-12 right-16"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200" />
                    <div className="absolute inset-0 rounded-full bg-yellow-200/30 blur-xl" />
                  </div>
                </motion.div>

                {/* Silence indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-1/3 left-1/2 -translate-x-1/2"
                >
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-void/80 backdrop-blur border border-white/10">
                    <Volume2 className="w-5 h-5 text-secondary" />
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-secondary/60 rounded-full"
                          animate={{
                            height: [4, i <= 2 ? 8 : 4, 4],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">무소음</span>
                  </div>
                </motion.div>

                {/* Time display */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                  className="absolute top-8 left-8"
                >
                  <div className="text-4xl font-light text-white/80 font-mono">
                    23:47
                  </div>
                  <p className="text-sm text-gray-500">밤 늦은 시간도 OK</p>
                </motion.div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-4 right-4">
                <div className="w-3 h-3 rounded-full bg-secondary/50 animate-pulse" />
              </div>
            </div>

            {/* Floating tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute -top-4 -right-4 sm:right-8"
            >
              <div className="px-4 py-2 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30">
                <span className="text-secondary font-semibold">층간소음 ZERO</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-8">
              <Moon className="w-4 h-4" />
              새벽 운동러를 위한
            </div>

            <h2 className="text-display-lg text-white mb-6">
              {lifestyle.title.line1}
              <br />
              <span className="text-secondary">{lifestyle.title.line2}</span>
            </h2>

            <p className="text-xl text-gray-300 mb-4 leading-relaxed">
              {lifestyle.subtitle}
            </p>
            <p className="text-gray-500 mb-10 leading-relaxed">
              {lifestyle.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3">
              {lifestyle.highlights.map((highlight, index) => {
                const Icon = highlightIcons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="group flex items-center gap-2 px-5 py-3 rounded-2xl bg-surface border border-white/5 hover:border-secondary/30 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <Icon className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="font-medium text-white">{highlight}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
