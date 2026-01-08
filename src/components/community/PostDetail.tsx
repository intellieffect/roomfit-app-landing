"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Heart,
  User,
  Share2,
} from "lucide-react";
import DOMPurify from "dompurify";
import { CATEGORY_CONFIG, type Post } from "@/lib/supabase/types";
import { incrementLikeCount } from "@/actions/posts";

interface PostDetailProps {
  post: Post;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PostDetail({ post }: PostDetailProps) {
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [isLiking, setIsLiking] = useState(false);
  const categoryConfig = CATEGORY_CONFIG[post.category];

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    const success = await incrementLikeCount(post.id);
    if (success) {
      setLikeCount((prev) => prev + 1);
    }

    setIsLiking(false);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다");
    }
  };

  // Sanitize HTML content
  const sanitizedContent =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(post.content, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
        })
      : post.content;

  return (
    <section className="py-20 sm:py-24 bg-void min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            href="/community"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-gray-400 hover:text-white active:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>목록으로</span>
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-void/80 backdrop-blur-sm border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 lg:p-8 border-b border-white/5">
            {/* Category */}
            <span
              className={`inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-3 sm:mb-4 ${categoryConfig.bgColor} ${categoryConfig.color}`}
            >
              {categoryConfig.label}
            </span>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{formatDate(post.created_at)}</span>
                <span className="sm:hidden">{new Date(post.created_at).toLocaleDateString("ko-KR")}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{post.view_count}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div
              className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:mx-auto
                prose-headings:text-white prose-headings:leading-tight
                prose-strong:text-white
                prose-ul:text-gray-300 prose-ol:text-gray-300
                [&_img]:max-w-full [&_img]:h-auto
                [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-xl"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>

          {/* Actions */}
          <div className="p-4 sm:p-6 lg:p-8 border-t border-white/5">
            <div className="flex items-center justify-between gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                  isLiking
                    ? "bg-red-500/20 text-red-400"
                    : "bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 active:bg-red-500/30"
                }`}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiking ? "fill-current" : ""}`}
                />
                <span>{likeCount}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 text-gray-400 hover:bg-primary/20 hover:text-primary active:bg-primary/30 transition-all duration-300 text-sm sm:text-base font-semibold"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>공유</span>
              </motion.button>
            </div>
          </div>
        </motion.article>

        {/* Back to List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 sm:mt-8 text-center"
        >
          <Link
            href="/community"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/5 rounded-full text-sm sm:text-base text-gray-400 hover:bg-white/10 hover:text-white active:bg-white/15 transition-all duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>목록으로 돌아가기</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
