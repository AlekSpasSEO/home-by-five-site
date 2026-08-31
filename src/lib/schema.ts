/**
 * Structured data helpers.
 *
 * Kept small and honest: we describe what the business is and what it sells,
 * and we do not emit review, rating or offer markup we cannot substantiate.
 */

import { site } from "@/config/site";
import { MARKETS, type Market } from "@/config/markets";
import { BLUEPRINT } from "@/lib/pricing";

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  areaServed: MARKETS.filter((m) => m.enabled).map((m) => ({
    "@type": "Country",
    name: m.name,
  })),
});

export const blueprintServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Location Growth Blueprint",
  serviceType: "Marketing strategy and market research",
  provider: { "@type": "Organization", name: site.name, url: site.url },
  description:
    "A custom growth and market plan for each location, produced from one working day of analysis per location. The customer keeps the strategy whether or not they continue.",
  offers: {
    "@type": "Offer",
    price: BLUEPRINT.pricePerLocation,
    priceCurrency: site.baseCurrency,
    description: "Per location, one-time.",
  },
  areaServed: MARKETS.filter((m) => m.enabled).map((m) => ({
    "@type": "Country",
    name: m.name,
  })),
});

export const marketServiceSchema = (market: Market) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${site.name} in ${market.name}`,
  serviceType: "Multi-location and franchise marketing",
  provider: { "@type": "Organization", name: site.name, url: site.url },
  areaServed: { "@type": "Country", name: market.name },
  url: `${site.url}/markets/${market.slug}`,
});

export const faqSchema = (items: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});

/** Renders a JSON-LD block. Kept in one place so escaping is consistent. */
export const jsonLd = (data: unknown) => ({
  __html: JSON.stringify(data),
});
