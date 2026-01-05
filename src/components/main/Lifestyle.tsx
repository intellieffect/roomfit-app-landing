"use client";

import { Moon, Clock, Home } from "lucide-react";
import { mainContent } from "@/data";
import { motion } from "framer-motion";

const highlightIcons = [Moon, Clock, Home];

export default function Lifestyle() {
  const { lifestyle } = mainContent;

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden flex items-center justify-center">
              {/* Night/mood visual placeholder */}
              <div className="text-center">
                <Moon className="w-24 h-24 text-yellow-400 mx-auto mb-4 opacity-80" />
                <p className="text-xl text-gray-400">고요한 밤, 나만의 운동</p>
              </div>
            </div>
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-primary font-medium"
            >
              층간소음 걱정 없이
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {lifestyle.title.line1}
              <br />
              <span className="text-primary">{lifestyle.title.line2}</span>
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              {lifestyle.subtitle}
            </p>
            <p className="text-gray-400 mb-8">
              {lifestyle.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-4">
              {lifestyle.highlights.map((highlight, index) => {
                const Icon = highlightIcons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{highlight}</span>
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
