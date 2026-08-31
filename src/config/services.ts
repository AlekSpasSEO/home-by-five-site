/**
 * Service catalog.
 *
 * Every price on the site comes from this file. Nothing is hardcoded in a
 * component. Changing a price is a one-line edit here, and the package builder,
 * the services page and the market pages all update together.
 *
 * Prices are in the base currency (see site.ts). Market-level overrides are
 * keyed by unit id in markets.ts under `pricing.overrides`.
 *
 * NOTE ON PRICES: these are working figures for the first build, not a signed
 * price list. Confirm the catalog before the site goes live.
 */

/** Which package-builder module switches a unit on. */
export type ModuleId =
  | "local-seo"
  | "links"
  | "content"
  | "pages-cro"
  | "technical-seo"
  | "geo"
  | "paid-search"
  | "paid-social"
  | "organic-social"
  | "photography"
  | "pr"
  | "automation"
  | "always-on";

/**
 * How a unit's price turns into money.
 *
 * per-location-month      price x locations, every month
 * per-unit-location-month price x quantity x locations, every month
 * per-unit-network-month  price x quantity, every month, network-wide
 * per-network-month       price once per month, network-wide
 * one-time-location       price x locations, once
 * one-time-network        price once, network-wide
 * included                no charge inside a monthly package
 * quote                   scoped and priced separately
 */
export type PriceScale =
  | "per-location-month"
  | "per-unit-location-month"
  | "per-unit-network-month"
  | "per-network-month"
  | "one-time-location"
  | "one-time-network"
  | "included"
  | "quote";

export interface ServiceUnit {
  id: string;
  label: string;
  summary: string;
  includes: string[];
  /** Base-currency price. null means quote-only. */
  price: number | null;
  scale: PriceScale;
  module: ModuleId;
  /** Singular noun for the thing being bought, used in deliverable counts. */
  unitNoun?: string;
  note?: string;
  /** Surfaced in the UI as requiring sign-off before it is bought. */
  approvalRequired?: boolean;
}

export interface ServiceCategory {
  id: string;
  label: string;
  summary: string;
  units: ServiceUnit[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "local-seo",
    label: "Local SEO",
    summary:
      "The work that decides whether a location shows up when someone nearby needs it. Profile, listings, consistency, and monitoring the market around you.",
    units: [
      {
        id: "local-seo-core",
        label: "Citation management and local tracking",
        summary:
          "The ongoing hygiene layer under every location: listings monitoring, cleanup, and local rank tracking.",
        includes: [
          "Local listing platform management",
          "Citation monitoring",
          "Citation drip",
          "Citation cleanup",
          "NAP consistency across sources",
          "Local rank tracking",
        ],
        price: 95,
        scale: "per-location-month",
        module: "local-seo",
        note: "Where local platform coverage differs by market, the tooling is substituted at market level rather than forced.",
      },
      {
        id: "custom-citation",
        label: "Custom citation",
        summary:
          "A directory or listing that has to be built by hand because it will not come from an automated feed.",
        includes: [
          "Research",
          "Setup",
          "Submission",
          "Directory action",
          "Vendor fee where relevant",
          "Local-market account-owner action where necessary",
        ],
        price: 25,
        scale: "per-unit-location-month",
        module: "local-seo",
        unitNoun: "citation",
      },
      {
        id: "gbp-optimization",
        label: "Google Business Profile optimization",
        summary:
          "A full rebuild of the profile that most often decides whether a location appears in the map results.",
        includes: [
          "Complete profile review",
          "Categories",
          "Services",
          "Description",
          "Images",
          "Conversion elements",
          "Local relevance",
          "Tracking",
          "Competitor comparison",
        ],
        price: 250,
        scale: "one-time-location",
        module: "local-seo",
      },
      {
        id: "gbp-post",
        label: "Google Business Profile posts",
        summary: "Monthly posting on the profile, sold by quantity per location.",
        includes: ["Copy", "Creative", "Offer or update", "Publishing", "Tracking"],
        price: 18,
        scale: "per-unit-location-month",
        module: "local-seo",
        unitNoun: "GBP post",
      },
      {
        id: "local-market-monitoring",
        label: "Local market monitoring",
        summary:
          "Someone watching the market around each location so changes get caught while they are still cheap to answer.",
        includes: [
          "Competitor monitoring",
          "Local gaps",
          "Search result changes",
          "Market changes",
          "Opportunity identification",
        ],
        price: 60,
        scale: "per-location-month",
        module: "local-seo",
      },
    ],
  },
  {
    id: "authority",
    label: "Authority and links",
    summary:
      "Earned placements on real publications, bought by authority tier. We never sell volume, and we never promise placements we cannot stand behind.",
    units: [
      {
        id: "link-dr30",
        label: "Authority link, DR 30-49",
        summary: "Entry-tier relevant placements, usually regional or niche publications.",
        includes: [
          "Research",
          "Outreach",
          "Placement",
          "Relevance check",
          "Quality assurance",
          "Competitor-gap monitoring",
          "Reporting",
        ],
        price: 180,
        scale: "per-unit-location-month",
        module: "links",
        unitNoun: "link",
      },
      {
        id: "link-dr50",
        label: "Authority link, DR 50-69",
        summary: "Mid-tier placements on established publications with real audiences.",
        includes: [
          "Research",
          "Outreach",
          "Placement",
          "Relevance check",
          "Quality assurance",
          "Competitor-gap monitoring",
          "Reporting",
        ],
        price: 320,
        scale: "per-unit-location-month",
        module: "links",
        unitNoun: "link",
      },
      {
        id: "link-dr70",
        label: "Authority link, DR 70-89",
        summary: "High-tier placements. Fewer, slower, and considerably more valuable.",
        includes: [
          "Research",
          "Outreach",
          "Placement",
          "Relevance check",
          "Quality assurance",
          "Competitor-gap monitoring",
          "Reporting",
        ],
        price: 650,
        scale: "per-unit-location-month",
        module: "links",
        unitNoun: "link",
      },
      {
        id: "link-dr90",
        label: "Authority link, DR 90+",
        summary:
          "Top-tier placements. These are genuinely scarce and priced accordingly.",
        includes: [
          "Research",
          "Outreach",
          "Placement",
          "Relevance check",
          "Quality assurance",
          "Reporting",
        ],
        price: 1400,
        scale: "per-unit-location-month",
        module: "links",
        unitNoun: "link",
        approvalRequired: true,
      },
      {
        id: "link-premium-editorial",
        label: "Premium editorial opportunity",
        summary:
          "Specific, named opportunities that come up and are worth taking. Priced individually because genuinely good placements can cost substantially more than a tier price.",
        includes: [
          "Opportunity identification",
          "Editorial fit assessment",
          "Cost and value case",
          "Approval before any spend",
        ],
        price: null,
        scale: "quote",
        module: "links",
        approvalRequired: true,
        note: "Always approved individually. We will not spend into a premium placement without a yes.",
      },
    ],
  },
  {
    id: "content",
    label: "Content",
    summary:
      "Finished content, priced by length. You are buying the researched, edited, published article, not a word count.",
    units: [
      {
        id: "content-1000",
        label: "Content, 1,000 words",
        summary: "Short-form service or local content.",
        includes: [
          "Research",
          "Customer profile alignment",
          "Local-market alignment",
          "Search and AI-visibility brief",
          "Copywriting",
          "Editing",
          "Internal linking recommendations",
          "Metadata",
          "Publishing where selected",
        ],
        price: 220,
        scale: "per-unit-location-month",
        module: "content",
        unitNoun: "article",
      },
      {
        id: "content-2000",
        label: "Content, 2,000 words",
        summary: "Standard depth for a service or comparison page.",
        includes: [
          "Research",
          "Customer profile alignment",
          "Local-market alignment",
          "Search and AI-visibility brief",
          "Copywriting",
          "Editing",
          "Internal linking recommendations",
          "Metadata",
          "Publishing where selected",
        ],
        price: 390,
        scale: "per-unit-location-month",
        module: "content",
        unitNoun: "article",
      },
      {
        id: "content-5000",
        label: "Content, 5,000 words",
        summary: "Depth piece intended to hold a topic rather than visit it.",
        includes: [
          "Research",
          "Customer profile alignment",
          "Local-market alignment",
          "Search and AI-visibility brief",
          "Copywriting",
          "Editing",
          "Internal linking recommendations",
          "Metadata",
          "Publishing where selected",
        ],
        price: 850,
        scale: "per-unit-location-month",
        module: "content",
        unitNoun: "article",
      },
      {
        id: "content-10000",
        label: "Content, 10,000 words",
        summary: "Reference-grade content, usually one per quarter at most.",
        includes: [
          "Research",
          "Customer profile alignment",
          "Local-market alignment",
          "Search and AI-visibility brief",
          "Copywriting",
          "Editing",
          "Internal linking recommendations",
          "Metadata",
          "Publishing where selected",
        ],
        price: 1550,
        scale: "per-unit-location-month",
        module: "content",
        unitNoun: "article",
      },
    ],
  },
  {
    id: "pages",
    label: "Pages and development",
    summary:
      "Pages that exist to convert, and the technical work that keeps them findable. Built, not templated over.",
    units: [
      {
        id: "custom-page",
        label: "Custom page",
        summary: "A page built from scratch for a specific job.",
        includes: [
          "Copy",
          "Custom page structure",
          "Relevant page elements",
          "Internal links",
          "Metadata",
          "Schema where appropriate",
          "Conversion considerations",
          "Implementation",
          "QA",
        ],
        price: 650,
        scale: "per-unit-location-month",
        module: "pages-cro",
        unitNoun: "page",
      },
      {
        id: "templated-page",
        label: "Templated location or service page",
        summary:
          "Uses an approved template, but carries market-specific content and data. Never a duplicate with the city name swapped.",
        includes: [
          "Approved template",
          "Market-specific content",
          "Local data",
          "Internal links",
          "Metadata",
          "QA",
        ],
        price: 180,
        scale: "per-unit-location-month",
        module: "pages-cro",
        unitNoun: "page",
      },
      {
        id: "landing-page",
        label: "Landing page",
        summary: "Built for a paid campaign or a single conversion intent.",
        includes: [
          "Conversion-first structure",
          "Copy",
          "Design",
          "Implementation",
          "Tracking",
          "QA",
        ],
        price: 1200,
        scale: "per-unit-network-month",
        module: "pages-cro",
        unitNoun: "landing page",
      },
      {
        id: "cro-update",
        label: "UX and conversion update",
        summary:
          "One defined improvement to how a page or flow converts, implemented and measured.",
        includes: [
          "Behaviour review",
          "Defined change",
          "Implementation",
          "Measurement",
        ],
        price: 450,
        scale: "per-unit-network-month",
        module: "pages-cro",
        unitNoun: "CRO update",
      },
      {
        id: "technical-seo",
        label: "Technical SEO",
        summary:
          "Ongoing work on the things that quietly cap everything else: indexing, structure, speed and duplication.",
        includes: [
          "Indexing",
          "Crawlability",
          "Structured data",
          "Internal architecture",
          "Performance",
          "Templates",
          "Canonicalization",
          "Redirects",
          "Duplication",
          "International and hreflang issues",
          "Programmatic structures",
          "Tracking fixes",
        ],
        price: 140,
        scale: "per-location-month",
        module: "technical-seo",
      },
      {
        id: "templated-development",
        label: "Templated development",
        summary:
          "Building the reusable thing once so every location, service or market can use it.",
        includes: [
          "Location templates",
          "Service templates",
          "Country and market templates",
          "Campaign templates",
          "Modules",
          "Content systems",
          "Reusable components",
        ],
        price: 2400,
        scale: "one-time-network",
        module: "pages-cro",
      },
    ],
  },
  {
    id: "geo",
    label: "GEO and AI search",
    summary:
      "Being visible where people now ask questions instead of typing keywords. Measured, not promised.",
    units: [
      {
        id: "geo-analysis",
        label: "GEO analysis",
        summary:
          "A read on where you currently stand across AI and search environments, and what would change it.",
        includes: [
          "Visibility across AI and search environments",
          "Query-set analysis",
          "Competitor citation analysis",
          "Entity and content gaps",
          "Source and citation opportunities",
          "Strategy recommendations",
          "Country and language differences where relevant",
        ],
        price: 750,
        scale: "one-time-network",
        module: "geo",
      },
      {
        id: "geo-ongoing",
        label: "Ongoing GEO optimization",
        summary:
          "The monthly work of staying citable as the answers keep changing.",
        includes: [
          "Monitoring",
          "Content improvements",
          "Source and entity strengthening",
          "Citation opportunities",
          "Testing",
          "Reporting",
        ],
        price: 290,
        scale: "per-location-month",
        module: "geo",
        note: "We do not claim to get you ranked inside any AI assistant. We improve the conditions that make citation more likely, and we report what actually moves.",
      },
    ],
  },
  {
    id: "paid",
    label: "Paid media",
    summary:
      "Managed search and social advertising. Ad spend is always separate and always yours.",
    units: [
      {
        id: "google-ads",
        label: "Google Ads management",
        summary: "Managed paid search per location or territory.",
        includes: [
          "Account audit",
          "Campaign setup or restructuring",
          "Keyword management",
          "Negatives",
          "Ad copy",
          "Conversion tracking",
          "Budget allocation",
          "Experiments",
          "Landing-page coordination",
          "Ongoing optimization",
          "Local-market localization",
        ],
        price: 450,
        scale: "per-location-month",
        module: "paid-search",
        note: "Ad spend is separate and paid directly by you.",
      },
      {
        id: "meta-ads",
        label: "Meta Ads management",
        summary: "Managed paid social per location or territory.",
        includes: [
          "Account audit",
          "Campaign setup or restructuring",
          "Audience strategy",
          "Ad copy",
          "Creative coordination",
          "Conversion tracking",
          "Budget allocation",
          "Experiments",
          "Landing-page coordination",
          "Ongoing optimization",
          "Local-market localization",
        ],
        price: 400,
        scale: "per-location-month",
        module: "paid-social",
        note: "Ad spend is separate and paid directly by you.",
      },
    ],
  },
  {
    id: "social",
    label: "Organic social",
    summary:
      "Network-level creative with location-level localization. One brand, many markets, without 40 people improvising.",
    units: [
      {
        id: "social-static",
        label: "Static or photo post",
        summary: "Single-image post, produced and published.",
        includes: ["Creative", "Copy", "Formatting", "Localization", "Scheduling", "Publishing"],
        price: 45,
        scale: "per-unit-location-month",
        module: "organic-social",
        unitNoun: "social post",
      },
      {
        id: "social-carousel",
        label: "Carousel",
        summary: "Multi-frame post. More production, more attention.",
        includes: ["Concept", "Creative", "Copy", "Formatting", "Localization", "Publishing"],
        price: 95,
        scale: "per-unit-location-month",
        module: "organic-social",
        unitNoun: "carousel",
      },
      {
        id: "social-video",
        label: "Short-form video or reel",
        summary: "Edited short-form video from supplied or produced footage.",
        includes: ["Concept", "Edit", "Captions", "Copy", "Localization", "Publishing"],
        price: 180,
        scale: "per-unit-location-month",
        module: "organic-social",
        unitNoun: "reel",
      },
      {
        id: "social-strategy",
        label: "Social strategy",
        summary:
          "The plan the posting runs against, including network-level templates and local override rules.",
        includes: [
          "Channel strategy",
          "Content pillars",
          "Network templates",
          "Location localization rules",
          "Calendar",
        ],
        price: 0,
        scale: "included",
        module: "organic-social",
        note: "Included with any monthly social package.",
      },
    ],
  },
  {
    id: "photography",
    label: "Photography",
    summary:
      "Real images of real locations. Priced separately because travel and local production genuinely vary by market.",
    units: [
      {
        id: "photo-starter",
        label: "Starter shoot",
        summary: "25 edited photos for one location.",
        includes: [
          "Pre-shoot shot list",
          "On-site production",
          "25 edited images",
          "Web, social and profile crops",
          "Usage rights",
        ],
        price: 650,
        scale: "one-time-location",
        module: "photography",
        unitNoun: "shoot",
      },
      {
        id: "photo-library",
        label: "Location library",
        summary: "50 edited photos for one location.",
        includes: [
          "Pre-shoot shot list",
          "On-site production",
          "50 edited images",
          "Web, social, profile and ad crops",
          "Usage rights",
        ],
        price: 1150,
        scale: "one-time-location",
        module: "photography",
        unitNoun: "shoot",
      },
      {
        id: "photo-full",
        label: "Full content library",
        summary: "100 edited photos for one location.",
        includes: [
          "Pre-shoot shot list",
          "Extended on-site production",
          "100 edited images",
          "Full crop set for every channel",
          "Usage rights",
        ],
        price: 1950,
        scale: "one-time-location",
        module: "photography",
        unitNoun: "shoot",
      },
      {
        id: "photo-network",
        label: "Custom or network production",
        summary:
          "200+ images across multiple locations, planned as one production run.",
        includes: [
          "Multi-location production plan",
          "Travel and scheduling",
          "Network-consistent art direction",
          "200+ edited images",
          "Usage rights",
        ],
        price: null,
        scale: "quote",
        module: "photography",
        note: "Travel and local production costs are quoted separately and vary significantly by country and city.",
      },
    ],
  },
  {
    id: "pr",
    label: "Publishing and PR",
    summary:
      "Getting the business into places customers already read. No guaranteed placements unless the placement is paid and labelled as such.",
    units: [
      {
        id: "article-publishing",
        label: "Article publishing",
        summary: "Placement and publication of an existing article on a relevant outlet.",
        includes: ["Outlet research", "Editorial fit", "Placement", "Publication", "Reporting"],
        price: 180,
        scale: "per-unit-network-month",
        module: "pr",
        unitNoun: "article placement",
      },
      {
        id: "pr-copywriting",
        label: "Copywriting",
        summary: "Written assets outside the content programme: profiles, bios, releases, ad copy.",
        includes: ["Brief", "Draft", "Revision round", "Final delivery"],
        price: 240,
        scale: "per-unit-network-month",
        module: "pr",
        unitNoun: "asset",
      },
      {
        id: "pr-content",
        label: "PR content",
        summary: "A story built to be picked up rather than a page built to rank.",
        includes: ["Angle development", "Research", "Writing", "Assets", "Distribution list"],
        price: 450,
        scale: "per-unit-network-month",
        module: "pr",
        unitNoun: "PR piece",
      },
      {
        id: "pr-campaign",
        label: "Digital PR campaign",
        summary: "A coordinated campaign built around one idea, run across a month.",
        includes: [
          "Campaign concept",
          "Research or data asset",
          "Creative",
          "Outreach",
          "Coverage tracking",
          "Reporting",
        ],
        price: 3500,
        scale: "per-network-month",
        module: "pr",
      },
      {
        id: "pr-outreach",
        label: "Media and outreach support",
        summary:
          "Ongoing relationship and outreach work, including local-market journalists and publications.",
        includes: [
          "Media list building",
          "Local-market journalist relationships",
          "Pitching",
          "Response handling",
          "Coverage tracking",
        ],
        price: 1200,
        scale: "per-network-month",
        module: "pr",
      },
    ],
  },
  {
    id: "reporting",
    label: "Reporting",
    summary:
      "If we are doing the work, measuring it is part of the work. Reporting is included with every monthly execution package.",
    units: [
      {
        id: "reporting-included",
        label: "Monthly reporting",
        summary:
          "First what we did, then whether it worked. Commercial metrics first, operational metrics underneath.",
        includes: [
          "Spend, leads, calls, quotes and booked jobs where tracked",
          "Customers, revenue, cost per acquisition and cost per lead where available",
          "Conversion rate and organic against paid bookings",
          "Location and network comparison",
          "Country and market comparison for international networks",
          "Work delivered and next priorities",
        ],
        price: 0,
        scale: "included",
        module: "always-on",
        note: "Not sold as an add-on.",
      },
    ],
  },
  {
    id: "strategy",
    label: "Meetings and strategy",
    summary:
      "The account is managed centrally. Reasonable central meetings are included; individual location consulting is bought when it is wanted.",
    units: [
      {
        id: "account-meetings",
        label: "Central account meetings",
        summary: "Regular working sessions with the people who own the account.",
        includes: [
          "Monthly working session",
          "Quarterly planning",
          "Regional or country grouping for international networks",
        ],
        price: 0,
        scale: "included",
        module: "always-on",
        note: "This does not mean unlimited direct consulting for every individual location.",
      },
      {
        id: "location-consulting",
        label: "Individual location consulting",
        summary:
          "Direct sessions for a single franchisee or location, bought when a location wants them.",
        includes: ["Preparation", "Session", "Written follow-up actions"],
        price: 350,
        scale: "per-unit-network-month",
        module: "always-on",
        unitNoun: "session",
      },
    ],
  },
  {
    id: "automation",
    label: "Automation and cost savings",
    summary:
      "We find repetitive work that costs money and remove it. Priced against measured savings, not against hours.",
    units: [
      {
        id: "automation-scoping",
        label: "Automation scoping",
        summary:
          "Baseline the current cost, calculate the measurable saving, agree the scope, then agree the price. In that order.",
        includes: [
          "Process mapping",
          "Current cost baseline",
          "Savings calculation",
          "Scope definition",
          "Pricing agreement",
        ],
        price: null,
        scale: "quote",
        module: "automation",
      },
      {
        id: "automation-build",
        label: "Custom automation build",
        summary:
          "The build itself. Marketing automations needed to deliver the marketing service are included in packages; large operational builds are priced separately.",
        includes: [
          "Lead routing",
          "Quote follow-up",
          "Missed-call recovery",
          "Customer support workflows",
          "Recruitment and scheduling workflows",
          "Reporting automation",
          "Network dashboards",
          "Review workflows",
          "CRM and API integrations",
          "Finance and admin workflows",
        ],
        price: null,
        scale: "quote",
        module: "automation",
        note: "May include an agreed share of measured first-year cost savings. That share is set in config, not assumed.",
      },
    ],
  },
];

/** Flat lookup of every unit by id. */
export const SERVICE_UNITS: Record<string, ServiceUnit> = Object.fromEntries(
  SERVICE_CATEGORIES.flatMap((c) => c.units.map((u) => [u.id, u])),
);

export const getUnit = (id: string): ServiceUnit | undefined => SERVICE_UNITS[id];

export const unitsForModule = (module: ModuleId): ServiceUnit[] =>
  SERVICE_CATEGORIES.flatMap((c) => c.units).filter((u) => u.module === module);
