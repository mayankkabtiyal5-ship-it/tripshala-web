"use client";

import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { TripPhoto } from "../ui/TripPhoto";
import { site } from "@/lib/site";
import { track, AnalyticsEvents } from "@/lib/analytics";

// Manually managed Instagram section — no API dependency, so it never
// breaks if Instagram changes their platform policy. Swap these tiles for
// real post screenshots/exports periodically to keep it current.
const posts = [
  { src: "/photos/ig-hampi-chariot.jpg", alt: "Stone chariot at Hampi" },
  { src: "/photos/ig-monastery.jpg", alt: "Golden Temple monastery, Coorg" },
  { src: "/photos/ig-lighthouse.jpg", alt: "Lighthouse stop on a Tripshala trip" },
  { src: "/photos/ig-coracle-hampi.jpg", alt: "Coracle ride on the Tungabhadra, Hampi" },
  { src: "/photos/ig-solo-rider.jpg", alt: "Solo rider on a Tripshala ride" },
  { src: "/photos/ig-aerial-group.jpg", alt: "Group photo from above" },
];

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
          {posts.map((p) => (
            <TripPhoto key={p.src} src={p.src} alt={p.alt} aspect="aspect-square" sizes="(max-width: 768px) 50vw, 16vw" />
          ))}
        </div>
      </Container>
    </section>
  );
}
