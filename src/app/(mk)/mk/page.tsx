import type { Metadata } from "next";
import Link from "next/link";
import { MkImage } from "@/components/mk/MkChrome";
import { MkCalculator } from "@/components/mk/MkCalculator";
import { MK, mkMoney } from "@/config/mk";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Маркетинг за компании што пораснале побрзо од своето маркетинг одделение",
  description:
    "Дијагностика, стратегија и извршување за македонски производствени и услужни компании. Пакети од 200 € месечно. Целосна дијагностика за 2 000 €.",
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

/*
  Written obliquely on purpose. An earlier version listed the customer profile
  as facts about them (headcount, value of the plant, sons and daughters in
  management), which reads like a file someone has been keeping. These say the
  same things as situations the reader recognises in themselves.
*/
const ICP = [
  "Фирмата ја граделе родителите, а денес одлуките сè повеќе ги носи следната генерација",
  "Годините вложување во погонот и во луѓето се гледаат, но само кога некој ќе дојде на лице место",
  "Квалитетот веќе го докажавте таму каде што прашуваат за сертификати и бараат документација",
  "Продажбата и понатаму оди преку познанства, препораки и панаѓури",
  "Маркетингот некој го работел покрај своето работно место, најчесто набрзина",
  "Онлајн изгледате помалку сериозно отколку што сте, и тоа го знаете",
];

const DIFFERENTIATORS = [
  {
    n: "01",
    title: "Не наплаќаме како големите агенции",
    body: "Истата работа кај голема регионална агенција почнува на неколку илјади евра месечно, пред да види некој вашиот производ. Кај нас пакетите почнуваат од 200 € и растат само кога расте опфатот.",
  },
  {
    n: "02",
    title: "Работевме на пазари со многу поостра конкуренција",
    body: "Ги воделе сме и услужни и производни компании, B2B и B2C, на пазари како Њујорк, Лос Анџелес и Сингапур. Она што таму е основен стандард, тука сè уште е предност.",
  },
  {
    n: "03",
    title: "Тим од пет луѓе, посветени на вашата сметка",
    body: `Стратегија, содржина, реклами, веб и податоци. ${MK.teamSize} луѓе што знаат што работат, а не еден човек што „покрива сè“ помеѓу други десет клиенти.`,
  },
  {
    n: "04",
    title: "Извештаи во живо, не PDF на крајот од месецот",
    body: "Профил каде во секое време гледате што е направено и што дало резултат, по локација, канал и кампања.",
  },
];

const REPORTING = [
  "Перформанси по локација, канал и кампања на едно место",
  "Дијагностика што ја оценува целата ваша маркетинг активност",
  "SWOT поврзан со бројки, не со мислења",
  "Податоци за пазарот, не само за вашата фирма",
  "Движење на побарувачката и предвидување по сезона",
  "Што е испорачано овој месец и што следи",
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
              <p className="u-label text-flag">За македонски компании</p>
              <h1 className="u-display mt-6 text-[2.6rem] leading-[1.06] sm:text-5xl lg:text-[4rem]">
                Фирмата порасна.
                <br />
                <span className="u-underline">Маркетингот остана</span> од порано.
              </h1>
              <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink-soft">
                Имате производство, луѓе и сертификати. Она што недостига е
                систем што ќе каже што вреди да се работи, ќе го изработи и ќе
                покаже со бројки дали функционирало.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#dijagnostika"
                  className="inline-flex items-center justify-center rounded-[var(--radius-soft)] bg-flag px-6 py-3.5 font-semibold text-white transition-colors hover:bg-flag-deep"
                >
                  Дијагностика за {mkMoney(MK.diagnostics.price)}
                </Link>
                <Link
                  href="#kalkulator"
                  className="inline-flex items-center justify-center rounded-[var(--radius-soft)] border border-rule-strong px-6 py-3.5 font-semibold text-ink transition-colors hover:border-blue hover:bg-blue hover:text-white"
                >
                  Пресметајте пакет
                </Link>
              </div>
              <p className="mt-6 text-ink-mute">
                Пакети од {mkMoney(MK.monthlyFloor)} месечно. Ако продолжите по
                дијагностиката, првите {MK.diagnostics.freeMonths} месеци се
                бесплатни.
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
              eyebrow="За кого е ова"
              title="Веројатно нешто од ова ви звучи познато."
              lede="Не работиме со сите. Ова е направено за компании што одамна имаат што да покажат, но досега немале кој да го покаже како што заслужува."
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
          eyebrow="Зошто ние"
          title="Четири работи што ги нема во понудата на другите."
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
          Услужни и производни компании, B2B и B2C. Различни дејности, ист
          проблем.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Data and reporting                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section id="izveshtai" tone="ink">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Heading
            invert
            eyebrow="Податоци, не чувство"
            title="Профил каде во секое време гледате што работи."
            lede="Секој клиент добива профил што ги спојува извештаите за перформанси со дијагностиката и податоците за пазарот. Одлуките за развој престануваат да бидат прашање на чиј аргумент е погласен на состанокот."
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
              <p className="u-label text-white/60">Што значи тоа во пракса</p>
              <p className="mt-3 leading-relaxed text-white/85">
                Кога ќе одлучувате дали да отворите нов канал, да вложите во нова
                линија или да влезете во нов град, одлуката ја носите со бројки
                за побарувачката и за конкуренцијата, а не по чувство.
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
              eyebrow="Што работиме"
              title="Од фотографија на производ до национална кампања."
              lede="Земате само она што ви треба. Ништо не е задолжително, и ништо не е спакувано за да ве натера да платите повеќе."
            />
            <p className="mt-6 leading-relaxed text-ink-soft">
              Социјални мрежи и содржина, продуктова фотографија, видео, реклами
              и нивно водење, локално SEO, дигитален PR, линкови, брендирање,
              графички дизајн, изработка и одржување на веб, стратегија и
              истражување на пазар и конкуренција.
            </p>
            <div className="mt-8">
              <Link
                href="#kalkulator"
                className="inline-flex items-center justify-center rounded-[var(--radius-soft)] bg-blue px-6 py-3.5 font-semibold text-white transition-colors hover:bg-blue-deep"
              >
                Составете го вашиот пакет
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
          eyebrow="Цени"
          title="Составете пакет сами, или седнете со нас."
          lede={`Пакетите одат од ${mkMoney(MK.monthlyFloor)} месечно за една локација, до ${mkMoney(MK.monthlyCeiling)} за целосна работа на национално ниво. Изберете подолу и цената се пресметува веднаш.`}
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
              eyebrow="Почнете тука"
              title={`Целосна дијагностика на пазарот за ${mkMoney(MK.diagnostics.price)}.`}
              lede="Пред да ве прашаме да купите маркетинг, ви покажуваме што точно би работеле. Добивате стратегија напишана така што вашиот тим може да ја спроведе и без нас."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Анализа на вашиот пазар и на конкуренцијата",
                "Профил на купувачите и што ги тера да купат",
                "Оцена на сè што досега сте работеле во маркетинг",
                "План за 90 дена, со приоритети и одговорни луѓе",
                "Препорачан буџет и каде да се потроши",
                "Стратегијата останува ваша, работевте со нас или не",
              ].map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-white/85">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-sun" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-soft)] bg-white p-7 text-ink">
            <p className="u-label text-flag">Понуда</p>
            <p className="u-display mt-3 text-5xl text-ink">
              {mkMoney(MK.diagnostics.price)}
            </p>
            <p className="mt-2 text-ink-mute">еднократно, целосна дијагностика</p>

            <div className="my-7 h-px bg-rule" />

            <p className="u-display text-2xl text-ink">
              Ако продолжите со нас, првите {MK.diagnostics.freeMonths} месеци се
              бесплатни.
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Значи дека дијагностиката практично се враќа. Ако не продолжите,
              планот сепак останува кај вас.
            </p>

            <div className="mt-8 space-y-3">
              <Link
                href="/mk/kontakt?namera=dijagnostika"
                className="flex w-full items-center justify-center rounded-[var(--radius-soft)] bg-flag px-5 py-3.5 font-semibold text-white transition-colors hover:bg-flag-deep"
              >
                Започнете дијагностика
              </Link>
              <Link
                href="/mk/kontakt?namera=sostanok"
                className="flex w-full items-center justify-center rounded-[var(--radius-soft)] border border-rule-strong px-5 py-3.5 font-semibold text-ink transition-colors hover:border-blue hover:bg-blue hover:text-white"
              >
                Прво само разговор
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
              Прво да го разбереме пазарот, па потоа да ви продаваме маркетинг.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Ако сакате, почнете со разговор. Ќе ви кажеме искрено дали воопшто
              вредиме за вашата ситуација.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/mk/kontakt?namera=dijagnostika"
                className="inline-flex items-center justify-center rounded-[var(--radius-soft)] bg-flag px-6 py-3.5 font-semibold text-white transition-colors hover:bg-flag-deep"
              >
                Контактирајте нè
              </Link>
              <a
                href={`mailto:${MK.contactEmail}`}
                className="inline-flex items-center justify-center rounded-[var(--radius-soft)] border border-rule-strong px-6 py-3.5 font-semibold text-ink transition-colors hover:border-blue hover:bg-blue hover:text-white"
              >
                {MK.contactEmail}
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-mute">
              Сакате прво да го видите нашето читање на македонскиот пазар?{" "}
              <Link
                href="/markets/macedonia"
                className="underline decoration-flag underline-offset-4 hover:text-blue"
              >
                Погледнете ја анализата
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
            name: "Маркетинг систем за македонски компании",
            serviceType: "Дигитален маркетинг и пазарна дијагностика",
            provider: { "@type": "Organization", name: "Home by Five", url: site.url },
            areaServed: { "@type": "Country", name: "Macedonia" },
            inLanguage: "mk",
            url: `${site.url}/mk`,
            offers: {
              "@type": "Offer",
              name: "Целосна пазарна дијагностика",
              price: MK.diagnostics.price,
              priceCurrency: MK.currency,
            },
          }),
        }}
      />
    </>
  );
}
