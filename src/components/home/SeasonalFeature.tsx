import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";
import { SeasonalRail } from "./SeasonalRail";
import { trips, toCardTrip } from "@/lib/trips";
import { seasonalFeatures } from "@/lib/seasons";
import { departsWithin, todayInIndia, upcomingDepartures } from "@/lib/departures";

// Order inside the band: long weekends first, then weekend trips, then day
// trips; earliest departure first within each group.
const GROUP_ORDER = ["Long Weekend", "Weekend", "One Day"];
function groupRank(categories: string[]) {
  const i = GROUP_ORDER.findIndex((g) => categories.includes(g));
  return i === -1 ? GROUP_ORDER.length : i;
}

function daysUntil(iso: string) {
  const today = new Date(todayInIndia() + "T00:00:00Z").getTime();
  const target = new Date(iso + "T00:00:00Z").getTime();
  return Math.round((target - today) / 86_400_000);
}

/** The active seasonal feature and its trips, or null when nothing is running. */
export function getActiveSeason() {
  for (const f of seasonalFeatures) {
    const list = trips.filter((t) => departsWithin(t, f.departFrom, f.departTo));
    if (list.length > 0) {
      list.sort((a, b) => {
        const g = groupRank(a.categories) - groupRank(b.categories);
        if (g !== 0) return g;
        return (upcomingDepartures(a)[0]?.start ?? "").localeCompare(upcomingDepartures(b)[0]?.start ?? "");
      });
      return { feature: f, trips: list };
    }
  }
  return null;
}

export function SeasonalFeature() {
  const active = getActiveSeason();
  if (!active) return null;
  const { feature, trips: list } = active;
  const days = daysUntil(feature.departFrom);
  const countdown =
    days > 1 ? `First departures in ${days} days` : days === 1 ? "First departures tomorrow night" : "Departing now — last seats";

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(120%_80%_at_85%_0%,#6b2e15_0%,#2a1a12_45%,#1c1917_100%)] py-20 text-paper md:py-24">
      <Container>
        <Reveal className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="eyebrow !text-[#f3b58f]">{feature.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-[1.08] md:text-5xl">{feature.title}</h2>
          </div>
          <div className="md:pb-1">
            <p className="leading-relaxed text-paper/75">{feature.body}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#f3b58f]">
              <CalendarDays aria-hidden size={14} /> {countdown}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={120}>
          <SeasonalRail trips={list.map(toCardTrip)} />
        </Reveal>

        <div className="mt-6 flex justify-end">
          <Link
            href="/trips"
            className="group inline-flex items-center gap-2 text-sm font-semibold underline decoration-white/25 underline-offset-8 hover:decoration-[#f3b58f]"
          >
            Browse every trip
            <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
