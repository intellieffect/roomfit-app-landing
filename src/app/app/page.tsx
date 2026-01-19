import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactFAB from "@/components/ContactFAB";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import TrainingModes from "@/components/sections/TrainingModes";
import HandsfreeControl from "@/components/sections/HandsfreeControl";
import Connectivity from "@/components/sections/Connectivity";
import DownloadCTA from "@/components/sections/DownloadCTA";

// Lazy load heavy framer-motion components
const VBTAnalysis = dynamic(() => import("@/components/sections/VBTAnalysis"), {
  ssr: true,
  loading: () => <div className="py-24 bg-gray-900/50" />,
});
const DataInsights = dynamic(() => import("@/components/sections/DataInsights"), {
  ssr: true,
  loading: () => <div className="py-24" />,
});
const AIAssistant = dynamic(() => import("@/components/sections/AIAssistant"), {
  loading: () => <div className="py-24 bg-gray-900/50" />,
});

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
