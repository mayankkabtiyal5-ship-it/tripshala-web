import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "How cancellations, refunds and trip credits work on Tripshala trips.",
};

const tiers = [
  { window: "8 or more days before departure", refund: "Full refund — no cancellation fee" },
  { window: "7 days before departure", refund: "90% refund (10% cancellation fee)" },
  { window: "3–6 days before departure", refund: "75% refund (25% cancellation fee)" },
  { window: "2 days before departure", refund: "50% refund (50% cancellation fee)" },
  { window: "0–1 day before departure, or a no-show", refund: "No refund (100% cancellation fee)" },
];

export default function CancellationPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-3xl font-medium">Cancellation &amp; Refund Policy</h1>
      <p className="mt-3 text-sm text-muted">
        Seats, stays and transport are booked and paid for on your behalf as soon as a trip fills up, so refunds get smaller closer to departure — this is standard across group trip operators. Here&apos;s exactly how it works.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-raised text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">If you cancel</th>
              <th className="px-5 py-3 font-medium">What you get back</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {tiers.map((t) => (
              <tr key={t.window}>
                <td className="px-5 py-4 font-medium text-ink">{t.window}</td>
                <td className="px-5 py-4 text-muted">{t.refund}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose mt-8 space-y-4 text-sm text-muted">
        <p>
          <strong className="text-ink">If Tripshala cancels a trip</strong> — because of low bookings, weather, or a safety concern — every participant gets a full refund, or the option to move to another trip date, whichever you prefer.
        </p>
        <p>
          <strong className="text-ink">Dropping out after a trip has started</strong> is treated as a no-show — no refund applies, since transport, stay and meals for the full trip have already been arranged and paid for.
        </p>
        <p>
          <strong className="text-ink">Booking as a group?</strong> If some people in your group cancel and others don&apos;t, the cancellation terms above apply individually to each seat that drops out — the trip still runs for everyone continuing.
        </p>
        <p>
          <strong className="text-ink">One free postponement.</strong> If your plans change, you can move your booking to a different upcoming trip once, free of charge. It converts to trip credit valid for 60 days from your original departure date.
        </p>
        <p>
          <strong className="text-ink">Inherent risk.</strong> Activities on Tripshala trips carry inherent risks, and by booking you accept these personally. Any hospital, medical, evacuation or repatriation expenses arising during a trip are the participant&apos;s own responsibility — see the Terms of Use for full details.
        </p>
        <p>
          Have a specific situation not covered here? Message us on WhatsApp and we&apos;ll sort it out directly — most edge cases are easier to resolve as a conversation than to force into a table.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-paper-raised p-6 text-center text-sm">
        <a
          href={whatsappMessages.general()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink underline"
        >
          Ask us about a cancellation on WhatsApp
        </a>
      </div>
    </Container>
  );
}
