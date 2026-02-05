import { WeightModes } from "@/components/main";

export const metadata = {
  title: "무게 조절 모드 - Roomfit",
  description: "Roomfit의 다양한 무게 조절 모드를 확인하세요.",
};

export default function WeightModesPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <WeightModes />
      </div>
    </main>
  );
}
