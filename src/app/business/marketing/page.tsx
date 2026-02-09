import Marketing from "@/components/business/Marketing";

export const metadata = {
  title: "마케팅 - Roomfit",
  description: "Roomfit 비즈니스 마케팅 기능을 확인하세요.",
};

export default function BusinessMarketingPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <Marketing />
      </div>
    </main>
  );
}
