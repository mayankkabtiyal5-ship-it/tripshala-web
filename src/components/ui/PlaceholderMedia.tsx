import { LogoMark } from "./Logo";

// Stand-in for trips that don't have real photography yet. Rather than a
// grey box, it's a warm typographic tile: the destination name set large in
// the display face over a soft brand gradient, with the Tripshala mark. Swap
// in a real `coverImage` on the trip as soon as photos exist.
export function PlaceholderMedia({
  label,
  title,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  label: string; // descriptive alt text for the missing photo
  title?: string; // big text on the tile, e.g. the destination
  aspect?: string;
  className?: string;
}) {
  const heading = title ?? label;
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex ${aspect} w-full items-end overflow-hidden rounded-2xl bg-[radial-gradient(120%_90%_at_20%_10%,#e9a57c_0%,#c8552a_45%,#5a2a17_100%)] ${className}`}
    >
      <LogoMark className="absolute -right-6 -top-4 h-40 w-auto text-white/10" />
      <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_22px,rgba(255,255,255,0.035)_22px_44px)]" />
      <div className="relative p-5 pb-12 text-white">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/70">Tripshala</p>
        <p className="mt-1 font-display text-3xl font-medium leading-tight">{heading}</p>
      </div>
    </div>
  );
}
