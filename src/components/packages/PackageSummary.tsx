"use client";

import { useState } from "react";
import Link from "next/link";
import {
  formatMoney,
  formatNumber,
  packageSummaryText,
  encodeConfig,
  MAX_LOCATIONS,
  NETWORK_PRICING_THRESHOLD,
  type PackageConfig,
  type PackageResult,
} from "@/lib/pricing";
import { getMarket } from "@/config/markets";

/**
 * Step 4: show the package.
 *
 * Deliverables first, then money. An owner recognises "30 backlinks and 60,000
 * words" faster than a line-item table, so the counts lead.
 */
export function PackageSummary({
  config,
  result,
}: {
  config: PackageConfig;
  result: PackageResult;
}) {
  const [copied, setCopied] = useState(false);
  const monthlyDeliverables = result.deliverables.filter((d) => d.cadence === "monthly");
  const oneTimeDeliverables = result.deliverables.filter((d) => d.cadence === "one-time");
  const empty = result.monthly === 0 && result.oneTime === 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(packageSummaryText(config, result));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="border border-ink bg-paper">
      <div className="border-b border-rule px-6 py-5">
        <p className="u-display u-tnum text-3xl text-ink">
          {formatNumber(config.locations)}
          {config.locations >= MAX_LOCATIONS ? "+" : ""}{" "}
          <span className="text-xl text-ink-mute">
            {config.locations === 1 ? "location" : "locations"}
          </span>
        </p>
        <p className="u-label mt-2">
          {config.markets.map((c) => getMarket(c).name).join(" / ")}
        </p>
      </div>

      {empty ? (
        <div className="px-6 py-8">
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
            Nothing selected yet. Turn on the modules you want above and the
            package builds itself here.
          </p>
        </div>
      ) : (
        <>
          {monthlyDeliverables.length ? (
            <div className="border-b border-rule px-6 py-5">
              <p className="u-label mb-3">Each month</p>
              <ul className="space-y-2">
                {monthlyDeliverables.map((d) => (
                  <li
                    key={d.label}
                    className="flex items-baseline justify-between gap-4 border-b border-rule pb-1.5 last:border-b-0"
                  >
                    <span className="text-[0.875rem] text-ink-soft">{d.label}</span>
                    <span className="u-tnum text-[0.875rem] font-medium text-ink">
                      {formatNumber(d.value)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {oneTimeDeliverables.length ? (
            <div className="border-b border-rule px-6 py-5">
              <p className="u-label mb-3">One-time</p>
              <ul className="space-y-2">
                {oneTimeDeliverables.map((d) => (
                  <li
                    key={d.label}
                    className="flex items-baseline justify-between gap-4 border-b border-rule pb-1.5 last:border-b-0"
                  >
                    <span className="text-[0.875rem] text-ink-soft">{d.label}</span>
                    <span className="u-tnum text-[0.875rem] font-medium text-ink">
                      {formatNumber(d.value)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {result.includedItems.length ? (
            <div className="border-b border-rule px-6 py-5">
              <p className="u-label mb-3">Included</p>
              <ul className="space-y-1.5">
                {result.includedItems.map((item) => (
                  <li key={item.unitId} className="text-[0.8125rem] text-ink-mute">
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="border-b border-rule px-6 py-5">
            {result.discountAmount > 0 ? (
              <div className="mb-3 flex items-baseline justify-between gap-4 text-[0.8125rem] text-ink-mute">
                <span>
                  Network rate, {Math.round(result.discountRate * 100)}% off
                </span>
                <span className="u-tnum">
                  &minus;{formatMoney(result.discountAmount, result.pricingMarket)}
                </span>
              </div>
            ) : null}

            <p className="u-label">Monthly price</p>
            <p className="u-display u-tnum mt-1 text-4xl text-ink">
              {formatMoney(result.monthly, result.pricingMarket)}
            </p>

            {result.oneTime > 0 ? (
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="u-label">One-time setup</span>
                <span className="u-tnum text-[0.9375rem] font-medium text-ink">
                  {formatMoney(result.oneTime, result.pricingMarket)}
                </span>
              </div>
            ) : null}

            <div className="mt-3 flex items-baseline justify-between gap-4">
              <span className="u-label">Location Growth Blueprint</span>
              <span className="u-tnum text-[0.9375rem] font-medium text-ink">
                {formatMoney(result.blueprint, result.pricingMarket)}
              </span>
            </div>
          </div>
        </>
      )}

      <div className="space-y-3 border-b border-rule px-6 py-5 text-[0.8125rem] leading-relaxed text-ink-mute">
        <p className="border-l-2 border-flag pl-3 text-ink-soft">
          Indicative package. Final scope is confirmed after your Location Growth
          Blueprint.
        </p>
        {result.hasAdSpend ? (
          <p className="border border-rule-strong bg-sky px-3 py-2 font-medium text-ink">
            Ad spend is separate. You pay the platforms directly.
          </p>
        ) : null}
        {result.needsApproval ? (
          <p>
            Some selected placements are approved individually before any spend.
          </p>
        ) : null}
        {result.quoteOnlyItems.length ? (
          <p>
            Scoped separately:{" "}
            {result.quoteOnlyItems.map((i) => i.label).join(", ")}.
          </p>
        ) : null}
        {result.multiMarket ? (
          <p>
            Multiple markets selected. Prices are shown in the base catalog
            currency until a local price sheet is agreed per market.
          </p>
        ) : null}
        {result.networkPricingRecommended ? (
          <p className="font-medium text-ink">
            At {NETWORK_PRICING_THRESHOLD}+ locations, talk to us about network
            pricing rather than trusting a calculator.
          </p>
        ) : null}
      </div>

      <div className="space-y-3 px-6 py-6">
        <Link
          href={`/contact?intent=blueprint&${encodeConfig(config)}`}
          className="flex w-full items-center justify-center bg-flag px-5 py-3.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] text-cream transition-colors hover:bg-flag-deep"
        >
          Build my location blueprint
        </Link>
        <Link
          href={`/contact?intent=numbers&${encodeConfig(config)}`}
          className="flex w-full items-center justify-center border border-rule-strong px-5 py-3.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
        >
          Talk through the numbers
        </Link>
        <button
          type="button"
          onClick={copy}
          className="w-full py-2 text-center font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-ink-mute underline decoration-rule-strong underline-offset-4 transition-colors hover:text-flag"
        >
          {copied ? "Summary copied" : "Copy package summary"}
        </button>
      </div>
    </div>
  );
}
