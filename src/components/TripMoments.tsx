import Image from "next/image";
import type { TripMoment } from "@/lib/trips";

// "From past trips" — real photos from earlier runs of this trip. The first
// photo gets the large slot; the rest stack beside it (or below on mobile).
export function TripMoments({ photos }: { photos: TripMoment[] }) {
  if (photos.length === 0) return null;
  const [lead, ...rest] = photos;

  return (
    <div className={`grid gap-3 ${rest.length > 0 ? "sm:grid-cols-2" : ""}`}>
      <Figure photo={lead} className={rest.length > 1 ? "sm:row-span-2" : ""} tall={rest.length > 1} />
      {rest.map((p) => (
        <Figure key={p.src} photo={p} />
      ))}
    </div>
  );
}

function Figure({ photo, className = "", tall = false }: { photo: TripMoment; className?: string; tall?: boolean }) {
  return (
    <figure className={`group relative overflow-hidden rounded-2xl bg-paper-raised ${tall ? "aspect-[4/5] sm:aspect-auto sm:h-full" : "aspect-[4/3]"} ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      {photo.caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-10 text-xs font-medium tracking-wide text-white">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}
