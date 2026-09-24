import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, ClipboardList, MapPin, MessageCircle, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TripPhoto } from "@/components/ui/TripPhoto";
import { getTripBySlug } from "@/lib/trips";
import { whatsappMessages } from "@/lib/whatsapp";
import { ReopenWhatsApp } from "./ReopenWhatsApp";

export const metadata: Metadata = {
  title: "You're almost in",
  robots: { index: false, follow: false },
};

const steps = [
  {
    icon: MessageCircle,
    title: "Send the WhatsApp message",
    body: "We've opened WhatsApp with your details filled in. Hit send so we have them.",
  },
  {
    icon: CheckCircle2,
    title: "We confirm your seat",
    body: "A real person from the team replies, usually within a few hours, with seat availability and how to pay.",
  },
  {
    icon: Users,
    title: "You join the trip group",
    body: "Once you're confirmed, we add you to the trip's WhatsApp group with your trip captain and fellow travellers.",
  },
  {
    icon: MapPin,
    title: "Pickup details the day before",
    body: "Exact pickup spot, timing and live location are shared in the group about 24 hours before departure.",
  },
];

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ trip?: string; date?: string; name?: string }>;
}) {
  const { trip: slug, date, name } = await searchParams;
  const trip = slug ? getTripBySlug(slug) : undefined;
  const firstName = name?.trim().slice(0, 30);
  const fallback = trip ? whatsappMessages.tripEnquiry(trip.title, date ?? trip.date) : whatsappMessages.tripEnquiry("a Tripshala trip", date ?? "");

  return (
    <Container className="py-14 md:py-20">
      <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div>
          <p className="eyebrow rise-in">Request received</p>
          <h1 className="rise-in rise-in-delay-1 mt-4 font-display text-5xl font-medium leading-[1.05] md:text-6xl">
            You&apos;re almost in{firstName ? `, ${firstName}` : ""}.
          </h1>
          <p className="rise-in rise-in-delay-2 mt-5 max-w-lg text-lg leading-relaxed text-muted">
            Nothing has been charged. Here&apos;s what happens next.
          </p>

          <ol className="mt-10 space-y-6">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="rise-in flex gap-4" style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-raised">
                  <Icon aria-hidden size={18} strokeWidth={1.75} className="text-accent" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Step {i + 1}</p>
                  <h2 className="mt-0.5 font-sans text-lg font-semibold">{title}</h2>
                  <p className="mt-1 leading-relaxed text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <ReopenWhatsApp fallback={fallback} />
            <Link
              href="/trips"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold hover:border-ink/60"
            >
              <ArrowLeft aria-hidden size={16} /> Keep browsing
            </Link>
          </div>
        </div>

        {trip && (
          <aside className="h-fit overflow-hidden rounded-2xl bg-white ring-1 ring-line">
            {trip.coverImage && <TripPhoto src={trip.coverImage} alt={trip.coverImageLabel} className="rounded-none" />}
            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Your trip</p>
              <h2 className="mt-1 font-display text-2xl font-medium">{trip.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-ink/80">
                {date && (
                  <li className="flex items-start gap-2">
                    <CalendarDays aria-hidden size={15} className="mt-0.5 shrink-0 text-accent" /> {date}
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <MapPin aria-hidden size={15} className="mt-0.5 shrink-0 text-accent" /> Bengaluru to {trip.destination}
                </li>
              </ul>
              <Link
                href={`/trips/${trip.slug}#packing`}
                className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-paper-raised px-4 py-3 text-sm font-semibold transition-colors hover:bg-[#ebe3d4]"
              >
                <span className="inline-flex items-center gap-2">
                  <ClipboardList aria-hidden size={16} className="text-accent" /> Start your packing list
                </span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </aside>
        )}
      </div>
    </Container>
  );
}
