"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { whatsappMessages } from "@/lib/whatsapp";
import { track, trackLead, AnalyticsEvents } from "@/lib/analytics";
import { readStoredReferralCode } from "@/lib/referral";
import { DatePicker, type DateOption } from "./booking/DatePicker";

interface BookingFormProps {
  tripName: string;
  tripDate: string;
  tripSlug: string;
  pickupPoints?: string[];
  departures?: DateOption[]; // upcoming departures, shown as date tiles
  price?: number; // per person, for the live total
  isBikeTrip?: boolean; // only bike rides ask about bringing a bike
  durationLabel?: string; // e.g. "2 Days / 1 Night"
}

export const LAST_BOOKING_KEY = "tripshala_last_booking";
const OTHER_DATE = "Another date — suggest on WhatsApp";

export function BookingForm({ tripName, tripDate, tripSlug, pickupPoints, departures = [], price, isBikeTrip = false, durationLabel }: BookingFormProps) {
  const router = useRouter();
  const [people, setPeople] = useState(1);
  const startedTracking = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-fill the referral code field from whatever a ?ref=CODE link left in
  // this browser (see ReferralCapture), without touching it if the visitor
  // already typed something in themselves. Done imperatively via the DOM
  // rather than a defaultValue driven by state, so the server-rendered and
  // first client-rendered HTML always match (no hydration mismatch).
  useEffect(() => {
    const stored = readStoredReferralCode();
    const input = formRef.current?.elements.namedItem("referralCode") as HTMLInputElement | null;
    if (stored && input && !input.value) {
      input.value = stored;
    }
  }, []);

  function handleFirstInteraction() {
    if (!startedTracking.current) {
      startedTracking.current = true;
      track(AnalyticsEvents.FORM_START, { trip: tripName });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const age = String(data.get("age") || "");
    const city = String(data.get("city") || "");
    const people = String(data.get("people") || "1");
    const hasBike = isBikeTrip ? String(data.get("hasBike") || "No") : "";
    const bikeModel = String(data.get("bikeModel") || "");
    const source = String(data.get("source") || "");
    const referralCode = String(data.get("referralCode") || "");
    const pickupPoint = String(data.get("pickupPoint") || "");
    const message = String(data.get("message") || "");
    const chosenDate = String(data.get("departure") || "") || tripDate;
    const dateForMessage = chosenDate === OTHER_DATE ? "flexible — suggest a date" : chosenDate;

    // The leads table has no dedicated pickup-point column, so it's folded
    // into the free-text message rather than requiring a schema change.
    const messageWithPickup = [pickupPoint ? `Pickup point: ${pickupPoint}` : null, message]
      .filter(Boolean)
      .join(" — ");

    if (referralCode) {
      track(AnalyticsEvents.REFERRAL_CODE_ENTERED, { trip: tripName, referralCode });
    }
    track(AnalyticsEvents.FORM_SUBMIT, { trip: tripName });
    trackLead("booking_form", price ? price * Number(people || 1) : undefined);

    // Best-effort backup record in Supabase — fired in the background so a
    // slow or failed request never delays or blocks the WhatsApp handoff,
    // which stays the primary path regardless of whether this succeeds.
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripSlug,
          tripName,
          tripDate: dateForMessage,
          name,
          phone,
          email,
          age,
          city,
          people,
          hasBike,
          bikeModel,
          source,
          referralCode,
          message: messageWithPickup,
        }),
        keepalive: true,
      }).catch(() => {
        // Ignore — this is a backup record, not the primary flow.
      });
    } catch {
      // Ignore — never let this block the booking.
    }

    const link = whatsappMessages.bookingWithDetails({
      tripName,
      date: dateForMessage,
      name,
      phone,
      people,
      hasBike: hasBike || undefined,
      referralCode: referralCode || undefined,
      pickupPoint: pickupPoint || undefined,
    });

    // Keep the WhatsApp link for the confirmation page's "open it again"
    // button (popup blockers, or the app didn't open).
    try {
      sessionStorage.setItem(LAST_BOOKING_KEY, JSON.stringify({ link, tripSlug, date: dateForMessage, name }));
    } catch {
      // Storage unavailable — the confirmation page still works without it.
    }

    window.open(link, "_blank", "noopener,noreferrer");
    const params = new URLSearchParams({ trip: tripSlug, date: dateForMessage, name: name.split(" ")[0] || "" });
    router.push(`/booking/confirmed?${params.toString()}`);
  }

  const total = price ? price * people : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} onFocus={handleFirstInteraction} className="grid gap-4">
      {/* 1. When and where */}
      {departures.length > 0 && (
        <DatePicker name="departure" options={departures} otherLabel={OTHER_DATE} durationLabel={durationLabel} />
      )}
      {pickupPoints && pickupPoints.length > 0 && (
        <SelectField label="Pickup point" name="pickupPoint" options={pickupPoints} />
      )}

      {/* 2. Who */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl border border-line px-4 py-2.5">
        <span className="text-sm font-medium">Travellers</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Fewer travellers"
            onClick={() => setPeople((n) => Math.max(1, n - 1))}
            disabled={people <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors hover:border-ink disabled:opacity-40"
          >
            <Minus size={14} />
          </button>
          <span className="w-5 text-center font-semibold tabular-nums" aria-live="polite">
            {people}
          </span>
          <button
            type="button"
            aria-label="More travellers"
            onClick={() => setPeople((n) => Math.min(11, n + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors hover:border-ink"
          >
            <Plus size={14} />
          </button>
        </div>
        <input type="hidden" name="people" value={people} />
      </div>

      {isBikeTrip && (
        <div className="grid gap-4">
          <SelectField label="Bringing your own bike?" name="hasBike" options={["Yes", "No — need a seat in the backup vehicle"]} />
          <Field label="Bike model (optional)" name="bikeModel" />
        </div>
      )}

      {/* 3. Optional extras, tucked away */}
      <details className="group rounded-xl border border-line [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium">
          <span>
            Add more details <span className="font-normal text-muted">(optional)</span>
          </span>
          <ChevronDown aria-hidden size={16} className="ml-auto text-muted transition-transform group-open:rotate-180" />
        </summary>
        <div className="grid gap-4 border-t border-line p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" name="email" type="email" autoComplete="email" />
            <Field label="Age" name="age" type="number" />
            <Field label="City" name="city" autoComplete="address-level2" />
            <Field label="Referral code" name="referralCode" />
          </div>
          <SelectField
            label="How did you hear about us?"
            name="source"
            options={["Instagram", "WhatsApp group", "Friend/referral", "Google search", "Other"]}
          />
          <div>
            <label className="text-sm font-medium" htmlFor="booking-message">Message</label>
            <textarea
              id="booking-message"
              name="message"
              rows={3}
              placeholder="Travelling with friends, dietary needs, questions…"
              className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>
      </details>

      {/* 4. Total + submit */}
      {total !== null && (
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-sm text-muted">
            {people} × ₹{price!.toLocaleString("en-IN")}
          </span>
          <span className="text-xl font-semibold tabular-nums">₹{total.toLocaleString("en-IN")}</span>
        </div>
      )}

      <Button type="submit" variant="primary" className="w-full py-3.5">
        Reserve on WhatsApp
      </Button>
      <p className="text-center text-xs leading-relaxed text-muted">
        Nothing is charged now. WhatsApp opens with your details filled in, and a real person confirms your seat — usually within a few hours.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  inputMode?: "tel" | "text" | "email" | "numeric";
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <select
        name={name}
        className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-accent"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
