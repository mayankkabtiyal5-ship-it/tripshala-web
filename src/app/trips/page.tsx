import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TripFilters } from "@/components/TripFilters";
import { trips } from "@/lib/trips";

export const metadata: Metadata = {
  title: "Upcoming Trips",
  description:
    "Weekend trips, bike rides and 1-2 day escapes from Bengaluru — filter by ride type, duration or theme.",
};

export default function TripsPage() {
  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl font-extrabold">Upcoming Trips</h1>
      <p className="mt-3 max-w-xl text-muted">
        Every trip below is planned end to end — route, stay and stops. Filter
        by how you want to travel this weekend.
      </p>

      <div className="mt-8">
        <TripFilters trips={trips} />
      </div>
    </Container>
  );
}
