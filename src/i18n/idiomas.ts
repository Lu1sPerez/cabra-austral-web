// Idiomas de la web. La versión en castellano está en "/" y la versión en inglés en "/en".
// Lo usa también src/middleware.ts, así que acá no puede haber nada del servidor ni del navegador.

export type Idioma = "es" | "en";

export const IDIOMAS: Idioma[] = ["es", "en"];

/** Dirección de la página de inicio en cada idioma */
export const RUTA: Record<Idioma, string> = { es: "/", en: "/en" };

/** Atributo lang del <html> */
export const LANG_HTML: Record<Idioma, string> = { es: "es-AR", en: "en" };

/** Cookie donde se guarda el idioma que la persona eligió con el botón ES / EN */
export const COOKIE_IDIOMA = "idioma";

export const esIdioma = (valor: unknown): valor is Idioma => valor === "es" || valor === "en";

/**
 * Elige el idioma a partir de la lista que manda el celular o la computadora (encabezado Accept-Language),
 * por ejemplo "en-US,en;q=0.9,es;q=0.8".
 * Toma el primero de la lista que sea castellano o inglés. Si no hay ninguno de los dos (francés, alemán…), inglés.
 * Si el navegador no manda nada (Google, la vista previa de WhatsApp), castellano.
 */
export function idiomaPreferido(acceptLanguage: string | null | undefined): Idioma {
  if (!acceptLanguage || !acceptLanguage.trim()) return "es";
  const pedidos = acceptLanguage
    .split(",")
    .map((parte, orden) => {
      const [etiqueta, ...params] = parte.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const peso = q ? Number(q.slice(2)) : 1;
      return { idioma: etiqueta.trim().toLowerCase().split("-")[0], peso: Number.isFinite(peso) ? peso : 0, orden };
    })
    .filter((p) => p.idioma && p.idioma !== "*" && p.peso > 0)
    .sort((a, b) => b.peso - a.peso || a.orden - b.orden);

  for (const p of pedidos) {
    if (p.idioma === "es") return "es";
    if (p.idioma === "en") return "en";
  }
  return pedidos.length > 0 ? "en" : "es";
}
