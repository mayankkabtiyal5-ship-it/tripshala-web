import { Camera } from "lucide-react";
// Honest placeholder for trip/community photography that doesn't exist yet.
// Deliberately NOT a fake stock photo — it's labeled so nobody mistakes it
// for real trust-building imagery. Swap for real photos before launch
// (see the "Content I need from Mayank" checklist in DEPLOYMENT.md).

export function PlaceholderMedia({
  label,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`placeholder-media relative flex ${aspect} w-full items-end overflow-hidden rounded-2xl border border-line ${className}`}
    >
      <div className="m-3 rounded-lg bg-ink/80 px-3 py-1.5 text-xs font-medium text-paper backdrop-blur-sm">
        <Camera aria-hidden size={12} className="mr-1.5 inline-block -translate-y-px" />{label}
      </div>
    </div>
  );
}
