"use client";

import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/i18n";

const PRIMARY_LINKS: { label: L; href: string }[] = [
  { label: { es: "Trabajo", en: "Work" }, href: "/#work" },
  { label: { es: "Perfil", en: "About" }, href: "/#about" },
  { label: { es: "Stack", en: "Stack" }, href: "/#stack" },
  { label: { es: "Método", en: "Method" }, href: "/#process" },
  { label: { es: "Contacto", en: "Contact" }, href: "/#contact" },
];

export default function Navbar() {
  const { navigate } = useApp();
  const { t } = useLang();

  return (
    <header className="fixed inset-x-0 top-0 z-[90] border-b border-ink/35 bg-paper/95 text-ink">
      <nav
        aria-label={t({ es: "Navegación principal", en: "Primary navigation" })}
        className="flex h-10 items-center gap-4 px-4 md:h-11 md:px-8"
      >
        <button
          onClick={() => navigate("/")}
          className="u-label shrink-0 tracking-[0.02em]"
          aria-label={t({ es: "Inicio", en: "Home" })}
        >
          AB
        </button>

        <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1 gap-4 md:gap-6">
          {PRIMARY_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className="u-label uppercase transition-opacity duration-200 hover:opacity-55"
            >
              {t(link.label)}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
