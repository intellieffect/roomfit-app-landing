import Connectivity from "@/components/sections/Connectivity";

export const metadata = {
  title: "연결성 - Roomfit",
  description: "Roomfit 앱의 기기 연결 기능을 확인하세요.",
};

export default function AppConnectivityPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <Connectivity />
      </div>
    </main>
  );
}
