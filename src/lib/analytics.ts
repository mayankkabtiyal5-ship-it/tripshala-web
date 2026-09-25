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
  LINKS_PAGE_CLICK_TRIPS: "links_page_click_trips",
  LINKS_PAGE_CLICK_WHATSAPP_GROUP: "links_page_click_whatsapp_group",
  LINKS_PAGE_CLICK_COMMUNITY: "links_page_click_community",
  LINKS_PAGE_CLICK_ABOUT: "links_page_click_about",
  LINKS_PAGE_CLICK_REFERRAL: "links_page_click_referral",
  LINKS_PAGE_CLICK_FAQ: "links_page_click_faq",
  HIDDEN_GEM_SUGGESTED: "hidden_gem_suggested",
  CLICK_WHATSAPP_CARD: "click_whatsapp_card",
  FILTER_APPLIED: "filter_applied",
  CORPORATE_SCHOOL_FORM_SUBMIT: "corporate_school_form_submit",
  REFERRAL_CODE_GENERATED: "referral_code_generated",
  REFERRAL_LINK_SHARED: "referral_link_shared",
  REFERRAL_LINK_VISIT: "referral_link_visit",
  REFERRAL_BANNER_CLICK: "referral_banner_click",
  REFERRAL_BANNER_DISMISSED: "referral_banner_dismissed",
  ITINERARY_PDF_CLICK: "itinerary_pdf_click",
  ITINERARY_PDF_UNLOCKED: "itinerary_pdf_unlocked",
  PICKUP_POINT_SELECTED: "pickup_point_selected",
  WEEKEND_ALERTS_SIGNUP: "weekend_alerts_signup",
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

/**
 * Standard "lead" conversion, so Google Ads / Meta ads can optimise for real
 * enquiries: GA4's recommended generate_lead event and Meta's standard Lead.
 */
export function trackLead(source: string, value?: number) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "generate_lead", { source, currency: "INR", value });
    window.fbq?.("track", "Lead", { content_name: source, currency: "INR", value });
  } catch {
    // never break the page
  }
}
