import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

// Al compilar, anota qué fotos hay en public/fotos.
// Así, cuando subas una foto con el nombre indicado en FOTOS.md,
// aparece sola en la web: no hace falta tocar el código.
function listarFotos(dir) {
  const base = join(process.cwd(), "public");
  const salida = [];
  const recorrer = (carpeta) => {
    let entradas = [];
    try {
      entradas = readdirSync(carpeta);
    } catch {
      return;
    }
    for (const nombre of entradas) {
      const ruta = join(carpeta, nombre);
      if (statSync(ruta).isDirectory()) recorrer(ruta);
      else if (/\.(jpe?g|png|webp|avif)$/i.test(nombre)) {
        salida.push("/" + relative(base, ruta).split("\\").join("/"));
      }
    }
  };
  recorrer(dir);
  return salida;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FOTOS_DISPONIBLES: JSON.stringify(listarFotos(join(process.cwd(), "public", "fotos"))),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
