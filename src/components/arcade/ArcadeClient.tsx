"use client";

import PageHeader from "@/components/PageHeader";
import LabCard from "@/components/lab/LabCard";
import BreakoutGame from "@/components/arcade/BreakoutGame";
import MiniFooter from "@/components/MiniFooter";
import { SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import { useLang } from "@/lib/i18n";

export default function ArcadeClient() {
  const { t } = useLang();
  return (
    <main className="px-5 pt-28 md:px-8">
      <div className="relative">
        <TechnicalGrid className="opacity-20" />
        <div className="relative z-10">
          <PageHeader
            kicker={{ es: "Inserta moneda", en: "Insert coin" }}
            title={{ es: "Arcade", en: "Arcade" }}
            blurb={{
              es: "una sola máquina por ahora, construida desde cero en <canvas> — sin motor, sin librería, solo matemáticas de colisión. tu récord nunca sale del navegador.",
              en: "one cabinet for now, built from scratch in a <canvas> — no engine, no library, just collision math. your high score never leaves your browser.",
            }}
          />

          <div className="mt-16 grid gap-6 pb-20 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LabCard
                index="01"
                title={t({ es: "Buendía Breaker", en: "Buendía Breaker" })}
                tech="Canvas 2D"
                note={t({
                  es: "Mouse o ← → para mover · click / space para lanzar · 3 vidas. Los bricks dicen lo obvio.",
                  en: "Mouse or ← → to move · click / space to launch · 3 lives. The bricks spell the obvious.",
                })}
              >
                <BreakoutGame />
              </LabCard>
            </div>

            <div className="grid content-start gap-6">
              <div className="border border-line p-5">
                <SystemLabel className="text-muted">CONTROLS</SystemLabel>
                <ul className="mt-4 grid gap-3">
                  <li className="u-label flex items-center justify-between border-b border-line pb-3">
                    {t({ es: "MOVER", en: "MOVE" })}
                    <span className="text-muted">{t({ es: "MOUSE / ← →", en: "MOUSE / ← →" })}</span>
                  </li>
                  <li className="u-label flex items-center justify-between border-b border-line pb-3">
                    {t({ es: "LANZAR", en: "LAUNCH" })}
                    <span className="text-muted">{t({ es: "CLICK / SPACE", en: "CLICK / SPACE" })}</span>
                  </li>
                  <li className="u-label flex items-center justify-between">
                    {t({ es: "VIDAS", en: "LIVES" })}
                    <span className="text-muted">3</span>
                  </li>
                </ul>
              </div>
              <div className="border border-ink bg-ink p-5 text-paper">
                <SystemLabel className="opacity-85">
                  {t({ es: "SIN DEPENDENCIAS", en: "ZERO DEPENDENCIES" })}
                </SystemLabel>
                <p className="display mt-3 text-3xl leading-none">CANVAS 2D</p>
                <p className="u-label mt-3 opacity-85">
                  {t({ es: "SIN MOTOR / SIN LIBRERÍA", en: "NO ENGINE / NO LIBRARY" })}
                </p>
              </div>
              <p className="u-label text-muted">
                {t({
                  es: "más máquinas en construcción ◆ ¿tienes una idea de juego? reto aceptado",
                  en: "more cabinets under construction ◆ got a game idea? challenge accepted",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="-mx-5 md:-mx-8">
        <MiniFooter />
      </div>
    </main>
  );
}
