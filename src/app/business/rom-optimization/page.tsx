import ROMOptimization from "@/components/business/ROMOptimization";

export const metadata = {
  title: "ROM 최적화 - Roomfit",
  description: "관절가동범위(ROM) 최적화 기능을 확인하세요.",
};

export default function BusinessROMOptimizationPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <ROMOptimization />
      </div>
    </main>
  );
}
