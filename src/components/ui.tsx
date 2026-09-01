import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/* Layout primitives                                                           */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  width = "default",
  className = "",
}: {
  children: ReactNode;
  width?: "default" | "wide" | "narrow";
  className?: string;
}) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  } as const;
  return (
    <div className={`mx-auto w-full ${widths[width]} px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  id,
  tone = "cream",
  border = false,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  id?: string;
  tone?: "cream" | "paper" | "ink" | "sky" | "sand" | "blue";
  border?: boolean;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  const tones = {
    cream: "bg-cream text-ink",
    paper: "bg-paper text-ink",
    sky: "bg-sky text-ink",
    sand: "bg-sand text-ink",
    ink: "bg-ink text-cream",
    blue: "bg-blue text-white",
  } as const;
  return (
    <section
      id={id}
      className={`relative isolate ${tones[tone]} ${
        border ? "border-t border-rule" : ""
      } py-16 sm:py-24 ${className}`}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  className = "",
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent" | "invert";
}) {
  const tones = {
    default: "text-blue",
    accent: "text-flag",
    invert: "text-white/70",
  } as const;
  return <p className={`u-label ${tones[tone]} ${className}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  invert = false,
  size = "default",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  size?: "default" | "large";
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow ? (
        <Eyebrow tone={invert ? "invert" : "default"} className="mb-4">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={`u-display ${
          size === "large"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-[2.75rem]"
        } ${invert ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {lede ? (
        <div
          className={`mt-5 text-lg leading-relaxed ${
            invert ? "text-white/75" : "text-ink-soft"
          }`}
        >
          {lede}
        </div>
      ) : null}
    </div>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-rule ${className}`} />;
}

/* -------------------------------------------------------------------------- */
/* CTAs                                                                        */
/* -------------------------------------------------------------------------- */

type CTAVariant = "primary" | "accent" | "outline" | "quiet" | "invert";

const ctaClasses: Record<CTAVariant, string> = {
  primary: "bg-blue text-white border border-blue hover:bg-blue-deep hover:border-blue-deep",
  accent: "bg-flag text-white border border-flag hover:bg-flag-deep hover:border-flag-deep",
  outline:
    "bg-transparent text-ink border border-rule-strong hover:border-blue hover:bg-blue hover:text-white",
  invert: "bg-white text-blue border border-white hover:bg-sun hover:border-sun hover:text-ink",
  quiet:
    "bg-transparent text-blue border border-transparent underline decoration-sun decoration-[3px] underline-offset-[6px] hover:text-flag hover:decoration-flag px-0",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: CTAVariant;
  size?: "default" | "small";
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children">) {
  const sizing =
    variant === "quiet"
      ? "py-2"
      : size === "small"
        ? "rounded-[var(--radius-soft)] px-4 py-2.5 text-sm"
        : "rounded-[var(--radius-soft)] px-6 py-3.5 text-[0.9375rem]";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-150 ${sizing} ${ctaClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Content blocks                                                              */
/* -------------------------------------------------------------------------- */

export function MetricCard({
  label,
  value,
  note,
  invert = false,
}: {
  label: string;
  value: ReactNode;
  note?: string;
  invert?: boolean;
}) {
  return (
    <div
      className={`rounded-[var(--radius-soft)] border p-5 ${
        invert ? "border-white/20 bg-white/5" : "border-rule bg-paper"
      }`}
    >
      <p className={`u-label ${invert ? "text-white/60" : ""}`}>{label}</p>
      <p
        className={`u-display u-tnum mt-3 text-3xl ${invert ? "text-white" : "text-ink"}`}
      >
        {value}
      </p>
      {note ? (
        <p className={`mt-2 text-sm ${invert ? "text-white/60" : "text-ink-mute"}`}>
          {note}
        </p>
      ) : null}
    </div>
  );
}

export function Marker({ children }: { children: ReactNode }) {
  return <span className="u-label u-tnum text-flag">{children}</span>;
}

export function Bullets({
  items,
  invert = false,
  columns = 1,
}: {
  items: string[];
  invert?: boolean;
  columns?: 1 | 2;
}) {
  return (
    <ul
      className={`mt-6 space-y-3 ${
        columns === 2 ? "sm:columns-2 sm:gap-x-10 sm:space-y-0" : ""
      }`}
    >
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 leading-relaxed ${
            columns === 2 ? "sm:mb-3 sm:break-inside-avoid" : ""
          } ${invert ? "text-white/80" : "text-ink-soft"}`}
        >
          <span
            aria-hidden
            className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
              invert ? "bg-sun" : "bg-flag"
            }`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A quiet, framed callout. Used for caveats we want read, not skipped. */
export function Note({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <p
      className={`rounded-[var(--radius-soft)] px-4 py-3 leading-relaxed ${
        tone === "accent"
          ? "bg-sun-wash text-ink-soft"
          : "bg-sky text-ink-soft"
      }`}
    >
      {children}
    </p>
  );
}

/** Rounded pill, used for tags and small facts. */
export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "blue" | "sun";
}) {
  const tones = {
    default: "bg-paper text-ink-soft border-rule",
    blue: "bg-blue-wash text-blue border-transparent",
    sun: "bg-sun-wash text-ink border-transparent",
  } as const;
  return (
    <span
      className={`inline-block rounded-[var(--radius-pill)] border px-3.5 py-1.5 text-sm font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
