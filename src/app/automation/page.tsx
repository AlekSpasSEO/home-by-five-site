import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, CTAButton, Bullets, Note } from "@/components/ui";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FAQ } from "@/components/FAQ";
import { faqsFor } from "@/config/faq";
import { AUTOMATION_SAVINGS_SHARE } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Automation and cost savings",
  description:
    "We find repetitive operational work, cost it, and remove it. Priced against measured savings rather than hours, and never built before the baseline is agreed.",
  alternates: { canonical: "/automation" },
};

const STEPS = [
  {
    n: "01",
    title: "Baseline what it costs today",
    body: "Before anything gets built, we measure what the current process actually costs in hours, salary and lost revenue. If we cannot measure it, we do not claim a saving on it.",
    detail: ["Process mapping", "Time and cost per run", "Failure and leakage points"],
  },
  {
    n: "02",
    title: "Calculate the measurable saving",
    body: "A number you can check, built from the baseline. This is the part most automation pitches skip, which is why most automation pitches are unfalsifiable.",
    detail: ["Projected hours removed", "Projected revenue recovered", "Confidence and assumptions stated"],
  },
  {
    n: "03",
    title: "Agree scope, then agree price",
    body: "In that order. Scope first so the price is anchored to something real, rather than the price coming first and the scope bending to fit it.",
    detail: ["Written scope", "Acceptance criteria", "What is explicitly out"],
  },
  {
    n: "04",
    title: "Build, measure, hand over",
    body: "You own what gets built. We measure against the baseline afterwards, and where the model includes a share of savings, that share is calculated from the measured result, not the projection.",
    detail: ["Build and test", "Post-implementation measurement", "Documentation and handover"],
  },
];

const EXAMPLES = [
  "Lead routing",
  "Quote follow-up",
  "Missed-call recovery",
  "Customer support workflows",
  "Recruitment workflows",
  "Scheduling workflows",
  "Reporting automation",
  "Franchise dashboards",
  "Review workflows",
  "Internal administration",
  "CRM automation",
  "AI agents",
  "API integrations",
  "Finance and admin workflows",
];

export default function AutomationPage() {
  return (
    <>
      <PageHero
        eyebrow="Automation and cost savings"
        title="Find the repetitive work. Cost it. Remove it."
        lede="This is a separate service from marketing, and a genuinely different kind of value. Marketing grows the top line. This one takes cost out of the middle, and the saving is measurable in a way marketing rarely is."
        primaryCta={{ href: "/contact?intent=automation", label: "Scope an automation" }}
        secondaryCta={{ href: "/packages", label: "See the wider package" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="How it is priced"
          title="Against measured savings, not against hours."
          lede="Marketing automations needed to deliver the marketing service are included in your package. Large custom operational builds are scoped and priced separately, because they are a different piece of work."
        />
        <div className="mt-10 max-w-2xl space-y-4">
          <Note tone="accent">
            Where it fits, we may charge an agreed share of measured first-year
            cost savings, currently set at{" "}
            {Math.round(AUTOMATION_SAVINGS_SHARE * 100)}%. That figure is a
            configured default, agreed per engagement, and calculated from the
            measured result rather than the projection.
          </Note>
          <Note>
            If the baseline shows the saving is small, we will tell you the build
            is not worth doing. That happens, and it is a better outcome than an
            automation nobody uses.
          </Note>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="The sequence" title="Measure first. Always." />
        <ProcessSteps steps={STEPS} />
      </Section>

      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="What gets built"
            title="Usually the thing somebody does forty times a week."
            lede="The best candidates are rarely glamorous. They are the tasks that are too small to complain about and too frequent to ignore."
            invert
          />
          <div>
            <div className="grid gap-px border border-cream/20 bg-cream/20 sm:grid-cols-2">
              {EXAMPLES.map((example) => (
                <div key={example} className="bg-ink p-4">
                  <p className="text-[0.875rem] text-cream/75">{example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Why we do this at all"
              title="Because the point of the company is to give the owner their evening back."
              lede="Growth that adds administrative load is not really growth. It is the same business with more paperwork."
            />
          </div>
          <Bullets
            items={[
              "Work removed is permanent, unlike a campaign result",
              "Savings compound as the network adds locations",
              "The build is yours, documented and handed over",
              "Nothing is built before the baseline is agreed",
              "We measure afterwards and report against the baseline",
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Questions" title="What people ask about automation." />
        <div className="mt-10 max-w-3xl">
          <FAQ items={faqsFor("automation")} />
        </div>
        <div className="mt-10">
          <CTAButton href="/contact?intent=automation" variant="accent">
            Scope an automation
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
