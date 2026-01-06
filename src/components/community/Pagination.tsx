"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const showPages = 5;
    const halfShow = Math.floor(showPages / 2);

    let startPage = Math.max(1, currentPage - halfShow);
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border transition-all duration-300 ${
          currentPage === 1
            ? "border-white/5 text-gray-600 cursor-not-allowed"
            : "border-white/10 text-gray-400 hover:border-primary/50 hover:text-primary"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <motion.button
              key={page}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] h-10 rounded-lg text-sm font-semibold transition-all duration-300 ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "border border-white/10 text-gray-400 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {page}
            </motion.button>
          )
        )}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border transition-all duration-300 ${
          currentPage === totalPages
            ? "border-white/5 text-gray-600 cursor-not-allowed"
            : "border-white/10 text-gray-400 hover:border-primary/50 hover:text-primary"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
