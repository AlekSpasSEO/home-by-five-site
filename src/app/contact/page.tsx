import type { Metadata } from "next";
import { Container, Eyebrow, Bullets, Note } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import { BLUEPRINT, formatMoney } from "@/lib/pricing";
import { site } from "@/config/site";
import { enabledMarkets } from "@/config/markets";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us where your locations are and what the actual problem is. One person reads it and replies.",
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <section className="bg-bone py-14 sm:py-20">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow tone="accent">Contact</Eyebrow>
            <h1 className="u-display mt-5 text-[2.5rem] leading-[1.05] sm:text-5xl">
              Tell us where the locations are.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              The fastest version of this conversation starts with the market,
              not with our credentials. Give us the business and the geography
              and we will come back with something specific.
            </p>

            <div className="mt-10">
              <p className="u-label mb-1">What happens next</p>
              <Bullets
                items={[
                  "A person reads it, looks at your site and your local results",
                  "You get a reply with an actual observation, not a calendar link",
                  `If a blueprint makes sense, we quote it at ${formatMoney(BLUEPRINT.pricePerLocation)} per location with a delivery date`,
                  "If we are not the right fit, we say so",
                ]}
              />
            </div>

            <div className="mt-10 space-y-4">
              <Note>
                We operate in {enabledMarkets().length} markets. If yours is not
                on the list, say where and we will tell you honestly whether we
                can do good work there yet.
              </Note>
              <p className="text-[0.875rem] text-ink-mute">
                Prefer email?{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="underline decoration-accent underline-offset-4 hover:text-accent"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </div>

          <LeadForm />
        </div>
      </Container>
    </section>
  );
}
