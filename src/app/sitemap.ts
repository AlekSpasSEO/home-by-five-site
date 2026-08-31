import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { enabledMarkets } from "@/config/markets";

/**
 * Sitemap.
 *
 * Only routes that carry real content are listed. Market pages are included
 * because each one is genuinely written for its market; if a market is ever
 * added to config without content, it is disabled and drops out of here
 * automatically.
 *
 * When translated routes ship, add their localized URLs alongside each entry
 * and keep the English URL as x-default in the page's `alternates`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/location-growth-blueprint", priority: 0.9 },
    { path: "/packages", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/how-it-works", priority: 0.8 },
    { path: "/franchises", priority: 0.8 },
    { path: "/franchisees", priority: 0.7 },
    { path: "/local-business", priority: 0.7 },
    { path: "/automation", priority: 0.7 },
    { path: "/markets", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/resources", priority: 0.3 },
  ];

  return [
    ...core.map((entry) => ({
      url: `${site.url}${entry.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: entry.priority,
    })),
    ...enabledMarkets().map((market) => ({
      url: `${site.url}/markets/${market.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
