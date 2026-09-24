"use client";

import { FormEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { whatsappMessages } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";
import { readStoredReferralCode } from "@/lib/referral";

interface BookingFormProps {
  tripName: string;
  tripDate: string;
  tripSlug: string;
  pickupPoints?: string[];
  departures?: string[]; // labels of upcoming fixed departures, e.g. "1–3 Oct · Gandhi Jayanti long weekend"
}

export const LAST_BOOKING_KEY = "tripshala_last_booking";
const OTHER_DATE = "Another date — suggest on WhatsApp";

export function BookingForm({ tripName, tripDate, tripSlug, pickupPoints, departures = [] }: BookingFormProps) {
  const router = useRouter();
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
    const hasBike = String(data.get("hasBike") || "No");
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
      hasBike,
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

  return (
    <form ref={formRef} onSubmit={handleSubmit} onFocus={handleFirstInteraction} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" />
        <Field label="Age" name="age" type="number" />
        <Field label="City" name="city" />
        <Field label="Number of people" name="people" type="number" defaultValue="1" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Do you have a bike?" name="hasBike" options={["No", "Yes"]} />
        <Field label="Bike model (optional)" name="bikeModel" />
      </div>

      {departures.length > 0 && (
        <SelectField label="Departure date" name="departure" options={[...departures, OTHER_DATE]} />
      )}

      {pickupPoints && pickupPoints.length > 0 && (
        <SelectField label="Preferred pickup point" name="pickupPoint" options={pickupPoints} />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="How did you hear about us?"
          name="source"
          options={["Instagram", "WhatsApp group", "Friend/referral", "Google search", "Other"]}
        />
        <Field label="Referral code (optional)" name="referralCode" />
      </div>

      <div>
        <label className="text-sm font-medium">Message (optional)</label>
        <textarea
          name="message"
          rows={3}
          className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <Button type="submit" variant="primary" className="mt-2 w-full">
        Book / Enquire on WhatsApp
      </Button>
      <p className="text-center text-xs text-muted">
        Submitting opens WhatsApp with your details pre-filled — nothing is charged here.
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
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
