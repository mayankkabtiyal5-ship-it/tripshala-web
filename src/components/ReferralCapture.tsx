"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { storeReferralCode } from "@/lib/referral";
import { track, AnalyticsEvents } from "@/lib/analytics";

// Site-wide: catches ?ref=CODE on whatever page a shared referral link
// lands on (not just /trips), remembers it in the visitor's browser, and
// gets out of the way. BookingForm reads it back when the visitor books.
export function ReferralCapture() {
  const searchParams = useSearchParams();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    const ref = searchParams.get("ref");
    if (!ref) return;
    handled.current = true;
    storeReferralCode(ref);
    track(AnalyticsEvents.REFERRAL_LINK_VISIT, { code: ref });
  }, [searchParams]);

  return null;
}
