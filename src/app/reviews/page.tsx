import { SocialProof } from "@/components/main";

export const metadata = {
  title: "사용자 후기 - Roomfit",
  description: "Roomfit 실제 사용자들의 생생한 후기를 확인하세요.",
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <SocialProof />
    </main>
  );
}
