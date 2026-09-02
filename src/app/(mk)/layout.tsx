import type { Metadata } from "next";
import { Literata, Rubik } from "next/font/google";
import "../globals.css";
import { site } from "@/config/site";
import { MkHeader, MkFooter } from "@/components/mk/MkChrome";

/*
  Root layout for the Macedonian site.

  Its own <html lang="mk"> and its own chrome. Previously /mk was nested inside
  the English root layout, so every Macedonian page rendered two headers and two
  footers, one in each language. Splitting the app into two route groups, each
  with its own root layout, is what actually fixes that.

  Different faces from the English site, and not by preference: Fraunces and
  Figtree have no Cyrillic. Literata and Rubik do, and hold the same warm,
  unstuffy register. Both layouts fill the same two CSS variables, so every
  component keeps working without knowing which site it is on.
*/

const literata = Literata({
  variable: "--font-display-src",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-body-src",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Home by Five | Маркетинг за македонски компании",
    template: "%s | Home by Five",
  },
  description:
    "Дијагностика, стратегија и извршување за македонски производствени и услужни компании.",
  alternates: {
    canonical: "/mk",
    languages: { mk: "/mk", en: "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "Home by Five",
    locale: "mk_MK",
    url: `${site.url}/mk`,
  },
  robots: { index: true, follow: true },
};

export default function MkRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mk"
      className={`${literata.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#glavno"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Кон содржината
        </a>
        <MkHeader />
        <main id="glavno" className="relative z-10 flex-1">
          {children}
        </main>
        <MkFooter />
      </body>
    </html>
  );
}
