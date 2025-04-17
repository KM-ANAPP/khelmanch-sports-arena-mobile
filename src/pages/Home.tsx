
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { FeaturedAthletes } from "@/components/sections/featured-athletes";
import { PrimaryActions } from "@/components/sections/primary-actions";
import { UpcomingTournaments } from "@/components/sections/upcoming-tournaments";
import { PopularGrounds } from "@/components/sections/popular-grounds";
import { StatsSection } from "@/components/sections/stats-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { SpotlightsSection } from "@/components/sections/spotlights-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <MobileLayout title="Home" isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <FeaturedAthletes />
        <PrimaryActions />
        <UpcomingTournaments />
        <PopularGrounds />
        <StatsSection />
        <PartnersSection />
        <SpotlightsSection />
        <ContactSection />
      </div>
    </MobileLayout>
  );
}

