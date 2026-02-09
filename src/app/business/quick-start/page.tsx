import QuickStart from "@/components/business/QuickStart";

export const metadata = {
  title: "퀵 스타트 - Roomfit",
  description: "Roomfit 비즈니스 빠른 시작 가이드를 확인하세요.",
};

export default function BusinessQuickStartPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <QuickStart />
      </div>
    </main>
  );
}
