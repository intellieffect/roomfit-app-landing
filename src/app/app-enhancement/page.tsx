import { AppEnhancement } from "@/components/main";

export const metadata = {
  title: "앱 연동 - Roomfit",
  description: "Roomfit 앱으로 운동 데이터를 스마트하게 관리하세요.",
};

export default function AppEnhancementPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <AppEnhancement />
      </div>
    </main>
  );
}
