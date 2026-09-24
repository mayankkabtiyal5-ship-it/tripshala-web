import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TripCard } from "@/components/TripCard";
import { trips } from "@/lib/trips";
import { upcomingDepartures } from "@/lib/departures";

// A 404 that still feels like the brand: a photograph, a light line, and a
// few trips to get people back on the road.
export default function NotFound() {
  const suggestions = [...trips]
    .sort((a, b) => (upcomingDepartures(a)[0]?.start ?? "9999").localeCompare(upcomingDepartures(b)[0]?.start ?? "9999"))
    .slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src="/photos/gallery-foggy-trek.jpg" alt="A misty trail disappearing into fog" fill priority sizes="100vw" className="-z-20 object-cover opacity-70" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <Container className="flex min-h-[60svh] flex-col justify-end pb-14 pt-28">
          <p className="eyebrow !text-[#f3b58f]">Error 404</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-medium leading-[1.05] md:text-6xl">
            You&apos;ve wandered off the trail.
          </h1>
          <p className="mt-4 max-w-md text-lg text-white/80">
            This page doesn&apos;t exist, or it moved. The trips are all still here.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/trips" variant="primary">See upcoming trips</Button>
            <Button href="/" variant="ghost-light">Back to home</Button>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-medium">Leaving soon</h2>
          <Link href="/trips" className="group inline-flex items-center gap-2 text-sm font-semibold underline decoration-ink/20 underline-offset-8 hover:decoration-accent">
            All trips <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
        </div>
      </Container>
    </>
  );
}
