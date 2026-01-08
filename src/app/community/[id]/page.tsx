import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PostDetail } from "@/components/community";
import { getPostById, incrementViewCount } from "@/actions/posts";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return {
      title: "게시글을 찾을 수 없습니다 - Roomfit",
    };
  }

  // Strip HTML and truncate for description
  const description = post.content
    .replace(/<[^>]*>/g, "")
    .slice(0, 160);

  return {
    title: `${post.title} - Roomfit 커뮤니티`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author_name],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementViewCount(id);

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <PostDetail post={post} />
      <Footer />
    </main>
  );
}
