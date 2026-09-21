import Link from "next/link";
import { Trip } from "@/lib/trips";
import { PlaceholderMedia } from "./ui/PlaceholderMedia";
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
      <PlaceholderMedia label={trip.coverImageLabel} aspect="aspect-[4/3]" className="rounded-none rounded-t-2xl border-0 border-b border-line" />
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
        <div className="mt-1 grid grid-cols-2 gap-y-1 text-sm text-ink/80">
          <span>{trip.duration}</span>
          <span>{trip.transport}</span>
          <span className="text-muted">{trip.date}</span>
          <span className="font-semibold text-ink">from ₹{trip.price.toLocaleString("en-IN")}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <Badge tone={status.tone}>{status.text}</Badge>
          <span className="text-sm font-semibold text-accent group-hover:underline">View Trip →</span>
        </div>
      </div>
    </Link>
  );
}
