import Link from "next/link";
import { site } from "@/config/site";
import { Wordmark } from "@/components/Wordmark";
import { MobileNav } from "@/components/MobileNav";
import { Container } from "@/components/ui";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-ice/90 backdrop-blur-md">
      <Container width="wide">
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium text-ink-soft transition-colors hover:text-blue"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact?intent=blueprint"
              className="inline-flex items-center rounded-[var(--radius-soft)] bg-flag px-5 py-2.5 font-semibold text-white transition-colors hover:bg-flag-deep"
            >
              Start a plan
            </Link>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
