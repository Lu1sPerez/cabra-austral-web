import type { Metadata } from "next";
import { armarMenu, consultarMenu } from "@/lib/menu";

// Página de control: abrí /estado-menu para ver si la web está leyendo el menú del POS.
// No aparece en Google ni en el menú de la web. No muestra claves, precios ni costos.

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Estado del menú · Cabra Austral", robots: { index: false, follow: false } };

type Resultado = { ok: boolean; titulo: string; queHacer: string[] };

function diagnosticar(c: Awaited<ReturnType<typeof consultarMenu>>, productos: number): Resultado {
  if (c.tipo === "sin-variables") {
    return {
      ok: false,
      titulo: `Faltan variables en Vercel: ${c.faltan.join(" y ")}`,
      queHacer: [
        "Vercel → proyecto cabra-austral-web → Settings → Environment Variables.",
        "Cargá NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY con los mismos valores que el proyecto del POS (Cabra-pag), tildando Production, Preview y Development.",
        "Importante: las variables recién se aplican en un deploy nuevo. Andá a Deployments → ⋯ en el último → Redeploy.",
      ],
    };
  }
  if (c.tipo === "sin-conexion") {
    return {
      ok: false,
      titulo: "No se pudo conectar con Supabase",
      queHacer: [
        `Detalle técnico: ${c.detalle}`,
        "Revisá que NEXT_PUBLIC_SUPABASE_URL sea exactamente la del POS (https://xxxx.supabase.co, sin nada al final).",
        "Fijate en supabase.com que el proyecto no esté pausado.",
        "Después de corregir la variable: Deployments → Redeploy.",
      ],
    };
  }
  if (c.tipo === "error") {
    const texto = `${c.codigo ?? ""} ${c.mensaje}`.toLowerCase();
    if (c.status === 404 || c.codigo === "PGRST202" || texto.includes("could not find the function")) {
      return {
        ok: false,
        titulo: "La función get_public_menu no existe en este Supabase",
        queHacer: [
          "Supabase (el mismo proyecto que usa el POS) → SQL Editor → New query.",
          "Pegá todo el archivo supabase/get_public_menu.sql y tocá Run. Tiene que decir “Success”.",
          "Si ya lo habías corrido, revisá que la URL cargada en Vercel sea la de ESE proyecto y no la de otro.",
        ],
      };
    }
    if (c.codigo === "42501" || texto.includes("permission denied")) {
      return {
        ok: false,
        titulo: "La función existe, pero los visitantes no tienen permiso para usarla",
        queHacer: ["Corré de nuevo supabase/get_public_menu.sql completo en el SQL Editor (incluye el permiso para anon)."],
      };
    }
    if (c.status === 401 || texto.includes("invalid api key") || texto.includes("jwt")) {
      return {
        ok: false,
        titulo: "La clave NEXT_PUBLIC_SUPABASE_ANON_KEY no es válida para este Supabase",
        queHacer: [
          "Copiá la clave exacta del proyecto del POS (Vercel → Cabra-pag → Settings → Environment Variables) o de Supabase → Project Settings → API → anon public.",
          "Pegala en Vercel → cabra-austral-web, sin espacios ni comillas, y hacé Redeploy.",
        ],
      };
    }
    return {
      ok: false,
      titulo: `Supabase devolvió un error (${c.status})`,
      queHacer: [
        `Mensaje: ${c.mensaje}`,
        "Corré de nuevo supabase/get_public_menu.sql. Si el SQL Editor marca un error, copiámelo tal cual.",
      ],
    };
  }
  if (productos === 0) {
    return {
      ok: false,
      titulo: "Supabase responde bien, pero no llega ningún producto",
      queHacer: [
        "Corré la versión nueva de supabase/get_public_menu.sql (incluye productos sin categoría o sin el campo “activo” cargado).",
        "En el POS, revisá que los productos estén activos.",
      ],
    };
  }
  return {
    ok: true,
    titulo: "Todo bien: la web está leyendo el menú del POS",
    queHacer: [
      "La página principal lee el menú del POS en cada visita: lo que activás o desactivás en el POS aparece al recargar.",
      "Si un producto de la carta no aparece en la lista de abajo, es porque no está cargado o no está activo en el POS.",
    ],
  };
}

export default async function EstadoMenu() {
  const consulta = await consultarMenu();
  const menu = consulta.tipo === "ok" ? armarMenu(consulta.filas) : null;
  const productos = menu ? menu.categorias.reduce((n, c) => n + c.productos.length, 0) + menu.promos.length : 0;
  const r = diagnosticar(consulta, productos);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  let proyecto = "—";
  try {
    if (url) proyecto = new URL(url).host;
  } catch {
    proyecto = "dirección mal escrita";
  }
  const ahora = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Rio_Gallegos",
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date());

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 text-noche">
      <p className="etiqueta text-piedra">cabra austral · control del menú · {ahora}</p>

      <div className={`mt-4 rounded-lg border-2 p-5 ${r.ok ? "border-[#3f8f5a] bg-[#eaf3ec]" : "border-[#b4483c] bg-[#f7e9e6]"}`}>
        <h1 className="font-display text-3xl leading-tight">
          {r.ok ? "✓ " : "✕ "}
          {r.titulo}
        </h1>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed">
          {r.queHacer.map((paso) => (
            <li key={paso}>{paso}</li>
          ))}
        </ol>
      </div>

      <h2 className="etiqueta mt-10 text-piedra">conexión</h2>
      <dl className="mt-2 divide-y divide-borde border-y border-borde text-[15px]">
        <div className="flex justify-between gap-4 py-2">
          <dt>NEXT_PUBLIC_SUPABASE_URL</dt>
          <dd className="text-right font-semibold">{url ? proyecto : "falta"}</dd>
        </div>
        <div className="flex justify-between gap-4 py-2">
          <dt>NEXT_PUBLIC_SUPABASE_ANON_KEY</dt>
          <dd className="font-semibold">{process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ? "cargada" : "falta"}</dd>
        </div>
        <div className="flex justify-between gap-4 py-2">
          <dt>Respuesta de Supabase</dt>
          <dd className="text-right font-semibold">
            {consulta.tipo === "ok"
              ? `OK · ${consulta.filas.length} productos activos`
              : consulta.tipo === "error"
                ? `${consulta.status}${consulta.codigo ? ` · ${consulta.codigo}` : ""}`
                : consulta.tipo === "sin-conexion"
                  ? "sin conexión"
                  : "sin consultar"}
          </dd>
        </div>
      </dl>

      {menu && (
        <>
          <h2 className="etiqueta mt-10 text-piedra">lo que va a mostrar la web</h2>
          <ul className="mt-2 divide-y divide-borde border-y border-borde text-[15px]">
            {menu.categorias.map((c) => (
              <li key={c.nombre} className="py-2">
                <span className="font-semibold">{c.nombre}</span>{" "}
                <span className="text-piedra">
                  ({c.productos.length}): {c.productos.join(", ")}
                </span>
              </li>
            ))}
            <li className="py-2">
              <span className="font-semibold">Promos de la semana</span>{" "}
              <span className="text-piedra">
                ({menu.promos.length}): {menu.promos.length ? menu.promos.join(", ") : "ninguna (la sección no aparece)"}
              </span>
            </li>
            {menu.fueraDelMenu.length > 0 && (
              <li className="py-2">
                <span className="font-semibold">Fuera del menú por ser de venta</span>{" "}
                <span className="text-piedra">{menu.fueraDelMenu.join(", ")}</span>
              </li>
            )}
          </ul>
        </>
      )}

      <p className="mt-10 text-sm text-piedra">
        Esta página no aparece en Google ni en el menú de la web, y no muestra claves, precios ni costos.
      </p>
    </main>
  );
}
