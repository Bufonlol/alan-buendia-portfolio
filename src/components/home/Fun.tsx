"use client";

import { useLang } from "@/lib/i18n";
import { FUN } from "@/data/site";
import { CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

export default function Fun() {
  const { t } = useLang();

  return (
    <section id="fun" className="relative overflow-hidden border-b border-ink px-4 py-24 md:px-8 md:py-36">
      <TechnicalGrid className="opacity-20" />
      <div className="relative z-10 grid gap-8 border-y border-ink py-5 md:grid-cols-2 md:items-end">
        <div>
          <SystemLabel>A—07 / OFF DUTY</SystemLabel>
          <h2 className="display mt-5 text-[clamp(3.2rem,8vw,7rem)]">
            {t({ es: "Fuera del", en: "Outside" })}
            <br />
            {t({ es: "sistema", en: "the system" })}
          </h2>
        </div>
        <p className="max-w-[40ch] text-base font-semibold leading-snug md:justify-self-end">
          {t({
            es: "La disciplina también se entrena lejos del teclado.",
            en: "Discipline is trained away from the keyboard too.",
          })}
        </p>
      </div>

      <div className="relative z-10 mt-8 grid gap-6 lg:grid-cols-3">
        <article className="border border-ink p-5 md:p-7 lg:col-span-2">
          <div className="flex items-center justify-between">
            <SystemLabel>CURRENT TRAINING</SystemLabel>
            <CrossMark />
          </div>
          <p className="display mt-14 text-[clamp(3rem,7vw,6rem)]">{FUN.currentlyTraining.title}</p>
          <p className="u-label mt-5">
            {t(FUN.currentlyTraining.gym)} / {t(FUN.currentlyTraining.note)}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {FUN.martialArts.map((art) => (
              <span key={art} className="u-label border border-ink px-3 py-2">{art}</span>
            ))}
          </div>
        </article>

        <article className="border border-ink">
          <div className="flex items-center justify-between border-b border-ink p-5">
            <SystemLabel>ACTIVE INTERESTS</SystemLabel>
            <span className="u-label">03 RECORDS</span>
          </div>
          <ul>
            {FUN.interests.map((interest, index) => (
              <li key={interest.name.en} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-ink p-5 last:border-b-0">
                <span className="u-label opacity-60">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display text-2xl">{t(interest.name)}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed">{t(interest.note)}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
