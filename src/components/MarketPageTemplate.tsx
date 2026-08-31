import Link from "next/link";
import { PageHero } from "@/components/Hero";
import {
  Section,
  SectionHeading,
  CTAButton,
  Bullets,
  Note,
  Container,
} from "@/components/ui";
import {
  CurrencyDisplay,
  LocaleSwitchPlaceholder,
  MarketFacts,
} from "@/components/MarketMeta";
import { BlueprintPricing } from "@/components/BlueprintPricing";
import { FamilyImage } from "@/components/FamilyImage";
import { marketServiceSchema } from "@/lib/schema";
import { regionLabel, type Market } from "@/config/markets";
import type { MarketContent } from "@/config/market-content";
import { BLUEPRINT, formatMoney } from "@/lib/pricing";

/**
 * One template, rich per-market content.
 *
 * Everything specific to a country comes in as data. Nothing about a market is
 * hardcoded in this file, which is what makes adding the twentieth market a
 * config change rather than a build.
 */
export function MarketPageTemplate({
  market,
  content,
}: {
  market: Market;
  content: MarketContent;
}) {
  const considerations = [
    { title: "Local search", items: content.localSearch },
    { title: "Paid media", items: content.paidMedia },
    { title: "Organic social and content", items: content.socialContent },
    { title: "GEO and AI search", items: content.geo },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${content.heroEyebrow} / ${regionLabel(market.region)}`}
        title={content.heroHeadline}
        lede={content.heroSupport}
        primaryCta={{
          href: `/contact?intent=blueprint&markets=${market.code}`,
          label: `Blueprint a ${market.shortName} location`,
        }}
        secondaryCta={{
          href: `/packages?markets=${market.code}&locations=10`,
          label: "Price a package here",
        }}
        aside={
          <div className="space-y-4">
            <MarketFacts market={market} />
            <CurrencyDisplay market={market} />
          </div>
        }
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Who we serve here"
          title={`What Home by Five runs in ${market.name}.`}
        />
        <div className="mt-12 grid gap-px border border-rule bg-rule lg:grid-cols-3">
          {content.serves.map((item) => (
            <div key={item.label} className="bg-paper p-7">
              <h3 className="u-display text-xl text-ink">{item.label}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Local growth challenges"
          title={`What actually makes ${market.name} difficult.`}
          lede="Not a generic list. These are the things that change the plan in this market specifically."
        />
        <div className="mt-12 space-y-px border border-rule bg-rule">
          {content.challenges.map((challenge, i) => (
            <div key={challenge.title} className="bg-paper p-7">
              <div className="flex items-baseline gap-4">
                <span className="u-label u-tnum text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="u-display text-2xl text-ink">{challenge.title}</h3>
                  <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-soft">
                    {challenge.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The blueprint here"
              title={`${formatMoney(BLUEPRINT.pricePerLocation)} per location, written for this market.`}
              lede={content.blueprintNote}
            />
            <div className="mt-8">
              <Note tone="accent">
                A {market.shortName} plan is not a translated plan from somewhere
                else. If a recommendation would not survive contact with this
                market, it does not go in.
              </Note>
            </div>
            <div className="mt-8">
              <FamilyImage slot="markets-street" aspect="wide" />
            </div>
          </div>
          <BlueprintPricing compact />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="What changes in this market"
          title="The considerations that drive the plan."
        />
        <div className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2">
          {considerations.map((group) => (
            <div key={group.title} className="bg-paper p-7">
              <h3 className="u-display text-xl text-ink">{group.title}</h3>
              <Bullets items={group.items} />
            </div>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Example deliverables"
              title="What a month looks like here."
              lede="Volumes and mix are set by your package. This is the shape of the work in this market."
            />
            <Bullets items={content.deliverables} />
            <div className="mt-8">
              <CTAButton
                href={`/packages?markets=${market.code}&locations=10`}
                variant="outline"
              >
                Build a {market.shortName} package
              </CTAButton>
            </div>
          </div>

          <div className="space-y-4">
            <LocaleSwitchPlaceholder market={market} />
            <div className="border border-rule bg-paper p-5">
              <p className="u-label">Coverage</p>
              {/* TODO: replace with the regions actually serviced in this market. */}
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-mute">
                Indicative regions. Real coverage is confirmed per engagement,
                and we do not build pages for areas a business cannot serve
                profitably.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {content.regions.map((region) => (
                  <li
                    key={region}
                    className="border border-rule-strong px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink-soft"
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper" border>
        <Note>{content.languageNote}</Note>
      </Section>

      <section className="border-t border-ink bg-ink py-16 text-bone sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="u-display text-3xl sm:text-4xl lg:text-5xl">
              Let&apos;s understand {market.name} before we sell you marketing.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-bone/70">
              {formatMoney(BLUEPRINT.pricePerLocation)} per location, one working
              day of analysis each, and you keep the plan whether or not you
              continue.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href={`/contact?intent=blueprint&markets=${market.code}`}
                variant="invert"
              >
                Start my blueprint
              </CTAButton>
              <CTAButton
                href="/markets"
                variant="outline"
                className="border-bone/30 text-bone hover:bg-bone hover:text-ink"
              >
                All markets
              </CTAButton>
            </div>
            <p className="mt-8 text-sm text-bone/50">
              Operating in a country not listed?{" "}
              <Link href="/contact" className="underline decoration-accent underline-offset-4">
                Tell us where
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(marketServiceSchema(market)),
        }}
      />
    </>
  );
}
