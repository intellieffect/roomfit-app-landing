import Features from "@/components/sections/Features";

export const metadata = {
  title: "앱 주요 기능 - Roomfit",
  description: "Roomfit 앱의 주요 기능을 확인하세요.",
};

export default function AppFeaturesPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <Features />
      </div>
    </main>
  );
}
