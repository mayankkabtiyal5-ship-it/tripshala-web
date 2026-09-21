import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#faf7f2",
          color: "#211d1a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, color: "#e2662a" }}>{site.name}</div>
        <div style={{ fontSize: 64, fontWeight: 800, marginTop: 20, lineHeight: 1.1 }}>
          {site.tagline}
        </div>
        <div style={{ fontSize: 28, marginTop: 30, color: "#7a7266" }}>{site.description}</div>
      </div>
    ),
    { ...size }
  );
}
