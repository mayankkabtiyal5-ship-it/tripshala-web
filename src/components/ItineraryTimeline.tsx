import { createElement } from "react";
import {
  BedDouble, Bike, BusFront, ChevronDown, Coffee, Compass, Footprints, Landmark, MapPin, Moon, PawPrint,
  Sparkles, Sunrise, Utensils, Waves,
  type LucideIcon,
} from "lucide-react";
import type { ItineraryDay, ItineraryItem, ItineraryKind, Trip } from "@/lib/trips";

// Day-by-day itinerary, laid out the way travellers already know from the
// big Bengaluru group-trip operators: a numbered accordion per day, the day's
// headline and a few activity tags up top, the plan written out as a short
// story of the day, and a Travel / Stay / Meals strip at the bottom of each
// day. Our version keeps the time of each stop and an Included / On your own
// tag so nothing about the price is ambiguous.
//
// Native <details>, so it works without JavaScript and all text is indexable.

const KIND_ICON: Record<ItineraryKind, LucideIcon> = {
  travel: BusFront,
  meal: Utensils,
  activity: Compass,
  stay: BedDouble,
  free: Coffee,
};

const LABEL_RULES: Array<[RegExp, LucideIcon]> = [
  [/breakfast|lunch|dinner|meal|coffee|tasting|cuisine/i, Utensils],
  [/safari/i, PawPrint],
  [/temple|darshan|shrine|theertham|mutt|peetham/i, Landmark],
  [/trek|hike|climb|summit|peak/i, Footprints],
  [/sunrise|sunset|viewpoint|view point|first light/i, Sunrise],
  [/waterfall|falls|lake|river|backwater|beach|coracle|island|houseboat|kayak/i, Waves],
  [/depart|board|leave for|drive to|arrive|pickup/i, BusFront],
  [/check.?in/i, MapPin],
  [/bonfire|stargaz|night/i, Moon],
];

function iconFor(item: ItineraryItem): LucideIcon {
  if (!item.kind || item.kind === "activity") {
    const rule = LABEL_RULES.find(([re]) => re.test(item.label));
    if (rule) return rule[1];
  }
  return item.kind ? KIND_ICON[item.kind] : Sparkles;
}

// Short activity tags for the day header ("Travel day", "Trek", "Sunset"…),
// inferred from the day's stops.
const TAG_RULES: Array<[RegExp, string]> = [
  [/trek|hike|climb|summit/i, "Trek"],
  [/safari/i, "Safari"],
  [/temple|darshan|shrine|mutt|peetham/i, "Temple visit"],
  [/sunrise|first light/i, "Sunrise"],
  [/sunset|dusk/i, "Sunset"],
  [/coracle|boat|houseboat|kayak|cruise/i, "On the water"],
  [/waterfall|falls/i, "Waterfall"],
  [/estate|plantation|tea|coffee walk/i, "Estate walk"],
  [/heritage|fort|palace|walk through|french quarter|white town/i, "Heritage walk"],
  [/bonfire/i, "Bonfire"],
  [/beach|shore|promenade/i, "Seaside"],
];

function tagsFor(day: ItineraryDay): string[] {
  const text = day.items.map((i) => i.label).join(" · ");
  const tags: string[] = [];
  const first = day.items[0];
  const travelShare = day.items.filter((i) => i.kind === "travel").length / Math.max(day.items.length, 1);
  if (first && /board|depart/i.test(first.label) && Number(first.time.slice(0, 2)) >= 19) tags.push("Overnight travel");
  else if (travelShare >= 0.6) tags.push("Travel day");
  for (const [re, tag] of TAG_RULES) {
    if (tags.length >= 3) break;
    if (re.test(text) && !tags.includes(tag)) tags.push(tag);
  }
  return tags;
}

export function ItineraryTimeline({
  days,
  transport,
}: {
  days: ItineraryDay[];
  transport?: Trip["transport"];
}) {
  if (days.length === 0) return null;

  return (
    <div className="space-y-3">
      {days.map((day, i) => (
        <details
          key={day.day}
          open={i === 0}
          className="group overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow open:shadow-[0_18px_40px_-28px_rgba(28,25,23,0.4)] [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 p-4 sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-raised font-display text-lg text-ink transition-colors group-open:bg-accent group-open:text-white">
              {day.day}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">Day {day.day}</p>
              <h3 className="mt-0.5 font-display text-lg font-medium leading-snug sm:text-xl">{day.title}</h3>
            </div>
            <ChevronDown
              aria-hidden
              size={20}
              strokeWidth={1.5}
              className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"
            />
          </summary>

          <div className="border-t border-line px-4 pb-5 pt-4 sm:px-5 sm:pl-[4.75rem]">
            <DayTags tags={tagsFor(day)} />
            {day.summary && <p className="mt-3 leading-relaxed text-ink/80">{day.summary}</p>}

            <ol className="mt-5 space-y-4">
              {day.items.map((item, j) => (
                <Stop key={j} item={item} />
              ))}
            </ol>

            <DayFooter day={day} transport={transport} />
          </div>
        </details>
      ))}
    </div>
  );
}

function DayTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li key={t} className="rounded-full bg-accent/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent-dark">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Stop({ item }: { item: ItineraryItem }) {
  const icon = createElement(iconFor(item), { "aria-hidden": true, size: 14, strokeWidth: 1.75, className: "text-accent" });
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper-raised">{icon}</span>
      <div className="min-w-0">
        <p className="leading-relaxed text-ink/80">
          <time className="mr-2 text-xs font-semibold tabular-nums text-muted">{item.time}</time>
          <strong className="font-semibold text-ink">
            {item.included === false ? item.label.replace(/\s*\((on your own|pay[- ]your[- ]own|self[- ]sponsored)\)/i, "") : item.label}.
          </strong>{" "}
          {item.detail}
          {item.included === false && (
            <span className="ml-1.5 whitespace-nowrap rounded-full px-2 py-0.5 align-middle text-[0.62rem] font-semibold uppercase tracking-wider text-muted ring-1 ring-line">
              On your own
            </span>
          )}
        </p>
      </div>
    </li>
  );
}

function DayFooter({ day, transport }: { day: ItineraryDay; transport?: Trip["transport"] }) {
  const TravelIcon = transport === "Bike" ? Bike : BusFront;
  const cells: Array<[LucideIcon, string, string, string | undefined]> = [
    [TravelIcon, "Travel", transport ?? "Included", day.stats?.drive],
    [BedDouble, "Stay", day.stats?.stay ?? "Stay not applicable", undefined],
    [Utensils, "Meals", day.stats?.meals ?? "Meals not included", day.stats?.meals ? "Included in your price" : undefined],
  ];
  return (
    <div className="mt-6 grid gap-4 rounded-xl bg-paper-raised/70 p-4 sm:grid-cols-3">
      {cells.map(([Icon, label, value, sub]) => (
        <div key={label} className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
            {createElement(Icon, { "aria-hidden": true, size: 16, strokeWidth: 1.75, className: "text-accent" })}
          </span>
          <div className="min-w-0">
            <div className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">{label}</div>
            <div className="text-sm font-semibold leading-snug text-ink">{value}</div>
            {sub && <div className="mt-0.5 text-xs leading-snug text-muted">{sub}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
