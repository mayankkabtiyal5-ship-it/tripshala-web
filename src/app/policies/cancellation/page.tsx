import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Cancellation & Refund Policy" };

export default function CancellationPage() {
  return (
    <Container className="max-w-3xl py-14">
      <div className="mb-6 rounded-xl border border-dashed border-accent/40 bg-accent/5 p-4 text-sm text-accent-dark">
        STARTER TEMPLATE — replace the bracketed terms with your real policy before launch. This is not a finished policy.
      </div>
      <h1 className="font-display text-3xl font-extrabold">Cancellation &amp; Refund Policy</h1>
      <div className="prose mt-6 space-y-4 text-sm text-muted">
        <p>[SAMPLE] Cancellations made more than [X] days before departure: full refund minus a [X]% processing fee.</p>
        <p>[SAMPLE] Cancellations made within [X] days of departure: [X]% refund / credit toward a future trip.</p>
        <p>[SAMPLE] No-shows on the day of departure are not eligible for a refund.</p>
        <p>[SAMPLE] If Tripshala cancels a trip (low bookings, weather, safety), participants receive a full refund or the option to move to another trip date.</p>
      </div>
    </Container>
  );
}
