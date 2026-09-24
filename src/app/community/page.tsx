import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TripPhoto } from "@/components/ui/TripPhoto";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { trips } from "@/lib/trips";
import { TripCard } from "@/components/TripCard";

export const metadata: Metadata = {
  title: "Community",
  description: "Rider stories, trip photos and testimonials from the Tripshala community.",
};

const testimonials = [
  {
    quote: "Had a really fun time with Tripshala. The whole trip was well planned, from the ride and stay to the little things in between. The group vibe made it even better.",
    name: "Ayush Tomar",
  },
  {
    quote: "I honestly didn't expect the trip to be this much fun. Great roads, a really nice group and everything was taken care of without making it feel too organised.",
    name: "Rishabh Singh",
  },
  {
    quote: "Went in with a few friends and came back with some great memories. The planning was smooth and the overall vibe of the trip was exactly what a weekend getaway should be.",
    name: "Mohit Kukreti",
  },
  {
    quote: "Loved how effortless the whole trip felt. We just had to show up, ride, explore and enjoy - Tripshala took care of the rest.",
    name: "Muskan",
  },
];

const galleryPhotos = [
  { src: "/photos/gallery-riders-lineup.jpg", alt: "Riders lined up before the climb" },
  { src: "/photos/gallery-group-rocks.jpg", alt: "Group on the rocks at Savandurga" },
  { src: "/photos/gallery-coracle-hampi-2.jpg", alt: "Coracle ride on the Tungabhadra, Hampi" },
  { src: "/photos/gallery-hut-stay-hampi.jpg", alt: "Hut stay near Hampi" },
  { src: "/photos/gallery-foggy-trek.jpg", alt: "Foggy trek to the top" },
  { src: "/photos/gallery-jeep-safari.jpg", alt: "Jeep safari through the hills" },
  { src: "/photos/gallery-boat-backwaters.jpg", alt: "Boat ride through the backwaters" },
  { src: "/photos/gallery-monastery-group.jpg", alt: "Golden Temple monastery stop" },
];

export default function CommunityPage() {
  return (
    <Container className="py-14">
      <h1 className="font-display text-4xl font-medium">The Tripshala Community</h1>
      <p className="mt-3 max-w-xl text-muted">
        Riders, non-riders, solo travellers and friend groups — the people
        who keep showing up are the actual reason this works.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium">Trip photos</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {galleryPhotos.map((p) => (
            <TripPhoto key={p.src} src={p.src} alt={p.alt} aspect="aspect-square" sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-medium">What people say</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-2xl border border-dashed border-line bg-paper-raised p-6 text-sm italic text-muted">
              &ldquo;{t.quote}&rdquo;
              <footer className="mt-3 not-italic font-medium text-ink">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-medium">Community milestones</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <Milestone number="5" label="trips hosted" />
          <Milestone number="57" label="riders &amp; travellers so far" />
          <Milestone number="5" label="places explored — Coorg, Kochi-Alleppey, Munnar, Mekedatu Gorge &amp; Kailasagiri" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-medium">Follow along</h2>
        <p className="mt-2 text-muted">@{site.instagramHandle} on Instagram</p>
        <div className="mt-4">
          <Button href={site.instagramUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
            Follow @{site.instagramHandle}
          </Button>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-medium">Join the next one</h2>
          <Button href="/trips" variant="primary">See upcoming trips</Button>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.slice(0, 3).map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>
    </Container>
  );
}

function Milestone({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line p-6 text-center">
      <div className="font-display text-3xl font-medium text-accent">{number}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
