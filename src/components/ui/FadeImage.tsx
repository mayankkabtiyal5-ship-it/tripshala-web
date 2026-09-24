"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

// next/image that fades in once the file has loaded, instead of popping in.
// Handles images that were already cached before hydration (no onLoad fires
// for those) by checking `complete` on mount.
export function FadeImage({ className = "", onLoad, alt, ...props }: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <Image
      ref={ref}
      {...props}
      alt={alt}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`${className} transition-[opacity,transform] duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}
