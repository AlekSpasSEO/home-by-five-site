"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MK } from "@/config/mk";
import { getMkPhoto, type MkAspect } from "@/config/mk-photography";

/** Navigation for the Macedonian site. Anchors, because it is one long page. */
export const MK_NAV = [
  { label: "За кого е", href: "/mk#za-kogo" },
  { label: "Што добивате", href: "/mk#sto-dobivate" },
  { label: "Извештаи", href: "/mk#izveshtai" },
  { label: "Цени", href: "/mk#kalkulator" },
  { label: "Дијагностика", href: "/mk#dijagnostika" },
];

const aspects: Record<MkAspect, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[3/2]",
  square: "aspect-square",
};

/** A photograph of a real Macedonian business. */
export function MkImage({
  id,
  aspect,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  id: string;
  aspect?: MkAspect;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const photo = getMkPhoto(id);
  if (!photo) return null;
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-soft)] bg-sky ${
        aspects[aspect ?? photo.aspect]
      } ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

export function MkHeader() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = () => setOpen(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  /*
    Portalled to body for the same reason as the international nav: the header
    carries backdrop-blur, which makes it a containing block for fixed children.
  */
  const sheet = (
    <>
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
        aria-label="Мени"
        className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,90vw)] flex-col bg-paper shadow-2xl lg:hidden"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 200ms ease-out",
          visibility: open ? "visible" : "hidden",
        }}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <MkWordmark />
          <button
            type="button"
            onClick={close}
            aria-label="Затвори мени"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-[var(--radius-soft)] text-ink-mute hover:bg-sky hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul>
            {MK_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-[52px] items-center rounded-[var(--radius-soft)] px-3 text-lg font-medium text-ink hover:bg-sky"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-rule p-4">
          <Link
            href="/mk/kontakt?namera=dijagnostika"
            onClick={close}
            className="flex min-h-[52px] w-full items-center justify-center rounded-[var(--radius-soft)] bg-flag px-5 font-semibold text-white hover:bg-flag-deep"
          >
            Закажете разговор
          </Link>
          <a href={`mailto:${MK.contactEmail}`} className="mt-3 block text-center text-sm text-ink-mute">
            {MK.contactEmail}
          </a>
        </div>
      </div>
    </>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-ice/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <MkWordmark />

        <nav aria-label="Главна навигација" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {MK_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-medium text-ink-soft transition-colors hover:text-blue">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/mk/kontakt?namera=dijagnostika"
            className="inline-flex items-center rounded-[var(--radius-soft)] bg-flag px-5 py-2.5 font-semibold text-white transition-colors hover:bg-flag-deep"
          >
            Закажете разговор
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Отвори мени"
            aria-expanded={open}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-[var(--radius-soft)] text-ink hover:bg-sky"
          >
            <span aria-hidden className="flex w-5 flex-col gap-[5px]">
              <span className="block h-[2px] w-full rounded-full bg-current" />
              <span className="block h-[2px] w-full rounded-full bg-current" />
              <span className="block h-[2px] w-3.5 rounded-full bg-current" />
            </span>
          </button>
          {mounted ? createPortal(sheet, document.body) : null}
        </div>
      </div>
    </header>
  );
}

export function MkWordmark() {
  return (
    <Link href="/mk" aria-label="Home by Five, почетна" className="inline-block">
      <span className="u-display inline-flex items-baseline gap-[0.4em] text-base uppercase tracking-[0.06em] text-ink sm:text-lg">
        <span className="font-semibold">HOME BY</span>
        <span className="relative font-semibold">
          FIVE
          <span aria-hidden className="absolute -bottom-[0.18em] left-0 h-[0.09em] w-full bg-flag" />
        </span>
      </span>
    </Link>
  );
}

export function MkFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <span className="u-display inline-flex items-baseline gap-[0.4em] text-lg uppercase tracking-[0.06em] text-white">
              <span className="font-semibold">HOME BY</span>
              <span className="relative font-semibold">
                FIVE
                <span aria-hidden className="absolute -bottom-[0.18em] left-0 h-[0.09em] w-full bg-flag" />
              </span>
            </span>
            <p className="mt-4 max-w-xs text-white/60">
              Маркетинг систем за македонски компании што пораснале побрзо од
              своето маркетинг одделение.
            </p>
            <a
              href={`mailto:${MK.contactEmail}`}
              className="mt-5 inline-block text-white/80 underline decoration-flag underline-offset-4 hover:text-white"
            >
              {MK.contactEmail}
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="u-label text-white/50">На страницата</p>
              <ul className="mt-4 space-y-2.5">
                {MK_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/75 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="u-label text-white/50">Друго</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link href="/mk/kontakt" className="text-white/75 transition-colors hover:text-white">
                    Контакт
                  </Link>
                </li>
                <li>
                  <Link href="/markets/macedonia" className="text-white/75 transition-colors hover:text-white">
                    Анализа на македонскиот пазар
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-white/75 transition-colors hover:text-white">
                    International site (English)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8 text-sm text-white/45">
          <p>
            &copy; {year} Home by Five. Цените се во евра. Точниот опфат се
            потврдува по дијагностиката.
          </p>
        </div>
      </div>
    </footer>
  );
}
