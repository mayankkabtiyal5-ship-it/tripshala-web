import { ImageResponse } from "next/og";
import { getTripBySlug, trips } from "@/lib/trips";
import { OG_SIZE, OgLogo, ogDisplayFont, ogPhoto } from "@/lib/og";
import { tripDateLabel } from "@/lib/departures";

export const alt = "Tripshala trip";
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 21600;

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

// Share card for WhatsApp / Instagram / X: the trip's photo, title, dates
// and price, with the Tripshala mark.
export default async function TripOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  const [photo, font] = await Promise.all([ogPhoto(trip?.coverImage), ogDisplayFont()]);
  const title = trip?.title ?? "Tripshala";
  const price = trip ? `₹${trip.price.toLocaleString("en-IN")}` : "";
  const when = trip ? tripDateLabel(trip) : "";
  const duration = trip?.duration.split(" (")[0] ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "radial-gradient(120% 90% at 20% 10%, #e9a57c 0%, #c8552a 45%, #5a2a17 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {photo && (
          <img src={photo} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, width: 1200, height: 630, objectFit: "cover" }} />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.05) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <OgLogo color="#f3b58f" size={46} />
            <div style={{ fontSize: 34, fontFamily: font ? "Fraunces" : "serif" }}>Tripshala</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            {when && (
              <div style={{ display: "flex", fontSize: 24, letterSpacing: 2, textTransform: "uppercase", color: "#f3b58f" }}>{when}</div>
            )}
            <div style={{ display: "flex", fontSize: title.length > 38 ? 60 : 72, lineHeight: 1.05, marginTop: 14, fontFamily: font ? "Fraunces" : "serif" }}>
              {title}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 28, fontSize: 28 }}>
              {price && (
                <div style={{ display: "flex", background: "white", color: "#1c1917", borderRadius: 999, padding: "10px 24px", fontWeight: 700 }}>
                  {price} <span style={{ marginLeft: 8, fontWeight: 400, color: "#6f675c" }}>/ person</span>
                </div>
              )}
              {duration && <div style={{ display: "flex", color: "rgba(255,255,255,0.85)" }}>{duration} · from Bengaluru</div>}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Fraunces", data: font, weight: 500, style: "normal" }] : undefined,
    },
  );
}
