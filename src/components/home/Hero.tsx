import Image from "next/image";
import { CalendarClock, MapPin, Moon, Users } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

// Full-bleed, image-led hero. The photo does the selling; copy is kept to a
// headline, one line and two actions. Swap HERO_IMAGE for a wider/sharper
// shot (2400px+ landscape) whenever one is available.
const HERO_IMAGE = "/photos/chikmagalur-peak.jpg";

const promises = [
  { icon: CalendarClock, text: "Hour-by-hour itineraries" },
  { icon: MapPin, text: "Pickups across Bengaluru" },
  { icon: Moon, text: "Friday-night departures" },
  { icon: Users, text: "Small groups, room to breathe" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src={HERO_IMAGE}
        alt="Golden-hour light over a peak in the Chikmagalur hills"
        fill
        priority
        sizes="100vw"
        className="hero-drift -z-20 object-cover object-center"
      />
      {/* Legibility wash: darker at the bottom-left where the copy sits. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/10 md:bg-gradient-to-tr md:from-black/80 md:via-black/40 md:to-transparent"
      />

      <Container className="flex min-h-[78svh] flex-col justify-end pb-14 pt-32 md:min-h-[86svh] md:pb-20">
        <p className="eyebrow rise-in !text-white/80">Curated escapes from Bengaluru</p>
        <h1 className="rise-in rise-in-delay-1 mt-4 max-w-3xl text-5xl font-medium leading-[1.02] md:text-7xl">
          The trip&apos;s planned.
          <br />
          You just have to <em className="font-normal italic text-[#f3b58f]">show up.</em>
        </h1>
        <p className="rise-in rise-in-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-white/85">
          Bike rides, hill escapes and heritage weekends — the route, the stay
          and the company, all taken care of.
        </p>
        <div className="rise-in rise-in-delay-3 mt-9 flex flex-wrap gap-3">
          <Button href="/trips" variant="primary">
            Explore upcoming trips
          </Button>
          <Button href="/community" variant="ghost-light">
            Join the community
          </Button>
        </div>
      </Container>

      <div className="border-t border-white/15 bg-black/30 backdrop-blur-sm">
        <Container>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 py-5 text-sm text-white/85 md:grid-cols-4">
            {promises.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5">
                <Icon aria-hidden size={16} strokeWidth={1.75} className="shrink-0 text-[#f3b58f]" />
                {text}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
