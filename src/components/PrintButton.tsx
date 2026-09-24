"use client";

import { Printer } from "lucide-react";

// print:hidden on this button itself — no point showing "Save as PDF" on
// the PDF you just made by clicking it.
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
    >
      <Printer aria-hidden size={15} className="mr-1.5 inline-block -translate-y-px" />Save as PDF
    </button>
  );
}
