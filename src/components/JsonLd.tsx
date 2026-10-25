import { HORARIOS_SCHEMA } from "@/lib/horarios";
import { DIRECCION_COMPLETA, LINKS, NEGOCIO, URL_SITIO } from "@/lib/negocio";

// Datos estructurados para que Google entienda que es una cafetería, dónde está y cuándo abre.
export default function JsonLd() {
  const datos = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${URL_SITIO}/#cafeteria`,
    name: NEGOCIO.nombre,
    description:
      "Cafetería, panadería y pastelería artesanal en Perito Moreno, Santa Cruz. Medialunas, chipá, scones, tortas, alfajores, café y mates.",
    url: URL_SITIO,
    image: `${URL_SITIO}/marca/cabra-austral.svg`,
    logo: `${URL_SITIO}/marca/cabra.svg`,
    telephone: `+${NEGOCIO.whatsapp}`,
    servesCuisine: ["Café", "Panadería", "Pastelería"],
    address: {
      "@type": "PostalAddress",
      streetAddress: NEGOCIO.direccion,
      addressLocality: NEGOCIO.localidad,
      addressRegion: NEGOCIO.provincia,
      addressCountry: NEGOCIO.pais,
    },
    hasMap: LINKS.comoLlegar,
    openingHoursSpecification: HORARIOS_SCHEMA.map((h) => ({ "@type": "OpeningHoursSpecification", ...h })),
    sameAs: [LINKS.instagram],
    areaServed: DIRECCION_COMPLETA,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, "\\u003c") }}
    />
  );
}
