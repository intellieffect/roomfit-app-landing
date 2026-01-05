import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  MainHero,
  PainPoints,
  HWSpecs,
  WeightModes,
  Safety,
  AppEnhancement,
  Lifestyle,
  SocialProof,
  MainCTA,
} from "@/components/main";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0f]">
      <Navbar />
      <MainHero />
      <PainPoints />
      <HWSpecs />
      <WeightModes />
      <Safety />
      <AppEnhancement />
      <Lifestyle />
      <SocialProof />
      <MainCTA />
      <Footer />
    </main>
  );
}
