import Link from "next/link";
import { site } from "@/config/site";

/**
 * The wordmark. Typographic, not a logo file.
 *
 * "FIVE" carries a framing rule beneath it, which is the one recurring
 * device in the identity.
 */
export function Wordmark({
  size = "default",
  invert = false,
  asLink = true,
}: {
  size?: "default" | "small" | "large";
  invert?: boolean;
  asLink?: boolean;
}) {
  const sizes = {
    small: "text-sm",
    default: "text-base sm:text-lg",
    large: "text-2xl sm:text-3xl",
  } as const;

  const inner = (
    <span
      className={`u-display inline-flex items-baseline gap-[0.4em] uppercase tracking-[0.06em] ${sizes[size]} ${
        invert ? "text-bone" : "text-ink"
      }`}
    >
      <span className="font-semibold">{site.wordmark.first}</span>
      <span className="relative font-semibold">
        {site.wordmark.second}
        <span
          aria-hidden
          className="absolute -bottom-[0.18em] left-0 h-[0.09em] w-full bg-accent"
        />
      </span>
    </span>
  );

  if (!asLink) return inner;

  return (
    <Link href="/" aria-label={`${site.name}, home`} className="inline-block">
      {inner}
    </Link>
  );
}
