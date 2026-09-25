import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { TripFilters } from "@/components/TripFilters";
import { trips, toCardTrip } from "@/lib/trips";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Weekend Trips from Bengaluru — Upcoming Departures",
  description:
    "Weekend trips, bike rides and 1-2 day escapes from Bengaluru — filter by ride type, duration or theme.",
};

export default function TripsPage() {
  return (
    <Container className="py-12">
      <p className="eyebrow">{trips.length} trips from Bengaluru</p>
      <h1 className="mt-3 font-display text-5xl font-medium leading-[1.05]">Upcoming trips</h1>
      <p className="mt-3 max-w-xl text-muted">
        Every trip below is planned end to end — route, stay and stops. Filter
        by how you want to travel this weekend.
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <TripFilters trips={trips.map(toCardTrip)} />
        </Suspense>
      </div>
    </Container>
  );
}
