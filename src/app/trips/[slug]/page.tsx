import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { BookingForm } from "@/components/BookingForm";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getTripBySlug, trips } from "@/lib/trips";
import { site } from "@/lib/site";
import { TrackViewTrip } from "@/components/TrackViewTrip";
import { TripHeroCTAs } from "@/components/TripHeroCTAs";
import { ItineraryTimeline } from "@/components/ItineraryTimeline";
import { ItineraryPdfButton } from "@/components/ItineraryPdfButton";
import { TripMoments } from "@/components/TripMoments";
import { WeekendAlerts } from "@/components/WeekendAlerts";
import { Armchair, CalendarDays, Check, ChevronDown, Flag, MapPin, RotateCcw, ShieldCheck, X } from "lucide-react";
import { TripHeroMedia } from "@/components/trip/TripHeroMedia";
import { TripSectionNav } from "@/components/trip/TripSectionNav";
import { PackingList } from "@/components/trip/PackingList";
import { packingListFor } from "@/lib/packing";
import { departureLabel, formatDepartureRange, tripDateLabel, upcomingDepartures } from "@/lib/departures";

// Re-render a few times a day so past departure dates drop off on their own.
export const revalidate = 21600;

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
      // The share image comes from ./opengraph-image.tsx (photo, title, price).
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

  const deps = upcomingDepartures(trip);
  const dateText = tripDateLabel(trip);
  const heroPhotos = trip.coverImage
    ? [{ src: trip.coverImage, alt: trip.coverImageLabel, caption: trip.title }, ...(trip.photos ?? [])]
    : [];
  const sections = [
    { id: "overview", label: "Overview" },
    ...(trip.photos && trip.photos.length > 0 ? [{ id: "photos", label: "Photos" }] : []),
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "What's included" },
    { id: "packing", label: "What to pack" },
    { id: "faqs", label: "FAQs" },
  ];

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
        <Container className="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16">
          {heroPhotos.length > 0 ? (
            <TripHeroMedia photos={heroPhotos} />
          ) : (
            <PlaceholderMedia label={trip.coverImageLabel} title={trip.destination.split(",")[0]} aspect="aspect-[4/3]" />
          )}
          <div>
            <div className="flex flex-wrap gap-2">
              {trip.categories.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.08] md:text-5xl">
              {trip.title}
            </h1>
            <p className="mt-3 inline-flex items-center gap-1.5 text-muted"><MapPin aria-hidden size={15} strokeWidth={1.75} /> Bengaluru to {trip.destination}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <CalendarDays aria-hidden size={15} strokeWidth={1.75} className="text-accent" />
                {dateText}
              </span>
              <span>{trip.duration}</span>
              <span>{trip.transport}</span>
            </div>
            <div className="mt-6 text-3xl font-semibold">
              from ₹{trip.price.toLocaleString("en-IN")}
              <span className="ml-2 text-sm font-normal text-muted">per person</span>
            </div>
            <TripHeroCTAs
              slug={trip.slug}
              title={trip.title}
              date={dateText}
              disabled={trip.bookingStatus === "sold-out" || trip.bookingStatus === "closed"}
            />
          </div>
        </Container>
      </section>

      <TripSectionNav sections={sections} />

      <Container className="grid gap-12 py-12 pb-28 md:grid-cols-3 md:pb-12">
        <div className="space-y-12 md:col-span-2">
          {/* Quick info */}
          <section id="overview" className="scroll-mt-36">
            <h2 className="font-display text-2xl font-medium">Quick info</h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl bg-white p-6 ring-1 ring-line sm:grid-cols-3">
              <QuickInfo label={deps.length > 0 ? "Next departure" : "Date"} value={deps[0] ? formatDepartureRange(deps[0]) : trip.date} />
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
            <h2 className="font-display text-2xl font-medium">About the trip</h2>
            <div className="mt-4 space-y-4 text-muted">
              {trip.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ul className="mt-4 space-y-2">
              {trip.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <Check aria-hidden size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" /> {h}
                </li>
              ))}
            </ul>
          </section>

          {/* From past trips */}
          {trip.photos && trip.photos.length > 0 && (
            <section id="photos" className="scroll-mt-36">
              <p className="eyebrow">From past trips</p>
              <h2 className="mt-2 font-display text-2xl font-medium">What it actually looks like</h2>
              <div className="mt-5">
                <TripMoments photos={trip.photos} />
              </div>
            </section>
          )}

          {/* Itinerary */}
          <section id="itinerary" className="scroll-mt-36">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Day by day</p>
                <h2 className="mt-2 font-display text-2xl font-medium">The itinerary</h2>
              </div>
              <ItineraryPdfButton tripSlug={trip.slug} tripName={trip.title} />
            </div>

            {/* From / To / Mode, then the pickup route in order */}
            <div className="mt-5 overflow-hidden rounded-2xl bg-white ring-1 ring-line">
              <dl className="grid grid-cols-3 divide-x divide-line text-sm">
                <div className="p-4">
                  <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">From</dt>
                  <dd className="mt-1 font-semibold">Bengaluru</dd>
                </div>
                <div className="p-4">
                  <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">To</dt>
                  <dd className="mt-1 font-semibold">Bengaluru</dd>
                </div>
                <div className="p-4">
                  <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">Mode</dt>
                  <dd className="mt-1 font-semibold">
                    {trip.transport} <span className="font-normal text-muted">· Included</span>
                  </dd>
                </div>
              </dl>
              <div className="border-t border-line p-4 text-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <MapPin aria-hidden size={15} strokeWidth={1.75} className="text-accent" />
                  {trip.pickupPoints ? "Pickup points, in order" : "Assembly point"}
                </div>
                {trip.pickupPoints ? (
                  <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                    {trip.pickupPoints.map((p, i) => (
                      <li key={p} className="flex items-center gap-2.5">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-semibold ${
                            i === 0 ? "bg-accent text-white" : "bg-paper-raised text-ink"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="text-ink/85">
                          {p}
                          {i === 0 && <span className="ml-1.5 text-xs font-semibold text-accent">First pickup</span>}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-2 text-muted">{trip.startingPoint}</p>
                )}
                <p className="mt-3 flex items-start gap-2 text-xs text-muted">
                  <Flag aria-hidden size={13} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                  Drop-off: {trip.endingPoint}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <ItineraryTimeline days={trip.itinerary} transport={trip.transport} />
            </div>
          </section>

          {/* Inclusions / exclusions */}
          <section id="inclusions" className="grid scroll-mt-36 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-medium">Included</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {trip.inclusions.map((i) => (
                  <li key={i} className="flex gap-2">
                    <Check aria-hidden size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-accent-2" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium">Not included</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {trip.exclusions.map((i) => (
                  <li key={i} className="flex gap-2">
                    <X aria-hidden size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-muted/70" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* What to pack */}
          <section id="packing" className="scroll-mt-36">
            <p className="eyebrow">Before you go</p>
            <h2 className="mt-2 font-display text-2xl font-medium">What to pack</h2>
            <div className="mt-5">
              <PackingList groups={packingListFor(trip)} />
            </div>
          </section>

          {/* Who is this for */}
          <section>
            <h2 className="font-display text-2xl font-medium">Who is this for?</h2>
            <p className="mt-2 text-sm text-muted">Perfect for:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {trip.whoFor.map((w) => (
                <Badge key={w}>{w}</Badge>
              ))}
            </div>
          </section>

          {/* Not ready yet? */}
          <section className="rounded-2xl bg-paper-raised p-6 sm:p-8">
            <p className="eyebrow">Not ready to book?</p>
            <h2 className="mt-2 font-display text-2xl font-medium">Get next weekend&apos;s trips on WhatsApp</h2>
            <p className="mt-2 text-sm text-muted">One message a week with upcoming dates and seats left.</p>
            <div className="mt-5">
              <WeekendAlerts variant="compact" context={trip.slug} />
            </div>
          </section>

          {/* FAQ */}
          <section id="faqs" className="scroll-mt-36">
            <h2 className="font-display text-2xl font-medium">Frequently asked questions</h2>
            <div className="mt-4">
              <FAQAccordion items={trip.faqs} />
            </div>
          </section>
        </div>

        {/* Booking sidebar */}
        <div id="book" className="h-fit scroll-mt-36 rounded-2xl bg-white p-6 shadow-[0_18px_40px_-24px_rgba(28,25,23,0.35)] ring-1 ring-line md:sticky md:top-32">
          {(() => {
            const left = deps[0]?.seatsLeft ?? trip.seatsLeft;
            const pct = Math.round((1 - left / trip.seatsTotal) * 100);
            return (
              <>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">Book your spot</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <p>
                    {trip.originalPrice && trip.originalPrice > trip.price && (
                      <span className="mr-2 text-sm text-muted line-through">₹{trip.originalPrice.toLocaleString("en-IN")}</span>
                    )}
                    <span className="font-display text-3xl font-medium">₹{trip.price.toLocaleString("en-IN")}</span>
                    <span className="text-sm text-muted"> / person</span>
                  </p>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-ink/80">
                      {left <= 4 ? `Only ${left} seats left` : left < trip.seatsTotal ? `${left} of ${trip.seatsTotal} seats open` : "Seats open"}
                    </span>
                    <span className="text-muted">{trip.seatsTotal}-seat group</span>
                  </div>
                  {left < trip.seatsTotal && (
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-paper-raised">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </div>
              </>
            );
          })()}

          <details className="group mt-4 rounded-xl bg-paper-raised/70 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium">
              What your ₹{trip.price.toLocaleString("en-IN")} covers
              <ChevronDown aria-hidden size={16} className="text-muted transition-transform group-open:rotate-180" />
            </summary>
            <ul className="space-y-1.5 px-4 pb-4 text-sm text-ink/80">
              {trip.inclusions.slice(0, 6).map((inc) => (
                <li key={inc} className="flex items-start gap-2">
                  <Check aria-hidden size={14} strokeWidth={2} className="mt-[3px] shrink-0 text-accent-2" />
                  <span>{inc}</span>
                </li>
              ))}
              <li>
                <a href="#inclusions" className="text-xs font-semibold text-accent underline underline-offset-4">
                  See everything included
                </a>
              </li>
            </ul>
          </details>

          <div className="mt-5">
            <BookingForm
              tripName={trip.title}
              tripDate={dateText}
              tripSlug={trip.slug}
              pickupPoints={trip.pickupPoints}
              departures={deps.slice(0, 8).map((d) => ({ start: d.start, end: d.end, note: d.note, label: departureLabel(d) }))}
              price={trip.price}
              durationLabel={trip.duration.split(" (")[0]}
              isBikeTrip={trip.transport.includes("Bike") || trip.categories.includes("Bike Rides")}
            />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center text-[0.7rem] leading-snug text-muted">
            <div><ShieldCheck aria-hidden size={16} strokeWidth={1.75} className="mx-auto mb-1 text-accent" />Trip captain on board</div>
            <div><Armchair aria-hidden size={16} strokeWidth={1.75} className="mx-auto mb-1 text-accent" />Small group, room to breathe</div>
            <div><RotateCcw aria-hidden size={16} strokeWidth={1.75} className="mx-auto mb-1 text-accent" /><a href="/policies/cancellation" className="underline underline-offset-2">Clear cancellation terms</a></div>
          </div>
        </div>
      </Container>

      <StickyMobileCTA
        trip={{ slug: trip.slug, title: trip.title, date: dateText }}
        disabled={trip.bookingStatus === "sold-out" || trip.bookingStatus === "closed"}
      />
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
