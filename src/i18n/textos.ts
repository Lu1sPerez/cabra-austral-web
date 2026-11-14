import type { Idioma } from "./idiomas";

// Todos los textos fijos de la web, en castellano y en inglés.
// Para cambiar una frase, cambiala en los dos idiomas (mismo nombre, en "es" y en "en").
// El menú, las promos, los pies de foto y las piezas del archivo tienen sus propios archivos
// (src/i18n/menu-en.ts y src/data/…).

type Tramo = { texto: string; destacado?: boolean };

const es = {
  saltar: "Saltar al contenido",

  meta: {
    titulo: "Cabra Austral · Café, panadería y pastelería artesanal en Perito Moreno",
    descripcion:
      "Cafetería en Perito Moreno, Santa Cruz. Medialunas, chipá, scones, tortas y alfajores hechos en el local, café, té en hebras y mates. 9 de Julio 1453.",
    locale: "es_AR",
    datosGoogle:
      "Cafetería, panadería y pastelería artesanal en Perito Moreno, Santa Cruz. Medialunas, chipá, scones, tortas, alfajores, café y mates.",
    cocina: ["Café", "Panadería", "Pastelería"],
  },

  header: {
    navegacion: "Principal",
    inicio: "Cabra Austral, ir al inicio",
    menu: "Menú",
    archivo: "Mates y tazas",
    visitanos: "Visítanos",
    otroIdioma: { codigo: "EN", nombre: "View this page in English", lang: "en" },
  },

  hero: {
    rubro: "café · panadería · pastelería",
    desde: (anio: number) => `desde ${anio}`,
    hechoAca: (anio: number) => `todo hecho acá · desde ${anio}`,
    lineas: [
      { texto: "Hecho", claro: false },
      { texto: "a mano", claro: false },
      { texto: "en Perito", claro: true },
      { texto: "Moreno", claro: true },
    ],
    bajada:
      "Horneamos todo en el local: medialunas, chipá, scones, tortas y alfajores. El café lo preparamos taza por taza.",
    verMenu: "Ver el menú",
    comoLlegar: "Cómo llegar",
    alt: "El salón de Cabra Austral, con la barra y el arco de ladrillo",
    pie: "el salón y la barra",
  },

  manifiesto: {
    etiqueta: "manifiesto",
    lugar: "perito moreno, santa cruz",
    texto: [
      { texto: "En Cabra Austral " },
      { texto: "todo sale de acá", destacado: true },
      { texto: ": la masa de las medialunas, el chipá, los scones, las tortas y los alfajores. El café lo preparamos " },
      { texto: "taza por taza", destacado: true },
      { texto: ", el mate se ceba " },
      { texto: "sin apuro", destacado: true },
      { texto: ", y afuera puede soplar el viento que " },
      { texto: "adentro la mesa está servida", destacado: true },
      { texto: "." },
    ] as Tramo[],
  },

  // Palabras grandes que cruzan la pantalla al hacer scroll, entre los dibujos de la carta
  marquesina: ["Medialunas", "Chipá", "Scones", "Tortas", "Alfajores", "Café", "Mate"],

  galeria: {
    etiqueta: "lo que sale de la cocina",
    titulo: ["Recién", "hecho"],
    anterior: "Fotos anteriores",
    siguiente: "Fotos siguientes",
    lista: "Fotos de lo que hacemos; deslizá para ver más",
  },

  menu: {
    etiqueta: "lo que hay en la barra · se actualiza solo",
    titulo: ["El", "menú"],
    precios: "Los precios los ves en el local o te los pasamos por",
    mensajePrecios: "¡Hola! ¿Me pasan los precios del menú?",
    fotos: "Fotos de lo que hacemos",
    categorias: "Categorías del menú",
    opciones: (n: number): string => (n === 1 ? "opción" : "opciones"),
  },

  promos: {
    etiqueta: "cambian cada semana",
    titulo: ["Promos", "de la", "semana"],
    alt: "Un tostado y un café con leche servidos al sol en Cabra Austral",
    pie: "tostado y café con leche, al sol",
  },

  archivo: {
    etiqueta: "mates, bombillas, tazas y accesorios",
    titulo: ["El", "archivo"],
    bajada: "Todo lo que usamos en la barra también te lo podés llevar.",
    tocar: "Tocá cada pieza para verla de otro lado.",
    filtrar: "Filtrar piezas",
    verOtra: (pieza: string) => `Ver otra foto de ${pieza}`,
    deFrente: (pieza: string) => `${pieza}, de frente`,
    enDetalle: (pieza: string) => `${pieza}, en detalle`,
    numero: "N.º",
    consultar: "Consultar",
    consultarPor: (pieza: string) => ` por ${pieza} por WhatsApp`,
    mensaje: (numero: string, pieza: string) => `¡Hola! Quería consultar por el N.º ${numero} · ${pieza}.`,
  },

  momentos: {
    etiqueta: "el local, la barra, la gente",
    titulo: "Momentos",
    anterior: "Momento anterior",
    siguiente: "Momento siguiente",
    lista: "Fotos de momentos en Cabra Austral; deslizá para ver más",
  },

  visitanos: {
    etiqueta: "visítanos · te esperamos",
    titulo: ["Pasá a", "vernos"],
    comoLlegar: "Cómo llegar",
    whatsapp: "Escribinos por WhatsApp",
    altFachada: "La fachada de Cabra Austral sobre la calle 9 de Julio",
    mapa: "Mapa: cómo llegar a Cabra Austral",
  },

  horarios: {
    semana: "Lunes a viernes",
    finde: "Sábados y domingos",
    abierto: (cierra: string) => `Abierto ahora · cierra a las ${cierra}`,
    abreHoy: (abre: string) => `Cerrado · abre a las ${abre}`,
    abreOtroDia: (dia: string, abre: string) => `Cerrado · abre el ${dia} a las ${abre}`,
    dias: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    hoy: "hoy",
  },

  footer: {
    donde: "dónde",
    cuando: "cuándo",
    redes: "redes",
    comoLlegar: "Cómo llegar",
    arriba: "Volver arriba",
    rubro: (localidad: string) => `café, panadería y pastelería artesanal en ${localidad}`,
  },

  whatsapp: "¡Hola Cabra Austral! Quería hacer una consulta.",
};

export type Textos = typeof es;

const en: Textos = {
  saltar: "Skip to content",

  meta: {
    titulo: "Cabra Austral · Café, bakery and pastries in Perito Moreno, Patagonia",
    descripcion:
      "Café in Perito Moreno, Santa Cruz, Argentina. Medialunas, chipá, scones, cakes and alfajores baked on site, coffee, loose-leaf tea and mate. 9 de Julio 1453.",
    locale: "en_US",
    datosGoogle:
      "Café, bakery and pastry shop in Perito Moreno, Santa Cruz, Argentina. Medialunas, chipá, scones, cakes, alfajores, coffee and mate, all made on site.",
    cocina: ["Coffee", "Bakery", "Pastries"],
  },

  header: {
    navegacion: "Main",
    inicio: "Cabra Austral, back to top",
    menu: "Menu",
    archivo: "Mates & mugs",
    visitanos: "Visit us",
    otroIdioma: { codigo: "ES", nombre: "Ver esta página en castellano", lang: "es" },
  },

  hero: {
    rubro: "café · bakery · pastries",
    desde: (anio: number) => `since ${anio}`,
    hechoAca: (anio: number) => `all made here · since ${anio}`,
    lineas: [
      { texto: "Made", claro: false },
      { texto: "by hand", claro: false },
      { texto: "in Perito", claro: true },
      { texto: "Moreno", claro: true },
    ],
    bajada:
      "We bake everything on site: medialunas, chipá, scones, cakes and alfajores. Every coffee is made cup by cup.",
    verMenu: "See the menu",
    comoLlegar: "Get directions",
    alt: "Inside Cabra Austral: the counter and the brick arch",
    pie: "the room and the counter",
  },

  manifiesto: {
    etiqueta: "manifesto",
    lugar: "perito moreno, santa cruz",
    texto: [
      { texto: "At Cabra Austral " },
      { texto: "everything is made here", destacado: true },
      { texto: ": the medialuna dough, the chipá, the scones, the cakes and the alfajores. Coffee is made " },
      { texto: "cup by cup", destacado: true },
      { texto: ", mate is served " },
      { texto: "with no rush", destacado: true },
      { texto: ", and the wind can blow all it wants outside: " },
      { texto: "in here, the table is set", destacado: true },
      { texto: "." },
    ],
  },

  marquesina: ["Medialunas", "Chipá", "Scones", "Cakes", "Alfajores", "Coffee", "Mate"],

  galeria: {
    etiqueta: "straight from our kitchen",
    titulo: ["Freshly", "made"],
    anterior: "Previous photos",
    siguiente: "Next photos",
    lista: "Photos of what we make; swipe to see more",
  },

  menu: {
    etiqueta: "what's on the counter · updated live",
    titulo: ["The", "menu"],
    precios: "Prices are on display at the café, or ask us on",
    mensajePrecios: "Hi! Could you send me the menu prices?",
    fotos: "Photos of what we make",
    categorias: "Menu categories",
    opciones: (n: number) => (n === 1 ? "option" : "options"),
  },

  promos: {
    etiqueta: "new every week",
    titulo: ["Deals", "of the", "week"],
    alt: "A toastie and a café con leche served in the sun at Cabra Austral",
    pie: "toastie and café con leche, in the sun",
  },

  archivo: {
    etiqueta: "mates, bombillas, mugs and accessories",
    titulo: ["The", "archive"],
    bajada: "Everything we use behind the counter is also for sale.",
    tocar: "Tap each piece to see it from another angle.",
    filtrar: "Filter pieces",
    verOtra: (pieza: string) => `See another photo of ${pieza}`,
    deFrente: (pieza: string) => `${pieza}, front view`,
    enDetalle: (pieza: string) => `${pieza}, close-up`,
    numero: "No.",
    consultar: "Ask about it",
    consultarPor: (pieza: string) => `: ${pieza}, on WhatsApp`,
    mensaje: (numero: string, pieza: string) => `Hi! I'd like to ask about No. ${numero} · ${pieza}.`,
  },

  momentos: {
    etiqueta: "the café, the counter, the people",
    titulo: "Moments",
    anterior: "Previous moment",
    siguiente: "Next moment",
    lista: "Photos of moments at Cabra Austral; swipe to see more",
  },

  visitanos: {
    etiqueta: "visit us · come on in",
    titulo: ["Come", "say hi"],
    comoLlegar: "Get directions",
    whatsapp: "Message us on WhatsApp",
    altFachada: "The front of Cabra Austral on 9 de Julio street",
    mapa: "Map: how to get to Cabra Austral",
  },

  horarios: {
    semana: "Monday to Friday",
    finde: "Saturday and Sunday",
    abierto: (cierra: string) => `Open now · closes at ${cierra}`,
    abreHoy: (abre: string) => `Closed · opens at ${abre}`,
    abreOtroDia: (dia: string, abre: string) => `Closed · opens ${dia} at ${abre}`,
    dias: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hoy: "today",
  },

  footer: {
    donde: "where",
    cuando: "when",
    redes: "social",
    comoLlegar: "Get directions",
    arriba: "Back to top",
    rubro: (localidad: string) => `café, bakery and pastries made by hand in ${localidad}`,
  },

  whatsapp: "Hi Cabra Austral! I have a question.",
};

export const TEXTOS: Record<Idioma, Textos> = { es, en };
