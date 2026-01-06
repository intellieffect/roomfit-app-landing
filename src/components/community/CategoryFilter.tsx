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
    <div className="flex flex-wrap gap-2">
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
              px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
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
  );
}
