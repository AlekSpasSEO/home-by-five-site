/**
 * Photography for the Macedonian site.
 *
 * ====================== FILES ARE STAND-INS RIGHT NOW ======================
 * Every file in /public/photography/mk is a generated placeholder carrying the
 * shot it represents. The real photographs exist but were supplied as chat
 * attachments, which cannot be written to disk from here.
 *
 * To finish: save each photograph over the file of the same name in
 * public/photography/mk/, then delete scripts/mk-placeholders.py. No code
 * changes are needed. Keep the `alt` text accurate if a subject changes.
 * ==========================================================================
 *
 * These are real Macedonian businesses of exactly the size this site is
 * written for, which is why they are worth using instead of stock.
 */

export type MkAspect = "landscape" | "portrait" | "wide" | "square";

export interface MkPhoto {
  id: string;
  src: string;
  alt: string;
  /** What this image is doing on the page. */
  intent: string;
  aspect: MkAspect;
}

export const MK_PHOTOS: Record<string, MkPhoto> = {
  klinika: {
    id: "klinika",
    src: "/photography/mk/klinika-recepcija.jpg",
    alt: "Приемен пулт во стоматолошка клиника, вработена предава документи на пациентка",
    intent: "Услужен бизнис со повеќе вработени. Првиот контакт со клиентот.",
    aspect: "landscape",
  },
  restoran: {
    id: "restoran",
    src: "/photography/mk/restoran-smena.jpg",
    alt: "Ресторан во полна смена, менаџер ја координира екипата",
    intent: "Операција што работи додека маркетингот треба да се води сам.",
    aspect: "landscape",
  },
  fabrika: {
    id: "fabrika",
    src: "/photography/mk/fabrika-pakuvanje.jpg",
    alt: "Работнички пакуваат теглички во производствен погон",
    intent: "Производство со сертификати и извоз. Јадрото на целната група.",
    aspect: "landscape",
  },
  mlekarnica: {
    id: "mlekarnica",
    src: "/photography/mk/mlekarnica-shalter.jpg",
    alt: "Продавница за традиционални млечни производи, сопственик разговара со посетител",
    intent: "Семеен бизнис со бренд и приказна што не е раскажана онлајн.",
    aspect: "landscape",
  },
  salon: {
    id: "salon",
    src: "/photography/mk/salon-mebel.jpg",
    alt: "Салон за мебел, продавач им покажува понуда на пар клиенти",
    intent: "Продажба во салон, каде онлајн само ја носи посетата.",
    aspect: "landscape",
  },
  linija: {
    id: "linija",
    src: "/photography/mk/linija-dzem.jpg",
    alt: "Производствена линија за полнење теглички",
    intent: "Капацитет што бара повеќе побарувачка, не повеќе машини.",
    aspect: "portrait",
  },
  lakirnica: {
    id: "lakirnica",
    src: "/photography/mk/lakirnica.jpg",
    alt: "Работник бои метален елемент во лакирница",
    intent: "Занает и опрема. Она за што вреди да се раскаже.",
    aspect: "portrait",
  },
  pogon: {
    id: "pogon",
    src: "/photography/mk/kopce-stop.jpg",
    alt: "Копче за итно запирање на производствена опрема",
    intent: "Детаљ што го носи впечатокот за сериозно производство.",
    aspect: "wide",
  },
  proizvod: {
    id: "proizvod",
    src: "/photography/mk/proizvod-salfeti.jpg",
    alt: "Пакувања готов производ подготвени за пазар",
    intent: "Готовиот производ, снимен како што треба да изгледа онлајн.",
    aspect: "wide",
  },
};

export const getMkPhoto = (id: string): MkPhoto | undefined => MK_PHOTOS[id];
