"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { TechnicalGrid } from "@/components/system/TechnicalLayer";
import { WinTitleBar } from "@/components/system/WinTitleBar";

export default function NotFound() {
  const { t } = useLang();
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center gap-6 overflow-hidden px-5 text-center">
      <TechnicalGrid className="opacity-20" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]">
        <span className="display block text-[clamp(18rem,55vw,50rem)] leading-none">404</span>
      </div>
      <p className="u-label relative z-10 text-muted">
        {t({ es: "404 — perdido en el vacío", en: "404 — lost in the void" })}
      </p>
      <h1 className="display relative z-10 text-[clamp(4rem,18vw,14rem)] leading-none">
        {t({ es: "No encontrado", en: "Not found" })}
        <span className="text-accent">✳</span>
      </h1>
      <div className="relative z-10 grid w-full max-w-md grid-cols-2 gap-3">
        <div className="win-window win-window--ink text-left">
          <WinTitleBar label="STATUS.SYS" />
          <div className="win-body">
            <p className="u-label opacity-85">STATUS</p>
            <p className="display mt-2 text-2xl leading-none">404</p>
          </div>
        </div>
        <div className="win-window win-window--ink bg-ink text-left text-paper">
          <WinTitleBar label="ROUTE.NUL" />
          <div className="win-body">
            <p className="u-label opacity-85">ROUTE</p>
            <p className="display mt-2 text-2xl leading-none">NULL</p>
          </div>
        </div>
      </div>
      <Link href="/" className="link-line u-label relative z-10 uppercase">
        {t({ es: "← Volver al índice", en: "← Back to the index" })}
      </Link>
    </main>
  );
}
