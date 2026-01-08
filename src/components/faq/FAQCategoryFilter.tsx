"use client";

import { motion } from "framer-motion";
import type { FAQCategory } from "@/data/types";

interface FAQCategoryFilterProps {
  categories: FAQCategory[];
  activeCategory: number | "all";
  onCategoryChange: (categoryId: number | "all") => void;
}

export default function FAQCategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: FAQCategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
      <div className="flex gap-2 sm:flex-wrap min-w-max sm:min-w-0">
        {/* "전체" 버튼 */}
        <motion.button
          onClick={() => onCategoryChange("all")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0
            ${
              activeCategory === "all"
                ? "bg-primary/20 text-primary border-2 border-primary"
                : "bg-white/5 text-gray-400 border-2 border-transparent hover:bg-white/10"
            }
          `}
        >
          전체
        </motion.button>

        {/* 카테고리 버튼들 */}
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0
                ${
                  isActive
                    ? "bg-primary/20 text-primary border-2 border-primary"
                    : "bg-white/5 text-gray-400 border-2 border-transparent hover:bg-white/10"
                }
              `}
            >
              {category.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
