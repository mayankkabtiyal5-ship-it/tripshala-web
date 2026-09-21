import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
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
    quote: "SAMPLE TESTIMONIAL — replace before launch. e.g. 'I've done four Tripshala trips now. I've met half my current riding group through them.'",
    name: "Sample rider",
  },
  {
    quote: "SAMPLE TESTIMONIAL — replace before launch. e.g. 'First group trip I've done as a solo traveller. Wasn't awkward for even a minute.'",
    name: "Sample traveller",
  },
  {
    quote: "SAMPLE TESTIMONIAL — replace before launch. e.g. 'The Tempo Traveller option meant my non-riding partner could finally come along.'",
    name: "Sample couple",
  },
];

export default function CommunityPage() {
  return (
    <Container className="py-14">
      <h1 className="font-display text-4xl font-extrabold">The Tripshala Community</h1>
      <p className="mt-3 max-w-xl text-muted">
        Riders, non-riders, solo travellers and friend groups — the people
        who keep showing up are the actual reason this works.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">Trip photos</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {[
            "Group at a chai stop",
            "Bikes at a homestay",
            "Sunrise at Nandi Hills",
            "Coorg coffee estate walk",
            "Bonfire evening",
            "Hampi ruins group shot",
            "Tempo Traveller departure",
            "Trek to a waterfall",
          ].map((label) => (
            <PlaceholderMedia key={label} label={label} aspect="aspect-square" />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold">What people say</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-2xl border border-dashed border-line bg-paper-raised p-6 text-sm italic text-muted">
              &ldquo;{t.quote}&rdquo;
              <footer className="mt-3 not-italic font-medium text-ink">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold">Community milestones</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <Milestone number={`${trips.length}+`} label="trips run (sample count)" />
          <Milestone number="SAMPLE" label="riders &amp; travellers so far" />
          <Milestone number="SAMPLE" label="cities visited" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold">Follow along</h2>
        <p className="mt-2 text-muted">@{site.instagramHandle} on Instagram</p>
        <div className="mt-4">
          <Button href={site.instagramUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
            Follow @{site.instagramHandle}
          </Button>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold">Join the next one</h2>
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
      <div className="font-display text-3xl font-extrabold text-accent">{number}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
