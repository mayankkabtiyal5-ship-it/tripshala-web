import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Bike, BusFront, Check, Clock } from "lucide-react";
import { Trip } from "@/lib/trips";
import { PlaceholderMedia } from "./ui/PlaceholderMedia";

// Premium card: photo-led, one quiet status pill, one price. Urgency and
// discount cues are deliberately understated — a struck-through original
// price still shows when a real discount is running, but there's no loud
// "Save ₹X" badge. WhatsApp enquiries go through the site-wide floating
// button and the trip page itself, rather than a button on every card.
const statusPill: Partial<Record<Trip["bookingStatus"], string>> = {
  "few-left": "Few seats left",
  "sold-out": "Sold out",
  closed: "Booking closed",
};

export function TripCard({ trip }: { trip: Trip }) {
  const pill = statusPill[trip.bookingStatus];
  const hasDiscount = typeof trip.originalPrice === "number" && trip.originalPrice > trip.price;
  const TransportIcon = trip.transport === "Bike" ? Bike : BusFront;

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(28,25,23,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {trip.coverImage ? (
          <Image
            src={trip.coverImage}
            alt={trip.coverImageLabel}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderMedia label={trip.coverImageLabel} aspect="aspect-[4/3]" className="rounded-none border-0" />
        )}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium text-white">
          <span className="tracking-wide">{trip.categories.slice(0, 2).join(" · ")}</span>
          {pill && (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[0.7rem] font-semibold text-ink">{pill}</span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
          {trip.destination.split(",")[0]}
        </p>
        <h3 className="mt-1.5 flex items-start justify-between gap-3 font-display text-xl font-medium leading-snug">
          <span>{trip.title}</span>
          <ArrowUpRight
            aria-hidden
            size={18}
            strokeWidth={1.5}
            className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </h3>

        {trip.highlights.length > 0 && (
          <ul className="mt-3 flex flex-col gap-1.5">
            {trip.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-ink/75">
                <Check aria-hidden size={14} strokeWidth={2} className="mt-[3px] shrink-0 text-accent-2" />
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden size={13} strokeWidth={1.75} /> {trip.duration.split(" (")[0]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <TransportIcon aria-hidden size={13} strokeWidth={1.75} /> {trip.transport}
          </span>
        </div>

        <div className="mt-auto pt-5">
        <div className="flex items-end justify-between border-t border-line pt-4">
          <span className="max-w-[55%] text-xs leading-snug text-muted">{trip.date}</span>
          <div className="text-right">
            <div className="text-[0.7rem] uppercase tracking-wider text-muted">
              From{" "}
              {hasDiscount && (
                <span className="ml-1 normal-case tracking-normal line-through decoration-muted/60">
                  ₹{trip.originalPrice!.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <div className="text-lg font-semibold text-ink">
              ₹{trip.price.toLocaleString("en-IN")}
              <span className="ml-1 text-xs font-normal text-muted">/ person</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Link>
  );
}
