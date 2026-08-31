import Link from "next/link";
import { site } from "@/config/site";
import { Wordmark } from "@/components/Wordmark";
import { MobileNav } from "@/components/MobileNav";
import { Container } from "@/components/ui";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bone/92 backdrop-blur-sm">
      <Container width="wide">
        <div className="flex h-16 items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.875rem] text-ink-soft transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/location-growth-blueprint"
              className="inline-flex items-center border border-ink bg-ink px-5 py-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:border-accent hover:bg-accent"
            >
              Start a blueprint
            </Link>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
