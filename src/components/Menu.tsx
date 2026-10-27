"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { Categoria } from "@/lib/menu";
import Foto from "./Foto";
import { LINKS } from "@/lib/negocio";
import { MOSTRAR_MARCADORES } from "@/lib/fotos";

type FotoMenu = { foto: string | null; pie: string; indicacion: string };
type Props = { categorias: Categoria[]; fotos: FotoMenu[] };

const idDe = (nombre: string) =>
  nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");

export default function Menu({ categorias, fotos: todas }: Props) {
  // En la web publicada solo pasan por la cinta las fotos que ya están subidas
  const fotos = MOSTRAR_MARCADORES ? todas : todas.filter((f) => f.foto);
  const [activa, setActiva] = useState(0);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);

  const conTeclado = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let destino = -1;
    if (e.key === "ArrowRight") destino = (i + 1) % categorias.length;
    if (e.key === "ArrowLeft") destino = (i - 1 + categorias.length) % categorias.length;
    if (e.key === "Home") destino = 0;
    if (e.key === "End") destino = categorias.length - 1;
    if (destino >= 0) {
      e.preventDefault();
      setActiva(destino);
      pestanas.current[destino]?.focus();
    }
  };

  return (
    <section id="menu" aria-labelledby="titulo-menu" className="scroll-mt-14 bg-marfil pb-20 md:scroll-mt-16 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 md:pt-24">
        <div className="reveal grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="etiqueta mb-4 text-piedra">lo que hay en la barra · se actualiza solo</p>
            <h2 id="titulo-menu" className="titulo-seccion text-pizarra">
              El
              <br />
              menú
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-piedra">
            Los precios los ves en el local o te los pasamos por{" "}
            <a href={LINKS.whatsapp("¡Hola! ¿Me pasan los precios del menú?")} className="enlace-subrayado font-semibold text-pizarra" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            .
          </p>
        </div>
      </div>

      {/* Cinta de fotos: pasa sola; se frena al tocarla o pasar el mouse. Con "reducir movimiento" queda quieta y se desliza con el dedo. */}
      {fotos.length > 0 && (
        <div className="cinta mt-12 md:mt-16" aria-label="Fotos de lo que hacemos" role="region">
          <div className="cinta-pista" style={{ ["--n" as string]: fotos.length }}>
            {[0, 1].map((copia) => (
              <ul key={copia} className="cinta-grupo" aria-hidden={copia === 1 ? true : undefined}>
                {fotos.map((f) => (
                  <li key={f.pie} className="cinta-item">
                    <figure>
                      <Foto
                        src={f.foto}
                        alt={copia === 0 ? f.pie : ""}
                        indicacion={f.indicacion}
                        proporcion="4 / 5"
                        sizes="(min-width: 768px) 260px, 52vw"
                      />
                      <figcaption className="pie-foto mt-2 text-piedra">{f.pie}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Pestañas por categoría: se deslizan con el dedo en el celular */}
        <div
          role="tablist"
          aria-label="Categorías del menú"
          className="sin-barra -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6"
        >
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
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                activa === i
                  ? "border-pizarra bg-pizarra text-marfil"
                  : "border-borde bg-transparent text-noche hover:border-pizarra"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {categorias.map((cat, i) => (
          <div
            key={cat.nombre}
            role="tabpanel"
            id={`panel-${idDe(cat.nombre)}`}
            aria-labelledby={`pestana-${idDe(cat.nombre)}`}
            hidden={activa !== i}
            tabIndex={0}
            className="mt-8"
          >
            <div className="flex items-baseline justify-between border-b-2 border-noche pb-3">
              <h3 className="font-display text-3xl uppercase md:text-4xl">{cat.nombre}</h3>
              <span className="etiqueta text-piedra">
                {String(cat.productos.length).padStart(2, "0")} {cat.productos.length === 1 ? "opción" : "opciones"}
              </span>
            </div>
            <ul className="grid md:grid-cols-2 md:gap-x-12">
              {cat.productos.map((p, j) => (
                <li key={p} className="flex items-baseline gap-4 border-b border-borde py-4 text-lg md:text-xl">
                  <span className="w-7 shrink-0 text-xs font-semibold tabular-nums text-piedra" aria-hidden="true">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
