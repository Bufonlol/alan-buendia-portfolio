"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { STACK } from "@/data/site";
import { Barcode, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import {
  Atom,
  Braces,
  Database,
  GitBranch,
  Hexagon,
  Leaf,
  Server,
  Shield,
  Sparkles,
  Box,
  Triangle,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "React": Atom,
  "Next.js": Triangle,
  "TypeScript": Braces,
  "Node.js": Hexagon,
  "Angular": Shield,
  "Spring Boot": Leaf,
  "PostgreSQL": Database,
  "MySQL": Server,
  "Supabase": Zap,
  "Git": GitBranch,
  "GSAP": Sparkles,
  "Three.js": Box,
};

const FEATURED = ["GSAP", "Three.js"];

export default function Stack() {
  const { t } = useLang();
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current || prefersReducedMotion()) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".tool-tile", gridRef.current),
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.035,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: gridRef }
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
          ref={gridRef}
          className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-4 lg:grid-cols-6"
        >
          {STACK.map((item, index) => {
            const Icon = ICONS[item.name] ?? Braces;
            const featured = FEATURED.includes(item.name);
            return (
              <div
                key={item.name}
                className={`tool-tile bento-reactive group relative flex aspect-square flex-col justify-between border border-ink p-4 ${
                  featured ? "bg-ink text-paper" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <SystemLabel className={featured ? "opacity-60" : "opacity-40"}>
                    {String(index + 1).padStart(2, "0")}
                  </SystemLabel>
                  <Icon
                    className="h-6 w-6 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="display text-[clamp(0.95rem,1.6vw,1.25rem)] leading-tight">
                    {item.name}
                  </p>
                  <SystemLabel className={`mt-1 block ${featured ? "opacity-60" : "opacity-45"}`}>
                    {t(item.meta)}
                  </SystemLabel>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
