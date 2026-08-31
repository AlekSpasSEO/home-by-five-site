/**
 * Global site configuration.
 *
 * Everything that is "the company" rather than "the product" lives here:
 * name, contact routes, navigation, and the base currency the rest of the
 * pricing engine reads from.
 */

export const site = {
  name: "Home by Five",
  wordmark: { first: "HOME BY", second: "FIVE" },
  tagline: "Marketing for businesses with somewhere better to be at 5PM.",
  description:
    "Home by Five researches, builds and runs the marketing systems behind local service businesses and franchise networks. Priced by location, tied to clear deliverables.",

  /**
   * Canonical origin. Drives canonical URLs, sitemap entries, hreflang and
   * OpenGraph metadata.
   *
   * Set NEXT_PUBLIC_SITE_URL to override per build target (the GitHub Pages
   * preview does exactly that).
   *
   * TODO: replace this default with the production domain before launch.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://homebyfive.com",

  /** Subdirectory the site is served from. Empty on a real domain. */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",

  /** TODO: replace with real contact routes. */
  email: "hello@homebyfive.com",

  /** Base currency for all catalog pricing. Market overrides live in markets.ts. */
  baseCurrency: "USD" as const,
  baseCurrencySymbol: "$",

  nav: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Blueprint", href: "/location-growth-blueprint" },
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "Markets", href: "/markets" },
    { label: "About", href: "/about" },
  ],

  /** Secondary navigation, grouped by who is reading. */
  audienceNav: [
    { label: "Franchise brands", href: "/franchises" },
    { label: "Franchisees", href: "/franchisees" },
    { label: "Independent local business", href: "/local-business" },
    { label: "Automation", href: "/automation" },
  ],

  footerNav: [
    {
      heading: "Start here",
      links: [
        { label: "Location Growth Blueprint", href: "/location-growth-blueprint" },
        { label: "How it works", href: "/how-it-works" },
        { label: "Build a package", href: "/packages" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Who we work with",
      links: [
        { label: "Franchise brands", href: "/franchises" },
        { label: "Franchisees", href: "/franchisees" },
        { label: "Independent local business", href: "/local-business" },
      ],
    },
    {
      heading: "What we run",
      links: [
        { label: "Service catalog", href: "/services" },
        { label: "Automation & cost savings", href: "/automation" },
        { label: "Markets", href: "/markets" },
        { label: "Resources", href: "/resources" },
      ],
    },
  ],
} as const;

export type Site = typeof site;
