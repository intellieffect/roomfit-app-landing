import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-void flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-gray-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">
          게시글을 찾을 수 없습니다
        </h1>
        <p className="text-gray-400 mb-8">
          삭제되었거나 존재하지 않는 게시글입니다
        </p>
        <Link
          href="/community"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>목록으로 돌아가기</span>
        </Link>
      </div>
    </main>
  );
}
