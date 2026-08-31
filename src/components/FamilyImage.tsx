import Image from "next/image";
import { getPhotoSlot, type PhotoAspect } from "@/config/photography";

const aspects: Record<PhotoAspect, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
};

/**
 * Photography slot.
 *
 * Renders the real photograph when the slot has a `src`, and an art-directed
 * placeholder when it does not. The placeholder states the shot it is standing
 * in for so nobody ships the site thinking it is finished.
 *
 * TODO: set `src` on the slot in config/photography.ts to replace one.
 */
export function FamilyImage({
  slot,
  aspect,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  slot: string;
  aspect?: PhotoAspect;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const photo = getPhotoSlot(slot);
  if (!photo) return null;
  const ratio = aspects[aspect ?? photo.aspect];

  if (photo.src) {
    return (
      <div className={`relative overflow-hidden ${ratio} ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return <PhotoPlaceholder id={photo.id} shot={photo.shot} ratio={ratio} className={className} />;
}

/**
 * A composed stand-in rather than a grey box.
 *
 * Deterministic from the slot id, so the same slot always looks the same and
 * the page does not shuffle between builds.
 */
function PhotoPlaceholder({
  id,
  shot,
  ratio,
  className,
}: {
  id: string;
  shot: string;
  ratio: string;
  className: string;
}) {
  const seed = [...id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const horizon = 46 + (seed % 18);
  const massX = 12 + (seed % 34);
  const massW = 26 + ((seed >> 2) % 26);
  const arcX = 58 + ((seed >> 3) % 24);

  return (
    <figure
      className={`relative overflow-hidden border border-rule bg-bone-deep ${ratio} ${className}`}
      aria-label={`Photography placeholder: ${shot}`}
      role="img"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <rect width="100" height="100" fill="var(--color-bone-deep)" />
        <rect
          y={horizon}
          width="100"
          height={100 - horizon}
          fill="var(--color-blue-wash)"
        />
        <rect
          x={massX}
          y={horizon - 26}
          width={massW}
          height={26}
          fill="var(--color-accent-wash)"
        />
        <circle cx={arcX} cy={horizon - 14} r="9" fill="var(--color-bone)" />
        <line
          x1="0"
          y1={horizon}
          x2="100"
          y2={horizon}
          stroke="var(--color-rule-strong)"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
        <span className="u-label self-start border border-rule-strong bg-bone/85 px-2 py-1 text-[0.625rem] text-ink-soft">
          Photography placeholder
        </span>
        <figcaption className="max-w-md bg-bone/85 p-3 text-[0.8125rem] leading-snug text-ink-soft">
          {shot}
        </figcaption>
      </div>
    </figure>
  );
}
