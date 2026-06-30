"use client";

import { useEffect, useRef, useState } from "react";
import { Asterisk, RegistrationMark, ColorBar } from "@/components/art/EditorialArt";
import { useLang, type L } from "@/lib/i18n";

/**
 * ArtDivider — an editorial "signature mark" between sections: a thin rule
 * that draws itself in, a rotating ornament, a tracked label and a process
 * color bar. Reveals on scroll via IntersectionObserver.
 */
export default function ArtDivider({
  label,
  variant = "asterisk",
  className = "",
}: {
  label?: L;
  variant?: "asterisk" | "registration";
  className?: string;
}) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative mx-auto flex w-full max-w-[1600px] items-center gap-5 px-5 py-10 md:px-8 ${className}`}
    >
      <ColorBar className="hidden shrink-0 sm:flex" />
      <span
        className={`h-px flex-1 origin-left bg-line ${vis ? "art-rule" : ""}`}
        style={{ transform: vis ? undefined : "scaleX(0)" }}
      />
      {label && (
        <span className="u-label shrink-0 whitespace-nowrap text-muted">{t(label)}</span>
      )}
      <span className="shrink-0">
        {variant === "registration" ? (
          <RegistrationMark size={24} />
        ) : (
          <Asterisk size={22} spin />
        )}
      </span>
      <span
        className={`h-px flex-1 origin-right bg-line ${vis ? "art-rule" : ""}`}
        style={{ transform: vis ? undefined : "scaleX(0)", transformOrigin: "right center" }}
      />
      <ColorBar className="hidden shrink-0 sm:flex" />
    </div>
  );
}
