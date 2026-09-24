"use client";

import { FormEvent, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { whatsappMessages } from "@/lib/whatsapp";
import { track, AnalyticsEvents } from "@/lib/analytics";

const GROUP_TYPES = ["Corporate Team", "School", "College"];

export function CorporateEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const startedTracking = useRef(false);

  function handleFirstInteraction() {
    if (!startedTracking.current) {
      startedTracking.current = true;
      track(AnalyticsEvents.FORM_START, { trip: "corporate_school_enquiry" });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const orgName = String(data.get("orgName") || "");
    const contactName = String(data.get("contactName") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const groupType = String(data.get("groupType") || GROUP_TYPES[0]);
    const groupSize = String(data.get("groupSize") || "");
    const activity = String(data.get("activity") || "");
    const dates = String(data.get("dates") || "");
    const message = String(data.get("message") || "");

    track(AnalyticsEvents.CORPORATE_SCHOOL_FORM_SUBMIT, { groupType, groupSize });

    // Best-effort backup record in Supabase, same pattern as the trip
    // booking form — never blocks the WhatsApp handoff below. Uses the
    // existing `leads` table rather than adding new columns: the org name,
    // activity and dates go into `message`, `trip_name`/`trip_slug` mark it
    // as a group enquiry, and `people` carries the group size.
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripSlug: "corporate-school-enquiry",
          tripName: `${groupType} group enquiry`,
          tripDate: dates || undefined,
          name: contactName,
          phone,
          email,
          people: groupSize,
          source: groupType,
          message: [
            `Organization: ${orgName}`,
            `Group type: ${groupType}`,
            activity ? `Preferred activity/destination: ${activity}` : null,
            dates ? `Preferred dates: ${dates}` : null,
            message ? `Message: ${message}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
        keepalive: true,
      }).catch(() => {
        // Ignore — this is a backup record, not the primary flow.
      });
    } catch {
      // Ignore — never let this block the enquiry.
    }

    const link = whatsappMessages.groupEnquiry({
      orgName,
      contactName,
      phone,
      groupType,
      groupSize,
      activity: activity || undefined,
      dates: dates || undefined,
      message: message || undefined,
    });

    setSubmitted(true);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent-2/30 bg-accent-2/10 p-6 text-center">
        <p className="font-semibold text-accent-2">We&apos;ve opened WhatsApp with your details filled in.</p>
        <p className="mt-2 text-sm text-muted">
          Just hit send — our team plans corporate and school trips directly, so you&apos;ll hear back from a real person, usually within a few hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={handleFirstInteraction} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Organization / school name" name="orgName" required />
        <SelectField label="Group type" name="groupType" options={GROUP_TYPES} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Contact person" name="contactName" required />
        <Field label="Phone" name="phone" type="tel" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email (optional)" name="email" type="email" />
        <Field label="Group size" name="groupSize" type="number" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Preferred activity/destination (optional)" name="activity" placeholder="e.g. Nandi Hills day trek, Coorg weekend, custom" />
        <Field label="Preferred dates (optional)" name="dates" placeholder="e.g. mid-November, flexible" />
      </div>

      <div>
        <label className="text-sm font-medium">Anything else we should know? (optional)</label>
        <textarea
          name="message"
          rows={3}
          className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <Button type="submit" variant="primary" className="mt-2 w-full">
        Send enquiry on WhatsApp
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
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
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
