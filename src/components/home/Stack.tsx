"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { STACK } from "@/data/site";
import { VerticalText } from "@/components/modular/VerticalText";
import { Barcode, CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import {
  Atom,
  Box,
  Braces,
  Database,
  GitBranch,
  Hexagon,
  Leaf,
  Server,
  Shield,
  Sparkles,
  Triangle,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  React: Atom,
  "Next.js": Triangle,
  TypeScript: Braces,
  "Node.js": Hexagon,
  Angular: Shield,
  "Spring Boot": Leaf,
  PostgreSQL: Database,
  MySQL: Server,
  Supabase: Zap,
  Git: GitBranch,
  GSAP: Sparkles,
  "Three.js": Box,
};

const MATRIX_CLASS = [
  "stack-react",
  "stack-next",
  "stack-typescript",
  "stack-node",
  "stack-angular",
  "stack-spring",
  "stack-postgres",
  "stack-mysql",
  "stack-supabase",
  "stack-git",
  "stack-gsap",
  "stack-three",
];

export default function Stack() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const pieces = gsap.utils.toArray<HTMLElement>(".stack-piece", section);

      if (prefersReducedMotion()) {
        gsap.set(pieces, { x: 0, y: 0, clipPath: "inset(0%)" });
        return;
      }

      gsap.fromTo(
        pieces,
        {
          x: (index) => (index % 2 ? 18 : -18),
          y: (index) => (index % 3 ? 10 : 24),
          clipPath: (index) => (index % 2 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)"),
        },
        {
          x: 0,
          y: 0,
          clipPath: "inset(0%)",
          duration: 0.72,
          stagger: 0.045,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="stack" className="home-bento-section">
      <TechnicalGrid className="opacity-20" />

      <div className="relative z-10">
        <header className="stack-heading">
          <div className="stack-heading-title border border-ink p-4 md:p-6">
            <h2 className="display text-[clamp(2.5rem,8vw,6.8rem)] leading-[0.8]">
              {t({ es: "Sistema de herramientas", en: "Build system" })}
            </h2>
          </div>
          <div className="stack-heading-count flex flex-col justify-between border border-ink bg-ink p-4 text-paper">
            <SystemLabel>ACTIVE / MODULES</SystemLabel>
            <span className="display text-[clamp(4.5rem,9vw,8rem)]">{STACK.length}</span>
            <Barcode className="text-paper" />
          </div>
          <div className="stack-heading-vertical flex items-center justify-center border border-ink">
            <VerticalText>FRONTEND / BACKEND / DATA / MOTION</VerticalText>
          </div>
        </header>

        <div className="stack-chaos-grid mt-2">
          <div className="stack-piece stack-asset relative flex flex-col justify-between overflow-hidden border border-ink bg-paper p-5">
            <SystemLabel>OBJECT / STACK</SystemLabel>
            <div className="flex flex-1 items-center justify-center">
              <div className="stack-nest">
                <span className="stack-nest-ring stack-nest-ring--1" />
                <span className="stack-nest-ring stack-nest-ring--2" />
                <span className="stack-nest-ring stack-nest-ring--3" />
              </div>
            </div>
            <SystemLabel className="self-end border border-ink bg-paper px-2 py-1">{STACK.length} TOOLS / VERIFIED</SystemLabel>
          </div>

          {STACK.map((item, index) => {
            const Icon = ICONS[item.name] ?? Braces;
            const inverted = ["React", "GSAP"].includes(item.name);
            const giant = ["React", "TypeScript", "GSAP", "Three.js"].includes(item.name);

            return (
              <div
                key={item.name}
                className={`stack-piece tool-cell group flex min-w-0 flex-col justify-between overflow-hidden border border-ink p-3 ${
                  MATRIX_CLASS[index]
                } ${inverted ? "bg-ink text-paper" : "bg-paper text-ink"}`}
              >
                <div className="flex items-center justify-between">
                  <SystemLabel className="opacity-85">{String(index + 1).padStart(2, "0")} / {t(item.meta)}</SystemLabel>
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6" strokeWidth={1.5} />
                </div>
                <div>
                  <p className={`display leading-[0.88] ${giant ? "text-[clamp(2rem,4.5vw,4.8rem)]" : "text-[clamp(1.3rem,2.4vw,2.4rem)]"}`}>
                    {item.name}
                  </p>
                  <SystemLabel className="mt-2 block opacity-85">SYS / VERIFIED / PROD</SystemLabel>
                </div>
              </div>
            );
          })}

          <div className="stack-piece stack-empty flex items-center justify-between border border-ink bg-paper p-3">
            <CrossMark />
            <SystemLabel>FRAME / EMPTY / RESERVED</SystemLabel>
            <CrossMark />
          </div>
        </div>
      </div>
    </section>
  );
}
