import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AskMeAnything } from "@/components/AskMeAnything";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CRTOverlay } from "@/components/CRTOverlay";

export default function Home() {
  return (
    <>
      {/* Atmospheric CRT scanline effect */}
      <CRTOverlay />

      {/* Sticky top navigation */}
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <HeroSection />
        <AskMeAnything />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
