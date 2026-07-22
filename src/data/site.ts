import type { L } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything here, no need to touch components.
 *  Every visible string is bilingual: { es, en }. Spanish is the
 *  default language.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  name: "Alan Buendía",
  fullName: "Alan de Jesús Hernández Buendía",
  heroFirst: "ALAN",
  heroSecond: "BUENDÍA",
  role: {
    es: "Desarrollador Web / Frontend",
    en: "Web Developer / Frontend",
  } satisfies L,
  tagline: {
    es: "Creo experiencias digitales rápidas, accesibles y con atención a los detalles.",
    en: "I build digital experiences that are fast, accessible and detail-obsessed.",
  } satisfies L,
  email: "alan.buendia.dev@gmail.com",
  github: "https://github.com/Bufonlol",
  location: "Orizaba, Veracruz — México",
  locationShort: "Orizaba, MX",
  coords: "18.8502° N, 97.1030° W",
  availability: {
    es: "Disponible para proyectos",
    en: "Available for projects",
  } satisfies L,
  cvUrl: "/alan-buendia-cv.pdf",
  url: "https://alanbuendia.dev",
};

export const NAV_LINKS: { label: L; href: string; id: string }[] = [
  { label: { es: "Proyectos", en: "Projects" }, href: "/#work", id: "work" },
  { label: { es: "Experiencia", en: "Experience" }, href: "/#experience", id: "experience" },
  { label: { es: "Sobre mí", en: "About" }, href: "/#about", id: "about" },
  { label: { es: "Contacto", en: "Contact" }, href: "/#contact", id: "contact" },
];

/** Home page order — drives the editorial counter AND the deck's
 *  slide order (must match the section order in app/page.tsx). */
export const SECTIONS: { num: string; id: string }[] = [
  { num: "01", id: "top" },
  { num: "02", id: "work" },
  { num: "03", id: "experience" },
  { num: "04", id: "stack" },
  { num: "05", id: "about" },
  { num: "06", id: "contact" },
];

/** The 8 capabilities shown in the STACK section, each with an
 *  abstract geometric symbol id rendered by <GeometricSymbol/>. */
export const CAPABILITIES: { num: string; name: string; symbol: string }[] = [
  { num: "01", name: "TypeScript", symbol: "square-notch" },
  { num: "02", name: "React", symbol: "ring" },
  { num: "03", name: "Next.js", symbol: "quarter" },
  { num: "04", name: "GSAP", symbol: "wave" },
  { num: "05", name: "Supabase", symbol: "triangles" },
  { num: "06", name: "Node.js", symbol: "hex" },
  { num: "07", name: "Tailwind CSS", symbol: "bars" },
  { num: "08", name: "PostgreSQL", symbol: "half-moon" },
];

export const EXPERIENCE: {
  company: string;
  role: L;
  period: L;
  summary: L;
}[] = [
  {
    company: "Independiente",
    role: {
      es: "Desarrollador Freelance",
      en: "Freelance Developer",
    },
    period: { es: "2022 — Actualidad", en: "2022 — Present" },
    summary: {
      es: "Aplicaciones web de ciclo completo para clientes reales y PYMEs mexicanas: ERPs, plataformas de reservas, dashboards operativos y sistemas QR en producción.",
      en: "Full-cycle web applications for real clients and Mexican SMBs: ERPs, booking platforms, operational dashboards and QR systems in production.",
    },
  },
  {
    company: "Kybernet.MX",
    role: {
      es: "Project Lead · Tesis UTCV",
      en: "Project Lead · UTCV Thesis",
    },
    period: { es: "2025 — 2026", en: "2025 — 2026" },
    summary: {
      es: "Plataforma multinegocio con reglas configurables. Arquitectura frontend, componentes reutilizables y optimización: carga promedio de 4.2s a 1.1s.",
      en: "Multi-business platform with configurable rules. Frontend architecture, reusable components and optimization: average load from 4.2s to 1.1s.",
    },
  },
];

export const PRINCIPLES: { symbol: string; name: L; note: L }[] = [
  {
    symbol: "focus",
    name: { es: "Enfoque", en: "Focus" },
    note: {
      es: "Me involucro a fondo en cada proyecto para entender el problema y proponer mejores soluciones.",
      en: "I go deep on every project to understand the problem and propose better solutions.",
    },
  },
  {
    symbol: "quality",
    name: { es: "Calidad", en: "Quality" },
    note: {
      es: "Escribo código limpio, escalable y mantenible. Cuido cada detalle visual y funcional.",
      en: "I write clean, scalable, maintainable code. Every visual and functional detail matters.",
    },
  },
  {
    symbol: "purpose",
    name: { es: "Propósito", en: "Purpose" },
    note: {
      es: "Creo productos que generan valor real para las personas y los negocios.",
      en: "I build products that create real value for people and businesses.",
    },
  },
];

export const ABOUT = {
  lineOne: {
    es: "DESARROLLO PRODUCTOS DIGITALES DESDE ORIZABA, MÉXICO.",
    en: "I BUILD DIGITAL PRODUCTS FROM ORIZABA, MÉXICO.",
  } satisfies L,
  lineTwo: {
    es: "COMBINO DISEÑO, CÓDIGO Y PENSAMIENTO DE PRODUCTO PARA CREAR SOLUCIONES FUNCIONALES Y ESTÉTICAS.",
    en: "I COMBINE DESIGN, CODE AND PRODUCT THINKING TO CREATE FUNCTIONAL, AESTHETIC SOLUTIONS.",
  } satisfies L,
  availability: [
    { es: "Proyectos freelance", en: "Freelance projects" },
    { es: "Remoto o presencial", en: "Remote or on-site" },
  ] satisfies L[],
  languages: [
    { es: "Español (nativo)", en: "Spanish (native)" },
    { es: "Inglés (B2)", en: "English (B2)" },
  ] satisfies L[],
  interests: [
    { es: "Diseño editorial", en: "Editorial design" },
    { es: "Tipografía", en: "Typography" },
    { es: "Automatización", en: "Automation" },
    { es: "Entrenamiento", en: "Training" },
  ] satisfies L[],
  philosophy: {
    es: "Menos es más. Cada línea de código y cada píxel deben tener un propósito.",
    en: "Less is more. Every line of code and every pixel must have a purpose.",
  } satisfies L,
};

/** Featured projects on the home page — 3 slugs from data/projects.ts,
 *  each with the editorial category label shown on its card. */
export const FEATURED: { slug: string; category: L }[] = [
  { slug: "kybernet", category: { es: "Plataforma multinegocio", en: "Multi-business platform" } },
  { slug: "dental-family", category: { es: "Plataforma de citas", en: "Booking platform" } },
  { slug: "inventory-management", category: { es: "ERP / Punto de venta", en: "ERP / Point of sale" } },
];
