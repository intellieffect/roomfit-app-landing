import DownloadCTA from "@/components/sections/DownloadCTA";

export const metadata = {
  title: "앱 다운로드 - Roomfit",
  description: "Roomfit 앱을 지금 다운로드하세요.",
};

export default function AppDownloadCTAPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <DownloadCTA />
      </div>
    </main>
  );
}
