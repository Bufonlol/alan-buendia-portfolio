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
        className="flex min-h-12 items-center gap-2 overflow-x-auto px-2 [-ms-overflow-style:none] [scrollbar-width:none] md:h-11 md:min-h-0 md:gap-4 md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        <button
          onClick={() => navigate("/")}
          className="u-label flex min-h-11 shrink-0 items-center tracking-[0.02em] md:min-h-0"
          aria-label={t({ es: "Inicio", en: "Home" })}
        >
          AB
        </button>

        <div className="flex flex-1 items-center gap-0 md:flex-wrap md:gap-6">
          {PRIMARY_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className="u-label flex min-h-11 shrink-0 items-center px-1 uppercase transition-opacity duration-200 hover:opacity-55 md:min-h-0 md:px-0"
            >
              {t(link.label)}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
