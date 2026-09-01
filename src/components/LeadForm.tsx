"use client";

import { useEffect, useState } from "react";
import {
  BUSINESS_TYPES,
  PRIMARY_INTERESTS,
  submitLead,
  type BusinessType,
  type LeadPayload,
  type PrimaryInterest,
} from "@/lib/leads";
import { enabledMarkets, getMarket } from "@/config/markets";
import { decodeConfig, computePackage, formatMoney, formatNumber } from "@/lib/pricing";

const field =
  "w-full border border-rule-strong bg-paper px-3.5 py-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-flag";
const labelCls = "u-label mb-2 block";

export function LeadForm() {
  const markets = enabledMarkets();

  const [form, setForm] = useState({
    name: "",
    company: "",
    website: "",
    email: "",
    phone: "",
    primaryMarket: "USA",
    additionalMarkets: [] as string[],
    businessType: "multi-location" as BusinessType,
    locations: 1,
    primaryInterest: "blueprint" as PrimaryInterest,
    message: "",
  });

  const [packageConfig, setPackageConfig] = useState<string | undefined>();
  const [packageSummary, setPackageSummary] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  /*
    Prefill from the package builder or a market page. Read once, after mount.

    set-state-in-effect is disabled for the same reason as in the package
    builder: the query string is browser-only, so reading it in the useState
    initializer would make the server and client render different markup.
  */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const intent = params.get("intent");
    const intentMap: Record<string, PrimaryInterest> = {
      blueprint: "blueprint",
      numbers: "full-execution",
      automation: "automation",
    };

    const marketsParam = params.get("markets");
    const codes = marketsParam
      ? marketsParam.split(",").map((c) => c.trim().toUpperCase()).filter(Boolean)
      : [];

    setForm((prev) => ({
      ...prev,
      primaryInterest: (intent && intentMap[intent]) || prev.primaryInterest,
      primaryMarket: codes[0] ?? prev.primaryMarket,
      additionalMarkets: codes.slice(1),
      locations: Number(params.get("locations")) || prev.locations,
    }));

    if (params.has("locations") && params.has("m")) {
      setPackageConfig(params.toString());
      const config = decodeConfig(params);
      const result = computePackage(config);
      setPackageSummary(
        `${formatNumber(config.locations)} location${config.locations === 1 ? "" : "s"} in ${config.markets
          .map((c) => getMarket(c).name)
          .join(", ")}. Monthly ${formatMoney(result.monthly, result.pricingMarket)}, blueprint ${formatMoney(result.blueprint, result.pricingMarket)}.`,
      );
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setState("sending");

    const payload: LeadPayload = {
      ...form,
      phone: form.phone || undefined,
      packageConfig,
      source: typeof window === "undefined" ? "unknown" : window.location.pathname,
    };

    const result = await submitLead(payload);
    if (result.ok) {
      setState("sent");
    } else {
      setState("idle");
      setError(result.error ?? "Something went wrong.");
    }
  };

  if (state === "sent") {
    return (
      <div className="border border-ink bg-paper p-8">
        <p className="u-label text-flag">Received</p>
        <h2 className="u-display mt-4 text-3xl text-ink">
          Thanks. We&apos;ll come back to you with a date, not a discovery call.
        </h2>
        <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">
          You&apos;ll hear from a person who has already looked at your website
          and your local results. If it turns out we are not the right fit, we
          will say that instead of booking a meeting to say it.
        </p>
        {/* TODO: no backend is connected. Nothing was actually transmitted. */}
        <p className="u-label mt-8 text-ink-faint">
          Note for the build: no backend is wired up yet, so this submission was
          not transmitted.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-rule bg-paper p-6 sm:p-8">
      {packageSummary ? (
        <div className="mb-8 border border-flag bg-flag-wash p-4">
          <p className="u-label text-flag">From your package</p>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
            {packageSummary}
          </p>
          <p className="mt-2 text-[0.75rem] text-ink-mute">
            Your full configuration comes through with this message.
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Company
          </label>
          <input
            id="company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="website" className={labelCls}>
            Website
          </label>
          <input
            id="website"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            placeholder="yourbusiness.com"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="primaryMarket" className={labelCls}>
            Primary market
          </label>
          <select
            id="primaryMarket"
            value={form.primaryMarket}
            onChange={(e) => setForm({ ...form, primaryMarket: e.target.value })}
            className={field}
          >
            {markets.map((market) => (
              <option key={market.code} value={market.code}>
                {market.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="locations" className={labelCls}>
            Number of locations
          </label>
          <input
            id="locations"
            type="number"
            min={1}
            value={form.locations}
            onChange={(e) =>
              setForm({ ...form, locations: Math.max(1, Number(e.target.value) || 1) })
            }
            className={`${field} u-tnum`}
          />
        </div>

        <div>
          <label htmlFor="businessType" className={labelCls}>
            Business type
          </label>
          <select
            id="businessType"
            value={form.businessType}
            onChange={(e) =>
              setForm({ ...form, businessType: e.target.value as BusinessType })
            }
            className={field}
          >
            {BUSINESS_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="primaryInterest" className={labelCls}>
            What you want first
          </label>
          <select
            id="primaryInterest"
            value={form.primaryInterest}
            onChange={(e) =>
              setForm({ ...form, primaryInterest: e.target.value as PrimaryInterest })
            }
            className={field}
          >
            {PRIMARY_INTERESTS.map((interest) => (
              <option key={interest.value} value={interest.value}>
                {interest.label}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={labelCls}>
            Additional markets{" "}
            <span className="normal-case tracking-normal">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {markets
              .filter((m) => m.code !== form.primaryMarket)
              .map((market) => {
                const active = form.additionalMarkets.includes(market.code);
                return (
                  <label
                    key={market.code}
                    className={`cursor-pointer border px-3 py-1.5 font-sans text-[0.6875rem] uppercase tracking-[0.06em] transition-colors ${
                      active
                        ? "border-flag bg-flag text-cream"
                        : "border-rule-strong text-ink-mute hover:border-ink"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() =>
                        setForm({
                          ...form,
                          additionalMarkets: active
                            ? form.additionalMarkets.filter((c) => c !== market.code)
                            : [...form.additionalMarkets, market.code],
                        })
                      }
                      className="sr-only"
                    />
                    {market.shortName}
                  </label>
                );
              })}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="What is the actual problem? Be blunt, it saves a call."
            className={field}
          />
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-6 border-l-2 border-flag pl-3 text-[0.875rem] text-ink">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-8 w-full bg-flag px-6 py-4 font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] text-cream transition-colors hover:bg-flag-deep disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Sending…" : "Send it"}
      </button>

      <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-mute">
        No newsletter, no drip sequence, no sales cadence. One person reads this
        and replies.
      </p>
    </form>
  );
}
