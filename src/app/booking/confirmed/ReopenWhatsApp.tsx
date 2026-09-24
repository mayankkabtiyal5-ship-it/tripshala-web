"use client";

import { useSyncExternalStore } from "react";
import { MessageCircle } from "lucide-react";
import { LAST_BOOKING_KEY } from "@/components/BookingForm";

function readLink(): string | null {
  try {
    const raw = sessionStorage.getItem(LAST_BOOKING_KEY);
    return raw ? (JSON.parse(raw).link as string) : null;
  } catch {
    return null;
  }
}
const subscribe = () => () => {};

// Re-opens the exact pre-filled WhatsApp message from the booking form, or
// falls back to a general enquiry link for this trip.
export function ReopenWhatsApp({ fallback }: { fallback: string }) {
  const stored = useSyncExternalStore(subscribe, readLink, () => null);
  const href = stored ?? fallback;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-95"
    >
      <MessageCircle aria-hidden size={16} /> WhatsApp didn&apos;t open? Tap here
    </a>
  );
}
