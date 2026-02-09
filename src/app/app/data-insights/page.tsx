import DataInsights from "@/components/sections/DataInsights";

export const metadata = {
  title: "데이터 인사이트 - Roomfit",
  description: "운동 데이터 분석 및 인사이트 기능을 확인하세요.",
};

export default function AppDataInsightsPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <DataInsights />
      </div>
    </main>
  );
}
