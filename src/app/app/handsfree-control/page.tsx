import HandsfreeControl from "@/components/sections/HandsfreeControl";

export const metadata = {
  title: "핸즈프리 제어 - Roomfit",
  description: "운동 중 핸즈프리 제어 기능을 확인하세요.",
};

export default function AppHandsfreeControlPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <HandsfreeControl />
      </div>
    </main>
  );
}
