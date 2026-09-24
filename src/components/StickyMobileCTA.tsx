"use client";

import { Trip } from "@/lib/trips";
import { whatsappMessages } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";

export function StickyMobileCTA({ trip }: { trip: Trip }) {
  const disabled = trip.bookingStatus === "sold-out" || trip.bookingStatus === "closed";

  return (
    <div className="print:hidden fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-paper/95 p-3 backdrop-blur md:hidden">
      <a
        href={`#book`}
        onClick={() => track(AnalyticsEvents.CLICK_BOOK, { trip: trip.slug, source: "sticky_mobile" })}
        className={`flex-1 rounded-full px-4 py-3 text-center text-sm font-semibold text-white ${
          disabled ? "pointer-events-none bg-muted" : "bg-accent"
        }`}
      >
        {disabled ? "Booking closed" : "Book Your Spot"}
      </a>
      <a
        href={whatsappMessages.tripEnquiry(trip.title, trip.date)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track(AnalyticsEvents.CLICK_WHATSAPP, { trip: trip.slug, source: "sticky_mobile" })}
        className="flex-1 rounded-full bg-[#25D366] px-4 py-3 text-center text-sm font-semibold text-white"
      >
        WhatsApp Us
      </a>
    </div>
  );
}
