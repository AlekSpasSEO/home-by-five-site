/**
 * Package pricing engine.
 *
 * Deliberately free of React. Everything the package builder needs to turn a
 * configuration into money and deliverables lives here, so the calculator can
 * be tested, reused and changed without touching a component.
 *
 * Prices come from config/services.ts. Market overrides come from
 * config/markets.ts. Nothing is hardcoded below.
 */

import {
  SERVICE_CATEGORIES,
  getUnit,
  type ModuleId,
  type PriceScale,
  type ServiceUnit,
} from "@/config/services";
import { getMarket, type Market } from "@/config/markets";
import { site } from "@/config/site";

/* -------------------------------------------------------------------------- */
/* Commercial constants                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Phase 1. Strictly linear: one working day of analysis per location, one
 * price per location. No volume discount, because there is no volume saving.
 */
export const BLUEPRINT = {
  pricePerLocation: 150,
  workingDaysPerLocation: 1,
} as const;

/**
 * Recurring network discounts. Applied to the monthly recurring total only.
 * One-time setup and the blueprint are not discounted.
 */
export const NETWORK_DISCOUNTS: { minLocations: number; rate: number }[] = [
  { minLocations: 1, rate: 0 },
  { minLocations: 5, rate: 0.05 },
  { minLocations: 10, rate: 0.1 },
  { minLocations: 30, rate: 0.15 },
  { minLocations: 50, rate: 0.2 },
  { minLocations: 100, rate: 0.25 },
  { minLocations: 200, rate: 0.3 },
];

/** Above this, the calculator stops guessing and asks for a conversation. */
export const NETWORK_PRICING_THRESHOLD = 100;

export const LOCATION_PRESETS = [1, 5, 10, 30, 50, 100, 200];
export const MIN_LOCATIONS = 1;
export const MAX_LOCATIONS = 200;

/**
 * Share of measured first-year cost savings that an automation build may carry.
 * Config, not a hardcoded assumption. Set to 0 to disable the model entirely.
 */
export const AUTOMATION_SAVINGS_SHARE = 0.2;

/** Units included in every monthly package at no charge. */
export const ALWAYS_INCLUDED_UNIT_IDS = ["reporting-included", "account-meetings"];

/* -------------------------------------------------------------------------- */
/* Builder module definitions                                                  */
/* -------------------------------------------------------------------------- */

export interface BuilderTier {
  unitId: string;
  label: string;
}

export interface BuilderControl {
  id: string;
  label: string;
  help?: string;
  /** Quantity presets offered as buttons. */
  options: number[];
  allowCustom: boolean;
  defaultValue: number;
  /** Single-unit control. */
  unitId?: string;
  /** Tiered control: pick a tier, then a quantity. */
  tiers?: BuilderTier[];
  defaultTierId?: string;
  /** Quantity is per location per month unless this says otherwise. */
  basis: "per-location" | "network" | "one-time-per-location" | "one-time-network";
}

export interface BuilderModule {
  id: ModuleId;
  label: string;
  blurb: string;
  /** Units switched on automatically when this module is selected. */
  alwaysOn: string[];
  controls: BuilderControl[];
  /** Module is scoped and quoted rather than calculated. */
  quoteOnly?: boolean;
  flag?: string;
}

export const BUILDER_MODULES: BuilderModule[] = [
  {
    id: "local-seo",
    label: "Local SEO",
    blurb: "Profiles, listings, consistency and market monitoring per location.",
    alwaysOn: ["local-seo-core", "local-market-monitoring"],
    controls: [
      {
        id: "gbp-posts",
        label: "Google Business Profile posts",
        help: "Per location, per month.",
        unitId: "gbp-post",
        options: [0, 4, 8],
        allowCustom: false,
        defaultValue: 4,
        basis: "per-location",
      },
      {
        id: "citations",
        label: "Custom citations",
        help: "Hand-built listings, per location, per month.",
        unitId: "custom-citation",
        options: [0, 1, 2],
        allowCustom: true,
        defaultValue: 1,
        basis: "per-location",
      },
      {
        id: "gbp-setup",
        label: "Profile optimization at setup",
        help: "One-time, per location.",
        unitId: "gbp-optimization",
        options: [0, 1],
        allowCustom: false,
        defaultValue: 1,
        basis: "one-time-per-location",
      },
    ],
  },
  {
    id: "links",
    label: "Authority and links",
    blurb: "Earned placements by authority tier. Never sold by volume.",
    alwaysOn: [],
    controls: [
      {
        id: "links",
        label: "Links per location, per month",
        help: "Higher tiers are fewer, slower and worth more.",
        tiers: [
          { unitId: "link-dr30", label: "DR 30-49" },
          { unitId: "link-dr50", label: "DR 50-69" },
          { unitId: "link-dr70", label: "DR 70-89" },
          { unitId: "link-dr90", label: "DR 90+" },
        ],
        defaultTierId: "link-dr50",
        options: [0, 1, 2],
        allowCustom: true,
        defaultValue: 1,
        basis: "per-location",
      },
    ],
  },
  {
    id: "content",
    label: "Content",
    blurb: "Finished, researched, published content. Priced by length.",
    alwaysOn: [],
    controls: [
      {
        id: "content",
        label: "Articles per location, per month",
        help: "Pick the length you actually need, then the volume.",
        tiers: [
          { unitId: "content-1000", label: "1,000 words" },
          { unitId: "content-2000", label: "2,000 words" },
          { unitId: "content-5000", label: "5,000 words" },
          { unitId: "content-10000", label: "10,000 words" },
        ],
        defaultTierId: "content-2000",
        options: [0, 1, 2, 4],
        allowCustom: true,
        defaultValue: 1,
        basis: "per-location",
      },
    ],
  },
  {
    id: "pages-cro",
    label: "Pages and CRO",
    blurb: "Pages built to convert, and the changes that make them convert better.",
    alwaysOn: [],
    controls: [
      {
        id: "templated-pages",
        label: "Location or service pages per location, per month",
        unitId: "templated-page",
        options: [0, 1, 2],
        allowCustom: true,
        defaultValue: 1,
        basis: "per-location",
      },
      {
        id: "custom-pages",
        label: "Custom pages per location, per month",
        unitId: "custom-page",
        options: [0, 1, 2],
        allowCustom: true,
        defaultValue: 0,
        basis: "per-location",
      },
      {
        id: "cro-updates",
        label: "Conversion updates per month",
        help: "Network-wide, not per location.",
        unitId: "cro-update",
        options: [0, 1, 2],
        allowCustom: true,
        defaultValue: 1,
        basis: "network",
      },
      {
        id: "landing-pages",
        label: "Landing pages per month",
        help: "Network-wide, for paid campaigns.",
        unitId: "landing-page",
        options: [0, 1, 2],
        allowCustom: true,
        defaultValue: 0,
        basis: "network",
      },
    ],
  },
  {
    id: "technical-seo",
    label: "Technical SEO",
    blurb: "Indexing, structure, speed, duplication and international handling.",
    alwaysOn: ["technical-seo"],
    controls: [],
  },
  {
    id: "geo",
    label: "GEO and AI search",
    blurb: "Visibility where people ask questions instead of typing keywords.",
    alwaysOn: ["geo-ongoing"],
    controls: [
      {
        id: "geo-analysis",
        label: "Opening GEO analysis",
        help: "One-time, network-wide.",
        unitId: "geo-analysis",
        options: [0, 1],
        allowCustom: false,
        defaultValue: 1,
        basis: "one-time-network",
      },
    ],
  },
  {
    id: "paid-search",
    label: "Paid search",
    blurb: "Managed Google Ads per location. Ad spend is separate.",
    alwaysOn: ["google-ads"],
    controls: [],
    flag: "Ad spend is separate and paid directly by you.",
  },
  {
    id: "paid-social",
    label: "Paid social",
    blurb: "Managed Meta Ads per location. Ad spend is separate.",
    alwaysOn: ["meta-ads"],
    controls: [],
    flag: "Ad spend is separate and paid directly by you.",
  },
  {
    id: "organic-social",
    label: "Organic social",
    blurb: "Network creative, localized per location. Strategy included.",
    alwaysOn: ["social-strategy"],
    controls: [
      {
        id: "social-posts",
        label: "Posts per location, per month",
        unitId: "social-static",
        options: [0, 4, 8, 12],
        allowCustom: true,
        defaultValue: 4,
        basis: "per-location",
      },
      {
        id: "carousels",
        label: "Carousels per location, per month",
        unitId: "social-carousel",
        options: [0, 1, 2, 4],
        allowCustom: true,
        defaultValue: 1,
        basis: "per-location",
      },
      {
        id: "reels",
        label: "Short-form videos per location, per month",
        unitId: "social-video",
        options: [0, 1, 2, 4],
        allowCustom: true,
        defaultValue: 0,
        basis: "per-location",
      },
    ],
  },
  {
    id: "photography",
    label: "Photography",
    blurb: "Real images of real locations. Production cost varies by market.",
    alwaysOn: [],
    controls: [
      {
        id: "photography",
        label: "Shoot size per location",
        help: "One-time. Travel and local production are quoted separately.",
        tiers: [
          { unitId: "photo-starter", label: "25 images" },
          { unitId: "photo-library", label: "50 images" },
          { unitId: "photo-full", label: "100 images" },
        ],
        defaultTierId: "photo-starter",
        options: [0, 1],
        allowCustom: false,
        defaultValue: 1,
        basis: "one-time-per-location",
      },
    ],
  },
  {
    id: "pr",
    label: "Publishing and PR",
    blurb: "Stories built to be picked up, and the outreach behind them.",
    alwaysOn: [],
    controls: [
      {
        id: "article-placements",
        label: "Article placements per month",
        help: "Network-wide.",
        unitId: "article-publishing",
        options: [0, 1, 2],
        allowCustom: true,
        defaultValue: 1,
        basis: "network",
      },
      {
        id: "pr-pieces",
        label: "PR pieces per month",
        help: "Network-wide.",
        unitId: "pr-content",
        options: [0, 1, 2],
        allowCustom: true,
        defaultValue: 0,
        basis: "network",
      },
      {
        id: "pr-outreach",
        label: "Ongoing media and outreach support",
        help: "Network-wide, monthly.",
        unitId: "pr-outreach",
        options: [0, 1],
        allowCustom: false,
        defaultValue: 0,
        basis: "network",
      },
    ],
  },
  {
    id: "automation",
    label: "Custom automation",
    blurb: "Repetitive operational work removed, priced against measured savings.",
    alwaysOn: ["automation-scoping"],
    controls: [],
    quoteOnly: true,
    flag: "Scoped and priced separately, after the current cost is baselined.",
  },
];

export const getModule = (id: ModuleId): BuilderModule | undefined =>
  BUILDER_MODULES.find((m) => m.id === id);

/* -------------------------------------------------------------------------- */
/* Configuration and results                                                   */
/* -------------------------------------------------------------------------- */

export interface PackageConfig {
  /** Market codes. Multi-select is supported for networks spanning countries. */
  markets: string[];
  locations: number;
  modules: ModuleId[];
  /** Quantity per control id. */
  quantities: Record<string, number>;
  /** Selected tier unit id per control id, for tiered controls. */
  tiers: Record<string, string>;
}

export const defaultPackageConfig = (): PackageConfig => {
  const quantities: Record<string, number> = {};
  const tiers: Record<string, string> = {};
  for (const mod of BUILDER_MODULES) {
    for (const control of mod.controls) {
      quantities[control.id] = control.defaultValue;
      if (control.defaultTierId) tiers[control.id] = control.defaultTierId;
    }
  }
  return {
    markets: ["USA"],
    locations: 10,
    modules: ["local-seo", "links", "content", "pages-cro"],
    quantities,
    tiers,
  };
};

export interface LineItem {
  unitId: string;
  label: string;
  moduleId: ModuleId;
  /** Quantity as the user entered it. */
  quantity: number;
  /** Total produced across the whole network each month, where monthly. */
  networkQuantity: number;
  unitNoun?: string;
  unitPrice: number | null;
  scale: PriceScale;
  monthly: number;
  oneTime: number;
  quoteOnly: boolean;
  approvalRequired: boolean;
  included: boolean;
  note?: string;
}

export interface DeliverableCount {
  label: string;
  value: number;
  /** Whether this is produced monthly or once. */
  cadence: "monthly" | "one-time";
}

export interface PackageResult {
  monthlyBeforeDiscount: number;
  discountRate: number;
  discountAmount: number;
  monthly: number;
  oneTime: number;
  blueprint: number;
  lineItems: LineItem[];
  includedItems: LineItem[];
  quoteOnlyItems: LineItem[];
  deliverables: DeliverableCount[];
  hasAdSpend: boolean;
  needsApproval: boolean;
  networkPricingRecommended: boolean;
  /** Market the totals are priced in. */
  pricingMarket: Market;
  /** True when several markets are selected and base pricing is used. */
  multiMarket: boolean;
}

export const discountRateFor = (locations: number): number => {
  let rate = 0;
  for (const tier of NETWORK_DISCOUNTS) {
    if (locations >= tier.minLocations) rate = tier.rate;
  }
  return rate;
};

/**
 * Resolve a unit's price for the selected markets.
 *
 * A market override only applies when exactly one market is selected. Across a
 * multi-country network we price from the base catalog and say so, rather than
 * quietly averaging overrides into a number nobody can reconcile.
 */
export const resolveUnitPrice = (
  unit: ServiceUnit,
  marketCodes: string[],
): number | null => {
  if (unit.price === null) return null;
  if (marketCodes.length === 1) {
    const override = getMarket(marketCodes[0]).pricing.overrides?.[unit.id];
    if (typeof override === "number") return override;
  }
  return unit.price;
};

const contributionFor = (
  scale: PriceScale,
  price: number,
  quantity: number,
  locations: number,
): { monthly: number; oneTime: number; networkQuantity: number } => {
  switch (scale) {
    case "per-location-month":
      return { monthly: price * locations, oneTime: 0, networkQuantity: locations };
    case "per-unit-location-month":
      return {
        monthly: price * quantity * locations,
        oneTime: 0,
        networkQuantity: quantity * locations,
      };
    case "per-unit-network-month":
      return { monthly: price * quantity, oneTime: 0, networkQuantity: quantity };
    case "per-network-month":
      return { monthly: price * quantity, oneTime: 0, networkQuantity: quantity };
    case "one-time-location":
      return { monthly: 0, oneTime: price * quantity * locations, networkQuantity: quantity * locations };
    case "one-time-network":
      return { monthly: 0, oneTime: price * quantity, networkQuantity: quantity };
    case "included":
    case "quote":
    default:
      return { monthly: 0, oneTime: 0, networkQuantity: quantity };
  }
};

export const computePackage = (config: PackageConfig): PackageResult => {
  const locations = Math.max(MIN_LOCATIONS, Math.round(config.locations || 1));
  const lineItems: LineItem[] = [];
  const includedItems: LineItem[] = [];
  const quoteOnlyItems: LineItem[] = [];

  const push = (unit: ServiceUnit, moduleId: ModuleId, quantity: number) => {
    const price = resolveUnitPrice(unit, config.markets);
    const { monthly, oneTime, networkQuantity } = contributionFor(
      unit.scale,
      price ?? 0,
      quantity,
      locations,
    );
    const item: LineItem = {
      unitId: unit.id,
      label: unit.label,
      moduleId,
      quantity,
      networkQuantity,
      unitNoun: unit.unitNoun,
      unitPrice: price,
      scale: unit.scale,
      monthly,
      oneTime,
      quoteOnly: unit.scale === "quote",
      approvalRequired: Boolean(unit.approvalRequired),
      included: unit.scale === "included",
      note: unit.note,
    };
    if (item.quoteOnly) quoteOnlyItems.push(item);
    else if (item.included) includedItems.push(item);
    else if (item.monthly > 0 || item.oneTime > 0) lineItems.push(item);
  };

  for (const moduleId of config.modules) {
    const mod = getModule(moduleId);
    if (!mod) continue;

    for (const unitId of mod.alwaysOn) {
      const unit = getUnit(unitId);
      if (unit) push(unit, moduleId, 1);
    }

    for (const control of mod.controls) {
      const quantity = config.quantities[control.id] ?? control.defaultValue;
      if (quantity <= 0) continue;
      const unitId = control.tiers
        ? config.tiers[control.id] ?? control.defaultTierId
        : control.unitId;
      const unit = unitId ? getUnit(unitId) : undefined;
      if (unit) push(unit, moduleId, quantity);
    }
  }

  // Reporting and central meetings ride along with any monthly package.
  if (lineItems.some((i) => i.monthly > 0)) {
    for (const unitId of ALWAYS_INCLUDED_UNIT_IDS) {
      const unit = getUnit(unitId);
      if (unit && !includedItems.some((i) => i.unitId === unitId)) {
        push(unit, "always-on", 1);
      }
    }
  }

  const monthlyBeforeDiscount = lineItems.reduce((sum, i) => sum + i.monthly, 0);
  const discountRate = discountRateFor(locations);
  const discountAmount = Math.round(monthlyBeforeDiscount * discountRate);
  const monthly = monthlyBeforeDiscount - discountAmount;
  const oneTime = lineItems.reduce((sum, i) => sum + i.oneTime, 0);

  const deliverables: DeliverableCount[] = [];
  const byNoun = new Map<string, { monthly: number; oneTime: number }>();
  for (const item of lineItems) {
    if (!item.unitNoun) continue;
    const entry = byNoun.get(item.unitNoun) ?? { monthly: 0, oneTime: 0 };
    if (item.monthly > 0) entry.monthly += item.networkQuantity;
    if (item.oneTime > 0) entry.oneTime += item.networkQuantity;
    byNoun.set(item.unitNoun, entry);
  }
  for (const [noun, counts] of byNoun) {
    if (counts.monthly > 0) {
      deliverables.push({ label: pluralize(noun, counts.monthly), value: counts.monthly, cadence: "monthly" });
    }
    if (counts.oneTime > 0) {
      deliverables.push({ label: pluralize(noun, counts.oneTime), value: counts.oneTime, cadence: "one-time" });
    }
  }

  // Words produced is the number owners actually recognise, so surface it too.
  const wordsPerMonth = lineItems
    .filter((i) => i.unitId.startsWith("content-") && i.monthly > 0)
    .reduce((sum, i) => {
      const words = Number(i.unitId.replace("content-", "")) || 0;
      return sum + words * i.networkQuantity;
    }, 0);
  if (wordsPerMonth > 0) {
    deliverables.unshift({ label: "words of content", value: wordsPerMonth, cadence: "monthly" });
  }

  return {
    monthlyBeforeDiscount,
    discountRate,
    discountAmount,
    monthly,
    oneTime,
    blueprint: BLUEPRINT.pricePerLocation * locations,
    lineItems,
    includedItems,
    quoteOnlyItems,
    deliverables,
    hasAdSpend:
      config.modules.includes("paid-search") || config.modules.includes("paid-social"),
    needsApproval: lineItems.some((i) => i.approvalRequired),
    networkPricingRecommended: locations >= NETWORK_PRICING_THRESHOLD,
    pricingMarket: getMarket(config.markets[0]),
    multiMarket: config.markets.length > 1,
  };
};

const pluralize = (noun: string, count: number): string => {
  if (count === 1) return noun;
  if (noun.endsWith("s") || noun.endsWith("x")) return `${noun}es`;
  return `${noun}s`;
};

/* -------------------------------------------------------------------------- */
/* Currency                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Format an amount for a market.
 *
 * Amounts are held in the base currency. A market only displays its own
 * currency when it has been configured to do so and either is the base currency
 * or carries a verified rate. Otherwise the base currency is shown plainly,
 * which is the honest option until a local price sheet exists.
 */
export const formatMoney = (
  amount: number,
  market?: Market,
  opts: { decimals?: number } = {},
): string => {
  const decimals = opts.decimals ?? 0;
  let value = amount;
  let currency = site.baseCurrency as string;

  if (market?.pricing.displayLocalCurrency) {
    if (market.currency === site.baseCurrency) {
      currency = market.currency;
    } else if (typeof market.pricing.fxRateFromBase === "number") {
      value = amount * market.pricing.fxRateFromBase;
      currency = market.currency;
    }
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("en-US").format(Math.round(value));

/* -------------------------------------------------------------------------- */
/* Shareable state                                                             */
/* -------------------------------------------------------------------------- */

export const encodeConfig = (config: PackageConfig): string => {
  const params = new URLSearchParams();
  params.set("markets", config.markets.join(","));
  params.set("locations", String(config.locations));
  params.set("m", config.modules.join(","));
  const q = Object.entries(config.quantities)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  if (q) params.set("q", q);
  const t = Object.entries(config.tiers)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  if (t) params.set("t", t);
  return params.toString();
};

export const decodeConfig = (
  search: string | URLSearchParams,
  fallback: PackageConfig = defaultPackageConfig(),
): PackageConfig => {
  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;
  const config: PackageConfig = {
    markets: [...fallback.markets],
    locations: fallback.locations,
    modules: [...fallback.modules],
    quantities: { ...fallback.quantities },
    tiers: { ...fallback.tiers },
  };

  const markets = params.get("markets");
  if (markets) {
    const codes = markets
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean);
    if (codes.length) config.markets = codes;
  }

  const locations = Number(params.get("locations"));
  if (Number.isFinite(locations) && locations >= MIN_LOCATIONS) {
    config.locations = Math.min(MAX_LOCATIONS, Math.round(locations));
  }

  const modules = params.get("m");
  if (modules !== null) {
    const known = new Set(BUILDER_MODULES.map((m) => m.id as string));
    config.modules = modules
      .split(",")
      .map((m) => m.trim())
      .filter((m) => known.has(m)) as ModuleId[];
  }

  const q = params.get("q");
  if (q) {
    for (const pair of q.split(";")) {
      const [key, raw] = pair.split(":");
      const value = Number(raw);
      if (key && Number.isFinite(value) && value >= 0) {
        config.quantities[key] = Math.min(999, Math.round(value));
      }
    }
  }

  const t = params.get("t");
  if (t) {
    for (const pair of t.split(";")) {
      const [key, unitId] = pair.split(":");
      if (key && unitId && getUnit(unitId)) config.tiers[key] = unitId;
    }
  }

  return config;
};

/* -------------------------------------------------------------------------- */
/* Summary text                                                                */
/* -------------------------------------------------------------------------- */

export const packageSummaryText = (
  config: PackageConfig,
  result: PackageResult,
): string => {
  const marketNames = config.markets.map((c) => getMarket(c).name).join(", ");
  const lines: string[] = [
    `${site.name} indicative package`,
    "",
    `Markets: ${marketNames}`,
    `Locations: ${config.locations}${config.locations >= MAX_LOCATIONS ? "+" : ""}`,
    "",
    "Each month:",
  ];

  for (const d of result.deliverables.filter((d) => d.cadence === "monthly")) {
    lines.push(`  ${formatNumber(d.value)} ${d.label}`);
  }

  const oneTimeDeliverables = result.deliverables.filter((d) => d.cadence === "one-time");
  if (oneTimeDeliverables.length) {
    lines.push("", "One-time:");
    for (const d of oneTimeDeliverables) {
      lines.push(`  ${formatNumber(d.value)} ${d.label}`);
    }
  }

  lines.push(
    "",
    `Monthly: ${formatMoney(result.monthly, result.pricingMarket)}`,
    `One-time setup: ${formatMoney(result.oneTime, result.pricingMarket)}`,
    `Location Growth Blueprint: ${formatMoney(result.blueprint, result.pricingMarket)}`,
  );

  if (result.hasAdSpend) lines.push("", "Ad spend is separate and paid directly by you.");
  if (result.quoteOnlyItems.length)
    lines.push(
      `Scoped separately: ${result.quoteOnlyItems.map((i) => i.label).join(", ")}.`,
    );

  lines.push(
    "",
    "Indicative package. Final scope is confirmed after your Location Growth Blueprint.",
  );

  return lines.join("\n");
};

/** Every unit in the catalog, flattened. Used by the services page. */
export const allUnits = (): ServiceUnit[] =>
  SERVICE_CATEGORIES.flatMap((c) => c.units);
