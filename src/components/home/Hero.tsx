import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { PlaceholderMedia } from "../ui/PlaceholderMedia";

export function Hero() {
  return (
    <section className="border-b border-line bg-paper">
      <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            The trip&apos;s planned.
            <br />
            You just have to <span className="text-accent">show up.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Curated bike rides, weekend getaways and 1-2 day escapes from
            Bengaluru. We find the route, the stay and the people — you bring
            yourself.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/trips" variant="primary">
              Explore Upcoming Trips
            </Button>
            <Button href="/community" variant="outline">
              Join the Community
            </Button>
          </div>
        </div>
        <PlaceholderMedia
          label="Riders stopping for chai on a ghat road at sunrise"
          aspect="aspect-[5/4]"
        />
      </Container>
    </section>
  );
}
