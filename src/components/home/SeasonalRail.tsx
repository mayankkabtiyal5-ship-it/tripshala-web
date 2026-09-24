"use client";

import { useMemo, useState } from "react";
import type { CardTrip } from "@/lib/trips";
import { TripCard } from "../TripCard";

const TABS = [
  { key: "all", label: "All trips" },
  { key: "Long Weekend", label: "Long weekends" },
  { key: "Weekend", label: "Weekend trips" },
  { key: "One Day", label: "Day trips" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// Filter chips + a horizontally scrolling rail of trip cards.
export function SeasonalRail({ trips }: { trips: CardTrip[] }) {
  const [tab, setTab] = useState<TabKey>("all");
  const shown = useMemo(
    () => (tab === "all" ? trips : trips.filter((t) => t.categories.includes(tab))),
    [tab, trips],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter long-weekend trips">
        {TABS.map((t) => {
          const count = t.key === "all" ? trips.length : trips.filter((x) => x.categories.includes(t.key)).length;
          if (count === 0) return null;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active ? "bg-paper text-ink" : "bg-white/10 text-paper/80 hover:bg-white/15 hover:text-paper"
              }`}
            >
              {t.label} <span className={active ? "text-muted" : "text-paper/50"}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="rail -mx-4 mt-8 flex gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
        {shown.map((trip) => (
          <div key={trip.id} className="w-[82%] shrink-0 sm:w-[46%] lg:w-[31%] [&>a]:h-full">
            <TripCard trip={trip} />
          </div>
        ))}
      </div>
    </div>
  );
}
