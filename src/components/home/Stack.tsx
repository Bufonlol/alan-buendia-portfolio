"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { STACK } from "@/data/site";
import { Barcode, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

const pick = (names: string[]) => STACK.filter((item) => names.includes(item.name));

const GROUPS = [
  {
    key: "core",
    label: { es: "NÚCLEO", en: "CORE" },
    items: pick(["React", "Next.js", "TypeScript"]),
    span: "lg:col-span-2 lg:row-span-2",
    big: true,
    inverted: false,
  },
  {
    key: "motion",
    label: { es: "MOTION / 3D", en: "MOTION / 3D" },
    items: pick(["GSAP", "Three.js"]),
    span: "lg:row-span-2",
    big: false,
    inverted: true,
  },
  {
    key: "backend",
    label: { es: "BACKEND", en: "BACKEND" },
    items: pick(["Node.js", "Laravel", "Spring Boot"]),
    span: "",
    big: false,
    inverted: false,
  },
  {
    key: "database",
    label: { es: "BASE DE DATOS", en: "DATABASE" },
    items: pick(["PostgreSQL", "MySQL", "Supabase"]),
    span: "",
    big: false,
    inverted: false,
  },
  {
    key: "workflow",
    label: { es: "FLUJO", en: "WORKFLOW" },
    items: pick(["Git"]),
    span: "",
    big: false,
    inverted: false,
  },
];

export default function Stack() {
  const { t } = useLang();
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!listRef.current || prefersReducedMotion()) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".tool-cell", listRef.current),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: listRef.current, start: "top 82%", once: true },
        }
      );
    },
    { scope: listRef }
  );

  return (
    <section id="stack" className="home-bento-section">
      <TechnicalGrid className="opacity-20" />
      <div className="relative z-10">
        <div className="grid gap-8 border border-ink p-5 md:grid-cols-[1fr_auto] md:items-end md:p-7">
          <div>
            <SystemLabel>PRODUCTION TOOLCHAIN</SystemLabel>
            <h2 className="display mt-5 text-[clamp(3.2rem,7vw,6rem)]">
              {t({ es: "Sistema de", en: "Build" })}
              <br />
              {t({ es: "herramientas", en: "system" })}
            </h2>
          </div>
          <div className="flex items-end gap-6">
            <Barcode className="hidden md:block" />
            <p className="u-label max-w-[32ch] leading-relaxed md:text-right">
              {t({
                es: "TECNOLOGÍAS USADAS EN PRODUCCIÓN. SIN PORCENTAJES DECORATIVOS.",
                en: "TECHNOLOGIES USED IN PRODUCTION. NO DECORATIVE PERCENTAGES.",
              })}
            </p>
          </div>
        </div>

        <div
          ref={listRef}
          className="mt-3 grid gap-3 md:mt-4 md:gap-4 lg:auto-rows-[minmax(140px,auto)] lg:grid-cols-3 lg:[grid-auto-flow:dense]"
        >
          {GROUPS.map((group) => (
            <div
              key={group.key}
              className={`tool-cell bento-reactive group relative overflow-hidden border border-ink p-5 md:p-6 ${group.span} ${
                group.inverted ? "bg-ink text-paper" : ""
              }`}
            >
              {group.key === "core" && (
                <div
                  className="pointer-events-none absolute -right-10 -bottom-10 h-[260px] w-[260px] opacity-[0.35] mix-blend-multiply"
                  style={{
                    maskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 30%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 30%, transparent 75%)",
                  }}
                >
                  <Image src="/assets/stack-layers.png" alt="" fill sizes="260px" className="object-contain" />
                </div>
              )}
              <div className="relative z-10 flex items-center justify-between">
                <SystemLabel className={group.inverted ? "opacity-70" : "opacity-60"}>
                  {t(group.label)}
                </SystemLabel>
                <SystemLabel className={group.inverted ? "opacity-50" : "opacity-40"}>
                  {String(group.items.length).padStart(2, "0")}
                </SystemLabel>
              </div>
              <ul className={`relative z-10 ${group.big ? "mt-6 grid gap-4" : "mt-5 grid gap-2"}`}>
                {group.items.map((item, i) => (
                  <li key={item.name} className="flex items-baseline gap-3">
                    <span
                      className={`u-label ${group.inverted ? "opacity-50" : "opacity-40"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={
                        group.big
                          ? "display text-[clamp(2rem,4.5vw,3.8rem)] leading-none"
                          : "display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-none"
                      }
                    >
                      {item.name}
                    </span>
                    {group.big && (
                      <span className={`u-label ml-auto ${group.inverted ? "opacity-60" : "opacity-50"}`}>
                        {t(item.meta)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
