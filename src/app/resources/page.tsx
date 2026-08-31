import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, CTAButton, Note } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides and research on multi-location and franchise marketing. The structure is live; the articles are being written.",
  alternates: { canonical: "/resources" },
};

/**
 * Resources index.
 *
 * TODO: this route exists so the architecture is ready, not because there is
 * content yet. When articles arrive, either add a `content` collection here or
 * connect whatever CMS the project adopts. Deliberately not over-built into a
 * CMS the project has not chosen.
 *
 * Planned pieces are listed honestly as planned, rather than published as
 * empty stubs that would sit in the sitemap doing nothing.
 */
const PLANNED = [
  {
    title: "What a location actually costs to market",
    note: "The per-location arithmetic, with the numbers that usually get left out.",
  },
  {
    title: "Why translated location pages do not rank",
    note: "What changes between markets, and what has to be rewritten rather than converted.",
  },
  {
    title: "Reading a local market before you spend in it",
    note: "The research sequence behind the Location Growth Blueprint.",
  },
  {
    title: "Franchise participation is a marketing metric",
    note: "Measuring who engages, and what to do about the locations that do not.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Being written, not filled."
        lede="The section exists because it will hold real research. It is empty because we would rather publish four pieces worth reading than forty that exist for the sitemap."
        primaryCta={{ href: "/contact", label: "Ask us the question directly" }}
      />

      <Section tone="paper">
        <SectionHeading eyebrow="In progress" title="What is being written." />
        <div className="mt-10 divide-y divide-rule border-y border-rule">
          {PLANNED.map((item) => (
            <article key={item.title} className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10">
              <div>
                <h2 className="u-display text-xl text-ink">{item.title}</h2>
                <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
                  {item.note}
                </p>
              </div>
              <p className="u-label text-ink-faint">In progress</p>
            </article>
          ))}
        </div>

        <div className="mt-10 max-w-2xl">
          <Note>
            If one of these would be useful to you now, say so and we will send
            what we have rather than making you wait for the polished version.
          </Note>
        </div>

        <div className="mt-8">
          <CTAButton href="/contact" variant="outline">
            Ask for one of these
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
