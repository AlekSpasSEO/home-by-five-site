import { Eyebrow } from "@/components/ui";

/**
 * Testimonial slot.
 *
 * TODO: replace with real, attributed customer quotes. Deliberately rendered as
 * an empty frame rather than invented praise. Fabricated testimonials are the
 * fastest way to lose the kind of operator this site is written for.
 */
export function TestimonialPlaceholder({
  count = 3,
  invert = false,
}: {
  count?: number;
  invert?: boolean;
}) {
  return (
    <div
      className={`grid gap-px border ${
        invert ? "border-cream/20 bg-cream/20" : "border-rule bg-rule"
      } sm:grid-cols-2 lg:grid-cols-3`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`flex min-h-56 flex-col justify-between p-6 ${
            invert ? "bg-ink" : "bg-paper"
          }`}
        >
          <Eyebrow tone={invert ? "invert" : "default"}>
            Customer quote {i + 1}
          </Eyebrow>
          <div
            className={`mt-6 space-y-2.5 ${invert ? "opacity-30" : "opacity-40"}`}
            aria-hidden
          >
            <span className="block h-2 w-full bg-rule-strong" />
            <span className="block h-2 w-11/12 bg-rule-strong" />
            <span className="block h-2 w-9/12 bg-rule-strong" />
          </div>
          <p
            className={`mt-6 text-[0.75rem] ${
              invert ? "text-cream/40" : "text-ink-faint"
            }`}
          >
            Awaiting a real, attributed quote. Nothing invented goes here.
          </p>
        </div>
      ))}
    </div>
  );
}
