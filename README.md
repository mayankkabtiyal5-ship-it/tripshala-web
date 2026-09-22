# Tripshala website (v1)

Bengaluru's curated weekend travel and adventure community — bike rides,
weekend getaways and 1-2 day escapes. This is a v1 built to launch fast:
Next.js + TypeScript + Tailwind, WhatsApp as the primary lead-capture
mechanism, with every form submission also saved to Supabase as a backup
record (see "Lead storage" below).

Read **DEPLOYMENT.md** for exact steps to get this live. Read
**CONTENT_CHECKLIST.md** for exactly what to replace before launch (it's all
clearly marked `SAMPLE` / `TODO` in the code too).

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**
- Trip data lives in one file, `src/lib/trips.ts` — no database for that
- No payment gateway — booking forms hand off to WhatsApp with a pre-filled message
- **Supabase** (Postgres) stores a backup copy of every booking-form submission — see "Lead storage" below
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
    api/leads/route.ts        # POST endpoint the booking form calls to save a lead to Supabase
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
    supabase.ts                 # server-only Supabase client used by api/leads/route.ts
```

### Adding a new trip

Open `src/lib/trips.ts`, copy an existing trip object, give it a new unique
`slug`, and save. It automatically appears on `/trips` and gets its own
`/trips/[slug]` page — no other file needs to change.

## Lead storage (Supabase)

WhatsApp is still the primary booking flow — the form always opens WhatsApp
with the visitor's details pre-filled, exactly as before. On top of that,
every submission is also saved to a Supabase table (`leads`) as a backup
record, so nothing is lost if someone fills the form but never hits send in
WhatsApp.

- Schema: `supabase/schema.sql` — run once in the Supabase SQL Editor.
- Server client: `src/lib/supabase.ts` — reads `SUPABASE_URL` and
  `SUPABASE_SERVICE_ROLE_KEY` from environment variables. Until both are
  set, it just no-ops (no crash, no broken booking flow).
- Endpoint: `src/app/api/leads/route.ts` — the only thing that talks to
  Supabase; the service role key never reaches the browser.
- Full setup steps (create project, get keys, add to Vercel): see
  DEPLOYMENT.md, "Configure Supabase".
- To view/manage leads day to day: Supabase's own Table Editor (in your
  project dashboard) works like a spreadsheet — filter, sort, and edit the
  `status` column (`new` / `contacted` / `confirmed` / `cancelled`) by hand.

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
