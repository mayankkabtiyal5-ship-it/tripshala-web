"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/Button";
import { generateReferralCode, buildReferralLink } from "@/lib/referral";
import { buildWhatsAppShareLink } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";
import { site } from "@/lib/site";

export function ReferralCodeTool() {
  const [result, setResult] = useState<{ code: string; link: string } | null>(null);
  const [copied, setCopied] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    if (!name || !phone) return;

    const code = generateReferralCode(name, phone);
    const link = buildReferralLink(code);
    setResult({ code, link });
    setCopied(false);
    track(AnalyticsEvents.REFERRAL_CODE_GENERATED, { code });

    // Best-effort record so the internal /internal/referrals summary page
    // can label this code with a name — never blocks showing the code,
    // which is generated locally and doesn't need this to succeed.
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripSlug: "referral-code-issued",
          tripName: "Referral code issued",
          name,
          phone,
          referralCode: code,
          message: `Self-serve referral code generated: ${code}`,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Ignore — this is a backup record, not the primary flow.
    }
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the link is still visible to select/copy by hand.
    }
  }

  function handleShare() {
    if (!result) return;
    track(AnalyticsEvents.REFERRAL_LINK_SHARED, { code: result.code });
    const message = `Hey! I've been riding with ${site.name} and thought you'd love it. Check out their upcoming trips with my link — book one and we both get ₹299 credit: ${result.link}`;
    window.open(buildWhatsAppShareLink(message), "_blank", "noopener,noreferrer");
  }

  if (result) {
    return (
      <div className="rounded-2xl border border-accent-2/30 bg-accent-2/10 p-6">
        <p className="text-sm font-medium text-muted">Your referral code</p>
        <p className="mt-1 font-display text-3xl font-extrabold tracking-wide text-ink">{result.code}</p>

        <p className="mt-4 text-sm font-medium text-muted">Share this link — it fills the code in automatically</p>
        <div className="mt-1 flex flex-col gap-2 sm:flex-row">
          <code className="flex-1 truncate rounded-xl border border-line bg-white px-3 py-2.5 text-xs">
            {result.link}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold hover:border-ink"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>

        <Button variant="whatsapp" className="mt-4 w-full" onClick={handleShare}>
          Share on WhatsApp
        </Button>

        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-3 w-full text-center text-xs font-medium text-muted hover:text-ink hover:underline"
        >
          Generate a different code
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-line bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">
            Your name<span className="text-accent"> *</span>
          </span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">
            Your phone<span className="text-accent"> *</span>
          </span>
          <input
            name="phone"
            type="tel"
            required
            className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </label>
      </div>
      <Button type="submit" variant="primary" className="w-full">
        Get my referral code
      </Button>
      <p className="text-center text-xs text-muted">
        Your code is generated instantly from your name and phone — the same details always give you the same code
        back, so there&apos;s nothing to lose or forget.
      </p>
    </form>
  );
}
