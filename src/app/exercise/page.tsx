import { ExerciseShowcase } from "@/components/main";

export const metadata = {
  title: "운동 종목 - Roomfit",
  description: "Roomfit으로 할 수 있는 다양한 운동 종목을 확인하세요.",
};

export default function ExercisePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <ExerciseShowcase />
    </main>
  );
}
