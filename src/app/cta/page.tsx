import { MainCTA } from "@/components/main";

export const metadata = {
  title: "구매하기 - Roomfit",
  description: "Roomfit을 지금 바로 만나보세요.",
};

export default function CTAPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <MainCTA />
      </div>
    </main>
  );
}
