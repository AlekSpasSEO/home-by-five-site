"use client";

import { marketsByRegion, getMarket } from "@/config/markets";

/**
 * Step 0: where are your locations?
 *
 * Multi-select, because a franchise network can span countries. The list is
 * generated from config, so a new market appears here automatically.
 */
export function MarketSelector({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (codes: string[]) => void;
}) {
  const regions = marketsByRegion();

  const toggle = (code: string) => {
    if (selected.includes(code)) {
      // Never allow an empty selection: the calculator has to price in something.
      if (selected.length === 1) return;
      onChange(selected.filter((c) => c !== code));
    } else {
      onChange([...selected, code]);
    }
  };

  return (
    <fieldset>
      <legend className="sr-only">Select the markets your locations are in</legend>
      <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {regions.map(({ region, markets }) => (
          <div key={region.id} className="bg-paper p-5">
            <p className="u-label mb-3">{region.label}</p>
            <ul className="space-y-1">
              {markets.map((market) => {
                const active = selected.includes(market.code);
                return (
                  <li key={market.code}>
                    <label
                      className={`flex cursor-pointer items-center gap-2.5 py-1.5 text-[0.875rem] transition-colors ${
                        active ? "text-ink" : "text-ink-mute hover:text-ink"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggle(market.code)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden
                        className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                          active
                            ? "border-accent bg-accent"
                            : "border-rule-strong bg-transparent"
                        }`}
                      >
                        {active ? (
                          <span className="block h-1.5 w-1.5 bg-bone" />
                        ) : null}
                      </span>
                      {market.name}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[0.8125rem] text-ink-mute">
        {selected.length === 1
          ? `Pricing shown for ${getMarket(selected[0]).name}.`
          : `${selected.length} markets selected. Prices are shown in the base catalog currency until a local price sheet is agreed for each market.`}
      </p>
    </fieldset>
  );
}
