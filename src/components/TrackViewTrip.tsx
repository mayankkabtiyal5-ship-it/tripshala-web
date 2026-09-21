"use client";

import { useEffect } from "react";
import { track, AnalyticsEvents } from "@/lib/analytics";

export function TrackViewTrip({ slug }: { slug: string }) {
  useEffect(() => {
    track(AnalyticsEvents.VIEW_TRIP, { trip: slug });
  }, [slug]);
  return null;
}
