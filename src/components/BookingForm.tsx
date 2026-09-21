"use client";

import { FormEvent, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { whatsappMessages } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";

interface BookingFormProps {
  tripName: string;
  tripDate: string;
}

export function BookingForm({ tripName, tripDate }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const startedTracking = useRef(false);

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
    const people = String(data.get("people") || "1");
    const hasBike = String(data.get("hasBike") || "No");
    const referralCode = String(data.get("referralCode") || "");

    if (referralCode) {
      track(AnalyticsEvents.REFERRAL_CODE_ENTERED, { trip: tripName, referralCode });
    }
    track(AnalyticsEvents.FORM_SUBMIT, { trip: tripName });

    const link = whatsappMessages.bookingWithDetails({
      tripName,
      date: tripDate,
      name,
      phone,
      people,
      hasBike,
      referralCode: referralCode || undefined,
    });

    setSubmitted(true);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent-2/30 bg-accent-2/10 p-6 text-center">
        <p className="font-semibold text-accent-2">We&apos;ve opened WhatsApp with your details filled in.</p>
        <p className="mt-2 text-sm text-muted">
          Just hit send — a real person replies, usually within a few hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={handleFirstInteraction} className="grid gap-4">
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
