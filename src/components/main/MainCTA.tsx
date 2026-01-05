"use client";

import { ShoppingCart, Calendar, Sparkles } from "lucide-react";
import { mainContent } from "@/data";
import { motion } from "framer-motion";

export default function MainCTA() {
  const { cta } = mainContent;

  return (
    <section className="py-24 bg-gradient-to-b from-primary to-primary-600 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {cta.title}
          </h2>
          <p className="text-xl text-white/80 mb-10">
            {cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={cta.buttons.primary.href}
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              {cta.buttons.primary.text}
            </a>
            <a
              href={cta.buttons.secondary.href}
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all border border-white/30"
            >
              <Calendar className="w-5 h-5" />
              {cta.buttons.secondary.text}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
