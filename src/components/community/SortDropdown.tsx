"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { SORT_OPTIONS, type SortOption } from "@/lib/supabase/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = SORT_OPTIONS.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-void/80 backdrop-blur-sm border border-white/10 rounded-xl
          text-white hover:border-white/20 active:bg-white/5 transition-colors duration-300"
      >
        <span className="text-xs sm:text-sm font-medium">{currentOption?.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 sm:w-40 bg-surface border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl"
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm transition-colors
                  ${
                    value === option.value
                      ? "bg-primary/20 text-primary"
                      : "text-gray-400 hover:bg-white/5 hover:text-white active:bg-white/10"
                  }`}
              >
                <span>{option.label}</span>
                {value === option.value && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
