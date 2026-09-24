import { readFile } from "node:fs/promises";
import { join } from "node:path";
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

/**
 * A public photo as a data URL, or null. Reads the file from /public at
 * build time; falls back to fetching it from the live site (e.g. during a
 * background re-render where /public isn't on disk).
 */
export async function ogPhoto(path?: string): Promise<string | null> {
  if (!path) return null;
  try {
    const buf = await readFile(join(process.cwd(), "public", path.replace(/^\//, "")));
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    // fall through to network
  }
  try {
    return await toDataUrl(new URL(path, site.url).toString(), "image/jpeg");
  } catch {
    return null;
  }
}

// Fonts ship with the repo (assets/fonts, SIL Open Font License) so the card
// never depends on a network call. They must be TTF/OTF/WOFF — the renderer
// can't read WOFF2.
function isSupportedFont(buf: Buffer) {
  const sig = buf.subarray(0, 4).toString("latin1");
  return sig === "wOFF" || sig === "OTTO" || sig === "true" || buf.readUInt32BE(0) === 0x00010000;
}

async function loadFont(file: string): Promise<Buffer | null> {
  try {
    const buf = await readFile(join(process.cwd(), "assets", "fonts", file));
    return isSupportedFont(buf) ? buf : null;
  } catch {
    return null;
  }
}

/**
 * Fonts for share cards: Fraunces for headlines (500 upright, 400 italic for
 * accents) and Inter for everything else. "Inter Ext" covers characters the
 * basic Latin subset lacks, notably the rupee sign.
 */
export async function ogFonts() {
  const files: Array<[string, string, 400 | 500 | 600, "normal" | "italic"]> = [
    ["Inter", "inter-400.woff", 400, "normal"],
    ["Inter", "inter-600.woff", 600, "normal"],
    ["Inter Ext", "inter-ext-400.woff", 400, "normal"],
    ["Inter Ext", "inter-ext-600.woff", 600, "normal"],
    ["Fraunces", "fraunces-500.woff", 500, "normal"],
    ["Fraunces", "fraunces-400-italic.woff", 400, "italic"],
  ];
  const loaded = await Promise.all(files.map(async ([name, file, weight, style]) => ({ name, data: await loadFont(file), weight, style })));
  const fonts = loaded.filter((f): f is typeof f & { data: Buffer } => f.data !== null);
  const hasFraunces = fonts.some((f) => f.name === "Fraunces");
  const hasInter = fonts.some((f) => f.name === "Inter");
  return {
    fonts: fonts.length ? fonts : undefined,
    display: hasFraunces ? "Fraunces" : "serif",
    body: hasInter ? "Inter, Inter Ext" : "sans-serif",
  };
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
