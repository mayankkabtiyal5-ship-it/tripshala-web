"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { PackingGroup } from "@/lib/packing";

// Tappable checklist — ticks are just for the moment (not saved), which is
// all anyone needs while packing.
export function PackingList({ groups }: { groups: PackingGroup[] }) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  function toggle(key: string) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-line sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">Tap to tick things off as you pack.</p>
        <span className="text-xs font-semibold tabular-nums text-accent">
          {done.size}/{total} packed
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-paper-raised">
        <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${(done.size / total) * 100}%` }} />
      </div>
      <div className="mt-6 grid gap-8 md:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{g.title}</h3>
            <ul className="mt-3 space-y-1">
              {g.items.map((item) => {
                const key = `${g.title}:${item}`;
                const checked = done.has(key);
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      aria-pressed={checked}
                      className="flex w-full items-start gap-2.5 rounded-lg py-1.5 text-left text-sm transition-colors hover:text-ink"
                    >
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                          checked ? "border-accent bg-accent text-white" : "border-line bg-white"
                        }`}
                      >
                        {checked && <Check size={11} strokeWidth={3} />}
                      </span>
                      <span className={checked ? "text-muted line-through decoration-muted/50" : "text-ink/85"}>{item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
