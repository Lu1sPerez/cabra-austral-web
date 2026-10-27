import { CATEGORIAS_RESPALDO, PROMOS_RESPALDO } from "@/data/menu-respaldo";

export type Categoria = { nombre: string; productos: string[] };
export type Menu = { categorias: Categoria[]; promos: string[]; enVivo: boolean };

type Fila = { category: string; category_order: number | null; name: string };

// La categoría cuyo nombre empiece con "promo" (Promo, Promos, Promociones…)
// se muestra aparte, en la sección de promos de la semana.
const esPromo = (categoria: string) => /^promo/i.test(categoria.trim());

// Categorías del POS que son de venta (no se consumen en el local) y por eso NO van en el menú.
// Se compara el comienzo del nombre, sin tildes ni mayúsculas: "Mates", "Bombillas de alpaca", "Tazas"…
// Si alguna categoría no desaparece, agregá acá el comienzo de su nombre.
const FUERA_DEL_MENU = ["mate", "bombilla", "taza", "jarro", "yerbero", "canasta", "accesorio"];

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const esDeVenta = (categoria: string) => {
  const nombre = normalizar(categoria);
  // "mate" solo cuenta como palabra entera ("Mates", "Mate imperial"), no "Tomate"
  return FUERA_DEL_MENU.some((palabra) => new RegExp(`^${palabra}(es|s)?\\b`).test(nombre));
};

/**
 * Lee el menú en vivo desde Supabase usando la función pública get_public_menu().
 * Nunca toca la tabla products directamente: no expone precios ni costos.
 * El resultado se guarda 5 minutos (ver `revalidate` en page.tsx).
 */
export async function obtenerMenu(): Promise<Menu> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const clave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const respaldo: Menu = { categorias: CATEGORIAS_RESPALDO, promos: PROMOS_RESPALDO, enVivo: false };

  if (!url || !clave) return respaldo;

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/get_public_menu`, {
      headers: { apikey: clave, Authorization: `Bearer ${clave}` },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`Supabase respondió ${res.status}`);
    const filas: Fila[] = await res.json();
    if (!Array.isArray(filas) || filas.length === 0) return respaldo;

    const categorias: Categoria[] = [];
    const promos: string[] = [];
    for (const fila of filas) {
      if (esDeVenta(fila.category)) continue;
      if (esPromo(fila.category)) {
        promos.push(fila.name);
        continue;
      }
      let cat = categorias.find((c) => c.nombre === fila.category);
      if (!cat) {
        cat = { nombre: fila.category, productos: [] };
        categorias.push(cat);
      }
      cat.productos.push(fila.name);
    }
    return { categorias, promos, enVivo: true };
  } catch (error) {
    console.error("No se pudo leer el menú de Supabase:", error);
    return respaldo;
  }
}
