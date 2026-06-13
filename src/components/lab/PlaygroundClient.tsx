"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import LabCard from "@/components/lab/LabCard";
import ThreeScene from "@/components/lab/ThreeScene";
import ShaderGradient from "@/components/lab/ShaderGradient";
import TimelineDemo from "@/components/lab/TimelineDemo";
import Particles from "@/components/lab/Particles";
import MarqueeLab from "@/components/lab/MarqueeLab";
import Distortion from "@/components/lab/Distortion";
import FlowField from "@/components/lab/FlowField";
import AsciiDonut from "@/components/lab/AsciiDonut";
import Rope from "@/components/lab/Rope";
import ScrambleType from "@/components/lab/ScrambleType";
import MiniFooter from "@/components/MiniFooter";

export default function PlaygroundClient() {
  const { ready, navigate } = useApp();
  const { t } = useLang();
  const headRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ready || !headRef.current) return;
      const q = gsap.utils.selector(headRef);

      if (prefersReducedMotion()) {
        gsap.fromTo(
          [titleRef.current, ...q(".lab-fade")],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8, stagger: 0.06, ease: "power2.out", delay: 0.3 }
        );
        return;
      }

      const split = new SplitText(titleRef.current, { type: "chars", mask: "chars" });
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .set(titleRef.current, { autoAlpha: 1 })
        .fromTo(
          split.chars,
          { yPercent: 115 },
          { yPercent: 0, duration: 1, stagger: 0.04 },
          0.35
        )
        .fromTo(
          q(".lab-fade"),
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 },
          0.7
        );
    },
    { dependencies: [ready], scope: headRef }
  );

  return (
    <main className="px-5 pt-28 md:px-8">
      <header ref={headRef}>
        <div className="lab-fade flex items-center justify-between" style={{ opacity: 0 }}>
          <button onClick={() => navigate("/")} className="u-label link-line uppercase">
            {t({ es: "← Índice", en: "← Index" })}
          </button>
          <span className="u-label text-muted">
            {t({ es: "El laboratorio", en: "The lab" })}
          </span>
        </div>
        <h1
          ref={titleRef}
          className="display mt-8 text-[clamp(3.4rem,14vw,13rem)] leading-[0.88]"
          style={{ opacity: 0 }}
        >
          Play<span className="text-accent">✳</span>ground
        </h1>
        <p
          className="lab-fade mt-6 max-w-[36rem] font-serif text-xl italic text-ink-soft md:text-2xl"
          style={{ opacity: 0 }}
        >
          {t({
            es: "experimentos, bocetos e ideas raras — aquí nacen los trucos del sitio principal. todo lo de abajo está vivo, tócalo.",
            en: "experiments, sketches & weird ideas — this is where the main site's tricks are born. everything below is live, touch it.",
          })}
        </p>
      </header>

      <section className="mt-16 grid gap-6 pb-20 lg:grid-cols-2">
        <LabCard
          index="01"
          title={t({ es: "Escena Three.js", en: "Three.js Scene" })}
          tech="WebGL"
          note={t({
            es: "Arrastra para girar — inercia incluida, el recibo de luz no.",
            en: "Drag to spin — inertia included, electricity bill not.",
          })}
        >
          <ThreeScene />
        </LabCard>

        <LabCard
          index="02"
          title={t({ es: "Efecto Shader", en: "Shader Effect" })}
          tech="GLSL"
          note={t({
            es: "Ruido fbm deformado por dominio. Mueve el cursor para revolver la pintura.",
            en: "Domain-warped fbm noise. Move the cursor to stir the paint.",
          })}
        >
          <ShaderGradient />
        </LabCard>

        <LabCard
          index="03"
          title={t({ es: "Timeline GSAP", en: "GSAP Timeline" })}
          tech="GSAP"
          note={t({
            es: "Un timeline, muchos tweens. Scrubéalo como editor de video.",
            en: "One timeline, many tweens. Scrub it like a video editor.",
          })}
        >
          <TimelineDemo />
        </LabCard>

        <LabCard
          index="04"
          title={t({ es: "Partículas Canvas", en: "Canvas Particles" })}
          tech="Canvas 2D"
          note={t({
            es: "Una cuadrícula de puntos con problemas de espacio personal. Atraviésala.",
            en: "A dot grid with personal space issues. Push through it.",
          })}
        >
          <Particles />
        </LabCard>

        <LabCard
          index="05"
          title={t({ es: "Marquee Infinito", en: "Infinite Marquee" })}
          tech="GSAP Draggable"
          note={t({
            es: "Tres carriles, direcciones opuestas, wrap infinito. Aviéntalo.",
            en: "Three lanes, opposite directions, infinite wrap. Flick it.",
          })}
        >
          <MarqueeLab />
        </LabCard>

        <LabCard
          index="06"
          title={t({ es: "Distorsión WebGL", en: "WebGL Distortion" })}
          tech="GLSL"
          note={t({
            es: "El hover derrite los píxeles. Los canales RGB se separan bajo presión.",
            en: "Hover melts the pixels. RGB channels split under pressure.",
          })}
        >
          <Distortion />
        </LabCard>

        <LabCard
          index="07"
          title={t({ es: "Campo de Flujo", en: "Flow Field" })}
          tech="Canvas 2D"
          note={t({
            es: "650 partículas obedeciendo viento invisible. Mueve el cursor para agitarlo.",
            en: "650 particles obeying invisible wind. Move the cursor to stir the field.",
          })}
        >
          <FlowField />
        </LabCard>

        <LabCard
          index="08"
          title={t({ es: "Dona ASCII", en: "ASCII Donut" })}
          tech={t({ es: "Matemática pura", en: "Pure math" })}
          note={t({
            es: "donut.c, con respeto. Un toro 3D sin nada de WebGL — hover para overclockear.",
            en: "donut.c, paid respect. A 3D torus with zero WebGL — hover to overclock.",
          })}
        >
          <AsciiDonut />
        </LabCard>

        <LabCard
          index="09"
          title={t({ es: "Física de Cuerda", en: "Rope Physics" })}
          tech="Verlet"
          note={t({
            es: "26 segmentos, 3 pasadas de restricción, 1 nudo naranja. Azótala.",
            en: "26 segments, 3 constraint passes, 1 orange knot. Whip it.",
          })}
        >
          <Rope />
        </LabCard>

        <LabCard
          index="10"
          title={t({ es: "Tipografía Scramble", en: "Scramble Type" })}
          tech="GSAP ScrambleText"
          note={t({
            es: "El switch bilingüe — pasa el cursor sobre una palabra para traducirla.",
            en: "The bilingual switch — hover a word to translate it.",
          })}
        >
          <ScrambleType />
        </LabCard>
      </section>

      <div className="-mx-5 md:-mx-8">
        <MiniFooter />
      </div>
    </main>
  );
}
