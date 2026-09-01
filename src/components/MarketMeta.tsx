import type { Market } from "@/config/markets";
import { site } from "@/config/site";

/**
 * How a market's money is shown.
 *
 * Deliberately does not convert. A market shows its own currency only when it
 * has been configured to and either is the base currency or carries a verified
 * rate. Until then it says what it is priced in and why, which is more use to a
 * buyer than an invented conversion.
 */
export function CurrencyDisplay({ market }: { market: Market }) {
  const isBase = market.currency === site.baseCurrency;
  const live = market.pricing.displayLocalCurrency;

  return (
    <div className="border border-rule bg-paper p-5">
      <p className="u-label">Pricing</p>
      <p className="u-display mt-3 text-2xl text-ink">
        {market.currencySymbol} {market.currency}
      </p>
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-mute">
        {live && isBase
          ? `Catalog prices are published in ${market.currency}.`
          : `Catalog prices are published in ${site.baseCurrency}. ${market.currency} pricing is confirmed per engagement rather than converted at a rate that moves.`}
      </p>
      {market.currencyNote ? (
        <p className="mt-3 border-l-2 border-flag pl-3 text-[0.8125rem] leading-relaxed text-ink-soft">
          {market.currencyNote}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Language and localization status for a market.
 *
 * TODO: this becomes a real language switcher once translated routes ship. The
 * localized slug is already carried in config so the route can be generated
 * without touching this component.
 */
export function LocaleSwitchPlaceholder({ market }: { market: Market }) {
  const pending = market.localization === "translation-pending";

  return (
    <div className="border border-rule bg-paper p-5">
      <p className="u-label">Language</p>
      <p className="u-display mt-3 text-2xl text-ink">
        {market.targetLanguages.join(", ")}
      </p>
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-mute">
        {pending
          ? "This page is published in English. Local-language production is a scoped workstream, written by native writers and human reviewed before publication."
          : "Published in English, which is the production language for this market."}
      </p>
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-mute">
        {market.spellingNotes}
      </p>
      {pending && market.localizedSlug ? (
        /* TODO: link to /{languageCode}/markets/{localizedSlug} once live. */
        <p className="u-label mt-4 text-ink-faint">
          Localized route reserved: /{market.localizedSlug}
        </p>
      ) : null}
    </div>
  );
}

/** Compact market facts, used in the market page sidebar. */
export function MarketFacts({ market }: { market: Market }) {
  const rows = [
    { label: "Market code", value: market.code },
    { label: "Locale", value: market.locale },
    { label: "Currency", value: `${market.currency} (${market.currencySymbol})` },
    { label: "Production language", value: market.language },
  ];

  return (
    <div className="border border-rule bg-paper">
      <p className="u-label border-b border-rule px-5 py-3">Market configuration</p>
      <dl className="divide-y divide-rule">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 px-5 py-3">
            <dt className="text-[0.8125rem] text-ink-mute">{row.label}</dt>
            <dd className="u-tnum text-[0.8125rem] font-medium text-ink">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
