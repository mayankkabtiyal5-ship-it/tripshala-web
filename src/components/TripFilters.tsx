"use client";

import { X } from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ALL_CATEGORIES, Trip, TripCategory } from "@/lib/trips";
import { TripCard } from "./TripCard";
import { track, AnalyticsEvents } from "@/lib/analytics";

// Duration-ish tags vs. everything else ("Trip Type") — splits the 14 flat
// category pills into two facets that can be combined (AND), instead of one
// long row of mutually-exclusive pills.
const DURATION_OPTIONS: TripCategory[] = ["One Day", "Weekend", "2 Days", "Long Weekend"];
const TYPE_OPTIONS: TripCategory[] = ALL_CATEGORIES.filter((c) => !DURATION_OPTIONS.includes(c));

const PRICE_BRACKETS = [
  { label: "Under ₹2,000", min: undefined as number | undefined, max: 2000 as number | undefined },
  { label: "₹2,000 – 5,000", min: 2000, max: 5000 },
  { label: "₹5,000 – 8,000", min: 5000, max: 8000 },
  { label: "₹8,000+", min: 8000, max: undefined as number | undefined },
] as const;

type PriceLabel = (typeof PRICE_BRACKETS)[number]["label"];

type FacetKey = "duration" | "type" | "price";

function isTripCategory(value: string | null, options: readonly string[]): value is TripCategory {
  return !!value && (options as string[]).includes(value);
}

function isPriceLabel(value: string | null): value is PriceLabel {
  return !!value && PRICE_BRACKETS.some((b) => b.label === value);
}

export function TripFilters({ trips }: { trips: Trip[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Seed state from the URL on first render (not in an effect — the value
  // is already available synchronously from useSearchParams), so a
  // shared/bookmarked link like /trips?duration=Weekend&type=Trek lands
  // pre-filtered without an extra render pass.
  const [duration, setDuration] = useState<TripCategory | null>(() => {
    const d = searchParams.get("duration");
    return isTripCategory(d, DURATION_OPTIONS) ? d : null;
  });
  const [type, setType] = useState<TripCategory | null>(() => {
    const t = searchParams.get("type");
    return isTripCategory(t, TYPE_OPTIONS) ? t : null;
  });
  const [price, setPrice] = useState<PriceLabel | null>(() => {
    const p = searchParams.get("price");
    return isPriceLabel(p) ? p : null;
  });
  const [openFacet, setOpenFacet] = useState<FacetKey | null>(null);

  // Keep the URL in sync so filters are shareable/bookmarkable and each
  // combination is a distinct, crawlable state of /trips.
  useEffect(() => {
    const params = new URLSearchParams();
    if (duration) params.set("duration", duration);
    if (type) params.set("type", type);
    if (price) params.set("price", price);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [duration, type, price, pathname, router]);

  const priceBracket = useMemo(() => PRICE_BRACKETS.find((b) => b.label === price), [price]);

  const filtered = useMemo(() => {
    return trips.filter((t) => {
      if (duration && !t.categories.includes(duration)) return false;
      if (type && !t.categories.includes(type)) return false;
      if (priceBracket) {
        if (priceBracket.min !== undefined && t.price < priceBracket.min) return false;
        if (priceBracket.max !== undefined && t.price >= priceBracket.max) return false;
      }
      return true;
    });
  }, [trips, duration, type, priceBracket]);

  const hasAny = !!(duration || type || price);

  const toggleFacet = useCallback((key: FacetKey) => {
    setOpenFacet((current) => (current === key ? null : key));
  }, []);

  function pick(key: FacetKey, value: string) {
    if (key === "duration") setDuration((current) => (current === value ? null : (value as TripCategory)));
    if (key === "type") setType((current) => (current === value ? null : (value as TripCategory)));
    if (key === "price") setPrice((current) => (current === value ? null : (value as PriceLabel)));
    setOpenFacet(null);
    track(AnalyticsEvents.FILTER_APPLIED, { facet: key, value });
  }

  function clearAll() {
    setDuration(null);
    setType(null);
    setPrice(null);
    setOpenFacet(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start gap-2">
        <FacetButton
          label="Duration"
          active={duration}
          open={openFacet === "duration"}
          onToggle={() => toggleFacet("duration")}
        />
        <FacetButton label="Trip Type" active={type} open={openFacet === "type"} onToggle={() => toggleFacet("type")} />
        <FacetButton label="Price" active={price} open={openFacet === "price"} onToggle={() => toggleFacet("price")} />
        {hasAny && (
          <button
            type="button"
            onClick={clearAll}
            className="px-2 py-2.5 text-sm font-semibold text-accent hover:text-accent-dark"
          >
            Clear all
          </button>
        )}
      </div>

      {openFacet === "duration" && (
        <FacetPanel options={DURATION_OPTIONS} active={duration} onPick={(v) => pick("duration", v)} />
      )}
      {openFacet === "type" && (
        <FacetPanel options={TYPE_OPTIONS} active={type} onPick={(v) => pick("type", v)} />
      )}
      {openFacet === "price" && (
        <FacetPanel options={PRICE_BRACKETS.map((b) => b.label)} active={price} onPick={(v) => pick("price", v)} />
      )}

      {hasAny && (
        <div className="mt-3 flex flex-wrap gap-2">
          {duration && <Chip label={duration} onRemove={() => setDuration(null)} />}
          {type && <Chip label={type} onRemove={() => setType(null)} />}
          {price && <Chip label={price} onRemove={() => setPrice(null)} />}
        </div>
      )}

      <p className="mt-4 text-sm text-muted">
        {filtered.length} trip{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          Looks like we&apos;re between adventures for that combination. Try clearing a filter, or{" "}
          <a href="/contact" className="font-semibold text-accent underline">
            ask us on WhatsApp
          </a>{" "}
          — we&apos;re always planning something new.
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

function FacetButton({
  label,
  active,
  open,
  onToggle,
}: {
  label: string;
  active: string | null;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
        active ? "border-ink text-ink" : "border-line text-ink/80 hover:border-ink"
      }`}
    >
      {active ?? label}
      <span className="text-xs text-muted">{open ? "▴" : "▾"}</span>
    </button>
  );
}

function FacetPanel({
  options,
  active,
  onPick,
}: {
  options: readonly string[];
  active: string | null;
  onPick: (value: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2 rounded-2xl bg-paper-raised p-3">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onPick(o)}
          className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
            active === o ? "border-ink bg-ink text-paper" : "border-line bg-white text-ink hover:border-ink"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink py-1.5 pl-3.5 pr-2 text-xs font-semibold text-paper">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="flex h-4 w-4 items-center justify-center rounded-full text-paper/70 hover:text-paper"
      >
        <X aria-hidden size={12} />
      </button>
    </span>
  );
}
