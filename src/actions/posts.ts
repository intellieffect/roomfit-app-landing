"use server";

import { createClient } from "@/lib/supabase/server";
import type {
  Post,
  PostListParams,
  PaginatedPosts,
  SortOption,
} from "@/lib/supabase/types";

const DEFAULT_LIMIT = 12;

export async function getPosts(
  params: PostListParams
): Promise<PaginatedPosts> {
  const supabase = await createClient();
  const {
    category = "all",
    search,
    sort = "latest",
    page = 1,
    limit = DEFAULT_LIMIT,
  } = params;

  let query = supabase
    .from("community_posts")
    .select("*", { count: "exact" })
    .eq("is_private", false);

  // Category filter
  if (category !== "all") {
    query = query.eq("category", category);
  }

  // Search filter
  if (search && search.trim()) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  // Sorting
  switch (sort as SortOption) {
    case "views":
      query = query.order("view_count", { ascending: false });
      break;
    case "likes":
      query = query.order("like_count", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  // Pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching posts:", error);
    return {
      posts: [],
      total: 0,
      page,
      totalPages: 0,
    };
  }

  return {
    posts: (data as Post[]) || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("community_posts")
    .select("*")
    .eq("id", id)
    .eq("is_private", false)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data as Post;
}

export async function incrementViewCount(id: string): Promise<void> {
  const supabase = await createClient();

  // Increment view count using raw SQL through Supabase
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: post } = (await supabase
    .from("community_posts")
    .select("view_count")
    .eq("id", id)
    .single()) as { data: { view_count: number } | null };

  if (post) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("community_posts")
      .update({ view_count: post.view_count + 1 })
      .eq("id", id);
  }
}

export async function incrementLikeCount(id: string): Promise<boolean> {
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: post } = (await supabase
    .from("community_posts")
    .select("like_count")
    .eq("id", id)
    .single()) as { data: { like_count: number } | null };

  if (!post) return false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("community_posts")
    .update({ like_count: post.like_count + 1 })
    .eq("id", id);

  if (error) {
    console.error("Error incrementing like count:", error);
    return false;
  }

  return true;
}
