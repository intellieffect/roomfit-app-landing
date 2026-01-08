import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FAQHero, FAQList } from "@/components/faq";
import { faqContent } from "@/data";

export const metadata: Metadata = {
  title: "FAQ - Roomfit",
  description:
    "룸핏에 대해 자주 묻는 질문과 답변을 확인하세요. 제품 사양, 배송, A/S, 사용 방법 등 궁금한 점을 해결해 드립니다.",
  openGraph: {
    title: "FAQ - Roomfit",
    description: "룸핏에 대해 자주 묻는 질문과 답변을 확인하세요.",
  },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <FAQHero />
      <FAQList faqData={faqContent} />
      <Footer />
    </main>
  );
}
