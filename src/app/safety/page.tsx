import { Safety } from "@/components/main";

export const metadata = {
  title: "안전 기능 - Roomfit",
  description: "Roomfit의 독자적인 안전 시스템으로 혼자서도 안전하게 운동하세요.",
};

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Safety />
    </main>
  );
}
