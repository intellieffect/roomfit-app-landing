import { MessageCircle } from "lucide-react";

export default function ContactFAB() {
  return (
    <a
      href="https://pf.kakao.com/_xfkxeJG/chat"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span>문의</span>
    </a>
  );
}
