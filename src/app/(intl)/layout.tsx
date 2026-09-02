import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import "../globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { organizationSchema } from "@/lib/schema";

/*
  Root layout for the international, English-language site.

  There are two root layouts in this app, one per route group: this one and
  (mk). Each owns its own <html lang>, its own header and its own footer, so a
  localized site never inherits the English chrome. Adding another localized
  site means adding another group, not another conditional.
*/

const fraunces = Fraunces({
  variable: "--font-display-src",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-body-src",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Marketing built by location`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: "/",
    languages: { "x-default": "/", en: "/", mk: "/mk" },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Marketing built by location`,
    description: site.description,
    url: site.url,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Marketing built by location`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function IntlRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </body>
    </html>
  );
}

