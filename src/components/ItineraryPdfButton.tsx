"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { track, AnalyticsEvents } from "@/lib/analytics";

// Gates the downloadable itinerary behind a quick name+phone capture (the
// same idea as escape2explore's PDF download, but as a lead source rather
// than a plain file link). "Download" here means: submit once, then land
// on a clean print-ready page (/trips/[slug]/itinerary) that opens the
// browser's native "Save as PDF" — no PDF-rendering dependency needed.
//
// The lead is deduped server-side by phone + trip + source (see
// /api/leads), and the browser also remembers it's unlocked so a returning
// visitor on the same device skips straight to the print page.
const STORAGE_PREFIX = "tripshala_itinerary_pdf_";

function isUnlocked(tripSlug: string): boolean {
  try {
    return localStorage.getItem(STORAGE_PREFIX + tripSlug) === "1";
  } catch {
    return false;
  }
}

function markUnlocked(tripSlug: string) {
  try {
    localStorage.setItem(STORAGE_PREFIX + tripSlug, "1");
  } catch {
    // Ignore — worst case the form shows again next time.
  }
}

export function ItineraryPdfButton({ tripSlug, tripName }: { tripSlug: string; tripName: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function goToPrintPage() {
    router.push(`/trips/${tripSlug}/itinerary`);
  }

  function handleClick() {
    track(AnalyticsEvents.ITINERARY_PDF_CLICK, { trip: tripName });
    if (isUnlocked(tripSlug)) {
      goToPrintPage();
      return;
    }
    setOpen(true);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    if (!name || !phone) return;

    // Fire-and-forget with keepalive, same pattern as the booking form —
    // never make the visitor wait on the network for their PDF.
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripSlug,
          tripName,
          name,
          phone,
          source: "pdf_itinerary_download",
          message: "Requested the downloadable itinerary",
          dedupe: true,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Ignore — never block the download over this.
    }

    markUnlocked(tripSlug);
    track(AnalyticsEvents.ITINERARY_PDF_UNLOCKED, { trip: tripName });
    goToPrintPage();
  }

  if (open) {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper-raised p-2.5"
      >
        <input
          name="name"
          required
          placeholder="Your name"
          className="w-32 rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-accent"
        />
        <input
          name="phone"
          type="tel"
          required
          placeholder="Phone"
          className="w-28 rounded-lg border border-line bg-white px-3 py-2 text-xs outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Get PDF
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-1.5 rounded-xl border border-line px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink"
    >
      📄 Download itinerary (PDF)
    </button>
  );
}
