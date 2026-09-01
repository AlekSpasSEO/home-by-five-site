import { Container, CTAButton, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow tone="accent">404</Eyebrow>
          <h1 className="u-display mt-5 text-[2.5rem] leading-tight sm:text-5xl">
            That page isn&apos;t here.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Either it moved, or it never existed. If you were looking for a
            market we do not cover yet, tell us where and we will give you a
            straight answer about whether we can do good work there.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/" variant="accent">
              Back to the start
            </CTAButton>
            <CTAButton href="/markets" variant="outline">
              See all markets
            </CTAButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
