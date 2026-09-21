"use client";

import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { PlaceholderMedia } from "../ui/PlaceholderMedia";
import { site } from "@/lib/site";
import { track, AnalyticsEvents } from "@/lib/analytics";

// Manually managed Instagram section — no API dependency, so it never
// breaks if Instagram changes their platform policy. Swap the six
// PlaceholderMedia tiles for real post screenshots/exports periodically.
export function InstagramSection() {
  return (
    <section className="border-b border-line bg-paper-raised py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Follow the road with us.</h2>
            <p className="mt-2 text-muted">@{site.instagramHandle} on Instagram</p>
          </div>
          <Button
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            onClick={() => track(AnalyticsEvents.CLICK_INSTAGRAM, { source: "homepage_section" })}
          >
            Follow @{site.instagramHandle}
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PlaceholderMedia key={i} label={`IG post ${i + 1}`} aspect="aspect-square" />
          ))}
        </div>
      </Container>
    </section>
  );
}
