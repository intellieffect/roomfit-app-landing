import BusinessVBTAnalysis from "@/components/business/BusinessVBTAnalysis";

export const metadata = {
  title: "비즈니스 VBT 분석 - Roomfit",
  description: "비즈니스를 위한 속도 기반 트레이닝(VBT) 분석 기능을 확인하세요.",
};

export default function BusinessVBTAnalysisPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <BusinessVBTAnalysis />
      </div>
    </main>
  );
}
