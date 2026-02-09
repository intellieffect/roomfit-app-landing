import AIAssistant from "@/components/sections/AIAssistant";

export const metadata = {
  title: "AI 어시스턴트 - Roomfit",
  description: "AI 기반 운동 어시스턴트 기능을 확인하세요.",
};

export default function AppAIAssistantPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <AIAssistant />
      </div>
    </main>
  );
}
