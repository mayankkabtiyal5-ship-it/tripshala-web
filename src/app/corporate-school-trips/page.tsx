import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CorporateEnquiryForm } from "@/components/CorporateEnquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate & School Trips",
  description:
    "Team offsites, corporate outings, and school or college educational trips near Bengaluru — planned end to end, for groups of any size.",
};

const AUDIENCES = [
  {
    title: "Corporate teams",
    body: "Offsites and team-building outings — bike rides, treks, camping or a relaxed day trip. We handle logistics, safety briefings and a dedicated on-ground coordinator so your team just shows up.",
  },
  {
    title: "Schools & colleges",
    body: "Educational and nature trips built around your calendar — supervised, age-appropriate itineraries with transport, meals and permissions sorted, and a point of contact your staff can reach throughout.",
  },
];

const WHAT_WE_HANDLE = [
  "Custom itineraries for groups of 10 to 200+",
  "Transport, stay and meals bundled into one quote",
  "A dedicated coordinator on the day, not just a driver",
  "Safety briefings and first-aid on every trip",
  "Flexible dates, including weekday-only school calendars",
  "A single invoice — no per-person chasing",
];

export default function CorporateSchoolTripsPage() {
  return (
    <Container className="py-14">
      <h1 className="font-display text-4xl font-extrabold">Corporate Offsites &amp; School Trips</h1>
      <p className="mt-3 max-w-2xl text-muted">
        The same end-to-end planning behind every {site.name} weekend trip, built around your organization&apos;s
        group, budget and calendar instead of an open batch.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {AUDIENCES.map((a) => (
          <div key={a.title} className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-semibold">{a.title}</h2>
            <p className="mt-2 text-sm text-muted">{a.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-paper-raised p-6">
        <h2 className="text-lg font-semibold">What we handle</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {WHAT_WE_HANDLE.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
              <span className="mt-0.5 text-accent-2">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold">Tell us about your group</h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            Share a few details and we&apos;ll get back with a plan and a quote — usually within a few hours.
          </p>
          <div className="mt-6 max-w-xl rounded-2xl border border-line bg-white p-6">
            <CorporateEnquiryForm />
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 text-sm text-muted">
          <p className="font-semibold text-ink">Prefer to just call or WhatsApp?</p>
          <p className="mt-2">
            Reach us directly at{" "}
            <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline">
              +91 {site.whatsappNumber.slice(2, 7)} {site.whatsappNumber.slice(7)}
            </a>{" "}
            or{" "}
            <a href={`mailto:${site.contactEmail}`} className="font-medium text-ink underline">
              {site.contactEmail}
            </a>
            . {site.name} is based in {site.city}, and most of our group trips run within a few hours&apos; drive of
            the city.
          </p>
        </div>
      </div>
    </Container>
  );
}
