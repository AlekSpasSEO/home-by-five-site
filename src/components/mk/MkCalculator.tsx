"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MK,
  MK_GROUPS,
  MK_INCLUDED,
  MK_SCALES,
  mkMoney,
  mkServicesByGroup,
  type MkService,
} from "@/config/mk";

/**
 * Package calculator for the Macedonian site.
 *
 * Deliberately simpler than the international builder: pick a scale, tick what
 * you want, see the monthly figure. The owner reading this wants a number and a
 * list, not a configuration exercise.
 */

const DEFAULT_SELECTED = ["objavi", "reklami-izrabotka", "reklami-menadzment", "lokalno-seo"];

export function MkCalculator() {
  const [scaleId, setScaleId] = useState(MK_SCALES[0].id);
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);

  const scale = MK_SCALES.find((s) => s.id === scaleId) ?? MK_SCALES[0];

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const result = useMemo(() => {
    const chosen: MkService[] = MK_GROUPS.flatMap((g) => mkServicesByGroup(g.id)).filter(
      (s) => selected.includes(s.id),
    );
    const monthlyRaw = chosen.reduce((sum, s) => sum + s.monthly * scale.factor, 0);
    const oneTime = chosen.reduce((sum, s) => sum + (s.oneTime ?? 0), 0);
    // Round to the nearest 10 EUR: a quoted price, not a spreadsheet artefact.
    const monthly = Math.round(monthlyRaw / 10) * 10;
    return {
      chosen,
      monthly,
      oneTime,
      overCeiling: monthly > MK.monthlyCeiling,
      underFloor: monthly > 0 && monthly < MK.monthlyFloor,
      hasAdSpend: chosen.some((s) => s.adSpendSeparate),
    };
  }, [selected, scale]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
      <div>
        {/* Step 1: scale */}
        <fieldset>
          <legend className="u-label mb-3">1. Колку голем е пазарот што го покривате?</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {MK_SCALES.map((s) => {
              const active = s.id === scaleId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setScaleId(s.id)}
                  aria-pressed={active}
                  className={`rounded-[var(--radius-soft)] border p-4 text-left transition-colors ${
                    active
                      ? "border-blue bg-blue text-white"
                      : "border-rule-strong bg-paper hover:border-blue"
                  }`}
                >
                  <span className="block font-semibold">{s.label}</span>
                  <span
                    className={`mt-1 block text-sm ${active ? "text-white/75" : "text-ink-mute"}`}
                  >
                    {s.note}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Step 2: services */}
        <p className="u-label mt-10 mb-3">2. Што сакате да работиме?</p>
        <div className="space-y-6">
          {MK_GROUPS.map((group) => (
            <div
              key={group.id}
              className="overflow-hidden rounded-[var(--radius-soft)] border border-rule bg-paper"
            >
              <div className="border-b border-rule bg-sky px-5 py-3">
                <p className="font-semibold text-ink">{group.label}</p>
                <p className="text-sm text-ink-mute">{group.blurb}</p>
              </div>
              <ul className="divide-y divide-rule">
                {mkServicesByGroup(group.id).map((s) => {
                  const active = selected.includes(s.id);
                  return (
                    <li key={s.id}>
                      <label className="flex cursor-pointer items-start gap-3 px-5 py-3.5 transition-colors hover:bg-ice">
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggle(s.id)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden
                          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                            active ? "border-blue bg-blue" : "border-rule-strong"
                          }`}
                        >
                          {active ? (
                            <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" aria-hidden>
                              <path
                                d="M2 6.5l2.5 2.5L10 3.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : null}
                        </span>
                        <span className="flex-1">
                          <span className="block font-medium text-ink">{s.label}</span>
                          <span className="block text-sm text-ink-mute">{s.note}</span>
                        </span>
                        <span className="u-tnum shrink-0 pt-0.5 text-sm font-semibold text-ink">
                          {s.oneTime
                            ? `${mkMoney(s.oneTime)} еднократно`
                            : `${mkMoney(s.monthly * scale.factor)}/мес`}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-[var(--radius-soft)] border-2 border-blue bg-paper">
          <div className="bg-blue px-6 py-5 text-white">
            <p className="u-label text-white/70">Ваш пакет</p>
            <p className="u-display u-tnum mt-2 text-4xl">
              {result.monthly > 0 ? mkMoney(result.monthly) : "—"}
              {result.monthly > 0 ? (
                <span className="u-display ml-1 text-xl text-white/70">/месечно</span>
              ) : null}
            </p>
            <p className="mt-2 text-sm text-white/70">{scale.label}</p>
          </div>

          {result.oneTime > 0 ? (
            <div className="flex items-baseline justify-between gap-4 border-b border-rule px-6 py-4">
              <span className="text-sm text-ink-soft">Еднократно</span>
              <span className="u-tnum font-semibold text-ink">{mkMoney(result.oneTime)}</span>
            </div>
          ) : null}

          {result.chosen.length ? (
            <div className="border-b border-rule px-6 py-4">
              <p className="u-label mb-2">Избрано</p>
              <ul className="space-y-1.5">
                {result.chosen.map((s) => (
                  <li key={s.id} className="text-sm text-ink-soft">
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="border-b border-rule px-6 py-5">
              <p className="text-sm text-ink-soft">
                Изберете услуги и цената се пресметува тука.
              </p>
            </div>
          )}

          <div className="border-b border-rule px-6 py-4">
            <p className="u-label mb-2">Секогаш вклучено</p>
            <ul className="space-y-1.5">
              {MK_INCLUDED.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-ink-soft">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flag" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5 border-b border-rule px-6 py-4 text-sm leading-relaxed text-ink-mute">
            {result.hasAdSpend ? (
              <p className="rounded-[var(--radius-soft)] bg-sky px-3 py-2 font-medium text-ink">
                Буџетот за реклами е одвоен и го плаќате директно вие.
              </p>
            ) : null}
            {result.underFloor ? (
              <p>
                Најмалиот месечен пакет е {mkMoney(MK.monthlyFloor)}. Ќе го дополниме
                опфатот заедно.
              </p>
            ) : null}
            {result.overCeiling ? (
              <p className="font-medium text-ink">
                Над {mkMoney(MK.monthlyCeiling)} месечно работиме по договор, не по
                калкулатор. Да седнеме и да го скроиме.
              </p>
            ) : null}
            <p>
              Ориентациона цена. Точниот опфат се потврдува по дијагностиката.
            </p>
          </div>

          <div className="space-y-3 px-6 py-5">
            <Link
              href="/mk/kontakt?namera=paket"
              className="flex w-full items-center justify-center rounded-[var(--radius-soft)] bg-flag px-5 py-3.5 font-semibold text-white transition-colors hover:bg-flag-deep"
            >
              Побарајте понуда
            </Link>
            <Link
              href="/mk/kontakt?namera=sostanok"
              className="flex w-full items-center justify-center rounded-[var(--radius-soft)] border border-rule-strong px-5 py-3.5 font-semibold text-ink transition-colors hover:border-blue hover:bg-blue hover:text-white"
            >
              Закажете состанок
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
