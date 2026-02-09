import BusinessTrainingModes from "@/components/business/BusinessTrainingModes";

export const metadata = {
  title: "비즈니스 트레이닝 모드 - Roomfit",
  description: "비즈니스를 위한 다양한 트레이닝 모드를 확인하세요.",
};

export default function BusinessTrainingModesPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <BusinessTrainingModes />
      </div>
    </main>
  );
}
