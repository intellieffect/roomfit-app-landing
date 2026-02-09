import ContactCTA from "@/components/business/ContactCTA";

export const metadata = {
  title: "문의하기 - Roomfit",
  description: "Roomfit 비즈니스 도입 문의를 남겨주세요.",
};

export default function BusinessContactCTAPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <ContactCTA />
      </div>
    </main>
  );
}
