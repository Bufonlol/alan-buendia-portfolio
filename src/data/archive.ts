import type { L } from "@/lib/i18n";

export type ArchiveEntry = {
  index: string;
  title: L;
  year: string;
  type: L;
  stack: string;
  color: string;
  href?: string;
  external?: string;
  image?: string;
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
    title: { es: "POS Joyería", en: "Jewelry POS" },
    year: "2024",
    type: { es: "Cliente · Equipo", en: "Client · Team" },
    stack: "React · Laravel",
    color: "#A8842C",
    href: "/projects/inventory-management",
    image: "/projects/inventory-management/dashboard.png",
  },
  {
    index: "03",
    title: { es: "Kybernet.MX", en: "Kybernet.MX" },
    year: "2024",
    type: { es: "Tesis · UTCV", en: "Thesis · UTCV" },
    stack: "React · Supabase",
    color: "#5440A8",
    href: "/projects/kybernet",
    image: "/projects/kybernet/login.png",
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
