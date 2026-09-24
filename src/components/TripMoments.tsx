"use client";

import { useState } from "react";
import type { TripMoment } from "@/lib/trips";
import { FadeImage } from "./ui/FadeImage";
import { PhotoLightbox } from "./trip/PhotoLightbox";

// "From past trips" — real photos from earlier runs of this trip. The first
// photo gets the large slot; the rest stack beside it (or below on mobile).
// Tapping any photo opens the full-screen gallery.
export function TripMoments({ photos }: { photos: TripMoment[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (photos.length === 0) return null;
  const [lead, ...rest] = photos;

  return (
    <>
      <div className={`grid gap-3 ${rest.length > 0 ? "sm:grid-cols-2" : ""}`}>
        <Figure photo={lead} onOpen={() => setOpen(0)} className={rest.length > 1 ? "sm:row-span-2" : ""} tall={rest.length > 1} />
        {rest.map((p, i) => (
          <Figure key={p.src} photo={p} onOpen={() => setOpen(i + 1)} />
        ))}
      </div>
      {open !== null && <PhotoLightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}

function Figure({
  photo,
  onOpen,
  className = "",
  tall = false,
}: {
  photo: TripMoment;
  onOpen: () => void;
  className?: string;
  tall?: boolean;
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl bg-paper-raised ${tall ? "aspect-[4/5] sm:aspect-auto sm:h-full" : "aspect-[4/3]"} ${className}`}
    >
      <button type="button" onClick={onOpen} className="absolute inset-0 cursor-zoom-in" aria-label={`View ${photo.alt} full screen`}>
        <FadeImage
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover group-hover:scale-[1.03]"
        />
      </button>
      {photo.caption && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-10 text-xs font-medium tracking-wide text-white">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}
