/**
 * Per-market editorial content.
 *
 * Keyed by `Market.code` from markets.ts. Every market page renders from the
 * same template, but the words below are written per market on purpose. These
 * are not doorway pages: a market with nothing specific to say does not get a
 * page.
 *
 * FIRST BUILD STATUS: this is polished English copy for every market. Markets
 * flagged `translation-pending` in markets.ts need this content rewritten in
 * language by a native writer, not machine translated. The replacement happens
 * here, in this file, keyed by the same market code.
 */

export interface MarketContent {
  /** Small line above the market hero headline. */
  heroEyebrow: string;
  heroHeadline: string;
  heroSupport: string;
  /** Who Home by Five serves in this market. */
  serves: { label: string; note: string }[];
  /** Growth challenges that are genuinely characteristic of this market. */
  challenges: { title: string; body: string }[];
  /** How the Location Growth Blueprint changes shape in this market. */
  blueprintNote: string;
  localSearch: string[];
  paidMedia: string[];
  socialContent: string[];
  geo: string[];
  deliverables: string[];
  /** Placeholder coverage areas. TODO: replace with real serviced regions. */
  regions: string[];
  languageNote: string;
}

export const MARKET_CONTENT: Record<string, MarketContent> = {
  USA: {
    heroEyebrow: "United States",
    heroHeadline: "The most expensive local market in the world to guess in.",
    heroSupport:
      "US local search is mature, crowded and priced accordingly. Lead costs are high enough that a bad plan is not a slow problem, it is an expensive one. We research the market before you spend into it.",
    serves: [
      {
        label: "Franchise systems",
        note: "Brands running 20 to 200+ territories with uneven franchisee participation.",
      },
      {
        label: "Regional multi-location operators",
        note: "Home services, restoration, med spa and dental groups adding locations faster than marketing can keep up.",
      },
      {
        label: "Independent owner-operators",
        note: "Single-location businesses competing against private-equity-backed roll-ups in the same map pack.",
      },
    ],
    challenges: [
      {
        title: "Consolidation changes who you are competing with",
        body: "In a lot of US service categories the business three positions above you is no longer a family operation. It is a roll-up with a central marketing budget. That changes what a competitive plan has to look like.",
      },
      {
        title: "Paid lead costs squeeze the unit economics",
        body: "When cost per lead climbs, the answer is usually conversion and organic coverage rather than more spend. That decision needs numbers behind it, not a vendor's opinion.",
      },
      {
        title: "Franchisee participation is uneven",
        body: "Central marketing standards mean very little if a third of the network opts out. The system has to work for the locations that engage and still improve the ones that do not.",
      },
    ],
    blueprintNote:
      "A US blueprint covers the metro's map-pack structure, the review platforms that actually influence buying in your category, paid search cost realities, and where organic coverage is cheaper than bidding.",
    localSearch: [
      "Google Business Profile is the primary battleground in nearly every category",
      "Category-specific platforms carry real weight: Yelp, Angi, Thumbtack, Nextdoor and BBB depending on vertical",
      "Local Services Ads and Google Guaranteed change the shape of the results page in several home-service verticals",
      "Service-area versus storefront profile decisions materially affect what you can rank for",
    ],
    paidMedia: [
      "Google Ads with tight geo and negative management per territory",
      "Local Services Ads where the category qualifies",
      "Meta for recruiting, offers and category education rather than direct high-intent capture",
      "Conversion tracking that reconciles calls, forms and booked jobs, not just clicks",
    ],
    socialContent: [
      "Network-level creative with location-level offers and proof",
      "Recruiting content, which in most US service categories competes with lead generation for priority",
      "Short-form video around real jobs rather than stock brand content",
      "Local review and referral prompts built into the content calendar",
    ],
    geo: [
      "AI answers increasingly sit above the map pack for research-stage queries",
      "Entity clarity across your site, profile and citations affects whether you get cited",
      "Category and service definitions need to be machine-readable, not just readable",
      "Monitoring is per metro, because AI answers vary by location the same way search results do",
    ],
    deliverables: [
      "Per-location Google Business Profile optimization and monthly posting",
      "Citation cleanup and NAP consistency across the network",
      "Service and location pages built from real local research",
      "Authority links relevant to the category and region",
      "Monthly reporting on spend, leads, booked jobs and cost per acquisition",
    ],
    regions: [
      "Texas",
      "Florida",
      "California",
      "Georgia",
      "Arizona",
      "Illinois",
      "North Carolina",
      "Colorado",
    ],
    languageNote:
      "English, US spelling. Spanish-language pages and ads are a real requirement in several metros and are handled as a separate localization workstream.",
  },

  CAN: {
    heroEyebrow: "Canada",
    heroHeadline: "A national brand and a bilingual obligation.",
    heroSupport:
      "Canadian networks tend to be geographically spread and legally split. What works in Calgary is not automatically legal, let alone effective, in Montreal.",
    serves: [
      {
        label: "National franchise brands",
        note: "Systems operating across provinces with different language and advertising requirements.",
      },
      {
        label: "Provincial multi-location operators",
        note: "Home services and clinic groups concentrated in Ontario, BC, Alberta or Quebec.",
      },
      {
        label: "Independent local businesses",
        note: "Owner-operators in metros where a handful of large players dominate paid search.",
      },
    ],
    challenges: [
      {
        title: "Quebec is a separate market, not a translation",
        body: "French-language requirements for commercial communication in Quebec are a compliance matter as well as a marketing one. Treating it as a translated version of the English site is the standard mistake.",
      },
      {
        title: "Population density concentrates competition",
        body: "A large share of the addressable market sits in a small number of metros. That makes paid competition sharp in those metros and thin everywhere else, which should change how budget is split.",
      },
      {
        title: "Seasonality is severe in most service categories",
        body: "Demand curves in Canadian home services swing hard by season. Annualised budgets that ignore that swing waste money in the quiet half of the year.",
      },
    ],
    blueprintNote:
      "A Canadian blueprint splits English and French requirements explicitly, models seasonality against the local demand curve, and flags where Quebec-facing assets need to be produced rather than translated.",
    localSearch: [
      "Google Business Profile is dominant, with HomeStars and Yelp carrying weight in specific verticals",
      "Bilingual profile and content requirements for Quebec-facing locations",
      "Province-level service area definitions that match how customers actually search",
      "Review generation in the language the customer contacted you in",
    ],
    paidMedia: [
      "Google Ads structured by metro rather than province, since costs vary sharply",
      "Separate French-language campaigns for Quebec, written not translated",
      "Meta for seasonal offers and recruiting",
      "Budget pacing that follows the seasonal demand curve instead of flat monthly spend",
    ],
    socialContent: [
      "Bilingual content workflow with human review before publication",
      "Seasonal service content aligned to when demand actually rises",
      "Location-level proof from real jobs across provinces",
      "Central brand templates with provincial offer overrides",
    ],
    geo: [
      "AI answers in Canada frequently pull from national directories and review platforms",
      "French-language AI visibility is a separate measurement, not an extension of the English one",
      "Entity and service clarity across both languages",
      "Monitoring by metro, given how concentrated the market is",
    ],
    deliverables: [
      "Bilingual location and service page architecture",
      "Google Business Profile management per location, English and French",
      "Citation and directory work across national and provincial sources",
      "Seasonal paid media planning and management",
      "Monthly reporting with province and metro comparison",
    ],
    regions: [
      "Ontario",
      "British Columbia",
      "Alberta",
      "Quebec",
      "Manitoba",
      "Nova Scotia",
      "Saskatchewan",
    ],
    languageNote:
      "English for the first build. French-language production for Quebec is a required workstream before serving that province properly, and the site architecture already supports it.",
  },

  GBR: {
    heroEyebrow: "United Kingdom",
    heroHeadline: "Trade directories still decide a lot of UK buying decisions.",
    heroSupport:
      "UK local search is Google-dominant, but trust in this market is often established somewhere else first. A plan that ignores that ordering underperforms.",
    serves: [
      {
        label: "Franchise networks",
        note: "UK systems with regional territories and central marketing funds.",
      },
      {
        label: "Multi-branch service businesses",
        note: "Trades, property services and clinic groups operating across several towns or counties.",
      },
      {
        label: "Independent local firms",
        note: "Owner-run businesses competing with national brands in local results.",
      },
    ],
    challenges: [
      {
        title: "Trust is checked on a third-party platform",
        body: "In several UK trades, the customer finds you on Google and then verifies you on Checkatrade, Trustpilot or a similar platform before calling. Your position in local results is only half the job.",
      },
      {
        title: "Territory geography is messy",
        body: "UK service areas rarely map cleanly to a single town. Postcode-driven coverage and travel radius need to be modelled properly or your location pages target places you cannot serve profitably.",
      },
      {
        title: "National brands crowd the paid results",
        body: "In many categories the top paid positions belong to national operators with far larger budgets. Winning locally usually means being better in the map pack and on the details, not outbidding them.",
      },
    ],
    blueprintNote:
      "A UK blueprint models postcode-level coverage against realistic travel radius, audits your standing on the trade platforms that matter in your category, and separates where you should compete on paid from where you should not.",
    localSearch: [
      "Google Business Profile plus the trade directories relevant to your category",
      "Checkatrade, Trustpilot, Yell, MyBuilder and Rated People carry different weight by vertical",
      "Postcode and town-level targeting that reflects real service radius",
      "Review volume and recency on the platform your customers actually check",
    ],
    paidMedia: [
      "Google Ads with tight postcode geo-targeting",
      "Separate campaigns for emergency and planned demand, which behave very differently",
      "Meta for planned and seasonal work rather than urgent jobs",
      "Call tracking that distinguishes branch enquiries from central enquiries",
    ],
    socialContent: [
      "Job-completion content that doubles as review and referral prompting",
      "Regional content that names real towns rather than generic locality copy",
      "Recruitment content, which is a live constraint in UK trades",
      "Central templates with branch-level offer overrides",
    ],
    geo: [
      "UK AI answers frequently cite national directories and consumer publications",
      "Being cited by the sources AI answers pull from matters as much as ranking",
      "Clear service, coverage and pricing information helps machine readability",
      "Monitoring by region, since answers vary between London and the rest of the country",
    ],
    deliverables: [
      "Google Business Profile management per branch",
      "Trade directory and citation consistency work",
      "Town and service pages built from real coverage data",
      "Authority links from UK-relevant publications",
      "Monthly reporting on enquiries, quotes and booked work",
    ],
    regions: [
      "Greater London",
      "South East",
      "North West",
      "West Midlands",
      "Yorkshire",
      "Scotland",
      "Wales",
      "South West",
    ],
    languageNote:
      "English, UK spelling and terminology throughout. Postcode, mobile, quote, VAT. American idioms are removed from UK-facing copy.",
  },

  AUS: {
    heroEyebrow: "Australia",
    heroHeadline: "Suburb-level search in a country of very few cities.",
    heroSupport:
      "Australian demand concentrates in a handful of metros, and inside those metros customers search by suburb. Getting the geography wrong is the most common and most expensive error here.",
    serves: [
      {
        label: "Franchise systems",
        note: "National brands with state-based territories and franchisee-funded local marketing.",
      },
      {
        label: "Metro multi-location operators",
        note: "Trades, clinics and property services covering multiple suburbs across a single metro.",
      },
      {
        label: "Independent operators",
        note: "Single-location businesses competing against lead-marketplace aggregators.",
      },
    ],
    challenges: [
      {
        title: "Lead marketplaces sit between you and the customer",
        body: "Platforms like hipages and Oneflare capture a meaningful share of demand in several trades and then resell it. Reducing dependence on that channel is usually a stated goal and needs an actual plan.",
      },
      {
        title: "Suburb targeting is the whole game",
        body: "Australians search by suburb, not by city. A page targeting the metro competes for the wrong query. This is where thin location pages get built badly, and where the opportunity is.",
      },
      {
        title: "Distance makes the economics real",
        body: "Travel time between suburbs is a direct cost. Coverage decisions should be a profitability question, not an ambition question.",
      },
    ],
    blueprintNote:
      "An Australian blueprint maps demand at suburb level against travel cost, quantifies your current dependence on lead marketplaces, and identifies which suburbs are worth building real pages for.",
    localSearch: [
      "Google Business Profile with accurate service-area configuration by suburb",
      "hipages, Oneflare, ProductReview.com.au and True Local by category",
      "Suburb-level keyword research rather than metro-level assumptions",
      "Review strategy on the platform your category's customers check",
    ],
    paidMedia: [
      "Google Ads geo-targeted by suburb cluster, not by city",
      "Bid and budget decisions weighted by travel cost to each area",
      "Meta for planned services and seasonal demand",
      "Tracking that attributes calls to the suburb that generated them",
    ],
    socialContent: [
      "Suburb-specific proof content from completed jobs",
      "Seasonal content aligned to Southern Hemisphere timing, which trips up imported calendars",
      "Short-form video showing real work rather than brand statements",
      "Central templates with suburb-level customization",
    ],
    geo: [
      "AI answers commonly cite Australian review platforms and marketplaces",
      "Suburb-level entity clarity affects whether you appear for local questions",
      "Service and coverage information needs to be explicit and structured",
      "Monitoring by metro, since Sydney and Perth behave differently",
    ],
    deliverables: [
      "Suburb-level service page architecture built from demand data",
      "Google Business Profile management and posting",
      "Australian citation and directory consistency",
      "Authority links from AU-relevant publications",
      "Monthly reporting on calls, quotes and booked jobs by suburb",
    ],
    regions: [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Perth",
      "Adelaide",
      "Gold Coast",
      "Canberra",
      "Newcastle",
    ],
    languageNote:
      "English, Australian spelling. Suburb is the standard geographic term and should be used consistently in copy and page structure.",
  },

  NZL: {
    heroEyebrow: "New Zealand",
    heroHeadline: "A small market where word of mouth is still infrastructure.",
    heroSupport:
      "New Zealand's scale changes the strategy. There is less search volume to win, reputation travels faster, and a national position is genuinely achievable for a mid-sized operator.",
    serves: [
      {
        label: "National operators",
        note: "Businesses that can realistically cover both islands with a small number of locations.",
      },
      {
        label: "Franchise networks",
        note: "Systems with regional territories across Auckland, Wellington, Christchurch and beyond.",
      },
      {
        label: "Independent local businesses",
        note: "Owner-operators in metros where a few established names hold most of the visibility.",
      },
    ],
    challenges: [
      {
        title: "Low search volume changes what to measure",
        body: "In a market this size, monthly keyword volumes are small enough that ranking reports mislead. Bookings and calls are the only honest measures.",
      },
      {
        title: "Reputation compounds faster in both directions",
        body: "Community platforms and word of mouth carry unusual weight here. Review and complaint handling is a growth channel, not an admin task.",
      },
      {
        title: "Australian competitors treat NZ as an afterthought",
        body: "Trans-Tasman operators often run New Zealand off an Australian strategy. That leaves an obvious gap for anyone willing to build genuinely local content.",
      },
    ],
    blueprintNote:
      "A New Zealand blueprint sets realistic volume expectations, prioritises conversion and reputation over ranking counts, and identifies where Australian-run competitors have left local gaps.",
    localSearch: [
      "Google Business Profile as the primary channel",
      "NoCowboys, Neighbourly and Yellow NZ depending on category",
      "Region and suburb targeting across a small number of population centres",
      "Review response as an active, visible part of the strategy",
    ],
    paidMedia: [
      "Google Ads at modest budgets where volume justifies it",
      "Meta for community-level awareness, which works unusually well at this scale",
      "Careful budget floors, since small markets punish over-spending quickly",
      "Call tracking, because form volume alone will not be statistically useful",
    ],
    socialContent: [
      "Community-oriented content that reflects how the market actually shares recommendations",
      "Regional content covering both islands rather than Auckland only",
      "Seasonal alignment to Southern Hemisphere timing",
      "Te reo Maori place names checked with a local reviewer before publication",
    ],
    geo: [
      "AI answers in New Zealand often fall back to Australian or global sources",
      "Being the clearest local source is a realistic path to citation here",
      "Explicit regional coverage information helps",
      "Monitoring nationally rather than per metro, given the scale",
    ],
    deliverables: [
      "Regional service page architecture across both islands",
      "Google Business Profile management and review workflow",
      "NZ citation and directory consistency",
      "Locally relevant authority links",
      "Monthly reporting focused on calls and bookings rather than ranking counts",
    ],
    regions: [
      "Auckland",
      "Wellington",
      "Christchurch",
      "Hamilton",
      "Tauranga",
      "Dunedin",
      "Palmerston North",
    ],
    languageNote:
      "English, New Zealand spelling. Region and suburb names carry te reo Maori forms, including macrons, and should be reviewed locally rather than auto-corrected.",
  },

  ESP: {
    heroEyebrow: "Spain",
    heroHeadline: "One country, several languages, very different regions.",
    heroSupport:
      "Spanish demand is regionally concentrated and linguistically split. A national campaign written once in Castilian will underperform in Catalonia, Galicia and the Basque Country.",
    serves: [
      {
        label: "Franchise systems",
        note: "Spain has a well-developed franchise sector across services, clinics and hospitality.",
      },
      {
        label: "Regional multi-location operators",
        note: "Businesses concentrated in Madrid, Barcelona, Valencia, Seville or the coastal regions.",
      },
      {
        label: "Independent local businesses",
        note: "Owner-run firms competing with quote marketplaces for the same demand.",
      },
    ],
    challenges: [
      {
        title: "Quote marketplaces intercept demand",
        body: "Platforms such as Habitissimo and Cronoshare sit between search and the service business in several categories. Competing means either using them deliberately or building the direct channel that replaces them.",
      },
      {
        title: "Co-official languages are a real requirement",
        body: "Catalan, Galician and Basque are not optional flourishes in their regions. Content that ignores them signals that you are not really local.",
      },
      {
        title: "Coastal and inland markets behave differently",
        body: "Areas with large international resident populations search in several languages and buy differently from inland domestic markets. One strategy will not fit both.",
      },
    ],
    blueprintNote:
      "A Spanish blueprint separates regions by language and buying behaviour, quantifies marketplace dependence, and distinguishes domestic demand from international-resident demand where both exist.",
    localSearch: [
      "Google Business Profile with province and municipality accuracy",
      "Habitissimo, Cronoshare and Paginas Amarillas depending on vertical",
      "Region-level keyword research in Castilian plus the relevant co-official language",
      "Review generation in the language the customer used",
    ],
    paidMedia: [
      "Google Ads segmented by region, since costs and behaviour differ sharply",
      "Separate ad copy per language rather than translated variants",
      "Meta for seasonal and planned services",
      "Tracking that separates domestic and international-resident enquiries where relevant",
    ],
    socialContent: [
      "Content written per region rather than nationally distributed",
      "Co-official language versions where the audience expects them",
      "Seasonal content aligned to Spanish demand patterns",
      "Central templates with regional copy and offer overrides",
    ],
    geo: [
      "Spanish-language AI answers frequently cite local marketplaces and directories",
      "Being cited requires clear, structured Spanish content, not translated English",
      "Regional entity clarity affects whether you appear in local answers",
      "Monitoring per region and per language",
    ],
    deliverables: [
      "Province and municipality page architecture",
      "Google Business Profile management per location",
      "Spanish citation and directory consistency",
      "Authority links from Spanish-language publications",
      "Monthly reporting by region and language",
    ],
    regions: [
      "Madrid",
      "Cataluna",
      "Comunidad Valenciana",
      "Andalucia",
      "Pais Vasco",
      "Galicia",
      "Islas Baleares",
      "Malaga",
    ],
    languageNote:
      "First build is English. Castilian Spanish is required for production, with Catalan, Galician and Basque review for their regions. Written locally, then human reviewed.",
  },

  ITA: {
    heroEyebrow: "Italy",
    heroHeadline: "Regional first, national second.",
    heroSupport:
      "Italian service markets are strongly regional and strongly relationship-driven. National positioning matters far less here than being unmistakably present in your province.",
    serves: [
      {
        label: "Franchise networks",
        note: "Systems operating across provinces with local franchisee ownership.",
      },
      {
        label: "Provincial multi-location businesses",
        note: "Clinics, property services and trades operating across several comuni.",
      },
      {
        label: "Independent local firms",
        note: "Established family businesses that have never been marketed properly online.",
      },
    ],
    challenges: [
      {
        title: "The north and the south are different markets",
        body: "Purchasing behaviour, competitive density and digital maturity vary enough between regions that a single national plan will be wrong in at least one direction.",
      },
      {
        title: "Referral culture dampens search behaviour",
        body: "A large share of service work still comes through personal recommendation. Search is often the verification step rather than the discovery step, which changes what your pages need to do.",
      },
      {
        title: "Comune-level geography is granular",
        body: "Italian administrative geography is fine-grained, and customers search accordingly. Province-level pages are usually too coarse to win.",
      },
    ],
    blueprintNote:
      "An Italian blueprint works at province and comune level, treats search as a verification channel where that reflects reality, and separates northern and southern market dynamics rather than averaging them.",
    localSearch: [
      "Google Business Profile with comune-level accuracy",
      "ProntoPro, PagineGialle and Habitissimo Italia depending on category",
      "Province and comune keyword research in Italian",
      "Review generation, which carries strong weight in a referral-driven market",
    ],
    paidMedia: [
      "Google Ads segmented by province",
      "Budget weighted toward regions with genuine digital purchasing behaviour",
      "Meta for planned and seasonal services",
      "Call tracking, since phone remains a dominant enquiry channel",
    ],
    socialContent: [
      "Content written in Italian by an Italian writer, not translated",
      "Local proof content that reinforces existing word of mouth",
      "Regional variation in tone between north and south",
      "German-language parity for South Tyrol where relevant",
    ],
    geo: [
      "Italian-language AI answers cite local directories and marketplaces",
      "Structured Italian content is required to be citable",
      "Comune-level entity clarity",
      "Monitoring per region rather than nationally",
    ],
    deliverables: [
      "Province and comune page architecture",
      "Google Business Profile management per location",
      "Italian citation and directory consistency",
      "Authority links from Italian publications",
      "Monthly reporting by province",
    ],
    regions: [
      "Lombardia",
      "Lazio",
      "Veneto",
      "Emilia-Romagna",
      "Piemonte",
      "Toscana",
      "Campania",
      "Sicilia",
    ],
    languageNote:
      "First build is English. Italian production is required before serving the market properly. South Tyrol requires German-language parity for public-facing assets.",
  },

  FRA: {
    heroEyebrow: "France",
    heroHeadline: "French copy has to be written in French.",
    heroSupport:
      "France punishes translated marketing harder than most markets. Tone, formality and terminology are noticed, and getting them wrong costs you credibility before anyone reads your offer.",
    serves: [
      {
        label: "Franchise networks",
        note: "France has one of Europe's largest franchise sectors across services and retail.",
      },
      {
        label: "Regional multi-location operators",
        note: "Businesses covering several departements or a major metropolitan area.",
      },
      {
        label: "Independent local businesses",
        note: "Artisans and service firms competing with quote-request platforms.",
      },
    ],
    challenges: [
      {
        title: "Quote platforms own a share of the funnel",
        body: "Services like PagesJaunes, Travaux.com and StarOfService intercept a meaningful portion of demand. That dependence should be measured before it is either accepted or replaced.",
      },
      {
        title: "Privacy enforcement is genuinely strict",
        body: "Consent handling and tracking configuration are compliance matters here, not preferences. Measurement plans have to be designed to work within that, not around it.",
      },
      {
        title: "Paris distorts national averages",
        body: "Costs, competition and behaviour in Ile-de-France are unlike the rest of the country. Averaged national planning misallocates budget in both directions.",
      },
    ],
    blueprintNote:
      "A French blueprint works at departement and commune level, models the cost of platform dependence, and builds a measurement plan that holds up under French consent requirements.",
    localSearch: [
      "Google Business Profile with commune-level accuracy",
      "PagesJaunes, Travaux.com and StarOfService depending on category",
      "French keyword research, including how services are actually named locally",
      "Review generation in French",
    ],
    paidMedia: [
      "Google Ads separated between Ile-de-France and the regions",
      "Ad copy written in French, with formality matched to the audience",
      "Meta for planned services and seasonal demand",
      "Consent-compliant conversion tracking designed up front",
    ],
    socialContent: [
      "French-language content written by a French writer",
      "Regional proof content rather than national brand messaging",
      "Formal or informal address chosen deliberately and applied consistently",
      "Central templates with regional overrides",
    ],
    geo: [
      "French-language AI answers cite French directories and publications",
      "English content will not earn citations in French answers",
      "Clear structured service and coverage data in French",
      "Monitoring separated between Paris and the regions",
    ],
    deliverables: [
      "Departement and commune page architecture",
      "Google Business Profile management per location",
      "French citation and directory consistency",
      "Authority links from French publications",
      "Monthly reporting with Paris and regional comparison",
    ],
    regions: [
      "Ile-de-France",
      "Auvergne-Rhone-Alpes",
      "Provence-Alpes-Cote d'Azur",
      "Occitanie",
      "Nouvelle-Aquitaine",
      "Hauts-de-France",
      "Grand Est",
      "Bretagne",
    ],
    languageNote:
      "First build is English. French production is mandatory before serving the market. Translation is not acceptable here, including in ad copy.",
  },

  NLD: {
    heroEyebrow: "Netherlands",
    heroHeadline: "A small country with unusually sophisticated buyers.",
    heroSupport:
      "Dutch customers compare, read reviews, and are comfortable in English. That makes the market easy to enter and hard to bluff your way through.",
    serves: [
      {
        label: "Franchise networks",
        note: "Systems covering the Randstad and the provinces with local ownership.",
      },
      {
        label: "Multi-location service businesses",
        note: "Trades, clinics and property services operating across several gemeenten.",
      },
      {
        label: "Independent local businesses",
        note: "Owner-run firms competing with platform-mediated demand.",
      },
    ],
    challenges: [
      {
        title: "Werkspot and similar platforms sit in the middle",
        body: "In several trades, the platform is where the customer starts. Building direct demand means giving people a reason to skip that step, which is a positioning problem before it is a marketing one.",
      },
      {
        title: "Price comparison is a cultural default",
        body: "Dutch buyers will compare, and they will notice vague pricing. Transparency tends to convert better here than it does in markets where ambiguity is tolerated.",
      },
      {
        title: "English fluency creates a false sense of coverage",
        body: "The population reads English comfortably, which tempts operators to skip Dutch content. Service and pricing pages still need to be Dutch to be taken seriously.",
      },
    ],
    blueprintNote:
      "A Dutch blueprint measures platform dependence, tests where pricing transparency helps conversion, and separates which pages genuinely need Dutch from which can stay English initially.",
    localSearch: [
      "Google Business Profile with gemeente-level accuracy",
      "Werkspot, Trustoo and category-specific comparison sites",
      "Dutch keyword research, including how services are colloquially named",
      "Review volume, which Dutch buyers actively check",
    ],
    paidMedia: [
      "Google Ads with gemeente-level geo-targeting",
      "Dutch ad copy, since English ads read as foreign in high-intent searches",
      "Meta for planned services",
      "Consent-compliant conversion tracking",
    ],
    socialContent: [
      "Dutch-language content written by a Dutch writer",
      "Direct, plain content, which suits the market better than promotional tone",
      "Transparent pricing and process content",
      "Central templates with regional overrides",
    ],
    geo: [
      "Dutch AI answers cite local comparison sites and directories",
      "Clear pricing and process content improves the odds of being cited",
      "Structured service data in Dutch",
      "Monitoring across the Randstad and the provinces separately",
    ],
    deliverables: [
      "Gemeente and province page architecture",
      "Google Business Profile management per location",
      "Dutch citation and directory consistency",
      "Authority links from Dutch publications",
      "Monthly reporting by region",
    ],
    regions: [
      "Noord-Holland",
      "Zuid-Holland",
      "Utrecht",
      "Noord-Brabant",
      "Gelderland",
      "Overijssel",
      "Limburg",
      "Groningen",
    ],
    languageNote:
      "First build is English. Dutch production is required for service, pricing and conversion pages. English can remain for top-of-funnel content longer than in most markets.",
  },

  DEU: {
    heroEyebrow: "Germany",
    heroHeadline: "The most demanding market on this list, and worth it.",
    heroSupport:
      "German buyers expect precision, and German regulation expects compliance. Both raise the cost of entry, and both keep out competitors who are not serious.",
    serves: [
      {
        label: "Franchise systems",
        note: "Germany has a large, formalised franchise sector with strong central standards.",
      },
      {
        label: "Regional multi-location operators",
        note: "Businesses covering several Bundeslander or a single major metropolitan region.",
      },
      {
        label: "Independent local businesses",
        note: "Handwerk businesses with strong reputations and weak digital presence.",
      },
    ],
    challenges: [
      {
        title: "Compliance is a build requirement, not a checklist",
        body: "Impressum obligations, consent handling and data-processing transparency shape how the site is built and how measurement works. Retro-fitting them is more expensive than designing for them.",
      },
      {
        title: "Comparison portals dominate several categories",
        body: "Platforms like MyHammer and Check24 hold strong positions. Competing directly on their terms is usually a losing budget fight, so the plan has to find the flanks.",
      },
      {
        title: "Compound terminology breaks translated keyword sets",
        body: "German service terms are compounds, and the compound customers actually search is often not the one a translator produces. Keyword research has to be native.",
      },
    ],
    blueprintNote:
      "A German blueprint is built around native keyword research, a compliance-aware measurement plan, and an honest assessment of which categories are worth contesting against the comparison portals.",
    localSearch: [
      "Google Business Profile with accurate Bundesland and city data",
      "MyHammer, Check24, Das Ortliche, Gelbe Seiten and ProvenExpert by category",
      "Native German keyword research covering compound variations",
      "Review generation on the platforms German buyers actually consult",
    ],
    paidMedia: [
      "Google Ads segmented by metropolitan region",
      "German ad copy written natively, with formal address for business audiences",
      "Meta for planned services and recruiting",
      "Consent-compliant tracking designed before campaigns launch",
    ],
    socialContent: [
      "German-language content written by a German writer",
      "Precise, specific content, since vague claims are actively distrusted here",
      "Regional proof content rather than national brand statements",
      "Central templates with strict brand and compliance controls",
    ],
    geo: [
      "German AI answers cite German directories, portals and trade publications",
      "Precision and structure in German content improves citation odds",
      "Clear entity and qualification data, which matters in regulated trades",
      "Monitoring per metropolitan region",
    ],
    deliverables: [
      "City and Bundesland page architecture",
      "Google Business Profile management per location",
      "German citation and portal consistency",
      "Authority links from German publications",
      "Monthly reporting by region, with compliance-safe measurement",
    ],
    regions: [
      "Nordrhein-Westfalen",
      "Bayern",
      "Baden-Wurttemberg",
      "Berlin",
      "Hessen",
      "Niedersachsen",
      "Hamburg",
      "Sachsen",
    ],
    languageNote:
      "First build is English. German production is mandatory before serving the market. Formal address for business audiences, and native handling of compound service terms.",
  },

  GRC: {
    heroEyebrow: "Greece",
    heroHeadline: "Two scripts, one set of customers.",
    heroSupport:
      "Greek customers search in Greek and in Latin transliteration, sometimes in the same session. Strategies that only handle one of those miss real demand.",
    serves: [
      {
        label: "Franchise networks",
        note: "Systems operating across Attica, Thessaloniki and the islands.",
      },
      {
        label: "Multi-location service businesses",
        note: "Property services, clinics and hospitality-adjacent operators.",
      },
      {
        label: "Independent local businesses",
        note: "Owner-run firms in markets where digital competition is still thin.",
      },
    ],
    challenges: [
      {
        title: "Greeklish is real search behaviour",
        body: "Latin-script transliteration of Greek terms appears in genuine queries. Keyword research that only covers Greek script understates demand and misses easy coverage.",
      },
      {
        title: "Tourism seasonality distorts everything",
        body: "In many regions, demand is driven by a season rather than a year. Budgets, staffing and content calendars all have to follow that curve.",
      },
      {
        title: "Island and mainland logistics differ completely",
        body: "Service coverage across islands is a genuine operational constraint. Marketing that promises coverage the business cannot deliver profitably creates a different problem.",
      },
    ],
    blueprintNote:
      "A Greek blueprint covers both Greek and Greeklish query sets, models seasonality against the local demand curve, and treats island coverage as an economics question rather than an ambition.",
    localSearch: [
      "Google Business Profile with accurate regional data",
      "Vrisko.gr and category-specific Greek directories",
      "Keyword research covering Greek script and Latin transliteration",
      "Review generation in Greek",
    ],
    paidMedia: [
      "Google Ads with seasonal pacing rather than flat monthly budgets",
      "Greek ad copy, with transliterated variants tested where behaviour supports it",
      "Meta, which holds strong attention share in this market",
      "Call tracking, since phone is a dominant enquiry channel",
    ],
    socialContent: [
      "Greek-language content written by a Greek writer",
      "Seasonal content aligned to the real demand curve",
      "Regional content separating Attica, Thessaloniki and the islands",
      "Central templates with regional overrides",
    ],
    geo: [
      "Greek AI answers cite local directories and Greek-language publications",
      "Greek-script content is required to be citable in Greek answers",
      "Clear regional coverage information",
      "Monitoring by region, given the seasonal and geographic split",
    ],
    deliverables: [
      "Regional and city page architecture",
      "Google Business Profile management per location",
      "Greek citation and directory consistency",
      "Authority links from Greek publications",
      "Monthly reporting with seasonal context",
    ],
    regions: [
      "Attica",
      "Thessaloniki",
      "Crete",
      "Peloponnese",
      "Central Macedonia",
      "Cyclades",
      "Dodecanese",
      "Achaea",
    ],
    languageNote:
      "First build is English. Greek production is required, in Greek script, with transliterated variants covered in keyword research rather than in published copy.",
  },

  MKD: {
    heroEyebrow: "Macedonia",
    heroHeadline: "Where being findable at all is still a competitive advantage.",
    heroSupport:
      "Search competition here is thin compared with Western Europe, and social platforms carry more of the discovery load. That combination makes a disciplined plan unusually effective.",
    serves: [
      {
        label: "Local service businesses",
        note: "Owner-run firms in Skopje and the regional centres with little or no search presence.",
      },
      {
        label: "Multi-location operators",
        note: "Businesses covering several cities where no competitor has built proper local pages.",
      },
      {
        label: "Regional franchise systems",
        note: "Brands expanding across the country or into neighbouring markets.",
      },
    ],
    challenges: [
      {
        title: "Discovery happens on social, not search",
        body: "For a large share of local businesses, Facebook and Instagram are the primary storefront. Search is underused, which is exactly why it is the cheaper channel to win right now.",
      },
      {
        title: "Cyrillic and Latin both appear in queries",
        body: "Macedonian is written in Cyrillic, but Latin transliteration is common in typing. Both need to be researched and covered or you are only seeing half the demand.",
      },
      {
        title: "Messaging apps carry the conversion step",
        body: "Enquiries often move to Viber or Messenger rather than a call or form. Measurement that only counts form fills will report the business as failing when it is not.",
      },
    ],
    blueprintNote:
      "A Macedonian blueprint covers Cyrillic and Latin query sets, measures conversion where it actually happens including messaging apps, and identifies the search positions that are currently uncontested.",
    localSearch: [
      "Google Business Profile, which many local competitors have not optimised",
      "Pazar3.mk, Reklama5 and category-specific local listings",
      "Keyword research across Macedonian Cyrillic and Latin transliteration",
      "Review generation, which is still rare enough to be a differentiator",
    ],
    paidMedia: [
      "Meta first in most categories, given where attention sits",
      "Google Ads at low cost per click relative to Western Europe",
      "Budgets sized to a smaller market rather than scaled down from a US plan",
      "Tracking that captures messaging-app enquiries, not just calls and forms",
    ],
    socialContent: [
      "Macedonian-language content written locally",
      "Albanian-language parity where the audience requires it",
      "Social-first formats, since that is where the audience already is",
      "Content that builds the search presence competitors have neglected",
    ],
    geo: [
      "AI answers frequently fall back to regional or English sources for this market",
      "Being the clearest local source is a realistic route to citation",
      "Structured Macedonian content in Cyrillic",
      "Monitoring nationally, given market size",
    ],
    deliverables: [
      "City and service page architecture in Macedonian",
      "Google Business Profile setup and optimization",
      "Local citation and listing consistency",
      "Locally relevant authority links",
      "Monthly reporting including messaging-app enquiries",
    ],
    regions: [
      "Skopje",
      "Bitola",
      "Kumanovo",
      "Prilep",
      "Tetovo",
      "Ohrid",
      "Veles",
      "Strumica",
    ],
    languageNote:
      "First build is English. Macedonian production in Cyrillic is required, with Latin transliteration covered in keyword research. Albanian-language parity where the audience requires it.",
  },

  SRB: {
    heroEyebrow: "Serbia",
    heroHeadline: "Two scripts, strong classifieds, and an open search field.",
    heroSupport:
      "Serbian buyers still start a lot of service searches on classifieds platforms. Businesses that build proper search presence face less competition than they would almost anywhere in Western Europe.",
    serves: [
      {
        label: "Local service businesses",
        note: "Owner-run firms in Belgrade, Novi Sad and regional centres.",
      },
      {
        label: "Multi-city operators",
        note: "Businesses covering several cities without dedicated local pages for any of them.",
      },
      {
        label: "Regional franchise systems",
        note: "Brands operating across Serbia and into neighbouring markets.",
      },
    ],
    challenges: [
      {
        title: "Classifieds platforms hold the demand",
        body: "KupujemProdajem and Halo Oglasi capture a large share of service discovery. Building a direct channel is possible and cheap right now, but it has to be a deliberate decision.",
      },
      {
        title: "Cyrillic and Latin script both matter",
        body: "Serbian is officially written in Cyrillic and commonly typed in Latin. Content, metadata and keyword research all need to handle both.",
      },
      {
        title: "Belgrade is not the whole country",
        body: "Competition concentrates in the capital while regional cities remain largely uncontested. Budget allocation should reflect that gap rather than following population alone.",
      },
    ],
    blueprintNote:
      "A Serbian blueprint covers both scripts, quantifies dependence on classifieds platforms, and separates Belgrade competition from the far cheaper regional opportunity.",
    localSearch: [
      "Google Business Profile, which remains underused by local competitors",
      "KupujemProdajem, Halo Oglasi and category-specific listings",
      "Keyword research in both Cyrillic and Latin script",
      "Review generation as an early differentiator",
    ],
    paidMedia: [
      "Meta for reach, given strong platform usage",
      "Google Ads at low cost per click relative to Western Europe",
      "Regional campaign splits between Belgrade and secondary cities",
      "Tracking that includes Viber and Messenger enquiries",
    ],
    socialContent: [
      "Serbian-language content written locally",
      "Script consistency decided deliberately and applied throughout",
      "Social-first formats matched to how the audience discovers services",
      "City-level proof content rather than national messaging",
    ],
    geo: [
      "AI answers often fall back to regional sources for Serbian queries",
      "Clear local content is a realistic route to being cited",
      "Structured Serbian content with consistent script handling",
      "Monitoring split between Belgrade and regional cities",
    ],
    deliverables: [
      "City and service page architecture in Serbian",
      "Google Business Profile setup and optimization",
      "Local citation and listing consistency",
      "Locally relevant authority links",
      "Monthly reporting by city",
    ],
    regions: [
      "Belgrade",
      "Novi Sad",
      "Nis",
      "Kragujevac",
      "Subotica",
      "Zrenjanin",
      "Pancevo",
      "Cacak",
    ],
    languageNote:
      "First build is English. Serbian production is required, with an explicit decision on Cyrillic or Latin script and both covered in keyword research.",
  },

  ALB: {
    heroEyebrow: "Albania",
    heroHeadline: "A social-first market with almost no search competition.",
    heroSupport:
      "Most Albanian service businesses market entirely on Instagram and Facebook. That leaves search almost empty, which is a rare and temporary advantage for anyone willing to build there.",
    serves: [
      {
        label: "Local service businesses",
        note: "Owner-run firms in Tirana, Durres and the coastal centres.",
      },
      {
        label: "Tourism-adjacent operators",
        note: "Property, hospitality and service businesses with strong seasonal demand.",
      },
      {
        label: "Multi-city operators",
        note: "Businesses covering several cities with no dedicated local presence.",
      },
    ],
    challenges: [
      {
        title: "Instagram is the storefront",
        body: "For many categories, the business's Instagram profile is the website. Building an actual site and search presence is a genuine differentiator rather than table stakes.",
      },
      {
        title: "Seasonality is extreme on the coast",
        body: "Tourism-driven demand concentrates into a few months. Marketing that spends evenly across the year burns budget in the wrong half of it.",
      },
      {
        title: "Diacritics get dropped in real queries",
        body: "Albanian diacritics are frequently omitted when typing. Keyword sets and content have to cover both forms or a chunk of demand is invisible.",
      },
    ],
    blueprintNote:
      "An Albanian blueprint models seasonality honestly, covers diacritic and stripped query forms, and quantifies what a proper search presence is worth in a market where almost nobody has one.",
    localSearch: [
      "Google Business Profile, which is frequently unclaimed or unoptimised",
      "MerrJep.al and category-specific local listings",
      "Keyword research covering diacritic and non-diacritic forms",
      "Review generation, which is uncommon and therefore visible",
    ],
    paidMedia: [
      "Meta and Instagram first, given where attention concentrates",
      "Google Ads at very low relative cost where demand exists",
      "Seasonal budget pacing rather than flat monthly spend",
      "Tracking built around messaging enquiries, which dominate",
    ],
    socialContent: [
      "Albanian-language content written locally",
      "Instagram-native formats, since that is the primary channel",
      "Seasonal content aligned to the tourism curve where relevant",
      "Content that establishes the search presence competitors lack",
    ],
    geo: [
      "AI answers for Albanian queries frequently fall back to regional or English sources",
      "A clear local source can realistically become the cited one",
      "Structured Albanian content",
      "Monitoring nationally, given market size",
    ],
    deliverables: [
      "City and service page architecture in Albanian",
      "Google Business Profile setup and optimization",
      "Local citation and listing consistency",
      "Locally relevant authority links",
      "Monthly reporting including messaging enquiries",
    ],
    regions: ["Tirana", "Durres", "Vlore", "Shkoder", "Elbasan", "Sarande", "Fier", "Korce"],
    languageNote:
      "First build is English. Albanian production is required. Keyword research must cover both diacritic and stripped forms of key terms.",
  },

  XKX: {
    heroEyebrow: "Kosovo",
    heroHeadline: "A young market building its digital habits right now.",
    heroSupport:
      "Kosovo has high mobile usage, a very young population, and a local search ecosystem that is still forming. Businesses that build properly now set the defaults for their category.",
    serves: [
      {
        label: "Local service businesses",
        note: "Owner-run firms in Pristina and the regional centres.",
      },
      {
        label: "Multi-city operators",
        note: "Businesses covering several municipalities with no dedicated local presence.",
      },
      {
        label: "Regional expansion brands",
        note: "Operators moving between Kosovo, Albania and North Macedonia.",
      },
    ],
    challenges: [
      {
        title: "Local platforms matter alongside Google",
        body: "Regional platforms such as Gjirafa hold real attention here. A plan built only around Google misses part of how people actually find services.",
      },
      {
        title: "Two languages, one audience",
        body: "Albanian-first with Serbian-language parity where the audience requires it. Handling this cleanly is a practical content requirement, and the implementation stays neutral.",
      },
      {
        title: "Mobile-first is literal here",
        body: "A very high share of usage is mobile. Page speed and mobile conversion design are not refinements in this market, they are the whole experience.",
      },
    ],
    blueprintNote:
      "A Kosovo blueprint covers Google and the regional platforms, plans language parity as a content requirement, and treats mobile performance as a primary conversion factor.",
    localSearch: [
      "Google Business Profile, frequently unclaimed in this market",
      "Gjirafa and category-specific regional platforms",
      "Albanian keyword research, with Serbian-language coverage where relevant",
      "Review generation, which is still uncommon",
    ],
    paidMedia: [
      "Meta and Instagram first, given usage patterns",
      "Google Ads at low relative cost",
      "Mobile-optimised creative and landing pages as the default assumption",
      "Tracking built around messaging and calls",
    ],
    socialContent: [
      "Albanian-language content written locally",
      "Serbian-language parity where the audience requires it",
      "Mobile-native formats",
      "Content that establishes category authority early",
    ],
    geo: [
      "AI answers for this market often fall back to regional or English sources",
      "Clear local content can realistically become the cited source",
      "Structured content in the relevant language",
      "Monitoring nationally, given market size",
    ],
    deliverables: [
      "Municipality and service page architecture",
      "Google Business Profile setup and optimization",
      "Local and regional listing consistency",
      "Locally relevant authority links",
      "Monthly reporting including messaging enquiries",
    ],
    regions: ["Pristina", "Prizren", "Peja", "Gjakova", "Ferizaj", "Gjilan", "Mitrovica"],
    languageNote:
      "First build is English. Albanian production is required, with Serbian-language parity where the audience requires it. All copy stays commercial and neutral.",
  },

  HRV: {
    heroEyebrow: "Croatia",
    heroHeadline: "Coastal seasonality and a strong domestic classifieds habit.",
    heroSupport:
      "Croatia runs two demand patterns at once: a year-round domestic market and a coastal season that changes everything for several months. A single averaged plan serves neither well.",
    serves: [
      {
        label: "Local service businesses",
        note: "Owner-run firms in Zagreb, Split, Rijeka and Osijek.",
      },
      {
        label: "Coastal and property operators",
        note: "Property management, maintenance and hospitality-adjacent services with sharp seasonality.",
      },
      {
        label: "Multi-city operators",
        note: "Businesses covering both inland and coastal markets.",
      },
    ],
    challenges: [
      {
        title: "Njuskalo holds a large share of discovery",
        body: "The dominant domestic classifieds platform intercepts service demand in several categories. Building the direct channel is viable, but the dependence should be measured first.",
      },
      {
        title: "Coastal demand is seasonal and international",
        body: "Coastal markets serve visitors and foreign property owners as well as residents. That means multi-language demand and a very uneven annual curve.",
      },
      {
        title: "Diacritics are inconsistently typed",
        body: "Croatian diacritics are routinely dropped in queries. Content and keyword sets have to cover both forms.",
      },
    ],
    blueprintNote:
      "A Croatian blueprint separates inland and coastal demand, models seasonality properly, and covers both diacritic and stripped query forms.",
    localSearch: [
      "Google Business Profile with accurate county and city data",
      "Njuskalo and Zute stranice depending on category",
      "Croatian keyword research covering diacritic variants",
      "Review generation, including from international customers on the coast",
    ],
    paidMedia: [
      "Google Ads with seasonal pacing on coastal campaigns",
      "Croatian ad copy, with English variants where coastal demand justifies it",
      "Meta for seasonal and planned services",
      "Tracking that separates domestic and visitor enquiries where relevant",
    ],
    socialContent: [
      "Croatian-language content written locally",
      "Separate seasonal calendars for coastal and inland markets",
      "English-language content where coastal audiences require it",
      "City-level proof content",
    ],
    geo: [
      "Croatian AI answers cite local directories and classifieds",
      "Structured Croatian content improves citation odds",
      "Clear seasonal and coverage information",
      "Monitoring split between coastal and inland markets",
    ],
    deliverables: [
      "County and city page architecture",
      "Google Business Profile management per location",
      "Croatian citation and listing consistency",
      "Locally relevant authority links",
      "Monthly reporting with seasonal context",
    ],
    regions: ["Zagreb", "Split-Dalmatia", "Istria", "Primorje-Gorski Kotar", "Osijek-Baranja", "Zadar", "Dubrovnik-Neretva"],
    languageNote:
      "First build is English. Croatian production is required. Coastal markets may justify English-language pages alongside Croatian.",
  },

  BGR: {
    heroEyebrow: "Bulgaria",
    heroHeadline: "Cyrillic search, low competition, and a market in transition.",
    heroSupport:
      "Bulgarian local search is far less contested than Western Europe, and the currency and pricing environment is changing. Both facts should shape the plan rather than be discovered later.",
    serves: [
      {
        label: "Local service businesses",
        note: "Owner-run firms in Sofia, Plovdiv, Varna and Burgas.",
      },
      {
        label: "Multi-city operators",
        note: "Businesses covering several cities with no dedicated local pages.",
      },
      {
        label: "Coastal and property services",
        note: "Operators serving seasonal and foreign-owned property demand.",
      },
    ],
    challenges: [
      {
        title: "Cyrillic and Latin both appear in queries",
        body: "Bulgarian is written in Cyrillic, but Latin transliteration shows up in real search behaviour, particularly for brand and service terms. Both need coverage.",
      },
      {
        title: "Currency and pricing presentation is in flux",
        body: "Pricing display requirements should be confirmed against current rules before any price is published. This is a compliance detail that is cheap to get right and awkward to get wrong.",
      },
      {
        title: "Classifieds platforms hold service demand",
        body: "Bazar.bg and similar platforms capture discovery in several categories, leaving direct search comparatively open.",
      },
    ],
    blueprintNote:
      "A Bulgarian blueprint covers Cyrillic and Latin query sets, confirms current pricing-display requirements before anything is published, and quantifies the gap left by classifieds-led discovery.",
    localSearch: [
      "Google Business Profile, frequently unoptimised by local competitors",
      "Bazar.bg and Bulgarian business directories",
      "Keyword research in Cyrillic with Latin transliteration coverage",
      "Review generation as an early differentiator",
    ],
    paidMedia: [
      "Google Ads at low cost per click relative to Western Europe",
      "Meta for reach and seasonal offers",
      "City-level campaign splits between Sofia and secondary cities",
      "Tracking that includes messaging and call enquiries",
    ],
    socialContent: [
      "Bulgarian-language content written locally, in Cyrillic",
      "City-level proof content rather than national messaging",
      "Seasonal content where coastal demand applies",
      "Content that builds the search presence competitors lack",
    ],
    geo: [
      "AI answers for Bulgarian queries often fall back to regional sources",
      "Cyrillic-script structured content is required to be citable locally",
      "Clear service and coverage data",
      "Monitoring split between Sofia and the regions",
    ],
    deliverables: [
      "City and service page architecture in Bulgarian",
      "Google Business Profile setup and optimization",
      "Bulgarian citation and listing consistency",
      "Locally relevant authority links",
      "Monthly reporting by city",
    ],
    regions: ["Sofia", "Plovdiv", "Varna", "Burgas", "Ruse", "Stara Zagora", "Pleven", "Blagoevgrad"],
    languageNote:
      "First build is English. Bulgarian production in Cyrillic is required. Confirm current currency and pricing-display requirements before publishing prices in this market.",
  },

  HUN: {
    heroEyebrow: "Hungary",
    heroHeadline: "A language that breaks translated keyword research.",
    heroSupport:
      "Hungarian is not related to the languages around it, and its grammar changes word forms in ways that defeat translated keyword sets. Native research is not a nice-to-have here, it is the whole job.",
    serves: [
      {
        label: "Local service businesses",
        note: "Owner-run firms in Budapest and the regional cities.",
      },
      {
        label: "Multi-city operators",
        note: "Businesses covering several counties with no dedicated local presence.",
      },
      {
        label: "Franchise networks",
        note: "Systems with regional territories across the country.",
      },
    ],
    challenges: [
      {
        title: "Agglutination breaks keyword tooling",
        body: "Hungarian words change form with suffixes, so a translated keyword list will miss the forms customers actually type. Research must be done natively or the entire content plan is built on the wrong terms.",
      },
      {
        title: "Budapest concentrates the market",
        body: "A large share of demand and nearly all of the competition sits in the capital. Regional cities are comparatively open, which should change how budget is split.",
      },
      {
        title: "Price sensitivity is high",
        body: "Hungarian buyers compare aggressively on price. Positioning and conversion copy have to address that directly rather than avoid it.",
      },
    ],
    blueprintNote:
      "A Hungarian blueprint is built on native keyword research rather than translation, splits Budapest from the regional opportunity, and addresses price comparison as a conversion problem.",
    localSearch: [
      "Google Business Profile with accurate county and city data",
      "Hungarian comparison and directory platforms by category",
      "Native Hungarian keyword research covering inflected forms",
      "Review generation in Hungarian",
    ],
    paidMedia: [
      "Google Ads split between Budapest and regional campaigns",
      "Hungarian ad copy written natively",
      "Meta for planned and seasonal services",
      "Tracking that captures calls, which remain a dominant channel",
    ],
    socialContent: [
      "Hungarian-language content written by a Hungarian writer",
      "Regional content covering cities outside Budapest",
      "Pricing and value content, given how buyers compare",
      "Central templates with regional overrides",
    ],
    geo: [
      "Hungarian AI answers cite Hungarian directories and publications",
      "Only native Hungarian content will be citable in Hungarian answers",
      "Clear structured service and coverage data",
      "Monitoring split between Budapest and the regions",
    ],
    deliverables: [
      "County and city page architecture in Hungarian",
      "Google Business Profile management per location",
      "Hungarian citation and directory consistency",
      "Authority links from Hungarian publications",
      "Monthly reporting by region",
    ],
    regions: ["Budapest", "Pest", "Debrecen", "Szeged", "Miskolc", "Pecs", "Gyor", "Nyiregyhaza"],
    languageNote:
      "First build is English. Hungarian production is mandatory, with keyword research done natively. Translated keyword sets are not usable in this market.",
  },

  ROU: {
    heroEyebrow: "Romania",
    heroHeadline: "Fast-growing digital demand and a still-open search field.",
    heroSupport:
      "Romania has strong internet infrastructure, growing digital purchasing, and local search competition that has not caught up yet. That gap is the opportunity.",
    serves: [
      {
        label: "Local service businesses",
        note: "Owner-run firms in Bucharest, Cluj-Napoca, Timisoara and Iasi.",
      },
      {
        label: "Multi-city operators",
        note: "Businesses covering several judete with no dedicated local pages.",
      },
      {
        label: "Franchise networks",
        note: "Systems expanding across the country and into neighbouring markets.",
      },
    ],
    challenges: [
      {
        title: "Marketplace platforms hold service discovery",
        body: "OLX.ro and similar platforms intercept demand in several categories. Direct search remains comparatively uncontested, which makes building there cheap right now.",
      },
      {
        title: "Diacritics are inconsistently used",
        body: "Romanian diacritics are frequently omitted when typing. Keyword sets and content need to handle both forms to capture the full demand.",
      },
      {
        title: "Regional languages matter in parts of the country",
        body: "Hungarian-language parity is a genuine requirement in parts of Transylvania. Treating the country as linguistically uniform loses real audience.",
      },
    ],
    blueprintNote:
      "A Romanian blueprint covers diacritic and stripped query forms, quantifies marketplace dependence, and flags where Hungarian-language parity is required.",
    localSearch: [
      "Google Business Profile with accurate judet and city data",
      "OLX.ro, Publi24 and category-specific directories",
      "Romanian keyword research covering diacritic variants",
      "Review generation, which is still uncommon in many categories",
    ],
    paidMedia: [
      "Google Ads at low cost per click relative to Western Europe",
      "City-level splits between Bucharest and secondary cities",
      "Meta for reach and seasonal offers",
      "Tracking that includes calls and messaging enquiries",
    ],
    socialContent: [
      "Romanian-language content written locally",
      "Hungarian-language parity where the audience requires it",
      "City-level proof content",
      "Content that builds search presence ahead of competitors",
    ],
    geo: [
      "Romanian AI answers cite local marketplaces and publications",
      "Structured Romanian content is required to be citable",
      "Clear service and coverage data by city",
      "Monitoring split between Bucharest and the regions",
    ],
    deliverables: [
      "Judet and city page architecture in Romanian",
      "Google Business Profile management per location",
      "Romanian citation and directory consistency",
      "Authority links from Romanian publications",
      "Monthly reporting by city",
    ],
    regions: ["Bucharest", "Cluj-Napoca", "Timisoara", "Iasi", "Constanta", "Brasov", "Craiova", "Oradea"],
    languageNote:
      "First build is English. Romanian production is required, covering diacritic and stripped forms. Hungarian-language parity where the audience requires it.",
  },
};

export const getMarketContent = (code: string): MarketContent | undefined =>
  MARKET_CONTENT[code];
