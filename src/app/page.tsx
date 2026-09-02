import type { Metadata } from "next";
import { HomeHero } from "@/components/Hero";
import {
  Section,
  SectionHeading,
  CTAButton,
  Container,
  Eyebrow,
  Pill,
} from "@/components/ui";
import { ComparisonSection } from "@/components/ProcessSteps";
import { FamilyImage } from "@/components/FamilyImage";
import { marketsByRegion } from "@/config/markets";
import { BLUEPRINT, formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Marketing that works for every location, without running your life",
  description:
    "One marketing system for one location or two hundred. Start with a $150 per location growth plan, and keep it whether you hire us or not.",
  alternates: { canonical: "/" },
};

/*
  Homepage structure is deliberately value-first.

  The detail lives on the pages built for it: the full catalog on /services, the
  arithmetic on /packages, the deliverable list on /location-growth-blueprint.
  This page only has to answer three questions: what is broken, what is
  different about the way we fix it, and what it costs to find out.
*/

const PROMISES = [
  {
    title: "You find out before you commit",
    body: "Every engagement opens with a paid plan for your actual market, not a pitch. If the honest answer is that you should fix conversion before spending more, that is what it says.",
  },
  {
    title: "The plan is yours either way",
    body: "Run it with your own team, hand it to the vendors you already pay, or hire us. We do not hold strategy back to force a retainer.",
  },
  {
    title: "One system instead of six vendors",
    body: "Search, ads, social, content, local, build and automation planned together and reported together, so you stop being the integration layer.",
  },
  {
    title: "Priced by location, so growth isn't a renegotiation",
    body: "The same model covers one shop and two hundred territories. Opening a city should not mean rebuilding your marketing function.",
  },
];

export default function HomePage() {
  const regions = marketsByRegion();

  return (
    <>
      <HomeHero />

      {/* The problem, in the owner's own terms rather than as a vendor diagram. */}
      <Section tone="paper">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The problem"
              title={
                <>
                  You didn&apos;t start a business to{" "}
                  <span className="u-highlight">manage marketing vendors</span>.
                </>
              }
              lede="Most owners we meet are not short of marketing. They are short of one place where it all adds up."
            />
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              There is an agency for search, someone else for ads, a writer, a
              developer, a tool nobody remembers buying, and a folder of reports
              that never quite agree. None of them are wrong exactly. They just
              do not add up to a plan, and the only person who can see the whole
              picture is the one with the least time to look at it.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              That is the job we take off you.
            </p>
          </div>
          <FamilyImage slot="desk-and-daughter" aspect="landscape" />
        </div>
      </Section>

      {/* What is actually different. This is the core value section. */}
      <Section tone="sky">
        <SectionHeading
          eyebrow="What's different"
          title="We sell you the answer before we sell you the work."
          lede="Four commitments that change how this feels compared to every agency you have already tried."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-soft)] bg-rule sm:grid-cols-2">
          {PROMISES.map((promise, i) => (
            <div key={promise.title} className="bg-paper p-7">
              <span className="u-label u-tnum text-flag">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="u-display mt-3 text-2xl text-ink">{promise.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{promise.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The offer, kept to the value rather than the deliverable list. */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <FamilyImage slot="blueprint-morning" aspect="landscape" />
          <div>
            <SectionHeading
              eyebrow="Where it starts"
              title={
                <>
                  A real plan for{" "}
                  <span className="u-underline">
                    {formatMoney(BLUEPRINT.pricePerLocation)}
                  </span>{" "}
                  a location.
                </>
              }
              lede="One working day of research per location, turned into a growth plan written for that market. Then you decide what happens next, with no obligation to continue."
            />
            <div className="mt-7 flex flex-wrap gap-2">
              <Pill tone="blue">Your market, not a template</Pill>
              <Pill tone="blue">90-day priorities</Pill>
              <Pill tone="sun">Yours to keep</Pill>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/location-growth-blueprint" variant="accent">
                See what you get
              </CTAButton>
              <CTAButton href="/packages" variant="outline">
                Price a monthly package
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      {/* The strongest differentiator gets its own section. */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Then it's your call"
          title="We don't hold the strategy hostage."
          lede="Three of the four ways forward don't involve paying us another penny. That is deliberate, and it is why the research is worth buying."
        />
        <ComparisonSection
          columns={[
            {
              title: "Your team runs it",
              body: "The plan is written with priorities, sequencing and owners, so people who have never spoken to us can pick it up and go.",
              note: "No further cost",
            },
            {
              title: "Your vendors run it",
              body: "Hand it to the agencies you already pay. It gives you something concrete to hold them to, which is usually the missing piece.",
              note: "No further cost",
            },
            {
              title: "We run it",
              body: "Turn the plan into a monthly package. You pick the parts you want, priced per location, with deliverables you can count.",
              note: "Build a package",
              highlight: true,
            },
          ]}
        />
      </Section>

      {/* Scale, told as reassurance rather than a pricing table. */}
      <Section tone="blue">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Built for location economics"
            title="One location or two hundred. Same system, different scale."
            lede="Your marketing structure shouldn't collapse every time you open another city, or another country. The plan stays the same price per location whether you run one or a network."
            invert
          />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-soft)] bg-white/25">
            {[
              { n: "1", who: "Independent business" },
              { n: "10", who: "Regional operator" },
              { n: "30", who: "Growing franchise" },
              { n: "200+", who: "International network" },
            ].map((tier) => (
              <div key={tier.n} className="bg-blue p-6">
                <p className="u-display u-tnum text-4xl text-white">{tier.n}</p>
                <p className="mt-2 text-sm text-white/75">{tier.who}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Markets, summarised at region level. The full list lives on /markets. */}
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Where we work"
              title="Local execution. International scale."
              lede={
                <>
                  A business in Manchester doesn&apos;t compete the same way as
                  one in Miami. Berlin is not Sydney. Skopje is not Toronto. The
                  system stays consistent. The market strategy doesn&apos;t.
                </>
              }
            />
            <div className="mt-7 flex flex-wrap gap-2">
              {regions.map(({ region, markets }) => (
                <Pill key={region.id}>
                  {region.label} &middot; {markets.length}
                </Pill>
              ))}
            </div>
            {/*
              TODO: once per-market localized sites and regional pricing ship,
              change this to say each market has its own site in its own
              language. Until then it describes what is actually true.
            */}
            <p className="mt-6 leading-relaxed text-ink-soft">
              Every market gets its own research, its own plan and its own page.
              None of them get a translated version of somebody else&apos;s.
            </p>
            <div className="mt-8">
              <CTAButton href="/markets" variant="primary">
                Find your market
              </CTAButton>
            </div>
          </div>
          <FamilyImage slot="local-shopfront" aspect="landscape" />
        </div>
      </Section>

      {/* The emotional close. Kept short so it does not tip into sentimentality. */}
      <Section tone="paper">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <FamilyImage slot="backyard-evening" aspect="landscape" />
          <div>
            <Eyebrow tone="accent">Why we&apos;re called this</Eyebrow>
            <p className="u-display mt-5 text-3xl text-ink sm:text-4xl">
              A business is supposed to give you a life. Not become the only
              thing in it.
            </p>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                We like ambitious businesses, hard work and clear numbers. We
                also think the owner of a growing company should eventually be
                able to shut the laptop and go home.
              </p>
              <p>That is the point of better systems.</p>
            </div>
            <div className="mt-7">
              <CTAButton href="/about" variant="quiet">
                How we&apos;re built
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-ink py-20 text-ice sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <h2 className="u-display text-4xl sm:text-5xl lg:text-6xl">
              Let&apos;s understand your market before we sell you marketing.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              {formatMoney(BLUEPRINT.pricePerLocation)} per location. One working
              day of analysis each. Keep the plan whether you continue or not.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/contact?intent=blueprint" variant="accent">
                Start my plan
              </CTAButton>
              <CTAButton href="/how-it-works" variant="invert">
                See how it works
              </CTAButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
