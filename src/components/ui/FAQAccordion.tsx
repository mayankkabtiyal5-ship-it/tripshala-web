"use client";

import { useState } from "react";
import { FAQItem } from "@/lib/trips";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-medium">{item.question}</span>
              <span className="shrink-0 text-xl text-muted">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-muted">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
