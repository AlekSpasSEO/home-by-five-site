import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMarketBySlug, enabledMarkets } from "@/config/markets";
import { getMarketContent } from "@/config/market-content";
import { MarketPageTemplate } from "@/components/MarketPageTemplate";
import { site } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return enabledMarkets().map((market) => ({ market: market.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string }>;
}): Promise<Metadata> {
  const { market: slug } = await params;
  const market = getMarketBySlug(slug);
  if (!market) return {};

  const content = getMarketContent(market.code);

  return {
    title: `Multi-location and franchise marketing in ${market.name}`,
    description:
      content?.heroSupport.slice(0, 155) ??
      `${site.name} in ${market.name}. Research-first marketing for franchise networks, multi-location operators and local service businesses.`,
    alternates: {
      canonical: `/markets/${market.slug}`,
      /*
        hreflang is intentionally minimal while every market publishes in
        English. When translated routes ship, add the localized URLs here from
        market.localizedSlug and market.languageCode. Global English stays
        x-default.
      */
      languages: {
        "x-default": `/markets/${market.slug}`,
        en: `/markets/${market.slug}`,
      },
    },
    openGraph: {
      title: `${site.name} in ${market.name}`,
      description: content?.heroSupport,
      url: `${site.url}/markets/${market.slug}`,
      locale: market.locale,
    },
  };
}

export default async function MarketPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: slug } = await params;
  const market = getMarketBySlug(slug);
  if (!market || !market.enabled) notFound();

  const content = getMarketContent(market.code);
  // A market without written content does not get a thin page.
  if (!content) notFound();

  return <MarketPageTemplate market={market} content={content} />;
}
