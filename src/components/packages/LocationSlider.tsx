"use client";

import {
  LOCATION_PRESETS,
  MAX_LOCATIONS,
  MIN_LOCATIONS,
  discountRateFor,
} from "@/lib/pricing";

/**
 * Step 1: how many locations are we working with?
 *
 * Slider plus typed input, because operators know their number and should not
 * have to drag to it.
 */
export function LocationSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const clamp = (n: number) =>
    Math.min(MAX_LOCATIONS, Math.max(MIN_LOCATIONS, Math.round(n || MIN_LOCATIONS)));
  const discount = discountRateFor(value);
  const atMax = value >= MAX_LOCATIONS;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <label htmlFor="locations-input" className="sr-only">
            Number of locations
          </label>
          <input
            id="locations-input"
            type="number"
            min={MIN_LOCATIONS}
            max={MAX_LOCATIONS}
            value={value}
            onChange={(e) => onChange(clamp(Number(e.target.value)))}
            className="u-display u-tnum w-32 border-b-2 border-ink bg-transparent pb-1 text-5xl text-ink outline-none focus:border-flag"
          />
          <span className="u-label">
            {atMax ? "locations or more" : value === 1 ? "location" : "locations"}
          </span>
        </div>

        {discount > 0 ? (
          <p className="u-label text-flag">
            Network rate applied: {Math.round(discount * 100)}% off monthly
          </p>
        ) : null}
      </div>

      <input
        type="range"
        min={MIN_LOCATIONS}
        max={MAX_LOCATIONS}
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        aria-label="Number of locations"
        className="u-range mt-8"
      />

      <div className="mt-5 flex flex-wrap gap-2">
        {LOCATION_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            aria-pressed={value === preset}
            className={`u-tnum border px-3.5 py-2 font-sans text-[0.75rem] transition-colors ${
              value === preset
                ? "border-ink bg-ink text-cream"
                : "border-rule-strong text-ink-soft hover:border-ink"
            }`}
          >
            {preset}
            {preset === MAX_LOCATIONS ? "+" : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
