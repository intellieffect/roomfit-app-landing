import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BusinessHero from "@/components/business/BusinessHero";
import BusinessFeatures from "@/components/business/BusinessFeatures";
import BusinessVBTAnalysis from "@/components/business/BusinessVBTAnalysis";
import BusinessTrainingModes from "@/components/business/BusinessTrainingModes";
import ROMOptimization from "@/components/business/ROMOptimization";
import MemberManagement from "@/components/business/MemberManagement";
import QuickStart from "@/components/business/QuickStart";
import DeviceManagement from "@/components/business/DeviceManagement";
import Marketing from "@/components/business/Marketing";
import ContactCTA from "@/components/business/ContactCTA";

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0f]">
      <Navbar />
      <BusinessHero />
      <BusinessFeatures />
      <BusinessVBTAnalysis />
      <BusinessTrainingModes />
      <ROMOptimization />
      <MemberManagement />
      <QuickStart />
      <DeviceManagement />
      <Marketing />
      <ContactCTA />
      <Footer />
    </main>
  );
}
