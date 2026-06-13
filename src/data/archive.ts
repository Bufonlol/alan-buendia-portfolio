import type { L } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────
 *  ARCHIVE — the complete index: case studies, client work
 *  without a write-up, and retired things. Add rows freely.
 * ─────────────────────────────────────────────────────────────
 */

export type ArchiveEntry = {
  index: string;
  title: L;
  year: string;
  type: L;
  stack: string;
  color: string;
  /** internal case study route */
  href?: string;
  /** external link (opens in a new tab) */
  external?: string;
  /** hover preview image */
  image?: string;
  /** shown instead of an arrow when there is nothing to open */
  tag?: L;
};

export const ARCHIVE: ArchiveEntry[] = [
  {
    index: "01",
    title: { es: "Encuestas Restaurante", en: "Restaurant Surveys" },
    year: "2025",
    type: { es: "Cliente", en: "Client" },
    stack: "React · Supabase",
    color: "#3B6BD6",
    href: "/projects/restaurant-surveys",
    image: "/projects/restaurant-surveys/dashboard.png",
  },
  {
    index: "02",
    title: { es: "Plataforma de Proveedores", en: "Supplier Platform" },
    year: "2025",
    type: { es: "Cliente · En curso", en: "Client · WIP" },
    stack: "React · Spring Boot",
    color: "#4A5A8A",
    href: "/projects/supplier-platform",
  },
  {
    index: "03",
    title: { es: "Sistema de Inventario", en: "Inventory System" },
    year: "2024",
    type: { es: "Cliente · Equipo", en: "Client · Team" },
    stack: "React · Laravel",
    color: "#A8842C",
    href: "/projects/inventory-management",
    image: "/projects/inventory-management/dashboard.png",
  },
  {
    index: "04",
    title: { es: "Dental Family", en: "Dental Family" },
    year: "2024",
    type: { es: "Cliente", en: "Client" },
    stack: "React · Node.js",
    color: "#C5A891",
    external: "https://dentalfamily.mx",
    image: "/projects/dental-family/home.png",
  },
  {
    index: "05",
    title: { es: "PulmoAlert", en: "PulmoAlert" },
    year: "2024",
    type: { es: "Salud", en: "Health-tech" },
    stack: "Angular · Spring Boot",
    color: "#3E6B5C",
    href: "/projects/pulmoalert",
  },
  {
    index: "06",
    title: { es: "Kybernet.MX", en: "Kybernet.MX" },
    year: "2024",
    type: { es: "Tesis · UTCV", en: "Thesis · UTCV" },
    stack: "React · Supabase",
    color: "#5440A8",
    href: "/projects/kybernet",
    image: "/projects/kybernet/login.png",
  },
  {
    index: "07",
    title: { es: "Lab de Seguridad IA", en: "AI Security Lab" },
    year: "2026",
    type: { es: "I+D", en: "R&D" },
    stack: "React · FastAPI",
    color: "#7A3E8F",
    href: "/projects/ai-security",
  },
  {
    index: "08",
    title: { es: "Portfolio v1", en: "Portfolio v1" },
    year: "2025",
    type: { es: "Personal", en: "Self-initiated" },
    stack: "Vite · Framer Motion",
    color: "#8B8474",
    tag: {
      es: "Retirado — estás parado sobre la v2",
      en: "Retired — you're standing on v2",
    },
  },
];
