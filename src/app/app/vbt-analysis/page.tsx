import VBTAnalysis from "@/components/sections/VBTAnalysis";

export const metadata = {
  title: "VBT 분석 - Roomfit",
  description: "속도 기반 트레이닝(VBT) 분석 기능을 확인하세요.",
};

export default function AppVBTAnalysisPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <VBTAnalysis />
      </div>
    </main>
  );
}
