import type { L } from "@/lib/i18n";

export type Project = {
  slug: string;
  index: string;
  title: L;
  tagline: L;
  year: string;
  role: L;
  status: L;
  color: string;
  tags: string[];
  cardImage?: string;
  problem: L;
  research: L;
  solution: L[];
  stack: string[];
  screens: { caption: L; image?: string; fit?: "cover" | "contain" }[];
  results: { metric: L; label: L }[];
  learnings: L[];
  live?: string;
  repo?: string;
  external?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "restaurant-surveys",
    index: "01",
    title: { es: "Encuestas Restaurante", en: "Restaurant Surveys" },
    tagline: {
      es: "Cada mesa se convierte en un dato.",
      en: "Every table becomes a data point.",
    },
    year: "2025",
    role: { es: "Desarrollador Full-Stack", en: "Full-Stack Developer" },
    status: { es: "En producción", en: "In production" },
    color: "#3B6BD6",
    tags: ["React", "TypeScript", "Supabase"],
    cardImage: "/projects/restaurant-surveys/dashboard.png",
    problem: {
      es: "Una cadena de restaurantes de mariscos no tenía datos reales sobre la satisfacción de sus clientes ni el rendimiento de sus meseros por sucursal. El feedback era anecdótico — se asumían comentarios positivos sin medirlos, los meseros problemáticos pasaban desapercibidos durante meses y el dueño tomaba decisiones de personal por puro instinto.",
      en: "A seafood restaurant chain had no real data on customer satisfaction or waiter performance across its branches. Feedback was anecdotal — positive comments were assumed but never measured, problem waiters went undetected for months, and the owner was making staffing decisions on gut feeling alone.",
    },
    research: {
      es: "El replanteamiento clave salió de hablar con el dueño: no quería 'una herramienta de encuestas', quería rendición de cuentas. Eso significaba que cada respuesta debía estar ligada a un mesero, sucursal y mesa específicos — y responder tenía que ser tan sin fricción que los comensales reales lo hicieran. Sin app que instalar, sin login: escaneas el QR de tu mesa, cinco taps y listo.",
      en: "The key reframe came from talking to the owner: he didn't want 'a survey tool', he wanted accountability. That meant every response had to be tied to a specific waiter, branch and table — and answering had to be so frictionless that real diners would actually do it. No app to install, no login: scan the QR on your table, tap five times, done.",
    },
    solution: [
      {
        es: "QR único por mesa — los comensales responden desde su propio teléfono en menos de un minuto, cero fricción",
        en: "Unique QR per table — diners answer from their own phone in under a minute, zero friction",
      },
      {
        es: "Modo encuesta en tablet para el mostrador, para capturar también a quienes van de salida",
        en: "Tablet survey mode for the counter, so walk-outs can be captured too",
      },
      {
        es: "Cada respuesta registrada con mesero, sucursal, mesa y timestamp — rendición de cuentas total",
        en: "Every response recorded with waiter, branch, table and timestamp — full accountability",
      },
      {
        es: "Dashboard gerencial con NPS y puntuaciones de servicio / comida / precio, filtrable por sucursal y período",
        en: "Manager dashboard with NPS, service / food / price scores, filterable by branch and period",
      },
      {
        es: "Tabla de rendimiento por mesero — promedios y volumen que vuelven concretas las conversaciones de coaching",
        en: "Per-waiter performance table — averages and volume that make coaching conversations concrete",
      },
      {
        es: "Supabase Realtime — las respuestas nuevas aparecen en el dashboard en cuanto se envían",
        en: "Supabase Realtime — new responses appear on the dashboard the moment they're submitted",
      },
    ],
    stack: ["React", "TypeScript", "Supabase", "Supabase Realtime"],
    screens: [
      {
        caption: { es: "Métricas + NPS", en: "Survey metrics + NPS" },
        image: "/projects/restaurant-surveys/dashboard.png",
      },
      {
        caption: { es: "Rendimiento por mesero", en: "Per-waiter performance" },
        image: "/projects/restaurant-surveys/waiters.png",
      },
      {
        caption: { es: "Modo encuesta en tablet", en: "Tablet survey mode" },
        image: "/projects/restaurant-surveys/tablet.png",
      },
    ],
    results: [
      {
        metric: { es: "3", en: "3" },
        label: { es: "Sucursales medidas", en: "Branches measured" },
      },
      {
        metric: { es: "0", en: "0" },
        label: {
          es: "Apps que el comensal debe instalar",
          en: "Apps diners must install",
        },
      },
      {
        metric: { es: "Live", en: "Live" },
        label: { es: "Respuestas en el dashboard", en: "Responses on the dashboard" },
      },
    ],
    learnings: [
      {
        es: "La fricción mata las tasas de respuesta — cada paso eliminado duplicó los comensales que terminaban.",
        en: "Friction kills response rates — every removed step doubled the number of diners who finished.",
      },
      {
        es: "La rendición de cuentas cambia conductas: puntuaciones por mesero convirtieron quejas vagas en coaching.",
        en: "Accountability changes behavior: scores per waiter turned vague complaints into coaching.",
      },
      {
        es: "Los dashboards en tiempo real generan confianza con dueños no técnicos — ver llegar los datos en vivo vende el sistema.",
        en: "Realtime dashboards build trust with non-technical owners — seeing data arrive live sells the system.",
      },
    ],
  },
  {
    slug: "inventory-management",
    index: "02",
    title: { es: "POS Joyería", en: "Jewelry POS" },
    tagline: {
      es: "Una sola fuente de verdad para una joyería multisucursal.",
      en: "One source of truth for a multi-branch jewelry chain.",
    },
    year: "2024",
    role: {
      es: "Desarrollador Frontend · Equipo de 5",
      en: "Frontend Developer · Team of 5",
    },
    status: { es: "En producción", en: "In production" },
    color: "#A8842C",
    tags: ["React", "TypeScript", "Laravel", "MySQL"],
    cardImage: "/projects/inventory-management/dashboard.png",
    problem: {
      es: "Una cadena de joyerías manejaba precios, inventario y ventas en cuatro sucursales con hojas de cálculo desconectadas. El precio del oro fluctúa a diario, así que las listas de precios estaban permanentemente desactualizadas — costando ingresos en silencio. Las transferencias entre sucursales tenían cero trazabilidad: las piezas salían de una tienda y 'llegaban' cuando alguien se acordaba de actualizar una celda.",
      en: "A jewelry chain managed pricing, stock and sales across four branches with disconnected spreadsheets. Gold prices fluctuate daily, so price lists were permanently out of date — quietly costing revenue. Transfers between branches had zero traceability: pieces left one store and 'arrived' whenever someone remembered to update a cell.",
    },
    research: {
      es: "Auditamos cada hoja de cálculo que el personal usaba en realidad y entrevistamos a cada gerente de sucursal. Dos hallazgos definieron la construcción: los precios tenían que ser automáticos (los humanos eran el cuello de botella y la fuente de error), y cada movimiento de inventario necesitaba autor y timestamp — la confianza entre sucursales dependía de ello.",
      en: "We audited every spreadsheet the staff actually used and interviewed each branch manager. Two findings shaped the build: pricing had to be automatic (humans were the bottleneck and the error source), and every inventory movement needed an author and a timestamp — trust between branches depended on it.",
    },
    solution: [
      {
        es: "Motor de precios dinámicos ligado a la cotización del oro en vivo — cada producto se reprecia automáticamente",
        en: "Dynamic pricing engine tied to the live gold spot price — every product reprices automatically",
      },
      {
        es: "Punto de venta completo con carrito, descuentos y recibos PDF generados del lado del servidor",
        en: "Full point-of-sale with cart, discounts and server-side PDF receipts",
      },
      {
        es: "Módulo de transferencias entre sucursales donde cada movimiento registra usuario, hora, origen y destino",
        en: "Branch-to-branch transfer module where every movement records user, time, origin and destination",
      },
      {
        es: "Vistas por rol: admin, gerente de sucursal y personal de ventas, cada uno con una interfaz enfocada",
        en: "Role-based views: admin, branch manager and sales staff each get a focused interface",
      },
      {
        es: "Catálogo de clientes con historial de compras y generación de QR por cliente",
        en: "Client catalog with purchase history and per-client QR generation",
      },
    ],
    stack: ["React", "TypeScript", "Laravel", "MySQL"],
    screens: [
      {
        caption: { es: "Dashboard de ventas vs. metas", en: "Sales dashboard vs. goals" },
        image: "/projects/inventory-management/dashboard.png",
      },
      {
        caption: { es: "Punto de venta + carrito", en: "Point of sale + cart" },
        image: "/projects/inventory-management/pos.png",
      },
      {
        caption: { es: "Catálogo de clientes con QR", en: "Client catalog with QR" },
        image: "/projects/inventory-management/clients.png",
      },
      {
        caption: { es: "Login por sucursal", en: "Branch login" },
        image: "/projects/inventory-management/login.png",
      },
    ],
    results: [
      {
        metric: { es: "4", en: "4" },
        label: { es: "Sucursales unificadas", en: "Branches unified" },
      },
      {
        metric: { es: "5+", en: "5+" },
        label: { es: "Personas en el equipo", en: "Person dev team" },
      },
      {
        metric: { es: "1", en: "1" },
        label: {
          es: "Sistema reemplazando todas las hojas de cálculo",
          en: "System replacing all spreadsheets",
        },
      },
    ],
    learnings: [
      {
        es: "En equipo, los contratos de API acordados temprano valen más que cualquier elección de framework.",
        en: "On a team, API contracts agreed early are worth more than any framework choice.",
      },
      {
        es: "La auditabilidad es una feature que los usuarios sienten: '¿quién movió esto?' siempre debe tener respuesta.",
        en: "Auditability is a feature users feel: 'who moved this?' must always have an answer.",
      },
      {
        es: "Las rarezas del dominio (¡cotización diaria del oro!) son donde muere el software genérico y el software a medida se gana su lugar.",
        en: "Domain quirks (daily gold quotes!) are where generic software dies and custom software earns its keep.",
      },
    ],
  },
  {
    slug: "dental-family",
    index: "03",
    title: { es: "Dental Family", en: "Dental Family" },
    tagline: {
      es: "Citas médicas sin llamadas telefónicas.",
      en: "Medical appointments without phone calls.",
    },
    year: "2026",
    role: { es: "Desarrollador Full-Stack", en: "Full-Stack Developer" },
    status: { es: "En producción", en: "In production" },
    color: "#C5A891",
    tags: ["React", "TypeScript", "Node.js", "N8N"],
    cardImage: "/projects/dental-family/home.png",
    problem: {
      es: "Una clínica dental gestionaba sus citas por teléfono y WhatsApp manual — la agenda era un cuaderno, los recordatorios dependían de que alguien se acordara y los pacientes no tenían forma de ver o cancelar sus citas sin llamar. Las citas perdidas costaban tiempo y dinero sin que nadie supiera exactamente cuánto.",
      en: "A dental clinic managed appointments by phone and manual WhatsApp — the schedule was a notebook, reminders depended on someone remembering, and patients had no way to view or cancel without calling. No-shows were costing time and money without anyone knowing exactly how much.",
    },
    research: {
      es: "Trabajé directamente con la recepcionista y el dentista para mapear el flujo real de una cita: reserva, confirmación, recordatorio, llegada. El hallazgo clave: el 80% del trabajo de recepción era reactivo (contestar llamadas, mandar mensajes manualmente). El objetivo no era reemplazar a la recepcionista, sino eliminar las tareas repetitivas para que pudiera enfocarse en los pacientes presentes.",
      en: "I worked directly with the receptionist and dentist to map the real flow of an appointment: booking, confirmation, reminder, arrival. The key finding: 80% of reception work was reactive (answering calls, sending messages manually). The goal wasn't to replace the receptionist — it was to eliminate repetitive tasks so she could focus on patients in the room.",
    },
    solution: [
      {
        es: "Reservas online 24/7 — el paciente elige fecha, hora y servicio sin llamar a la clínica",
        en: "24/7 online bookings — patients pick date, time and service without calling the clinic",
      },
      {
        es: "Agente de IA conectado a WhatsApp vía N8N — confirma citas automáticamente en el canal que el paciente ya usa",
        en: "AI agent connected to WhatsApp via N8N — automatically confirms appointments on the channel patients already use",
      },
      {
        es: "Recordatorios automáticos 24h antes — reducción de no-shows sin intervención manual",
        en: "Automatic reminders 24h before — no-show reduction with zero manual effort",
      },
      {
        es: "Historial médico digital por paciente — notas, tratamientos y documentos accesibles desde el panel",
        en: "Digital medical history per patient — notes, treatments and documents accessible from the dashboard",
      },
      {
        es: "Panel de gestión para el equipo: vista de agenda, historial de pacientes y control de citas",
        en: "Management dashboard for the team: schedule view, patient history and appointment control",
      },
    ],
    stack: ["React", "TypeScript", "Node.js", "N8N", "PostgreSQL"],
    screens: [
      {
        caption: { es: "Landing y reserva online", en: "Landing & online booking" },
        image: "/projects/dental-family/home.png",
      },
      {
        caption: { es: "Flujo de reserva de cita", en: "Appointment booking flow" },
        image: "/projects/dental-family/booking.png",
      },
      {
        caption: { es: "Panel de gestión", en: "Management panel" },
        image: "/projects/dental-family/panel.png",
      },
    ],
    results: [
      {
        metric: { es: "24/7", en: "24/7" },
        label: { es: "Reservas sin llamadas", en: "Bookings without calls" },
      },
      {
        metric: { es: "IA", en: "AI" },
        label: { es: "Confirmaciones por WhatsApp", en: "WhatsApp confirmations" },
      },
      {
        metric: { es: "0", en: "0" },
        label: { es: "Recordatorios manuales", en: "Manual reminders" },
      },
    ],
    learnings: [
      {
        es: "Los flujos automatizados solo funcionan si el canal es el que el usuario ya usa — WhatsApp ganó sobre cualquier email.",
        en: "Automated flows only work if the channel is one the user already uses — WhatsApp beat any email approach.",
      },
      {
        es: "El panel interno y el frontend del paciente tienen necesidades completamente distintas — intentar servirlas con un solo diseño es un error.",
        en: "The internal panel and patient-facing frontend have completely different needs — trying to serve them with one design is a mistake.",
      },
      {
        es: "Los agentes de IA en producción necesitan fallbacks claros — cuando el agente no sabe, debe escalar a humano gracefully.",
        en: "AI agents in production need clear fallbacks — when the agent doesn't know, it must escalate to a human gracefully.",
      },
    ],
  },
  {
    slug: "kybernet",
    index: "04",
    title: { es: "Kybernet.MX", en: "Kybernet.MX" },
    tagline: {
      es: "Una plataforma, cualquier tipo de negocio.",
      en: "One platform, every kind of business.",
    },
    year: "2024",
    role: {
      es: "Proyecto de Tesis · Frontend Lead",
      en: "Thesis Project · Frontend Lead",
    },
    status: { es: "Tesis · UTCV", en: "Thesis · UTCV" },
    color: "#5440A8",
    tags: ["React", "TypeScript", "Supabase"],
    cardImage: "/projects/kybernet/login.png",
    problem: {
      es: "Las herramientas de gestión empresarial genéricas asumen una sola vertical — una barbería, una tienda y un taller terminan forzados en el mismo flujo. Los negocios pequeños mexicanos acaban pagando software que no le queda a nadie. La pregunta de tesis: ¿puede una plataforma registrar y gestionar distintos giros de negocio con reglas que se adaptan por vertical?",
      en: "Off-the-shelf business management tools assume one vertical — a barbershop, a store and a workshop all get forced into the same flow. Small Mexican businesses end up paying for software that fits nobody. The thesis question: can one platform register and manage different business types under rules that adapt per vertical?",
    },
    research: {
      es: "Mapeé los flujos de registro y operación de varios giros (retail, servicios, comida) y encontré ~70% de traslape — las diferencias se concentraban en un conjunto pequeño de reglas: qué datos requiere cada vertical, qué operaciones permite. Eso apuntó a un núcleo multi-tenant con una capa de reglas configurable en vez de flujos hardcodeados. El rendimiento se volvió la segunda línea de investigación: cargas de 4 segundos eran inusables en el hardware barato donde estos negocios realmente operan.",
      en: "I mapped the registration and operation flows of several business types (retail, services, food) and found ~70% overlap — the differences concentrated in a small set of rules: what data each vertical requires, what operations it allows. That pointed to a multi-tenant core with a configurable rules layer instead of hardcoded flows. Performance became a second research thread: 4-second loads were unusable on the cheap hardware these businesses actually run.",
    },
    solution: [
      {
        es: "Arquitectura multi-tenant — cada negocio aislado, con sus propios datos y configuración",
        en: "Multi-tenant architecture — every business isolated, with its own data and configuration",
      },
      {
        es: "Reglas configurables por giro de negocio en vez de flujos hardcodeados de talla única",
        en: "Configurable rules per business vertical instead of hardcoded, one-size-fits-none flows",
      },
      {
        es: "React + Supabase: auth, aislamiento de datos a nivel de fila y realtime en un solo backend",
        en: "React + Supabase: auth, row-level data isolation and realtime in one backend",
      },
      {
        es: "Code splitting y optimización de assets llevaron la carga promedio de 4.2s a 1.1s",
        en: "Code splitting and asset optimization took average page load from 4.2s down to 1.1s",
      },
      {
        es: "Defendido como tesis en la UTCV — acotado, lanzado y documentado como un producto",
        en: "Defended as a thesis project at UTCV — scoped, shipped and documented like a product",
      },
    ],
    stack: ["React", "TypeScript", "Supabase"],
    screens: [
      {
        caption: { es: "Acceso multi-tenant", en: "Multi-tenant access" },
        image: "/projects/kybernet/login.png",
        fit: "contain",
      },
    ],
    results: [
      {
        metric: { es: "1.1s", en: "1.1s" },
        label: {
          es: "Carga promedio — desde 4.2s",
          en: "Avg load — down from 4.2s",
        },
      },
      {
        metric: { es: "70%", en: "70%" },
        label: {
          es: "Traslape convertido en un solo núcleo",
          en: "Flow overlap turned into one core",
        },
      },
      {
        metric: { es: "2024", en: "2024" },
        label: { es: "Tesis defendida", en: "Thesis defended" },
      },
    ],
    learnings: [
      {
        es: "Dibuja las fronteras de tenancy el día uno — retrofitear aislamiento es cirugía, no refactor.",
        en: "Draw tenancy boundaries on day one — retrofitting isolation is surgery, not refactoring.",
      },
      {
        es: "El rendimiento es UX: en hardware modesto, 3 segundos ahorrados deciden si la herramienta se usa.",
        en: "Performance is UX: on low-end hardware, 3 saved seconds decide whether the tool gets used.",
      },
      {
        es: "Acotar una tesis como producto — cortar, lanzar, documentar — es la razón por la que de verdad se terminó.",
        en: "Scoping a thesis like a product — cut, ship, document — is why it actually got finished.",
      },
    ],
  },
  {
    slug: "folio",
    index: "05",
    title: { es: "Folio", en: "Folio" },
    tagline: {
      es: "Un sistema de diseño para el software que cuida los números.",
      en: "A design system for software you trust with the numbers.",
    },
    year: "2026",
    role: {
      es: "Diseño de sistemas · Autoiniciado",
      en: "Design Systems · Self-initiated",
    },
    status: { es: "Publicado en npm", en: "Published on npm" },
    color: "#2D4A7C",
    tags: ["React", "Design System", "npm"],
    cardImage: "/projects/folio/overview.png",
    problem: {
      es: "Después de construir cuatro herramientas internas — POS, dashboards, paneles de administración — me di cuenta de que reconstruía los mismos botones, tablas y formularios desde cero en cada proyecto. Y las librerías de componentes que existían estaban hechas para sitios de marketing: colores brillantes, esquinas muy redondeadas, sombras y dark-mode por default. Ninguna encajaba en el software denso de oficinista, donde le confías la pantalla a números reales. Cada proyecto derivaba en su propia dirección.",
      en: "After building four internal tools — a POS, dashboards, admin panels — I realized I was rebuilding the same buttons, tables and forms from scratch every time. And the component libraries out there were built for marketing sites: bright colors, heavy rounding, drop shadows, dark-mode-first. None of them fit dense oficinista software, where you trust the screen with real numbers. Every project drifted in its own direction.",
    },
    research: {
      es: "En vez de abrir Figma, escribí un brief de marca: ¿cómo se ve de verdad el software al que le confías los números? La respuesta era sobrio, light-first, legible y denso — la profundidad sale de líneas de 1px, no de cajas ni sombras; un solo azul tinta usado con cuentagotas; IBM Plex partido en tres roles estrictos; y deliberadamente sin modo oscuro. Estudié herramientas administrativas corporativas para derivar los tokens en vez de inventarlos.",
      en: "Instead of opening Figma, I wrote a brand brief: what does software you trust with the numbers actually look like? The answer was sober, light-first, legible and dense — depth comes from 1px lines, not boxes or shadows; one ink-blue accent used with an eyedropper; IBM Plex split into three strict roles; and deliberately no dark mode. I studied corporate admin tools to derive the tokens rather than invent them.",
    },
    solution: [
      {
        es: "Paleta sobria light-first: lienzo blanco real, tres grises y una sola línea de 1px cargan toda la estructura — nunca cajas ni sombras duras",
        en: "Sober light-first palette: a real white canvas, three grays and a single 1px line carry all the structure — never boxes or hard shadows",
      },
      {
        es: "Un único azul tinta (#2D4A7C) usado con cuentagotas — botón primario, nav activo, focus ring, fila seleccionada — nunca como decoración",
        en: "One ink-blue accent (#2D4A7C) used with an eyedropper — primary button, active nav, focus ring, selected row — never as decoration",
      },
      {
        es: "IBM Plex en tres roles estrictos: serif para títulos, sans para la UI, mono con cifras tabulares para cada número, ID y fecha",
        en: "IBM Plex in three strict roles: serif for titles, sans for UI, mono with tabular figures for every number, ID and date",
      },
      {
        es: "~50 componentes entre core, formularios, navegación, datos, feedback y overlays — cada overlay se monta por portal en <body> y cierra con Escape / click afuera",
        en: "~50 components across core, forms, navigation, data, feedback and overlays — every overlay portals to <body> and closes on Escape / outside-click",
      },
      {
        es: "Toda la animación sobre una sola curva expo, solo transform/opacity, detrás de prefers-reduced-motion — sin rebotes ni resortes",
        en: "All motion on one expo curve, transform/opacity only, gated behind prefers-reduced-motion — no bounces, no springs",
      },
      {
        es: "Publicado como paquete npm (@alanbuendia/folio) con un único styles.css de entrada, tipos de TypeScript y un prototipo navegable hecho enteramente con sus propios componentes",
        en: "Shipped as an npm package (@alanbuendia/folio) with a single styles.css entry, TypeScript types and a click-through prototype built entirely from its own components",
      },
    ],
    stack: ["React", "Vite", "CSS Tokens", "IBM Plex", "Lucide"],
    screens: [
      {
        caption: { es: "Landing — docs site", en: "Landing — docs site" },
        image: "/projects/folio/landing.png",
      },
      {
        caption: { es: "Docs — índice de componentes", en: "Docs — component index" },
        image: "/projects/folio/overview.png",
      },
      {
        caption: { es: "Folio Console — dashboard en vivo", en: "Folio Console — live dashboard" },
        image: "/projects/folio/dashboard.png",
      },
    ],
    results: [
      {
        metric: { es: "~50", en: "~50" },
        label: { es: "Componentes en la librería", en: "Components in the library" },
      },
      {
        metric: { es: "npm", en: "npm" },
        label: { es: "Publicado y versionado", en: "Published & versioned" },
      },
      {
        metric: { es: "0", en: "0" },
        label: { es: "Modo oscuro — por diseño", en: "Dark mode — by design" },
      },
    ],
    learnings: [
      {
        es: "Un sistema de diseño es un producto: necesita versionado, docs y una sola ruta de instalación, o nadie (ni tú mismo) lo adopta.",
        en: "A design system is a product: it needs versioning, docs and a single install path, or nobody (including you) adopts it.",
      },
      {
        es: "Las restricciones son la feature — prohibir sombras y modo oscuro hizo cada pantalla consistente y más rápida de construir.",
        en: "Constraints are the feature — banning shadows and dark mode made every screen consistent and faster to build.",
      },
      {
        es: "Primero los tokens, luego los componentes: una vez que color, tipo y espaciado viven en variables CSS, los componentes casi se escriben solos.",
        en: "Tokens first, components second: once color, type and spacing live in CSS variables, the components almost write themselves.",
      },
    ],
    live: "https://folio-lac-chi.vercel.app/",
    repo: "https://github.com/Bufonlol/folio",
    external: "https://www.npmjs.com/package/@alanbuendia/folio",
  },
  {
    slug: "cota",
    index: "06",
    title: { es: "Cota", en: "Cota" },
    tagline: {
      es: "Cotiza. Muestra en 3D. Cierra la venta.",
      en: "Quote it. Show it in 3D. Close the sale.",
    },
    year: "2026",
    role: { es: "Desarrollador Full-Stack", en: "Full-Stack Developer" },
    status: { es: "Demo en vivo", en: "Live demo" },
    color: "#D99A1E",
    tags: ["Next.js", "React Three Fiber", "Three.js", "Supabase"],
    cardImage: "/projects/cota/cota2.png",
    problem: {
      es: "Los talleres de cancelería y herrería cotizan ventanas y puertas de aluminio a mano: el cliente describe lo que quiere, el maestro hace cuentas en una libreta — perfil, vidrio, herrajes, merma, mano de obra — y entrega un precio que el cliente no puede visualizar. El proceso es lento, propenso a error y no hay forma de que el cliente vea cómo se verá la pieza antes de pagar. Cada cotización es un acto de fe de ambos lados.",
      en: "Aluminum window-and-door workshops (cancelería) quote by hand: the client describes what they want, the master runs numbers in a notebook — profile, glass, hardware, waste, labor — and hands over a price the client can't picture. The process is slow, error-prone, and there's no way for the client to see what the piece will look like before paying. Every quote is an act of faith on both sides.",
    },
    research: {
      es: "Hablé con quienes cotizan a diario y el patrón era claro: el cálculo del precio no es lo difícil — es repetir el mismo cálculo sin equivocarse, poder mostrarlo y mantener las tarifas al día cuando suben los materiales. Una cotización gana fuerza cuando el cliente la ve. Eso definió tres pilares: un visor 3D en tiempo real que arma la pieza mientras la diseñas, un motor de precios transparente (perfil por metro lineal, vidrio por m², herrajes, merma, mano de obra) cubierto por pruebas para que el cálculo nunca falle, y un panel de administración donde el taller edita sus propias tarifas sin tocar código.",
      en: "I talked to the people who quote every day and the pattern was clear: computing the price isn't the hard part — repeating it without slipping, being able to show it, and keeping rates current as materials rise, is. A quote gains weight the moment the client can see it. That set three pillars: a real-time 3D viewer that builds the piece as you design it, a transparent pricing engine (profile per linear meter, glass per m², hardware, waste, labor) covered by tests so the math never breaks, and an admin panel where the workshop edits its own rates without touching code.",
    },
    solution: [
      {
        es: "Visor 3D en tiempo real con React Three Fiber — la ventana o puerta se arma y rota en pantalla mientras ajustas medidas, montaje (pared, flotante, exterior) y tipo de apertura (fija, corrediza, abatible, arco…)",
        en: "Real-time 3D viewer with React Three Fiber — the window or door builds and rotates on screen as you adjust measurements, mounting (wall, floating, exterior) and opening type (fixed, sliding, casement, arch…)",
      },
      {
        es: "Editor de forma libre: arrastra los vértices del marco, teclea la medida exacta de cada lado en cm y verifica la escuadra del vano con las diagonales — clave en obra real",
        en: "Free-form shape editor: drag the frame vertices, type each side's exact length in cm, and check the opening is square via the diagonals — critical on a real job site",
      },
      {
        es: "Motor de precios cubierto por pruebas (Vitest) — perfil de aluminio por metro lineal, vidrio por m², herrajes, merma, mano de obra, descuento e IVA, recalculado al instante con cada cambio",
        en: "Pricing engine covered by tests (Vitest) — aluminum profile per linear meter, glass per m², hardware, waste, labor, discount and tax, recomputed instantly on every change",
      },
      {
        es: "Cotizaciones multi-partida con folio, vigencia y marca del taller — preview 2D en alzado (SVG, imprimible), exportable a PDF y enviable por WhatsApp en un toque",
        en: "Multi-line quotes with folio number, expiry and the workshop's branding — 2D elevation preview (printable SVG), exportable to PDF and sent over WhatsApp in one tap",
      },
      {
        es: "Panel de administración con Supabase Auth: dashboard de cotizaciones recibidas y editor de tarifas — los cambios de precio se reflejan en el cotizador al instante, sin tocar código",
        en: "Admin panel with Supabase Auth: dashboard of received quotes plus a tariff editor — price changes reflect in the quoter instantly, no code required",
      },
      {
        es: "Seguridad a nivel de base de datos con Row Level Security: catálogo de lectura pública para que el cotizador funcione, pero escritura restringida a administradores en allowlist — defensa en profundidad sobre Server Actions y middleware",
        en: "Database-level security with Row Level Security: public read on the catalog so the quoter works, but writes restricted to an admin allowlist — defense in depth over Server Actions and middleware",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "React Three Fiber",
      "Three.js",
      "Supabase",
      "Tailwind CSS",
    ],
    screens: [
      {
        caption: { es: "Landing — la herramienta", en: "Landing — the tool" },
        image: "/projects/cota/cota1.png",
      },
      {
        caption: { es: "Editor 3D + desglose de precio", en: "3D editor + price breakdown" },
        image: "/projects/cota/cota2.png",
      },
      {
        caption: { es: "Cotización lista para enviar", en: "Quote ready to send" },
        image: "/projects/cota/cota3.png",
      },
    ],
    results: [
      {
        metric: { es: "3D", en: "3D" },
        label: { es: "Vista previa en tiempo real", en: "Real-time preview" },
      },
      {
        metric: { es: "RLS", en: "RLS" },
        label: { es: "Seguridad a nivel de base de datos", en: "Database-level security" },
      },
      {
        metric: { es: "PDF", en: "PDF" },
        label: { es: "Cotización + envío por WhatsApp", en: "Quote + WhatsApp delivery" },
      },
    ],
    learnings: [
      {
        es: "Ver vende: un visor 3D convierte una cifra abstracta en algo que el cliente entiende y aprueba más rápido.",
        en: "Seeing sells: a 3D viewer turns an abstract number into something the client understands and approves faster.",
      },
      {
        es: "El motor de precios es el corazón del producto — cubrirlo con pruebas (tipos de ventana, multi-partida, forma libre, descuentos) fue lo que me dejó cambiar tarifas sin miedo a romper una cotización.",
        en: "The pricing engine is the heart of the product — covering it with tests (window types, multi-line, free-form, discounts) is what let me change rates without fear of breaking a quote.",
      },
      {
        es: "Una herramienta que el taller mantiene solo necesita un panel propio: editor de tarifas + RLS significa que cambian precios sin tocar código y sin poder romper la seguridad.",
        en: "A tool the workshop maintains itself needs its own panel: a tariff editor + RLS means they change prices without touching code and without being able to break security.",
      },
    ],
    live: "https://cota-rosy.vercel.app/",
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
