"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { Trip } from "@/lib/trips";
import { PlaceholderMedia } from "./ui/PlaceholderMedia";
import { TripPhoto } from "./ui/TripPhoto";
import { Badge } from "./ui/Badge";
import { whatsappMessages } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";

const statusLabel: Record<Trip["bookingStatus"], { text: string; tone: "success" | "warning" | "default" }> = {
  open: { text: "Open", tone: "success" },
  "few-left": { text: "Few seats left", tone: "warning" },
  "sold-out": { text: "Sold out", tone: "default" },
  closed: { text: "Booking closed", tone: "default" },
};

export function TripCard({ trip }: { trip: Trip }) {
  const status = statusLabel[trip.bookingStatus];
  const hasDiscount = typeof trip.originalPrice === "number" && trip.originalPrice > trip.price;

  function handleWhatsAppClick(e: MouseEvent) {
    // The button sits on top of the card's own <Link> — stop the click from
    // also triggering navigation to the trip page.
    e.preventDefault();
    e.stopPropagation();
    track(AnalyticsEvents.CLICK_WHATSAPP_CARD, { trip: trip.title });
    window.open(whatsappMessages.tripEnquiry(trip.title, trip.date), "_blank", "noopener,noreferrer");
  }

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative">
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
        <button
          type="button"
          onClick={handleWhatsAppClick}
          aria-label={`Ask about ${trip.title} on WhatsApp`}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 32 32" className="h-[18px] w-[18px] fill-white" aria-hidden="true">
            <path d="M16.01 3C9.38 3 4 8.36 4 14.98c0 2.2.59 4.27 1.62 6.05L4 29l8.2-1.57a13 13 0 0 0 3.81.57h.01c6.63 0 12-5.36 12-11.98C28.02 8.36 22.65 3 16.01 3zm7.1 17.02c-.3.85-1.72 1.62-2.38 1.72-.61.1-1.38.14-2.23-.14-.51-.16-1.17-.38-2.02-.75-3.55-1.54-5.87-5.12-6.05-5.36-.18-.24-1.44-1.92-1.44-3.66 0-1.74.91-2.6 1.24-2.95.32-.35.7-.44.93-.44.24 0 .47 0 .68.01.22.01.51-.08.8.61.3.71 1.02 2.45 1.11 2.63.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.37-.16.73.21.36.94 1.55 2.02 2.51 1.39 1.24 2.56 1.62 2.92 1.8.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.33.12 2.08.98 2.44 1.16.36.18.6.27.69.42.09.15.09.85-.21 1.7z" />
          </svg>
        </button>
      </div>
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
            {hasDiscount ? (
              <div className="flex items-center justify-end gap-1.5">
                <span className="text-xs text-muted line-through">
                  ₹{trip.originalPrice!.toLocaleString("en-IN")}
                </span>
                <Badge tone="success">Save ₹{(trip.originalPrice! - trip.price).toLocaleString("en-IN")}</Badge>
              </div>
            ) : null}
            <div className="text-lg font-bold text-ink">₹{trip.price.toLocaleString("en-IN")}</div>
            <div className="text-xs text-muted">per person</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
