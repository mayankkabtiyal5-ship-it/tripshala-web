"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

export interface DateOption {
  start: string; // YYYY-MM-DD
  end: string;
  note?: string;
  label: string; // text sent in the booking message
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MON = MONTHS.map((m) => m.slice(0, 3));
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parts(iso: string) {
  const d = new Date(iso + "T12:00:00Z");
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), w: d.getUTCDay() };
}
const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

function rangeText(o: DateOption) {
  const a = parts(o.start);
  const b = parts(o.end);
  if (o.start === o.end) return `${DAYS[a.w]} ${a.d} ${MON[a.m]}`;
  return a.m === b.m
    ? `${DAYS[a.w]} ${a.d} – ${DAYS[b.w]} ${b.d} ${MON[b.m]}`
    : `${DAYS[a.w]} ${a.d} ${MON[a.m]} – ${DAYS[b.w]} ${b.d} ${MON[b.m]}`;
}


// Month-view picker: departure days are highlighted, and choosing one shades
// the whole trip span. Submits the chosen departure's label through a hidden
// input, so the booking form logic is unchanged.
export function DatePicker({ name, options, otherLabel, durationLabel }: { name: string; options: DateOption[]; otherLabel: string; durationLabel?: string }) {
  const [value, setValue] = useState(options[0]?.label ?? otherLabel);
  const selected = options.find((o) => o.label === value);

  const months = useMemo(() => {
    if (options.length === 0) return [];
    const first = parts(options[0].start);
    const last = parts(options[options.length - 1].start);
    const list: Array<{ y: number; m: number }> = [];
    let y = first.y;
    let m = first.m;
    while (y < last.y || (y === last.y && m <= last.m)) {
      list.push({ y, m });
      m++;
      if (m > 11) {
        m = 0;
        y++;
      }
    }
    return list;
  }, [options]);

  const [page, setPage] = useState(0);
  const month = months[page];
  const byStart = useMemo(() => new Map(options.map((o) => [o.start, o])), [options]);

  if (!month) return <input type="hidden" name={name} value={otherLabel} />;

  const firstWeekday = new Date(Date.UTC(month.y, month.m, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(month.y, month.m + 1, 0)).getUTCDate();

  return (
    <fieldset className="min-w-0">
      <legend className="text-sm font-medium">Departure date</legend>

      <div className="mt-2 rounded-xl border border-line p-3">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous month"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-30 disabled:hover:border-line"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="font-display text-base font-medium" aria-live="polite">
            {MONTHS[month.m]} {month.y}
          </span>
          <button
            type="button"
            aria-label="Next month"
            disabled={page === months.length - 1}
            onClick={() => setPage((p) => p + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-30 disabled:hover:border-line"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <div role="radiogroup" aria-label="Departure dates" className="grid grid-cols-7 gap-1 text-center">
          {DAYS.map((d) => (
            <span key={d} className="pb-1 text-[0.6rem] font-semibold uppercase tracking-wider text-muted">
              {d.slice(0, 2)}
            </span>
          ))}
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <span key={`b${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = iso(month.y, month.m, day);
            const dep = byStart.get(key);
            const isStart = selected?.start === key;
            const inSpan = !!selected && key > selected.start && key <= selected.end;
            if (!dep) {
              return (
                <span
                  key={key}
                  className={`flex h-9 items-center justify-center text-[0.8rem] ${inSpan ? "rounded-md bg-accent/10 text-ink" : "text-ink/25"}`}
                >
                  {day}
                </span>
              );
            }
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={isStart}
                aria-label={`${rangeText(dep)}${dep.note ? `, ${dep.note}` : ""}`}
                onClick={() => setValue(dep.label)}
                className={`relative flex h-9 items-center justify-center rounded-lg text-[0.8rem] font-semibold transition-colors ${
                  isStart ? "bg-ink text-paper shadow-[0_8px_18px_-10px_rgba(28,25,23,0.7)]" : inSpan ? "bg-accent/10 text-ink" : "bg-paper-raised text-ink hover:bg-[#ebe3d4]"
                }`}
              >
                {day}
                {dep.note && (
                  <span aria-hidden className={`absolute bottom-1 h-1 w-1 rounded-full ${isStart ? "bg-[#f3b58f]" : "bg-accent"}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex min-h-[3rem] items-center justify-between gap-3 rounded-xl bg-paper-raised px-3.5 py-2.5 text-sm">
        {selected ? (
          <>
            <span>
              <span className="block font-semibold">{rangeText(selected)}</span>
              {selected.note && (
                <span className="text-xs text-muted">
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-accent" />
                  {selected.note}
                </span>
              )}
            </span>
            {durationLabel && <span className="shrink-0 text-right text-xs text-muted">{durationLabel}</span>}
          </>
        ) : (
          <span className="text-muted">Tell us your dates on WhatsApp and we&apos;ll check availability.</span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setValue(value === otherLabel ? options[0]?.label ?? otherLabel : otherLabel)}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted underline decoration-line underline-offset-4 hover:text-ink"
      >
        <MessageCircle aria-hidden size={13} />
        {value === otherLabel ? "Back to listed dates" : "None of these work? Ask for another date"}
      </button>

      <input type="hidden" name={name} value={value} />
    </fieldset>
  );
}
