import { Eyebrow } from "@/components/ui";

/**
 * Sample monthly report.
 *
 * Every figure below is illustrative and labelled as such. It is a layout, not
 * a result. Do not swap these for real client numbers without permission and
 * attribution.
 */
const PRIMARY = [
  { label: "Spend", value: "$18,400", trend: "Media + management" },
  { label: "Leads", value: "612", trend: "Calls, forms and chats" },
  { label: "Bookings", value: "241", trend: "Confirmed jobs" },
  { label: "Revenue", value: "$96,300", trend: "Attributed" },
  { label: "CAC", value: "$76", trend: "Per acquired customer" },
];

const DELIVERED = [
  { label: "Links placed", value: "30" },
  { label: "Words published", value: "60,000" },
  { label: "Pages improved", value: "30" },
  { label: "GBP posts", value: "120" },
  { label: "Social posts", value: "240" },
  { label: "Campaigns optimised", value: "12" },
];

/** Twelve illustrative months, as a proportion of the tallest bar. */
const TREND = [38, 42, 40, 47, 52, 49, 58, 63, 61, 70, 74, 81];

export function ROIReportMockup() {
  return (
    <div className="border border-ink bg-paper">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule px-6 py-4 sm:px-8">
        <Eyebrow>Sample monthly report</Eyebrow>
        <p className="u-label text-ink-faint">Illustrative figures</p>
      </div>

      <div className="grid gap-px border-b border-rule bg-rule sm:grid-cols-3 lg:grid-cols-5">
        {PRIMARY.map((metric) => (
          <div key={metric.label} className="bg-paper p-5">
            <p className="u-label">{metric.label}</p>
            <p className="u-display u-tnum mt-2 text-2xl text-ink">
              {metric.value}
            </p>
            <p className="mt-1.5 text-[0.75rem] text-ink-mute">{metric.trend}</p>
          </div>
        ))}
      </div>

      <div className="border-b border-rule px-6 py-6 sm:px-8">
        <p className="u-label mb-4">Bookings, trailing twelve months</p>
        <svg
          viewBox="0 0 240 60"
          className="h-20 w-full"
          role="img"
          aria-label="Illustrative bar chart showing bookings rising over twelve months"
        >
          {TREND.map((value, i) => {
            const height = (value / 100) * 52;
            return (
              <rect
                key={i}
                x={i * 20 + 2}
                y={56 - height}
                width="12"
                height={height}
                fill={
                  i >= TREND.length - 3
                    ? "var(--color-flag)"
                    : "var(--color-blue)"
                }
                opacity={i >= TREND.length - 3 ? 1 : 0.45}
              />
            );
          })}
          <line
            x1="0"
            y1="56.5"
            x2="240"
            y2="56.5"
            stroke="var(--color-rule-strong)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="px-6 py-6 sm:px-8">
        <p className="u-label mb-4">Delivered this month</p>
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERED.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-4 border-b border-rule pb-2"
            >
              <dt className="text-[0.875rem] text-ink-soft">{item.label}</dt>
              <dd className="u-tnum text-[0.875rem] font-medium text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
