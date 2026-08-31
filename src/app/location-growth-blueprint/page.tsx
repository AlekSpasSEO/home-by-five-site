import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, CTAButton, Bullets, Note } from "@/components/ui";
import { BlueprintPricing, BLUEPRINT_PAGES } from "@/components/BlueprintPricing";
import { ComparisonSection } from "@/components/ProcessSteps";
import { FAQ } from "@/components/FAQ";
import { faqsFor } from "@/config/faq";
import { FamilyImage } from "@/components/FamilyImage";
import { blueprintServiceSchema } from "@/lib/schema";
import { BLUEPRINT, formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Location Growth Blueprint",
  description:
    "A custom growth plan for every location, from one working day of analysis each. $150 per location. You keep the strategy whether or not you continue.",
  alternates: { canonical: "/location-growth-blueprint" },
};

const DELIVERABLES = [
  "Complete custom growth strategy",
  "Business and market assessment",
  "Local competitive research",
  "Data-backed SWOT",
  "Market benchmarking",
  "Ideal customer profiles",
  "Customer motivations",
  "Objections and purchase triggers",
  "Local search strategy",
  "Google Business Profile strategy where relevant",
  "Citation strategy",
  "Authority and link strategy",
  "Technical SEO priorities",
  "Content opportunities",
  "Programmatic SEO opportunities",
  "GEO and AI-search visibility analysis",
  "AI-search strategy",
  "Organic social media strategy",
  "Paid social strategy",
  "Paid search strategy",
  "Landing-page recommendations",
  "UX and conversion recommendations",
  "Vendor sourcing plan",
  "Recommended third-party tools",
  "Technology stack recommendations",
  "Automation opportunities",
  "Reporting and KPI framework",
  "Prioritised 90-day action plan",
  "Suggested resource allocation",
  "Suggested marketing budget",
  "Clear next actions",
];

export default function BlueprintPage() {
  return (
    <>
      <PageHero
        eyebrow="Phase 1"
        title={
          <>
            {formatMoney(BLUEPRINT.pricePerLocation)} per location.
            <br />
            One working day of analysis each.
          </>
        }
        lede="Before we ask you to buy marketing, we show you what we would actually do. Every location gets its own plan, built from its own market. You keep it either way."
        primaryCta={{ href: "/contact?intent=blueprint", label: "Start my blueprint" }}
        secondaryCta={{ href: "/packages", label: "See execution pricing" }}
        aside={<BlueprintPricing compact showCta={false} />}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What arrives"
          title="Nine sections, per location."
          lede="Not a slide deck of observations. A plan with priorities, owners and sequencing, written so somebody who is not us can execute it."
        />
        <ol className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-3">
          {BLUEPRINT_PAGES.map((page) => (
            <li key={page.n} className="bg-paper p-6">
              <span className="u-label u-tnum text-accent">Page {page.n}</span>
              <p className="u-display mt-3 text-xl text-ink">{page.label}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Everything covered"
              title="The whole list, not the highlights."
              lede="A blueprint is a full commercial diagnosis of one location's market. This is what it contains."
            />
            <div className="mt-8">
              <Note tone="accent">
                The strategy must be market-specific. A London plan is not a
                renamed Dallas plan. A Munich plan accounts for Germany. A Skopje
                plan accounts for Macedonia. A Sydney plan accounts for Australia.
              </Note>
            </div>
            <div className="mt-8">
              <FamilyImage slot="blueprint-morning" aspect="landscape" />
            </div>
          </div>

          <div className="lg:pt-4">
            <Bullets items={DELIVERABLES} columns={1} />
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Afterwards"
          title="Four ways forward. Three of them don't involve us."
          lede="The strategy belongs to the customer whether or not they continue. That is the whole point of charging for it up front."
        />
        <ComparisonSection
          columns={[
            {
              title: "Execute internally",
              body: "Your team runs the plan. It is written with priorities, sequencing and owners so it can be picked up by people who have never spoken to us.",
              note: "Most common for teams with capacity",
            },
            {
              title: "Use your vendors",
              body: "Hand it to the agencies and freelancers you already pay. It gives you something concrete to hold them to, which is usually the missing piece.",
              note: "No further cost",
            },
            {
              title: "Hire Home by Five",
              body: "Take individual services, or subscribe to a bundled monthly package. Either way, the plan you already own is what gets executed.",
              note: "Build a package",
              highlight: true,
            },
          ]}
        />
      </Section>

      <Section>
        <SectionHeading eyebrow="Questions" title="What people ask before starting." />
        <div className="mt-10 max-w-3xl">
          <FAQ items={faqsFor("blueprint")} emitSchema />
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/contact?intent=blueprint" variant="accent">
            Start my blueprint
          </CTAButton>
          <CTAButton href="/how-it-works" variant="outline">
            See the whole process
          </CTAButton>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blueprintServiceSchema()),
        }}
      />
    </>
  );
}
