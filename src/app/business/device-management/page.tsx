import DeviceManagement from "@/components/business/DeviceManagement";

export const metadata = {
  title: "기기 관리 - Roomfit",
  description: "비즈니스 기기 관리 기능을 확인하세요.",
};

export default function BusinessDeviceManagementPage() {
  return (
    <main className="h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex flex-col [&>section]:flex-1">
        <DeviceManagement />
      </div>
    </main>
  );
}
