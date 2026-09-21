import { Hero } from "@/components/home/Hero";
import { UpcomingTrips } from "@/components/home/UpcomingTrips";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyTripshala } from "@/components/home/WhyTripshala";
import { BikeOrNot } from "@/components/home/BikeOrNot";
import { CommunityTeaser } from "@/components/home/CommunityTeaser";
import { InstagramSection } from "@/components/home/InstagramSection";

export default function Home() {
  return (
    <>
      <Hero />
      <UpcomingTrips />
      <HowItWorks />
      <WhyTripshala />
      <BikeOrNot />
      <CommunityTeaser />
      <InstagramSection />
    </>
  );
}
