/**
 * Photography slots.
 *
 * ============================ PLACEHOLDER STATUS ============================
 * TODO: every slot below renders an art-directed placeholder, not a photograph.
 * To replace one, set `src` to a local file in /public/photography or a remote
 * URL, and keep the `alt` text accurate to whatever you actually put there.
 *
 * Sourcing note: remote stock was deliberately not wired in on the first build.
 * The brief bans posed studio work, luxury interiors and the single-culture
 * nuclear-family cliche, and unvetted stock lands on all three. Each slot below
 * carries the shot it needs and the direction for sourcing it, so a real
 * selection can be made and dropped in without touching a component.
 *
 * When `src` is set, remote hosts must also be allowed in next.config.ts.
 * ===========================================================================
 */

export type PhotoAspect = "portrait" | "landscape" | "wide" | "square";

export interface PhotoSlot {
  id: string;
  /** What this photograph should show. */
  shot: string;
  /** Direction for whoever sources or shoots it. */
  sourcing: string;
  /** Alt text. Update this when a real image is set. */
  alt: string;
  aspect: PhotoAspect;
  /** TODO: set to a real image path or URL to replace the placeholder. */
  src?: string;
}

export const PHOTO_SLOTS: Record<string, PhotoSlot> = {
  "hero-arrival": {
    id: "hero-arrival",
    shot: "Owner arriving home at the end of the day, greeted by their kids in the doorway",
    sourcing:
      "Documentary, available light, late afternoon. Work clothes still on. Not posed, not backlit, no golden-hour silhouette.",
    alt: "A business owner arriving home at the end of the working day",
    aspect: "wide",
  },
  "philosophy-dinner": {
    id: "philosophy-dinner",
    shot: "Family eating dinner together in an ordinary kitchen",
    sourcing:
      "Candid, mid-conversation, plates already served. An ordinary home, not a styled interior.",
    alt: "A family eating dinner together at home",
    aspect: "landscape",
  },
  "blueprint-morning": {
    id: "blueprint-morning",
    shot: "Owner working at a desk early in the morning, family life visible in the background",
    sourcing:
      "Kitchen table or home office. Papers and a laptop. A child or partner out of focus behind.",
    alt: "A business owner working early in the morning at home",
    aspect: "portrait",
  },
  "van-end-of-day": {
    id: "van-end-of-day",
    shot: "Owner closing up a service van at the end of a shift",
    sourcing:
      "On a driveway or yard. Real equipment, real wear. Any country, no national symbols.",
    alt: "A service business owner closing up their van at the end of the day",
    aspect: "landscape",
  },
  "bike-lesson": {
    id: "bike-lesson",
    shot: "Parent helping a child learn to ride a bike",
    sourcing:
      "Street or park, slightly overcast. Movement, not a posed portrait.",
    alt: "A parent helping their child learn to ride a bike",
    aspect: "portrait",
  },
  "backyard-evening": {
    id: "backyard-evening",
    shot: "Family sitting outside behind the house in the evening",
    sourcing:
      "Modest garden or yard. Ordinary furniture. Warm but unstyled.",
    alt: "A family sitting outside together in the evening",
    aspect: "landscape",
  },
  "owner-at-work": {
    id: "owner-at-work",
    shot: "Small business owner mid-job, before the day ends",
    sourcing:
      "On site. Hands doing something real. Should pair visually with the arriving-home shot.",
    alt: "A small business owner at work on a job",
    aspect: "portrait",
  },
  "diner-family": {
    id: "diner-family",
    shot: "Owner with their family at a local cafe or diner",
    sourcing:
      "Neighbourhood venue that could plausibly be in several countries. No flags, no landmarks.",
    alt: "A business owner with their family at a local cafe",
    aspect: "landscape",
  },
  "phone-and-child": {
    id: "phone-and-child",
    shot: "Parent carrying a child on one arm while checking a phone with the other",
    sourcing:
      "The tension the brand is about, in one frame. Should read as ordinary, not stressful.",
    alt: "A parent holding their child while checking their phone",
    aspect: "square",
  },
  "team-pod": {
    id: "team-pod",
    shot: "A small working team mid-discussion, screens visible",
    sourcing:
      "Four or five people, real workspace. Not a stock open-plan office, no handshakes, no pointing at laptops.",
    alt: "A small specialist team working together",
    aspect: "landscape",
  },
  "markets-street": {
    id: "markets-street",
    shot: "An ordinary commercial street that could be in several of the target markets",
    sourcing:
      "Shopfronts, signage out of focus or unreadable. Deliberately not identifiable as one country.",
    alt: "An ordinary commercial street of local businesses",
    aspect: "wide",
  },
  "contact-doorstep": {
    id: "contact-doorstep",
    shot: "Owner at the front door of their own home, work day finished",
    sourcing:
      "Late light, keys in hand. Quiet rather than triumphant.",
    alt: "A business owner arriving at their own front door",
    aspect: "landscape",
  },
};

export const getPhotoSlot = (id: string): PhotoSlot | undefined => PHOTO_SLOTS[id];

/** Used by the about page to be straight about the current image state. */
export const PLACEHOLDER_COUNT = Object.values(PHOTO_SLOTS).filter(
  (s) => !s.src,
).length;
