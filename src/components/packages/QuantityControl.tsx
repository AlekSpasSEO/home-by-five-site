"use client";

import { useState } from "react";
import type { BuilderControl } from "@/lib/pricing";
import { getUnit } from "@/config/services";

/**
 * Step 3: quantities.
 *
 * A control is either a plain quantity or a tier plus a quantity. Presets are
 * buttons; "custom" reveals a number field rather than a second modal.
 */
export function QuantityControl({
  control,
  quantity,
  tierId,
  onQuantity,
  onTier,
}: {
  control: BuilderControl;
  quantity: number;
  tierId?: string;
  onQuantity: (n: number) => void;
  onTier: (unitId: string) => void;
}) {
  const [showCustom, setShowCustom] = useState(
    control.allowCustom && !control.options.includes(quantity),
  );

  const basisLabel =
    control.basis === "network"
      ? "Network-wide"
      : control.basis === "one-time-per-location"
        ? "One-time, per location"
        : control.basis === "one-time-network"
          ? "One-time, network-wide"
          : "Per location";

  return (
    <div className="border-b border-rule py-5 last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-[0.9375rem] font-medium text-ink">{control.label}</p>
        <p className="u-label text-ink-faint">{basisLabel}</p>
      </div>
      {control.help ? (
        <p className="mt-1 text-[0.8125rem] text-ink-mute">{control.help}</p>
      ) : null}

      {control.tiers ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {control.tiers.map((tier) => {
            const active = tierId === tier.unitId;
            const unit = getUnit(tier.unitId);
            return (
              <button
                key={tier.unitId}
                type="button"
                onClick={() => onTier(tier.unitId)}
                aria-pressed={active}
                title={unit?.label}
                className={`border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors ${
                  active
                    ? "border-accent bg-accent text-bone"
                    : "border-rule-strong text-ink-soft hover:border-ink"
                }`}
              >
                {tier.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {control.options.map((option) => {
          const active = !showCustom && quantity === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                setShowCustom(false);
                onQuantity(option);
              }}
              aria-pressed={active}
              className={`u-tnum min-w-11 border px-3 py-2 font-mono text-[0.75rem] transition-colors ${
                active
                  ? "border-ink bg-ink text-bone"
                  : "border-rule-strong text-ink-soft hover:border-ink"
              }`}
            >
              {control.options.length === 2 && control.options[1] === 1
                ? option === 1
                  ? "Yes"
                  : "No"
                : option}
            </button>
          );
        })}

        {control.allowCustom ? (
          showCustom ? (
            <input
              type="number"
              min={0}
              max={999}
              value={quantity}
              autoFocus
              aria-label={`${control.label}, custom quantity`}
              onChange={(e) =>
                onQuantity(Math.max(0, Math.min(999, Math.round(Number(e.target.value) || 0))))
              }
              className="u-tnum w-20 border border-ink bg-transparent px-3 py-2 font-mono text-[0.75rem] text-ink outline-none focus:border-accent"
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowCustom(true)}
              className="border border-rule-strong px-3 py-2 font-mono text-[0.75rem] text-ink-soft transition-colors hover:border-ink"
            >
              Custom
            </button>
          )
        ) : null}
      </div>
    </div>
  );
}
