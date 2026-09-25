"use client";

import { FormEvent, useState } from "react";
import { BellRing, Check, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { track, trackLead, AnalyticsEvents } from "@/lib/analytics";

const INTERESTS = ["Weekend trips", "Long weekends", "Day trips", "Treks", "Temple trails"] as const;

// "Get next weekend's trips on WhatsApp" — captures visitors who aren't ready
// to book yet. Saved to the leads table (source: weekend_alerts) so the team
// can add them to the weekly WhatsApp broadcast list.
export function WeekendAlerts({ variant = "section", context }: { variant?: "section" | "compact"; context?: string }) {
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  function toggle(i: string) {
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    setStatus("sending");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          source: "weekend_alerts",
          tripSlug: "weekend-alerts",
          tripName: "Weekend alerts signup",
          message: [interests.length ? `Interested in: ${interests.join(", ")}` : null, context ? `Signed up from: ${context}` : null]
            .filter(Boolean)
            .join(" — "),
          dedupe: true,
        }),
      });
    } catch {
      // Still show success — the community link below is the fallback.
    }
    track(AnalyticsEvents.WEEKEND_ALERTS_SIGNUP, { interests: interests.join(","), context: context ?? "home" });
    trackLead("weekend_alerts");
    setStatus("done");
  }

  const compact = variant === "compact";

  if (status === "done") {
    return (
      <div className={`rounded-2xl ${compact ? "bg-paper-raised p-6" : "bg-white/10 p-8"} text-center`}>
        <span className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full ${compact ? "bg-accent text-white" : "bg-[#f3b58f] text-ink"}`}>
          <Check size={20} />
        </span>
        <p className="mt-4 font-display text-2xl font-medium">You&apos;re on the list.</p>
        <p className={`mx-auto mt-2 max-w-sm text-sm ${compact ? "text-muted" : "text-paper/75"}`}>
          Every week we&apos;ll WhatsApp you the upcoming trips and how many seats are left. Want to meet the crowd first?
        </p>
        <a
          href={site.whatsappCommunityLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(AnalyticsEvents.LINKS_PAGE_CLICK_WHATSAPP_GROUP, { source: "weekend_alerts" })}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95"
        >
          <MessageCircle size={16} /> Join the Tripshala community
        </a>
      </div>
    );
  }

  const chip = (active: boolean) =>
    compact
      ? active
        ? "bg-ink text-paper"
        : "bg-white text-ink/75 ring-1 ring-line hover:ring-ink/40"
      : active
        ? "bg-paper text-ink"
        : "bg-white/10 text-paper/80 hover:bg-white/15";
  const input = compact
    ? "w-full rounded-full border border-line bg-white px-5 py-3 text-sm outline-none focus:border-accent"
    : "w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-paper placeholder:text-paper/50 outline-none focus:border-[#f3b58f]";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="flex flex-wrap gap-2" aria-label="What are you into? (optional)">
        {INTERESTS.map((i) => (
          <button
            key={i}
            type="button"
            aria-pressed={interests.includes(i)}
            onClick={() => toggle(i)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${chip(interests.includes(i))}`}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input name="name" required placeholder="Your name" autoComplete="name" className={input} aria-label="Your name" />
        <input name="phone" required type="tel" inputMode="tel" placeholder="WhatsApp number" autoComplete="tel" pattern="[0-9+\s-]{10,15}" className={input} aria-label="WhatsApp number" />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
        >
          <BellRing size={16} /> {status === "sending" ? "Adding you…" : "Get weekend alerts"}
        </button>
      </div>
      <p className={`text-xs ${compact ? "text-muted" : "text-paper/55"}`}>
        One WhatsApp message a week, with dates and seats left. No spam — reply STOP any time.
      </p>
    </form>
  );
}
