import type { L } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything here, no need to touch components.
 *  Every visible string is bilingual: { es, en }. Spanish is the
 *  default language. Items marked "EDIT ME" are placeholders.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  name: "Alan Buendía",
  fullName: "Alan de Jesús Hernández Buendía",
  heroFirst: "ALAN",
  heroSecond: "BUENDÍA",
  role: {
    es: "Frontend Developer",
    en: "Frontend Developer",
  } satisfies L,
  tagline: {
    es: "interfaces que se sienten inevitables",
    en: "interfaces that feel inevitable",
  } satisfies L,
  email: "alan.buendia.dev@gmail.com",
  location: "Orizaba, Veracruz — México",
  locationShort: "Orizaba, MX",
  coords: "18.85°N — 97.10°W",
  availability: {
    es: "Disponible para trabajar",
    en: "Available for work",
  } satisfies L,
  cvUrl: "/alan-buendia-cv.pdf",
  url: "https://alan-portfolio-psi.vercel.app",
  socials: {
    github: "https://github.com/alanbuendia", // EDIT ME — real GitHub profile
    linkedin: "https://www.linkedin.com/in/alan-buendia", // EDIT ME — real LinkedIn profile
  },
};

export const NAV_LINKS: { index: string; label: L; href: string }[] = [
  { index: "01", label: { es: "Trabajo", en: "Work" }, href: "/#work" },
  { index: "02", label: { es: "Playground", en: "Playground" }, href: "/playground" },
  { index: "03", label: { es: "Archivo", en: "Archive" }, href: "/archive" },
  { index: "04", label: { es: "Arcade", en: "Arcade" }, href: "/arcade" },
  { index: "05", label: { es: "Stack", en: "Stack" }, href: "/#stack" },
  { index: "06", label: { es: "Experiencia", en: "Experience" }, href: "/#experience" },
  { index: "07", label: { es: "Sobre mí", en: "About" }, href: "/#about" },
  { index: "08", label: { es: "Contacto", en: "Contact" }, href: "/#contact" },
];

export const STACK: { name: string; meta: L }[] = [
  { name: "React", meta: { es: "Frontend", en: "Frontend" } },
  { name: "Angular", meta: { es: "Frontend", en: "Frontend" } },
  { name: "TypeScript", meta: { es: "Lenguaje", en: "Language" } },
  { name: "JavaScript", meta: { es: "Lenguaje", en: "Language" } },
  { name: "Spring Boot", meta: { es: "Backend", en: "Backend" } },
  { name: "Java", meta: { es: "Backend", en: "Backend" } },
  { name: "PostgreSQL", meta: { es: "Base de datos", en: "Database" } },
  { name: "MySQL", meta: { es: "Base de datos", en: "Database" } },
  { name: "Docker", meta: { es: "DevOps", en: "DevOps" } },
  { name: "Git", meta: { es: "Flujo de trabajo", en: "Workflow" } },
  { name: "GSAP", meta: { es: "Animación", en: "Motion" } },
  { name: "Three.js", meta: { es: "3D / WebGL", en: "3D / WebGL" } },
];

export const EXPERIENCE: {
  company: string;
  role: L;
  period: L;
  summary: L;
  highlight: L;
}[] = [
  {
    company: "Waldo's",
    role: { es: "Frontend Developer", en: "Frontend Developer" }, // EDIT ME — exact title
    period: { es: "2025 — Presente", en: "2025 — Present" },
    summary: {
      es: "Construyendo herramientas internas e interfaces de operación retail para una de las cadenas de tiendas de descuento más grandes de México. Frontend donde el downtime se mide en ventas perdidas.",
      en: "Building internal tools and retail-operations interfaces for one of México's largest discount store chains. Frontend work where downtime is measured in lost sales.",
    },
    highlight: {
      es: "Sistemas retail usados en cientos de tiendas",
      en: "Retail systems used across hundreds of stores",
    },
  },
  {
    company: "Independiente",
    role: {
      es: "Desarrollador Full-Stack Freelance",
      en: "Freelance Full-Stack Developer",
    },
    period: { es: "2022 — Presente", en: "2022 — Present" },
    summary: {
      es: "Aplicaciones web de ciclo completo para clientes reales y PYMEs mexicanas — requerimientos, diseño, desarrollo, despliegue y soporte. Frontends en React, backends en Java y Node.",
      en: "Full-cycle web applications for real clients and Mexican PYMEs — requirements, design, development, deployment and support. React frontends, Java and Node backends.",
    },
    highlight: {
      es: "ERP, plataforma dental y encuestas en producción",
      en: "ERP, clinic platform & survey systems shipped to production",
    },
  },
  {
    company: "UTCV — Kybernet.MX",
    role: {
      es: "Proyecto de Tesis · Frontend Lead",
      en: "Thesis Project · Frontend Lead",
    },
    period: { es: "2024", en: "2024" },
    summary: {
      es: "Diseñé y construí Kybernet.MX: un SaaS multiempresa para registrar y gestionar distintos giros de negocio con reglas personalizables por vertical. React + Supabase.",
      en: "Designed and built Kybernet.MX: a multi-tenant SaaS for registering and managing different business types under customizable rules per vertical. React + Supabase.",
    },
    highlight: {
      es: "Carga promedio de 4.2s a 1.1s",
      en: "Cut average page load from 4.2s to 1.1s",
    },
  },
];

export const ABOUT = {
  // Keep it under 5 lines — that's the rule.
  paragraph: {
    es: "Soy Alan — frontend developer de Orizaba, México. Llevo 3+ años lanzando sistemas reales para negocios reales: ERPs, clínicas, restaurantes, retail. Me importan las interfaces que se sienten inevitables — rápidas, accesibles y un poco juguetonas. Actualmente vivo en el espacio donde la ingeniería se encuentra con el movimiento.",
    en: "I'm Alan — a frontend developer from Orizaba, México. For 3+ years I've been shipping real systems for real businesses: ERPs, clinics, restaurants, retail. I care about interfaces that feel inevitable — fast, accessible, and a little bit playful. Currently living in the space where engineering meets motion.",
  } satisfies L,
  facts: [
    { es: "3+ años lanzando", en: "3+ years shipping" },
    { es: "Capaz full-stack", en: "Full-stack capable" },
    { es: "Listo para remoto", en: "Remote friendly" },
  ] satisfies L[],
};

export const FUN = {
  currentlyPlaying: {
    title: "Hollow Knight: Silksong", // EDIT ME — what are you actually playing?
    platform: "PC",
    note: { es: "manden ayuda", en: "send help" } satisfies L,
  },
  favoriteGames: [
    // EDIT ME — your real top games
    "Hollow Knight",
    "Hades",
    "Celeste",
    "Resident Evil 4",
    "Zelda: TOTK",
    "Stardew Valley",
  ],
  interests: [
    {
      name: { es: "Ciberseguridad", en: "Cybersecurity" },
      note: {
        es: "CTFs, madrigueras de OWASP y romper mis propias apps antes de que alguien más lo haga.",
        en: "CTFs, OWASP rabbit holes, and breaking my own apps before someone else does.",
      },
    },
    {
      name: { es: "Animación UI", en: "UI Animation" },
      note: {
        es: "Las curvas de easing son un rasgo de personalidad. Timelines de GSAP como lenguaje del amor.",
        en: "Easing curves are a personality trait. GSAP timelines as a love language.",
      },
    },
    {
      name: { es: "Diseño de juegos", en: "Game Design" },
      note: {
        es: "Estudiar por qué los juegos se sienten bien — y robárselo para la web.",
        en: "Studying why games feel good — then stealing it for the web.",
      },
    },
    {
      name: { es: "Experiencias web", en: "Web Experiences" },
      note: {
        es: "Acechando Awwwards. Sitios que se sienten como lugares, no como páginas.",
        en: "Awwwards lurker. Sites that feel like places, not pages.",
      },
    },
  ] satisfies { name: L; note: L }[],
};

export const MARQUEE_ITEMS: L[] = [
  { es: "Disponible para trabajar", en: "Available for work" },
  { es: "Frontend Developer", en: "Frontend Developer" },
  { es: "React", en: "React" },
  { es: "TypeScript", en: "TypeScript" },
  { es: "GSAP", en: "GSAP" },
  { es: "Three.js", en: "Three.js" },
];

export const MARQUEE_CONTACT: L[] = [
  { es: "Hablemos", en: "Let's talk" },
  { es: "¿Tienes un proyecto?", en: "Got a project?" },
  { es: "Saluda", en: "Say hi" },
];
