import { Container } from "../ui/Container";
import { TripPhoto } from "../ui/TripPhoto";
import { Button } from "../ui/Button";

const testimonials = [
  {
    quote: "Had a really fun time with Tripshala. The whole trip was well planned, from the ride and stay to the little things in between. The group vibe made it even better.",
    name: "Ayush Tomar",
  },
  {
    quote: "Loved how effortless the whole trip felt. We just had to show up, ride, explore and enjoy - Tripshala took care of the rest.",
    name: "Muskan",
  },
];

export function CommunityTeaser() {
  return (
    <section className="border-b border-line py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold">The people make the trip.</h2>
          <Button href="/community" variant="outline">See the community</Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <TripPhoto src="/photos/community-lake-group.jpg" alt="Group photo by the lake on a Tripshala trip" />
          <TripPhoto src="/photos/community-bikes-lineup.jpg" alt="Bikes lined up on a Tripshala ride" />
          <TripPhoto src="/photos/community-tea-estate-group.jpg" alt="Group photo at a tea estate stop" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-2xl border border-dashed border-line bg-paper-raised p-6 text-sm italic text-muted">
              &ldquo;{t.quote}&rdquo;
              <footer className="mt-3 not-italic font-medium text-ink">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
