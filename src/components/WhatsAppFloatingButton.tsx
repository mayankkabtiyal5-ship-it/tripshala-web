"use client";

import { usePathname } from "next/navigation";
import { whatsappMessages } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";

export function WhatsAppFloatingButton() {
  const pathname = usePathname();
  // Trip detail pages already have their own sticky WhatsApp CTA —
  // showing both is redundant and crowds the bottom-right corner.
  const hasOwnStickyBar = /^\/trips\/[^/]+$/.test(pathname ?? "");
  if (hasOwnStickyBar) return null;

  return (
    <a
      href={whatsappMessages.general()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(AnalyticsEvents.CLICK_WHATSAPP, { source: "floating_button" })}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg transition-transform hover:scale-105 md:hidden"
      aria-label="Chat with Tripshala on WhatsApp"
    >
      💬
    </a>
  );
}
