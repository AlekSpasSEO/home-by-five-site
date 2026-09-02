/**
 * Macedonian market configuration.
 *
 * The Macedonian site is its own thing: its own audience, its own service
 * catalogue, its own prices and its own language. It deliberately does not
 * reuse the international package engine, because the offer is different in
 * shape, not just in currency.
 *
 * CURRENCY NOTE: prices were given as dollar figures (200, 2 000, 10 000) and
 * are presented here in EUR at the same numerals, which is what this audience
 * quotes and budgets in. That is a repricing decision, not a conversion.
 * Confirm the numbers before the site is promoted.
 */

export const MK = {
  currency: "EUR",
  symbol: "€",

  /** Paid diagnostic. The entry offer. */
  diagnostics: {
    price: 2000,
    /** Months of execution credited back if they continue with us. */
    freeMonths: 2,
  },

  /** Published floor and ceiling for monthly packages. */
  monthlyFloor: 200,
  monthlyCeiling: 10000,

  /** People on the account. */
  teamSize: 5,

  contactEmail: "skopje@homebyfive.com",
} as const;

/* -------------------------------------------------------------------------- */
/* Service catalogue                                                           */
/* -------------------------------------------------------------------------- */

export type MkGroupId =
  | "socijalni"
  | "reklami"
  | "prebaruvanje"
  | "brend"
  | "veb"
  | "strategija";

export interface MkService {
  id: string;
  label: string;
  /** One line the owner will actually understand. */
  note: string;
  group: MkGroupId;
  /** EUR per month at a single-location scale. */
  monthly: number;
  /** One-off cost where the work is a project rather than a retainer. */
  oneTime?: number;
  /** Media budget is paid by the client, directly. */
  adSpendSeparate?: boolean;
}

export interface MkGroup {
  id: MkGroupId;
  label: string;
  blurb: string;
}

export const MK_GROUPS: MkGroup[] = [
  {
    id: "socijalni",
    label: "Социјални мрежи и содржина",
    blurb: "Она што луѓето го гледаат секој ден, направено од вашата вистинска работа.",
  },
  {
    id: "reklami",
    label: "Реклами",
    blurb: "Платените канали, поставени и водени со мерење, не со претпоставки.",
  },
  {
    id: "prebaruvanje",
    label: "Пребарување и авторитет",
    blurb: "Google, локални резултати и одговорите што ги даваат вештачките асистенти.",
  },
  {
    id: "brend",
    label: "Бренд и дизајн",
    blurb: "Како изгледате кога некој ве гледа за прв пат.",
  },
  { id: "veb", label: "Веб", blurb: "Страницата што ја претвора посетата во контакт." },
  {
    id: "strategija",
    label: "Стратегија и истражување",
    blurb: "Што да работите следно, врз основа на бројки за вас и за пазарот.",
  },
];

export const MK_SERVICES: MkService[] = [
  {
    id: "objavi",
    label: "Објави на социјални мрежи",
    note: "Планирање, изработка и објавување низ месецот.",
    group: "socijalni",
    monthly: 250,
  },
  {
    id: "produkt-foto",
    label: "Продуктова фотографија",
    note: "Снимање на вашите производи, обработено и подготвено за објава.",
    group: "socijalni",
    monthly: 300,
  },
  {
    id: "sodrzhina",
    label: "Креирање содржина",
    note: "Текстови, визуели и постови што ги раскажуваат вашите производи.",
    group: "socijalni",
    monthly: 350,
  },
  {
    id: "video",
    label: "Видео и кратки формати",
    note: "Снимање и монтажа на кратки видеа за Reels, TikTok и YouTube.",
    group: "socijalni",
    monthly: 450,
  },
  {
    id: "reklami-izrabotka",
    label: "Изработка на реклами",
    note: "Визуели и формати за секоја платформа.",
    group: "reklami",
    monthly: 300,
  },
  {
    id: "reklami-tekst",
    label: "Рекламни текстови",
    note: "Пораки што се тестираат, не се погодуваат.",
    group: "reklami",
    monthly: 200,
  },
  {
    id: "reklami-menadzment",
    label: "Водење на рекламите",
    note: "Поставување, оптимизација и мерење на кампањите.",
    group: "reklami",
    monthly: 450,
    adSpendSeparate: true,
  },
  {
    id: "lokalno-seo",
    label: "Локално SEO",
    note: "Да ве најдат кога бараат во вашиот град, не во целата држава.",
    group: "prebaruvanje",
    monthly: 400,
  },
  {
    id: "citati",
    label: "Локални именици и цитати",
    note: "Исти податоци за фирмата насекаде каде што се појавувате.",
    group: "prebaruvanje",
    monthly: 150,
  },
  {
    id: "linkovi",
    label: "Линкови и авторитет",
    note: "Спомнувања од медиуми и сајтови што навистина значат нешто.",
    group: "prebaruvanje",
    monthly: 500,
  },
  {
    id: "digitalen-pr",
    label: "Дигитален PR",
    note: "Приказни што медиумите сакаат да ги објават.",
    group: "prebaruvanje",
    monthly: 600,
  },
  {
    id: "brendiranje",
    label: "Брендирање",
    note: "Име, изглед и глас што издржуваат десет години.",
    group: "brend",
    monthly: 0,
    oneTime: 2500,
  },
  {
    id: "grafichki-dizajn",
    label: "Графички дизајн",
    note: "Материјали за продажба, амбалажа и настани.",
    group: "brend",
    monthly: 300,
  },
  {
    id: "veb-izrabotka",
    label: "Изработка на веб-страница",
    note: "Нова страница, направена да носи контакти.",
    group: "veb",
    monthly: 0,
    oneTime: 3500,
  },
  {
    id: "veb-odrzuvanje",
    label: "Одржување на веб-страница",
    note: "Измени, брзина, безбедност и мерење.",
    group: "veb",
    monthly: 200,
  },
  {
    id: "strategija-custom",
    label: "Прилагодена стратегија",
    note: "Квартален план што вашиот тим може да го спроведе.",
    group: "strategija",
    monthly: 600,
  },
  {
    id: "pazarno-istrazuvanje",
    label: "Пазарно истражување",
    note: "Колку е голем пазарот, кој купува и по која цена.",
    group: "strategija",
    monthly: 500,
  },
  {
    id: "konkurencija",
    label: "Истражување на конкуренција",
    note: "Што работат другите, што им функционира и каде се слаби.",
    group: "strategija",
    monthly: 400,
  },
];

/* -------------------------------------------------------------------------- */
/* Scale                                                                       */
/* -------------------------------------------------------------------------- */

export interface MkScale {
  id: string;
  label: string;
  note: string;
  /** Multiplier applied to monthly service prices. */
  factor: number;
}

export const MK_SCALES: MkScale[] = [
  {
    id: "lokalen",
    label: "Еден град",
    note: "Една локација или еден град.",
    factor: 1,
  },
  {
    id: "regionalen",
    label: "Регион",
    note: "Неколку градови или регионална дистрибуција.",
    factor: 1.7,
  },
  {
    id: "nacionalen",
    label: "Цела Македонија",
    note: "Национален пазар, повеќе канали и локации.",
    factor: 2.8,
  },
];

/** Always included with any monthly package. */
export const MK_INCLUDED = [
  "Профил со извештаи во живо",
  "Дијагностика на целата маркетинг активност",
  "Месечна работна сесија со тимот",
  "Пристап до податоците за пазарот",
];

export const mkServicesByGroup = (group: MkGroupId): MkService[] =>
  MK_SERVICES.filter((s) => s.group === group);

export const getMkService = (id: string): MkService | undefined =>
  MK_SERVICES.find((s) => s.id === id);

/**
 * EUR, no decimals, Macedonian thousands separator.
 *
 * Formatted by hand rather than through Intl. Node and the browser ship
 * different ICU data for mk-MK, so Intl produced "2.000 €" during the build and
 * "1,400 €" after hydration on the same page.
 */
export const mkMoney = (amount: number): string => {
  const whole = String(Math.round(amount));
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${grouped} ${MK.symbol}`;
};
