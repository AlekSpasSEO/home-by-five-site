/**
 * Centralized market configuration.
 *
 * This is the single place country logic is defined. UI components must never
 * hardcode a country: they read from here, or from the editorial copy in
 * `market-content.ts`, which is keyed by the same market code.
 *
 * Adding a market = add an entry here + an entry in `market-content.ts`.
 * Nothing else in the app needs to change.
 */

export type MarketRegionId =
  | "north-america"
  | "uk-oceania"
  | "western-southern-europe"
  | "balkans-cee";

export interface MarketRegion {
  id: MarketRegionId;
  label: string;
  /** Short line used on the markets index and homepage grid. */
  blurb: string;
}

export const MARKET_REGIONS: MarketRegion[] = [
  {
    id: "north-america",
    label: "North America",
    blurb: "Mature paid search, heavy review-platform influence, high cost per lead.",
  },
  {
    id: "uk-oceania",
    label: "UK & Oceania",
    blurb: "Google-dominant search with strong national trade-directory ecosystems.",
  },
  {
    id: "western-southern-europe",
    label: "Western & Southern Europe",
    blurb: "Language-first markets with strict privacy regimes and local marketplaces.",
  },
  {
    id: "balkans-cee",
    label: "Balkans & Central/Eastern Europe",
    blurb: "Social-led discovery, mixed scripts, and thinner local search competition.",
  },
];

/**
 * Market-level pricing configuration.
 *
 * `displayLocalCurrency` is deliberately false everywhere on the first build.
 * Prices are published in the base currency until a verified local price sheet
 * or FX policy exists for that market. Do not set a rate from memory: pull it
 * from a rate source or a signed-off price list, then flip the flag.
 */
export interface MarketPricing {
  displayLocalCurrency: boolean;
  /** TODO: set only from a verified rate source. Unused while the flag is false. */
  fxRateFromBase?: number;
  /**
   * Per-unit price overrides, keyed by service unit id (see services.ts).
   * Use for units whose real cost genuinely varies by market, e.g. photography
   * production or link placements in a given language.
   */
  overrides?: Record<string, number>;
  note?: string;
}

export interface Market {
  /** Stable identifier used across config, routes and analytics. */
  code: string;
  /** Route slug. Lives at /markets/[slug]. */
  slug: string;
  name: string;
  /** Used where the full name is too long, e.g. compact selectors. */
  shortName: string;
  region: MarketRegionId;

  locale: string;
  /** Production language for the first build. */
  language: string;
  languageCode: string;
  /** Languages the market must be able to ship in later. */
  targetLanguages: string[];
  /** English/local spelling and terminology notes for copy work. */
  spellingNotes: string;

  currency: string;
  currencySymbol: string;
  /** Retained where a market has changed or is changing currency. */
  formerCurrency?: string;
  currencyNote?: string;

  /** Whether the market page is published. */
  enabled: boolean;
  /** Localization state, surfaced honestly in the UI. */
  localization: "english-published" | "translation-pending";

  /**
   * Localized route slug, used once translated routes ship.
   * e.g. "espana" for /es/mercados/espana.
   */
  localizedSlug?: string;
  /** Localized service labels, applied when the market ships in-language. */
  serviceLabels?: Record<string, string>;
  /** Market-specific CTA overrides. Falls back to the global CTA copy. */
  cta?: { primary?: string; secondary?: string };

  pricing: MarketPricing;
}

const defaultPricing: MarketPricing = {
  displayLocalCurrency: false,
  note: "Published in USD. Local-currency pricing is confirmed per engagement.",
};

export const MARKETS: Market[] = [
  {
    code: "USA",
    slug: "united-states",
    name: "United States",
    shortName: "USA",
    region: "north-america",
    locale: "en-US",
    language: "English",
    languageCode: "en",
    targetLanguages: ["English", "Spanish"],
    spellingNotes:
      "US spelling. Use 'ZIP code', 'cell phone', 'store' or 'shop' by vertical.",
    currency: "USD",
    currencySymbol: "$",
    enabled: true,
    localization: "english-published",
    pricing: { displayLocalCurrency: true, note: "Base market. Catalog prices are USD." },
  },
  {
    code: "CAN",
    slug: "canada",
    name: "Canada",
    shortName: "Canada",
    region: "north-america",
    locale: "en-CA",
    language: "English",
    languageCode: "en",
    targetLanguages: ["English", "French"],
    spellingNotes:
      "Canadian spelling (colour, centre, licence as noun). French required for Quebec-facing assets.",
    currency: "CAD",
    currencySymbol: "$",
    enabled: true,
    localization: "english-published",
    localizedSlug: "canada",
    pricing: defaultPricing,
  },
  {
    code: "GBR",
    slug: "united-kingdom",
    name: "United Kingdom",
    shortName: "UK",
    region: "uk-oceania",
    locale: "en-GB",
    language: "English",
    languageCode: "en",
    targetLanguages: ["English"],
    spellingNotes:
      "UK spelling. 'Postcode' not ZIP, 'mobile' not cell, 'quote' not estimate, 'VAT' shown where relevant.",
    currency: "GBP",
    currencySymbol: "£",
    enabled: true,
    localization: "english-published",
    pricing: defaultPricing,
  },
  {
    code: "AUS",
    slug: "australia",
    name: "Australia",
    shortName: "Australia",
    region: "uk-oceania",
    locale: "en-AU",
    language: "English",
    languageCode: "en",
    targetLanguages: ["English"],
    spellingNotes:
      "Australian spelling. 'Suburb' is the standard local-area term and matters for search copy.",
    currency: "AUD",
    currencySymbol: "$",
    enabled: true,
    localization: "english-published",
    pricing: defaultPricing,
  },
  {
    code: "NZL",
    slug: "new-zealand",
    name: "New Zealand",
    shortName: "New Zealand",
    region: "uk-oceania",
    locale: "en-NZ",
    language: "English",
    languageCode: "en",
    targetLanguages: ["English", "te reo Maori"],
    spellingNotes:
      "NZ spelling. Region and suburb names carry te reo Maori forms; check macrons with a local reviewer.",
    currency: "NZD",
    currencySymbol: "$",
    enabled: true,
    localization: "english-published",
    pricing: defaultPricing,
  },
  {
    code: "ESP",
    slug: "spain",
    name: "Spain",
    shortName: "Spain",
    region: "western-southern-europe",
    locale: "en-ES",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Spanish", "Catalan", "Galician", "Basque"],
    spellingNotes:
      "Castilian Spanish for national copy. Catalonia, Galicia and the Basque Country need co-official language review.",
    currency: "EUR",
    currencySymbol: "€",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "espana",
    pricing: defaultPricing,
  },
  {
    code: "ITA",
    slug: "italy",
    name: "Italy",
    shortName: "Italy",
    region: "western-southern-europe",
    locale: "en-IT",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Italian", "German"],
    spellingNotes:
      "Standard Italian. South Tyrol requires German-language parity for public-facing assets.",
    currency: "EUR",
    currencySymbol: "€",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "italia",
    pricing: defaultPricing,
  },
  {
    code: "FRA",
    slug: "france",
    name: "France",
    shortName: "France",
    region: "western-southern-europe",
    locale: "en-FR",
    language: "English",
    languageCode: "en",
    targetLanguages: ["French"],
    spellingNotes:
      "French copy must be written, not translated. Advertising and contract language carry legal expectations.",
    currency: "EUR",
    currencySymbol: "€",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "france",
    pricing: defaultPricing,
  },
  {
    code: "NLD",
    slug: "netherlands",
    name: "Netherlands",
    shortName: "Netherlands",
    region: "western-southern-europe",
    locale: "en-NL",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Dutch"],
    spellingNotes:
      "Dutch. English-language pages perform unusually well here, but service and pricing pages should still be Dutch.",
    currency: "EUR",
    currencySymbol: "€",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "nederland",
    pricing: defaultPricing,
  },
  {
    code: "DEU",
    slug: "germany",
    name: "Germany",
    shortName: "Germany",
    region: "western-southern-europe",
    locale: "en-DE",
    language: "English",
    languageCode: "en",
    targetLanguages: ["German"],
    spellingNotes:
      "German. Formal address (Sie) for business audiences. Compound service terms need native handling, not translation.",
    currency: "EUR",
    currencySymbol: "€",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "deutschland",
    pricing: defaultPricing,
  },
  {
    code: "GRC",
    slug: "greece",
    name: "Greece",
    shortName: "Greece",
    region: "western-southern-europe",
    locale: "en-GR",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Greek"],
    spellingNotes:
      "Greek script for local copy. Greeklish (Latin transliteration) appears in real search behaviour and should be researched, not ignored.",
    currency: "EUR",
    currencySymbol: "€",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "ellada",
    pricing: defaultPricing,
  },
  {
    code: "MKD",
    slug: "macedonia",
    name: "Macedonia",
    shortName: "Macedonia",
    region: "balkans-cee",
    locale: "en-MK",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Macedonian", "Albanian"],
    spellingNotes:
      "Macedonian in Cyrillic, with Latin transliteration commonly used in search. Albanian-language parity where the audience requires it.",
    currency: "MKD",
    currencySymbol: "den",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "makedonija",
    pricing: defaultPricing,
  },
  {
    code: "SRB",
    slug: "serbia",
    name: "Serbia",
    shortName: "Serbia",
    region: "balkans-cee",
    locale: "en-RS",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Serbian"],
    spellingNotes:
      "Serbian is written in both Cyrillic and Latin script. Both need to be handled in content and keyword work.",
    currency: "RSD",
    currencySymbol: "din",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "srbija",
    pricing: defaultPricing,
  },
  {
    code: "ALB",
    slug: "albania",
    name: "Albania",
    shortName: "Albania",
    region: "balkans-cee",
    locale: "en-AL",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Albanian"],
    spellingNotes:
      "Albanian. Diacritics (e, c) are frequently dropped in real queries, so keyword sets must cover both forms.",
    currency: "ALL",
    currencySymbol: "L",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "shqiperi",
    pricing: defaultPricing,
  },
  {
    code: "XKX",
    slug: "kosovo",
    name: "Kosovo",
    shortName: "Kosovo",
    region: "balkans-cee",
    locale: "en-XK",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Albanian", "Serbian"],
    spellingNotes:
      "Albanian-first, with Serbian-language parity where the audience requires it. Keep all copy commercial and neutral.",
    currency: "EUR",
    currencySymbol: "€",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "kosove",
    pricing: defaultPricing,
  },
  {
    code: "HRV",
    slug: "croatia",
    name: "Croatia",
    shortName: "Croatia",
    region: "balkans-cee",
    locale: "en-HR",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Croatian"],
    spellingNotes:
      "Croatian. Diacritics are routinely dropped in queries; plan for both diacritic and stripped variants.",
    currency: "EUR",
    currencySymbol: "€",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "hrvatska",
    pricing: defaultPricing,
  },
  {
    code: "BGR",
    slug: "bulgaria",
    name: "Bulgaria",
    shortName: "Bulgaria",
    region: "balkans-cee",
    locale: "en-BG",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Bulgarian"],
    spellingNotes:
      "Bulgarian in Cyrillic. Latin transliteration is common in queries and brand names.",
    // VERIFY BEFORE PUBLISHING PRICES: the build brief specified BGN and asked
    // that any euro transition be handled in config rather than hardcoded.
    // Bulgaria's euro-adoption timetable and any dual-display requirement must
    // be confirmed against a current source before prices are shown here.
    // Switching is a one-line change: swap `currency` and `formerCurrency`.
    currency: "EUR",
    currencySymbol: "€",
    formerCurrency: "BGN",
    currencyNote:
      "Confirm current euro-adoption and dual-display requirements before publishing prices in this market.",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "bulgaria",
    pricing: defaultPricing,
  },
  {
    code: "HUN",
    slug: "hungary",
    name: "Hungary",
    shortName: "Hungary",
    region: "balkans-cee",
    locale: "en-HU",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Hungarian"],
    spellingNotes:
      "Hungarian is not an Indo-European language. Agglutination breaks translated keyword sets, so research must be native.",
    currency: "HUF",
    currencySymbol: "Ft",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "magyarorszag",
    pricing: defaultPricing,
  },
  {
    code: "ROU",
    slug: "romania",
    name: "Romania",
    shortName: "Romania",
    region: "balkans-cee",
    locale: "en-RO",
    language: "English",
    languageCode: "en",
    targetLanguages: ["Romanian", "Hungarian"],
    spellingNotes:
      "Romanian. Diacritics are inconsistently used in queries. Hungarian parity matters in parts of Transylvania.",
    currency: "RON",
    currencySymbol: "lei",
    enabled: true,
    localization: "translation-pending",
    localizedSlug: "romania",
    pricing: defaultPricing,
  },
];

/** The market used when nothing has been selected. */
export const DEFAULT_MARKET_CODE = "USA";

export const enabledMarkets = (): Market[] => MARKETS.filter((m) => m.enabled);

export const getMarket = (code: string | undefined | null): Market =>
  MARKETS.find((m) => m.code === code) ??
  MARKETS.find((m) => m.code === DEFAULT_MARKET_CODE)!;

export const getMarketBySlug = (slug: string): Market | undefined =>
  MARKETS.find((m) => m.slug === slug);

export const marketsByRegion = (): { region: MarketRegion; markets: Market[] }[] =>
  MARKET_REGIONS.map((region) => ({
    region,
    markets: enabledMarkets().filter((m) => m.region === region.id),
  })).filter((group) => group.markets.length > 0);

export const regionLabel = (id: MarketRegionId): string =>
  MARKET_REGIONS.find((r) => r.id === id)?.label ?? "";
