import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, CTAButton, Bullets, Note } from "@/components/ui";
import { FamilyImage } from "@/components/FamilyImage";
import { TestimonialPlaceholder } from "@/components/TestimonialPlaceholder";
import { BLUEPRINT, formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Marketing for franchisees",
  description:
    "The brand gave you the name. We help you win your market: local search, reviews, paid, local pages, social and conversion, for a single territory.",
  alternates: { canonical: "/franchisees" },
};

const FOCUS = [
  {
    title: "Your market is not the brand's market",
    body: "National creative is built for the average territory, and no territory is average. Your competitors, your search volume and your price sensitivity are local facts.",
  },
  {
    title: "The map pack is where your money is",
    body: "For most franchisees, the difference between position two and position five in local results is a bigger revenue swing than anything happening on the national site.",
  },
  {
    title: "Reviews are a growth channel, not admin",
    body: "Volume, recency and response quality all move local visibility. It is one of the few levers a single franchisee fully controls.",
  },
  {
    title: "Local pages have to be real",
    body: "A location page with the city name swapped in does not rank and does not convert. Yours should carry your actual service area, your actual proof and your actual offers.",
  },
];

export default function FranchiseesPage() {
  return (
    <>
      <PageHero
        eyebrow="For individual franchise owners"
        title={
          <>
            The brand gave you the name.
            <br />
            We&apos;ll help you win your market.
          </>
        }
        lede="You bought a system, and the system works. What it cannot do is know your street, your competitors, or why the operator two suburbs over keeps outranking you."
        primaryCta={{
          href: "/contact?intent=blueprint",
          label: `Blueprint my territory, ${formatMoney(BLUEPRINT.pricePerLocation)}`,
        }}
        secondaryCta={{ href: "/packages", label: "See monthly options" }}
        aside={<FamilyImage slot="bike-lesson" aspect="portrait" />}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Where the gap usually is"
          title="Four things that decide a single territory."
          lede="None of these are things a franchisor can fix centrally, which is exactly why they get left."
        />
        <div className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2">
          {FOCUS.map((item) => (
            <div key={item.title} className="bg-paper p-7">
              <h3 className="u-display text-xl text-ink">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-2xl">
          <Note>
            None of this is a criticism of your franchisor. Central marketing is
            built for consistency across a network, and that is the right job for
            it. Local advantage is a different job.
          </Note>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What we run for a single territory"
              title="The same discipline, one location."
              lede="You are not getting a stripped-down version of the network product. You are getting the same research process applied to one market."
            />
            <div className="mt-8">
              <CTAButton href="/services" variant="outline">
                See the full catalog
              </CTAButton>
            </div>
          </div>
          <Bullets
            items={[
              "Local market and competitor research",
              "Google Business Profile rebuilt and maintained",
              "Review generation and response workflow",
              "Local service and area pages built from real data",
              "Paid search for your territory, with spend paid direct",
              "Local social with content that reflects your actual jobs",
              "Conversion work on the pages your traffic already lands on",
              "Monthly reporting on calls, quotes and booked work",
            ]}
          />
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading
          eyebrow="Start"
          title={`One territory. One working day of analysis. ${formatMoney(BLUEPRINT.pricePerLocation)}.`}
          lede="You keep the plan whether you run it yourself, hand it to whoever already helps you, or ask us to execute it."
          invert
        />
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/contact?intent=blueprint" variant="invert">
            Blueprint my territory
          </CTAButton>
          <CTAButton
            href="/local-business"
            variant="outline"
            className="border-ice/30 text-ice hover:bg-ice hover:text-ink"
          >
            Not a franchisee?
          </CTAButton>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Proof" title="From owners running single territories." />
        <div className="mt-10">
          <TestimonialPlaceholder count={3} />
        </div>
      </Section>
    </>
  );
}
