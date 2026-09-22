import Link from "next/link";
import { Trip } from "@/lib/trips";
import { PlaceholderMedia } from "./ui/PlaceholderMedia";
import { TripPhoto } from "./ui/TripPhoto";
import { Badge } from "./ui/Badge";

const statusLabel: Record<Trip["bookingStatus"], { text: string; tone: "success" | "warning" | "default" }> = {
  open: { text: "Open", tone: "success" },
  "few-left": { text: "Few seats left", tone: "warning" },
  "sold-out": { text: "Sold out", tone: "default" },
  closed: { text: "Booking closed", tone: "default" },
};

export function TripCard({ trip }: { trip: Trip }) {
  const status = statusLabel[trip.bookingStatus];

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg"
    >
      {trip.coverImage ? (
        <TripPhoto
          src={trip.coverImage}
          alt={trip.coverImageLabel}
          aspect="aspect-[4/3]"
          className="rounded-none rounded-t-2xl border-0 border-b border-line"
        />
      ) : (
        <PlaceholderMedia label={trip.coverImageLabel} aspect="aspect-[4/3]" className="rounded-none rounded-t-2xl border-0 border-b border-line" />
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {trip.categories.slice(0, 2).map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold leading-snug group-hover:text-accent">
          {trip.title}
        </h3>
        <p className="text-sm text-muted">📍 Bengaluru → {trip.destination}</p>

        {trip.highlights.length > 0 && (
          <ul className="flex flex-col gap-1">
            {trip.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex items-start gap-1.5 text-sm text-ink/80">
                <span className="mt-0.5 text-accent-2">✓</span>
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span>🕐 {trip.duration}</span>
          <span>🚐 {trip.transport}</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex flex-col gap-1">
            <Badge tone={status.tone}>{status.text}</Badge>
            <span className="text-xs text-muted">{trip.date}</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted">From</div>
            <div className="text-lg font-bold text-ink">₹{trip.price.toLocaleString("en-IN")}</div>
            <div className="text-xs text-muted">per person</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
