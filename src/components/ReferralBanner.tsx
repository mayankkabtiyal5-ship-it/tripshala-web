"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ArrowRight, X } from "lucide-react";
import { Container } from "./ui/Container";
import { track, AnalyticsEvents } from "@/lib/analytics";

// A slim, site-wide announcement bar for the referral program — the
// feature otherwise has no visible entry point unless a visitor happens
// to scroll to the footer or already knows the /referral URL. Dismissing
// it is remembered per-browser (localStorage) so it doesn't nag returning
// visitors.
//
// Visibility is read via useSyncExternalStore rather than
// useState+useEffect: localStorage doesn't exist on the server, so
// getServerSnapshot always reports "visible", which is also what the
// client uses for its first (hydration) render — server and client agree
// on that first paint, then React swaps in the real client-only value
// right after. This avoids both a hydration mismatch and a synchronous
// setState-in-effect (see the same tradeoff called out in
// TripFilters.tsx / BookingForm.tsx).
const DISMISS_KEY = "tripshala_referral_banner_dismissed";

let listeners: Array<() => void> = [];
function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
function getSnapshot() {
  try {
    return localStorage.getItem(DISMISS_KEY) !== "1";
  } catch {
    return true;
  }
}
function getServerSnapshot() {
  return true;
}
function dismissBanner() {
  try {
    localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // Ignore — worst case it just reappears next visit.
  }
  listeners.forEach((l) => l());
}

export function ReferralBanner() {
  const pathname = usePathname();
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function dismiss() {
    track(AnalyticsEvents.REFERRAL_BANNER_DISMISSED);
    dismissBanner();
  }

  // Redundant on the referral page itself and the internal dashboard. Also
  // kept off the homepage so the first impression is the brand, not a
  // promo — the referral programme is still linked from the footer.
  if (!visible || pathname === "/" || pathname?.startsWith("/referral") || pathname?.startsWith("/internal")) {
    return null;
  }

  return (
    <div className="print:hidden relative bg-ink text-paper">
      <Container className="flex items-center justify-center py-2.5 pr-9 pl-4 text-center">
        <Link
          href="/referral"
          onClick={() => track(AnalyticsEvents.REFERRAL_BANNER_CLICK)}
          className="text-[0.8125rem] font-medium leading-snug tracking-wide"
        >
          Refer a friend and earn <span className="underline decoration-white/40 underline-offset-4">₹299 credit</span>
          <ArrowRight aria-hidden size={14} className="ml-1.5 inline-block -translate-y-px" />
        </Link>
      </Container>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={dismiss}
        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white sm:right-4"
      >
        <X size={14} />
      </button>
    </div>
  );
}
