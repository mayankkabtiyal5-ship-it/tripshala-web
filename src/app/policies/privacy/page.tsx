import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-3xl font-extrabold">Privacy Policy</h1>
      <div className="prose mt-6 space-y-4 text-sm text-muted">
        <p>Tripshala collects the information you submit through our booking and enquiry forms — name, phone number, email, age, city and trip preferences — solely to plan and confirm your trip and to communicate with you about it.</p>
        <p>We do not sell your personal information. Information may be shared with trip leads and accommodation partners strictly as needed to run the trip you&apos;ve booked.</p>
        <p>Analytics tools (Google Analytics, Meta Pixel) may collect anonymised usage data about how you use this website — see the Analytics setup notes in the project&apos;s DEPLOYMENT.md for exactly what is tracked.</p>
        <p>For any privacy questions or to request deletion of your data, contact {site.contactEmail}.</p>
      </div>
    </Container>
  );
}
