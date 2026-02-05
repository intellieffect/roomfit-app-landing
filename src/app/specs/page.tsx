import { HWSpecs } from "@/components/main";

export const metadata = {
  title: "제품 스펙 - Roomfit",
  description: "Roomfit 스미스머신의 상세 스펙과 기술 사양을 확인하세요.",
};

export default function SpecsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <HWSpecs />
    </main>
  );
}
