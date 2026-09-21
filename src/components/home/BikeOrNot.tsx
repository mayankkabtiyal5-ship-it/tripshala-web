import { Container } from "../ui/Container";
import { TripPhoto } from "../ui/TripPhoto";

export function BikeOrNot() {
  return (
    <section className="border-b border-line py-16">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <TripPhoto
          src="/photos/bike-or-tempo-group.jpg"
          alt="Riders and the Tempo Traveller group together at the same stop"
          aspect="aspect-[5/4]"
          className="md:order-2"
        />
        <div className="md:order-1">
          <h2 className="font-display text-3xl font-bold">
            Bring your bike. Or just bring yourself.
          </h2>
          <p className="mt-4 text-muted">
            Some trips are built around riding. Others run as group road
            trips in a Tempo Traveller or bus — small groups get a Tempo,
            bigger ones get a bus. Either way, the destination is the point.
            How you get there is just logistics.
          </p>
          <p className="mt-4 text-muted">
            Every trip listing tells you exactly which mode it uses, so
            there&apos;s never a surprise at the assembly point.
          </p>
        </div>
      </Container>
    </section>
  );
}
