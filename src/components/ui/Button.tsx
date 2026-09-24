import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "whatsapp" | "ghost-light";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-sm shadow-accent/20 hover:bg-accent-dark",
  secondary:
    "bg-ink text-paper hover:bg-ink/85",
  outline:
    "border border-ink/15 text-ink hover:border-ink/60 hover:bg-white",
  whatsapp:
    "bg-[#25D366] text-white hover:brightness-95",
  // For use on top of photography / dark backgrounds.
  "ghost-light":
    "border border-white/40 text-white backdrop-blur-sm hover:border-white hover:bg-white/10",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  target,
  rel,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
