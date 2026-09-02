import Link from "next/link";
import { site } from "@/config/site";
import { Wordmark } from "@/components/Wordmark";
import { Container } from "@/components/ui";
import { marketsByRegion, marketHref } from "@/config/markets";

export function Footer() {
  const regions = marketsByRegion();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-ink bg-ink text-ice">
      <Container width="wide">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Wordmark invert />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ice/60">
              {site.tagline}
            </p>
            <Link
              href="/location-growth-blueprint"
              className="mt-7 inline-flex items-center border border-ice bg-ice px-5 py-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:border-flag hover:bg-flag hover:text-ice"
            >
              Start my blueprint
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {site.footerNav.map((group) => (
              <div key={group.heading}>
                <p className="u-label text-ice/50">{group.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ice/75 transition-colors hover:text-flag"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-ice/15 py-10">
          <p className="u-label text-ice/50">Markets</p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map(({ region, markets }) => (
              <div key={region.id}>
                <p className="text-[0.8125rem] font-medium text-ice/85">
                  {region.label}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {markets.map((market) => (
                    <li key={market.code}>
                      <Link
                        href={marketHref(market)}
                        className="text-[0.8125rem] text-ice/55 transition-colors hover:text-flag"
                      >
                        {market.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ice/15 py-8 text-[0.75rem] text-ice/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. Do great work, then go home.
          </p>
          <p>
            Prices shown in {site.baseCurrency}. Final scope is confirmed after
            your Location Growth Blueprint.
          </p>
        </div>
      </Container>
    </footer>
  );
}
