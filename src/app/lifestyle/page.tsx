import { Lifestyle } from "@/components/main";

export const metadata = {
  title: "라이프스타일 - Roomfit",
  description: "Roomfit과 함께하는 새로운 홈트레이닝 라이프스타일.",
};

export default function LifestylePage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <Lifestyle />
      </div>
    </main>
  );
}
