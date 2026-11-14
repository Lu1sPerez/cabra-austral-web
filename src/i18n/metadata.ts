import type { Metadata } from "next";
import { RUTA, type Idioma } from "./idiomas";
import { TEXTOS } from "./textos";

// Título y descripción para Google y para cuando se comparte el link, en cada idioma.
// "languages" le avisa a Google que las dos páginas son la misma en distinto idioma (hreflang).
export function metadataDe(idioma: Idioma): Metadata {
  const t = TEXTOS[idioma].meta;
  const otro: Idioma = idioma === "es" ? "en" : "es";
  return {
    title: t.titulo,
    description: t.descripcion,
    alternates: {
      canonical: RUTA[idioma],
      languages: { "es-AR": RUTA.es, en: RUTA.en, "x-default": RUTA.es },
    },
    openGraph: {
      type: "website",
      locale: t.locale,
      alternateLocale: TEXTOS[otro].meta.locale,
      url: RUTA[idioma],
      siteName: "Cabra Austral",
      title: t.titulo,
      description: t.descripcion,
    },
    twitter: { card: "summary_large_image", title: t.titulo, description: t.descripcion },
  };
}
