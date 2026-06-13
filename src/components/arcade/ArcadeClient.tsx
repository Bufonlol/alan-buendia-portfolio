"use client";

import PageHeader from "@/components/PageHeader";
import LabCard from "@/components/lab/LabCard";
import BreakoutGame from "@/components/arcade/BreakoutGame";
import MiniFooter from "@/components/MiniFooter";
import { useLang } from "@/lib/i18n";

export default function ArcadeClient() {
  const { t } = useLang();
  return (
    <main className="px-5 pt-28 md:px-8">
      <PageHeader
        kicker={{ es: "Inserta moneda", en: "Insert coin" }}
        title={{ es: "Arcade", en: "Arcade" }}
        blurb={{
          es: "una sola máquina por ahora, construida desde cero en <canvas> — sin motor, sin librería, solo matemáticas de colisión. tu récord nunca sale del navegador.",
          en: "one cabinet for now, built from scratch in a <canvas> — no engine, no library, just collision math. your high score never leaves your browser.",
        }}
      />

      <div className="mx-auto mt-16 max-w-3xl pb-8">
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

      <p className="u-label pb-20 text-center text-muted">
        {t({
          es: "más máquinas en construcción ✳ ¿tienes una idea de juego? reto aceptado",
          en: "more cabinets under construction ✳ got a game idea? challenge accepted",
        })}
      </p>

      <div className="-mx-5 md:-mx-8">
        <MiniFooter />
      </div>
    </main>
  );
}
