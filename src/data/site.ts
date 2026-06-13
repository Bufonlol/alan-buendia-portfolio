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
  url: "https://alanbuendia.dev",
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
    company: "Independiente",
    role: {
      es: "Desarrollador Full-Stack Freelance",
      en: "Freelance Full-Stack Developer",
    },
    period: { es: "2022 — Presente", en: "2022 — Present" },
    summary: {
      es: "Aplicaciones web de ciclo completo para clientes reales y PYMEs mexicanas — requerimientos, diseño, desarrollo, despliegue y soporte. ERPs, plataformas de reservas, dashboards operativos y sistemas QR en producción.",
      en: "Full-cycle web applications for real clients and Mexican PYMEs — requirements, design, development, deployment and support. ERPs, booking platforms, operational dashboards and QR systems shipped to production.",
    },
    highlight: {
      es: "ERP joyería, Dental Family y encuestas en producción",
      en: "Jewelry ERP, Dental Family & survey systems in production",
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
      es: "Proyecto de tesis universitario para administrar múltiples tipos de negocio mediante reglas configurables. Arquitectura frontend, componentes reutilizables y optimización de rendimiento: carga promedio de 4.2s a 1.1s.",
      en: "University thesis project to manage multiple business types via configurable rules. Frontend architecture, reusable components and performance optimization: average load from 4.2s to 1.1s.",
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
  currentlyTraining: {
    title: "Jiu Jitsu",
    gym: { es: "En el tatami", en: "On the mat" } satisfies L,
    note: { es: "favorita de todas", en: "my favorite of all" } satisfies L,
  },
  martialArts: ["MMA", "Boxeo", "Muay Thai", "Jiu Jitsu"],
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
      name: { es: "Experiencias web", en: "Web Experiences" },
      note: {
        es: "Acechando Awwwards. Sitios que se sienten como lugares, no como páginas.",
        en: "Awwwards lurker. Sites that feel like places, not pages.",
      },
    },
  ] satisfies { name: L; note: L }[],
};

export const STATS: { value: string; label: L }[] = [
  { value: "3", label: { es: "años lanzando", en: "years shipping" } },
  { value: "10", label: { es: "proyectos entregados", en: "projects shipped" } },
  { value: "4", label: { es: "clientes activos", en: "active clients" } },
  { value: "B2", label: { es: "inglés técnico", en: "English level" } },
];

export const PROCESS: { step: string; name: L; desc: L }[] = [
  {
    step: "01",
    name: { es: "Escuchar", en: "Listen" },
    desc: {
      es: "Entiendo el negocio antes de tocar código. Las mejores soluciones salen de hacer las preguntas correctas, no de asumir requerimientos.",
      en: "I understand the business before touching code. The best solutions come from asking the right questions, not assuming requirements.",
    },
  },
  {
    step: "02",
    name: { es: "Construir", en: "Build" },
    desc: {
      es: "Ciclos cortos de feedback. Muestro avances reales — para que el cliente use el sistema desde las primeras semanas, no al final.",
      en: "Short feedback cycles. I show real progress — so clients can use the system from the first few weeks, not at the end.",
    },
  },
  {
    step: "03",
    name: { es: "Lanzar", en: "Ship" },
    desc: {
      es: "Despliegue, documentación y soporte continuo. Cuando algo sale a producción, sigo disponible — el trabajo real empieza ahí.",
      en: "Deployment, docs and ongoing support. When something ships, I stay available — because the real work starts there.",
    },
  },
];

export const TESTIMONIAL = {
  quote: {
    es: "Alan entregó el sistema exactamente como lo platicamos — en tiempo y funcionando desde el primer día. Ahora sé cómo están mis tres sucursales sin tener que estar presente.",
    en: "Alan delivered the system exactly as we discussed — on time and working from day one. Now I know how all three of my locations are doing without having to be there.",
  },
  author: { es: "Dueño, Restaurante de Mariscos", en: "Owner, Seafood Restaurant" },
  project: { es: "Encuestas Restaurante · 3 sucursales", en: "Restaurant Surveys · 3 branches" },
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
