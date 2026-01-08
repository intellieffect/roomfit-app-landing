"use client";

import { motion } from "framer-motion";
import {
  CATEGORIES,
  CATEGORY_CONFIG,
  type PostCategory,
} from "@/lib/supabase/types";

interface CategoryFilterProps {
  activeCategory: PostCategory | "all";
  onCategoryChange: (category: PostCategory | "all") => void;
}

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const allCategories: (PostCategory | "all")[] = ["all", ...CATEGORIES];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
      <div className="flex gap-2 sm:flex-wrap min-w-max sm:min-w-0">
        {allCategories.map((category) => {
          const isActive = activeCategory === category;
          const config =
            category === "all"
              ? { color: "text-white", bgColor: "bg-white/10", label: "전체" }
              : CATEGORY_CONFIG[category];

          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0
                ${
                  isActive
                    ? `${config.bgColor} ${config.color} border-2 border-current`
                    : "bg-white/5 text-gray-400 border-2 border-transparent hover:bg-white/10"
                }
              `}
            >
              {config.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
