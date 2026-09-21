# Tripshala website (v1)

Bengaluru's curated weekend travel and adventure community — bike rides,
weekend getaways and 1-2 day escapes. This is a v1 built to launch fast:
Next.js + TypeScript + Tailwind, no database, WhatsApp as the lead-capture
mechanism.

Read **DEPLOYMENT.md** for exact steps to get this live. Read
**CONTENT_CHECKLIST.md** for exactly what to replace before launch (it's all
clearly marked `SAMPLE` / `TODO` in the code too).

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**
- No database — trip data lives in one file, `src/lib/trips.ts`
- No payment gateway — booking forms hand off to WhatsApp with a pre-filled message
- Deploy target: **Vercel**

## File structure

```
src/
  app/                        # Routes (Next.js App Router = folders are URLs)
    page.tsx                  # Homepage /
    trips/page.tsx            # /trips (listing + filters)
    trips/[slug]/page.tsx     # /trips/sakleshpur-weekend-ride etc.
    about/page.tsx            # /about
    community/page.tsx        # /community
    faq/page.tsx              # /faq
    contact/page.tsx          # /contact
    referral/page.tsx         # /referral
    policies/terms/page.tsx
    policies/privacy/page.tsx
    policies/cancellation/page.tsx
    not-found.tsx             # 404 page
    sitemap.ts                # auto-generates /sitemap.xml
    robots.ts                 # auto-generates /robots.txt
    opengraph-image.tsx       # auto-generated social share image
    layout.tsx                # global shell: header, footer, fonts, analytics
    globals.css               # design tokens (colors, fonts) live here

  components/
    home/                      # homepage-only sections (Hero, WhyTripshala, etc.)
    ui/                        # generic building blocks (Button, Badge, Container...)
    Header.tsx / Footer.tsx
    TripCard.tsx               # the card used on homepage + /trips
    TripFilters.tsx            # category filter logic for /trips
    BookingForm.tsx            # the enquiry form -> WhatsApp handoff
    StickyMobileCTA.tsx        # mobile-only sticky "Book / WhatsApp" bar
    WhatsAppFloatingButton.tsx # mobile-only floating WhatsApp bubble
    Analytics.tsx              # loads GA4 + Meta Pixel if configured

  lib/
    site.ts                    # site-wide config: name, WhatsApp number, socials — EDIT THIS FIRST
    trips.ts                   # ALL trip data + the Trip type — add new trips here, nowhere else
    whatsapp.ts                # every WhatsApp message template, in one place
    analytics.ts                # event tracking helper + the list of tracked event names
```

### Adding a new trip

Open `src/lib/trips.ts`, copy an existing trip object, give it a new unique
`slug`, and save. It automatically appears on `/trips` and gets its own
`/trips/[slug]` page — no other file needs to change.

## Design system

Defined in `src/app/globals.css` as CSS variables, then exposed as Tailwind
utilities (so `bg-accent`, `text-ink`, `border-line` etc. all work directly
in JSX).

| Token | Hex | Use |
| --- | --- | --- |
| `--color-ink` | `#211d1a` | Primary text |
| `--color-paper` | `#faf7f2` | Page background |
| `--color-paper-raised` | `#f2ece1` | Card / section backgrounds |
| `--color-accent` | `#e2662a` | Primary brand color (buttons, links, highlights) |
| `--color-accent-2` | `#1f6f5c` | Secondary accent (success states, secondary highlights) |
| `--color-muted` | `#7a7266` | Secondary text |
| `--color-line` | `#e4ddd1` | Borders / dividers |

**Type:** Bricolage Grotesque (display/headings) + Inter (body), both loaded
from Google Fonts via a `<link>` tag in `layout.tsx` — this deliberately
avoids `next/font`'s build-time fetch so the site always builds even on a
restricted-network machine; real site visitors' browsers load the fonts
directly from Google's CDN as normal.

**Photography:** every photo on the site right now is an honest placeholder
(a labelled tan diagonal-stripe block via `PlaceholderMedia`), not a stock
photo pretending to be real. Replace them with real photography — see
CONTENT_CHECKLIST.md for exactly where each one lives.

## Run it locally

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Build for production (what Vercel runs)

```
npm run build
npm run start
```
