"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang, type L } from "@/lib/i18n";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const GLYPHS = ["◆", "◆", "●", "▲", "✦", "★"];

export default function EasterEggs() {
  const { t } = useLang();
  const [toast, setToast] = useState<L | null>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    let pos = 0;

    const party = () => {
      if (busyRef.current) return;
      busyRef.current = true;
      setToast({
        es: "🎮 Modo fiesta desbloqueado — qué dedos",
        en: "🎮 Party mode unlocked — nice fingers",
      });

      if (prefersReducedMotion()) {
        setTimeout(() => {
          setToast(null);
          busyRef.current = false;
        }, 2500);
        return;
      }

      const burst = document.createElement("div");
      burst.style.cssText =
        "position:fixed;inset:0;pointer-events:none;z-index:400;overflow:hidden";
      document.body.appendChild(burst);

      for (let i = 0; i < 36; i++) {
        const s = document.createElement("span");
        s.textContent = GLYPHS[i % GLYPHS.length];
        const size = gsap.utils.random(16, 44);
        s.style.cssText = `position:absolute;top:-60px;left:${gsap.utils.random(
          0, 100
        )}%;font-size:${size}px;color:${i % 3 === 0 ? "#0647FF" : "#181511"}`;
        burst.appendChild(s);
        gsap.to(s, {
          y: window.innerHeight + 120,
          rotation: gsap.utils.random(-360, 360),
          x: gsap.utils.random(-80, 80),
          duration: gsap.utils.random(1.6, 3),
          delay: gsap.utils.random(0, 0.6),
          ease: "power1.in",
        });
      }
      gsap.fromTo(
        "#page-root",
        { rotate: 0 },
        { rotate: 1, duration: 0.08, yoyo: true, repeat: 7, ease: "none", clearProps: "rotate" }
      );
      setTimeout(() => {
        burst.remove();
        setToast(null);
        busyRef.current = false;
      }, 4000);
    };

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        party();
      }
    };

    const onSpin = () => {
      if (busyRef.current) return;
      busyRef.current = true;
      setToast({ es: "🌀 ¡Haz un barrel roll!", en: "🌀 Do a barrel roll!" });

      if (prefersReducedMotion()) {
        setTimeout(() => {
          setToast(null);
          busyRef.current = false;
        }, 2000);
        return;
      }
      gsap.fromTo(
        "#page-root",
        { rotate: 0 },
        {
          rotate: 360,
          duration: 1.1,
          ease: "power2.inOut",
          clearProps: "rotate",
          onComplete: () => {
            setTimeout(() => {
              setToast(null);
              busyRef.current = false;
            }, 1500);
          },
        }
      );
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("ab:spin", onSpin);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ab:spin", onSpin);
    };
  }, []);

  if (!toast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="u-label fixed bottom-6 left-1/2 z-[400] -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-paper shadow-lg"
    >
      {t(toast)}
    </div>
  );
}
