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
  tone = "bone",
  border = true,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  id?: string;
  tone?: "bone" | "paper" | "ink" | "deep";
  border?: boolean;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  const tones = {
    bone: "bg-bone text-ink",
    paper: "bg-paper text-ink",
    deep: "bg-bone-deep text-ink",
    ink: "bg-ink text-bone",
  } as const;
  return (
    <section
      id={id}
      className={`relative isolate ${tones[tone]} ${
        border ? "border-t border-rule" : ""
      } ${tone === "ink" ? "border-ink" : ""} py-16 sm:py-24 ${className}`}
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
    default: "text-ink-mute",
    accent: "text-accent",
    invert: "text-bone/60",
  } as const;
  return (
    <p className={`u-label ${tones[tone]} ${className}`}>{children}</p>
  );
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
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}
    >
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
        } ${invert ? "text-bone" : "text-ink"}`}
      >
        {title}
      </h2>
      {lede ? (
        <div
          className={`mt-5 text-lg leading-relaxed ${
            invert ? "text-bone/70" : "text-ink-soft"
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
  primary:
    "bg-ink text-bone border border-ink hover:bg-accent hover:border-accent",
  accent:
    "bg-accent text-bone border border-accent hover:bg-accent-deep hover:border-accent-deep",
  outline:
    "bg-transparent text-ink border border-rule-strong hover:border-ink hover:bg-ink hover:text-bone",
  invert:
    "bg-bone text-ink border border-bone hover:bg-accent hover:border-accent hover:text-bone",
  quiet:
    "bg-transparent text-ink border border-transparent underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent px-0",
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
        ? "px-4 py-2.5 text-xs"
        : "px-6 py-3.5 text-[0.8125rem]";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.1em] font-medium transition-colors duration-150 ${sizing} ${ctaClasses[variant]} ${className}`}
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
      className={`border p-5 ${
        invert ? "border-bone/20 bg-bone/5" : "border-rule bg-paper"
      }`}
    >
      <p className={`u-label ${invert ? "text-bone/50" : ""}`}>{label}</p>
      <p
        className={`u-display u-tnum mt-3 text-3xl ${
          invert ? "text-bone" : "text-ink"
        }`}
      >
        {value}
      </p>
      {note ? (
        <p
          className={`mt-2 text-sm ${invert ? "text-bone/50" : "text-ink-mute"}`}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

/** Small numbered marker used in process steps and blueprint page lists. */
export function Marker({ children }: { children: ReactNode }) {
  return (
    <span className="u-label u-tnum text-accent">{children}</span>
  );
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
          className={`flex gap-3 text-[0.9375rem] leading-relaxed ${
            columns === 2 ? "sm:mb-3 sm:break-inside-avoid" : ""
          } ${invert ? "text-bone/75" : "text-ink-soft"}`}
        >
          <span
            aria-hidden
            className={`mt-2.5 h-px w-3 shrink-0 ${
              invert ? "bg-bone/40" : "bg-accent"
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
      className={`border-l-2 py-1 pl-4 text-sm leading-relaxed ${
        tone === "accent"
          ? "border-accent text-ink-soft"
          : "border-rule-strong text-ink-mute"
      }`}
    >
      {children}
    </p>
  );
}
