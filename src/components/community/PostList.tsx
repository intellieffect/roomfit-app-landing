"use client";

import { useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FileQuestion } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import type {
  PaginatedPosts,
  PostCategory,
  SortOption,
} from "@/lib/supabase/types";

interface PostListProps {
  initialData: PaginatedPosts;
}

export default function PostList({ initialData }: PostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = (searchParams.get("category") || "all") as
    | PostCategory
    | "all";
  const currentSearch = searchParams.get("search") || "";
  const currentSort = (searchParams.get("sort") || "latest") as SortOption;
  const currentPage = Number(searchParams.get("page")) || 1;

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Reset page when filters change (except page itself)
      if (!("page" in updates)) {
        params.delete("page");
      }

      startTransition(() => {
        router.push(`/community?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handleCategoryChange = (category: PostCategory | "all") => {
    updateParams({ category: category === "all" ? undefined : category });
  };

  const handleSearch = useCallback(
    (query: string) => {
      updateParams({ search: query || undefined });
    },
    [updateParams]
  );

  const handleSortChange = (sort: SortOption) => {
    updateParams({ sort: sort === "latest" ? undefined : sort });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page === 1 ? undefined : String(page) });
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-void min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters Bar */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          {/* Category Filter - Full width on mobile with scroll */}
          <CategoryFilter
            activeCategory={currentCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Search and Sort - Stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 sm:max-w-xs lg:max-w-sm">
              <SearchBar
                initialValue={currentSearch}
                onSearch={handleSearch}
                placeholder="제목, 내용 검색"
              />
            </div>
            <div className="self-start sm:self-auto">
              <SortDropdown value={currentSort} onChange={handleSortChange} />
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        <div className={`relative ${isPending ? "opacity-50" : ""}`}>
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Posts Grid */}
          {initialData.posts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
            >
              {initialData.posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <FileQuestion className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                게시글이 없습니다
              </h3>
              <p className="text-gray-400">
                {currentSearch
                  ? `"${currentSearch}" 검색 결과가 없습니다`
                  : "아직 게시글이 없습니다"}
              </p>
            </motion.div>
          )}
        </div>

        {/* Pagination */}
        {initialData.totalPages > 1 && (
          <div className="mt-8 sm:mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={initialData.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Stats */}
        {initialData.total > 0 && (
          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
            총 {initialData.total}개의 게시글
          </div>
        )}
      </div>
    </section>
  );
}
