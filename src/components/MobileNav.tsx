"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/config/site";
import { Wordmark } from "@/components/Wordmark";

/**
 * Mobile navigation.
 *
 * A sheet rather than a full-bleed takeover: it slides in over a dimmed page,
 * every row is at least a 48px tap target, and the labels are sentence case at
 * reading size. The previous version was a bordered "MENU" box opening a wall
 * of uppercase links, which read as a utility menu rather than part of the
 * brand.
 *
 * The panel closes from the links themselves rather than from a route-change
 * effect. Same result, one less render pass, and no state sync to get wrong.
 *
 * Open and closed states are driven by inline styles rather than utility
 * classes. The two states are a single boolean, the values are trivial, and
 * inline styles cannot be lost to cascade or class-generation surprises in a
 * static export.
 *
 * The overlay is portalled to document.body on purpose. The header carries
 * `backdrop-blur`, and a backdrop-filter makes an element a containing block
 * for position:fixed descendants. Rendered in place, the sheet and its backdrop
 * were clipped to the header's 72px strip instead of filling the viewport,
 * which is what made the old menu behave so strangely on a phone.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = () => setOpen(false);

  /*
    Portals need a DOM target, so the overlay only renders after mount.
    set-state-in-effect is disabled here for the same reason as elsewhere in
    this codebase: "are we on the client yet" cannot be answered during render
    without the server and client producing different markup.
  */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const overlay = (
    <>
      {/* Backdrop. Tapping outside the sheet closes it. */}
      <div
        onClick={close}
        aria-hidden
        className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 200ms ease-out",
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,90vw)] flex-col bg-paper shadow-2xl lg:hidden"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 200ms ease-out",
          visibility: open ? "visible" : "hidden",
        }}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <Wordmark size="small" />
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-[var(--radius-soft)] text-ink-mute transition-colors hover:bg-sky hover:text-ink"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-[52px] items-center rounded-[var(--radius-soft)] px-3 text-lg font-medium text-ink transition-colors hover:bg-sky"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="u-label mt-6 px-3 pb-1">Who we work with</p>
          <ul>
            {site.audienceNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-[48px] items-center rounded-[var(--radius-soft)] px-3 text-ink-soft transition-colors hover:bg-sky hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-rule p-4">
          <Link
            href="/contact?intent=blueprint"
            onClick={close}
            className="flex min-h-[52px] w-full items-center justify-center rounded-[var(--radius-soft)] bg-flag px-5 font-semibold text-white transition-colors hover:bg-flag-deep"
          >
            Start with a $150 plan
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block px-1 text-center text-sm text-ink-mute"
          >
            {site.email}
          </a>
        </div>
      </div>
    </>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-[var(--radius-soft)] text-ink transition-colors hover:bg-sky"
      >
        <span aria-hidden className="flex w-5 flex-col gap-[5px]">
          <span className="block h-[2px] w-full rounded-full bg-current" />
          <span className="block h-[2px] w-full rounded-full bg-current" />
          <span className="block h-[2px] w-3.5 rounded-full bg-current" />
        </span>
      </button>

      {mounted ? createPortal(overlay, document.body) : null}
    </div>
  );
}
