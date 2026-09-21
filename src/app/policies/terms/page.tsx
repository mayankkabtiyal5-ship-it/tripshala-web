import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-3xl font-extrabold">Terms of Use</h1>
      <div className="prose mt-6 space-y-4 text-sm text-muted">
        <p>These terms govern your use of the Tripshala website and participation in Tripshala trips. By booking a trip, you agree to these terms.</p>
        <p><strong className="text-ink">Bookings.</strong> A booking is confirmed only once Tripshala confirms it in writing (WhatsApp or email), not upon form submission alone.</p>
        <p><strong className="text-ink">Conduct.</strong> Participants are expected to follow the trip lead&apos;s safety instructions at all times. Tripshala reserves the right to remove a participant from a trip for unsafe or disruptive behaviour, without refund.</p>
        <p>
          <strong className="text-ink">Liability.</strong> Activities on Tripshala trips — including riding a two-wheeler, trekking, water activities and travel on hill or rural roads — carry inherent risks. By booking, you confirm you&apos;re participating voluntarily and in adequate health for the trip&apos;s stated difficulty level, and that you hold a valid driving licence for any vehicle you personally operate. Tripshala, its trip leads and partners are not liable for personal injury, illness, loss or damage to belongings, or costs arising from a participant&apos;s own negligence, pre-existing medical condition, or failure to follow safety instructions. Medical, evacuation and hospital expenses arising during a trip are the participant&apos;s own responsibility — we strongly recommend personal travel/accident insurance before any trip. To the extent permitted by law, Tripshala&apos;s total liability for any claim relating to a trip is limited to the amount paid for that trip.
        </p>
        <p><strong className="text-ink">Changes.</strong> Tripshala may modify a trip&apos;s route, schedule or transport due to weather, safety or availability, and will communicate changes via the trip WhatsApp group.</p>
      </div>
    </Container>
  );
}

// NOTE FOR MAYANK (not shown to visitors): the Liability clause above is a
// reasonable starting draft modeled on standard practice for adventure/
// group-travel operators. It is not a substitute for review by a qualified
// lawyer — worth having it checked before you'd need to rely on it in a
// real dispute, but it's a solid, non-broken-looking default for now.
