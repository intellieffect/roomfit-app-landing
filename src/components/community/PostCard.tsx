"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, Calendar } from "lucide-react";
import { CATEGORY_CONFIG, type Post } from "@/lib/supabase/types";

interface PostCardProps {
  post: Post;
  index?: number;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").slice(0, 150);
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const categoryConfig = CATEGORY_CONFIG[post.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/community/${post.id}`}>
        <motion.article
          whileHover={{ y: -4 }}
          className="group relative h-full p-4 sm:p-5 lg:p-6 bg-void/80 backdrop-blur-sm border border-white/5 rounded-2xl sm:rounded-3xl
            hover:border-secondary/30 active:border-secondary/50 transition-all duration-300 cursor-pointer"
        >
          {/* Hover Glow Effect - Hidden on mobile for performance */}
          <div className="hidden sm:block absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 rounded-3xl" />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Header: Category + Date */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span
                className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${categoryConfig.bgColor} ${categoryConfig.color}`}
              >
                {categoryConfig.label}
              </span>
              <div className="flex items-center gap-1 text-gray-500 text-[10px] sm:text-xs">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-secondary transition-colors duration-300">
              {post.title}
            </h3>

            {/* Content Preview */}
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 flex-grow">
              {stripHtml(post.content)}...
            </p>

            {/* Footer: Author + Stats */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/5">
              <span className="text-xs sm:text-sm text-gray-500 truncate max-w-[120px] sm:max-w-none">{post.author_name}</span>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1 text-gray-500 text-[10px] sm:text-xs">
                  <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{post.view_count}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-[10px] sm:text-xs">
                  <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{post.like_count}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Accent Line - Hidden on mobile */}
          <div className="hidden sm:block absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-secondary via-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-x-0 group-hover:scale-x-100" />
        </motion.article>
      </Link>
    </motion.div>
  );
}
