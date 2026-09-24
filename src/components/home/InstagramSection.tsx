"use client";

import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";
import { Button } from "../ui/Button";
import { TripPhoto } from "../ui/TripPhoto";
import { site } from "@/lib/site";
import { track, AnalyticsEvents } from "@/lib/analytics";

// Manually managed Instagram section — no API dependency, so it never
// breaks if Instagram changes their platform policy. Swap these tiles for
// real post screenshots/exports periodically to keep it current.
const posts = [
  { src: "/photos/hampi-stone-chariot-hd.jpg", alt: "Stone chariot at Hampi" },
  { src: "/photos/ig-monastery.jpg", alt: "Golden Temple monastery, Coorg" },
  { src: "/photos/alleppey-lighthouse.jpg", alt: "Alleppey lighthouse stop on a Tripshala trip" },
  { src: "/photos/ig-coracle-hampi.jpg", alt: "Coracle ride on the Tungabhadra, Hampi" },
  { src: "/photos/ig-solo-rider.jpg", alt: "Solo rider on a Tripshala ride" },
  { src: "/photos/ig-aerial-group.jpg", alt: "Group photo from above" },
];

export function InstagramSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">On Instagram</p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">Follow the road with us.</h2>
            <p className="mt-3 text-muted">@{site.instagramHandle} on Instagram</p>
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

        <Reveal className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {posts.map((p) => (
            <TripPhoto key={p.src} src={p.src} alt={p.alt} aspect="aspect-[4/5]" sizes="(max-width: 768px) 50vw, 16vw" />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
