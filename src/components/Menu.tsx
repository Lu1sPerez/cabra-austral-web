"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { Categoria } from "@/lib/menu";
import Titulo from "./Titulo";
import { LINKS } from "@/lib/negocio";
import type { Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

type Props = { idioma: Idioma; categorias: Categoria[] };

const idDe = (nombre: string) =>
  nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-");

// El menú en vivo. En el celular las categorías son botones que se deslizan con el dedo;
// en pantallas grandes son una lista de palabras grandes a la izquierda, que queda fija mientras se lee la lista.
// Las fotos del menú están en la galería "Recién hecho" (Galeria.tsx).

export default function Menu({ idioma, categorias }: Props) {
  const t = TEXTOS[idioma].menu;
  const [activa, setActiva] = useState(0);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);

  const conTeclado = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let destino = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") destino = (i + 1) % categorias.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") destino = (i - 1 + categorias.length) % categorias.length;
    if (e.key === "Home") destino = 0;
    if (e.key === "End") destino = categorias.length - 1;
    if (destino >= 0) {
      e.preventDefault();
      setActiva(destino);
      pestanas.current[destino]?.focus();
    }
  };

  return (
    <section id="menu" aria-labelledby="titulo-menu" className="lamina solape scroll-mt-4 bg-marfil pb-20 pt-20 md:pb-28 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 lg:gap-24">
        <div className="menu-fijo">
          <p className="etiqueta mb-4 text-piedra">{t.etiqueta}</p>
          <Titulo id="titulo-menu" lineas={t.titulo} className="text-pizarra" />

          <div role="tablist" aria-label={t.categorias} className="menu-pestanas sin-barra mt-10">
            {categorias.map((cat, i) => (
              <button
                key={cat.nombre}
                ref={(el) => {
                  pestanas.current[i] = el;
                }}
                role="tab"
                id={`pestana-${idDe(cat.nombre)}`}
                aria-selected={activa === i}
                aria-controls={`panel-${idDe(cat.nombre)}`}
                tabIndex={activa === i ? 0 : -1}
                onClick={() => setActiva(i)}
                onKeyDown={(e) => conTeclado(e, i)}
                className="menu-pestana"
              >
                {cat.nombre}
                <span className="cuenta tabular-nums" aria-hidden="true">
                  {String(cat.productos.length).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:pt-[3.2rem]">
          {categorias.map((cat, i) => (
            <div
              key={cat.nombre}
              role="tabpanel"
              id={`panel-${idDe(cat.nombre)}`}
              aria-labelledby={`pestana-${idDe(cat.nombre)}`}
              hidden={activa !== i}
              tabIndex={0}
            >
              {/* En pantallas grandes el nombre ya está en la lista de la izquierda: acá queda solo para lectores de pantalla */}
              <div className="flex items-baseline justify-between border-b-2 border-noche pb-3 md:pb-0">
                <h3 className="font-display text-3xl uppercase md:sr-only">{cat.nombre}</h3>
                <span className="etiqueta text-piedra md:sr-only">
                  {String(cat.productos.length).padStart(2, "0")} {t.opciones(cat.productos.length)}
                </span>
              </div>
              <ul className="menu-lista grid sm:grid-cols-2 sm:gap-x-10 md:grid-cols-1 lg:grid-cols-2">
                {cat.productos.map((p, j) => (
                  <li
                    key={p}
                    className="border-b border-borde py-4 text-lg leading-snug md:py-5 md:text-xl"
                    style={{ ["--i" as string]: j } as CSSProperties}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="mt-8 max-w-sm text-sm leading-relaxed text-piedra">
            {t.precios}{" "}
            <a
              href={LINKS.whatsapp(t.mensajePrecios)}
              className="enlace-subrayado font-semibold text-pizarra"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
