import type { Metadata } from "next";
import Link from "next/link";
import { MkLeadForm } from "@/components/mk/MkLeadForm";
import { MkImage } from "@/components/mk/MkChrome";
import { MK, mkMoney } from "@/config/mk";

export const metadata: Metadata = {
  title: "Контакт",
  description:
    "Кажете ни што работите и каде сте застанати. Одговара човек што веќе ја погледнал вашата страница.",
  alternates: { canonical: "/mk/kontakt" },
};

export default function MkContactPage() {
  return (
    <section className="bg-ice py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="u-label text-flag">Контакт</p>
            <h1 className="u-display mt-5 text-[2.4rem] leading-[1.06] sm:text-5xl">
              Кажете ни каде сте застанати.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Најбрзиот разговор почнува од вашиот пазар, не од нашите
              референции. Опишете ја фирмата и ќе се вратиме со нешто конкретно.
            </p>

            <div className="mt-10">
              <p className="u-label mb-3">Што следи</p>
              <ul className="space-y-3">
                {[
                  "Човек ја чита пораката и ја гледа вашата страница",
                  "Добивате одговор со конкретна забелешка, не покана за состанок",
                  `Ако има смисла, ја нудиме дијагностиката за ${mkMoney(MK.diagnostics.price)} со точен рок`,
                  `Ако продолжите, првите ${MK.diagnostics.freeMonths} месеци извршување се бесплатни`,
                  "Ако не сме вистинските за вас, тоа ќе ви го кажеме",
                ].map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                    <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-flag" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <MkImage id="pogon" aspect="wide" />
            </div>

            <p className="mt-6 text-ink-mute">
              Или директно на{" "}
              <a
                href={`mailto:${MK.contactEmail}`}
                className="underline decoration-flag underline-offset-4 hover:text-blue"
              >
                {MK.contactEmail}
              </a>
              .
            </p>
            <p className="mt-3 text-sm text-ink-mute">
              <Link href="/mk" className="underline decoration-rule-strong underline-offset-4 hover:text-blue">
                Назад на почетна
              </Link>
            </p>
          </div>

          <MkLeadForm />
        </div>
      </div>
    </section>
  );
}
