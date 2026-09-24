import { site } from "./site";
import { LOGO_PATH } from "@/components/ui/Logo";

// Shared helpers for the share-card images (Open Graph). Everything is
// fetched defensively: if a photo or font can't be loaded (e.g. a photo that
// isn't deployed yet), the card still renders with the brand gradient.

export const OG_SIZE = { width: 1200, height: 630 };

async function toDataUrl(url: string, type: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return `data:${type};base64,${buf.toString("base64")}`;
}

/** A public photo as a data URL, or null if it can't be fetched. */
export async function ogPhoto(path?: string): Promise<string | null> {
  if (!path) return null;
  try {
    return await toDataUrl(new URL(path, site.url).toString(), "image/jpeg");
  } catch {
    return null;
  }
}

/** Fraunces (display serif) as TTF for the card headline, or null. */
export async function ogDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    // An old user agent makes Google Fonts serve TTF, which the renderer needs.
    const css = await (
      await fetch("https://fonts.googleapis.com/css2?family=Fraunces:wght@500", {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; MSIE 8.0)" },
      })
    ).text();
    const src = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export function OgLogo({ color = "#ffffff", size = 44 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={(size * 1112) / 1096} viewBox="0 0 1096 1112">
      <g transform="translate(0,1112) scale(0.1,-0.1)" fill={color}>
        <path d={LOGO_PATH} />
      </g>
    </svg>
  );
}
