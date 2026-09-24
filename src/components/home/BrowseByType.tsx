import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { FadeImage } from "../ui/FadeImage";
import { Reveal } from "../motion/Reveal";
import { trips, type TripCategory } from "@/lib/trips";

// Five ways into the catalogue. The first tile is the large one.
const TILES: Array<{ label: string; blurb: string; facet: "duration" | "type"; value: TripCategory; image: string; alt: string }> = [
  { label: "Long weekends", blurb: "Two nights, three days, somewhere properly far", facet: "duration", value: "Long Weekend", image: "/photos/gallery-boat-backwaters.jpg", alt: "A boat on the Kerala backwaters" },
  { label: "Weekend escapes", blurb: "Friday night out, Sunday night home", facet: "duration", value: "Weekend", image: "/photos/coorg-misty-hills.jpg", alt: "Mist over the Coorg hills" },
  { label: "Day trips", blurb: "Out at dawn, back for dinner", facet: "duration", value: "One Day", image: "/photos/lepakshi-nagalinga.jpg", alt: "The Nagalinga at Lepakshi" },
  { label: "Temple trails", blurb: "Old stone, living faith", facet: "type", value: "Temple Trails", image: "/photos/tirupati-tirumala-gopuram.jpg", alt: "The gopuram at Tirumala" },
  { label: "By the sea", blurb: "Beaches, bridges and backwaters", facet: "type", value: "Coastal", image: "/photos/rameshwaram-pamban-bridge-aerial.jpg", alt: "The Pamban bridge over the sea" },
];

export function BrowseByType() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Find your kind of trip</p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">{trips.length} ways out of the city.</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
          {TILES.map((t, i) => {
            const count = trips.filter((trip) => trip.categories.includes(t.value)).length;
            const big = i === 0;
            return (
              <Reveal key={t.label} delay={i * 70} className={big ? "col-span-2 row-span-2" : ""}>
                <Link
                  href={`/trips?${t.facet}=${encodeURIComponent(t.value)}`}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-ink"
                >
                  <FadeImage
                    src={t.image}
                    alt={t.alt}
                    fill
                    sizes={big ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    className="object-cover group-hover:scale-[1.05]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white md:p-5">
                    <div>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/70">{count} trips</p>
                      <h3 className={`mt-1 font-display font-medium leading-tight ${big ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
                        {t.label}
                      </h3>
                      {big && <p className="mt-2 max-w-xs text-sm text-white/80">{t.blurb}</p>}
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-ink">
                      <ArrowUpRight aria-hidden size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
