/**
 * Photography slots.
 *
 * All images are real photographs stored in /public/photography. They are
 * served from this repo rather than hotlinked, so the site has no runtime
 * dependency on an image host. Sources and licence are in
 * public/photography/CREDITS.md.
 *
 * Selection rules, applied to every image here: documentary rather than posed,
 * ordinary homes rather than styled interiors, diverse in age, ethnicity and
 * setting, no single-culture nuclear-family default, and no stock-office
 * clichés. Family life is the subject because it is the point of the brand,
 * not decoration around it.
 *
 * To change an image: drop a new file at the same path, update `alt` here and
 * the row in CREDITS.md. Nothing else references the files.
 */

export type PhotoAspect = "portrait" | "landscape" | "wide" | "square";

export interface PhotoSlot {
  id: string;
  /** Path under /public. */
  src: string;
  /** What the photograph shows. Keep accurate if the file is replaced. */
  alt: string;
  /** Why this image sits in this slot. */
  intent: string;
  aspect: PhotoAspect;
  /** Focal bias for cropping, as a CSS object-position. */
  position?: string;
}

export const PHOTO_SLOTS: Record<string, PhotoSlot> = {
  "hero-arrival": {
    id: "hero-arrival",
    src: "/photography/hero-arrival.jpg",
    alt: "A father carrying his young child along a residential street at the end of the day",
    intent: "The literal promise of the name: work finished, walking home.",
    aspect: "portrait",
    position: "50% 40%",
  },
  "philosophy-dinner": {
    id: "philosophy-dinner",
    src: "/photography/philosophy-dinner.jpg",
    alt: "Three generations of a family eating a meal together at a kitchen table",
    intent: "What the business is supposed to pay for. Ordinary, unstyled, mid-meal.",
    aspect: "landscape",
  },
  "blueprint-morning": {
    id: "blueprint-morning",
    src: "/photography/blueprint-morning.jpg",
    alt: "A business owner working at a kitchen table with a laptop and phone",
    intent: "The owner doing the admin nobody else will. Home, not an office.",
    aspect: "landscape",
  },
  "trade-at-work": {
    id: "trade-at-work",
    src: "/photography/trade-at-work.jpg",
    alt: "A tradesperson's tool belt and drill, mid-job",
    intent: "The actual work behind a service business, shot close and real.",
    aspect: "landscape",
    position: "50% 45%",
  },
  "bike-lesson": {
    id: "bike-lesson",
    src: "/photography/bike-lesson.jpg",
    alt: "A young child riding a balance bike along a residential street",
    intent: "The five o'clock side of the brand, without sentimentality.",
    aspect: "portrait",
    position: "50% 45%",
  },
  "backyard-evening": {
    id: "backyard-evening",
    src: "/photography/backyard-evening.jpg",
    alt: "Family and friends sitting together around a fire pit in a backyard in the evening",
    intent: "Evening, together, nobody working. The payoff image.",
    aspect: "landscape",
  },
  "owner-at-work": {
    id: "owner-at-work",
    src: "/photography/owner-at-work.jpg",
    alt: "A small business owner smiling at his sewing machine in his workshop",
    intent: "An owner-operator who is good at his trade. Reads as any country.",
    aspect: "portrait",
    position: "50% 35%",
  },
  "family-outdoors": {
    id: "family-outdoors",
    src: "/photography/family-outdoors.jpg",
    alt: "A family walking together along a tree-lined path with a bicycle",
    intent: "Unhurried, outdoors, plausibly anywhere we operate.",
    aspect: "landscape",
  },
  "desk-and-daughter": {
    id: "desk-and-daughter",
    src: "/photography/desk-and-daughter.jpg",
    alt: "A man working through paperwork while his daughter leans against him",
    intent:
      "The whole tension of the brand in one frame: the work and the reason for it, in the same room.",
    aspect: "landscape",
  },
  "quiet-moment": {
    id: "quiet-moment",
    src: "/photography/quiet-moment.jpg",
    alt: "A father and his small daughter looking out of a window together",
    intent:
      "Used where a fake team photo would otherwise go. Quiet beats a staged office.",
    aspect: "landscape",
  },
  "local-shopfront": {
    id: "local-shopfront",
    src: "/photography/local-shopfront.jpg",
    alt: "A shop owner standing with his arms folded outside his own storefront",
    intent:
      "A local business anywhere in the world, and deliberately not a Western high street.",
    aspect: "landscape",
    position: "50% 40%",
  },
  "kids-playing": {
    id: "kids-playing",
    src: "/photography/kids-playing.jpg",
    alt: "Two children playing together outdoors in late afternoon light",
    intent: "Bright and unposed. Carries the warm end of the palette.",
    aspect: "landscape",
  },
  "golden-hug": {
    id: "golden-hug",
    src: "/photography/golden-hug.jpg",
    alt: "A family close together outdoors in warm evening light",
    intent: "The emotional close, used sparingly so it keeps its weight.",
    aspect: "wide",
  },
};

export const getPhotoSlot = (id: string): PhotoSlot | undefined => PHOTO_SLOTS[id];
