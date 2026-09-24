"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxPhoto {
  src: string;
  alt: string;
  caption?: string;
}

// Full-screen photo viewer: arrows, keyboard (← → Esc), swipe on touch.
// Rendered into <body> through a portal so no ancestor transform or overflow
// can clip it.
export function PhotoLightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: LightboxPhoto[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const [touchX, setTouchX] = useState<number | null>(null);
  const go = useCallback(
    (delta: number) => onIndex((index + delta + photos.length) % photos.length),
    [index, onIndex, photos.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  const photo = photos[index];
  if (!photo) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Trip photos"
      className="fixed inset-0 z-[60] flex flex-col text-white"
      style={{ backgroundColor: "rgba(12, 10, 9, 0.97)" }}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        setTouchX(null);
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm text-white/70 sm:px-6">
        <span className="tabular-nums">
          {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photos"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <X size={18} />
        </button>
      </div>

      <div className="relative flex-1" onClick={onClose}>
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className="page-enter object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur hover:bg-white/25 sm:left-6"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur hover:bg-white/25 sm:right-6"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <p className="px-6 py-4 text-center text-sm text-white/75">{photo.caption ?? photo.alt}</p>
    </div>,
    document.body,
  );
}
