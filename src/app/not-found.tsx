"use client";

import { useLang } from "@/lib/i18n";
import TLink from "@/components/ui/TLink";

export default function NotFound() {
  const { t } = useLang();
  return (
    <main className="relative flex min-h-[100svh] flex-col items-start justify-center overflow-hidden bg-ink text-paper">
      <div
        aria-hidden="true"
        className="absolute right-[-8%] top-[18%] h-[36vw] w-[36vw] rounded-full bg-acid/90"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute left-[-10%] top-[64%] h-px w-[120%] rotate-[-14deg] bg-paper/15"
      />
      <div className="frame relative z-10">
        <p className="u-label text-mute">404</p>
        <h1 className="display mt-4 text-[clamp(4rem,16vw,14rem)]">
          {t({ es: "Página no", en: "Page not" })}
          <br />
          {t({ es: "encontrada", en: "found" })}
        </h1>
        <TLink href="/" className="btn-editorial btn-editorial--acid group mt-10">
          {t({ es: "Volver al inicio", en: "Back home" })}
          <span className="arrow-x" aria-hidden="true" />
        </TLink>
      </div>
    </main>
  );
}
