import Image from "next/image";

// Real-photo counterpart to PlaceholderMedia — same aspect/className props
// so a slot can be swapped between the two without touching layout.
export function TripPhoto({
  src,
  alt,
  aspect = "aspect-[4/3]",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`relative flex ${aspect} w-full overflow-hidden rounded-2xl bg-paper-raised ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
