import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TripPhoto } from "@/components/ui/TripPhoto";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { trips } from "@/lib/trips";
import { TripCard } from "@/components/TripCard";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Community",
  description: "Rider stories, trip photos and testimonials from the Tripshala community.",
};

const galleryPhotos = [
  { src: "/photos/munnar-group-lakeside.jpg", alt: "Group by the lake in Munnar" },
  { src: "/photos/hampi-stone-chariot-hd.jpg", alt: "The stone chariot at Vittala Temple, Hampi" },
  { src: "/photos/kochi-mattancherry-group.jpg", alt: "Group on the stairs at Mattancherry Palace, Kochi" },
  { src: "/photos/munnar-mattupetty-boats.jpg", alt: "Boats on Mattupetty lake, Munnar" },
  { src: "/photos/fog-trek-summit.jpg", alt: "Arms open on a fog-covered summit" },
  { src: "/photos/alleppey-lighthouse.jpg", alt: "The Alleppey lighthouse" },
  { src: "/photos/hampi-hut-stay-camp.jpg", alt: "Hut stay near Hampi" },
  { src: "/photos/jatayu-earth-center.jpg", alt: "The Jatayu sculpture against a clear sky" },
  { src: "/photos/rameshwaram-beach-walk.jpg", alt: "A quiet walk on the Rameshwaram shoreline" },
  { src: "/photos/goa-chapel-blue-door.jpg", alt: "A whitewashed chapel with a blue door" },
  { src: "/photos/munnar-tea-slopes.jpg", alt: "Tea slopes under the cliffs in Munnar" },
  { src: "/photos/gallery-riders-lineup.jpg", alt: "Riders lined up before the climb" },
];

export default function CommunityPage() {
  return (
    <Container className="py-14">
      <p className="eyebrow">The community</p>
      <h1 className="mt-4 font-display text-5xl font-medium leading-[1.05] md:text-6xl">The Tripshala Community</h1>
      <p className="mt-3 max-w-xl text-muted">
        Riders, non-riders, solo travellers and friend groups — the people
        who keep showing up are the actual reason this works.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium">Trip photos</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {galleryPhotos.map((p) => (
            <TripPhoto key={p.src} src={p.src} alt={p.alt} aspect="aspect-[4/5]" sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-medium">What people say</h2>
        <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="border-t border-ink/10 pt-6">
              <blockquote className="font-display text-xl font-light leading-snug text-ink/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-muted">{t.name}</figcaption>
            </figure>
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
    <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-line">
      <div className="font-display text-5xl font-light text-accent">{number}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
