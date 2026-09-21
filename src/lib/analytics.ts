// Thin analytics wrapper. Safe to call anywhere — no-ops if GA4/Meta Pixel
// haven't loaded (e.g. in development, or before env vars are set).
//
// SETUP (see DEPLOYMENT.md):
// 1. Set NEXT_PUBLIC_GA_ID in your Vercel project's environment variables.
// 2. Set NEXT_PUBLIC_FB_PIXEL_ID the same way.
// Both are wired up in src/app/layout.tsx via <Analytics />.

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// Named events used across the site — keep this list as the single source
// of truth for what's being tracked.
export const AnalyticsEvents = {
  PAGE_VIEW: "page_view",
  VIEW_TRIP: "view_trip",
  CLICK_WHATSAPP: "click_whatsapp",
  CLICK_BOOK: "click_book",
  FORM_START: "form_start",
  FORM_SUBMIT: "form_submit",
  REFERRAL_CODE_ENTERED: "referral_code_entered",
  CLICK_INSTAGRAM: "click_instagram",
} as const;

export function track(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", eventName, params);
    window.fbq?.("trackCustom", eventName, params);
  } catch {
    // analytics should never break the page
  }
}
