"use client";

import { Button } from "./ui/Button";
import { whatsappMessages } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";

export function TripHeroCTAs({
  slug,
  title,
  date,
  disabled,
}: {
  slug: string;
  title: string;
  date: string;
  disabled: boolean;
}) {
  return (
    <div className="mt-6 hidden gap-3 md:flex">
      <Button
        href="#book"
        variant="primary"
        className={disabled ? "pointer-events-none opacity-50" : ""}
        onClick={() => track(AnalyticsEvents.CLICK_BOOK, { trip: slug, source: "hero" })}
      >
        {disabled ? "Booking closed" : "Book Your Spot"}
      </Button>
      <Button
        href={whatsappMessages.tripEnquiry(title, date)}
        target="_blank"
        rel="noopener noreferrer"
        variant="whatsapp"
        onClick={() => track(AnalyticsEvents.CLICK_WHATSAPP, { trip: slug, source: "hero" })}
      >
        WhatsApp Us
      </Button>
    </div>
  );
}
