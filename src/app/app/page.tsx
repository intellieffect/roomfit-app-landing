import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactFAB from "@/components/ContactFAB";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import VBTAnalysis from "@/components/sections/VBTAnalysis";
import TrainingModes from "@/components/sections/TrainingModes";
import HandsfreeControl from "@/components/sections/HandsfreeControl";
import DataInsights from "@/components/sections/DataInsights";
import AIAssistant from "@/components/sections/AIAssistant";
import Connectivity from "@/components/sections/Connectivity";
import DownloadCTA from "@/components/sections/DownloadCTA";

export default function AppPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <Hero />
      <Features />
      <VBTAnalysis />
      <TrainingModes />
      <HandsfreeControl />
      <DataInsights />
      <AIAssistant />
      <Connectivity />
      <DownloadCTA />
      <Footer />
      <ContactFAB />
    </main>
  );
}
