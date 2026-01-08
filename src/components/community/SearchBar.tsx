"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  initialValue = "",
  onSearch,
  placeholder = "검색어를 입력하세요",
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const onSearchRef = useRef(onSearch);
  const lastSearchedRef = useRef(initialValue);

  // Keep onSearch ref updated without triggering effects
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    setValue(initialValue);
    lastSearchedRef.current = initialValue;
  }, [initialValue]);

  // Debounced search - only depends on value
  useEffect(() => {
    // Skip if value hasn't changed from last search
    if (value === lastSearchedRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      lastSearchedRef.current = value;
      onSearchRef.current(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 sm:pl-12 pr-9 sm:pr-10 py-2.5 sm:py-3 bg-void/80 backdrop-blur-sm border border-white/10 rounded-xl
          text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary/50
          transition-colors duration-300"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-500 hover:text-white active:text-white transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
    </div>
  );
}
