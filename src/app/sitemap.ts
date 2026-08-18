import type { MetadataRoute } from "next";
import { event } from "@/config/event";
import { getPublishedExhibitors } from "@/lib/data/exhibitors";
import { getPublishedNews } from "@/lib/data/news";

// Includes MongoDB-backed exhibitor/news URLs. `revalidate` alone still
// bakes in whatever the build environment saw (e.g. no MONGODB_URI at
// build time, which is a common real deployment setup) and then serves
// that stale result — including an empty dynamic-entries list — for the
// full revalidate window. force-dynamic guarantees every request reflects
// the current published state, matching the other MongoDB-backed routes.
export const dynamic = "force-dynamic";

const STATIC_ROUTES = [
  "",
  "/about",
  "/why-tanzania",
  "/venue",
  "/organisers",
  "/exhibit",
  "/who-should-exhibit",
  "/exhibition-profile",
  "/exhibitor-services",
  "/book-a-stand",
  "/visit",
  "/who-should-visit",
  "/register-to-visit",
  "/plan-your-visit",
  "/exhibitors",
  "/partners",
  "/news",
  "/gallery",
  "/downloads",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || event.website;

  const [exhibitors, news] = await Promise.all([getPublishedExhibitors(), getPublishedNews()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const exhibitorEntries: MetadataRoute.Sitemap = exhibitors.map((e) => ({
    url: `${siteUrl}/exhibitors/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${siteUrl}/news/${n.slug}`,
    lastModified: new Date(n.publishedAt as unknown as string),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...exhibitorEntries, ...newsEntries];
}
