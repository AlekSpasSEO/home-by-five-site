import type { ReactNode } from "react";
import { Container, CTAButton, Eyebrow } from "@/components/ui";
import { FamilyImage } from "@/components/FamilyImage";

/**
 * Homepage hero.
 *
 * Alternative headline kept in the code below the primary one, since the brief
 * flags it as worth testing. Swap the two to run the test.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Soft wash behind the type, so the page opens warm rather than white. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[34rem] bg-[radial-gradient(60%_60%_at_20%_40%,var(--color-sun-wash),transparent_70%)]"
      />
      <Container width="wide">
        <div className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <Eyebrow tone="accent">
              For businesses with somewhere better to be at 5PM
            </Eyebrow>

            {/*
              A/B candidate B: "One marketing system. One location or two hundred."
              Swap with the h1 below to test.
            */}
            <h1 className="u-display mt-6 text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]">
              Grow every location.
              <br />
              Get <span className="u-underline">home by five</span>.
            </h1>

            <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink-soft">
              We build and run the marketing behind local service businesses and
              franchise networks, so growing the company stops meaning managing
              six vendors.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/location-growth-blueprint" variant="accent">
                Start with a $150 plan
              </CTAButton>
              <CTAButton href="/how-it-works" variant="outline">
                See how it works
              </CTAButton>
            </div>

            <p className="mt-6 text-ink-mute">
              No retainer to start. Keep the plan whether you hire us or not.
            </p>
          </div>

          <FamilyImage
            slot="hero-arrival"
            aspect="portrait"
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}

/** Standard hero for every inner page. */
export function PageHero({
  eyebrow,
  title,
  lede,
  primaryCta,
  secondaryCta,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  aside?: ReactNode;
}) {
  return (
    <section className="bg-cream">
      <Container width="wide">
        <div
          className={`grid gap-10 py-14 sm:py-20 ${
            aside ? "lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : ""
          }`}
        >
          <div className={aside ? "" : "max-w-3xl"}>
            <Eyebrow tone="accent">{eyebrow}</Eyebrow>
            <h1 className="u-display mt-5 text-[2.5rem] leading-[1.06] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {lede}
            </div>
            {primaryCta || secondaryCta ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {primaryCta ? (
                  <CTAButton href={primaryCta.href} variant="accent">
                    {primaryCta.label}
                  </CTAButton>
                ) : null}
                {secondaryCta ? (
                  <CTAButton href={secondaryCta.href} variant="outline">
                    {secondaryCta.label}
                  </CTAButton>
                ) : null}
              </div>
            ) : null}
          </div>
          {aside ? <div className="lg:pt-2">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
