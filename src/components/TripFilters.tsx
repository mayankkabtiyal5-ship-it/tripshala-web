"use client";

import { useMemo, useState } from "react";
import { ALL_CATEGORIES, Trip, TripCategory } from "@/lib/trips";
import { TripCard } from "./TripCard";

export function TripFilters({ trips }: { trips: Trip[] }) {
  const [active, setActive] = useState<TripCategory | "All">("All");

  const filtered = useMemo(() => {
    if (active === "All") return trips;
    return trips.filter((t) => t.categories.includes(active));
  }, [trips, active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("All")}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            active === "All" ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"
          }`}
        >
          All
        </button>
        {ALL_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === c ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          Looks like we&apos;re between adventures in this category. Check back soon, or explore another one above.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}
