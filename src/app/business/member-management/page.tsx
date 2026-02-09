import MemberManagement from "@/components/business/MemberManagement";

export const metadata = {
  title: "회원 관리 - Roomfit",
  description: "회원 관리 기능을 확인하세요.",
};

export default function BusinessMemberManagementPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <MemberManagement />
      </div>
    </main>
  );
}
