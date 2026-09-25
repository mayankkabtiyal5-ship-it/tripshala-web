"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Sticky sidebar that never traps content. When the card fits in the window it
// sticks just below the header (like before). When it's taller than the window
// (calendar + form + price breakdown on a laptop), it scrolls along with the page
// until its bottom — the Reserve button — is on screen, and only then sticks.
const HEADER_OFFSET = 128; // matches the old md:top-32
const BOTTOM_GAP = 24;

export function StickyAside({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(HEADER_OFFSET);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setTop(Math.min(HEADER_OFFSET, window.innerHeight - el.offsetHeight - BOTTOM_GAP));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div id={id} ref={ref} className={`md:sticky ${className}`} style={{ top }}>
      {children}
    </div>
  );
}
