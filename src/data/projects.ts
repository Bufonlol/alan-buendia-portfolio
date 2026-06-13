import type { L } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────
 *  CASE STUDIES — one object per project, fully data-driven and
 *  bilingual ({ es, en } on every visible string). Drop real
 *  screenshots into /public/projects/<slug>/ and list them in
 *  `screens`; add a `video` path to replace the demo placeholder.
 *  NOTE: keep `title` free of accented characters — the hero
 *  animation masks clip diacritics.
 * ─────────────────────────────────────────────────────────────
 */

export type Project = {
  slug: string;
  index: string;
  title: L;
  tagline: L;
  year: string;
  role: L;
  status: L;
  color: string; // per-project tint used in visuals
  tags: string[];
  /** hero/card artwork — omit to use the stylized placeholder */
  cardImage?: string;
  problem: L;
  research: L;
  solution: L[];
  stack: string[];
  screens: { caption: L; image?: string; fit?: "cover" | "contain" }[];
  video?: string;
  results: { metric: L; label: L }[];
  learnings: L[];
  live?: string;
  repo?: string;
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
    slug: "pulmoalert",
    index: "02",
    title: { es: "PulmoAlert", en: "PulmoAlert" },
    tagline: {
      es: "Alertas tempranas para la salud respiratoria.",
      en: "Early warnings for respiratory health.",
    },
    year: "2024",
    role: { es: "Desarrollador Frontend", en: "Frontend Developer" },
    status: { es: "Piloto", en: "Pilot" },
    color: "#3E6B5C",
    tags: ["Angular", "TypeScript", "Spring Boot", "MySQL"],
    problem: {
      es: "Los pacientes respiratorios se deterioran en silencio entre consultas. Para cuando los síntomas alarman lo suficiente como para ir al médico, la ventana de intervención temprana suele haberse cerrado. Los clínicos no tenían señal continua — solo lo que el paciente recordara en la siguiente cita.",
      en: "Respiratory patients deteriorate quietly between checkups. By the time symptoms are alarming enough to visit a doctor, the window for early intervention has often closed. Clinicians had no continuous signal — only whatever the patient remembered at the next appointment.",
    },
    research: {
      es: "Trabajando con compañeros de ciencias de la salud, mapeé cómo ocurre el triaje en realidad: los clínicos no quieren datos crudos, quieren saber quién necesita atención hoy. Eso reencuadró el producto: de una app de registro a un sistema de alertas — el paciente registra en segundos, el sistema vigila la tendencia y el dashboard solo muestra los casos que van a la deriva.",
      en: "Working with health-sciences peers, I mapped how triage actually happens: clinicians don't want raw data, they want to know who needs attention today. That reframed the product from a logging app into an alerting system — patients log in seconds, the system watches the trend, and the dashboard surfaces only the cases that are drifting.",
    },
    solution: [
      {
        es: "Check-in diario hecho para gente enferma: síntomas + SpO₂ registrados en menos de 30 segundos",
        en: "Daily check-in built for sick people: symptoms + SpO₂ logged in under 30 seconds",
      },
      {
        es: "Motor de riesgo con tres niveles — estable, vigilancia, alerta — basado en tendencia, no en lecturas sueltas",
        en: "Risk engine with three tiers — stable, watch, alert — based on trend, not single readings",
      },
      {
        es: "Dashboard clínico ordenado por quién necesita atención primero, no por orden alfabético",
        en: "Clinician dashboard sorted by who needs attention first, not by alphabet",
      },
      {
        es: "Lenguaje visual de semáforo usable por pacientes de cualquier edad sin capacitación",
        en: "Traffic-light visual language usable by patients of any age without training",
      },
      {
        es: "Pipeline de notificaciones para que un nivel 'alerta' nunca pase la noche sin verse",
        en: "Notification pipeline so an 'alert' tier never sits unseen overnight",
      },
    ],
    stack: ["Angular", "TypeScript", "Spring Boot", "Java", "MySQL"],
    screens: [
      { caption: { es: "Check-in diario de 30 segundos", en: "30-second daily check-in" } },
      { caption: { es: "Vista de tendencia del paciente", en: "Patient trend view" } },
      { caption: { es: "Dashboard de triaje clínico", en: "Clinician triage dashboard" } },
    ],
    results: [
      {
        metric: { es: "30s", en: "30s" },
        label: { es: "Check-in diario promedio", en: "Average daily check-in" },
      },
      {
        metric: { es: "3", en: "3" },
        label: {
          es: "Niveles de riesgo, cero capacitación",
          en: "Risk tiers, zero training needed",
        },
      },
      {
        metric: { es: "24/7", en: "24/7" },
        label: {
          es: "Monitoreo de tendencia entre visitas",
          en: "Trend monitoring between visits",
        },
      },
    ],
    learnings: [
      {
        es: "Diseñar para usuarios enfermos lo cambia todo: objetivos más grandes, menos pasos, colores más calmados.",
        en: "Designing for unwell users changes everything: bigger targets, fewer steps, calmer colors.",
      },
      {
        es: "La fatiga de alertas es un problema de diseño — si todo es urgente, nada lo es.",
        en: "Alert fatigue is a design problem — if everything is urgent, nothing is.",
      },
      {
        es: "La visualización de datos de salud debe ser honesta primero y bonita después.",
        en: "Health data visualization must be honest first and pretty second.",
      },
    ],
  },
  {
    slug: "inventory-management",
    index: "03",
    title: { es: "Sistema de Inventario", en: "Inventory System" },
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
        es: "Módulo de transferencias entre sucursales donde cada movimiento registra usuario, hora, origen y destino",
        en: "Branch-to-branch transfer module where every movement records user, time, origin and destination",
      },
      {
        es: "Vistas por rol: admin, gerente de sucursal y personal de ventas, cada uno con una interfaz enfocada",
        en: "Role-based views: admin, branch manager and sales staff each get a focused interface",
      },
      {
        es: "Flujo de ventas completo con recibos PDF generados del lado del servidor y documentos de transferencia",
        en: "Complete sales flow with server-side PDF receipts and transfer documents",
      },
      {
        es: "Esquema MySQL normalizado para productos, variantes, sucursales y transacciones",
        en: "Normalized MySQL schema for products, variants, branches and transactions",
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
    slug: "supplier-platform",
    index: "04",
    title: { es: "Plataforma de Proveedores", en: "Supplier Platform" },
    tagline: {
      es: "Compras sin el caos de WhatsApp.",
      en: "Procurement without the WhatsApp chaos.",
    },
    year: "2025",
    role: { es: "Desarrollador Full-Stack", en: "Full-Stack Developer" },
    status: { es: "En desarrollo", en: "In development" },
    color: "#4A5A8A",
    tags: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    problem: {
      es: "Los negocios pequeños le piden a sus proveedores a través de un pantano de chats de WhatsApp, llamadas y PDFs reenviados. Las listas de precios caducan el día que se envían, las cotizaciones se pierden entre conversaciones y nadie puede responder la pregunta más simple: ¿qué pedimos el mes pasado y cuánto costó?",
      en: "Small businesses order from suppliers through a swamp of WhatsApp chats, phone calls and forwarded PDFs. Price lists are stale the day they're sent, quotes get lost between conversations, and nobody can answer the simplest question: what did we order last month and what did it cost?",
    },
    research: {
      es: "Mapeé el ciclo completo comprador–proveedor con negocios locales para los que ya había construido sistemas. El hallazgo: ninguno de los dos lados quería 'un marketplace' — querían sus relaciones existentes, menos el caos. Así que la plataforma digitaliza la relación misma: catálogos, cotizaciones, pedidos e historial entre partes que ya se tienen confianza.",
      en: "I mapped the full buyer–supplier loop with local businesses I'd already built systems for. The insight: neither side wanted 'a marketplace' — they wanted their existing relationships, minus the chaos. So the platform digitizes the relationship itself: catalogs, quotes, orders and history between parties that already trust each other.",
    },
    solution: [
      {
        es: "Catálogos de proveedor con listas de precios versionadas — los PDFs caducos reemplazados por una fuente de verdad viva",
        en: "Supplier catalogs with versioned price lists — stale PDFs replaced by a living source of truth",
      },
      {
        es: "Flujo de cotización (RFQ): compara respuestas de proveedores lado a lado en vez de scrollear chats",
        en: "Request-for-quote flow: compare supplier responses side by side instead of scrolling chats",
      },
      {
        es: "Seguimiento de pedidos con una línea de tiempo visible para ambos lados — solicitado, confirmado, enviado, entregado",
        en: "Order tracking with a status timeline both sides can see — requested, confirmed, shipped, delivered",
      },
      {
        es: "Notificaciones por WhatsApp vía N8N para que los proveedores no tengan que aprender un hábito nuevo el día uno",
        en: "WhatsApp notifications via N8N so suppliers don't need to learn a new habit on day one",
      },
      {
        es: "Historial de pedidos y analítica de gasto que por fin responden '¿cuánto nos costó esto el trimestre pasado?'",
        en: "Order history and spend analytics that finally answer 'what did this cost us last quarter?'",
      },
    ],
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "Docker", "N8N"],
    screens: [
      {
        caption: {
          es: "Catálogo de proveedor versionado",
          en: "Versioned supplier catalog",
        },
      },
      { caption: { es: "Comparación de cotizaciones", en: "Quote comparison" } },
      {
        caption: {
          es: "Línea de tiempo del pedido",
          en: "Order status timeline",
        },
      },
    ],
    results: [
      {
        metric: { es: "1", en: "1" },
        label: {
          es: "Canal en vez de chats dispersos",
          en: "Channel instead of scattered chats",
        },
      },
      {
        metric: { es: "RFQ", en: "RFQ" },
        label: {
          es: "Cotizaciones comparadas lado a lado",
          en: "Quotes compared side by side",
        },
      },
      {
        metric: { es: "Auto", en: "Auto" },
        label: {
          es: "Actualizaciones por WhatsApp",
          en: "WhatsApp status updates",
        },
      },
    ],
    learnings: [
      {
        es: "Encontrar a los usuarios en las herramientas que ya usan (WhatsApp) le gana a forzar un hábito nuevo.",
        en: "Meeting users on the tools they already use (WhatsApp) beats forcing a new habit.",
      },
      {
        es: "El modelado multi-tenant es 10 veces más fácil de hacer bien el día uno que de retrofitear.",
        en: "Multi-tenant data modeling is 10x easier to get right on day one than to retrofit.",
      },
      {
        es: "Las tablas son una disciplina de UX en sí mismas — orden, densidad y escaneabilidad deciden la adopción.",
        en: "Tables are a UX discipline of their own — sorting, density and scanability decide adoption.",
      },
    ],
  },
  {
    slug: "ai-security",
    index: "05",
    title: { es: "Lab de Seguridad IA", en: "AI Security Lab" },
    tagline: {
      es: "Triaje de phishing explicable para equipos pequeños.",
      en: "Explainable phishing triage for small teams.",
    },
    year: "2026",
    role: { es: "I+D · Solo", en: "R&D · Solo" },
    status: { es: "Investigación", en: "Research" },
    color: "#7A3E8F",
    tags: ["React", "TypeScript", "FastAPI", "LLM"],
    problem: {
      es: "A los negocios pequeños mexicanos los phishean constantemente y no tienen equipo de seguridad que haga triaje. Los filtros genéricos no cachan las estafas localizadas — avisos falsos del SAT, suplantación de bancos, fraudes de paquetería — y los empleados reenvían correos sospechosos a quien 'le sabe a las computadoras'. Los veredictos llegan tarde o nunca.",
      en: "Small Mexican businesses get phished constantly and have no security team to triage it. Generic spam filters miss localized scams — fake SAT notices, bank impersonations, parcel fraud — and employees forward suspicious emails to whoever 'knows computers'. Verdicts arrive late or never.",
    },
    research: {
      es: "Reuní un corpus de muestras reales de phishing dirigidas a negocios mexicanos y probé heurísticas (análisis de URLs, discrepancia de remitente, lenguaje de urgencia) contra clasificación con LLMs. Ninguno gana solo: las heurísticas son rápidas pero frágiles, los LLMs son flexibles pero necesitan barandales. La pregunta de diseño se volvió la confianza — un veredicto que nadie entiende es un veredicto sobre el que nadie actúa.",
      en: "I collected a corpus of real phishing samples targeting MX businesses and tested heuristics (URL analysis, sender mismatch, urgency language) against LLM classification. Neither wins alone: heuristics are fast but brittle, LLMs are flexible but need guardrails. The design question became trust — a verdict nobody understands is a verdict nobody acts on.",
    },
    solution: [
      {
        es: "Pega o reenvía un correo sospechoso — el pipeline lo califica en segundos",
        en: "Paste or forward a suspicious email — the pipeline scores it in seconds",
      },
      {
        es: "Análisis híbrido: señales deterministas (links, headers, remitente) + clasificación de intención con LLM",
        en: "Hybrid analysis: deterministic signals (links, headers, sender) + LLM intent classification",
      },
      {
        es: "Veredictos explicables: cada bandera muestra la evidencia exacta que la disparó, en lenguaje claro",
        en: "Explainable verdicts: every flag shows the exact evidence that triggered it, in plain language",
      },
      {
        es: "Vista de campañas que agrupa intentos relacionados para detectar estafas repetidas como un solo ataque",
        en: "Campaign view that clusters related attempts so repeated scams are spotted as one attack",
      },
      {
        es: "Ciclo de retroalimentación — los veredictos corregidos se vuelven casos de evaluación para la siguiente iteración del modelo",
        en: "Feedback loop — corrected verdicts become evaluation cases for the next model iteration",
      },
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    screens: [
      {
        caption: {
          es: "Veredicto con desglose de evidencia",
          en: "Verdict with evidence breakdown",
        },
      },
      { caption: { es: "Agrupación de campañas", en: "Campaign clustering" } },
      { caption: { es: "Pipeline de análisis", en: "Analysis pipeline" } },
    ],
    results: [
      {
        metric: { es: "<5s", en: "<5s" },
        label: { es: "De pegar al veredicto", en: "From paste to verdict" },
      },
      {
        metric: { es: "MX", en: "MX" },
        label: {
          es: "Consciente de estafas locales",
          en: "Localized scam awareness",
        },
      },
      {
        metric: { es: "100%", en: "100%" },
        label: {
          es: "Veredictos con evidencia visible",
          en: "Verdicts with visible evidence",
        },
      },
    ],
    learnings: [
      {
        es: "La explicabilidad es el producto — puntuaciones de confianza sin evidencia son puras vibras.",
        en: "Explainability is the product — confidence scores without evidence are just vibes.",
      },
      {
        es: "Evals antes que features: no puedes mejorar un clasificador que no puedes medir.",
        en: "Evals before features: you can't improve a classifier you can't measure.",
      },
      {
        es: "La UX de seguridad es persuasión: la acción segura siempre debe ser la acción fácil.",
        en: "Security UX is persuasion: the safe action must always be the easy action.",
      },
    ],
  },
  {
    slug: "kybernet",
    index: "06",
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
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
