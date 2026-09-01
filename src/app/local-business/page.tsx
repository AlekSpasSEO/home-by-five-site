import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, CTAButton, Bullets } from "@/components/ui";
import { FamilyImage } from "@/components/FamilyImage";
import { ServiceGrid } from "@/components/ServiceGrid";
import { enabledMarkets } from "@/config/markets";
import { BLUEPRINT, formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Marketing for independent local businesses",
  description:
    "One location deserves the same thinking as one hundred. Research-first marketing for owner-operators, family businesses and local service companies.",
  alternates: { canonical: "/local-business" },
};

export default function LocalBusinessPage() {
  const marketCount = enabledMarkets().length;

  return (
    <>
      <PageHero
        eyebrow="For independent local businesses"
        title="One location deserves the same thinking as one hundred."
        lede="This is not a franchise-only product. The research process that gets run across a two-hundred-location network is the same one we run for a single owner-operator, because the questions are the same."
        primaryCta={{
          href: "/contact?intent=blueprint",
          label: `Start my blueprint, ${formatMoney(BLUEPRINT.pricePerLocation)}`,
        }}
        secondaryCta={{ href: "/packages", label: "Build a monthly package" }}
        aside={<FamilyImage slot="owner-at-work" aspect="portrait" />}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Who this is for"
              title="Owner-operators, family businesses, and local service companies."
              lede="Usually somewhere between five and fifty staff. Profitable. Growing. And absolutely certain that at least half the marketing money is being wasted without being able to say which half."
            />
            <p className="mt-8 text-[0.9375rem] leading-relaxed text-ink-soft">
              You do not need more marketing. You need to know which of the
              things you are already doing is worth doing more of, and what the
              market actually looks like from outside your own assumptions.
            </p>
          </div>

          <div>
            <h3 className="u-display text-2xl text-ink">
              What usually turns out to be true
            </h3>
            <Bullets
              items={[
                "The website converts worse than the traffic deserves",
                "The Google Business Profile has never been properly built",
                "Paid spend is buying searches the business already wins for free",
                "Nobody is tracking which calls turn into jobs",
                "The best-performing service has the weakest page",
                "The competitor who looks bigger online is not actually bigger",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Same catalog, one location"
          title="Take the parts you want."
          lede="Every module is optional and priced per location, so a single business is not forced into a bundle designed for a network."
        />
        <ServiceGrid columns={4} />
        <div className="mt-10">
          <CTAButton href="/packages" variant="outline">
            Build a package for one location
          </CTAButton>
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading
          eyebrow="Wherever you are"
          title="This works the same in Atlanta and in Skopje."
          lede={`We operate in ${marketCount} markets. The page you are reading works equally well for a local service owner in Atlanta, London, Toronto, Sydney, Madrid, Paris, Amsterdam, Berlin, Athens, Skopje, Belgrade, Tirana, Pristina, Zagreb, Sofia, Budapest or Bucharest. What changes is the market research, not the standard.`}
          invert
        />
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/markets" variant="invert">
            Find your market
          </CTAButton>
          <CTAButton
            href="/contact?intent=blueprint"
            variant="outline"
            className="border-cream/30 text-cream hover:bg-cream hover:text-ink"
          >
            Start my blueprint
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
