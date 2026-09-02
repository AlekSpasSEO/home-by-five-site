import Image from "next/image";
import { getPhotoSlot, type PhotoAspect } from "@/config/photography";
import { assetPath } from "@/lib/asset";

const aspects: Record<PhotoAspect, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
};

/**
 * A photograph from the slot registry.
 *
 * Slots are defined in config/photography.ts. Passing an unknown slot renders
 * nothing rather than a broken frame.
 */
export function FamilyImage({
  slot,
  aspect,
  className = "",
  priority = false,
  rounded = true,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  slot: string;
  aspect?: PhotoAspect;
  className?: string;
  priority?: boolean;
  rounded?: boolean;
  sizes?: string;
}) {
  const photo = getPhotoSlot(slot);
  if (!photo) return null;

  return (
    <div
      className={`relative overflow-hidden bg-sky ${aspects[aspect ?? photo.aspect]} ${
        rounded ? "rounded-[var(--radius-soft)]" : ""
      } ${className}`}
    >
      <Image
        src={assetPath(photo.src)}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        style={photo.position ? { objectPosition: photo.position } : undefined}
        className="object-cover"
      />
    </div>
  );
}
