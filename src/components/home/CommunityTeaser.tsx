import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { TripPhoto } from "../ui/TripPhoto";
import { testimonials } from "@/lib/testimonials";

const featured = testimonials.filter((t) => t.featured).slice(0, 4);

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
          <TripPhoto src="/photos/munnar-group-lakeside.jpg" alt="Tripshala group by the lake in Munnar" aspect="aspect-[4/5]" sizes="(max-width: 768px) 100vw, 33vw" />
          <TripPhoto src="/photos/fog-trek-summit.jpg" alt="A traveller with arms open on a fog-covered summit" aspect="aspect-[4/5]" sizes="(max-width: 768px) 100vw, 33vw" />
          <TripPhoto src="/photos/kochi-mattancherry-group.jpg" alt="Group on the stairs at Mattancherry Palace, Kochi" aspect="aspect-[4/5]" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {featured.map((t) => (
            <figure key={t.name} className="border-t border-white/15 pt-8">
              <blockquote className="font-display text-xl font-light leading-snug text-paper/95 md:text-2xl">
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
