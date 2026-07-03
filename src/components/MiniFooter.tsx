"use client";

import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";

/** Slim footer for subpages (case studies, playground). */
export default function MiniFooter({ dark = false }: { dark?: boolean }) {
  const { navigate } = useApp();
  const { t } = useLang();
  return (
    <footer
      className={`grid gap-5 border-t px-4 py-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:px-8 ${
        dark ? "border-paper/35 bg-ink text-paper" : "border-ink bg-paper text-ink"
      }`}
    >
      <span className="u-label">© 2026 {SITE.name}</span>
      <div className="u-label flex flex-wrap gap-6">
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
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="u-label link-line text-left uppercase md:justify-self-end md:text-right"
      >
        {t({ es: "Volver arriba ↑", en: "Back to top ↑" })}
      </button>
    </footer>
  );
}
