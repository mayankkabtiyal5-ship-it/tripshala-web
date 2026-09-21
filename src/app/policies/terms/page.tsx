import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-14">
      <div className="mb-6 rounded-xl border border-dashed border-accent/40 bg-accent/5 p-4 text-sm text-accent-dark">
        STARTER TEMPLATE — this is placeholder legal text, not a reviewed policy. Have this reviewed before launch; do not treat it as legally sufficient.
      </div>
      <h1 className="font-display text-3xl font-extrabold">Terms of Use</h1>
      <div className="prose mt-6 space-y-4 text-sm text-muted">
        <p>These terms govern your use of the Tripshala website and participation in Tripshala trips. By booking a trip, you agree to these terms.</p>
        <p><strong className="text-ink">Bookings.</strong> A booking is confirmed only once Tripshala confirms it in writing (WhatsApp or email), not upon form submission alone.</p>
        <p><strong className="text-ink">Conduct.</strong> Participants are expected to follow the trip lead&apos;s safety instructions at all times. Tripshala reserves the right to remove a participant from a trip for unsafe or disruptive behaviour, without refund.</p>
        <p><strong className="text-ink">Liability.</strong> [SAMPLE — insert your actual liability terms, drafted or reviewed by a qualified professional, before launch.]</p>
        <p><strong className="text-ink">Changes.</strong> Tripshala may modify a trip&apos;s route, schedule or transport due to weather, safety or availability, and will communicate changes via the trip WhatsApp group.</p>
      </div>
    </Container>
  );
}
