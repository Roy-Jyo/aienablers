// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE = "https://www.aienablers.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/privacy",
    "/knowledge",
    "/knowledge/ai-in-recruitment",
    "/knowledge/autonomous-hiring",
    // add more KB slugs here as you publish
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith("/knowledge") ? "monthly" : "weekly",
    priority: path === "/knowledge" ? 0.8 : path.startsWith("/knowledge") ? 0.7 : 0.6,
  }));
}