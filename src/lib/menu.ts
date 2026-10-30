import { CATEGORIAS_RESPALDO, PROMOS_RESPALDO } from "@/data/menu-respaldo";

export type Categoria = { nombre: string; productos: string[] };
export type Menu = { categorias: Categoria[]; promos: string[]; enVivo: boolean };

type Fila = { category: string | null; category_order: number | null; name: string | null };

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
    .replace(/[̀-ͯ]/g, "")
    .trim();

export const esDeVenta = (categoria: string) => {
  const nombre = normalizar(categoria);
  // "mate" solo cuenta como palabra entera ("Mates", "Mate imperial"), no "Tomate"
  return FUERA_DEL_MENU.some((palabra) => new RegExp(`^${palabra}(es|s)?\\b`).test(nombre));
};

export type Consulta =
  | { tipo: "sin-variables"; faltan: string[] }
  | { tipo: "sin-conexion"; detalle: string }
  | { tipo: "error"; status: number; codigo?: string; mensaje: string }
  | { tipo: "ok"; filas: Fila[] };

/**
 * Llama a la función pública get_public_menu() de Supabase y devuelve qué pasó, con detalle.
 * Nunca toca la tabla products directamente: no expone precios ni costos.
 */
export async function consultarMenu(): Promise<Consulta> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const clave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const faltan = [
    !url && "NEXT_PUBLIC_SUPABASE_URL",
    !clave && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ].filter(Boolean) as string[];
  if (!url || !clave) return { tipo: "sin-variables", faltan };

  let res: Response;
  try {
    res = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/rpc/get_public_menu`, {
      method: "POST",
      headers: {
        apikey: clave,
        Authorization: `Bearer ${clave}`,
        "Content-Type": "application/json",
      },
      body: "{}",
      cache: "no-store", // siempre lo último del POS
      signal: AbortSignal.timeout(8000),
    });
  } catch (error) {
    return { tipo: "sin-conexion", detalle: error instanceof Error ? error.message : String(error) };
  }

  if (!res.ok) {
    let codigo: string | undefined;
    let mensaje = `Supabase respondió ${res.status}`;
    try {
      const cuerpo = await res.json();
      codigo = cuerpo?.code;
      mensaje = [cuerpo?.message, cuerpo?.hint, cuerpo?.details].filter(Boolean).join(" · ") || mensaje;
    } catch {
      /* respuesta sin JSON */
    }
    return { tipo: "error", status: res.status, codigo, mensaje };
  }

  const filas = await res.json().catch(() => null);
  return { tipo: "ok", filas: Array.isArray(filas) ? filas : [] };
}

/** Arma el menú a partir de las filas: separa promos y saca lo que es de venta. */
export function armarMenu(filas: Fila[]) {
  const categorias: Categoria[] = [];
  const promos: string[] = [];
  const fueraDelMenu = new Set<string>();
  for (const fila of filas) {
    const categoria = (fila.category ?? "Otros").trim() || "Otros";
    const nombre = (fila.name ?? "").trim();
    if (!nombre) continue;
    if (esDeVenta(categoria)) {
      fueraDelMenu.add(categoria);
      continue;
    }
    if (esPromo(categoria)) {
      promos.push(nombre);
      continue;
    }
    let cat = categorias.find((c) => c.nombre === categoria);
    if (!cat) {
      cat = { nombre: categoria, productos: [] };
      categorias.push(cat);
    }
    cat.productos.push(nombre);
  }
  return { categorias, promos, fueraDelMenu: [...fueraDelMenu] };
}

/**
 * El menú para la web. Si Supabase no responde, muestra el menú de respaldo
 * (ver /estado-menu para saber por qué).
 */
export async function obtenerMenu(): Promise<Menu> {
  const respaldo: Menu = { categorias: CATEGORIAS_RESPALDO, promos: PROMOS_RESPALDO, enVivo: false };
  const consulta = await consultarMenu();

  if (consulta.tipo !== "ok") {
    console.error("Menú: no se pudo leer Supabase →", JSON.stringify(consulta));
    return respaldo;
  }
  const { categorias, promos } = armarMenu(consulta.filas);
  if (categorias.length === 0 && promos.length === 0) {
    console.error("Menú: Supabase respondió, pero sin productos activos.");
    return respaldo;
  }
  return { categorias, promos, enVivo: true };
}
