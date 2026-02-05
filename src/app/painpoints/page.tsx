import { PainPoints } from "@/components/main";

export const metadata = {
  title: "이런 고민 있으셨나요? - Roomfit",
  description: "홈트레이닝의 불편함, Roomfit이 해결합니다.",
};

export default function PainPointsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <PainPoints />
    </main>
  );
}
