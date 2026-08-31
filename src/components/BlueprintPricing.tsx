import { BLUEPRINT, formatMoney, formatNumber } from "@/lib/pricing";
import { CTAButton, Eyebrow } from "@/components/ui";

const EXAMPLE_COUNTS = [1, 10, 30, 100, 200];

/** The nine sections every blueprint is delivered in. */
export const BLUEPRINT_PAGES = [
  { n: "01", label: "Market" },
  { n: "02", label: "Customer" },
  { n: "03", label: "Competition" },
  { n: "04", label: "Search" },
  { n: "05", label: "Paid" },
  { n: "06", label: "Social" },
  { n: "07", label: "Conversion" },
  { n: "08", label: "Technology" },
  { n: "09", label: "90-Day Plan" },
];

export function BlueprintPricing({
  compact = false,
  showCta = true,
}: {
  compact?: boolean;
  showCta?: boolean;
}) {
  return (
    <div className="border border-ink bg-paper">
      <div className="border-b border-rule p-6 sm:p-8">
        <Eyebrow tone="accent">Phase 1</Eyebrow>
        <p className="u-display mt-4 text-5xl sm:text-6xl">
          {formatMoney(BLUEPRINT.pricePerLocation)}
          <span className="u-display ml-2 align-middle text-xl text-ink-mute">
            per location
          </span>
        </p>
        <p className="u-label mt-4">
          {BLUEPRINT.workingDaysPerLocation} working day of analysis per location
        </p>
      </div>

      <div className="border-b border-rule">
        <table className="w-full text-left">
          <caption className="sr-only">Blueprint price by number of locations</caption>
          <thead>
            <tr className="u-label border-b border-rule">
              <th scope="col" className="px-6 py-3 font-medium sm:px-8">
                Locations
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium sm:px-8">
                One-time
              </th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLE_COUNTS.map((count) => (
              <tr key={count} className="border-b border-rule last:border-b-0">
                <td className="u-tnum px-6 py-3 text-[0.9375rem] text-ink-soft sm:px-8">
                  {formatNumber(count)}
                  {count === 200 ? "+" : ""}
                </td>
                <td className="u-tnum px-6 py-3 text-right text-[0.9375rem] font-medium text-ink sm:px-8">
                  {formatMoney(BLUEPRINT.pricePerLocation * count)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!compact ? (
        <div className="border-b border-rule p-6 sm:p-8">
          <p className="u-label mb-4">What you get, per location</p>
          <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-3">
            {BLUEPRINT_PAGES.map((page) => (
              <li
                key={page.n}
                className="flex items-baseline gap-3 border-b border-rule py-2 last:border-b-0 sm:border-b-0"
              >
                <span className="u-label u-tnum text-accent">{page.n}</span>
                <span className="text-[0.9375rem] text-ink-soft">{page.label}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="p-6 sm:p-8">
        <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
          No obligation to continue. The strategy belongs to you whether or not
          you keep working with us.
        </p>
        {showCta ? (
          <div className="mt-6">
            <CTAButton href="/contact?intent=blueprint" variant="accent">
              Start my blueprint
            </CTAButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}
