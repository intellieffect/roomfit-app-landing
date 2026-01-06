import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  MainHero,
  IntroStats,
  PainPoints,
  HWSpecs,
  WeightModes,
  ExerciseShowcase,
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
      <IntroStats />
      <PainPoints />
      <HWSpecs />
      <WeightModes />
      <ExerciseShowcase />
      <Safety />
      <AppEnhancement />
      <Lifestyle />
      <SocialProof />
      <MainCTA />
      <Footer />
    </main>
  );
}
