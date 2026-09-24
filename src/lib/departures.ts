import type { CardTrip, Departure } from "./trips";

type Trip = Pick<CardTrip, "departures" | "date">;

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

export function upcomingDepartures(trip: Trip, now: Date = new Date()): Departure[] {
  const today = todayInIndia(now);
  return (trip.departures ?? []).filter((d) => d.start >= today).sort((a, b) => a.start.localeCompare(b.start));
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
