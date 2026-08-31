import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, Container, CTAButton } from "@/components/ui";
import { PackageBuilder } from "@/components/packages/PackageBuilder";
import { FAQ } from "@/components/FAQ";
import { faqsFor } from "@/config/faq";
import { LocationScaleSection } from "@/components/LocationScaleSection";

export const metadata: Metadata = {
  title: "Build a monthly package",
  description:
    "Pick your markets, your location count and the modules you want. Per-location pricing, hard monthly deliverables, ad spend always separate.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Phase 2, execution"
        title={
          <>
            One location or two hundred.
            <br />
            Same system. Different scale.
          </>
        }
        lede="Build the package you actually want. Everything is priced per location, every module is optional, and the numbers update as you go."
      />

      <section className="border-t border-rule bg-paper py-14 sm:py-20">
        <Container width="wide">
          <PackageBuilder />
        </Container>
      </section>

      <Section>
        <SectionHeading
          eyebrow="How pricing scales"
          title="Per location, with a network rate as the count grows."
          lede="The recurring system is priced per location. Larger networks get a network rate on monthly work, because production genuinely gets more efficient at scale. The blueprint does not discount, because a day of analysis is a day of analysis."
        />
        <div className="mt-12">
          <LocationScaleSection />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Questions about packages" title="What people ask here." />
        <div className="mt-10 max-w-3xl">
          <FAQ items={faqsFor("packages")} />
        </div>
        <div className="mt-10">
          <CTAButton href="/services" variant="outline">
            See every unit and what it includes
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
