"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { FUN } from "@/data/site";
import SectionHeader from "@/components/SectionHeader";

export default function Fun() {
  const { t } = useLang();
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".fun-card", gridRef.current),
        { y: 50, scale: 0.96, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
        }
      );
    },
    { scope: gridRef }
  );

  const cardBase =
    "fun-card border border-line bg-paper p-6 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:rotate-0 hover:scale-[1.015]";

  return (
    <section id="fun" className="px-5 py-28 md:px-8 md:py-40">
      <SectionHeader
        index="05"
        label={t({ es: "Fuera de horario", en: "Off the clock" })}
        title={t({ es: "Segundo jugador", en: "Player two" })}
      />
      <div ref={gridRef} className="mt-14 grid gap-5 md:grid-cols-12">
        {/* currently playing */}
        <div className={`${cardBase} -rotate-[1.2deg] md:col-span-5`}>
          <div className="flex items-center justify-between">
            <span className="u-label text-muted">
              {t({ es: "Jugando ahora", en: "Currently playing" })}
            </span>
            <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-[3px] origin-bottom bg-accent"
                  style={{
                    height: "100%",
                    animation: `eq-bar 1s ease-in-out ${i * 0.18}s infinite`,
                  }}
                />
              ))}
            </span>
          </div>
          <p className="display mt-6 text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none">
            {FUN.currentlyPlaying.title}
          </p>
          <p className="u-label mt-4 text-muted">
            {FUN.currentlyPlaying.platform} — {t(FUN.currentlyPlaying.note)}
          </p>
        </div>

        {/* favorite games */}
        <div className={`${cardBase} rotate-[0.8deg] md:col-span-7`}>
          <span className="u-label text-muted">
            {t({ es: "Juegos favoritos", en: "Favorite games" })}
          </span>
          <div className="mt-6 flex flex-wrap gap-3">
            {FUN.favoriteGames.map((g) => (
              <span
                key={g}
                className="pill u-label transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {g}
              </span>
            ))}
          </div>
          <p className="mt-6 font-serif italic text-ink-soft">
            {t({
              es: "el game feel son curvas de easing con mejor marketing.",
              en: "game feel is just easing curves with better marketing.",
            })}
          </p>
        </div>

        {/* interests */}
        <div className={`${cardBase} rotate-[0.6deg] md:col-span-7`}>
          <span className="u-label text-muted">
            {t({ es: "Intereses", en: "Interests" })}
          </span>
          <ul className="mt-4">
            {FUN.interests.map((it) => (
              <li
                key={it.name.en}
                className="group flex flex-col gap-1 border-b border-line py-4 last:border-b-0 md:flex-row md:items-baseline md:gap-6"
              >
                <span className="display shrink-0 text-2xl transition-colors group-hover:text-accent md:w-56">
                  {t(it.name)}
                </span>
                <span className="text-sm leading-relaxed text-muted">{t(it.note)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* easter egg hint */}
        <div className={`${cardBase} -rotate-[0.8deg] md:col-span-5`}>
          <span className="u-label text-muted">Easter eggs</span>
          <p className="mt-6 font-serif text-xl italic leading-snug text-ink-soft">
            {t({
              es: "hay dos escondidos en este sitio. uno es más viejo que tú.",
              en: "two are hidden on this site. one is older than you.",
            })}
          </p>
          <p className="mt-6 flex flex-wrap gap-1.5" aria-label="Konami code">
            {["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"].map((k, i) => (
              <kbd
                key={i}
                className="u-label flex h-8 w-8 items-center justify-center border border-line transition-colors hover:border-accent hover:text-accent"
              >
                {k}
              </kbd>
            ))}
          </p>
          <p className="u-label mt-4 text-muted">
            {t({
              es: "…y prueba darle clic al logo. muchas veces.",
              en: "…and try clicking the logo. a lot.",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
