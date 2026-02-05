import { AddOns } from "@/components/main";

export const metadata = {
  title: "애드온 - Roomfit",
  description: "Roomfit 애드온 타워와 확장 액세서리를 확인하세요.",
};

export default function AddOnsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <AddOns />
    </main>
  );
}
