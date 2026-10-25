// Busca si una foto ya fue subida a public/fotos (la lista se arma al compilar, en next.config.mjs).
// Ej.: foto("portada-vertical") → "/fotos/portada-vertical.jpg" si existe, o null si todavía no está.

let disponibles: string[] = [];
try {
  disponibles = JSON.parse(process.env.FOTOS_DISPONIBLES || "[]");
} catch {
  disponibles = [];
}

export function foto(nombre: string): string | null {
  const base = `/fotos/${nombre}`.toLowerCase();
  return (
    disponibles.find((ruta) => {
      const sinExtension = ruta.toLowerCase().replace(/\.(jpe?g|png|webp|avif)$/, "");
      return sinExtension === base;
    }) ?? null
  );
}
