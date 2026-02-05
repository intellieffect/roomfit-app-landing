import { OfficialLaunch } from "@/components/main";

export const metadata = {
  title: "정식 출시 - Roomfit",
  description: "Roomfit 정식 출시 안내.",
};

export default function LaunchPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <OfficialLaunch />
    </main>
  );
}
