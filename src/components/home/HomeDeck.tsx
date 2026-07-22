"use client";

import { Children, useEffect, useRef } from "react";
import { gsap, isDeckCapable } from "@/lib/gsap";
import { Observer } from "gsap/Observer";
import { SECTIONS } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

/** Transition assigned to each boundary between consecutive slides,
 *  following the reference sheet: sliding blocks, typographic cut,
 *  geometric explosion, diagonal wipe, acid sweep. */
const BOUNDARY = ["blocks", "cut", "circle", "diagonal", "acid"] as const;
type TransitionType = (typeof BOUNDARY)[number];

/**
 * Fullpage deck for the home: on desktop (fine pointer, no reduced
 * motion) the sections become stacked full-viewport pages. Wheel,
 * touch, keyboard and nav links step between them; each boundary
 * plays its own editorial transition. Everywhere else the children
 * render as a normal scrolling document.
 */
export default function HomeDeck({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const acidRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);

  useEffect(() => {
    if (!isDeckCapable() || !root.current) return;

    const html = document.documentElement;
    html.dataset.deck = "1";

    const slideEls = Array.from(
      root.current.querySelectorAll<HTMLElement>(".deck-slide")
    );
    const ids = SECTIONS.map((s) => s.id);
    let current = 0;
    let animating = false;

    const announce = (index: number) => {
      window.dispatchEvent(
        new CustomEvent("deck:change", { detail: { id: ids[index], index } })
      );
      const hash = index === 0 ? "/" : `/#${ids[index]}`;
      window.history.replaceState(null, "", hash);
    };

    const setActiveOnly = (index: number) => {
      slideEls.forEach((el, i) => {
        gsap.set(el, {
          visibility: i === index ? "visible" : "hidden",
          zIndex: i === index ? 1 : 0,
          clearProps: "clipPath,transform",
        });
        el.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
    };

    /* content of the incoming slide rises softly after the wipe */
    const staggerIn = (tl: gsap.core.Timeline, inc: HTMLElement, at: string | number) => {
      const parts = inc.querySelectorAll(".frame > *");
      if (!parts.length) return;
      tl.fromTo(
        parts,
        { y: 26 },
        {
          y: 0,
          duration: 0.5,
          stagger: 0.045,
          ease: "power3.out",
          clearProps: "transform",
        },
        at
      );
    };

    const goTo = (next: number) => {
      if (animating || next === current || next < 0 || next >= slideEls.length)
        return;
      animating = true;
      const out = slideEls[current];
      const inc = slideEls[next];
      const type: TransitionType =
        BOUNDARY[Math.min(current, next)] ?? "blocks";

      const finish = () => {
        setActiveOnly(next);
        current = next;
        animating = false;
        announce(next);
      };

      const tl = gsap.timeline({ onComplete: finish });

      if (type === "blocks" || type === "acid") {
        /* cover with an overlay, swap slides behind it, reveal */
        const overlay = type === "blocks" ? blocksRef.current : acidRef.current;
        if (!overlay) {
          finish();
          return;
        }
        const pieces = overlay.querySelectorAll<HTMLElement>("[data-piece]");
        const axis = type === "blocks" ? "yPercent" : "xPercent";
        tl.set(overlay, { display: "grid" })
          .fromTo(
            pieces,
            { [axis]: 101 },
            { [axis]: 0, duration: 0.45, stagger: 0.06, ease: "power3.in" }
          )
          .add(() => {
            gsap.set(inc, { visibility: "visible", zIndex: 1 });
            gsap.set(out, { visibility: "hidden", zIndex: 0 });
          }, "+=0.04")
          .to(pieces, {
            [axis]: -101,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          })
          .set(overlay, { display: "none" });
        staggerIn(tl, inc, "-=0.45");
      } else if (type === "cut") {
        /* the outgoing page closes onto its own horizontal center line */
        tl.set(inc, { visibility: "visible", zIndex: 1, scale: 1.04 })
          .set(out, { zIndex: 2 })
          .fromTo(
            out,
            { clipPath: "inset(0% 0% 0% 0%)" },
            {
              clipPath: "inset(50% 0% 50% 0%)",
              duration: 0.85,
              ease: "power3.inOut",
            }
          )
          .to(inc, { scale: 1, duration: 0.85, ease: "power3.out" }, 0.1);
        staggerIn(tl, inc, 0.35);
      } else if (type === "circle") {
        /* geometric explosion: the next page grows from the center */
        tl.set(out, { zIndex: 1 })
          .set(inc, {
            visibility: "visible",
            zIndex: 2,
            clipPath: "circle(0% at 50% 55%)",
          })
          .to(inc, {
            clipPath: "circle(120% at 50% 55%)",
            duration: 0.95,
            ease: "power2.inOut",
          });
        staggerIn(tl, inc, 0.4);
      } else {
        /* diagonal wipe: a slanted edge sweeps across the screen */
        tl.set(out, { zIndex: 1 })
          .set(inc, {
            visibility: "visible",
            zIndex: 2,
            clipPath: "polygon(0% 0%, 0% 0%, -35% 100%, 0% 100%)",
          })
          .to(inc, {
            clipPath: "polygon(0% 0%, 135% 0%, 100% 100%, 0% 100%)",
            duration: 0.9,
            ease: "power3.inOut",
          });
        staggerIn(tl, inc, 0.4);
      }
    };

    /* initial slide from the URL hash */
    const initial = Math.max(0, ids.indexOf(window.location.hash.slice(1)));
    setActiveOnly(initial);
    current = initial;
    announce(initial);

    /* wheel / touch / pointer-drag navigation */
    const observer = Observer.create({
      type: "wheel,touch",
      wheelSpeed: -1,
      tolerance: 12,
      preventDefault: true,
      onDown: () => goTo(current - 1),
      onUp: () => goTo(current + 1),
    });

    /* keyboard navigation */
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (/^(input|textarea|select)$/i.test(target.tagName)) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(current + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(slideEls.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);

    /* nav links & hash navigation route through the deck */
    (window as unknown as Record<string, unknown>).__deckGoTo = (id: string) => {
      const idx = ids.indexOf(id);
      if (idx === -1) return false;
      goTo(idx);
      return true;
    };

    return () => {
      observer.kill();
      window.removeEventListener("keydown", onKey);
      delete (window as unknown as Record<string, unknown>).__deckGoTo;
      delete html.dataset.deck;
    };
  }, []);

  return (
    <div ref={root} className="deck-root relative deck:fixed deck:inset-0 deck:overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={SECTIONS[i]?.id ?? i}
          className="deck-slide deck:absolute deck:inset-0 deck:overflow-hidden"
        >
          {slide}
        </div>
      ))}

      {/* sliding-blocks overlay (hero → projects and reverse) */}
      <div
        ref={blocksRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] hidden grid-cols-4"
      >
        <div data-piece className="bg-ink border-r border-paper/10" />
        <div data-piece className="bg-ink border-r border-paper/10" />
        <div data-piece className="bg-acid" />
        <div data-piece className="bg-ink" />
      </div>

      {/* acid sweep overlay (about → contact and reverse) */}
      <div
        ref={acidRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] hidden grid-cols-1"
      >
        <div data-piece className="bg-acid" />
      </div>
    </div>
  );
}
