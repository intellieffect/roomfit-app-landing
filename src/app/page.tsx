import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import VBTAnalysis from "@/components/sections/VBTAnalysis";
import TrainingModes from "@/components/sections/TrainingModes";
import VoiceControl from "@/components/sections/VoiceControl";
import DataInsights from "@/components/sections/DataInsights";
import Connectivity from "@/components/sections/Connectivity";
import DownloadCTA from "@/components/sections/DownloadCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0f]">
      <Navbar />
      <Hero />
      <Features />
      <VBTAnalysis />
      <TrainingModes />
      <VoiceControl />
      <DataInsights />
      <Connectivity />
      <DownloadCTA />
      <Footer />
    </main>
  );
}
