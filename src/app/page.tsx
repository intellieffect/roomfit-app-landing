import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactFAB from "@/components/ContactFAB";
import {
  MainHero,
  OfficialLaunch,
  PainPoints,
  HWSpecs,
  AddOns,
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
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <MainHero />
      <OfficialLaunch />
      <PainPoints />
      <HWSpecs />
      <AddOns />
      <WeightModes />
      <ExerciseShowcase />
      <Safety />
      <AppEnhancement />
      <Lifestyle />
      <SocialProof />
      <MainCTA />
      <Footer />
      <ContactFAB />
    </main>
  );
}
