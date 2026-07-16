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
    "/job-board",
    "/job-market-search",
    "/recruitment-as-a-service",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency:
      path === "/job-market-search" || path === "/job-board"
        ? "daily"
        : path === "/recruitment-as-a-service" || path.startsWith("/knowledge")
        ? "monthly"
        : "weekly",
    priority:
      path === "/job-market-search"
        ? 0.9
        : path === "/recruitment-as-a-service"
        ? 0.9
        : path === "/job-board" || path === "/knowledge"
        ? 0.8
        : path.startsWith("/knowledge")
        ? 0.7
        : 0.6,
  }));
}
