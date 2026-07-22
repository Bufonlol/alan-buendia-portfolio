"use client";

import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer bg-ink text-paper">
      <div className="frame">
        <div className="rule" />
        <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="u-label text-mute">
            © 2026 {SITE.name.toUpperCase()}.{" "}
            {t({
              es: "Todos los derechos reservados.",
              en: "All rights reserved.",
            })}
          </p>
          <div className="flex items-center gap-8">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line u-label"
            >
              GitHub
            </a>
            <a href={`mailto:${SITE.email}`} className="link-line u-label">
              Email
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="u-label flex items-center gap-2 text-mute transition-colors hover:text-acid"
            >
              {t({ es: "Volver arriba", en: "Back to top" })}
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
