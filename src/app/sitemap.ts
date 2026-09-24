import type { MetadataRoute } from "next";
import { trips } from "@/lib/trips";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

// Update this when the site's content actually changes (new trips, copy
// edits, etc). Using `new Date()` here would mark every page as "changed"
// on every deploy, which tells Google nothing useful and can dilute how
// often it bothers re-crawling pages that truly did change.
const CONTENT_LAST_UPDATED = new Date("2026-09-24");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/trips",
    "/corporate-school-trips",
    "/guides",
    "/about",
    "/community",
    "/faq",
    "/contact",
    "/referral",
    "/standard",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: CONTENT_LAST_UPDATED,
  }));

  const tripRoutes = trips.map((t) => ({
    url: `${site.url}/trips/${t.slug}`,
    lastModified: CONTENT_LAST_UPDATED,
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${site.url}/guides/${p.slug}`,
    lastModified: CONTENT_LAST_UPDATED,
  }));

  return [...staticRoutes, ...tripRoutes, ...blogRoutes];
}
