import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTripBySlug, trips } from "@/lib/trips";
import { site } from "@/lib/site";
import { PrintButton } from "@/components/PrintButton";

// A clean, print-only view of a trip's itinerary — reached after the
// name+phone capture in ItineraryPdfButton. Rather than a server-rendered
// PDF (an extra dependency on a serverless host), this leans on every
// browser's built-in "Save as PDF" from the print dialog: print:hidden
// (added to Header/Footer/WhatsAppFloatingButton/StickyMobileCTA/
// ReferralBanner) strips the site chrome, leaving just this content.
// Deliberately not gated by the same key as /internal — this page is meant
// to be reached (and its link shared) by anyone who filled the form.

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return {};
  return {
    title: `${trip.title} — Itinerary`,
    robots: { index: false, follow: false },
  };
}

export default async function ItineraryPrintPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 print:px-0 print:py-0">
      <div className="print:hidden mb-6 flex items-center justify-between">
        <Link href={`/trips/${trip.slug}`} className="text-sm text-muted hover:text-ink">
          <ArrowLeft aria-hidden size={14} className="mr-1 inline-block -translate-y-px" />Back to trip page
        </Link>
        <PrintButton />
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-accent-2">{site.name} · Itinerary</p>
      <h1 className="mt-1 font-display text-3xl font-medium">{trip.title}</h1>
      <p className="mt-1 text-muted">
        {trip.destination} · {trip.duration} · {trip.transport}
      </p>

      <div className="mt-6 grid gap-4 rounded-2xl border border-line p-4 text-sm sm:grid-cols-2">
        <div>
          <div className="font-semibold text-ink">Pickup</div>
          {trip.pickupPoints ? (
            <ul className="mt-1 list-disc pl-4 text-muted">
              {trip.pickupPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          ) : (
            <div className="text-muted">{trip.startingPoint}</div>
          )}
        </div>
        <div>
          <div className="font-semibold text-ink">Drop-off</div>
          <div className="text-muted">{trip.endingPoint}</div>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {trip.itinerary.map((day) => (
          <div key={day.day} className="break-inside-avoid">
            <h2 className="font-display text-lg font-medium">
              Day {day.day}: {day.title}
            </h2>
            {day.summary && <p className="mt-1 text-sm text-muted">{day.summary}</p>}
            {day.stats && (
              <p className="mt-1 text-xs text-muted">
                {[day.stats.drive && `Drive: ${day.stats.drive}`, day.stats.stay && `Stay: ${day.stats.stay}`, day.stats.meals && `Included: ${day.stats.meals}`]
                  .filter(Boolean)
                  .join("  ·  ")}
              </p>
            )}
            <ul className="mt-3 space-y-2.5 border-l-2 border-line pl-4 text-sm">
              {day.items.map((item, i) => (
                <li key={i} className="break-inside-avoid">
                  <span className="font-semibold text-accent-2">{item.time}</span>{" "}
                  <span className="font-medium text-ink">{item.label}</span>
                  {item.included === false && <span className="text-xs text-muted"> (on your own)</span>}
                  {item.detail && <div className="text-muted">{item.detail}</div>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-line pt-4 text-xs text-muted">
        <p>
          {site.name} · {site.url} · WhatsApp +{site.whatsappNumber}
        </p>
        <p className="mt-1">Questions or changes to this plan? Message us on WhatsApp any time.</p>
      </div>
    </div>
  );
}
