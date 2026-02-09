import BusinessFeatures from "@/components/business/BusinessFeatures";

export const metadata = {
  title: "비즈니스 주요 기능 - Roomfit",
  description: "Roomfit 비즈니스의 주요 기능을 확인하세요.",
};

export default function BusinessFeaturesPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <BusinessFeatures />
      </div>
    </main>
  );
}
