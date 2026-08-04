import type { L } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────
 *  BLOG CONTENT — bilingual like the rest of the site.
 *  Each post's body is an ordered list of typed blocks so it can be
 *  rendered in the site's editorial style and stay fully { es, en }.
 *  Code blocks are language-agnostic (not translated).
 * ─────────────────────────────────────────────────────────────
 */

export type BlogBlock =
  | { type: "p"; text: L }
  | { type: "h2"; text: L }
  | { type: "quote"; text: L }
  | { type: "ul"; items: L[] }
  | { type: "code"; lang: string; code: string };

export type BlogPost = {
  slug: string;
  title: L;
  excerpt: L;
  /** ISO date — drives ordering and <time>. */
  date: string;
  tags: string[];
  /** Related project slug, if the post grew out of one. */
  project?: string;
  body: BlogBlock[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "de-4-2s-a-1-1s",
    title: {
      es: "De 4.2s a 1.1s: optimizar para el hardware que la gente sí tiene",
      en: "From 4.2s to 1.1s: optimizing for the hardware people actually have",
    },
    excerpt: {
      es: "La plataforma multi-tenant de mi tesis cargaba en 4.2 segundos. En laptops de gama baja eso significaba que nadie la usaba. Así la bajé a 1.1s.",
      en: "My thesis' multi-tenant platform loaded in 4.2 seconds. On low-end laptops that meant nobody used it. Here's how I got it to 1.1s.",
    },
    date: "2025-11-18",
    tags: ["Performance", "React", "Next.js"],
    project: "kybernet",
    body: [
      {
        type: "p",
        text: {
          es: "El rendimiento no es una métrica de vanidad. Cuando construí Kybernet — una plataforma multi-tenant para negocios pequeños mexicanos — la carga promedio era de 4.2 segundos. En mi laptop de desarrollo se sentía bien. En la computadora de una barbería con 4 GB de RAM y Chrome con quince pestañas abiertas, era el momento exacto en que el usuario cerraba la página.",
          en: "Performance isn't a vanity metric. When I built Kybernet — a multi-tenant platform for small Mexican businesses — the average load was 4.2 seconds. On my dev laptop it felt fine. On a barbershop's computer with 4 GB of RAM and Chrome holding fifteen tabs, it was the exact moment the user closed the page.",
        },
      },
      {
        type: "quote",
        text: {
          es: "El rendimiento es UX: en hardware modesto, 3 segundos ahorrados deciden si la herramienta se usa.",
          en: "Performance is UX: on low-end hardware, 3 saved seconds decide whether the tool gets used.",
        },
      },
      {
        type: "h2",
        text: { es: "Primero medir, nunca adivinar", en: "Measure first, never guess" },
      },
      {
        type: "p",
        text: {
          es: "Antes de tocar una línea, abrí el panel de Performance y un throttling de CPU 4x con red 'Fast 3G'. Simular el equipo real cambia todo: el bundle de JavaScript que en fibra tardaba 200 ms bloqueaba el hilo principal casi dos segundos. El cuello de botella no era la red — era el parseo y ejecución de JS.",
          en: "Before touching a line, I opened the Performance panel with 4x CPU throttling and 'Fast 3G' network. Simulating the real machine changes everything: the JavaScript bundle that took 200 ms on fiber blocked the main thread for nearly two seconds. The bottleneck wasn't the network — it was parsing and executing JS.",
        },
      },
      {
        type: "h2",
        text: { es: "1. Code splitting por ruta", en: "1. Route-level code splitting" },
      },
      {
        type: "p",
        text: {
          es: "El error clásico: todo el panel de administración viajaba en el bundle inicial, aunque el 90% de las sesiones nunca lo abría. Moví cada vista pesada detrás de un import dinámico, con un fallback ligero mientras carga.",
          en: "The classic mistake: the entire admin panel shipped in the initial bundle, even though 90% of sessions never opened it. I moved every heavy view behind a dynamic import, with a light fallback while it loads.",
        },
      },
      {
        type: "code",
        lang: "tsx",
        code: `// Antes: todo en el bundle inicial
import AdminDashboard from "./AdminDashboard";

// Después: se carga solo cuando se necesita
const AdminDashboard = lazy(() => import("./AdminDashboard"));

<Suspense fallback={<PanelSkeleton />}>
  <AdminDashboard />
</Suspense>`,
      },
      {
        type: "h2",
        text: { es: "2. Assets: el peso invisible", en: "2. Assets: the invisible weight" },
      },
      {
        type: "ul",
        items: [
          {
            es: "Imágenes servidas en WebP con tamaños responsivos en vez de PNG de 1 MB.",
            en: "Images served as WebP with responsive sizes instead of 1 MB PNGs.",
          },
          {
            es: "Fuentes con display: swap y subsetting — solo los caracteres latinos que uso.",
            en: "Fonts with display: swap and subsetting — only the Latin characters I use.",
          },
          {
            es: "Íconos como SVG inline, no una librería de 300 KB por tres glifos.",
            en: "Icons as inline SVG, not a 300 KB library for three glyphs.",
          },
        ],
      },
      {
        type: "p",
        text: {
          es: "Anécdota real de este mismo portafolio: encontré un favicon.png de 954 KB. Un favicon. Regenerado desde su SVG quedó en 11 KB. Nadie lo nota hasta que auditas — y esos detalles son exactamente lo que separa un sitio que 'se siente rápido' de uno que lo es.",
          en: "A real anecdote from this very portfolio: I found a 954 KB favicon.png. A favicon. Regenerated from its SVG it came down to 11 KB. Nobody notices until you audit — and those details are exactly what separates a site that 'feels fast' from one that is.",
        },
      },
      {
        type: "h2",
        text: { es: "3. No bloquear el render", en: "3. Don't block the render" },
      },
      {
        type: "p",
        text: {
          es: "Lo último fue orden de carga: datos críticos primero, todo lo demás después del primer pintado. El realtime de Supabase, los gráficos y la analítica se suscriben tras montar, no antes. El usuario ve la interfaz utilizable mientras lo secundario llega en segundo plano.",
          en: "The last piece was load order: critical data first, everything else after the first paint. Supabase realtime, charts and analytics subscribe after mount, not before. The user sees a usable interface while the secondary stuff arrives in the background.",
        },
      },
      {
        type: "h2",
        text: { es: "El resultado", en: "The result" },
      },
      {
        type: "p",
        text: {
          es: "Carga promedio de 4.2s a 1.1s en el mismo hardware de gama baja. Ninguna reescritura mágica — solo medir el equipo real, partir el bundle, adelgazar los assets y ordenar la carga. La lección que me quedó: optimiza para la peor máquina de tu usuario, no para la mejor de tu escritorio.",
          en: "Average load from 4.2s to 1.1s on the same low-end hardware. No magic rewrite — just measuring the real machine, splitting the bundle, trimming assets and ordering the load. The lesson that stuck: optimize for your user's worst machine, not your desk's best one.",
        },
      },
    ],
  },
  {
    slug: "design-system-sin-dark-mode",
    title: {
      es: "Por qué mi design system no tiene modo oscuro (a propósito)",
      en: "Why my design system has no dark mode (on purpose)",
    },
    excerpt: {
      es: "Construí Folio, una librería de ~50 componentes para software denso de oficina. La decisión más útil fue la que quité: nada de modo oscuro, nada de sombras. Las restricciones son la feature.",
      en: "I built Folio, a ~50-component library for dense office software. The most useful decision was the one I removed: no dark mode, no shadows. Constraints are the feature.",
    },
    date: "2026-01-22",
    tags: ["Design Systems", "CSS", "React"],
    project: "folio",
    body: [
      {
        type: "p",
        text: {
          es: "Después de construir cuatro herramientas internas — un POS, dashboards, paneles de administración — me di cuenta de que reconstruía los mismos botones, tablas y formularios cada vez. Y las librerías que existían estaban hechas para landings de marketing: colores brillantes, esquinas muy redondeadas, sombras y dark-mode por default. Ninguna encajaba en el software al que le confías números reales.",
          en: "After building four internal tools — a POS, dashboards, admin panels — I realized I was rebuilding the same buttons, tables and forms every time. And the libraries out there were made for marketing landing pages: bright colors, heavy rounding, drop shadows, dark-mode-first. None of them fit the software you trust with real numbers.",
        },
      },
      {
        type: "h2",
        text: { es: "Empecé por un brief, no por Figma", en: "I started with a brief, not Figma" },
      },
      {
        type: "p",
        text: {
          es: "En vez de abrir el editor, escribí una pregunta: ¿cómo se ve de verdad el software al que le confías los números? La respuesta era sobrio, light-first, legible y denso. La profundidad sale de líneas de 1px, no de cajas ni sombras. Un solo azul tinta usado con cuentagotas. Y, deliberadamente, sin modo oscuro.",
          en: "Instead of opening the editor, I wrote a question: what does software you trust with the numbers actually look like? The answer was sober, light-first, legible and dense. Depth comes from 1px lines, not boxes or shadows. One ink-blue accent used with an eyedropper. And, deliberately, no dark mode.",
        },
      },
      {
        type: "quote",
        text: {
          es: "Las restricciones son la feature — prohibir sombras y modo oscuro hizo cada pantalla consistente y más rápida de construir.",
          en: "Constraints are the feature — banning shadows and dark mode made every screen consistent and faster to build.",
        },
      },
      {
        type: "h2",
        text: { es: "El costo real del modo oscuro", en: "The real cost of dark mode" },
      },
      {
        type: "p",
        text: {
          es: "El modo oscuro no es un interruptor. Es duplicar cada decisión de color, cada estado de foco, cada borde, cada sombra que ahora tiene que 'brillar' en vez de 'proyectar'. Es el doble de superficie para bugs de contraste. Para una app de marketing puede valer la pena; para software administrativo denso donde la gente pasa ocho horas leyendo tablas, un solo tema light bien resuelto gana casi siempre.",
          en: "Dark mode isn't a switch. It's doubling every color decision, every focus state, every border, every shadow that now has to 'glow' instead of 'cast'. It's twice the surface area for contrast bugs. For a marketing app it can be worth it; for dense admin software where people spend eight hours reading tables, one well-resolved light theme wins almost every time.",
        },
      },
      {
        type: "h2",
        text: { es: "Tokens primero, componentes después", en: "Tokens first, components second" },
      },
      {
        type: "p",
        text: {
          es: "Una vez que color, tipografía y espaciado viven en variables CSS, los componentes casi se escriben solos. Toda la paleta cabe en un puñado de tokens — y como no hay tema alterno, cada token tiene un único valor del que preocuparse.",
          en: "Once color, type and spacing live in CSS variables, the components almost write themselves. The whole palette fits in a handful of tokens — and since there's no alternate theme, each token has a single value to worry about.",
        },
      },
      {
        type: "code",
        lang: "css",
        code: `:root {
  --ink: #1a1a1a;      /* texto */
  --paper: #ffffff;    /* lienzo real, no gris */
  --line: #e4e4e4;     /* la única línea de 1px */
  --accent: #2d4a7c;   /* azul tinta, con cuentagotas */
}

/* profundidad = líneas, nunca sombras */
.card { border: 1px solid var(--line); }`,
      },
      {
        type: "h2",
        text: { es: "Un design system es un producto", en: "A design system is a product" },
      },
      {
        type: "p",
        text: {
          es: "La lección más grande no fue de CSS. Un sistema de diseño necesita versionado, docs y una sola ruta de instalación, o nadie —incluido tú mismo— lo adopta. Folio se publicó en npm con un único styles.css de entrada, tipos de TypeScript y un prototipo navegable hecho enteramente con sus propios componentes. Ese último paso es el que lo convirtió en algo que de verdad reutilizo.",
          en: "The biggest lesson wasn't about CSS. A design system needs versioning, docs and a single install path, or nobody — including you — adopts it. Folio shipped on npm with a single styles.css entry, TypeScript types and a click-through prototype built entirely from its own components. That last step is what turned it into something I actually reuse.",
        },
      },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** Newest first — the order the index and feeds should use. */
export const sortedPosts = () =>
  [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

/** Rough reading time in minutes from a post's translatable text. */
export const readingMinutes = (post: BlogPost, lang: "es" | "en") => {
  const words = post.body
    .map((b) => {
      if (b.type === "p" || b.type === "h2" || b.type === "quote") return b.text[lang];
      if (b.type === "ul") return b.items.map((i) => i[lang]).join(" ");
      if (b.type === "code") return b.code;
      return "";
    })
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};
