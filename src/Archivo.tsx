"use client";

import { useState } from "react";
import Foto from "./Foto";
import { PIEZAS, TIPOS, type TipoPieza } from "@/data/archivo";
import { LINKS } from "@/lib/negocio";

type Props = { fotos: Record<string, { a: string | null; b: string | null }> };

// "El archivo": cada pieza cambia a su segunda foto al pasar el mouse (computadora)
// o al tocarla (celular).

export default function Archivo({ fotos }: Props) {
  const [filtro, setFiltro] = useState<TipoPieza | "todo">("todo");
  const [volteadas, setVolteadas] = useState<Record<string, boolean>>({});

  const tiposConPiezas = TIPOS.filter((t) => t.id === "todo" || PIEZAS.some((p) => p.tipo === t.id));
  const visibles = filtro === "todo" ? PIEZAS : PIEZAS.filter((p) => p.tipo === filtro);

  return (
    <section id="archivo" aria-labelledby="titulo-archivo" className="scroll-mt-14 bg-marfil py-20 md:scroll-mt-16 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="etiqueta mb-4 text-piedra">mates, bombillas, tazas y accesorios</p>
            <h2 id="titulo-archivo" className="titulo-seccion text-pizarra">
              El
              <br />
              archivo
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-piedra">
            Todo lo que usamos en la barra también te lo podés llevar. Tocá cada pieza para verla de otro lado.
          </p>
        </div>

        <div className="sin-barra -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6" role="group" aria-label="Filtrar piezas">
          {tiposConPiezas.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={filtro === t.id}
              onClick={() => setFiltro(t.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filtro === t.id
                  ? "border-noche bg-noche text-marfil"
                  : "border-borde text-noche hover:border-noche"
              }`}
            >
              {t.nombre}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {visibles.map((pieza) => {
            const numero = String(PIEZAS.indexOf(pieza) + 1).padStart(2, "0");
            const f = fotos[pieza.id] ?? { a: null, b: null };
            const volteada = !!volteadas[pieza.id];
            return (
              <li key={pieza.id}>
                <figure>
                  <button
                    type="button"
                    className="pieza group relative block w-full text-left"
                    aria-pressed={volteada}
                    aria-label={`Ver otra foto de ${pieza.nombre}`}
                    data-volteada={volteada}
                    onClick={() => setVolteadas((v) => ({ ...v, [pieza.id]: !v[pieza.id] }))}
                  >
                    <Foto
                      src={f.a}
                      alt={`${pieza.nombre}, de frente`}
                      indicacion={`${pieza.nombre}: de frente, fondo liso claro`}
                      proporcion="4 / 5"
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                    <div className="pieza-segunda absolute inset-0">
                      <Foto
                        src={f.b}
                        alt={`${pieza.nombre}, en detalle`}
                        indicacion={`${pieza.nombre}: detalle o en uso (con yerba, en la mano)`}
                        proporcion="4 / 5"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        oscuro
                      />
                    </div>
                    <span className="absolute right-2 top-2 rounded-full bg-marfil/90 px-2 py-0.5 text-[11px] font-semibold text-noche">
                      N.º {numero}
                    </span>
                  </button>
                  <figcaption className="mt-3">
                    <span className="block font-display text-xl uppercase leading-none md:text-2xl">{pieza.nombre}</span>
                    {pieza.detalle && <span className="mt-1 block text-sm text-piedra">{pieza.detalle}</span>}
                    <a
                      href={LINKS.whatsapp(`¡Hola! Quería consultar por el N.º ${numero} · ${pieza.nombre}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="enlace-subrayado mt-2 inline-block text-sm font-semibold text-pizarra"
                    >
                      Consultar<span className="sr-only"> por {pieza.nombre} por WhatsApp</span>
                    </a>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
