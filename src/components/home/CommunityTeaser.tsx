import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { TripPhoto } from "../ui/TripPhoto";

const testimonials = [
  {
    quote: "Had a really fun time with Tripshala. The whole trip was well planned, from the ride and stay to the little things in between. The group vibe made it even better.",
    name: "Ayush Tomar",
  },
  {
    quote: "Loved how effortless the whole trip felt. We just had to show up, ride, explore and enjoy - Tripshala took care of the rest.",
    name: "Muskan",
  },
];

export function CommunityTeaser() {
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow !text-[#f3b58f]">The community</p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">The people make the trip.</h2>
          </div>
          <Link
            href="/community"
            className="group inline-flex items-center gap-2 text-sm font-semibold underline decoration-white/25 underline-offset-8 transition-colors hover:decoration-[#f3b58f]"
          >
            Meet the community
            <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          <TripPhoto src="/photos/community-lake-group.jpg" alt="Group photo by the lake on a Tripshala trip" sizes="(max-width: 768px) 100vw, 33vw" />
          <TripPhoto src="/photos/community-bikes-lineup.jpg" alt="Bikes lined up on a Tripshala ride" sizes="(max-width: 768px) 100vw, 33vw" />
          <TripPhoto src="/photos/community-tea-estate-group.jpg" alt="Group photo at a tea estate stop" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          {testimonials.map((t) => (
            <figure key={t.name} className="border-t border-white/15 pt-8">
              <blockquote className="font-display text-2xl font-light leading-snug text-paper/95 md:text-[1.7rem]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm font-medium tracking-wide text-paper/60">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
