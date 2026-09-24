import { Hero } from "@/components/home/Hero";
import { UpcomingTrips } from "@/components/home/UpcomingTrips";
import { HiddenGemSuggest } from "@/components/home/HiddenGemSuggest";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyTripshala } from "@/components/home/WhyTripshala";
import { BikeOrNot } from "@/components/home/BikeOrNot";
import { CommunityTeaser } from "@/components/home/CommunityTeaser";
import { InstagramSection } from "@/components/home/InstagramSection";

// Order tells one story: see the trips → why us → how easy it is → the two
// ways to travel → the people → then invite ideas and follow along.
export default function Home() {
  return (
    <>
      <Hero />
      <UpcomingTrips />
      <WhyTripshala />
      <HowItWorks />
      <BikeOrNot />
      <CommunityTeaser />
      <HiddenGemSuggest />
      <InstagramSection />
    </>
  );
}
