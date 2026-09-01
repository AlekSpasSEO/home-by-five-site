import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, CTAButton, Note, Bullets } from "@/components/ui";
import { InternationalMarketsGrid } from "@/components/InternationalMarketsGrid";
import { FAQ } from "@/components/FAQ";
import { faqsFor } from "@/config/faq";
import { marketsByRegion, enabledMarkets } from "@/config/markets";
import { getMarketContent } from "@/config/market-content";

export const metadata: Metadata = {
  title: "International markets",
  description:
    "Home by Five operates across North America, the UK, Oceania and Europe. One operating system, with strategy and execution adapted market by market.",
  alternates: { canonical: "/markets" },
};

export default function MarketsPage() {
  const regions = marketsByRegion();
  const count = enabledMarkets().length;

  return (
    <>
      <PageHero
        eyebrow="International markets"
        title="Local execution. International scale."
        lede={
          <>
            A service business in Manchester doesn&apos;t compete the same way as
            one in Miami. Berlin is not Sydney. Skopje is not Toronto. The system
            stays consistent. The market strategy doesn&apos;t.
          </>
        }
        primaryCta={{ href: "/contact?intent=blueprint", label: "Start a blueprint" }}
        secondaryCta={{ href: "/packages", label: "Price a package" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow={`${count} markets`}
          title="One system. One city or two hundred locations. Built to work market by market."
          lede="Every market below has its own page, written for that market. We do not publish a country page we have nothing specific to say about."
        />
        <div className="mt-12">
          <InternationalMarketsGrid />
        </div>
      </Section>

      {regions.map(({ region, markets }) => (
        <Section key={region.id} id={region.id}>
          <SectionHeading eyebrow={region.label} title={region.blurb} />
          <div className="mt-10 divide-y divide-rule border-y border-rule">
            {markets.map((market) => {
              const content = getMarketContent(market.code);
              return (
                <Link
                  key={market.code}
                  href={`/markets/${market.slug}`}
                  className="group grid gap-4 py-6 transition-colors hover:bg-paper sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10"
                >
                  <div>
                    <h3 className="u-display text-2xl text-ink group-hover:text-flag">
                      {market.name}
                    </h3>
                    <p className="u-label mt-2">
                      {market.currency} / {market.targetLanguages[0]}
                    </p>
                  </div>
                  <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
                    {content?.heroHeadline}
                  </p>
                </Link>
              );
            })}
          </div>
        </Section>
      ))}

      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHeading
            eyebrow="How localization works"
            title="English first. Local language properly, or not yet."
            lede="Every market page is published in English on this build. Local-language production is a scoped workstream with native writers and human review before anything publishes. We would rather say a market is not localized yet than machine translate it and pretend."
            invert
          />
          <Bullets
            invert
            items={[
              "Country-level market pages with real local content",
              "Localization-ready routing and hreflang structure",
              "Canonical logic that will not create duplicate international pages",
              "Local currency and terminology held in configuration",
              "Market-specific CTA and pricing overrides where they exist",
              "No automatic machine translation shown to users",
              "No IP-based forced redirects, ever",
              "Country suggestion is fine, forced geo-routing is not",
            ]}
          />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Questions" title="About working across countries." />
        <div className="mt-10 max-w-3xl">
          <FAQ items={faqsFor("international")} emitSchema />
        </div>
        <div className="mt-10">
          <Note>
            Operating somewhere not on this list? Tell us where. Adding a market
            is a configuration change plus the research to say something true
            about it, and the second part is the part that takes time.
          </Note>
        </div>
        <div className="mt-8">
          <CTAButton href="/contact" variant="accent">
            Ask about another market
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
