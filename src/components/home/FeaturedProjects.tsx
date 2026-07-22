"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion, isDeckCapable } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { PROJECTS } from "@/data/projects";
import { FEATURED } from "@/data/site";
import TLink from "@/components/ui/TLink";
import Reveal from "@/components/motion/Reveal";

/**
 * Featured projects — the paper index after the black cover.
 * The section enters through a diagonal wipe (its top edge starts
 * slanted and straightens with scroll) and every composition
 * assembles piece by piece: panel wipe, numeral, plate, acid shape.
 * Screenshots are treated as framed editorial plates — crisp,
 * desaturated, never washed out.
 */
export default function FeaturedProjects() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  const featured = FEATURED.map((f) => ({
    ...f,
    project: PROJECTS.find((p) => p.slug === f.slug)!,
  })).filter((f) => f.project);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;

      /* T1 — diagonal wipe on scroll mode only (the deck brings its own
         transition between pages). One-shot on enter so it reads as a
         deliberate page transition on mobile, not a subtle scrub. */
      if (!isDeckCapable()) {
        gsap.fromTo(
          el,
          { clipPath: "polygon(0% 0px, 100% 130px, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0px, 100% 0px, 100% 100%, 0% 100%)",
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          }
        );
      }

      /* per-card assembly */
      gsap.utils.toArray<HTMLElement>(".proj-card").forEach((card) => {
        const q = (sel: string) => card.querySelector(sel);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 78%", once: true },
          defaults: { ease: "power3.out" },
        });
        const panel = q(".proj-panel");
        if (panel)
          tl.fromTo(
            panel,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut" },
            0
          );
        const num = q(".proj-num");
        if (num)
          tl.fromTo(
            num,
            { xPercent: -40, autoAlpha: 0 },
            { xPercent: 0, autoAlpha: 1, duration: 0.6 },
            0.35
          );
        const plate = q(".proj-plate");
        if (plate)
          tl.fromTo(
            plate,
            { y: 46, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7 },
            0.4
          );
        const stripe = q(".proj-stripe");
        if (stripe)
          tl.fromTo(
            stripe,
            { scaleY: 0, transformOrigin: "top center" },
            { scaleY: 1, duration: 0.55, ease: "power3.inOut" },
            0.5
          );
        const shape = q(".proj-shape");
        if (shape)
          tl.fromTo(
            shape,
            { scale: 0, transformOrigin: "bottom right" },
            { scale: 1, duration: 0.55, ease: "power3.inOut" },
            0.55
          );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="work"
      className="relative bg-paper pb-28 pt-24 text-ink md:pb-36 deck:h-full deck:py-0"
    >
      <div className="frame deck:flex deck:h-full deck:flex-col deck:justify-center">
        {/* section header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[clamp(3rem,9vw,8rem)] deck:text-[clamp(2.4rem,4.5vw,4.2rem)]">
            <Reveal type="mask-up">
              <span className="block">{t({ es: "Proyectos", en: "Featured" })}</span>
            </Reveal>
            <Reveal type="mask-up" delay={0.1}>
              <span className="block">{t({ es: "Destacados", en: "Projects" })}</span>
            </Reveal>
          </h2>
          <Reveal type="rise" delay={0.2} className="pb-3">
            <TLink href="/archive" className="group u-label flex items-center gap-3">
              {t({ es: "Ver todos", en: "View all" })}
              <span className="arrow-x" aria-hidden="true" />
            </TLink>
          </Reveal>
        </div>

        <Reveal type="line" className="rule mt-8 deck:mt-5" />

        {/* asymmetric editorial grid (deck: three columns, one viewport) */}
        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-16 deck:mt-8 deck:grid-cols-3 deck:gap-y-0">
          {/* ── 01 · wide horizontal: rings, acid stripe, framed plate ── */}
          {featured[0] && (
            <article className="proj-card">
              <TLink
                href={`/projects/${featured[0].project.slug}`}
                data-cursor="project"
                className="group block"
                aria-label={t(featured[0].project.title)}
              >
                <div className="proj-panel relative aspect-[4/3] overflow-hidden bg-ink text-paper sm:aspect-[16/9] deck:aspect-auto deck:h-[38svh]">
                  <div
                    className="conc-rings absolute inset-y-0 left-0 w-[55%] opacity-25"
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className="num-outline proj-num absolute left-[5%] top-[8%] text-[clamp(3.4rem,6.5vw,6.5rem)] text-paper/40"
                  >
                    01
                  </span>
                  <span
                    aria-hidden="true"
                    className="u-num absolute bottom-[8%] left-[5%] text-paper/40"
                  >
                    +
                  </span>
                  <div
                    aria-hidden="true"
                    className="proj-stripe absolute left-[42%] top-0 h-full w-[4%] bg-acid transition-transform duration-500 group-hover:translate-x-2"
                  />
                  {featured[0].project.cardImage && (
                    <div className="plate proj-plate absolute right-[4%] top-1/2 h-[78%] w-[46%] -translate-y-1/2 transition-transform duration-500 group-hover:-translate-y-[calc(50%+6px)]">
                      <Image
                        src={featured[0].project.cardImage}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 60vw, 30vw"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                </div>
                <CardMeta
                  num="01"
                  title={t(featured[0].project.title)}
                  category={t(featured[0].category)}
                  year={featured[0].project.year}
                  tagline={t(featured[0].project.tagline)}
                  tags={featured[0].project.tags}
                />
              </TLink>
            </article>
          )}

          {/* ── 02 · square: ink disc bleeding out, plate, acid corner ── */}
          {featured[1] && (
            <article className="proj-card">
              <TLink
                href={`/projects/${featured[1].project.slug}`}
                data-cursor="project"
                className="group block"
                aria-label={t(featured[1].project.title)}
              >
                <div className="proj-panel relative aspect-[4/3] overflow-hidden bg-ink text-paper deck:aspect-auto deck:h-[38svh]">
                  {/* halftone field + large circle behind the plate */}
                  <div
                    className="halftone absolute inset-y-0 right-0 w-[55%] text-paper opacity-15"
                    aria-hidden="true"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute right-[6%] top-1/2 aspect-square h-[80%] -translate-y-1/2 rounded-full border border-paper/25 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="num-outline proj-num absolute right-[6%] top-[8%] text-[clamp(3.4rem,6.5vw,6.5rem)] text-paper/40"
                  >
                    02
                  </span>
                  {featured[1].project.cardImage && (
                    <div className="plate proj-plate absolute left-[5%] top-1/2 h-[78%] w-[52%] -translate-y-1/2 transition-transform duration-500 group-hover:-translate-y-[calc(50%+6px)]">
                      <Image
                        src={featured[1].project.cardImage}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 80vw, 25vw"
                        className="object-cover object-left-top"
                      />
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="proj-shape absolute bottom-0 right-0 h-[22%] w-[13%] bg-acid transition-transform duration-500 group-hover:-translate-y-1.5"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                  />
                </div>
                <CardMeta
                  num="02"
                  title={t(featured[1].project.title)}
                  category={t(featured[1].category)}
                  year={featured[1].project.year}
                  tagline={t(featured[1].project.tagline)}
                  tags={featured[1].project.tags}
                />
              </TLink>
            </article>
          )}

          {/* ── 03 · wide, negative space left, bars, acid triangle ── */}
          {featured[2] && (
            <article className="proj-card">
              <TLink
                href={`/projects/${featured[2].project.slug}`}
                data-cursor="project"
                className="group block"
                aria-label={t(featured[2].project.title)}
              >
                <div className="proj-panel relative aspect-[4/3] overflow-hidden bg-ink text-paper sm:aspect-[21/9] deck:aspect-auto deck:h-[38svh]">
                  <div
                    className="v-bars absolute inset-y-0 right-0 w-[18%] opacity-25"
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className="num-outline proj-num absolute left-[5%] top-[8%] text-[clamp(3.4rem,6.5vw,6.5rem)] text-paper/40"
                  >
                    03
                  </span>
                  {featured[2].project.cardImage && (
                    <div className="plate proj-plate absolute left-[24%] top-1/2 h-[78%] w-[52%] -translate-y-1/2 transition-transform duration-500 group-hover:-translate-y-[calc(50%+6px)]">
                      <Image
                        src={featured[2].project.cardImage}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 70vw, 35vw"
                        className="object-cover object-left-top"
                      />
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="proj-shape absolute bottom-0 left-[8%] h-[34%] w-[9%] bg-acid transition-transform duration-500 group-hover:-translate-y-1.5"
                    style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
                  />
                  <span
                    aria-hidden="true"
                    className="u-num absolute bottom-[10%] right-[6%] text-paper/40"
                  >
                    +
                  </span>
                </div>
                <CardMeta
                  num="03"
                  title={t(featured[2].project.title)}
                  category={t(featured[2].category)}
                  year={featured[2].project.year}
                  tagline={t(featured[2].project.tagline)}
                  tags={featured[2].project.tags}
                />
              </TLink>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

function CardMeta({
  num,
  title,
  category,
  year,
  tagline,
  tags,
}: {
  num: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  tags: string[];
}) {
  return (
    <div className="mt-5">
      <div className="rule" />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="u-num text-[0.6875rem] text-ink/50">{num}</span>
          <div>
            <h3 className="display text-[clamp(1.6rem,3vw,2.4rem)] transition-transform duration-300 group-hover:translate-x-1 deck:text-2xl">
              {title}
            </h3>
            <p className="u-label mt-2 text-ink/60">
              {category} · {year}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70 deck:mt-2 deck:line-clamp-2 deck:text-xs">
              {tagline}
            </p>
            <p className="u-label mt-3 text-ink/45 deck:hidden">
              {tags.slice(0, 3).join(" / ")}
            </p>
          </div>
        </div>
        <span className="arrow-x mt-2 shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}
