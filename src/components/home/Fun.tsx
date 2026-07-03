"use client";

import { useLang } from "@/lib/i18n";
import { FUN } from "@/data/site";
import { CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

export default function Fun() {
  const { t } = useLang();

  return (
    <section id="fun" className="home-bento-section">
      <TechnicalGrid className="opacity-20" />
      <div className="relative z-10 grid gap-8 border border-ink p-5 md:grid-cols-2 md:items-end md:p-7">
        <div>
          <SystemLabel>OFF DUTY</SystemLabel>
          <h2 className="display mt-5 text-[clamp(3.1rem,7vw,6rem)]">
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

      <div className="relative z-10 mt-3 grid gap-3 md:mt-4 md:gap-4 lg:grid-cols-3">
        <article className="bento-reactive relative overflow-hidden border border-ink p-5 md:p-7 lg:col-span-2">
          <span
            aria-hidden="true"
            className="display text-outline pointer-events-none absolute -bottom-5 right-3 text-[clamp(7rem,16vw,13rem)] opacity-10"
          >
            04
          </span>
          <div className="relative z-10 flex items-center justify-between">
            <SystemLabel>CURRENT TRAINING</SystemLabel>
            <CrossMark />
          </div>
          <p className="display relative z-10 mt-9 text-[clamp(3rem,6vw,5.4rem)]">{FUN.currentlyTraining.title}</p>
          <p className="u-label relative z-10 mt-5">
            {t(FUN.currentlyTraining.gym)} / {t(FUN.currentlyTraining.note)}
          </p>
          <div className="relative z-10 mt-8 flex flex-wrap gap-2">
            {FUN.martialArts.map((art) => (
              <span key={art} className="u-label border border-ink px-3 py-2">{art}</span>
            ))}
          </div>
        </article>

        <article className="bento-reactive border border-ink">
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
