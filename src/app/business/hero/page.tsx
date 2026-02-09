import BusinessHero from "@/components/business/BusinessHero";

export const metadata = {
  title: "비즈니스 히어로 - Roomfit",
  description: "Roomfit 비즈니스 솔루션을 소개합니다.",
};

export default function BusinessHeroPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <BusinessHero />
      </div>
    </main>
  );
}
