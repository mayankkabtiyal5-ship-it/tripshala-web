"use client";

import { useState } from "react";
import type { ItineraryDay } from "@/lib/trips";

// A day-tabbed vertical timeline, replacing the old plain bulleted list.
// Modeled on the pattern competitor itinerary pages actually use (Bikat
// Adventures' day cards, Much Better Adventures' per-day accordion with a
// stat/icon row) — day switcher up top so a long multi-day trip doesn't
// turn into one long wall of text, and each stop gets an icon inferred
// from its own label so the page reads as a schedule, not a bullet dump.
const ICON_RULES: Array<[RegExp, string]> = [
  [/breakfast|lunch|dinner|meal|coffee|tasting|cuisine/i, "🍽️"],
  [/safari/i, "🐾"],
  [/temple|darshan|shrine|theertham/i, "🛕"],
  [/trek|hike|climb|summit|peak/i, "🥾"],
  [/sunrise|sunset|viewpoint|view point/i, "🌄"],
  [/waterfall|lake|river|backwater|beach|coracle|island/i, "🌊"],
  [/assemble|briefing|pickup point|bike check/i, "🧭"],
  [/depart|board|leave for|drive to/i, "🚐"],
  [/arrive|reach|check.?in/i, "📍"],
  [/bonfire|stargaz|night/i, "🌙"],
  [/free time|leisure|rest/i, "☕"],
];

function iconFor(label: string): string {
  const rule = ICON_RULES.find(([re]) => re.test(label));
  return rule ? rule[1] : "•";
}

export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  const [active, setActive] = useState(0);
  const day = days[active] ?? days[0];

  if (!day) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      {days.length > 1 && (
        <div className="flex flex-wrap gap-2 border-b border-line bg-paper-raised p-3">
          {days.map((d, i) => (
            <button
              key={d.day}
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                i === active ? "border-accent-2 bg-accent-2 text-white" : "border-line bg-white text-ink hover:border-ink"
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>
      )}

      <div className="p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold">
          {days.length > 1 ? `Day ${day.day}: ${day.title}` : day.title}
        </h3>

        <div className="relative mt-5">
          <div aria-hidden className="absolute left-4 top-4 bottom-4 w-0.5 bg-line" />
          <ol className="space-y-5">
            {day.items.map((item, i) => (
              <li key={i} className="relative flex gap-4">
                <span
                  aria-hidden
                  className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-sm"
                >
                  {iconFor(item.label)}
                </span>
                <div className="pt-1">
                  <div className="text-xs font-semibold uppercase tracking-wide text-accent-2">{item.time}</div>
                  <p className="mt-0.5 text-sm text-ink">{item.label}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
