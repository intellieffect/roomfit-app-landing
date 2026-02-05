import { MainHero } from "@/components/main";

export const metadata = {
  title: "메인 히어로 - Roomfit",
  description: "데이터로 완성하는 AI 퍼스널 트레이너, Roomfit.",
};

export default function HeroPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <MainHero />
    </main>
  );
}
