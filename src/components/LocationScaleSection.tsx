import { formatMoney, BLUEPRINT } from "@/lib/pricing";

const SCALES = [
  {
    count: "1",
    label: "Location",
    who: "Independent business",
    note: "One owner, one market, one set of numbers to move.",
  },
  {
    count: "10",
    label: "Locations",
    who: "Regional operator",
    note: "The point where inconsistency between locations starts costing real money.",
  },
  {
    count: "30",
    label: "Locations",
    who: "Growing franchise",
    note: "Central standards, uneven participation, and a reporting problem.",
  },
  {
    count: "100",
    label: "Locations",
    who: "National network",
    note: "Production volume becomes the constraint before strategy does.",
  },
  {
    count: "200+",
    label: "Locations",
    who: "International or enterprise network",
    note: "Multiple countries, multiple languages, one operating model.",
  },
];

export function LocationScaleSection({ invert = false }: { invert?: boolean }) {
  return (
    <div>
      <div
        className={`grid gap-px border ${
          invert ? "border-bone/20 bg-bone/20" : "border-rule bg-rule"
        } sm:grid-cols-2 lg:grid-cols-5`}
      >
        {SCALES.map((scale) => (
          <div
            key={scale.count}
            className={`p-6 ${invert ? "bg-ink" : "bg-paper"}`}
          >
            <p
              className={`u-display u-tnum text-4xl ${
                invert ? "text-bone" : "text-ink"
              }`}
            >
              {scale.count}
            </p>
            <p className={`u-label mt-1 ${invert ? "text-bone/50" : ""}`}>
              {scale.label}
            </p>
            <p
              className={`mt-5 text-[0.9375rem] font-medium ${
                invert ? "text-bone/90" : "text-ink"
              }`}
            >
              {scale.who}
            </p>
            <p
              className={`mt-2 text-[0.8125rem] leading-relaxed ${
                invert ? "text-bone/55" : "text-ink-mute"
              }`}
            >
              {scale.note}
            </p>
          </div>
        ))}
      </div>

      <p
        className={`mt-8 max-w-2xl text-lg leading-relaxed ${
          invert ? "text-bone/75" : "text-ink-soft"
        }`}
      >
        Your marketing structure should not collapse every time you open another
        city, or another country. The blueprint stays{" "}
        {formatMoney(BLUEPRINT.pricePerLocation)} per location whether you run
        one or two hundred.
      </p>
    </div>
  );
}
