"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import FAQCategoryFilter from "./FAQCategoryFilter";
import FAQAccordion from "./FAQAccordion";
import type { FAQContent } from "@/data/types";

interface FAQListProps {
  faqData: FAQContent;
}

export default function FAQList({ faqData }: FAQListProps) {
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const handleToggle = (itemId: string) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  // 카테고리 변경 시 열린 아코디언 닫기
  const handleCategoryChange = (categoryId: number | "all") => {
    setActiveCategory(categoryId);
    setOpenItemId(null);
  };

  // 선택된 카테고리의 FAQ 가져오기
  const filteredCategories =
    activeCategory === "all"
      ? faqData.categories
      : faqData.categories.filter((cat) => cat.id === activeCategory);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-void">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <FAQCategoryFilter
          categories={faqData.categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* FAQ Items */}
        <div className="mt-8 sm:mt-12">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 sm:mb-12 last:mb-0"
              >
                {/* 전체 보기일 때만 카테고리 제목 표시 */}
                {activeCategory === "all" && (
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                    <span className="w-1 h-5 bg-primary rounded-full" />
                    {category.name}
                  </h3>
                )}

                <div className="bg-surface rounded-xl sm:rounded-2xl border border-white/5 overflow-hidden px-4 sm:px-6">
                  {category.items.map((item, idx) => (
                    <FAQAccordion
                      key={`${category.id}-${idx}`}
                      item={item}
                      isOpen={openItemId === `${category.id}-${idx}`}
                      onToggle={() => handleToggle(`${category.id}-${idx}`)}
                      index={idx}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HelpCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">해당 카테고리에 FAQ가 없습니다.</p>
            </motion.div>
          )}
        </div>

        {/* 총 FAQ 개수 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            총 {faqData.totalItems}개의 자주 묻는 질문
          </p>
        </motion.div>
      </div>
    </section>
  );
}
