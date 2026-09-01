import type { Metadata } from "next";
import { PageHero } from "@/components/Hero";
import { Section, SectionHeading, CTAButton, Note, Container } from "@/components/ui";
import { ServiceCatalog } from "@/components/ServiceGrid";
import { SERVICE_CATEGORIES } from "@/config/services";
import { formatMoney } from "@/lib/pricing";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Service catalog and prices",
  description:
    "Every unit we sell, what it includes and what it costs. Local SEO, links, content, pages, GEO, paid media, social, photography, PR and automation.",
  alternates: { canonical: "/services" },
};

const formatPrice = (price: number | null, scale: string) => {
  if (scale === "included") return "Included";
  if (price === null) return "Quoted";
  return formatMoney(price);
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Service catalog"
        title="Every unit, what it includes, what it costs."
        lede="No packages you have to decode. These are the units we sell, priced individually, so you can see exactly what you would be buying before anyone gets on a call."
        primaryCta={{ href: "/packages", label: "Build a package" }}
        secondaryCta={{
          href: "/location-growth-blueprint",
          label: "Start with the blueprint",
        }}
      />

      <section className="border-t border-rule bg-paper py-10">
        <Container width="wide">
          <nav aria-label="Service categories">
            <p className="u-label mb-4">Jump to</p>
            <ul className="flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="inline-block border border-rule-strong px-3 py-1.5 font-sans text-[0.6875rem] uppercase tracking-[0.08em] text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-cream"
                  >
                    {category.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <Section>
        <div className="max-w-2xl space-y-4">
          <Note tone="accent">
            Prices are in {site.baseCurrency}. Local-currency pricing is confirmed
            per market, and production costs that genuinely vary by country, such
            as photography, are quoted locally rather than converted.
          </Note>
          <Note>
            Ad spend is never included in management fees. You pay the platforms
            directly, and you keep the accounts.
          </Note>
        </div>

        <ServiceCatalog formatPrice={formatPrice} />
      </Section>

      <Section tone="ink">
        <SectionHeading
          eyebrow="Next step"
          title="Put the units together and see the monthly number."
          lede="The package builder does the arithmetic, applies the network rate for your location count, and shows the deliverables as counts rather than promises."
          invert
        />
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/packages" variant="invert">
            Build a monthly package
          </CTAButton>
          <CTAButton
            href="/contact"
            variant="outline"
            className="border-cream/30 text-cream hover:bg-cream hover:text-ink"
          >
            Ask about something specific
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
