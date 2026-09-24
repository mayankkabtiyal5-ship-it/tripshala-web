"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { track, AnalyticsEvents } from "@/lib/analytics";
import { whatsappMessages } from "@/lib/whatsapp";

// Google Places Autocomplete (New) key. Optional — see DEPLOYMENT.md
// "Configure Google Places". Until it's set, this section still works:
// it just falls back to a plain text field instead of a live place search,
// the same "no-ops until configured" pattern used for GA4/Meta Pixel/Supabase
// elsewhere in this codebase.
const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

// The Places JS API's types ship only via @types/google.maps, which isn't
// worth adding as a dependency for one component — this file treats the
// library's objects as `any` at the boundary instead, same as the rest of
// this Google-provided loader snippet below.
type GooglePlaceAutocompleteElement = HTMLElement & {
  includedRegionCodes?: string[];
};

interface GmpSelectEvent extends Event {
  placePrediction: {
    toPlace: () => {
      fetchFields: (opts: { fields: string[] }) => Promise<void>;
      displayName?: string;
      formattedAddress?: string;
    };
  };
}

declare global {
  interface Window {
    google?: {
      maps: {
        importLibrary: (library: string) => Promise<{
          PlaceAutocompleteElement: new () => GooglePlaceAutocompleteElement;
        }>;
      };
    };
  }
}

// Official Google-provided inline bootstrap loader for `google.maps.importLibrary`
// (https://developers.google.com/maps/documentation/javascript/load-maps-js-api) —
// kept as one function so it's easy to diff against Google's own snippet later.
function loadGoogleMaps(apiKey: string) {
  if (window.google?.maps?.importLibrary) return;
  /* eslint-disable */
  (function (g: any) {
    let h: any,
      a: any,
      k: any,
      p = "The Google Maps JavaScript API",
      c = "google",
      l = "importLibrary",
      q = "__ib__",
      m: any = document,
      b: any = window;
    b = b[c] || (b[c] = {});
    const d = b.maps || (b.maps = {}),
      r = new Set(),
      e = new URLSearchParams(),
      u = () =>
        h ||
        (h = new Promise(async (f, n) => {
          a = m.createElement("script");
          e.set("libraries", [...r] + "");
          for (k in g) e.set(k.replace(/[A-Z]/g, (t: string) => "_" + t[0].toLowerCase()), g[k]);
          e.set("callback", c + ".maps." + q);
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
          d[q] = f;
          a.onerror = () => (h = n(Error(p + " could not load.")));
          a.nonce = m.querySelector("script[nonce]")?.nonce || "";
          m.head.append(a);
        }));
    d[l]
      ? console.warn(p + " only loads once. Ignoring:", g)
      : (d[l] = (f: any, ...n: any[]) => r.add(f) && u().then(() => d[l](f, ...n)));
  })({ key: apiKey, v: "weekly" });
  /* eslint-enable */
}

export function HiddenGemSuggest() {
  const autocompleteHostRef = useRef<HTMLDivElement>(null);
  const [selectedPlace, setSelectedPlace] = useState<{ name: string; address: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!GOOGLE_PLACES_API_KEY || !autocompleteHostRef.current) return;
    let cancelled = false;

    loadGoogleMaps(GOOGLE_PLACES_API_KEY);

    (async () => {
      try {
        const { PlaceAutocompleteElement } = await window.google!.maps.importLibrary("places") as {
          PlaceAutocompleteElement: new () => GooglePlaceAutocompleteElement;
        };
        if (cancelled || !autocompleteHostRef.current) return;

        const el = new PlaceAutocompleteElement();
        el.includedRegionCodes = ["in"];
        autocompleteHostRef.current.innerHTML = "";
        autocompleteHostRef.current.appendChild(el);

        el.addEventListener("gmp-select", (async (event: GmpSelectEvent) => {
          const place = event.placePrediction.toPlace();
          await place.fetchFields({ fields: ["displayName", "formattedAddress"] });
          setSelectedPlace({
            name: place.displayName || "",
            address: place.formattedAddress || "",
          });
        }) as unknown as EventListener);
      } catch (err) {
        // Places API failed to load (bad key, network, quota) — the plain
        // text fallback below still works, so fail silently here.
        console.error("Google Places Autocomplete failed to load:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const placeFallback = String(data.get("placeFallback") || "");
    const place = selectedPlace?.name || placeFallback;
    const placeDetail = selectedPlace?.address ? ` (${selectedPlace.address})` : "";

    if (!place) return;

    track(AnalyticsEvents.HIDDEN_GEM_SUGGESTED, { place });

    // Reuses the same /api/leads + leads table as the booking form — no
    // schema change needed. `source` marks these rows so they're easy to
    // filter separately from booking enquiries in the Supabase table editor.
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          source: "hidden_gem_suggestion",
          message: `Suggested place: ${place}${placeDetail}`,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Ignore — never let this block the WhatsApp handoff.
    }

    const link = whatsappMessages.hiddenGemSuggestion({ name, phone, place: place + placeDetail });
    setSubmitted(true);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="bg-paper-raised py-20 md:py-28">
      <Container className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className="eyebrow">Suggest a destination</p>
          <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">Know a hidden gem near Bengaluru?</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            The best trips on this site started as a place someone in the
            community mentioned once. Tell us about somewhere less-explored
            and we&apos;ll look into planning a trip there — and you&apos;ll
            be first to know if it happens.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-accent-2/30 bg-accent-2/10 p-6 text-center">
            <p className="font-semibold text-accent-2">We&apos;ve opened WhatsApp with your suggestion filled in.</p>
            <p className="mt-2 text-sm text-muted">Just hit send — thanks for the tip.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-line bg-white p-6">
            <div>
              <label className="text-sm font-medium">
                Place <span className="text-accent">*</span>
              </label>
              {GOOGLE_PLACES_API_KEY ? (
                <div ref={autocompleteHostRef} className="mt-1 [&_gmp-place-autocomplete]:w-full" />
              ) : (
                <input
                  name="placeFallback"
                  required
                  placeholder="e.g. a waterfall, a village, a viewpoint..."
                  className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              )}
              {selectedPlace && (
                <p className="mt-1.5 text-xs text-muted">Selected: {selectedPlace.name}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">
                  Name <span className="text-accent">*</span>
                </span>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">
                  Phone <span className="text-accent">*</span>
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Suggest this place
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
