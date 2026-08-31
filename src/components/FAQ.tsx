import type { FaqItem } from "@/config/faq";
import { faqSchema } from "@/lib/schema";

/**
 * FAQ list.
 *
 * Uses native details/summary, so it works without JavaScript and stays
 * keyboard accessible without any state handling.
 */
export function FAQ({
  items,
  emitSchema = false,
}: {
  items: FaqItem[];
  emitSchema?: boolean;
}) {
  return (
    <>
      <div className="border-t border-rule">
        {items.map((item) => (
          <details key={item.question} className="group border-b border-rule">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
              <span className="text-[1.0625rem] font-medium text-ink">
                {item.question}
              </span>
              <span
                aria-hidden
                className="relative mt-2 h-3 w-3 shrink-0 text-accent"
              >
                <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform group-open:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      {emitSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              faqSchema(
                items.map((i) => ({ question: i.question, answer: i.answer })),
              ),
            ),
          }}
        />
      ) : null}
    </>
  );
}
