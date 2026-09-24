import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { TripCard } from "../TripCard";
import { trips } from "@/lib/trips";
import { upcomingDepartures } from "@/lib/departures";
import { Reveal } from "../motion/Reveal";

export function UpcomingTrips() {
  // Soonest fixed departures first; trips without dates fill the rest.
  const featured = [...trips]
    .sort((a, b) => {
      const da = upcomingDepartures(a)[0]?.start ?? "9999";
      const db = upcomingDepartures(b)[0]?.start ?? "9999";
      return da.localeCompare(db);
    })
    .slice(0, 6);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Upcoming departures</p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">Where are we going next?</h2>
          </div>
          <Link
            href="/trips"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-ink/20 underline-offset-8 transition-colors hover:decoration-accent"
          >
            See all {trips.length} trips
            <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
            Nothing on the calendar yet. But that doesn&apos;t mean you have to stay home —{" "}
            <a className="font-semibold text-accent underline" href="/contact">join the WhatsApp community</a> to hear about the next one first.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featured.map((trip, i) => (
              <Reveal key={trip.id} delay={(i % 3) * 80} className="[&>a]:h-full">
                <TripCard trip={trip} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
