"use client";

import { useRef } from "react";
import {
  gsap,
  useGSAP,
  Draggable,
  prefersReducedMotion,
} from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { PROJECTS } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";

export default function FeaturedProjects() {
  const { navigate } = useApp();
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const draggedRef = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // NOTE: the pinned slider runs even under prefers-reduced-motion —
      // it's user-driven (scroll/drag), not autonomous motion. Only the
      // scrub smoothing is dropped so position maps 1:1 to input.
      const calm = prefersReducedMotion();

      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: calm ? true : 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${self.progress})`;
            if (counterRef.current) {
              const i = Math.min(
                PROJECTS.length,
                Math.floor(self.progress * PROJECTS.length) + 1
              );
              counterRef.current.textContent = String(i).padStart(2, "0");
            }
          },
        },
      });
      const st = tween.scrollTrigger!;

      /* Drag the track → drives page scroll (which drives the scrub) */
      const proxy = document.createElement("div");
      let startScroll = 0;
      const clampScroll = (v: number) =>
        gsap.utils.clamp(st.start + 1, st.end - 1, v);

      const drag = Draggable.create(proxy, {
        trigger: track,
        type: "x",
        inertia: true,
        allowNativeTouchScrolling: true,
        onPress() {
          startScroll = st.scroll();
          draggedRef.current = false;
        },
        onDrag(this: Draggable) {
          draggedRef.current = true;
          st.scroll(clampScroll(startScroll - (this.x - this.startX) * 1.4));
        },
        onThrowUpdate(this: Draggable) {
          st.scroll(clampScroll(startScroll - (this.x - this.startX) * 1.4));
        },
      })[0];

      // swallow the click that follows a drag so cards don't navigate
      const onClickCapture = (e: MouseEvent) => {
        if (draggedRef.current) {
          e.preventDefault();
          e.stopPropagation();
          draggedRef.current = false;
        }
      };
      track.addEventListener("click", onClickCapture, true);

      return () => {
        track.removeEventListener("click", onClickCapture, true);
        drag.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden">
      <div className="flex h-[100svh] flex-col justify-center">
        {/* header inside the pinned viewport */}
        <div className="absolute left-5 top-20 z-10 flex items-baseline gap-4 md:left-8">
          <span className="u-label text-accent">01</span>
          <span className="u-label text-muted">
            {t({ es: "Trabajo destacado", en: "Featured work" })}
          </span>
        </div>

        <div
          ref={trackRef}
          data-cursor="drag"
          className="flex w-max select-none items-center gap-[5vw] px-[6vw] will-change-transform"
        >
          {/* intro panel */}
          <div className="w-[78vw] shrink-0 md:w-[34vw]">
            <h2 className="display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.9]">
              {t({ es: "Proyectos", en: "Selected" })}
              <br />
              {t({ es: "selectos", en: "projects" })}
              <span className="text-accent">✳</span>
            </h2>
            <p className="mt-6 max-w-[24rem] font-serif text-xl italic text-ink-soft">
              {t({
                es: "seis sistemas para negocios reales — arrastra hacia un lado o simplemente sigue scrolleando.",
                en: "six systems for real businesses — drag sideways or just keep scrolling.",
              })}
            </p>
            <p className="u-label mt-8 text-muted">2024 — 2026</p>
          </div>

          {PROJECTS.map((p) => (
            <a
              key={p.slug}
              href={`/projects/${p.slug}`}
              data-cursor="view"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/projects/${p.slug}`);
              }}
              className="group w-[82vw] shrink-0 md:w-[56vw] lg:w-[44vw]"
            >
              <ProjectVisual
                project={p}
                image={p.cardImage}
                className="aspect-[16/10] w-full [container-type:inline-size] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[0.985]"
              />
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
                <div className="flex items-baseline gap-4">
                  <span className="u-label text-accent">{p.index}</span>
                  <h3 className="display text-[clamp(1.6rem,3.4vw,2.6rem)] transition-transform duration-500 group-hover:translate-x-2">
                    {t(p.title)}
                  </h3>
                </div>
                <span className="u-label hidden text-muted md:block">{p.year}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="u-label pill !py-1 text-muted">
                    {t}
                  </span>
                ))}
                <span className="u-label ml-auto text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t({ es: "Caso de estudio →", en: "Case study →" })}
                </span>
              </div>
            </a>
          ))}

          {/* outro panel */}
          <div className="w-[70vw] shrink-0 pr-[10vw] md:w-[30vw]">
            <p className="u-label text-muted">
              {t({ es: "¿Quieres lo raro?", en: "Want the weird stuff?" })}
            </p>
            <a
              href="/playground"
              data-cursor="view"
              onClick={(e) => {
                e.preventDefault();
                navigate("/playground");
              }}
              className="display mt-4 block text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] text-ink transition-colors hover:text-accent"
            >
              {t({ es: "Entra al", en: "Enter the" })}
              <br />
              playground →
            </a>
            <div className="u-label mt-8 flex flex-col gap-3">
              <a
                href="/archive"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/archive");
                }}
                className="link-line w-fit uppercase"
              >
                {t({
                  es: "Explora el archivo completo →",
                  en: "Browse the full archive →",
                })}
              </a>
              <a
                href="/arcade"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/arcade");
                }}
                className="link-line w-fit uppercase"
              >
                {t({
                  es: "O pierde el tiempo en el arcade ✳",
                  en: "Or waste time in the arcade ✳",
                })}
              </a>
            </div>
          </div>
        </div>

        {/* progress UI */}
        <div className="absolute bottom-8 left-5 right-5 z-10 flex items-center gap-6 md:left-8 md:right-8">
          <span className="u-label tabular-nums">
            <span ref={counterRef}>01</span> / {String(PROJECTS.length).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-line">
            <div ref={barRef} className="h-px origin-left scale-x-0 bg-accent" />
          </div>
          <span className="u-label hidden text-muted md:block">
            {t({ es: "[ arrastra ]", en: "[ drag ]" })}
          </span>
        </div>
      </div>
    </section>
  );
}
