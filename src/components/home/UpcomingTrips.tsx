import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { TripCard } from "../TripCard";
import { trips } from "@/lib/trips";

export function UpcomingTrips() {
  const featured = trips.slice(0, 3);

  return (
    <section className="border-b border-line py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold">Where are we going next?</h2>
          <Button href="/trips" variant="outline">See all trips</Button>
        </div>

        {featured.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
            Nothing on the calendar yet. But that doesn&apos;t mean you have to stay home —{" "}
            <a className="font-semibold text-accent underline" href="/contact">join the WhatsApp community</a> to hear about the next one first.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
