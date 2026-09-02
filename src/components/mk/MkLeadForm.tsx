"use client";

import { useEffect, useState } from "react";
import { MK, mkMoney } from "@/config/mk";
import { submitLead, type LeadPayload } from "@/lib/leads";

const field =
  "w-full rounded-[var(--radius-soft)] border border-rule-strong bg-paper px-3.5 py-3 text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-blue";
const labelCls = "u-label mb-2 block";

const INTENTS: Record<string, string> = {
  dijagnostika: "Целосна дијагностика",
  paket: "Месечен пакет",
  sostanok: "Само разговор",
};

const BRANSHI = [
  "Производство",
  "Храна и пијалаци",
  "Услуги",
  "Трговија и малопродажба",
  "Градежништво и опрема",
  "Здравство и естетика",
  "Угостителство",
  "Друго",
];

export function MkLeadForm() {
  const [form, setForm] = useState({
    ime: "",
    firma: "",
    veb: "",
    email: "",
    telefon: "",
    branша: BRANSHI[0],
    vraboteni: "20-50",
    interes: "dijagnostika",
    poraka: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const namera = params.get("namera");
    if (namera && INTENTS[namera]) {
      setForm((prev) => ({ ...prev, interes: namera }));
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setState("sending");

    // Mapped onto the shared LeadPayload so one CRM integration serves both sites.
    const payload: LeadPayload = {
      name: form.ime,
      company: form.firma,
      website: form.veb,
      email: form.email,
      phone: form.telefon || undefined,
      primaryMarket: "MKD",
      additionalMarkets: [],
      businessType: "independent",
      locations: 1,
      primaryInterest: form.interes === "paket" ? "full-execution" : "blueprint",
      message: `[MK] Дејност: ${form.branша}. Вработени: ${form.vraboteni}. Интерес: ${
        INTENTS[form.interes]
      }.\n\n${form.poraka}`,
      source: "/mk/kontakt",
    };

    const result = await submitLead(payload);
    if (result.ok) {
      setState("sent");
    } else {
      setState("idle");
      setError(
        result.error === "Please add your name."
          ? "Ве молиме внесете име."
          : result.error === "That email address doesn't look right."
            ? "Е-поштата не изгледа точно."
            : "Нешто не успеа. Пишете ни директно на е-пошта.",
      );
    }
  };

  if (state === "sent") {
    return (
      <div className="rounded-[var(--radius-soft)] border-2 border-blue bg-paper p-8">
        <p className="u-label text-flag">Примено</p>
        <h2 className="u-display mt-4 text-3xl text-ink">
          Ви благодариме. Се јавуваме со конкретен предлог.
        </h2>
        <p className="mt-5 leading-relaxed text-ink-soft">
          Пред да се слушнеме, ќе ја погледнеме вашата страница и тоа како
          изгледате во пребарувањата. Ако процениме дека не сме вистинските за
          вас, ќе ви го кажеме тоа наместо да закажуваме состанок за да го
          кажеме.
        </p>
        {/* TODO: no backend is connected yet. Nothing was actually transmitted. */}
        <p className="u-label mt-8 text-ink-faint">
          Забелешка за изработката: сè уште нема поврзан систем, па пораката не е
          испратена.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[var(--radius-soft)] border border-rule bg-paper p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ime" className={labelCls}>Име и презиме</label>
          <input id="ime" required value={form.ime}
            onChange={(e) => setForm({ ...form, ime: e.target.value })} className={field} />
        </div>
        <div>
          <label htmlFor="firma" className={labelCls}>Фирма</label>
          <input id="firma" value={form.firma}
            onChange={(e) => setForm({ ...form, firma: e.target.value })} className={field} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Е-пошта</label>
          <input id="email" type="email" required value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
        </div>
        <div>
          <label htmlFor="telefon" className={labelCls}>
            Телефон <span className="normal-case tracking-normal">(по избор)</span>
          </label>
          <input id="telefon" type="tel" value={form.telefon}
            onChange={(e) => setForm({ ...form, telefon: e.target.value })} className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="veb" className={labelCls}>Веб-страница</label>
          <input id="veb" value={form.veb} placeholder="vashafirma.mk"
            onChange={(e) => setForm({ ...form, veb: e.target.value })} className={field} />
        </div>
        <div>
          <label htmlFor="branша" className={labelCls}>Дејност</label>
          <select id="branша" value={form.branша}
            onChange={(e) => setForm({ ...form, branша: e.target.value })} className={field}>
            {BRANSHI.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="vraboteni" className={labelCls}>Број на вработени</label>
          <select id="vraboteni" value={form.vraboteni}
            onChange={(e) => setForm({ ...form, vraboteni: e.target.value })} className={field}>
            {["до 20", "20-50", "50-100", "над 100"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="interes" className={labelCls}>Што ве интересира</label>
          <select id="interes" value={form.interes}
            onChange={(e) => setForm({ ...form, interes: e.target.value })} className={field}>
            {Object.entries(INTENTS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="poraka" className={labelCls}>Порака</label>
          <textarea id="poraka" rows={5} value={form.poraka}
            placeholder="Кој е вистинскиот проблем? Слободно директно, ќе заштеди еден состанок."
            onChange={(e) => setForm({ ...form, poraka: e.target.value })} className={field} />
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-6 rounded-[var(--radius-soft)] bg-flag-wash px-4 py-3 text-ink">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-8 w-full rounded-[var(--radius-soft)] bg-flag px-6 py-4 font-semibold text-white transition-colors hover:bg-flag-deep disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Се испраќа…" : "Испратете"}
      </button>

      <p className="mt-5 leading-relaxed text-ink-mute">
        Без билтени и без автоматски пораки. Дијагностиката чини{" "}
        {mkMoney(MK.diagnostics.price)}, а разговорот е бесплатен.
      </p>
    </form>
  );
}
