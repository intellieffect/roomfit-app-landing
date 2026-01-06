export type PostCategory = "공지" | "의견" | "질문" | "일반" | "정보";
export type SortOption = "latest" | "views" | "likes";

export interface Post {
  id: string;
  post_number: number;
  category: PostCategory;
  title: string;
  content: string;
  author_name: string;
  author_id: string | null;
  ip_address: string | null;
  view_count: number;
  like_count: number;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostListParams {
  category?: PostCategory | "all";
  search?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export interface PaginatedPosts {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
}

// Supabase Database types
export interface Database {
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: Omit<Post, "id" | "post_number" | "created_at" | "updated_at">;
        Update: Partial<Omit<Post, "id" | "post_number">>;
      };
    };
  };
}

// Category metadata for UI
export const CATEGORY_CONFIG: Record<
  PostCategory,
  { color: string; bgColor: string; label: string }
> = {
  공지: { color: "text-red-400", bgColor: "bg-red-500/20", label: "공지" },
  의견: { color: "text-primary", bgColor: "bg-primary/20", label: "의견" },
  질문: { color: "text-green-400", bgColor: "bg-green-500/20", label: "질문" },
  일반: { color: "text-gray-400", bgColor: "bg-gray-500/20", label: "일반" },
  정보: { color: "text-yellow-400", bgColor: "bg-yellow-500/20", label: "정보" },
};

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "최신순" },
  { value: "views", label: "조회순" },
  { value: "likes", label: "좋아요순" },
];

export const CATEGORIES: PostCategory[] = ["공지", "의견", "질문", "일반", "정보"];
