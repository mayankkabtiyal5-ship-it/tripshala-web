import { Container } from "../ui/Container";
import { TripPhoto } from "../ui/TripPhoto";

export function BikeOrNot() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <TripPhoto
          src="/photos/bike-or-tempo-group.jpg"
          alt="Riders and the Tempo Traveller group together at the same stop"
          aspect="aspect-[4/5]"
          className="md:order-2"
        />
        <div className="md:order-1">
          <p className="eyebrow">Two ways to travel</p>
          <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">
            Bring your bike. <em className="italic text-accent">Or just bring yourself.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Some trips are built around the ride. Others run as road trips in a
            Tempo Traveller or coach — smaller groups get a Tempo, larger ones a
            bus. Either way, the destination is the point.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Every listing says exactly how you&apos;ll travel, so there&apos;s never a
            surprise at the pickup point.
          </p>
        </div>
      </Container>
    </section>
  );
}
