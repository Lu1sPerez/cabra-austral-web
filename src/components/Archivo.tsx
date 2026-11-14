"use client";

import { useState } from "react";
import Foto from "./Foto";
import Titulo from "./Titulo";
import { PIEZAS, TIPOS, type TipoPieza } from "@/data/archivo";
import { LINKS } from "@/lib/negocio";
import { MOSTRAR_MARCADORES } from "@/lib/fotos";
import type { Idioma } from "@/i18n/idiomas";
import { TEXTOS } from "@/i18n/textos";

type Props = { idioma: Idioma; fotos: Record<string, { a: string | null; b: string | null }> };

// "El archivo": mates, bombillas, tazas y accesorios.
// Las piezas que ya tienen foto se ven como tarjetas: cambian a su segunda foto al pasar el mouse
// (computadora) o al tocarlas (celular). Las que todavía no tienen foto van en una lista, sin recuadros vacíos.
// Cada pieza lleva a WhatsApp con su número para consultar.

export default function Archivo({ idioma, fotos }: Props) {
  const t = TEXTOS[idioma].archivo;
  const ingles = idioma === "en";
  const [filtro, setFiltro] = useState<TipoPieza | "todo">("todo");
  const [volteadas, setVolteadas] = useState<Record<string, boolean>>({});

  const tiposConPiezas = TIPOS.filter((tipo) => tipo.id === "todo" || PIEZAS.some((p) => p.tipo === tipo.id));
  const visibles = filtro === "todo" ? PIEZAS : PIEZAS.filter((p) => p.tipo === filtro);
  const tieneFoto = (id: string) => MOSTRAR_MARCADORES || !!fotos[id]?.a;
  const conFoto = visibles.filter((p) => tieneFoto(p.id));
  const sinFoto = visibles.filter((p) => !tieneFoto(p.id));
  const hayTarjetas = PIEZAS.some((p) => tieneFoto(p.id));

  const datos = (pieza: (typeof PIEZAS)[number]) => ({
    numero: String(PIEZAS.indexOf(pieza) + 1).padStart(2, "0"),
    nombre: ingles ? pieza.nombreEn : pieza.nombre,
    detalle: ingles ? pieza.detalleEn : pieza.detalle,
  });

  return (
    <section id="archivo" aria-labelledby="titulo-archivo" className="lamina solape bg-papel scroll-mt-4 pb-20 pt-20 md:pb-28 md:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,24rem)] md:items-end md:gap-16">
          <div>
            <p className="etiqueta mb-4 text-piedra">{t.etiqueta}</p>
            <Titulo id="titulo-archivo" lineas={t.titulo} className="text-pizarra" />
          </div>
          <p className="bajada reveal text-noche md:pb-2">
            {t.bajada}
            {hayTarjetas && <span className="mt-2 block text-sm font-normal tracking-normal text-piedra">{t.tocar}</span>}
          </p>
        </div>

        <div
          className="sin-barra -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6"
          role="group"
          aria-label={t.filtrar}
        >
          {tiposConPiezas.map((tipo) => (
            <button
              key={tipo.id}
              type="button"
              aria-pressed={filtro === tipo.id}
              onClick={() => setFiltro(tipo.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filtro === tipo.id ? "border-noche bg-noche text-marfil" : "border-borde text-noche hover:border-noche"
              }`}
            >
              {ingles ? tipo.nombreEn : tipo.nombre}
            </button>
          ))}
        </div>

        {conFoto.length > 0 && (
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
            {conFoto.map((pieza) => {
              const { numero, nombre, detalle } = datos(pieza);
              const f = fotos[pieza.id] ?? { a: null, b: null };
              const volteada = !!volteadas[pieza.id];
              return (
                <li key={pieza.id}>
                  <figure>
                    <button
                      type="button"
                      className="pieza group relative block w-full overflow-hidden rounded-[18px] text-left md:rounded-[22px]"
                      aria-pressed={volteada}
                      aria-label={t.verOtra(nombre)}
                      data-volteada={volteada}
                      onClick={() => setVolteadas((v) => ({ ...v, [pieza.id]: !v[pieza.id] }))}
                    >
                      <Foto
                        src={f.a}
                        alt={t.deFrente(nombre)}
                        indicacion={`${pieza.nombre}: de frente, fondo liso claro`}
                        proporcion="4 / 5"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      />
                      <div className="pieza-segunda absolute inset-0">
                        <Foto
                          src={f.b}
                          alt={t.enDetalle(nombre)}
                          indicacion={`${pieza.nombre}: detalle o en uso (con yerba, en la mano)`}
                          proporcion="4 / 5"
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                          oscuro
                        />
                      </div>
                      <span className="absolute right-2.5 top-2.5 rounded-full bg-marfil/90 px-2.5 py-1 text-[11px] font-semibold text-noche">
                        {t.numero} {numero}
                      </span>
                    </button>
                    <figcaption className="mt-3">
                      <span className="block font-display text-xl uppercase leading-none md:text-2xl">{nombre}</span>
                      {detalle && <span className="mt-1 block text-sm text-piedra">{detalle}</span>}
                      <a
                        href={LINKS.whatsapp(t.mensaje(numero, nombre))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="enlace-subrayado mt-2 inline-block text-sm font-semibold text-pizarra"
                      >
                        {t.consultar}
                        <span className="sr-only">{t.consultarPor(nombre)}</span>
                      </a>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        )}

        {sinFoto.length > 0 && (
          <ul className="mt-8 border-t border-noche/15">
            {sinFoto.map((pieza) => {
              const { numero, nombre, detalle } = datos(pieza);
              return (
                <li key={pieza.id} className="archivo-fila">
                  <span className="text-xs font-semibold tabular-nums text-piedra">
                    {t.numero} {numero}
                  </span>
                  <span className={`font-display text-2xl uppercase leading-none md:text-4xl ${detalle ? "" : "md:col-span-2"}`}>{nombre}</span>
                  {detalle && <span className="detalle mt-1 text-sm text-piedra md:mt-0">{detalle}</span>}
                  <a
                    href={LINKS.whatsapp(t.mensaje(numero, nombre))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="row-start-1 self-center text-sm font-semibold text-pizarra [grid-column:3] md:[grid-column:4]"
                  >
                    {t.consultar}
                    <span className="sr-only">{t.consultarPor(nombre)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
