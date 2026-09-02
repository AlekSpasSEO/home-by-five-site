"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BUILDER_MODULES,
  computePackage,
  decodeConfig,
  defaultPackageConfig,
  encodeConfig,
  formatMoney,
  type PackageConfig,
} from "@/lib/pricing";
import type { ModuleId } from "@/config/services";
import { MarketSelector } from "@/components/packages/MarketSelector";
import { LocationSlider } from "@/components/packages/LocationSlider";
import { QuantityControl } from "@/components/packages/QuantityControl";
import { PackageSummary } from "@/components/packages/PackageSummary";
import { Eyebrow } from "@/components/ui";

const STORAGE_KEY = "hbf-package-config-v1";

function Step({
  n,
  title,
  lede,
  children,
}: {
  n: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-rule pt-10">
      <div className="flex items-baseline gap-4">
        <span className="u-label u-tnum text-flag">{n}</span>
        <div>
          <h2 className="u-display text-2xl text-ink sm:text-3xl">{title}</h2>
          {lede ? (
            <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
              {lede}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}

export function PackageBuilder({
  initialMarket,
}: {
  /** Preselects a market, used by the market pages. */
  initialMarket?: string;
}) {
  const [config, setConfig] = useState<PackageConfig>(() => {
    const base = defaultPackageConfig();
    return initialMarket ? { ...base, markets: [initialMarket] } : base;
  });
  /*
    Deliberately state, not a ref.

    A ref flips synchronously, so the persist effect below would run in the same
    commit as the restore effect while `config` was still the default, and
    overwrite an incoming share link with default parameters before the restored
    values ever reached the URL. As state it stays false for that first pass and
    only turns true on the render that already carries the restored config.
  */
  const [hydrated, setHydrated] = useState(false);

  // Restore from the URL first, then from localStorage. Done after mount so the
  // server and client render the same thing on the first pass.
  //
  // Read straight from window.location rather than useSearchParams: the query
  // is only needed once, and useSearchParams would force this into a Suspense
  // boundary that never resolves on the client, leaving the whole builder
  // rendered but unhydrated.
  /*
    set-state-in-effect is disabled here deliberately. The URL and localStorage
    are browser-only, so they cannot be read in the useState initializer without
    the server and client rendering different markup and breaking hydration.
    Reading them once after mount is the correct sequence; it runs a single
    extra render on first paint and never again.
  */
  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const base = defaultPackageConfig();
    if (initialMarket) base.markets = [initialMarket];

    if (params.has("locations")) {
      setConfig(decodeConfig(params, base));
    } else {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) setConfig({ ...base, ...JSON.parse(stored) });
      } catch {
        // A corrupt or blocked store is not worth failing the page over.
      }
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  // Persist and make the configuration shareable.
  //
  // history.replaceState rather than router.replace: the URL is a share link,
  // not a navigation. Going through the router would re-run the Suspense
  // boundary on every slider tick and throw the builder's state away.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Private browsing, storage disabled. Not fatal.
    }
    /*
      window.location.pathname, not usePathname(). usePathname() returns the
      route without the deployment's basePath, so under a subdirectory deploy
      (GitHub Pages) writing it back would rewrite /home-by-five-site/packages/
      to /packages/ and the share link would 404. replaceState needs the real
      browser path.
    */
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${encodeConfig(config)}`,
    );
  }, [config, hydrated]);

  const result = useMemo(() => computePackage(config), [config]);

  const toggleModule = useCallback((id: ModuleId) => {
    setConfig((prev) => ({
      ...prev,
      modules: prev.modules.includes(id)
        ? prev.modules.filter((m) => m !== id)
        : [...prev.modules, id],
    }));
  }, []);

  const activeModules = BUILDER_MODULES.filter(
    (m) => config.modules.includes(m.id) && m.controls.length > 0,
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
      <div className="space-y-12">
        <Step
          n="00"
          title="Where are your locations?"
          lede="Select every market you operate in. Networks spanning countries can select more than one."
        >
          <MarketSelector
            selected={config.markets}
            onChange={(markets) => setConfig((prev) => ({ ...prev, markets }))}
          />
        </Step>

        <Step n="01" title="How many locations are we working with?">
          <LocationSlider
            value={config.locations}
            onChange={(locations) => setConfig((prev) => ({ ...prev, locations }))}
          />
        </Step>

        <Step
          n="02"
          title="What do you want us to run?"
          lede="Turn on only what you want. Everything you leave off stays with your team or your existing vendors."
        >
          <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {BUILDER_MODULES.map((mod) => {
              const active = config.modules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  aria-pressed={active}
                  className={`flex items-start gap-3 p-5 text-left transition-colors ${
                    active ? "bg-ink text-ice" : "bg-paper hover:bg-sky"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border ${
                      active ? "border-flag bg-flag" : "border-rule-strong"
                    }`}
                  >
                    {active ? <span className="block h-1.5 w-1.5 bg-ice" /> : null}
                  </span>
                  <span>
                    <span
                      className={`block text-[0.9375rem] font-medium ${
                        active ? "text-ice" : "text-ink"
                      }`}
                    >
                      {mod.label}
                    </span>
                    <span
                      className={`mt-1 block text-[0.8125rem] leading-snug ${
                        active ? "text-ice/60" : "text-ink-mute"
                      }`}
                    >
                      {mod.blurb}
                    </span>
                    {mod.flag && active ? (
                      <span className="u-label mt-2 block text-flag">
                        {mod.flag}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        {activeModules.length ? (
          <Step
            n="03"
            title="How much of it?"
            lede="Quantities are per location unless a control says otherwise."
          >
            <div className="space-y-10">
              {activeModules.map((mod) => (
                <div key={mod.id}>
                  <Eyebrow tone="accent">{mod.label}</Eyebrow>
                  <div className="mt-2 border-t border-rule">
                    {mod.controls.map((control) => (
                      <QuantityControl
                        key={control.id}
                        control={control}
                        quantity={config.quantities[control.id] ?? control.defaultValue}
                        tierId={config.tiers[control.id] ?? control.defaultTierId}
                        onQuantity={(n) =>
                          setConfig((prev) => ({
                            ...prev,
                            quantities: { ...prev.quantities, [control.id]: n },
                          }))
                        }
                        onTier={(unitId) =>
                          setConfig((prev) => ({
                            ...prev,
                            tiers: { ...prev.tiers, [control.id]: unitId },
                          }))
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Step>
        ) : null}

        <Step n="04" title="What it costs to run">
          <div className="border border-rule">
            <table className="w-full text-left">
              <caption className="sr-only">Package line items</caption>
              <thead>
                <tr className="u-label border-b border-rule bg-sky">
                  <th scope="col" className="px-4 py-3 font-medium">
                    Item
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Monthly
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    One-time
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.lineItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-[0.875rem] text-ink-mute"
                    >
                      Nothing selected yet.
                    </td>
                  </tr>
                ) : (
                  result.lineItems.map((item) => (
                    <tr key={item.unitId} className="border-b border-rule last:border-b-0">
                      <td className="px-4 py-3 text-[0.875rem] text-ink-soft">
                        {item.label}
                        {item.unitNoun && item.networkQuantity > 0 ? (
                          <span className="u-tnum ml-2 text-[0.75rem] text-ink-faint">
                            &times;{item.networkQuantity}
                          </span>
                        ) : null}
                      </td>
                      <td className="u-tnum px-4 py-3 text-right text-[0.875rem] text-ink">
                        {item.monthly > 0
                          ? formatMoney(item.monthly, result.pricingMarket)
                          : "—"}
                      </td>
                      <td className="u-tnum px-4 py-3 text-right text-[0.875rem] text-ink">
                        {item.oneTime > 0
                          ? formatMoney(item.oneTime, result.pricingMarket)
                          : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Step>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <PackageSummary config={config} result={result} />
      </aside>
    </div>
  );
}
