import TrainingModes from "@/components/sections/TrainingModes";

export const metadata = {
  title: "트레이닝 모드 - Roomfit",
  description: "Roomfit 앱의 다양한 트레이닝 모드를 확인하세요.",
};

export default function AppTrainingModesPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <TrainingModes />
      </div>
    </main>
  );
}
