import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, CTAButton, Bullets, Note } from "@/components/ui";
import { FamilyImage } from "@/components/FamilyImage";
import { enabledMarkets } from "@/config/markets";

export const metadata: Metadata = {
  title: "About",
  description:
    "Home by Five exists because too many owners end up managing the people who were meant to make marketing easier. Research first, clear deliverables, central systems.",
  alternates: { canonical: "/about" },
};

const PODS = [
  {
    role: "Growth Strategy",
    body: "Runs the blueprints. Market research, competitive work, the 90-day plan, and the quarterly argument about what to stop doing.",
  },
  {
    role: "Local & Authority",
    body: "Profiles, listings, citations, reviews and earned placements. The unglamorous work that decides most local outcomes.",
  },
  {
    role: "Creative & Social",
    body: "Content, social, photography direction and the network templates that let one brand look right in eleven countries.",
  },
  {
    role: "Development & Automation",
    body: "Pages, templates, technical work, tracking, and removing the repetitive tasks that quietly cost the most.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Somebody has to own the whole picture."
        lede="Home by Five exists because too many business owners end up managing the people who were supposed to make marketing easier."
        aside={<FamilyImage slot="team-pod" aspect="landscape" />}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHeading
            eyebrow="The thesis"
            title="A different model, not a better pitch."
            lede="Every agency says they are different. What we can actually point at is the order we do things in, and what we refuse to hold back."
          />
          <div>
            <Bullets
              items={[
                "Research first, and paid for, so nobody is guessing",
                "Clear deliverables you can count, not effort you have to trust",
                "Central systems, so quality does not depend on which account manager you got",
                "Specialists doing specialist work rather than generalists doing all of it",
                "Technology removing the repetitive work instead of hiding it",
                "Reporting tied to commercial outcomes, included as standard",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="How we are built"
          title="Small specialist pods, one operating system."
          lede="The account is managed centrally. Underneath it, four specialisms do the work they are actually good at, on shared standards, so output stays consistent whether you have one location or two hundred."
        />
        <div className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2">
          {PODS.map((pod) => (
            <div key={pod.role} className="bg-paper p-7">
              <h3 className="u-display text-xl text-ink">{pod.role}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {pod.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-2xl">
          <Note>
            The operating system scales across locations and countries. The market
            research does not, and it should not. That is the whole design.
          </Note>
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Why the name"
              title="Do great work, then go home to the people you built it for."
            />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                Home by Five means two things, and we mean both of them equally.
              </p>
              <p>
                The first is discipline. Businesses grow through systems that run
                whether or not the owner is watching, and a company that only
                works when the founder is in the room is not a company yet.
              </p>
              <p>
                The second is the point of the first. If you build something that
                runs properly, you should eventually get your evenings back. That
                is not a soft benefit. For most owners it is the actual reason
                they started.
              </p>
            </div>
          </div>
          <FamilyImage slot="backyard-evening" aspect="landscape" />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Where we work"
          title={`${enabledMarkets().length} markets, one standard.`}
          lede="North America, the UK, Oceania and Europe. Each market gets its own research and its own plan. None of them get a translated version of somebody else's."
        />
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/markets" variant="outline">
            Explore markets
          </CTAButton>
          <CTAButton href="/contact?intent=blueprint" variant="accent">
            Start a blueprint
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
