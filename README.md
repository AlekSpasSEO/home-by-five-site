# Home by Five

Production marketing site for Home by Five: productized growth infrastructure for
franchises, franchisees, multi-location service businesses and local service owners.

Primary acquisition offer: the **$150 per location Location Growth Blueprint**. The
customer owns the research and the strategy whether or not they continue.

Built from the internal brief `Home_by_Five_Claude_Code_Website_Prompt-3.docx`, which
stays the source of truth. This README covers what exists and where to change it.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Dev server on http://localhost:3000 (the local `.claude/launch.json` pins 3210).

```bash
npm run build
```

```bash
npx tsc --noEmit && npx eslint .
```

### GitHub Pages preview

Live at **https://alekspasseo.github.io/home-by-five-site/**

```bash
npm run deploy:pages
```

Builds a static export and force-pushes it to the `gh-pages` branch, which Pages
serves from the root. `gh-pages` holds build output only — never edit or merge it.

To build the export without publishing:

```bash
npm run build:pages
```

Output lands in `out/`. Note that Pages serves a project site from a subdirectory, so
the export sets `basePath` to `/home-by-five-site` and writes a `.nojekyll` marker
(without it Pages runs the output through Jekyll, which strips every underscore
directory and takes all of `_next/` with it). `site.url` follows the build target via
`NEXT_PUBLIC_SITE_URL`, so canonicals, sitemap and robots stay correct on both.

Deploying from a local build rather than GitHub Actions is deliberate: it needs no
`workflow` token scope and no CI minutes. `npm run build` is untouched and still
produces a normal server build for a real host.

Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4.
No UI kit, no animation library, no icon package. Nothing was added that the design
did not need.

---

## Routes

All 37 pages prerender statically.

| Route | What it is |
| --- | --- |
| `/` | Homepage |
| `/how-it-works` | Process and operating model |
| `/location-growth-blueprint` | The $150/location product in full |
| `/services` | Service catalog with every unit and price |
| `/packages` | Interactive package builder |
| `/franchises` | For franchisors and multi-location brands |
| `/franchisees` | For individual franchise owners |
| `/local-business` | For independent local service businesses |
| `/automation` | Cost-saving automation service |
| `/markets` | International markets overview |
| `/markets/[market]` | 19 market pages, one template, per-market content |
| `/about` | Philosophy and the pod model |
| `/contact` | Lead form |
| `/resources` | Structure ready for articles; no CMS assumed |
| `/sitemap.xml`, `/robots.txt` | Generated from config |

Market routes: `united-states`, `canada`, `united-kingdom`, `australia`,
`new-zealand`, `spain`, `italy`, `france`, `netherlands`, `germany`, `greece`,
`macedonia`, `serbia`, `albania`, `kosovo`, `croatia`, `bulgaria`, `hungary`,
`romania`.

---

## Where to change things

### Prices

**`src/config/services.ts`** is the only place a price is written. Twelve categories,
every unit carrying its price, what it includes, how it bills, and which builder
module switches it on. Change a number there and the services page, the package
builder and every market page update together.

**`src/lib/pricing.ts`** holds the commercial rules rather than the numbers:

- `BLUEPRINT` — $150 per location, one working day each. Strictly linear, no volume discount.
- `NETWORK_DISCOUNTS` — the recurring network rate by location count. Applies to monthly work only.
- `AUTOMATION_SAVINGS_SHARE` — the share of measured first-year savings an automation build may carry. Configured, not hardcoded into any component.
- `BUILDER_MODULES` — which modules exist, and the quantity controls inside each.

The calculator itself (`computePackage`) is plain TypeScript with no React in it, so
pricing logic can be changed and tested without touching a component.

> **The catalog prices are working figures, not a signed price list.** They were set to
> be internally consistent and plausible. Review them before the site goes live.

### Markets and localization

**`src/config/markets.ts`** — the commercial and technical config per market: code,
slug, locale, currency, target languages, spelling notes, localized slug, enabled
state, and optional per-market CTA and price overrides.

**`src/config/market-content.ts`** — the editorial copy per market, keyed by market
code. Hero, who we serve, three genuinely local challenges, blueprint note, local
search / paid / social / GEO considerations, deliverables, regions, language note.

Adding a twentieth market is an entry in each file. No component changes, and it
appears in the nav, footer, sitemap, package builder and markets index automatically.
A market with no entry in `market-content.ts` returns 404 rather than rendering a thin
page.

**Localization state:** every market page is published in **English**. Markets flagged
`translation-pending` need their content rewritten in language by a native writer, in
`market-content.ts`, keyed by the same code. The architecture is ready:
localization-ready routing, `localizedSlug` reserved per market, hreflang wired through
each page's `alternates` with global English as `x-default`, currency and terminology
in config, no machine translation shown to users, and no IP-based forced redirects.

Only the **United States** displays local currency, because USD is the base currency.
Every other market shows USD and says why. `displayLocalCurrency` and `fxRateFromBase`
exist per market but were deliberately left off rather than filled with invented rates.
Set them from a real rate source or a signed-off local price sheet.

### Copy and content

- `src/config/site.ts` — name, nav, footer, contact, base currency
- `src/config/faq.ts` — every FAQ, tagged by which pages it appears on
- `src/config/photography.ts` — photography slots

---

## What is deliberately not finished

### Photography — all 12 slots are placeholders

`src/config/photography.ts` defines twelve slots. Every one renders an art-directed
placeholder stating the shot it stands in for. **No stock images were wired in.** The
brief bans posed studio work, luxury interiors and the single-culture nuclear-family
cliche, and unvetted stock lands on all three. Each slot carries the shot it needs and
sourcing direction. Set `src` on a slot to drop a real image in; if it is remote, add
the host to `next.config.ts`.

### Lead form — no backend

`src/lib/leads.ts` validates the payload and returns a result so the form works end to
end, but **nothing is transmitted**. Replace `deliverLead` with a route handler, HubSpot
Forms, Pipedrive, or a transactional email send. Keep `LeadPayload` stable: the form,
the package builder hand-off and any CRM mapping all key off it.

### Testimonials — empty frames

`TestimonialPlaceholder` renders empty frames rather than invented praise. Replace with
real attributed quotes.

### Sample report figures

The report mockup on `/`, `/how-it-works` and `/franchises` is labelled
"Illustrative figures" in the UI. It is a layout, not a result. Do not swap in real
client numbers without permission.

### Domain

`site.url` in `src/config/site.ts` is `https://homebyfive.com`. It drives canonicals,
sitemap, hreflang and OpenGraph. Set it before launch. `site.email` is a placeholder too.

---

## Needs a decision before launch

1. **Bulgaria's currency.** The brief specified BGN with euro transition handled in
   config. Bulgaria is configured as **EUR** with `formerCurrency: "BGN"` and a note,
   because publishing a currency that may be stale is worse than flagging it. Confirm
   the current position and any dual-display requirement; switching is a one-line change
   in `src/config/markets.ts`.
2. **The catalog prices**, as above.
3. **Homepage headline A/B.** The brief flagged an alternative worth testing. It is
   kept as a comment directly above the `h1` in `src/components/Hero.tsx`. Swap the two
   to run it.

---

## Verified

- `npm run build` clean, 37 static pages
- `npx tsc --noEmit` clean, `npx eslint .` clean
- All 35 internal links resolve 200; unknown routes 404
- No horizontal overflow at 375px, 768px or 1280px on any route
- Zero console errors across all routes
- One `h1` per page, meta description on every page, canonical on every page, no image missing alt text
- Package builder: module toggles, tier and quantity controls, network rate, localStorage persistence, and shareable URL state round-trip
- Contact form prefills from a package link and submits

The package builder reproduces the brief's worked example exactly: 30 locations in the
USA at 1 link and 1×2,000-word article per location gives 30 links, 60,000 words,
120 GBP posts, and a $4,500 blueprint.
