import Link from "next/link";
import { ArrowRight, Armchair, CalendarClock, MapPin, Moon } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";

// Built around what Tripshala actually does differently (all of it already
// true in the trip data), instead of generic "good people / curated" lines.
const benefits = [
  {
    icon: Armchair,
    title: "Room to breathe",
    body: "On Tempo Traveller trips we seat 11 in a 13-seater, not the usual 12. Nobody spends eight hours wedged into a middle seat.",
  },
  {
    icon: Moon,
    title: "Your whole weekend, on location",
    body: "Longer trips leave on Friday night. You wake up at the destination instead of losing Saturday to the highway.",
  },
  {
    icon: MapPin,
    title: "Picked up near you",
    body: "Choose from pickup points across the city — Mysore Road, Hosur Road, Tumkur Road, Hebbal — rather than crossing Bengaluru at dawn.",
  },
  {
    icon: CalendarClock,
    title: "Planned to the hour",
    body: "Every route, stop and stay is worked out before you book. You get an hour-by-hour itinerary, not a vague plan and a group chat.",
  },
];

export function WhyTripshala() {
  return (
    <section className="bg-paper-raised py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <Reveal>
            <p className="eyebrow">Why Tripshala</p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">
              The details other trips leave to chance.
            </h2>
            <p className="mt-5 max-w-sm text-muted">
              A good weekend away is mostly logistics done well. We sweat those,
              so the only thing left for you is the trip itself.
            </p>
            <Link
              href="/standard"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-ink/20 underline-offset-8 hover:decoration-accent"
            >
              Read the Tripshala Standard
              <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 90} className="border-t border-ink/10 pt-6">
                <Icon aria-hidden size={22} strokeWidth={1.5} className="text-accent" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
