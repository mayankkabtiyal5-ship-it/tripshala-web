"use client";

import Image from "next/image";
import { useState } from "react";
import { Images } from "lucide-react";
import { PhotoLightbox, type LightboxPhoto } from "./PhotoLightbox";

// The trip page's hero photo. When the trip has more than one photo, a
// "View all photos" button opens the full-screen gallery.
export function TripHeroMedia({ photos }: { photos: LightboxPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [cover] = photos;
  if (!cover) return null;

  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-raised">
      <button
        type="button"
        onClick={() => setOpen(0)}
        className="absolute inset-0 cursor-zoom-in"
        aria-label={`View ${cover.alt} full screen`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </button>
      {photos.length > 1 && (
        <button
          type="button"
          onClick={() => setOpen(0)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-ink shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <Images aria-hidden size={14} /> View all {photos.length} photos
        </button>
      )}
      {open !== null && (
        <PhotoLightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}
