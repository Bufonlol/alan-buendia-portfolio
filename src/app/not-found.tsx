"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLang();
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="u-label text-muted">
        {t({ es: "404 — perdido en el vacío", en: "404 — lost in the void" })}
      </p>
      <h1 className="display text-[clamp(4rem,18vw,14rem)] leading-none">
        {t({ es: "No encontrado", en: "Not found" })}
        <span className="text-accent">✳</span>
      </h1>
      <Link href="/" className="link-line u-label uppercase">
        {t({ es: "← Volver al índice", en: "← Back to the index" })}
      </Link>
    </main>
  );
}
