import type { MetadataRoute } from "next";
import { trips } from "@/lib/trips";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/trips",
    "/about",
    "/community",
    "/faq",
    "/contact",
    "/referral",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const tripRoutes = trips.map((t) => ({
    url: `${site.url}/trips/${t.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...tripRoutes];
}
