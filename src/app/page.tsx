import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { UpcomingTrips } from "@/components/home/UpcomingTrips";
import { HiddenGemSuggest } from "@/components/home/HiddenGemSuggest";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyTripshala } from "@/components/home/WhyTripshala";
import { BikeOrNot } from "@/components/home/BikeOrNot";
import { CommunityTeaser } from "@/components/home/CommunityTeaser";
import { InstagramSection } from "@/components/home/InstagramSection";
import { SeasonalFeature, getActiveSeason } from "@/components/home/SeasonalFeature";
import { BrowseByType } from "@/components/home/BrowseByType";
import { WeekendAlertsSection } from "@/components/home/WeekendAlertsSection";

// Re-render a few times a day so date-driven sections (long-weekend band,
// next departures) roll over on their own without a redeploy.
export const revalidate = 21600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Order tells one story: this season's trips → browse by type → why us → how easy it is → the two
// ways to travel → the people → then invite ideas and follow along.
export default function Home() {
  return (
    <>
      <Hero />
      {getActiveSeason() ? <SeasonalFeature /> : <UpcomingTrips />}
      <BrowseByType />
      <WhyTripshala />
      <HowItWorks />
      <BikeOrNot />
      <CommunityTeaser />
      <WeekendAlertsSection />
      <HiddenGemSuggest />
      <InstagramSection />
    </>
  );
}
