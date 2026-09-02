import type { Metadata } from "next";
import Link from "next/link";
import { MkImage } from "@/components/mk/MkChrome";
import { MkCalculator } from "@/components/mk/MkCalculator";
import { MK, mkMoney } from "@/config/mk";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Маркетинг за компании што пораснале побрзо од своето маркетинг одделение",
  description:
    "Дијагностика, стратегија и извршување за македонски производствени и услужни компании. Пакети од 200 € месечно. Целосна дијагностика за 2.000 €.",
  alternates: { canonical: "/mk" },
};

/* -------------------------------------------------------------------------- */
/* Section shells, local to this page so the Macedonian site can look like     */
/* itself without dragging the international components along.                 */
/* -------------------------------------------------------------------------- */

function Section({
  children,
  id,
  tone = "ice",
}: {
  children: React.ReactNode;
  id?: string;
  tone?: "ice" | "paper" | "sky" | "mist" | "ink" | "blue";
}) {
  const tones = {
    ice: "bg-ice text-ink",
    paper: "bg-paper text-ink",
    sky: "bg-sky text-ink",
    mist: "bg-mist text-ink",
    ink: "bg-ink text-white",
    blue: "bg-blue text-white",
  } as const;
  return (
    <section id={id} className={`${tones[tone]} scroll-mt-20 py-16 sm:py-24`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

function Heading({
  eyebrow,
  title,
  lede,
  invert = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className={`u-label ${invert ? "text-white/70" : "text-blue"}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`u-display mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <div
          className={`mt-5 text-lg leading-relaxed ${invert ? "text-white/75" : "text-ink-soft"}`}
        >
          {lede}
        </div>
      ) : null}
    </div>
  );
}

const ICP = [
  "ÐŸÐ¾Ð¼ÐµÑ“Ñƒ 20 Ð¸ 100 Ð²Ñ€Ð°Ð±Ð¾Ñ‚ÐµÐ½Ð¸, ÑÐµÐ¼ÐµÑ˜Ð½Ð° Ñ„Ð¸Ñ€Ð¼Ð° Ð²Ð¾ Ð²Ñ‚Ð¾Ñ€Ð° Ð³ÐµÐ½ÐµÑ€Ð°Ñ†Ð¸Ñ˜Ð°",
  "ÐžÐ¿Ñ€ÐµÐ¼Ð° Ð¸ Ð¿Ð¾Ð³Ð¾Ð½ Ð²Ñ€ÐµÐ´Ð½Ð¸ Ð½Ð°Ð´ Ð¼Ð¸Ð»Ð¸Ð¾Ð½ ÐµÐ²Ñ€Ð°",
  "Ð•Ð²Ñ€Ð¾Ð¿ÑÐºÐ¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¸ Ð¸ Ð¸Ð·Ð²Ð¾Ð·, Ð¸Ð»Ð¸ ÑÐµÑ€Ð¸Ð¾Ð·Ð½Ð° Ð°Ð¼Ð±Ð¸Ñ†Ð¸Ñ˜Ð° Ð·Ð° Ð½Ð¸Ð²",
  "Ð¡Ð¸Ð½Ð¾Ð²Ð¸ Ð¸ ÑœÐµÑ€ÐºÐ¸ Ð²Ð¾ Ð¼ÐµÐ½Ð°ÑŸÐ¼ÐµÐ½Ñ‚Ð¾Ñ‚ ÑˆÑ‚Ð¾ ÑÐ°ÐºÐ°Ð°Ñ‚ Ð´Ð° Ð³Ð¾ Ñ‚Ñ€Ð³Ð½Ð°Ñ‚ Ð¼Ð¸Ð½Ð°Ñ‚Ð¸Ð¾Ñ‚ Ð²ÐµÐº",
  "ÐœÐ°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³Ð¾Ñ‚ Ð´Ð¾ÑÐµÐ³Ð° Ð±Ð¸Ð» Ð½ÐµÑ‡Ð¸Ñ˜Ð° Ð´Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»Ð½Ð° Ð·Ð°Ð´Ð°Ñ‡Ð°, Ð½Ðµ Ñ€Ð°Ð±Ð¾Ñ‚Ð½Ð¾ Ð¼ÐµÑÑ‚Ð¾",
];

const DIFFERENTIATORS = [
  {
    n: "01",
    title: "ÐÐµ Ð½Ð°Ð¿Ð»Ð°ÑœÐ°Ð¼Ðµ ÐºÐ°ÐºÐ¾ Ð³Ð¾Ð»ÐµÐ¼Ð¸Ñ‚Ðµ Ð°Ð³ÐµÐ½Ñ†Ð¸Ð¸",
    body: "Ð˜ÑÑ‚Ð°Ñ‚Ð° Ñ€Ð°Ð±Ð¾Ñ‚Ð° ÐºÐ°Ñ˜ Ð³Ð¾Ð»ÐµÐ¼Ð° Ñ€ÐµÐ³Ð¸Ð¾Ð½Ð°Ð»Ð½Ð° Ð°Ð³ÐµÐ½Ñ†Ð¸Ñ˜Ð° Ð¿Ð¾Ñ‡Ð½ÑƒÐ²Ð° Ð½Ð° Ð½ÐµÐºÐ¾Ð»ÐºÑƒ Ð¸Ð»Ñ˜Ð°Ð´Ð¸ ÐµÐ²Ñ€Ð° Ð¼ÐµÑÐµÑ‡Ð½Ð¾, Ð¿Ñ€ÐµÐ´ Ð´Ð° Ð²Ð¸Ð´Ð¸ Ð½ÐµÐºÐ¾Ñ˜ Ð²Ð°ÑˆÐ¸Ð¾Ñ‚ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´. ÐšÐ°Ñ˜ Ð½Ð°Ñ Ð¿Ð°ÐºÐµÑ‚Ð¸Ñ‚Ðµ Ð¿Ð¾Ñ‡Ð½ÑƒÐ²Ð°Ð°Ñ‚ Ð¾Ð´ 200 â‚¬ Ð¸ Ñ€Ð°ÑÑ‚Ð°Ñ‚ ÑÐ°Ð¼Ð¾ ÐºÐ¾Ð³Ð° Ñ€Ð°ÑÑ‚Ðµ Ð¾Ð¿Ñ„Ð°Ñ‚Ð¾Ñ‚.",
  },
  {
    n: "02",
    title: "Ð Ð°Ð±Ð¾Ñ‚ÐµÐ²Ð¼Ðµ Ð½Ð° Ð¿Ð°Ð·Ð°Ñ€Ð¸ ÑÐ¾ Ð¼Ð½Ð¾Ð³Ñƒ Ð¿Ð¾Ð¾ÑÑ‚Ñ€Ð° ÐºÐ¾Ð½ÐºÑƒÑ€ÐµÐ½Ñ†Ð¸Ñ˜Ð°",
    body: "Ð“Ð¸ Ð²Ð¾Ð´ÐµÐ»Ðµ ÑÐ¼Ðµ Ð¸ ÑƒÑÐ»ÑƒÐ¶Ð½Ð¸ Ð¸ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´Ð½Ð¸ ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸, B2B Ð¸ B2C, Ð½Ð° Ð¿Ð°Ð·Ð°Ñ€Ð¸ ÐºÐ°ÐºÐ¾ ÐŠÑƒÑ˜Ð¾Ñ€Ðº, Ð›Ð¾Ñ ÐÐ½ÑŸÐµÐ»ÐµÑ Ð¸ Ð¡Ð¸Ð½Ð³Ð°Ð¿ÑƒÑ€. ÐžÐ½Ð° ÑˆÑ‚Ð¾ Ñ‚Ð°Ð¼Ñƒ Ðµ Ð¾ÑÐ½Ð¾Ð²ÐµÐ½ ÑÑ‚Ð°Ð½Ð´Ð°Ñ€Ð´, Ñ‚ÑƒÐºÐ° ÑÃ¨ ÑƒÑˆÑ‚Ðµ Ðµ Ð¿Ñ€ÐµÐ´Ð½Ð¾ÑÑ‚.",
  },
  {
    n: "03",
    title: "Ð¢Ð¸Ð¼ Ð¾Ð´ Ð¿ÐµÑ‚ Ð»ÑƒÑ“Ðµ, Ð¿Ð¾ÑÐ²ÐµÑ‚ÐµÐ½Ð¸ Ð½Ð° Ð²Ð°ÑˆÐ°Ñ‚Ð° ÑÐ¼ÐµÑ‚ÐºÐ°",
    body: `Ð¡Ñ‚Ñ€Ð°Ñ‚ÐµÐ³Ð¸Ñ˜Ð°, ÑÐ¾Ð´Ñ€Ð¶Ð¸Ð½Ð°, Ñ€ÐµÐºÐ»Ð°Ð¼Ð¸, Ð²ÐµÐ± Ð¸ Ð¿Ð¾Ð´Ð°Ñ‚Ð¾Ñ†Ð¸. ${MK.teamSize} Ð»ÑƒÑ“Ðµ ÑˆÑ‚Ð¾ Ð·Ð½Ð°Ð°Ñ‚ ÑˆÑ‚Ð¾ Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ñ‚, Ð° Ð½Ðµ ÐµÐ´ÐµÐ½ Ñ‡Ð¾Ð²ÐµÐº ÑˆÑ‚Ð¾ â€žÐ¿Ð¾ÐºÑ€Ð¸Ð²Ð° ÑÃ¨â€œ Ð¿Ð¾Ð¼ÐµÑ“Ñƒ Ð´Ñ€ÑƒÐ³Ð¸ Ð´ÐµÑÐµÑ‚ ÐºÐ»Ð¸ÐµÐ½Ñ‚Ð¸.`,
  },
  {
    n: "04",
    title: "Ð˜Ð·Ð²ÐµÑˆÑ‚Ð°Ð¸ Ð²Ð¾ Ð¶Ð¸Ð²Ð¾, Ð½Ðµ PDF Ð½Ð° ÐºÑ€Ð°Ñ˜Ð¾Ñ‚ Ð¾Ð´ Ð¼ÐµÑÐµÑ†Ð¾Ñ‚",
    body: "ÐŸÑ€Ð¾Ñ„Ð¸Ð» ÐºÐ°Ð´Ðµ Ð²Ð¾ ÑÐµÐºÐ¾Ðµ Ð²Ñ€ÐµÐ¼Ðµ Ð³Ð»ÐµÐ´Ð°Ñ‚Ðµ ÑˆÑ‚Ð¾ Ðµ Ð½Ð°Ð¿Ñ€Ð°Ð²ÐµÐ½Ð¾ Ð¸ ÑˆÑ‚Ð¾ Ð´Ð°Ð»Ð¾ Ñ€ÐµÐ·ÑƒÐ»Ñ‚Ð°Ñ‚, Ð¿Ð¾ Ð»Ð¾ÐºÐ°Ñ†Ð¸Ñ˜Ð°, ÐºÐ°Ð½Ð°Ð» Ð¸ ÐºÐ°Ð¼Ð¿Ð°ÑšÐ°.",
  },
];

const REPORTING = [
  "ÐŸÐµÑ€Ñ„Ð¾Ñ€Ð¼Ð°Ð½ÑÐ¸ Ð¿Ð¾ Ð»Ð¾ÐºÐ°Ñ†Ð¸Ñ˜Ð°, ÐºÐ°Ð½Ð°Ð» Ð¸ ÐºÐ°Ð¼Ð¿Ð°ÑšÐ° Ð½Ð° ÐµÐ´Ð½Ð¾ Ð¼ÐµÑÑ‚Ð¾",
  "Ð”Ð¸Ñ˜Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ° ÑˆÑ‚Ð¾ Ñ˜Ð° Ð¾Ñ†ÐµÐ½ÑƒÐ²Ð° Ñ†ÐµÐ»Ð°Ñ‚Ð° Ð²Ð°ÑˆÐ° Ð¼Ð°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³ Ð°ÐºÑ‚Ð¸Ð²Ð½Ð¾ÑÑ‚",
  "SWOT Ð¿Ð¾Ð²Ñ€Ð·Ð°Ð½ ÑÐ¾ Ð±Ñ€Ð¾Ñ˜ÐºÐ¸, Ð½Ðµ ÑÐ¾ Ð¼Ð¸ÑÐ»ÐµÑšÐ°",
  "ÐŸÐ¾Ð´Ð°Ñ‚Ð¾Ñ†Ð¸ Ð·Ð° Ð¿Ð°Ð·Ð°Ñ€Ð¾Ñ‚, Ð½Ðµ ÑÐ°Ð¼Ð¾ Ð·Ð° Ð²Ð°ÑˆÐ°Ñ‚Ð° Ñ„Ð¸Ñ€Ð¼Ð°",
  "Ð”Ð²Ð¸Ð¶ÐµÑšÐµ Ð½Ð° Ð¿Ð¾Ð±Ð°Ñ€ÑƒÐ²Ð°Ñ‡ÐºÐ°Ñ‚Ð° Ð¸ Ð¿Ñ€ÐµÐ´Ð²Ð¸Ð´ÑƒÐ²Ð°ÑšÐµ Ð¿Ð¾ ÑÐµÐ·Ð¾Ð½Ð°",
  "Ð¨Ñ‚Ð¾ Ðµ Ð¸ÑÐ¿Ð¾Ñ€Ð°Ñ‡Ð°Ð½Ð¾ Ð¾Ð²Ð¾Ñ˜ Ð¼ÐµÑÐµÑ† Ð¸ ÑˆÑ‚Ð¾ ÑÐ»ÐµÐ´Ð¸",
];

export default function MkHomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-ice">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[34rem] bg-[radial-gradient(60%_60%_at_25%_40%,var(--color-mist),transparent_70%)]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="u-label text-flag">Ð—Ð° Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸ ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸</p>
              <h1 className="u-display mt-6 text-[2.6rem] leading-[1.06] sm:text-5xl lg:text-[4rem]">
                Ð¤Ð¸Ñ€Ð¼Ð°Ñ‚Ð° Ð¿Ð¾Ñ€Ð°ÑÐ½Ð°.
                <br />
                <span className="u-underline">ÐœÐ°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³Ð¾Ñ‚ Ð¾ÑÑ‚Ð°Ð½Ð°</span> Ð¾Ð´ Ð¿Ð¾Ñ€Ð°Ð½Ð¾.
              </h1>
              <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink-soft">
                Ð˜Ð¼Ð°Ñ‚Ðµ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´ÑÑ‚Ð²Ð¾, Ð»ÑƒÑ“Ðµ Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¸. ÐžÐ½Ð° ÑˆÑ‚Ð¾ Ð½ÐµÐ´Ð¾ÑÑ‚Ð¸Ð³Ð° Ðµ
                ÑÐ¸ÑÑ‚ÐµÐ¼ ÑˆÑ‚Ð¾ ÑœÐµ ÐºÐ°Ð¶Ðµ ÑˆÑ‚Ð¾ Ð²Ñ€ÐµÐ´Ð¸ Ð´Ð° ÑÐµ Ñ€Ð°Ð±Ð¾Ñ‚Ð¸, ÑœÐµ Ð³Ð¾ Ð¸Ð·Ñ€Ð°Ð±Ð¾Ñ‚Ð¸ Ð¸ ÑœÐµ
                Ð¿Ð¾ÐºÐ°Ð¶Ðµ ÑÐ¾ Ð±Ñ€Ð¾Ñ˜ÐºÐ¸ Ð´Ð°Ð»Ð¸ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð¸Ñ€Ð°Ð»Ð¾.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#dijagnostika"
                  className="inline-flex items-center justify-center rounded-[var(--radius-soft)] bg-flag px-6 py-3.5 font-semibold text-white transition-colors hover:bg-flag-deep"
                >
                  Ð”Ð¸Ñ˜Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ° Ð·Ð° {mkMoney(MK.diagnostics.price)}
                </Link>
                <Link
                  href="#kalkulator"
                  className="inline-flex items-center justify-center rounded-[var(--radius-soft)] border border-rule-strong px-6 py-3.5 font-semibold text-ink transition-colors hover:border-blue hover:bg-blue hover:text-white"
                >
                  ÐŸÑ€ÐµÑÐ¼ÐµÑ‚Ð°Ñ˜Ñ‚Ðµ Ð¿Ð°ÐºÐµÑ‚
                </Link>
              </div>
              <p className="mt-6 text-ink-mute">
                ÐŸÐ°ÐºÐµÑ‚Ð¸ Ð¾Ð´ {mkMoney(MK.monthlyFloor)} Ð¼ÐµÑÐµÑ‡Ð½Ð¾. ÐÐºÐ¾ Ð¿Ñ€Ð¾Ð´Ð¾Ð»Ð¶Ð¸Ñ‚Ðµ Ð¿Ð¾
                Ð´Ð¸Ñ˜Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ°Ñ‚Ð°, Ð¿Ñ€Ð²Ð¸Ñ‚Ðµ {MK.diagnostics.freeMonths} Ð¼ÐµÑÐµÑ†Ð¸ ÑÐµ
                Ð±ÐµÑÐ¿Ð»Ð°Ñ‚Ð½Ð¸.
              </p>
            </div>
            <MkImage id="fabrika" aspect="landscape" priority sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 1. Who this is for                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section id="za-kogo" tone="paper">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Heading
              eyebrow="Ð—Ð° ÐºÐ¾Ð³Ð¾ Ðµ Ð¾Ð²Ð°"
              title="ÐÐºÐ¾ Ð¾Ð²Ð° Ð²Ð¸ Ð»Ð¸Ñ‡Ð¸ Ð½Ð° Ð²Ð°ÑˆÐ°Ñ‚Ð° Ñ„Ð¸Ñ€Ð¼Ð°, Ñ‡Ð¸Ñ‚Ð°Ñ˜Ñ‚Ðµ Ð½Ð°Ñ‚Ð°Ð¼Ñƒ."
              lede="ÐÐµ Ñ€Ð°Ð±Ð¾Ñ‚Ð¸Ð¼Ðµ ÑÐ¾ ÑÐ¸Ñ‚Ðµ. ÐžÐ²Ð¾Ñ˜ ÑÐ¸ÑÑ‚ÐµÐ¼ Ðµ Ð½Ð°Ð¿Ñ€Ð°Ð²ÐµÐ½ Ð·Ð° ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸ ÑˆÑ‚Ð¾ Ð²ÐµÑœÐµ Ð¸Ð¼Ð°Ð°Ñ‚ ÑˆÑ‚Ð¾ Ð´Ð° Ð¿Ð¾ÐºÐ°Ð¶Ð°Ñ‚, Ð½Ð¾ Ð½Ð¸ÐºÐ¾Ð³Ð°Ñˆ Ð½ÐµÐ¼Ð°Ð»Ðµ ÐºÐ¾Ñ˜ Ð´Ð° Ð³Ð¾ Ð¿Ð¾ÐºÐ°Ð¶Ðµ."
            />
            <ul className="mt-8 space-y-3">
              {ICP.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-flag" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <MkImage id="linija" aspect="portrait" />
            <MkImage id="lakirnica" aspect="portrait" />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 2-4. Why us                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section id="sto-dobivate" tone="sky">
        <Heading
          eyebrow="Ð—Ð¾ÑˆÑ‚Ð¾ Ð½Ð¸Ðµ"
          title="Ð§ÐµÑ‚Ð¸Ñ€Ð¸ Ñ€Ð°Ð±Ð¾Ñ‚Ð¸ ÑˆÑ‚Ð¾ Ð³Ð¸ Ð½ÐµÐ¼Ð° Ð²Ð¾ Ð¿Ð¾Ð½ÑƒÐ´Ð°Ñ‚Ð° Ð½Ð° Ð´Ñ€ÑƒÐ³Ð¸Ñ‚Ðµ."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-soft)] bg-rule sm:grid-cols-2">
          {DIFFERENTIATORS.map((d) => (
            <div key={d.n} className="bg-paper p-7">
              <span className="u-label u-tnum text-flag">{d.n}</span>
              <h3 className="u-display mt-3 text-2xl text-ink">{d.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{d.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <MkImage id="klinika" aspect="landscape" />
          <MkImage id="restoran" aspect="landscape" />
          <MkImage id="salon" aspect="landscape" />
        </div>
        <p className="mt-4 text-sm text-ink-mute">
          Ð£ÑÐ»ÑƒÐ¶Ð½Ð¸ Ð¸ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´Ð½Ð¸ ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸, B2B Ð¸ B2C. Ð Ð°Ð·Ð»Ð¸Ñ‡Ð½Ð¸ Ð´ÐµÑ˜Ð½Ð¾ÑÑ‚Ð¸, Ð¸ÑÑ‚
          Ð¿Ñ€Ð¾Ð±Ð»ÐµÐ¼.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Data and reporting                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section id="izveshtai" tone="ink">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Heading
            invert
            eyebrow="ÐŸÐ¾Ð´Ð°Ñ‚Ð¾Ñ†Ð¸, Ð½Ðµ Ñ‡ÑƒÐ²ÑÑ‚Ð²Ð¾"
            title="ÐŸÑ€Ð¾Ñ„Ð¸Ð» ÐºÐ°Ð´Ðµ Ð²Ð¾ ÑÐµÐºÐ¾Ðµ Ð²Ñ€ÐµÐ¼Ðµ Ð³Ð»ÐµÐ´Ð°Ñ‚Ðµ ÑˆÑ‚Ð¾ Ñ€Ð°Ð±Ð¾Ñ‚Ð¸."
            lede="Ð¡ÐµÐºÐ¾Ñ˜ ÐºÐ»Ð¸ÐµÐ½Ñ‚ Ð´Ð¾Ð±Ð¸Ð²Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð» ÑˆÑ‚Ð¾ Ð³Ð¸ ÑÐ¿Ð¾Ñ˜ÑƒÐ²Ð° Ð¸Ð·Ð²ÐµÑˆÑ‚Ð°Ð¸Ñ‚Ðµ Ð·Ð° Ð¿ÐµÑ€Ñ„Ð¾Ñ€Ð¼Ð°Ð½ÑÐ¸ ÑÐ¾ Ð´Ð¸Ñ˜Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ°Ñ‚Ð° Ð¸ Ð¿Ð¾Ð´Ð°Ñ‚Ð¾Ñ†Ð¸Ñ‚Ðµ Ð·Ð° Ð¿Ð°Ð·Ð°Ñ€Ð¾Ñ‚. ÐžÐ´Ð»ÑƒÐºÐ¸Ñ‚Ðµ Ð·Ð° Ñ€Ð°Ð·Ð²Ð¾Ñ˜ Ð¿Ñ€ÐµÑÑ‚Ð°Ð½ÑƒÐ²Ð°Ð°Ñ‚ Ð´Ð° Ð±Ð¸Ð´Ð°Ñ‚ Ð¿Ñ€Ð°ÑˆÐ°ÑšÐµ Ð½Ð° Ñ‡Ð¸Ñ˜ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚ Ðµ Ð¿Ð¾Ð³Ð»Ð°ÑÐµÐ½ Ð½Ð° ÑÐ¾ÑÑ‚Ð°Ð½Ð¾ÐºÐ¾Ñ‚."
          />
          <div>
            <ul className="space-y-3">
              {REPORTING.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-white/80">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-sun" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-[var(--radius-soft)] bg-white/10 p-5">
              <p className="u-label text-white/60">Ð¨Ñ‚Ð¾ Ð·Ð½Ð°Ñ‡Ð¸ Ñ‚Ð¾Ð° Ð²Ð¾ Ð¿Ñ€Ð°ÐºÑÐ°</p>
              <p className="mt-3 leading-relaxed text-white/85">
                ÐšÐ¾Ð³Ð° ÑœÐµ Ð¾Ð´Ð»ÑƒÑ‡ÑƒÐ²Ð°Ñ‚Ðµ Ð´Ð°Ð»Ð¸ Ð´Ð° Ð¾Ñ‚Ð²Ð¾Ñ€Ð¸Ñ‚Ðµ Ð½Ð¾Ð² ÐºÐ°Ð½Ð°Ð», Ð´Ð° Ð²Ð»Ð¾Ð¶Ð¸Ñ‚Ðµ Ð²Ð¾ Ð½Ð¾Ð²Ð°
                Ð»Ð¸Ð½Ð¸Ñ˜Ð° Ð¸Ð»Ð¸ Ð´Ð° Ð²Ð»ÐµÐ·ÐµÑ‚Ðµ Ð²Ð¾ Ð½Ð¾Ð² Ð³Ñ€Ð°Ð´, Ð¾Ð´Ð»ÑƒÐºÐ°Ñ‚Ð° Ñ˜Ð° Ð½Ð¾ÑÐ¸Ñ‚Ðµ ÑÐ¾ Ð±Ñ€Ð¾Ñ˜ÐºÐ¸
                Ð·Ð° Ð¿Ð¾Ð±Ð°Ñ€ÑƒÐ²Ð°Ñ‡ÐºÐ°Ñ‚Ð° Ð¸ Ð·Ð° ÐºÐ¾Ð½ÐºÑƒÑ€ÐµÐ½Ñ†Ð¸Ñ˜Ð°Ñ‚Ð°, Ð° Ð½Ðµ Ð¿Ð¾ Ñ‡ÑƒÐ²ÑÑ‚Ð²Ð¾.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* What we can do                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="paper">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <MkImage id="proizvod" aspect="wide" />
          <div>
            <Heading
              eyebrow="Ð¨Ñ‚Ð¾ Ñ€Ð°Ð±Ð¾Ñ‚Ð¸Ð¼Ðµ"
              title="ÐžÐ´ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð° Ð½Ð° Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´ Ð´Ð¾ Ð½Ð°Ñ†Ð¸Ð¾Ð½Ð°Ð»Ð½Ð° ÐºÐ°Ð¼Ð¿Ð°ÑšÐ°."
              lede="Ð—ÐµÐ¼Ð°Ñ‚Ðµ ÑÐ°Ð¼Ð¾ Ð¾Ð½Ð° ÑˆÑ‚Ð¾ Ð²Ð¸ Ñ‚Ñ€ÐµÐ±Ð°. ÐÐ¸ÑˆÑ‚Ð¾ Ð½Ðµ Ðµ Ð·Ð°Ð´Ð¾Ð»Ð¶Ð¸Ñ‚ÐµÐ»Ð½Ð¾, Ð¸ Ð½Ð¸ÑˆÑ‚Ð¾ Ð½Ðµ Ðµ ÑÐ¿Ð°ÐºÑƒÐ²Ð°Ð½Ð¾ Ð·Ð° Ð´Ð° Ð²Ðµ Ð½Ð°Ñ‚ÐµÑ€Ð° Ð´Ð° Ð¿Ð»Ð°Ñ‚Ð¸Ñ‚Ðµ Ð¿Ð¾Ð²ÐµÑœÐµ."
            />
            <p className="mt-6 leading-relaxed text-ink-soft">
              Ð¡Ð¾Ñ†Ð¸Ñ˜Ð°Ð»Ð½Ð¸ Ð¼Ñ€ÐµÐ¶Ð¸ Ð¸ ÑÐ¾Ð´Ñ€Ð¶Ð¸Ð½Ð°, Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ð¾Ð²Ð° Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð°, Ð²Ð¸Ð´ÐµÐ¾, Ñ€ÐµÐºÐ»Ð°Ð¼Ð¸
              Ð¸ Ð½Ð¸Ð²Ð½Ð¾ Ð²Ð¾Ð´ÐµÑšÐµ, Ð»Ð¾ÐºÐ°Ð»Ð½Ð¾ SEO, Ð´Ð¸Ð³Ð¸Ñ‚Ð°Ð»ÐµÐ½ PR, Ð»Ð¸Ð½ÐºÐ¾Ð²Ð¸, Ð±Ñ€ÐµÐ½Ð´Ð¸Ñ€Ð°ÑšÐµ,
              Ð³Ñ€Ð°Ñ„Ð¸Ñ‡ÐºÐ¸ Ð´Ð¸Ð·Ð°Ñ˜Ð½, Ð¸Ð·Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð¸ Ð¾Ð´Ñ€Ð¶ÑƒÐ²Ð°ÑšÐµ Ð½Ð° Ð²ÐµÐ±, ÑÑ‚Ñ€Ð°Ñ‚ÐµÐ³Ð¸Ñ˜Ð° Ð¸
              Ð¸ÑÑ‚Ñ€Ð°Ð¶ÑƒÐ²Ð°ÑšÐµ Ð½Ð° Ð¿Ð°Ð·Ð°Ñ€ Ð¸ ÐºÐ¾Ð½ÐºÑƒÑ€ÐµÐ½Ñ†Ð¸Ñ˜Ð°.
            </p>
            <div className="mt-8">
              <Link
                href="#kalkulator"
                className="inline-flex items-center justify-center rounded-[var(--radius-soft)] bg-blue px-6 py-3.5 font-semibold text-white transition-colors hover:bg-blue-deep"
              >
                Ð¡Ð¾ÑÑ‚Ð°Ð²ÐµÑ‚Ðµ Ð³Ð¾ Ð²Ð°ÑˆÐ¸Ð¾Ñ‚ Ð¿Ð°ÐºÐµÑ‚
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. Calculator                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section id="kalkulator" tone="ice">
        <Heading
          eyebrow="Ð¦ÐµÐ½Ð¸"
          title="Ð¡Ð¾ÑÑ‚Ð°Ð²ÐµÑ‚Ðµ Ð¿Ð°ÐºÐµÑ‚ ÑÐ°Ð¼Ð¸, Ð¸Ð»Ð¸ ÑÐµÐ´Ð½ÐµÑ‚Ðµ ÑÐ¾ Ð½Ð°Ñ."
          lede={`ÐŸÐ°ÐºÐµÑ‚Ð¸Ñ‚Ðµ Ð¾Ð´Ð°Ñ‚ Ð¾Ð´ ${mkMoney(MK.monthlyFloor)} Ð¼ÐµÑÐµÑ‡Ð½Ð¾ Ð·Ð° ÐµÐ´Ð½Ð° Ð»Ð¾ÐºÐ°Ñ†Ð¸Ñ˜Ð°, Ð´Ð¾ ${mkMoney(MK.monthlyCeiling)} Ð·Ð° Ñ†ÐµÐ»Ð¾ÑÐ½Ð° Ñ€Ð°Ð±Ð¾Ñ‚Ð° Ð½Ð° Ð½Ð°Ñ†Ð¸Ð¾Ð½Ð°Ð»Ð½Ð¾ Ð½Ð¸Ð²Ð¾. Ð˜Ð·Ð±ÐµÑ€ÐµÑ‚Ðµ Ð¿Ð¾Ð´Ð¾Ð»Ñƒ Ð¸ Ñ†ÐµÐ½Ð°Ñ‚Ð° ÑÐµ Ð¿Ñ€ÐµÑÐ¼ÐµÑ‚ÑƒÐ²Ð° Ð²ÐµÐ´Ð½Ð°Ñˆ.`}
        />
        <div className="mt-12">
          <MkCalculator />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 7-8. Diagnostics and the two free months                          */}
      {/* ---------------------------------------------------------------- */}
      <Section id="dijagnostika" tone="blue">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Heading
              invert
              eyebrow="ÐŸÐ¾Ñ‡Ð½ÐµÑ‚Ðµ Ñ‚ÑƒÐºÐ°"
              title={`Ð¦ÐµÐ»Ð¾ÑÐ½Ð° Ð´Ð¸Ñ˜Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ° Ð½Ð° Ð¿Ð°Ð·Ð°Ñ€Ð¾Ñ‚ Ð·Ð° ${mkMoney(MK.diagnostics.price)}.`}
              lede="ÐŸÑ€ÐµÐ´ Ð´Ð° Ð²Ðµ Ð¿Ñ€Ð°ÑˆÐ°Ð¼Ðµ Ð´Ð° ÐºÑƒÐ¿Ð¸Ñ‚Ðµ Ð¼Ð°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³, Ð²Ð¸ Ð¿Ð¾ÐºÐ°Ð¶ÑƒÐ²Ð°Ð¼Ðµ ÑˆÑ‚Ð¾ Ñ‚Ð¾Ñ‡Ð½Ð¾ Ð±Ð¸ Ñ€Ð°Ð±Ð¾Ñ‚ÐµÐ»Ðµ. Ð”Ð¾Ð±Ð¸Ð²Ð°Ñ‚Ðµ ÑÑ‚Ñ€Ð°Ñ‚ÐµÐ³Ð¸Ñ˜Ð° Ð½Ð°Ð¿Ð¸ÑˆÐ°Ð½Ð° Ñ‚Ð°ÐºÐ° ÑˆÑ‚Ð¾ Ð²Ð°ÑˆÐ¸Ð¾Ñ‚ Ñ‚Ð¸Ð¼ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ñ˜Ð° ÑÐ¿Ñ€Ð¾Ð²ÐµÐ´Ðµ Ð¸ Ð±ÐµÐ· Ð½Ð°Ñ."
            />
            <ul className="mt-8 space-y-3">
              {[
                "ÐÐ½Ð°Ð»Ð¸Ð·Ð° Ð½Ð° Ð²Ð°ÑˆÐ¸Ð¾Ñ‚ Ð¿Ð°Ð·Ð°Ñ€ Ð¸ Ð½Ð° ÐºÐ¾Ð½ÐºÑƒÑ€ÐµÐ½Ñ†Ð¸Ñ˜Ð°Ñ‚Ð°",
                "ÐŸÑ€Ð¾Ñ„Ð¸Ð» Ð½Ð° ÐºÑƒÐ¿ÑƒÐ²Ð°Ñ‡Ð¸Ñ‚Ðµ Ð¸ ÑˆÑ‚Ð¾ Ð³Ð¸ Ñ‚ÐµÑ€Ð° Ð´Ð° ÐºÑƒÐ¿Ð°Ñ‚",
                "ÐžÑ†ÐµÐ½Ð° Ð½Ð° ÑÃ¨ ÑˆÑ‚Ð¾ Ð´Ð¾ÑÐµÐ³Ð° ÑÑ‚Ðµ Ñ€Ð°Ð±Ð¾Ñ‚ÐµÐ»Ðµ Ð²Ð¾ Ð¼Ð°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³",
                "ÐŸÐ»Ð°Ð½ Ð·Ð° 90 Ð´ÐµÐ½Ð°, ÑÐ¾ Ð¿Ñ€Ð¸Ð¾Ñ€Ð¸Ñ‚ÐµÑ‚Ð¸ Ð¸ Ð¾Ð´Ð³Ð¾Ð²Ð¾Ñ€Ð½Ð¸ Ð»ÑƒÑ“Ðµ",
                "ÐŸÑ€ÐµÐ¿Ð¾Ñ€Ð°Ñ‡Ð°Ð½ Ð±ÑƒÑŸÐµÑ‚ Ð¸ ÐºÐ°Ð´Ðµ Ð´Ð° ÑÐµ Ð¿Ð¾Ñ‚Ñ€Ð¾ÑˆÐ¸",
                "Ð¡Ñ‚Ñ€Ð°Ñ‚ÐµÐ³Ð¸Ñ˜Ð°Ñ‚Ð° Ð¾ÑÑ‚Ð°Ð½ÑƒÐ²Ð° Ð²Ð°ÑˆÐ°, Ñ€Ð°Ð±Ð¾Ñ‚ÐµÐ²Ñ‚Ðµ ÑÐ¾ Ð½Ð°Ñ Ð¸Ð»Ð¸ Ð½Ðµ",
              ].map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-white/85">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-sun" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-soft)] bg-white p-7 text-ink">
            <p className="u-label text-flag">ÐŸÐ¾Ð½ÑƒÐ´Ð°</p>
            <p className="u-display mt-3 text-5xl text-ink">
              {mkMoney(MK.diagnostics.price)}
            </p>
            <p className="mt-2 text-ink-mute">ÐµÐ´Ð½Ð¾ÐºÑ€Ð°Ñ‚Ð½Ð¾, Ñ†ÐµÐ»Ð¾ÑÐ½Ð° Ð´Ð¸Ñ˜Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ°</p>

            <div className="my-7 h-px bg-rule" />

            <p className="u-display text-2xl text-ink">
              ÐÐºÐ¾ Ð¿Ñ€Ð¾Ð´Ð¾Ð»Ð¶Ð¸Ñ‚Ðµ ÑÐ¾ Ð½Ð°Ñ, Ð¿Ñ€Ð²Ð¸Ñ‚Ðµ {MK.diagnostics.freeMonths} Ð¼ÐµÑÐµÑ†Ð¸ ÑÐµ
              Ð±ÐµÑÐ¿Ð»Ð°Ñ‚Ð½Ð¸.
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Ð—Ð½Ð°Ñ‡Ð¸ Ð´ÐµÐºÐ° Ð´Ð¸Ñ˜Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ°Ñ‚Ð° Ð¿Ñ€Ð°ÐºÑ‚Ð¸Ñ‡Ð½Ð¾ ÑÐµ Ð²Ñ€Ð°ÑœÐ°. ÐÐºÐ¾ Ð½Ðµ Ð¿Ñ€Ð¾Ð´Ð¾Ð»Ð¶Ð¸Ñ‚Ðµ,
              Ð¿Ð»Ð°Ð½Ð¾Ñ‚ ÑÐµÐ¿Ð°Ðº Ð¾ÑÑ‚Ð°Ð½ÑƒÐ²Ð° ÐºÐ°Ñ˜ Ð²Ð°Ñ.
            </p>

            <div className="mt-8 space-y-3">
              <Link
                href="/mk/kontakt?namera=dijagnostika"
                className="flex w-full items-center justify-center rounded-[var(--radius-soft)] bg-flag px-5 py-3.5 font-semibold text-white transition-colors hover:bg-flag-deep"
              >
                Ð—Ð°Ð¿Ð¾Ñ‡Ð½ÐµÑ‚Ðµ Ð´Ð¸Ñ˜Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ°
              </Link>
              <Link
                href="/mk/kontakt?namera=sostanok"
                className="flex w-full items-center justify-center rounded-[var(--radius-soft)] border border-rule-strong px-5 py-3.5 font-semibold text-ink transition-colors hover:border-blue hover:bg-blue hover:text-white"
              >
                ÐŸÑ€Ð²Ð¾ ÑÐ°Ð¼Ð¾ Ñ€Ð°Ð·Ð³Ð¾Ð²Ð¾Ñ€
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Close                                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="mist">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h2 className="u-display text-3xl text-ink sm:text-4xl lg:text-5xl">
              ÐŸÑ€Ð²Ð¾ Ð´Ð° Ð³Ð¾ Ñ€Ð°Ð·Ð±ÐµÑ€ÐµÐ¼Ðµ Ð¿Ð°Ð·Ð°Ñ€Ð¾Ñ‚, Ð¿Ð° Ð¿Ð¾Ñ‚Ð¾Ð° Ð´Ð° Ð²Ð¸ Ð¿Ñ€Ð¾Ð´Ð°Ð²Ð°Ð¼Ðµ Ð¼Ð°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              ÐÐºÐ¾ ÑÐ°ÐºÐ°Ñ‚Ðµ, Ð¿Ð¾Ñ‡Ð½ÐµÑ‚Ðµ ÑÐ¾ Ñ€Ð°Ð·Ð³Ð¾Ð²Ð¾Ñ€. ÐŒÐµ Ð²Ð¸ ÐºÐ°Ð¶ÐµÐ¼Ðµ Ð¸ÑÐºÑ€ÐµÐ½Ð¾ Ð´Ð°Ð»Ð¸ Ð²Ð¾Ð¾Ð¿ÑˆÑ‚Ð¾
              Ð²Ñ€ÐµÐ´Ð¸Ð¼Ðµ Ð·Ð° Ð²Ð°ÑˆÐ°Ñ‚Ð° ÑÐ¸Ñ‚ÑƒÐ°Ñ†Ð¸Ñ˜Ð°.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/mk/kontakt?namera=dijagnostika"
                className="inline-flex items-center justify-center rounded-[var(--radius-soft)] bg-flag px-6 py-3.5 font-semibold text-white transition-colors hover:bg-flag-deep"
              >
                ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð¸Ñ€Ð°Ñ˜Ñ‚Ðµ Ð½Ã¨
              </Link>
              <a
                href={`mailto:${MK.contactEmail}`}
                className="inline-flex items-center justify-center rounded-[var(--radius-soft)] border border-rule-strong px-6 py-3.5 font-semibold text-ink transition-colors hover:border-blue hover:bg-blue hover:text-white"
              >
                {MK.contactEmail}
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-mute">
              Ð¡Ð°ÐºÐ°Ñ‚Ðµ Ð¿Ñ€Ð²Ð¾ Ð´Ð° Ð³Ð¾ Ð²Ð¸Ð´Ð¸Ñ‚Ðµ Ð½Ð°ÑˆÐµÑ‚Ð¾ Ñ‡Ð¸Ñ‚Ð°ÑšÐµ Ð½Ð° Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸Ð¾Ñ‚ Ð¿Ð°Ð·Ð°Ñ€?{" "}
              <Link
                href="/markets/macedonia"
                className="underline decoration-flag underline-offset-4 hover:text-blue"
              >
                ÐŸÐ¾Ð³Ð»ÐµÐ´Ð½ÐµÑ‚Ðµ Ñ˜Ð° Ð°Ð½Ð°Ð»Ð¸Ð·Ð°Ñ‚Ð°
              </Link>
              .
            </p>
          </div>
          <MkImage id="mlekarnica" aspect="landscape" />
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "ÐœÐ°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³ ÑÐ¸ÑÑ‚ÐµÐ¼ Ð·Ð° Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸ ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸",
            serviceType: "Ð”Ð¸Ð³Ð¸Ñ‚Ð°Ð»ÐµÐ½ Ð¼Ð°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³ Ð¸ Ð¿Ð°Ð·Ð°Ñ€Ð½Ð° Ð´Ð¸Ñ˜Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ°",
            provider: { "@type": "Organization", name: "Home by Five", url: site.url },
            areaServed: { "@type": "Country", name: "Macedonia" },
            inLanguage: "mk",
            url: `${site.url}/mk`,
            offers: {
              "@type": "Offer",
              name: "Ð¦ÐµÐ»Ð¾ÑÐ½Ð° Ð¿Ð°Ð·Ð°Ñ€Ð½Ð° Ð´Ð¸Ñ˜Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ°",
              price: MK.diagnostics.price,
              priceCurrency: MK.currency,
            },
          }),
        }}
      />
    </>
  );
}

