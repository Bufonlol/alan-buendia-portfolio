"use client";

import { useLang } from "@/lib/i18n";
import { EXPERIENCE } from "@/data/site";
import { Barcode, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

export default function Experience() {
  const { t } = useLang();

  return (
    <section id="experience" className="relative overflow-hidden border-b border-ink px-4 py-24 md:px-8 md:py-36">
      <TechnicalGrid className="opacity-20" />
      <div className="relative z-10 grid gap-8 border-y border-ink py-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <SystemLabel>A—05 / FIELD RECORD</SystemLabel>
          <h2 className="display mt-5 text-[clamp(3.3rem,8vw,7rem)]">
            {t({ es: "Experiencia", en: "Experience" })}
          </h2>
        </div>
        <p className="max-w-[45ch] text-base font-semibold leading-snug md:justify-self-end">
          {t({
            es: "Trabajo enviado a producción para restaurantes, retail, clínicas y plataformas operativas.",
            en: "Production work shipped for restaurants, retail, clinics and operational platforms.",
          })}
        </p>
      </div>

      <div className="relative z-10 mt-8 grid gap-6 lg:grid-cols-3">
        {EXPERIENCE.map((job, index) => {
          const featured = index === 0;
          return (
            <article
              key={job.company}
              className={`grid border border-ink ${
                featured ? "lg:col-span-2 lg:grid-cols-[8rem_1fr_1.2fr]" : "lg:grid-cols-1"
              }`}
            >
              <div className="flex flex-row items-center justify-between border-b border-ink bg-ink p-4 text-paper lg:flex-col lg:items-start lg:justify-between lg:border-b-0 lg:border-r">
                <span className="u-label">REC / {String(index + 1).padStart(2, "0")}</span>
                <Barcode className="opacity-80 lg:mt-8" />
              </div>
              <div className={`border-b border-ink p-5 lg:p-7 ${featured ? "lg:border-b-0 lg:border-r" : ""}`}>
                <p className="u-label opacity-65">{t(job.period)}</p>
                <h3
                  className={`display mt-4 leading-none ${
                    featured ? "text-[clamp(2rem,4.5vw,4rem)]" : "text-[clamp(1.6rem,3.4vw,2.6rem)]"
                  }`}
                >
                  {t(job.role)}
                </h3>
                <p className="mt-4 text-lg font-bold">{job.company}</p>
                {!featured && (
                  <>
                    <p className="mt-4 text-sm font-medium leading-relaxed opacity-80">{t(job.summary)}</p>
                    <p className="u-label mt-5 border-t border-ink/35 pt-4 leading-relaxed opacity-70">
                      OUTPUT / {t(job.highlight)}
                    </p>
                  </>
                )}
              </div>
              {featured && (
                <div className="p-5 lg:p-7">
                  <p className="max-w-[52ch] text-sm font-medium leading-relaxed">{t(job.summary)}</p>
                  <p className="u-label mt-7 border-t border-ink/35 pt-4 leading-relaxed">
                    OUTPUT / {t(job.highlight)}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
