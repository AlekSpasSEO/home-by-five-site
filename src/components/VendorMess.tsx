const VENDORS = [
  "SEO agency",
  "PPC freelancer",
  "Social person",
  "Writer",
  "Developer",
  "Citation tool",
  "Link vendor",
  "Photographer",
  "Analytics dashboard",
  "Automation freelancer",
];

/**
 * The vendor stack, drawn as a grid rather than a tangle.
 *
 * The point is that each box is separately managed, separately invoiced and
 * separately reported. Restraint communicates that better than spaghetti.
 */
export function VendorMess() {
  return (
    <div>
      <div className="grid gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-5">
        {VENDORS.map((vendor) => (
          <div key={vendor} className="relative bg-paper p-5 pb-8">
            <p className="text-[0.875rem] leading-snug text-ink-soft">{vendor}</p>
            <span
              aria-hidden
              className="absolute bottom-3 left-5 h-3 w-px bg-rule-strong"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 py-6">
        <span aria-hidden className="h-px flex-1 bg-rule-strong" />
        <span className="u-label text-ink-mute">Ten relationships, one owner</span>
        <span aria-hidden className="h-px flex-1 bg-rule-strong" />
      </div>

      <div className="border border-ink bg-ink px-6 py-7 text-bone sm:px-8">
        <p className="u-label text-bone/50">One operating system</p>
        <p className="u-display mt-3 text-2xl sm:text-3xl">
          Home by Five connects the work, the numbers and the people running it.
        </p>
        <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-bone/65">
          One plan, one production system, one report. You stop being the
          integration layer between ten vendors who have never spoken to each
          other.
        </p>
      </div>
    </div>
  );
}
