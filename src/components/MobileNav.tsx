"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { Wordmark } from "@/components/Wordmark";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  // The panel closes from the links themselves rather than from a route-change
  // effect. Same result, one less render pass, and no state sync to get wrong.
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="u-label flex items-center gap-2 border border-rule-strong px-3 py-2 text-ink"
      >
        <span aria-hidden className="flex flex-col gap-[3px]">
          <span className="block h-px w-4 bg-ink" />
          <span className="block h-px w-4 bg-ink" />
          <span className="block h-px w-4 bg-ink" />
        </span>
        Menu
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-bone">
          <div className="flex items-center justify-between border-b border-rule px-5 py-4">
            <Wordmark />
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="u-label border border-rule-strong px-3 py-2 text-ink"
            >
              Close
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-8">
            <ul className="space-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="u-display block border-b border-rule py-4 text-2xl text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="u-label mt-10 mb-3">Who we work with</p>
            <ul className="space-y-1">
              {site.audienceNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block border-b border-rule py-3 text-base text-ink-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/location-growth-blueprint"
              onClick={close}
              className="mt-10 flex w-full items-center justify-center bg-ink px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.1em] text-bone"
            >
              Start with a $150 blueprint
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
