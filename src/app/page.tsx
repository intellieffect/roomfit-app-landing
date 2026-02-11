import ContactFAB from "@/components/ContactFAB";
import {
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
      <ContactFAB />
    </main>
  );
}
