import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/config/services";

/**
 * Compact category grid used on the homepage and audience pages.
 *
 * Deliberately short on prose. Each cell names the category and gives one hard
 * example of what actually gets delivered.
 */
const CATEGORY_EXAMPLES: Record<string, string> = {
  "local-seo": "Profile rebuilt, listings corrected, posts published monthly",
  authority: "Named placements by authority tier, approved before spend",
  content: "Researched articles, published, with metadata and internal links",
  pages: "Location and service pages built from real local data",
  geo: "Query-set monitoring across AI answers, with the gaps named",
  paid: "Campaigns restructured, negatives managed, conversions reconciled",
  social: "Network creative, localized per location, published on schedule",
  photography: "25 to 200+ edited images of your actual locations",
  pr: "Stories built to be picked up, not pages built to rank",
  reporting: "Spend, leads, booked jobs and cost per acquisition, monthly",
  strategy: "A monthly working session with the people running the account",
  automation: "Repetitive operational work costed, then removed",
};

export function ServiceGrid({
  columns = 3,
  linked = true,
}: {
  columns?: 2 | 3 | 4;
  linked?: boolean;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  } as const;

  return (
    <div className={`mt-12 grid gap-px border border-rule bg-rule ${cols[columns]}`}>
      {SERVICE_CATEGORIES.map((category) => {
        const body = (
          <>
            <h3 className="u-display text-xl text-ink">{category.label}</h3>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-mute">
              {CATEGORY_EXAMPLES[category.id] ?? category.summary}
            </p>
            <p className="u-label u-tnum mt-5 text-ink-faint">
              {category.units.length} unit
              {category.units.length === 1 ? "" : "s"}
            </p>
          </>
        );

        return linked ? (
          <Link
            key={category.id}
            href={`/services#${category.id}`}
            className="group bg-paper p-6 transition-colors hover:bg-bone-deep"
          >
            {body}
          </Link>
        ) : (
          <div key={category.id} className="bg-paper p-6">
            {body}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Full catalog listing with prices. Used on the services page.
 */
export function ServiceCatalog({
  formatPrice,
}: {
  formatPrice: (price: number | null, scale: string) => string;
}) {
  return (
    <div className="mt-12 space-y-16">
      {SERVICE_CATEGORIES.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-24">
          <div className="border-b border-ink pb-5">
            <h2 className="u-display text-3xl sm:text-4xl">{category.label}</h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
              {category.summary}
            </p>
          </div>

          <div className="divide-y divide-rule border-b border-rule">
            {category.units.map((unit) => (
              <article key={unit.id} className="grid gap-6 py-7 lg:grid-cols-[1.4fr_1fr_auto]">
                <div>
                  <h3 className="text-[1.0625rem] font-medium text-ink">
                    {unit.label}
                  </h3>
                  <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
                    {unit.summary}
                  </p>
                  {unit.note ? (
                    <p className="mt-3 max-w-md border-l-2 border-rule-strong pl-3 text-[0.8125rem] leading-relaxed text-ink-mute">
                      {unit.note}
                    </p>
                  ) : null}
                  {unit.approvalRequired ? (
                    <p className="u-label mt-3 text-accent">Approved individually</p>
                  ) : null}
                </div>

                <ul className="space-y-1.5">
                  {unit.includes.map((line) => (
                    <li key={line} className="text-[0.8125rem] text-ink-mute">
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="lg:min-w-40 lg:text-right">
                  <p className="u-display u-tnum text-2xl text-ink">
                    {formatPrice(unit.price, unit.scale)}
                  </p>
                  <p className="u-label mt-2">{scaleLabel(unit.scale)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function scaleLabel(scale: string): string {
  switch (scale) {
    case "per-location-month":
      return "per location, per month";
    case "per-unit-location-month":
      return "each, per location";
    case "per-unit-network-month":
      return "each";
    case "per-network-month":
      return "per month, network-wide";
    case "one-time-location":
      return "one-time, per location";
    case "one-time-network":
      return "one-time, network-wide";
    case "included":
      return "included with monthly packages";
    case "quote":
      return "scoped separately";
    default:
      return "";
  }
}
