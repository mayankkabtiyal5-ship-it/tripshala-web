import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { TripPhoto } from "@/components/ui/TripPhoto";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { BookingForm } from "@/components/BookingForm";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getTripBySlug, trips } from "@/lib/trips";
import { site } from "@/lib/site";
import { TrackViewTrip } from "@/components/TrackViewTrip";
import { TripHeroCTAs } from "@/components/TripHeroCTAs";
import { ItineraryTimeline } from "@/components/ItineraryTimeline";
import { ItineraryPdfButton } from "@/components/ItineraryPdfButton";

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
  const keywordTitle = `${trip.title} — ${trip.destination} from Bengaluru`;
  const keywordDescription = `${trip.description[0]} ${trip.duration} · ${trip.transport} · from ₹${trip.price.toLocaleString("en-IN")} per person.`;
  return {
    title: keywordTitle,
    description: keywordDescription,
    openGraph: {
      title: `${keywordTitle} | ${site.name}`,
      description: keywordDescription,
      images: trip.coverImage ? [trip.coverImage] : undefined,
    },
  };
}

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.title,
    description: trip.description[0],
    touristType: trip.whoFor,
    itinerary: trip.itinerary.map((day) => ({
      "@type": "Trip",
      name: day.title,
    })),
    offers: {
      "@type": "Offer",
      price: trip.price,
      priceCurrency: "INR",
      availability:
        trip.bookingStatus === "sold-out" || trip.bookingStatus === "closed"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: trip.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <TrackViewTrip slug={trip.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="border-b border-line bg-paper-raised">
        <Container className="grid gap-8 py-10 md:grid-cols-2 md:py-14">
          {trip.coverImage ? (
            <TripPhoto src={trip.coverImage} alt={trip.coverImageLabel} aspect="aspect-[4/3]" priority />
          ) : (
            <PlaceholderMedia label={trip.coverImageLabel} aspect="aspect-[4/3]" />
          )}
          <div>
            <div className="flex flex-wrap gap-2">
              {trip.categories.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl">
              {trip.title}
            </h1>
            <p className="mt-2 text-muted">📍 Bengaluru → {trip.destination}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="font-semibold">{trip.date}</span>
              <span>{trip.duration}</span>
              <span>{trip.transport}</span>
            </div>
            <div className="mt-4 text-2xl font-bold">
              from ₹{trip.price.toLocaleString("en-IN")}
              <span className="ml-2 text-sm font-normal text-muted">per person</span>
            </div>
            <TripHeroCTAs
              slug={trip.slug}
              title={trip.title}
              date={trip.date}
              disabled={trip.bookingStatus === "sold-out" || trip.bookingStatus === "closed"}
            />
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 pb-28 md:grid-cols-3 md:pb-12">
        <div className="space-y-12 md:col-span-2">
          {/* Quick info */}
          <section>
            <h2 className="font-display text-2xl font-bold">Quick info</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border border-line p-5 sm:grid-cols-3">
              <QuickInfo label="Date" value={trip.date} />
              <QuickInfo label="Duration" value={trip.duration} />
              <QuickInfo label="Starting point" value={trip.startingPoint} />
              <QuickInfo label="Ending point" value={trip.endingPoint} />
              <QuickInfo label="Transport" value={trip.transport} />
              <QuickInfo label="Group size" value={`${trip.seatsTotal} max`} />
              <QuickInfo label="Difficulty" value={trip.difficulty} />
              <QuickInfo label="Stay" value={trip.stay} />
              <QuickInfo label="Food" value={trip.food} />
              <QuickInfo label="Price" value={`₹${trip.price.toLocaleString("en-IN")}`} />
            </dl>
          </section>

          {/* About */}
          <section>
            <h2 className="font-display text-2xl font-bold">About the trip</h2>
            <div className="mt-4 space-y-4 text-muted">
              {trip.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ul className="mt-4 space-y-2">
              {trip.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm">
                  <span className="text-accent">✓</span> {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Itinerary */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-bold">Itinerary</h2>
              <ItineraryPdfButton tripSlug={trip.slug} tripName={trip.title} />
            </div>

            <div className="mt-4 grid gap-3 rounded-2xl bg-paper-raised p-4 text-sm sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <span aria-hidden>📍</span>
                <div>
                  <div className="font-semibold text-ink">Pickup</div>
                  {trip.pickupPoints ? (
                    <>
                      <div className="text-muted">Pick whichever zone is closest to you:</div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {trip.pickupPoints.map((p) => (
                          <span
                            key={p}
                            className="rounded-full border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-muted">{trip.startingPoint}</div>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span aria-hidden>🏁</span>
                <div>
                  <div className="font-semibold text-ink">Drop-off</div>
                  <div className="text-muted">{trip.endingPoint}</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <ItineraryTimeline days={trip.itinerary} />
            </div>
          </section>

          {/* Inclusions / exclusions */}
          <section className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold">Included</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {trip.inclusions.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-2">✓</span> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">Not included</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {trip.exclusions.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-muted">✕</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Who is this for */}
          <section>
            <h2 className="font-display text-2xl font-bold">Who is this for?</h2>
            <p className="mt-2 text-sm text-muted">Perfect for:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {trip.whoFor.map((w) => (
                <Badge key={w}>{w}</Badge>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-4">
              <FAQAccordion items={trip.faqs} />
            </div>
          </section>
        </div>

        {/* Booking sidebar */}
        <div id="book" className="h-fit scroll-mt-20 rounded-2xl border border-line bg-white p-6 md:sticky md:top-24">
          <h2 className="font-display text-xl font-bold">Book your spot</h2>
          <p className="mt-1 text-sm text-muted">
            {trip.seatsLeft} of {trip.seatsTotal} seats left · {trip.bookingStatus === "sold-out" ? "Sold out" : "Booking open"}
          </p>
          <div className="mt-4">
            <BookingForm
              tripName={trip.title}
              tripDate={trip.date}
              tripSlug={trip.slug}
              pickupPoints={trip.pickupPoints}
            />
          </div>
        </div>
      </Container>

      <StickyMobileCTA trip={trip} />
    </>
  );
}

function QuickInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium">{value}</dd>
    </div>
  );
}
