"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappMessages } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";

export function WhatsAppFloatingButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Trip detail pages already have their own WhatsApp CTA on mobile
  // (StickyMobileCTA, pinned to the bottom) — don't stack a second bubble
  // on top of it there. Desktop trip pages only get a WhatsApp button in
  // the hero (TripHeroCTAs), which scrolls out of view, so this floating
  // button still shows on desktop once you've scrolled past it.
  const isTripPage = /^\/trips\/[^/]+$/.test(pathname ?? "");

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function goToWhatsApp(link: string, source: string) {
    track(AnalyticsEvents.CLICK_WHATSAPP, { source, page: pathname ?? "" });
    window.open(link, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    track(AnalyticsEvents.FORM_SUBMIT, { source: "floating_button" });

    // Best-effort backup record in Supabase — fired in the background so a
    // slow or failed request never delays or blocks the WhatsApp handoff,
    // which stays the primary path regardless of whether this succeeds.
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message: `Submitted via the website WhatsApp button${pathname ? ` (page: ${pathname})` : ""}`,
        }),
        keepalive: true,
      }).catch(() => {
        // Ignore — this is a backup record, not the primary flow.
      });
    } catch {
      // Ignore — never let this block the chat handoff.
    }

    goToWhatsApp(whatsappMessages.generalWithName(name), "floating_button_form");
  }

  return (
    <div className={`fixed bottom-5 right-5 z-50 ${isTripPage ? "hidden md:block" : "block"}`}>
      {open && (
        <div
          ref={popoverRef}
          className="absolute bottom-[4.5rem] right-0 w-72 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-line bg-white p-4 shadow-xl"
        >
          <p className="text-sm font-semibold text-ink">Chat with Tripshala</p>
          <p className="mt-1 text-xs text-muted">
            Leave your details and we&apos;ll pick up right where you left off.
          </p>
          <form onSubmit={handleSubmit} className="mt-3 grid gap-2">
            <input
              name="name"
              placeholder="Your name"
              required
              className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone number"
              required
              className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="mt-1 w-full rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95"
            >
              Continue to WhatsApp
            </button>
          </form>
          <button
            type="button"
            onClick={() => goToWhatsApp(whatsappMessages.general(), "floating_button_skip")}
            className="mt-2 w-full text-center text-xs font-medium text-muted hover:text-ink hover:underline"
          >
            Skip — just chat directly
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with Tripshala on WhatsApp"
        aria-expanded={open}
        className="group flex items-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center">
          <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
            <path d="M16.01 3C9.38 3 4 8.36 4 14.98c0 2.2.59 4.27 1.62 6.05L4 29l8.2-1.57a13 13 0 0 0 3.81.57h.01c6.63 0 12-5.36 12-11.98C28.02 8.36 22.65 3 16.01 3zm7.1 17.02c-.3.85-1.72 1.62-2.38 1.72-.61.1-1.38.14-2.23-.14-.51-.16-1.17-.38-2.02-.75-3.55-1.54-5.87-5.12-6.05-5.36-.18-.24-1.44-1.92-1.44-3.66 0-1.74.91-2.6 1.24-2.95.32-.35.7-.44.93-.44.24 0 .47 0 .68.01.22.01.51-.08.8.61.3.71 1.02 2.45 1.11 2.63.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.37-.16.73.21.36.94 1.55 2.02 2.51 1.39 1.24 2.56 1.62 2.92 1.8.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.33.12 2.08.98 2.44 1.16.36.18.6.27.69.42.09.15.09.85-.21 1.7z" />
          </svg>
        </span>
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:pr-5 group-hover:opacity-100 md:inline-block">
          Chat with us
        </span>
      </button>
    </div>
  );
}
