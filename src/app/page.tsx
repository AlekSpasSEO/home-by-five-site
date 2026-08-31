import type { Metadata } from "next";
import { HomeHero } from "@/components/Hero";
import {
  Section,
  SectionHeading,
  CTAButton,
  Container,
  Eyebrow,
} from "@/components/ui";
import { VendorMess } from "@/components/VendorMess";
import { BlueprintPricing } from "@/components/BlueprintPricing";
import { ComparisonSection } from "@/components/ProcessSteps";
import { ServiceGrid } from "@/components/ServiceGrid";
import { LocationScaleSection } from "@/components/LocationScaleSection";
import { InternationalMarketsGrid } from "@/components/InternationalMarketsGrid";
import { ROIReportMockup } from "@/components/ROIReportMockup";
import { FamilyImage } from "@/components/FamilyImage";
import { FAQ } from "@/components/FAQ";
import { faqsFor } from "@/config/faq";
import { BLUEPRINT, formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Marketing built by location, for franchises and local service businesses",
  description:
    "One marketing system for one location or two hundred. Start with a $150 per location growth blueprint. Keep the strategy whether you hire us or not.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section tone="paper">
        <SectionHeading
          eyebrow="The problem"
          title="You shouldn't need six vendors to market one location."
          lede="Most owners we meet are not short of marketing. They are short of a single place where the marketing adds up."
        />
        <div className="mt-12">
          <VendorMess />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Start with the plan"
              title={
                <>
                  {formatMoney(BLUEPRINT.pricePerLocation)} per location.
                  <br />
                  Then decide.
                </>
              }
              lede="Before we ask you to buy marketing, we show you what we would actually do. One working day of analysis per location, delivered as a plan you keep."
            />
            <p className="mt-8 max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft">
              Every blueprint covers the market, the customer, the competition,
              search, paid, social, conversion, technology and a prioritised
              90-day plan. It is written for your location, not adapted from
              someone else&apos;s.
            </p>
            <div className="mt-8">
              <CTAButton href="/location-growth-blueprint" variant="outline">
                See what is in a blueprint
              </CTAButton>
            </div>
          </div>

          <BlueprintPricing />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Then choose who executes it"
          title="We don't hold the strategy hostage."
          lede="The plan is yours the moment it is delivered. What happens next is a separate decision, and a genuinely open one."
        />
        <ComparisonSection
          columns={[
            {
              title: "Your team",
              body: "Use the blueprint internally. It is written to be executed by someone who is not us, with priorities, owners and sequencing already set.",
              note: "No further cost",
            },
            {
              title: "Your vendors",
              body: "Hand the plan to the partners you already have. It tells them what to do and gives you something concrete to hold them to.",
              note: "No further cost",
            },
            {
              title: "Home by Five",
              body: "Turn the plan into a monthly execution package. Pick the modules you want, at the volume you want, priced by location.",
              note: "Build a package",
              highlight: true,
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Everything under one roof"
          title="Twelve categories of work. One production system."
          lede="Take one. Take all of them. The point is that they are planned together and reported together."
        />
        <ServiceGrid />
        <div className="mt-10">
          <CTAButton href="/services" variant="outline">
            See the full catalog and prices
          </CTAButton>
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading
          eyebrow="Built for location economics"
          title="One location or two hundred. Same system. Different scale."
          invert
        />
        <div className="mt-12">
          <LocationScaleSection invert />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="International markets"
          title="Local execution. International scale."
          lede={
            <>
              A service business in Manchester doesn&apos;t compete the same way
              as one in Miami. Berlin is not Sydney. Skopje is not Toronto. The
              system stays consistent. The market strategy doesn&apos;t.
            </>
          }
        />
        <div className="mt-12">
          <InternationalMarketsGrid />
        </div>
        <div className="mt-10">
          <CTAButton href="/markets" variant="outline">
            Explore markets
          </CTAButton>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What we report"
              title={
                <>
                  First we show what we did.
                  <br />
                  Then we show whether it worked.
                </>
              }
              lede="Commercial metrics at the top, operational metrics underneath. Reporting is included with every monthly package, because measuring the work is part of doing the work."
            />
          </div>
          <ROIReportMockup />
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <FamilyImage slot="philosophy-dinner" aspect="landscape" />
          <div>
            <Eyebrow tone="accent">The Home by Five philosophy</Eyebrow>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
              <p className="u-display text-3xl text-ink sm:text-4xl">
                A business is supposed to give you a life. Not become the only
                thing in it.
              </p>
              <p>
                We like ambitious businesses. We like hard work. We like clear
                numbers.
              </p>
              <p>
                We also think the owner of a growing company should eventually be
                able to shut the laptop, leave work and go home. That is the
                point of better systems.
              </p>
            </div>
            <div className="mt-8">
              <CTAButton href="/about" variant="quiet">
                How we are built
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Common questions" title="Before you ask." />
        <div className="mt-10 max-w-3xl">
          <FAQ items={faqsFor("general").slice(0, 8)} emitSchema />
        </div>
        <div className="mt-8">
          <CTAButton href="/how-it-works" variant="quiet">
            How the whole thing works
          </CTAButton>
        </div>
      </Section>

      <section className="border-t border-ink bg-ink py-20 text-bone sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <h2 className="u-display text-4xl sm:text-5xl lg:text-6xl">
              Let&apos;s understand the market before we sell you marketing.
            </h2>
            <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {[
                `${formatMoney(BLUEPRINT.pricePerLocation)} per location`,
                "One working day per market",
                "Keep the complete plan",
                "No obligation to continue",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 border-b border-bone/15 py-2 text-[0.9375rem] text-bone/80"
                >
                  <span aria-hidden className="h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/contact?intent=blueprint" variant="invert">
                Start my blueprint
              </CTAButton>
              <CTAButton
                href="/packages"
                variant="outline"
                className="border-bone/30 text-bone hover:bg-bone hover:text-ink"
              >
                Talk through the numbers
              </CTAButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
