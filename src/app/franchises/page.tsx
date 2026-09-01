import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, CTAButton, Bullets, Note } from "@/components/ui";
import { LocationScaleSection } from "@/components/LocationScaleSection";
import { ROIReportMockup } from "@/components/ROIReportMockup";
import { TestimonialPlaceholder } from "@/components/TestimonialPlaceholder";
import { InternationalMarketsGrid } from "@/components/InternationalMarketsGrid";
import { FamilyImage } from "@/components/FamilyImage";
import { BLUEPRINT, formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Marketing for franchise brands",
  description:
    "200 locations shouldn't mean 200 marketing problems. Central standards, local execution, per-location reporting and network benchmarking across countries.",
  alternates: { canonical: "/franchises" },
};

const AUDIENCE = [
  "CEO and founder",
  "Franchise development",
  "Director of marketing",
  "CMO",
  "COO",
];

const CAPABILITIES = [
  "Central brand standards with local execution",
  "Per-location reporting",
  "Benchmarking locations against one another",
  "Benchmarking countries and regions where relevant",
  "Reusable page, content and campaign systems",
  "Localized content production",
  "Paid media managed per territory",
  "Local search and profile management at scale",
  "Network-level social with location overrides",
  "Learnings from one location applied across the network",
  "Central vendor management",
  "Franchisee accountability and participation reporting",
  "Production that scales without adding account managers",
  "International localization without a rebuild",
];

export default function FranchisesPage() {
  return (
    <>
      <PageHero
        eyebrow="For franchise brands"
        title="200 locations shouldn't mean 200 marketing problems."
        lede="Marketing complexity compounds with every location you open. The work does not get harder, it gets multiplied, and the part that breaks first is usually consistency rather than strategy."
        primaryCta={{
          href: "/contact?intent=blueprint",
          label: "Run the blueprint across your network",
        }}
        secondaryCta={{ href: "/packages", label: "Model network pricing" }}
        aside={<FamilyImage slot="trade-at-work" aspect="landscape" />}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Who this is for"
          title="The people who own the number, not just the channel."
          lede="Franchise marketing decisions rarely sit with one person. They sit between the brand, the field and the franchisee, which is exactly why they stall."
        />
        <ul className="mt-10 flex flex-wrap gap-2">
          {AUDIENCE.map((role) => (
            <li
              key={role}
              className="border border-rule-strong bg-paper px-4 py-2 font-sans text-[0.6875rem] uppercase tracking-[0.08em] text-ink-soft"
            >
              {role}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="u-display text-2xl text-ink">
              The core problem
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
              Every new location adds a market to understand, a profile to
              manage, a set of local competitors, a franchisee with an opinion,
              and another row that has to reconcile in the report. Ten locations
              is a workload. Two hundred is a different category of problem, and
              most brands solve it by lowering the standard rather than raising
              the system.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
              We run one operating model across the network, and vary the market
              strategy, not the discipline.
            </p>
          </div>
          <div>
            <h3 className="u-display text-2xl text-ink">What that means in practice</h3>
            <Bullets items={CAPABILITIES} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Start at network scale"
          title={
            <>
              Run the blueprint across 5, 30 or 200 markets.
            </>
          }
          lede={`At ${formatMoney(BLUEPRINT.pricePerLocation)} per location and one working day of analysis each, you can diagnose an entire network before committing to a single retainer. Thirty locations is ${formatMoney(BLUEPRINT.pricePerLocation * 30)}. Two hundred is ${formatMoney(BLUEPRINT.pricePerLocation * 200)}.`}
        />
        <div className="mt-10">
          <Note tone="accent">
            No volume discount on the blueprint, and no upsell attached to it. A
            day of analysis is a day of analysis, and you keep every plan whether
            or not you hire anyone to run them.
          </Note>
        </div>
        <div className="mt-12">
          <LocationScaleSection />
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading
          eyebrow="Reporting"
          title="Compare locations. Compare countries. Then act."
          lede="Franchisors do not need more dashboards. They need to know which locations are underperforming their market, and which are underperforming their potential. Those are different problems with different fixes."
          invert
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ROIReportMockup />
          <div>
            <Bullets
              invert
              items={[
                "Location-level commercial metrics, not just rankings",
                "Network comparison so outliers are visible immediately",
                "Country and region comparison for international groups",
                "Participation reporting so you can see who is engaging",
                "Work delivered per location, in plain language",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="International networks"
          title="One operating model, market by market."
          lede="Expansion should not require rebuilding the marketing function. The system stays consistent while the strategy adapts to each country."
        />
        <div className="mt-12">
          <InternationalMarketsGrid showBlurb={false} />
        </div>
        <div className="mt-10">
          <CTAButton href="/markets" variant="outline">
            Explore markets
          </CTAButton>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Proof" title="From the networks we run." />
        <div className="mt-10">
          <TestimonialPlaceholder />
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading
          title="Diagnose the network before you fund the plan."
          lede="Run blueprints across the locations that matter most, see what the markets actually say, then decide what to centralise."
        />
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/contact?intent=blueprint" variant="accent">
            Start with the network
          </CTAButton>
          <CTAButton href="/franchisees" variant="outline">
            For individual franchisees
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
