"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { useApp } from "@/components/AppShell";

export default function AvailableBadge() {
  const { navigate } = useApp();
  const { t } = useLang();
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    if (prefersReducedMotion()) {
      gsap.set(ref.current, { y: 0, autoAlpha: 1 });
      return;
    }

    gsap.fromTo(
      ref.current,
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, delay: 2.4, ease: "power3.out" }
    );
  }, []);

  return (
    <button
      ref={ref}
      onClick={() => navigate("/#contact")}
      aria-label={t({ es: "Disponible para proyectos — ir a contacto", en: "Available for projects — go to contact" })}
      style={{ opacity: 0 }}
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-[85] flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper shadow-sm transition-shadow hover:shadow-lg md:bottom-8 md:right-8 md:h-auto md:w-auto md:gap-2.5 md:px-4 md:py-2.5"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      <span className="u-label hidden md:inline">
        {t({ es: "Disponible", en: "Available" })}
      </span>
    </button>
  );
}
