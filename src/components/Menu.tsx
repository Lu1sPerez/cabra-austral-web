"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { Categoria } from "@/lib/menu";
import Foto from "./Foto";
import { LINKS } from "@/lib/negocio";
import { MOSTRAR_MARCADORES } from "@/lib/fotos";

type Props = { categorias: Categoria[]; fotoPasteleria: string | null };

const idDe = (nombre: string) =>
  nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");

export default function Menu({ categorias, fotoPasteleria }: Props) {
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
      {(fotoPasteleria || MOSTRAR_MARCADORES) && (
      <div className="relative">
        <Foto
          src={fotoPasteleria}
          alt="Cookies rellenas de chocolate de Cabra Austral"
          indicacion="Vitrina de pastelería: tortas, cookies y alfajores, a la altura de los ojos"
          proporcion="3 / 2"
          sizes="100vw"
          className="max-h-[70vh]"
        />
        <p className="pie-foto absolute bottom-3 right-4 rounded-sm bg-marfil/85 px-2 py-1 text-noche sm:right-6">
          cookies rellenas, de la casa
        </p>
      </div>
      )}

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
