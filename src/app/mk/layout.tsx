import type { Metadata } from "next";
import { MkHeader, MkFooter } from "@/components/mk/MkChrome";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Home by Five | Маркетинг за македонски компании",
    template: "%s | Home by Five",
  },
  alternates: {
    canonical: "/mk",
    languages: { mk: "/mk", en: "/", "x-default": "/" },
  },
  openGraph: {
    locale: "mk_MK",
    siteName: "Home by Five",
    url: `${site.url}/mk`,
  },
};

/*
  The Macedonian site sits inside the same root layout as the international one,
  so <html lang> stays "en". The subtree is marked lang="mk" instead, which is
  what assistive tech reads, and the metadata above declares the alternates.

  TODO: when the per-market localized sites land, split these into separate root
  layouts via route groups so each language owns its own <html lang>.
*/
export default function MkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="mk" className="flex min-h-full flex-col">
      <MkHeader />
      <div className="flex-1">{children}</div>
      <MkFooter />
    </div>
  );
}
