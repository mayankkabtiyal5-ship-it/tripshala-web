import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "whatsapp";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-dark active:scale-[0.98]",
  secondary:
    "bg-ink text-paper hover:bg-ink/90 active:scale-[0.98]",
  outline:
    "border border-line text-ink hover:border-ink active:scale-[0.98]",
  whatsapp:
    "bg-[#25D366] text-white hover:brightness-95 active:scale-[0.98]",
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
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-transform ${variantClasses[variant]} ${className}`;

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
