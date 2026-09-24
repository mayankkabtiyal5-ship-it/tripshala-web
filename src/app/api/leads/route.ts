import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

// Persists a booking-form submission to Supabase as a backup record, so a
// lead isn't lost if the visitor closes the tab instead of hitting send in
// WhatsApp. This is best-effort: it never blocks or fails the WhatsApp
// handoff on the client, and it never throws if Supabase isn't configured
// yet (see src/lib/supabase.ts).

function str(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function num(value: unknown): number | null {
  const s = str(value);
  if (s === null) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = str(body.name);
  const phone = str(body.phone);

  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    // Supabase env vars aren't set yet — skip persistence, don't error.
    return NextResponse.json({ ok: true, persisted: false });
  }

  const tripSlug = str(body.tripSlug);
  const source = str(body.source);

  // Opt-in dedupe (see the PDF-itinerary download flow): the same person
  // repeatedly downloading the same trip's itinerary shouldn't register a
  // fresh lead row every time. Scoped to phone + trip + source so it never
  // touches ordinary booking-form submissions, which should always record.
  if (body.dedupe === true && tripSlug && source) {
    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .eq("phone", phone)
      .eq("trip_slug", tripSlug)
      .eq("source", source)
      .limit(1);
    if (existing && existing.length > 0) {
      return NextResponse.json({ ok: true, persisted: true, deduped: true });
    }
  }

  const { error } = await supabase.from("leads").insert({
    trip_slug: str(body.tripSlug),
    trip_name: str(body.tripName),
    trip_date: str(body.tripDate),
    name,
    phone,
    email: str(body.email),
    age: num(body.age),
    city: str(body.city),
    people: num(body.people),
    has_bike: str(body.hasBike),
    bike_model: str(body.bikeModel),
    source: str(body.source),
    referral_code: str(body.referralCode),
    message: str(body.message),
  });

  if (error) {
    // Log server-side for debugging (visible in Vercel function logs), but
    // still return ok — the visitor already has their WhatsApp chat open
    // and shouldn't see a failure for a background write.
    console.error("Failed to save lead to Supabase:", error.message);
    return NextResponse.json({ ok: true, persisted: false });
  }

  return NextResponse.json({ ok: true, persisted: true });
}
