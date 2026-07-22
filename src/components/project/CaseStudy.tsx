"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Observer } from "gsap/Observer";
import { useLang, type L } from "@/lib/i18n";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import type { Project } from "@/data/projects";
import TLink from "@/components/ui/TLink";

if (typeof window !== "undefined") gsap.registerPlugin(Observer);

type Props = { project: Project; next: Project };

const PAGE_COUNT = 6;

export default function CaseStudy({ project, next }: Props) {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const acidRef = useRef<HTMLDivElement>(null);
  const goToRef = useRef<(index: number) => void>(() => undefined);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const title = root.current?.querySelector(".case-intro__title");
      const details = root.current?.querySelectorAll(".case-intro__detail");
      const disc = root.current?.querySelector(".case-cover__disc");
      let played = false;

      if (title) gsap.set(title, { yPercent: 112 });
      if (details?.length) gsap.set(details, { y: 24, autoAlpha: 0 });
      if (disc) gsap.set(disc, { scale: 0.94, transformOrigin: "center" });

      const play = () => {
        if (played) return;
        played = true;
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        if (disc) tl.to(disc, { scale: 1, duration: 0.9 }, 0);
        if (title) tl.to(title, { yPercent: 0, duration: 0.9 }, 0.04);
        if (details?.length) {
          tl.to(details, { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.07 }, 0.2);
        }
      };

      const routed = document.documentElement.dataset.routeTransition === "1";
      const frame = routed ? null : requestAnimationFrame(play);
      if (routed) window.addEventListener("route:reveal", play, { once: true });

      return () => {
        if (frame !== null) cancelAnimationFrame(frame);
        window.removeEventListener("route:reveal", play);
      };
    },
    { scope: root }
  );

  useEffect(() => {
    const container = root.current;
    if (!container) return;

    const html = document.documentElement;
    const slides = Array.from(container.querySelectorAll<HTMLElement>(".case-slide"));
    html.dataset.caseDeck = "1";
    let current = 0;
    let animating = false;

    const setActiveOnly = (index: number) => {
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          visibility: i === index ? "visible" : "hidden",
          zIndex: i === index ? 2 : 0,
          clearProps: "clipPath,transform",
        });
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
      html.dataset.caseTone = slides[index]?.dataset.caseTone ?? "dark";
      html.dataset.caseBg = slides[index]?.dataset.caseBg ?? "ink";
    };

    const animateContent = (tl: gsap.core.Timeline, slide: HTMLElement, at: number) => {
      const kicker = slide.querySelectorAll(".case-kicker");
      const heading = slide.querySelectorAll(".case-heading");
      const copy = slide.querySelectorAll(".case-copy");
      const rows = slide.querySelectorAll(".case-row");
      const media = slide.querySelectorAll(".case-media");

      if (kicker.length) {
        tl.fromTo(kicker, { x: -18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.42, ease: "power3.out" }, at);
      }
      if (heading.length) {
        tl.fromTo(heading, { yPercent: 112 }, { yPercent: 0, duration: 0.72, ease: "power4.out" }, at + 0.04);
      }
      if (copy.length) {
        tl.fromTo(copy, { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.62, ease: "power3.out" }, at + 0.12);
      }
      if (rows.length) {
        tl.fromTo(rows, { x: 28, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.52, stagger: 0.055, ease: "power3.out" }, at + 0.12);
      }
      if (media.length) {
        tl.fromTo(media, { clipPath: "inset(0 100% 0 0)", y: 24 }, { clipPath: "inset(0 0% 0 0)", y: 0, duration: 0.72, stagger: 0.07, ease: "power3.inOut" }, at + 0.08);
      }
    };

    const goTo = (next: number) => {
      if (animating || next === current || next < 0 || next >= slides.length) return;
      animating = true;
      const outgoing = slides[current];
      const incoming = slides[next];
      const boundary = Math.min(current, next);
      const finish = () => {
        setActiveOnly(next);
        current = next;
        setActive(next);
        animating = false;
      };
      const tl = gsap.timeline({ onComplete: finish });

      if (boundary === 0) {
        const overlay = blocksRef.current;
        const pieces = overlay?.querySelectorAll<HTMLElement>("[data-piece]");
        if (!overlay || !pieces?.length) return finish();
        tl.set(overlay, { display: "grid" })
          .fromTo(pieces, { yPercent: 101 }, { yPercent: 0, duration: 0.42, stagger: 0.055, ease: "power3.in" })
          .add(() => {
            gsap.set(incoming, { visibility: "visible", zIndex: 2 });
            gsap.set(outgoing, { visibility: "hidden", zIndex: 0 });
          }, "+=0.03")
          .to(pieces, { yPercent: -101, duration: 0.48, stagger: 0.055, ease: "power3.out" })
          .set(overlay, { display: "none" });
        animateContent(tl, incoming, 0.58);
      } else if (boundary === 1) {
        tl.set(incoming, { visibility: "visible", zIndex: 3, clipPath: next > current ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" })
          .to(incoming, { clipPath: "inset(0 0% 0 0%)", duration: 0.86, ease: "power3.inOut" });
        animateContent(tl, incoming, 0.3);
      } else if (boundary === 2) {
        tl.set(incoming, { visibility: "visible", zIndex: 1, scale: 1.035 })
          .set(outgoing, { zIndex: 3 })
          .to(outgoing, { clipPath: "inset(50% 0 50% 0)", duration: 0.78, ease: "power3.inOut" })
          .to(incoming, { scale: 1, duration: 0.72, ease: "power3.out" }, 0.08);
        animateContent(tl, incoming, 0.28);
      } else if (boundary === 3) {
        tl.set(incoming, { visibility: "visible", zIndex: 3, clipPath: "circle(0% at 50% 52%)" })
          .to(incoming, { clipPath: "circle(125% at 50% 52%)", duration: 0.92, ease: "power2.inOut" });
        animateContent(tl, incoming, 0.34);
      } else {
        const overlay = acidRef.current;
        if (!overlay) return finish();
        tl.set(overlay, { display: "block", xPercent: next > current ? 101 : -101 })
          .to(overlay, { xPercent: 0, duration: 0.48, ease: "power3.in" })
          .add(() => {
            gsap.set(incoming, { visibility: "visible", zIndex: 2 });
            gsap.set(outgoing, { visibility: "hidden", zIndex: 0 });
          })
          .to(overlay, { xPercent: next > current ? -101 : 101, duration: 0.52, ease: "power3.out" })
          .set(overlay, { display: "none" });
        animateContent(tl, incoming, 0.55);
      }
    };

    goToRef.current = goTo;
    setActiveOnly(0);

    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      wheelSpeed: -1,
      tolerance: 16,
      preventDefault: true,
      onDown: () => goTo(current - 1),
      onUp: () => goTo(current + 1),
    });

    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(current + 1);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(current - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      observer.kill();
      window.removeEventListener("keydown", onKey);
      delete html.dataset.caseDeck;
      delete html.dataset.caseTone;
      delete html.dataset.caseBg;
      goToRef.current = () => undefined;
    };
  }, []);

  return (
    <main ref={root} className="case-deck fixed inset-0 overflow-hidden bg-ink">
      <Cover project={project} />
      <TextPage num="01" title={{ es: "El problema", en: "The problem" }} copy={t(project.problem)} tone="paper" />
      <TextPage num="02" title={{ es: "Investigación", en: "Research" }} copy={t(project.research)} tone="acid" reverse />
      <SolutionPage project={project} />
      <SystemPage project={project} />
      <ResultsPage project={project} next={next} />

      <nav className="case-pagination fixed bottom-5 right-5 z-[45] flex items-center gap-2 md:bottom-7 md:right-8" aria-label={t({ es: "Páginas del caso de estudio", en: "Case study pages" })}>
        <button type="button" className="case-arrow case-arrow--up" onClick={() => goToRef.current(active - 1)} disabled={active === 0} aria-label={t({ es: "Página anterior", en: "Previous page" })} />
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: PAGE_COUNT }, (_, i) => (
            <span key={i} className={`case-progress-segment h-px transition-[width,background-color] duration-300 ${i === active ? "is-active w-7" : "w-2.5"}`} />
          ))}
        </div>
        <span className="u-num min-w-8 text-right text-[0.625rem]">{String(active).padStart(2, "0")}</span>
        <button type="button" className="case-arrow case-arrow--down" onClick={() => goToRef.current(active + 1)} disabled={active === PAGE_COUNT - 1} aria-label={t({ es: "Página siguiente", en: "Next page" })} />
      </nav>

      <div ref={blocksRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[40] hidden grid-cols-4">
        <div data-piece className="border-r border-paper/10 bg-ink" />
        <div data-piece className="border-r border-paper/10 bg-ink" />
        <div data-piece className="bg-acid" />
        <div data-piece className="bg-ink" />
      </div>
      <div ref={acidRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[40] hidden bg-acid" />
    </main>
  );
}

function Cover({ project }: { project: Project }) {
  const { t } = useLang();
  return (
    <section data-case-tone="dark" data-case-bg="ink" className="case-slide absolute inset-0 flex flex-col justify-between overflow-hidden bg-ink pb-8 pt-20 text-paper md:pb-12 md:pt-24" aria-hidden="false">
      <div aria-hidden="true" className="case-cover__disc absolute -right-[12vw] top-[8%] size-[clamp(13rem,32vw,34rem)] rounded-full bg-acid"><div className="blinds absolute inset-0" /></div>
      <div aria-hidden="true" className="diag-lines absolute inset-y-0 right-[13%] w-[9%] text-paper opacity-10" />
      <div className="frame relative z-10 flex items-start justify-between gap-6">
        <p className="case-intro__detail u-label text-mute">{t({ es: "Caso de estudio", en: "Case study" })}</p>
        <p className="case-intro__detail u-label text-paper/55">{project.year} / {project.index}</p>
      </div>
      <div className="frame relative z-10">
        <h1 className="w-full overflow-hidden pt-[0.14em]"><span className="case-intro__title display block text-[clamp(3.4rem,10vw,9rem)]">{t(project.title)}</span></h1>
        <div className="case-intro__detail mt-5 grid gap-5 border-t border-paper/25 pt-5 md:mt-8 md:grid-cols-12 md:gap-8 md:pt-6">
          <p className="text-sm leading-relaxed text-paper/80 md:col-span-5 md:text-lg">{t(project.tagline)}</p>
          <dl className="grid grid-cols-2 gap-x-5 gap-y-3 md:col-span-6 md:col-start-7 md:grid-cols-3">
            <MetaItem label={t({ es: "Rol", en: "Role" })} value={t(project.role)} />
            <MetaItem label={t({ es: "Estado", en: "Status" })} value={t(project.status)} />
            <MetaItem label="Stack" value={project.tags.join(" / ")} />
          </dl>
        </div>
      </div>
    </section>
  );
}

function TextPage({ num, title, copy, tone, reverse = false }: { num: string; title: L; copy: string; tone: "paper" | "acid"; reverse?: boolean }) {
  const { t } = useLang();
  return (
    <section data-case-tone="light" data-case-bg={tone} style={{ visibility: "hidden" }} className={`case-slide absolute inset-0 flex items-center overflow-hidden pb-16 pt-20 text-ink md:pb-12 md:pt-20 ${tone === "acid" ? "bg-acid" : "bg-paper"}`} aria-hidden="true">
      <span aria-hidden="true" className={`absolute inset-y-0 w-3 bg-ink md:w-5 ${reverse ? "right-0" : "left-0"}`} />
      <div className="frame w-full">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className={`${reverse ? "lg:col-span-7 lg:col-start-6 lg:row-start-1" : "lg:col-span-7"}`}>
            <p className="case-kicker u-label mb-4 md:mb-6">{num} / {t({ es: "Capítulo", en: "Chapter" })}</p>
            <div className="overflow-hidden pb-2"><h2 className="case-heading display max-w-[10ch] text-[clamp(3.4rem,10vw,9rem)]">{t(title)}</h2></div>
          </div>
          <div className={`case-copy border-t border-ink/35 pt-5 ${reverse ? "lg:col-span-4 lg:row-start-1" : "lg:col-span-5"}`}>
            <p className="text-base leading-[1.55] text-ink/85 md:text-lg md:leading-[1.65]">{copy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionPage({ project }: { project: Project }) {
  const { t } = useLang();
  return (
    <section data-case-tone="dark" data-case-bg="ink" style={{ visibility: "hidden" }} className="case-slide absolute inset-0 overflow-hidden bg-ink pb-14 pt-20 text-paper md:pb-8 md:pt-20" aria-hidden="true">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-2 bg-acid md:w-3" />
      <div className="frame relative z-10 flex h-full flex-col lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-5">
          <PageHeading num="03" title={{ es: "La solución", en: "The solution" }} compact />
          <div aria-hidden="true" className="mt-8 hidden h-px w-28 bg-acid lg:block" />
        </div>
        <ol className="mt-5 grid flex-1 content-center border-t border-paper/25 md:mt-7 lg:col-span-7 lg:my-auto lg:flex-none lg:border-y lg:border-t-paper/25">
          {project.solution.map((item, i) => (
            <li key={i} className="case-row grid grid-cols-[2rem_1fr] items-center gap-3 border-b border-paper/20 py-3 md:grid-cols-[3rem_1fr] md:px-5 md:py-4 lg:min-h-[5.35rem] lg:last:border-b-0">
              <span className="u-num text-[0.625rem] text-acid md:text-xs">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[0.72rem] leading-[1.4] text-paper/85 sm:text-sm md:text-[0.86rem] md:leading-relaxed">{t(item)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SystemPage({ project }: { project: Project }) {
  const { t } = useLang();
  return (
    <section data-case-tone="light" data-case-bg="paper" style={{ visibility: "hidden" }} className="case-slide absolute inset-0 overflow-hidden bg-paper pb-14 pt-20 text-ink md:pb-7 md:pt-20" aria-hidden="true">
      <div className="frame flex h-full flex-col">
        <PageHeading num="04" title={{ es: "El sistema", en: "The system" }} dark compact />
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2 md:mt-6 md:grid-cols-12 md:gap-3">
          {project.screens.slice(0, 3).map((screen, i) => (
            <figure key={i} className={`case-media group relative min-h-0 overflow-hidden bg-ink ${i === 0 ? "col-span-2 md:col-span-7 md:row-span-2" : "md:col-span-5"}`}>
              {screen.image && <Image src={screen.image} alt={t(screen.caption)} fill sizes={i === 0 ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 50vw, 40vw"} className={`${screen.fit === "contain" ? "object-contain p-3" : "object-cover object-top"} transition-transform duration-700 group-hover:scale-[1.025]`} />}
              <figcaption className="u-label absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/90 px-3 py-2 text-paper backdrop-blur-sm"><span>{t(screen.caption)}</span><span className="u-num text-acid">0{i + 1}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsPage({ project, next }: { project: Project; next: Project }) {
  const { t } = useLang();
  return (
    <section data-case-tone="light" data-case-bg="acid" style={{ visibility: "hidden" }} className="case-slide absolute inset-0 overflow-hidden bg-acid pb-14 pt-20 text-ink md:pb-7 md:pt-20" aria-hidden="true">
      <div aria-hidden="true" className="result-rings absolute right-[clamp(1rem,5vw,6rem)] top-1/2 size-[clamp(16rem,32vw,34rem)] -translate-y-1/2 opacity-20" />
      <div className="frame relative z-10 flex h-full flex-col">
        <PageHeading num="05" title={{ es: "Resultado", en: "Results" }} dark compact />
        <div className="mt-4 grid grid-cols-3 border-y border-ink/35 md:mt-6">
          {project.results.map((result, i) => (
            <div key={i} className={`case-row min-w-0 py-4 md:px-6 md:py-5 ${i > 0 ? "border-l border-ink/35 pl-3" : ""}`}>
              <p className="display text-[clamp(2rem,6vw,5.2rem)]">{t(result.metric)}</p>
              <p className="u-label mt-2 text-[0.5rem] leading-tight text-ink/70 md:mt-3 md:text-[0.625rem]">{t(result.label)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid min-h-0 flex-1 gap-3 md:mt-6 md:grid-cols-3">
          {project.learnings.slice(0, 3).map((learning, i) => (
            <div key={i} className="case-row border-t border-ink/35 pt-3">
              <span className="u-num text-[0.625rem]">0{i + 1}</span>
              <p className="mt-1 text-[0.68rem] leading-[1.35] md:mt-3 md:text-sm md:leading-relaxed">{t(learning)}</p>
            </div>
          ))}
        </div>
        <TLink href={`/projects/${next.slug}`} data-cursor="project" className="case-copy group mt-3 flex items-end justify-between border-t border-ink/40 pt-3">
          <span><span className="u-label block text-ink/60">{t({ es: "Siguiente proyecto", en: "Next project" })}</span><span className="display mt-1 block text-[clamp(1.5rem,4vw,3.5rem)] transition-transform duration-300 group-hover:translate-x-2">{t(next.title)}</span></span>
          <span className="arrow-x mb-2" aria-hidden="true" />
        </TLink>
      </div>
    </section>
  );
}

function PageHeading({ num, title, dark = false, compact = false }: { num: string; title: L; dark?: boolean; compact?: boolean }) {
  const { t } = useLang();
  return (
    <div>
      <p className={`case-kicker u-label mb-2 md:mb-3 ${dark ? "text-ink/60" : "text-acid"}`}>{num} / {t({ es: "Capítulo", en: "Chapter" })}</p>
      <div className="overflow-hidden pb-1"><h2 className={`case-heading display ${compact ? "text-[clamp(2.8rem,7vw,6.5rem)]" : "text-[clamp(3rem,8vw,7.5rem)]"}`}>{t(title)}</h2></div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return <div><dt className="u-label text-mute">{label}</dt><dd className="mt-1 text-xs leading-snug text-paper/90 md:mt-2 md:text-sm">{value}</dd></div>;
}
