"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";

const secondaryLinks = [
  { label: "Instagram", href: site.instagramUrl },
  { label: "Facebook", href: site.facebookUrl },
  { label: "WhatsApp us directly", href: whatsappMessages.general() },
];

// More ways to explore the community/brand beyond the two main CTAs —
// gives people who land here from the Instagram/Facebook bio something to
// discover besides just "book a trip" or "join the group".
const discoverLinks = [
  {
    label: "Trip photos & stories",
    href: "/community",
    event: AnalyticsEvents.LINKS_PAGE_CLICK_COMMUNITY,
  },
  {
    label: "Why Tripshala exists",
    href: "/about",
    event: AnalyticsEvents.LINKS_PAGE_CLICK_ABOUT,
  },
  {
    label: "Refer a friend, get credit",
    href: "/referral",
    event: AnalyticsEvents.LINKS_PAGE_CLICK_REFERRAL,
  },
  {
    label: "Got questions?",
    href: "/faq",
    event: AnalyticsEvents.LINKS_PAGE_CLICK_FAQ,
  },
];

export function LinksPageContent() {
  return (
    <Container className="flex max-w-md flex-col items-center py-14 text-center">
      <div className="font-display text-2xl font-medium">{site.name}</div>
      <p className="mt-2 text-sm text-muted">
        Bengaluru&apos;s travel and riding community — bike rides, weekend
        getaways and curated trips.
      </p>

      <div className="mt-8 flex w-full flex-col gap-4">
        <Button
          href="/trips"
          variant="primary"
          className="w-full"
          onClick={() => track(AnalyticsEvents.LINKS_PAGE_CLICK_TRIPS)}
        >
          Explore upcoming trips
        </Button>
        <Button
          href={site.whatsappCommunityLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          className="w-full"
          onClick={() => track(AnalyticsEvents.LINKS_PAGE_CLICK_WHATSAPP_GROUP)}
        >
          Join our WhatsApp community
        </Button>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-3">
        {discoverLinks.map((l) => (
          <Button
            key={l.label}
            href={l.href}
            variant="outline"
            className="w-full text-xs sm:text-sm"
            onClick={() => track(l.event)}
          >
            {l.label}
          </Button>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
        {secondaryLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-ink"
          >
            {l.label}
          </a>
        ))}
      </div>
    </Container>
  );
}
