import Link from "next/link";
import { marketsByRegion } from "@/config/markets";

export function InternationalMarketsGrid({
  invert = false,
  showBlurb = true,
}: {
  invert?: boolean;
  showBlurb?: boolean;
}) {
  const regions = marketsByRegion();

  return (
    <div
      className={`grid gap-px border ${
        invert ? "border-bone/20 bg-bone/20" : "border-rule bg-rule"
      } sm:grid-cols-2 lg:grid-cols-4`}
    >
      {regions.map(({ region, markets }) => (
        <div
          key={region.id}
          className={`p-6 ${invert ? "bg-ink" : "bg-paper"}`}
        >
          <h3
            className={`u-display text-lg ${invert ? "text-bone" : "text-ink"}`}
          >
            {region.label}
          </h3>
          {showBlurb ? (
            <p
              className={`mt-2 text-[0.8125rem] leading-relaxed ${
                invert ? "text-bone/50" : "text-ink-mute"
              }`}
            >
              {region.blurb}
            </p>
          ) : null}
          <ul className="mt-5 space-y-2">
            {markets.map((market) => (
              <li key={market.code}>
                <Link
                  href={`/markets/${market.slug}`}
                  className={`group flex items-baseline justify-between gap-3 border-b py-1.5 text-[0.9375rem] transition-colors ${
                    invert
                      ? "border-bone/10 text-bone/75 hover:text-accent"
                      : "border-rule text-ink-soft hover:text-accent"
                  }`}
                >
                  <span>{market.name}</span>
                  <span
                    className={`u-label ${
                      invert ? "text-bone/30" : "text-ink-faint"
                    }`}
                  >
                    {market.currency}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
