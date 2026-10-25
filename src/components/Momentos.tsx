"use client";

import { useRef } from "react";
import Foto from "./Foto";
import { MOSTRAR_MARCADORES } from "@/lib/fotos";

type Momento = { foto: string | null; pie: string; indicacion: string };

export default function Momentos({ momentos: todos }: { momentos: Momento[] }) {
  const pista = useRef<HTMLUListElement>(null);
  // En la web publicada solo aparecen los momentos que ya tienen foto
  const momentos = MOSTRAR_MARCADORES ? todos : todos.filter((m) => m.foto);

  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reducir ? "auto" : "smooth" });
  };

  if (momentos.length === 0) return null;

  return (
    <section aria-labelledby="titulo-momentos" className="overflow-hidden bg-noche py-20 text-marfil md:py-28">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-4 sm:px-6">
        <div className="reveal">
          <p className="etiqueta mb-4 text-niebla">el local, la barra, la gente</p>
          <h2 id="titulo-momentos" className="titulo-seccion">Momentos</h2>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button type="button" onClick={() => mover(-1)} className="boton-redondo" aria-label="Momento anterior">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => mover(1)} className="boton-redondo" aria-label="Momento siguiente">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <ul
        ref={pista}
        tabIndex={0}
        aria-label="Fotos de momentos en Cabra Austral; deslizá para ver más"
        className="sin-barra mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 sm:scroll-px-6 sm:px-6 md:gap-5"
      >
        {momentos.map((m) => (
          <li key={m.pie} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[30%]">
            <figure>
              <Foto
                src={m.foto}
                alt={m.pie}
                indicacion={m.indicacion}
                proporcion="4 / 5"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 78vw"
                oscuro
              />
              <figcaption className="pie-foto mt-3 text-niebla">{m.pie}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
