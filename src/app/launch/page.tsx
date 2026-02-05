import { OfficialLaunch } from "@/components/main";

export const metadata = {
  title: "정식 출시 - Roomfit",
  description: "Roomfit 정식 출시 안내.",
};

export default function LaunchPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <OfficialLaunch />
      </div>
    </main>
  );
}
