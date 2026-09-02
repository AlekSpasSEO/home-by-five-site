import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, CTAButton, Note } from "@/components/ui";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ROIReportMockup } from "@/components/ROIReportMockup";
import { VendorMess } from "@/components/VendorMess";
import { BLUEPRINT, formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Research first, then execution. A paid diagnostic per location, then a monthly package you assemble yourself, then reporting tied to commercial outcomes.",
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  {
    n: "01",
    title: "We buy ourselves the right to have an opinion",
    body: `Every engagement starts with a Location Growth Blueprint at ${formatMoney(BLUEPRINT.pricePerLocation)} per location, one working day of analysis each. Nobody recommends a budget before they have looked at the market.`,
    detail: [
      "Market and competitive research",
      "Customer profiles and purchase triggers",
      "Search, paid, social and conversion review",
      "Technology and automation review",
      "Prioritised 90-day plan",
    ],
  },
  {
    n: "02",
    title: "You decide who executes it",
    body: "The plan is yours on delivery. Run it internally, hand it to your existing vendors, or hire us. There is no version of this where the strategy is withheld to force a retainer.",
    detail: [
      "No obligation to continue",
      "No redaction, no summary version",
      "Written to be executed by someone else",
    ],
  },
  {
    n: "03",
    title: "You assemble the package, not us",
    body: "If you do want us running it, you pick the modules and the volumes. Everything is priced per location, so the package scales with the business rather than being renegotiated every time you open a city.",
    detail: [
      "Twelve modules, all optional",
      "Quantities you set, not tiers you decode",
      "Network rate applied as location count grows",
      "Ad spend always separate",
    ],
  },
  {
    n: "04",
    title: "One production system runs the work",
    body: "Specialists do specialist work inside a shared system, rather than ten vendors improvising in parallel. That is what makes consistent output across thirty locations possible without thirty account managers.",
    detail: [
      "Central standards, local execution",
      "Network templates with market overrides",
      "Human review before anything publishes",
      "Automation removing the repetitive parts",
    ],
  },
  {
    n: "05",
    title: "We report what we did, then whether it worked",
    body: "Commercial metrics first: spend, leads, bookings, revenue, cost per acquisition. Operational metrics underneath. Reporting is included, because measuring the work is part of doing the work.",
    detail: [
      "Location and network comparison",
      "Country comparison for international networks",
      "Work delivered and next priorities",
      "No charge for the report",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="The operating model"
        title="Research first. Then execution. Then proof."
        lede="Most agencies sell you the retainer and figure out the strategy afterwards. We do it the other way around, and we charge for the strategy so it stays honest."
        primaryCta={{
          href: "/location-growth-blueprint",
          label: "Start with a blueprint",
        }}
        secondaryCta={{ href: "/packages", label: "Build a package" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Why this exists"
          title="Marketing complexity is an operations problem wearing a marketing costume."
          lede="By the time an owner has six vendors, the bottleneck is no longer any single channel. It is that nobody owns the whole picture except the person who has the least time to."
        />
        <div className="mt-12">
          <VendorMess />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="The process" title="Five steps, in this order." />
        <ProcessSteps steps={STEPS} />
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What you get monthly"
              title="A report an owner can read in four minutes."
              lede="Not a dashboard export. What we did, what it produced, and what we are doing next."
            />
            <div className="mt-8">
              <Note tone="accent">
                Where a metric is not tracked, we say so rather than substituting
                a proxy. A number you cannot reconcile is worse than a gap.
              </Note>
            </div>
          </div>
          <ROIReportMockup />
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading
          eyebrow="Start"
          title="Let's understand the market before we sell you marketing."
          invert
        />
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/contact?intent=blueprint" variant="invert">
            Start my blueprint
          </CTAButton>
          <CTAButton
            href="/packages"
            variant="outline"
            className="border-ice/30 text-ice hover:bg-ice hover:text-ink"
          >
            Talk through the numbers
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
