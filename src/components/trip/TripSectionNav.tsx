"use client";

import { useEffect, useState } from "react";

// Sticky in-page menu (Overview · Photos · Itinerary · …) that sits under
// the site header and highlights the section you're reading.
export function TripSectionNav({ sections }: { sections: Array<{ id: string; label: string }> }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="On this page"
      className="print:hidden sticky top-16 z-30 border-b border-line bg-paper/90 backdrop-blur"
    >
      <div className="rail mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`relative shrink-0 px-3 py-3.5 text-sm font-medium transition-colors ${
              active === s.id ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {s.label}
            <span
              aria-hidden
              className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent transition-transform duration-300 ${
                active === s.id ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </a>
        ))}
      </div>
    </nav>
  );
}
