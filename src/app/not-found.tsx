"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { TechnicalGrid } from "@/components/system/TechnicalLayer";

export default function NotFound() {
  const { t } = useLang();
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center gap-6 overflow-hidden px-5 text-center">
      <TechnicalGrid className="opacity-20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] mix-blend-multiply md:h-[720px] md:w-[720px]"
        style={{
          maskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 35%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 35%, transparent 75%)",
        }}
      >
        <Image src="/assets/notfound-maze.png" alt="" fill sizes="720px" className="object-contain" />
      </div>
      <p className="u-label relative z-10 text-muted">
        {t({ es: "404 — perdido en el vacío", en: "404 — lost in the void" })}
      </p>
      <h1 className="display relative z-10 text-[clamp(4rem,18vw,14rem)] leading-none">
        {t({ es: "No encontrado", en: "Not found" })}
        <span className="text-accent">✳</span>
      </h1>
      <div className="relative z-10 grid w-full max-w-md grid-cols-2 gap-3">
        <div className="border border-ink p-4 text-left">
          <p className="u-label opacity-60">STATUS</p>
          <p className="display mt-2 text-2xl leading-none">404</p>
        </div>
        <div className="border border-ink bg-ink p-4 text-left text-paper">
          <p className="u-label opacity-70">ROUTE</p>
          <p className="display mt-2 text-2xl leading-none">NULL</p>
        </div>
      </div>
      <Link href="/" className="link-line u-label relative z-10 uppercase">
        {t({ es: "← Volver al índice", en: "← Back to the index" })}
      </Link>
    </main>
  );
}
