import type { CardTrip, Departure } from "./trips";

type Trip = Pick<CardTrip, "departures" | "date" | "weekly">;

/** How far ahead recurring weekend batches are listed. */
const WEEKLY_HORIZON_DAYS = 56;

// Helpers for fixed-date departures (Trip.departures). Dates are plain
// "YYYY-MM-DD" strings in India time; a departure stays "upcoming" until the
// end of its start day, so a Thursday-night batch still shows on Thursday.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  // Noon UTC avoids any timezone rollover when reading the weekday.
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return { y, m, d, weekday: WEEKDAYS[date.getUTCDay()], month: MONTHS[m - 1] };
}

/** Today's date in India as YYYY-MM-DD. */
export function todayInIndia(now: Date = new Date()): string {
  const ist = new Date(now.getTime() + 330 * 60 * 1000);
  return ist.toISOString().slice(0, 10);
}

function addDays(iso: string, n: number): string {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function dayOfWeek(iso: string): number {
  return new Date(iso + "T12:00:00Z").getUTCDay();
}

/**
 * Fixed departures (holiday batches) plus the trip's recurring weekend
 * batches for the next few weeks. A generated weekend batch is skipped when a
 * fixed departure already covers that weekend, so holiday dates replace the
 * regular ones rather than doubling up.
 */
export function upcomingDepartures(trip: Trip, now: Date = new Date()): Departure[] {
  const today = todayInIndia(now);
  const fixed = (trip.departures ?? []).filter((d) => d.start >= today);
  const generated: Departure[] = [];
  if (trip.weekly) {
    for (let i = 0; i <= WEEKLY_HORIZON_DAYS; i++) {
      const start = addDays(today, i);
      if (!trip.weekly.startDays.includes(dayOfWeek(start))) continue;
      const covered = (trip.departures ?? []).some(
        (d) => Math.abs(new Date(d.start).getTime() - new Date(start).getTime()) <= 3 * 86_400_000,
      );
      if (covered) continue;
      generated.push({ start, end: addDays(start, trip.weekly.nights) });
    }
  }
  return [...fixed, ...generated].sort((a, b) => a.start.localeCompare(b.start));
}

export function nextDeparture(trip: Trip, now?: Date): Departure | undefined {
  return upcomingDepartures(trip, now)[0];
}

/** "Thu 1 – Sun 4 Oct" / "Fri 2 Oct" / "Thu 29 Oct – Mon 2 Nov" */
export function formatDepartureRange(dep: Departure, withWeekday = true): string {
  const a = parts(dep.start);
  const b = parts(dep.end);
  const wd = (p: ReturnType<typeof parts>) => (withWeekday ? `${p.weekday} ` : "");
  if (dep.start === dep.end) return `${wd(a)}${a.d} ${a.month}`;
  if (a.m === b.m && a.y === b.y) return `${wd(a)}${a.d} – ${wd(b)}${b.d} ${b.month}`;
  return `${wd(a)}${a.d} ${a.month} – ${wd(b)}${b.d} ${b.month}`;
}

/** Short label for cards and messages, e.g. "1–4 Oct · Gandhi Jayanti long weekend". */
export function departureLabel(dep: Departure): string {
  const range = formatDepartureRange(dep, false).replace(" – ", "–");
  return dep.note ? `${range} · ${dep.note}` : range;
}

/** What to show wherever a trip's date appears: the next fixed departure, or the fallback text. */
export function tripDateLabel(trip: Trip, now?: Date): string {
  const next = nextDeparture(trip, now);
  return next ? departureLabel(next) : trip.date;
}

/** True if any upcoming departure starts inside [from, to] (inclusive, YYYY-MM-DD). */
export function departsWithin(trip: Trip, from: string, to: string, now?: Date): boolean {
  return upcomingDepartures(trip, now).some((d) => d.start >= from && d.start <= to);
}
