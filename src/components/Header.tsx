"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { NAV_LINKS, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/trips" variant="primary">
            Explore Trips
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/trips" variant="primary" className="w-full" onClick={() => setOpen(false)}>
              Explore Trips
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
