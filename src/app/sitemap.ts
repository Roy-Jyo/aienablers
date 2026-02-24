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

    // ✅ Add RaaS landing page here
    "/recruitment-as-a-service",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency:
      path === "/recruitment-as-a-service"
        ? "monthly"
        : path.startsWith("/knowledge")
        ? "monthly"
        : "weekly",

    priority:
      path === "/recruitment-as-a-service"
        ? 0.9
        : path === "/knowledge"
        ? 0.8
        : path.startsWith("/knowledge")
        ? 0.7
        : 0.6,
  }));
}