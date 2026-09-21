import { ReactNode } from "react";

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "success" | "warning";
}) {
  const toneClasses: Record<string, string> = {
    default: "bg-paper-raised text-ink border-line",
    accent: "bg-accent/10 text-accent-dark border-accent/30",
    success: "bg-accent-2/10 text-accent-2 border-accent-2/30",
    warning: "bg-amber-100 text-amber-800 border-amber-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
