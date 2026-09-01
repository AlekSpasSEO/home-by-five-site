import type { ReactNode } from "react";

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
  detail?: string[];
}

export function ProcessSteps({
  steps,
  invert = false,
}: {
  steps: ProcessStep[];
  invert?: boolean;
}) {
  return (
    <ol
      className={`mt-12 border-t ${invert ? "border-cream/20" : "border-rule"}`}
    >
      {steps.map((step) => (
        <li
          key={step.n}
          className={`grid gap-4 border-b py-8 sm:grid-cols-[auto_1fr] sm:gap-10 ${
            invert ? "border-cream/20" : "border-rule"
          }`}
        >
          <span className="u-label u-tnum text-flag sm:w-16 sm:pt-1">
            {step.n}
          </span>
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <h3
                className={`u-display text-2xl ${
                  invert ? "text-cream" : "text-ink"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-3 max-w-md text-[0.9375rem] leading-relaxed ${
                  invert ? "text-cream/65" : "text-ink-soft"
                }`}
              >
                {step.body}
              </p>
            </div>
            {step.detail ? (
              <ul className="space-y-1.5 lg:pt-1">
                {step.detail.map((d) => (
                  <li
                    key={d}
                    className={`text-[0.8125rem] ${
                      invert ? "text-cream/45" : "text-ink-mute"
                    }`}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Three-column comparison used for "then choose who executes it". */
export function ComparisonSection({
  columns,
  invert = false,
}: {
  columns: { title: string; body: string; note?: string; highlight?: boolean }[];
  invert?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`mt-12 grid gap-px border ${
        invert ? "border-cream/20 bg-cream/20" : "border-rule bg-rule"
      } lg:grid-cols-3`}
    >
      {columns.map((column) => (
        <div
          key={column.title}
          className={`p-7 ${
            column.highlight
              ? "bg-ink text-cream"
              : invert
                ? "bg-ink"
                : "bg-paper"
          }`}
        >
          <h3
            className={`u-display text-xl uppercase tracking-wide ${
              column.highlight || invert ? "text-cream" : "text-ink"
            }`}
          >
            {column.title}
          </h3>
          <p
            className={`mt-4 text-[0.9375rem] leading-relaxed ${
              column.highlight || invert ? "text-cream/70" : "text-ink-soft"
            }`}
          >
            {column.body}
          </p>
          {column.note ? (
            <p
              className={`u-label mt-5 ${
                column.highlight || invert ? "text-cream/40" : "text-ink-faint"
              }`}
            >
              {column.note}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
