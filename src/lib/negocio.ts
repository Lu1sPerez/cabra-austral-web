// Datos del negocio. Si algo cambia (teléfono, Instagram, dirección), se edita solo acá.

export const NEGOCIO = {
  nombre: "Cabra Austral",
  desde: 2026,
  direccion: "9 de Julio 1453",
  localidad: "Perito Moreno",
  provincia: "Santa Cruz",
  pais: "AR",
  instagram: "cabraaustral",
  whatsapp: "5492975358511", // formato internacional, sin "+" ni espacios
  whatsappVisible: "+54 9 2975 35-8511",
  zonaHoraria: "America/Argentina/Rio_Gallegos",
};

export const DIRECCION_COMPLETA = `${NEGOCIO.direccion}, ${NEGOCIO.localidad}, ${NEGOCIO.provincia}`;

export const URL_SITIO = (process.env.NEXT_PUBLIC_SITE_URL || "https://cabra-austral-web.vercel.app").replace(/\/$/, "");

export const LINKS = {
  instagram: `https://www.instagram.com/${NEGOCIO.instagram}/`,
  whatsapp: (mensaje = "¡Hola Cabra Austral! Quería hacer una consulta.") =>
    `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`,
  comoLlegar: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${DIRECCION_COMPLETA}, Argentina`,
  )}`,
  mapaEmbebido: `https://www.google.com/maps?q=${encodeURIComponent(
    `${DIRECCION_COMPLETA}, Argentina`,
  )}&z=16&output=embed`,
};
