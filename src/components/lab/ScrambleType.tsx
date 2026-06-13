"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const WORDS: [string, string][] = [
  ["DESIGN", "DISEÑO"],
  ["MOTION", "MOVIMIENTO"],
  ["CODE", "CÓDIGO"],
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ◆";

/**
 * Bilingual type switch — hover a word and it decodes from English
 * to Spanish (and back) with GSAP's ScrambleText.
 */
export default function ScrambleType() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const rows = Array.from(root.querySelectorAll<HTMLElement>(".scramble-row"));

      const cleanups = rows.map((row, i) => {
        const word = row.querySelector<HTMLElement>(".scramble-word");
        if (!word) return () => {};
        const [en, es] = WORDS[i];

        const swap = (text: string, toEs: boolean) => {
          if (prefersReducedMotion()) {
            word.textContent = text;
            word.style.color = toEs ? "#dd4a12" : "";
            return;
          }
          gsap.to(word, {
            duration: 0.8,
            scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.9 },
            ease: "none",
            overwrite: "auto",
          });
          gsap.to(word, {
            color: toEs ? "#dd4a12" : "#181511",
            duration: 0.4,
            overwrite: "auto",
          });
        };

        const enter = () => swap(es, true);
        const leave = () => swap(en, false);
        row.addEventListener("pointerenter", enter);
        row.addEventListener("pointerleave", leave);
        return () => {
          row.removeEventListener("pointerenter", enter);
          row.removeEventListener("pointerleave", leave);
        };
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 flex flex-col justify-center gap-2 px-[8cqw]"
    >
      {WORDS.map(([en], i) => (
        <div key={en} className="scramble-row cursor-default">
          <span className="u-label mr-4 text-muted">{String(i + 1).padStart(2, "0")}</span>
          <span className="scramble-word display inline-block text-[13cqw] leading-none">
            {en}
          </span>
        </div>
      ))}
      <p className="u-label absolute bottom-4 right-4 text-muted">
        hover — EN ⇄ ES
      </p>
    </div>
  );
}
