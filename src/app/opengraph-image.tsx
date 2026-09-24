import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { OG_SIZE, OgLogo, ogFonts, ogPhoto } from "@/lib/og";

export const alt = `${site.name} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

// Site-wide share card: the hero photograph with the tagline.
export default async function OpengraphImage() {
  const [photo, { fonts, display, body }] = await Promise.all([ogPhoto("/photos/chikmagalur-peak.jpg"), ogFonts()]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#1c1917", color: "white", fontFamily: body }}>
        {photo && (
          <img src={photo} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, width: 1200, height: 630, objectFit: "cover" }} />
        )}
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 70%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <OgLogo color="#f3b58f" size={46} />
            <div style={{ fontSize: 34, fontFamily: display, fontWeight: 500 }}>Tripshala</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 76, lineHeight: 1.04, fontFamily: display, fontWeight: 500 }}>The trip&apos;s planned.</div>
            <div style={{ display: "flex", fontSize: 76, lineHeight: 1.04, fontFamily: display, fontWeight: 500 }}>
              You just have to&nbsp;<span style={{ color: "#f3b58f", fontStyle: "italic", fontWeight: 400 }}>show up.</span>
            </div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 28, color: "rgba(255,255,255,0.85)" }}>
              Curated weekend and long-weekend trips from Bengaluru
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
