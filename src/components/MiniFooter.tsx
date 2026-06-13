"use client";

import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";

/** Slim footer for subpages (case studies, playground). */
export default function MiniFooter({ dark = false }: { dark?: boolean }) {
  const { navigate, lenis } = useApp();
  const { t } = useLang();
  return (
    <footer
      className={`flex flex-col gap-3 border-t px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8 ${
        dark ? "border-line-paper bg-ink text-paper" : "border-line"
      }`}
    >
      <span className="u-label opacity-60">© 2026 {SITE.name}</span>
      <div className="u-label flex gap-6">
        <button onClick={() => navigate("/")} className="link-line uppercase">
          {t({ es: "Índice", en: "Index" })}
        </button>
        <button onClick={() => navigate("/#contact")} className="link-line uppercase">
          {t({ es: "Contacto", en: "Contact" })}
        </button>
        <a href={`mailto:${SITE.email}`} className="link-line uppercase">
          {t({ es: "Correo", en: "Email" })}
        </a>
      </div>
      <button
        onClick={() => lenis?.scrollTo(0, { duration: 1.2 })}
        className="u-label link-line text-left uppercase md:text-right"
      >
        {t({ es: "Volver arriba ↑", en: "Back to top ↑" })}
      </button>
    </footer>
  );
}
