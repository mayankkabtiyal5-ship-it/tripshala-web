import type { Metadata } from "next";
import Link from "next/link";
import {
  Armchair, BedDouble, BadgeCheck, CalendarClock, HeartHandshake, MapPin, MessageCircle, ReceiptText, ShieldCheck, UserRound,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TripPhoto } from "@/components/ui/TripPhoto";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "The Tripshala Standard",
  description:
    "What every Tripshala trip includes, every time — room on board, a trip captain, checked stays, safe room allotment for solo travellers, and prices with nothing hidden.",
};

// The promises every trip is held to. Keep these literally true — edit a
// line here the moment operations change.
const promises: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Armchair,
    title: "Room on board",
    body: "On Tempo Traveller trips we seat 11 in a 13-seater, not the usual 12. Nobody spends an overnight drive wedged into a middle seat.",
  },
  {
    icon: UserRound,
    title: "A trip captain, start to finish",
    body: "Every trip has a Tripshala captain who travels with the group, keeps time, sorts problems on the spot and makes sure nobody is left out.",
  },
  {
    icon: BedDouble,
    title: "Stays we've checked",
    body: "Homestays, cottages and camps are picked for clean rooms, working washrooms and a safe, well-lit arrival. The stay type is always written on the trip page.",
  },
  {
    icon: HeartHandshake,
    title: "Solo-friendly rooms",
    body: "Travelling alone is normal here. Rooms and tents are allotted by gender, and solo women are never asked to share with men they don't know.",
  },
  {
    icon: CalendarClock,
    title: "Planned to the hour",
    body: "Every trip has a day-by-day, hour-by-hour itinerary you can read and download before you pay, so you know exactly what the weekend looks like.",
  },
  {
    icon: ReceiptText,
    title: "Prices with nothing hidden",
    body: "Each stop is tagged Included or On your own, and every page lists what's not covered. Tolls, parking and driver charges are always in the price.",
  },
  {
    icon: MapPin,
    title: "Pickups near you",
    body: "Pickups start at RMZ Ecospace and follow the route out of the city, so you're never crossing Bengaluru at dawn to reach the bus.",
  },
  {
    icon: ShieldCheck,
    title: "Safety, quietly handled",
    body: "A first-aid kit travels with every group, drivers are experienced on ghat roads, and we skip or reroute anything that isn't safe on the day — waterfalls, sea, or weather.",
  },
  {
    icon: MessageCircle,
    title: "A real person on WhatsApp",
    body: "Questions before, during or after a trip go to a real person on our team, not a bot or a call centre.",
  },
  {
    icon: BadgeCheck,
    title: "Clear cancellation terms",
    body: "The earlier you cancel, the more you get back, and if we ever cancel a trip you get a full refund or a free move to another date.",
  },
];

export default function StandardPage() {
  return (
    <>
      <section className="border-b border-line bg-paper-raised">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:gap-16 md:py-20">
          <div>
            <p className="eyebrow rise-in">Our promise</p>
            <h1 className="rise-in rise-in-delay-1 mt-4 font-display text-5xl font-medium leading-[1.04] md:text-6xl">
              The Tripshala Standard
            </h1>
            <p className="rise-in rise-in-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Ten things that are true on every trip we run, whether it&apos;s a ₹1,499 day out or a
              three-day long weekend. If we ever fall short of one, tell us.
            </p>
          </div>
          <TripPhoto src="/photos/munnar-group-lakeside.jpg" alt="A Tripshala group by a lake in the hills" aspect="aspect-[4/3]" priority />
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        <ol className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {promises.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={(i % 2) * 90} className="flex gap-5 border-t border-ink/10 pt-7">
              <span className="font-display text-3xl font-light italic tabular-nums text-accent/70">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <Icon aria-hidden size={22} strokeWidth={1.5} className="text-accent" />
                <h2 className="mt-3 font-sans text-lg font-semibold">{title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-20 flex flex-col items-start gap-6 rounded-3xl bg-ink p-8 text-paper md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="font-display text-3xl font-medium md:text-4xl">See it for yourself.</h2>
            <p className="mt-2 text-paper/70">Pick a weekend. We&apos;ll handle the rest.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/trips" variant="primary">Explore upcoming trips</Button>
            <Link href="/policies/cancellation" className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:border-white">
              Cancellation policy
            </Link>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
