import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CommunityHero, PostList } from "@/components/community";
import { getPosts } from "@/actions/posts";
import type { PostCategory, SortOption } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "커뮤니티 - Roomfit",
  description: "룸핏 유저들의 소통 공간. 의견, 질문, 후기를 자유롭게 나누세요.",
};

interface CommunityPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

async function PostListWrapper({
  searchParams,
}: {
  searchParams: {
    category?: string;
    search?: string;
    sort?: string;
    page?: string;
  };
}) {
  const posts = await getPosts({
    category: (searchParams.category || "all") as PostCategory | "all",
    search: searchParams.search,
    sort: (searchParams.sort || "latest") as SortOption,
    page: Number(searchParams.page) || 1,
    limit: 12,
  });

  return <PostList initialData={posts} />;
}

export default async function CommunityPage({
  searchParams,
}: CommunityPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <CommunityHero />
      <Suspense
        fallback={
          <div className="py-16 bg-void min-h-[60vh] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <PostListWrapper searchParams={params} />
      </Suspense>
      <Footer />
    </main>
  );
}
