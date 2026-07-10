import { FeatureCards } from "../components/cards/FeatureCards";
import { HeroSection } from "../components/hero/HeroSection";
import { HistorySection } from "../components/history/HistorySection";
import { MasterplanSection } from "../components/masterplan/MasterplanSection";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02080d] text-white">
      <HeroSection />
      <FeatureCards />
      <MasterplanSection />
      <HistorySection />
    </main>
  );
}
