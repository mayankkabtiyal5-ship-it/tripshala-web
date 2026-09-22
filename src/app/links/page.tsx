import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LinksPageContent } from "./LinksPageContent";

// This page exists for one reason: Instagram (and most social profiles)
// only allow a single bio link. Rather than forcing a choice between
// "send people to the website" and "send people to the WhatsApp
// community", this page gives both a home — it's the one link in the
// Instagram bio (see CONTENT_CHECKLIST.md / DEPLOYMENT.md for where to
// update that if this page's own URL ever changes).

export const metadata: Metadata = {
  title: "Links",
  description: `${site.name} — trips, booking and community, all in one place.`,
  // This page is a bio-link utility for social profiles, not content
  // meant to rank on its own — keeping it out of search results avoids it
  // competing with the homepage/trip pages for the same queries.
  robots: { index: false, follow: true },
};

export default function LinksPage() {
  return <LinksPageContent />;
}
