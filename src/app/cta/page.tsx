import { MainCTA } from "@/components/main";

export const metadata = {
  title: "구매하기 - Roomfit",
  description: "Roomfit을 지금 바로 만나보세요.",
};

export default function CTAPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <MainCTA />
    </main>
  );
}
