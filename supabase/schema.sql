-- Tripshala lead-capture schema.
-- Run this once in your Supabase project: Dashboard -> SQL Editor -> New query -> paste -> Run.
--
-- What this is for: every booking-form submission on the site gets saved
-- here as a backup record, in addition to the WhatsApp message it opens.
-- Nothing about the WhatsApp-first booking flow changes for visitors —
-- this is just a safety net so you never lose a lead who filled the form
-- but didn't hit "send" in WhatsApp.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Which trip
  trip_slug text,
  trip_name text,
  trip_date text,

  -- Who
  name text not null,
  phone text not null,
  email text,
  age int,
  city text,

  -- Booking details
  people int,
  has_bike text,
  bike_model text,
  source text,
  referral_code text,
  message text,

  -- For you to track manually in the Table Editor: new -> contacted -> confirmed / cancelled
  status text not null default 'new'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_trip_slug_idx on public.leads (trip_slug);

-- Lock the table down: only the server-side service_role key (used by the
-- site's /api/leads route) can read or write. The public/anon key — the
-- only key ever exposed to a browser — has zero access, since no policy
-- below grants it any.
alter table public.leads enable row level security;
